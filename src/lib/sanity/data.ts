import { unstable_cache } from "next/cache";
import type { AboutPageContent } from "@/content/about";
import type {
  BlogPageContent,
  BlogPostDetail,
  BlogPostSummary,
} from "@/content/blog";
import type { ContactPageContent } from "@/content/contact";
import type { ExperiencesPageContent } from "@/content/experiences";
import type { HospitalityPageContent } from "@/content/hospitality";
import {
  type GalleryCardContent,
  type LocationContent,
  type LocationDetail,
  type LocationGalleryCard,
  type LocationsPageContent,
  locationsPageDefaults,
} from "@/content/locations";
import { realExperiences } from "@/content/real-experiences";
import { imageUrl, link, list, text } from "@/content/types";
import {
  advancePercentOrDefault,
  gstPercentOrDefault,
  type PaymentPlan,
  parseMenuRef,
  quoteMenuItem,
  splitPayment,
} from "@/lib/booking/menu";
import type {
  Experience,
  Faq,
  Homepage,
  Service,
  SiteSettings,
  Testimonial,
  Treatment,
} from "@/types/sanity";
import { sanityNoCdnClient } from "./client";
import {
  allExperienceSlugsQuery,
  allExperiencesQuery,
  allFaqsQuery,
  allServicesQuery,
  allTestimonialsQuery,
  allTreatmentsQuery,
  blogPostBySlugQuery,
  blogPostListQuery,
  bookableExperiencesQuery,
  experienceBySlugQuery,
  experiencePricingByIdQuery,
  faqsByCategoryQuery,
  homepageQuery,
  serviceBySlugQuery,
  siteSettingsQuery,
  testimonialsByServiceQuery,
  treatmentBySlugQuery,
} from "./queries";

export const SANITY_CACHE_TAG = "sanity";
const SANITY_REVALIDATE_SECONDS = 60;
const IS_DEV = process.env.NODE_ENV === "development";
// Builds fetch every page at once, so allow more time than a live request.
const SANITY_TIMEOUT_MS =
  process.env.NEXT_PHASE === "phase-production-build" ? 20_000 : 5000;
const PRICING_TIMEOUT_MS = 8000;
const BREAKER_FAILURE_THRESHOLD = 3;
const BREAKER_COOLDOWN_MS = 30_000;

let consecutiveFailures = 0;
let breakerOpenUntil = 0;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Sanity request timed out after ${ms}ms`)),
      ms,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// While the breaker is open, cache misses fail fast instead of each waiting
// out the timeout; cached entries are still served since this runs on a miss.
async function fetchFromSanity<T>(
  query: string,
  params: Record<string, string>,
): Promise<T> {
  if (Date.now() < breakerOpenUntil) {
    throw new Error("Sanity temporarily skipped after repeated failures");
  }
  try {
    // Bypass Sanity's CDN: it can briefly serve the pre-publish version, which
    // would then be cached here. Our own cache keeps request volume low.
    const result = await withTimeout(
      sanityNoCdnClient().fetch<T>(query, params),
      SANITY_TIMEOUT_MS,
    );
    consecutiveFailures = 0;
    return result;
  } catch (err) {
    consecutiveFailures += 1;
    if (consecutiveFailures >= BREAKER_FAILURE_THRESHOLD) {
      breakerOpenUntil = Date.now() + BREAKER_COOLDOWN_MS;
      consecutiveFailures = 0;
    }
    throw err;
  }
}

// Failures throw instead of returning null so they are never cached.
const cachedSanityFetch = unstable_cache(
  (query: string, params: Record<string, string>) =>
    fetchFromSanity<unknown>(query, params),
  ["sanity-query"],
  { tags: [SANITY_CACHE_TAG], revalidate: SANITY_REVALIDATE_SECONDS },
);

async function fetchSanity<T>(
  query: string,
  params?: Record<string, string>,
): Promise<T | null> {
  try {
    // Skip the cache in dev so Studio edits show on the next refresh.
    const fetcher = IS_DEV ? fetchFromSanity<unknown> : cachedSanityFetch;
    return (await fetcher(query, params ?? {})) as T;
  } catch (err) {
    console.warn(
      "[sanity] fetch failed, using fallback content:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

const IMAGE_REF = /^image-([a-f0-9]+)-(\d+x\d+)-([a-z0-9]+)$/i;

function sanityImageUrl(ref: string): string | null {
  const match = IMAGE_REF.exec(ref);
  if (!match) return null;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const [, id, size, ext] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${ext}`;
}

const FILE_REF = /^file-([a-f0-9]+)-([a-z0-9]+)$/i;

function sanityFileUrl(ref: string): string | null {
  const match = FILE_REF.exec(ref);
  if (!match) return null;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const [, id, ext] = match;
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}

/**
 * Replaces every Sanity image object in a document with `{ url, alt }`, and
 * every uploaded file with `{ url }` — the shapes the page components and
 * src/content defaults use.
 */
function resolveImages<T>(value: unknown): T {
  if (Array.isArray(value)) {
    return value.map((item) => resolveImages(item)) as T;
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const ref = (record.asset as { _ref?: unknown } | undefined)?._ref;
    if (typeof ref === "string" && ref.startsWith("image-")) {
      // Keep _type/_key/caption so images inside article text still render.
      const { asset: _asset, crop: _crop, hotspot: _hotspot, ...rest } = record;
      return {
        ...rest,
        url: sanityImageUrl(ref),
        alt: typeof record.alt === "string" ? record.alt : null,
      } as T;
    }
    if (typeof ref === "string" && ref.startsWith("file-")) {
      return { url: sanityFileUrl(ref) } as T;
    }
    return Object.fromEntries(
      Object.entries(record).map(([key, child]) => [key, resolveImages(child)]),
    ) as T;
  }
  return value as T;
}

/** Fetches a whole one-per-site page document with images resolved. */
async function fetchPage<T>(type: string): Promise<T | null> {
  const doc = await fetchSanity<unknown>(`*[_type == $type][0]`, { type });
  return doc ? resolveImages<T>(doc) : null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchSanity<SiteSettings>(siteSettingsQuery);
}

export async function getHomepage(): Promise<Homepage | null> {
  return fetchSanity<Homepage>(homepageQuery);
}

export async function getExperiencesPage(): Promise<ExperiencesPageContent | null> {
  return fetchPage<ExperiencesPageContent>("experiencesPage");
}

export async function getLocationsPage(): Promise<LocationsPageContent | null> {
  return fetchPage<LocationsPageContent>("locationsPage");
}

export async function getAboutPage(): Promise<AboutPageContent | null> {
  return fetchPage<AboutPageContent>("aboutPage");
}

export async function getHospitalityPage(): Promise<HospitalityPageContent | null> {
  return fetchPage<HospitalityPageContent>("hospitalityPage");
}

export async function getBlogPage(): Promise<BlogPageContent | null> {
  const [page, posts] = await Promise.all([
    fetchPage<BlogPageContent>("blogPage"),
    getBlogPosts(),
  ]);
  const categories = page?.hero?.categories;
  if (!page || !Array.isArray(categories)) return page;

  // Swap each category's picked-post reference for the post itself; hidden or
  // deleted posts become null so the card falls back to its own fields.
  const byId = new Map(posts.map((post) => [post._id, post]));
  return {
    ...page,
    hero: {
      ...page.hero,
      categories: categories.map((category) => {
        if (!category || typeof category !== "object") return category;
        const ref = (category.post as { _ref?: string } | null | undefined)
          ?._ref;
        return { ...category, post: ref ? (byId.get(ref) ?? null) : null };
      }),
    },
  };
}

export async function getContactPage(): Promise<ContactPageContent | null> {
  return fetchPage<ContactPageContent>("contactPage");
}

export async function getAllServices(): Promise<Service[]> {
  const result = await fetchSanity<Service[]>(allServicesQuery);
  return result ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return fetchSanity<Service>(serviceBySlugQuery, { slug });
}

export async function getAllTreatments(): Promise<Treatment[]> {
  const result = await fetchSanity<Treatment[]>(allTreatmentsQuery);
  return result ?? [];
}

export async function getTreatmentBySlug(
  slug: string,
): Promise<Treatment | null> {
  return fetchSanity<Treatment>(treatmentBySlugQuery, { slug });
}

/** Visible blog posts in their Studio "Position" order. */
export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const result = await fetchSanity<unknown[]>(blogPostListQuery);
  return result ? resolveImages<BlogPostSummary[]>(result) : [];
}

/** A visible blog post, or null when it is missing or hidden. */
export async function getBlogPost(
  slug: string,
): Promise<BlogPostDetail | null> {
  const result = await fetchSanity<unknown>(blogPostBySlugQuery, { slug });
  return result ? resolveImages<BlogPostDetail>(result) : null;
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const result = await fetchSanity<Testimonial[]>(allTestimonialsQuery);
  return result ?? [];
}

export async function getTestimonialsByService(
  serviceId: string,
): Promise<Testimonial[]> {
  const result = await fetchSanity<Testimonial[]>(testimonialsByServiceQuery, {
    serviceId,
  });
  return result ?? [];
}

export async function getAllFaqs(): Promise<Faq[]> {
  const result = await fetchSanity<Faq[]>(allFaqsQuery);
  return result ?? [];
}

export async function getFaqsByCategory(category: string): Promise<Faq[]> {
  const result = await fetchSanity<Faq[]>(faqsByCategoryQuery, { category });
  return result ?? [];
}

/** The real treatment categories, used when Sanity can't be reached. */
export const fallbackExperiences: Experience[] = realExperiences.map((e) => ({
  _id: `experience-${e.slug}`,
  _type: "experience",
  title: e.title,
  slug: { _type: "slug", current: e.slug },
  eyebrow: e.eyebrow,
  description: e.description,
  category: e.category,
  duration: e.duration,
  sensoryNote: e.highlights.join(" • "),
  price: `From ₹${e.fromPrice.toLocaleString("en-IN")}`,
  priceAmount: e.fromPrice,
  currency: "INR",
  primaryCta: { label: "BOOK NOW", url: "/book" },
  secondaryCta: { label: "CALL TO BOOK", url: "/contact" },
  gallery: {
    mainCard: e.gallery.main,
    topRightCard: e.gallery.topRight,
    bottomRightCard: e.gallery.bottomRight,
  },
  footerNote: e.footerNote,
  highlights: e.highlights,
  treatments: e.treatments.map((t, i) => ({ _key: `t${i}`, ...t })),
}));

export async function getAllExperiences(): Promise<Experience[]> {
  const result = await fetchSanity<Experience[]>(allExperiencesQuery);
  if (result && result.length > 0) return result;
  return fallbackExperiences;
}

export async function getExperienceBySlug(
  slug: string,
): Promise<Experience | null> {
  const result = await fetchSanity<Experience>(experienceBySlugQuery, { slug });
  if (result) return result;
  return fallbackExperiences.find((e) => e.slug.current === slug) ?? null;
}

export async function getAllExperienceSlugs(): Promise<string[]> {
  const result = await fetchSanity<string[]>(allExperienceSlugsQuery);
  if (result && result.length > 0) return result;
  return fallbackExperiences.map((e) => e.slug.current);
}

export type BookableExperience = {
  id: string;
  title: string;
  duration: string | null;
  durationMinutes: number;
  price: string | null;
  priceAmount: number;
  currency: string;
};

export type ExperiencePricing = {
  _id: string;
  title: string;
  priceAmount: number;
  currency: string;
};

function parseDurationMinutes(duration: string | null | undefined): number {
  if (!duration) return 60;
  const matches = duration.match(/\d+/g);
  if (!matches || matches.length === 0) return 60;
  const numbers = matches.map(Number).filter((n) => n > 0);
  if (numbers.length === 0) return 60;
  return numbers[0];
}

function toBookable(
  experience:
    | Experience
    | {
        _id: string;
        title: string;
        duration?: string;
        price?: string;
        priceAmount?: number;
        currency?: string;
      },
): BookableExperience | null {
  if (
    typeof experience.priceAmount !== "number" ||
    experience.currency !== "INR"
  ) {
    return null;
  }

  return {
    id: experience._id,
    title: experience.title,
    duration: experience.duration ?? null,
    durationMinutes: parseDurationMinutes(experience.duration),
    price: experience.price ?? null,
    priceAmount: experience.priceAmount,
    currency: experience.currency,
  };
}

export async function getBookableExperiences(): Promise<BookableExperience[]> {
  try {
    const result = await fetchSanity<Experience[]>(bookableExperiencesQuery);
    const bookable = (result ?? [])
      .map(toBookable)
      .filter((item): item is BookableExperience => item !== null);
    console.log(
      `[pricing] bookable experiences from Sanity: ${bookable.length} (${bookable.map((e) => e.id).join(", ")})`,
    );
    return bookable;
  } catch (err) {
    console.warn(
      "[pricing] getBookableExperiences Sanity fetch failed:",
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

export async function getExperiencePricing(experienceId: string): Promise<{
  id: string;
  title: string;
  priceAmount: number;
  currency: string;
} | null> {
  if (!experienceId) {
    console.warn(
      "[pricing] getExperiencePricing called with empty experienceId",
    );
    return null;
  }

  try {
    const client = sanityNoCdnClient();
    const result = await withTimeout(
      client.fetch<ExperiencePricing | null>(experiencePricingByIdQuery, {
        id: experienceId,
      }),
      PRICING_TIMEOUT_MS,
    );

    if (!result) {
      console.warn(
        `[pricing] Sanity experience not found for id=${experienceId}`,
      );
      return null;
    }

    const { _id, title, priceAmount, currency } = result;
    console.log(
      `[pricing] found experience _id=${_id} title=${title} priceAmount=${priceAmount} currency=${currency}`,
    );

    if (typeof priceAmount !== "number" || !(priceAmount > 0)) {
      console.warn(
        `[pricing] invalid priceAmount for ${experienceId}: ${priceAmount}`,
      );
      return null;
    }

    if (currency !== "INR") {
      console.warn(
        `[pricing] non-INR currency for ${experienceId}: ${currency}`,
      );
      return null;
    }

    return {
      id: _id || experienceId,
      title,
      priceAmount,
      currency,
    };
  } catch (err) {
    console.error(
      `[pricing] getExperiencePricing failed for id=${experienceId}:`,
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

/** What create-order charges and the booking emails show. */
export type BookingPricing = {
  id: string;
  title: string;
  /** Charged online now (the advance, or the full amount). */
  priceAmount: number;
  currency: string;
  /** Full price incl. GST, and what is left to pay at the spa. */
  totalAmount?: number;
  balanceAmount?: number;
  plan?: PaymentPlan;
};

type MenuPricingResult = {
  gstPercent?: number | null;
  advancePercent?: number | null;
  location?: {
    name?: string;
    item?: {
      name?: string;
      category?: string;
      perPerson?: boolean;
      price?: number;
    } | null;
  } | null;
} | null;

/**
 * Price for a spa-menu booking (see src/lib/booking/menu.ts), read fresh from
 * Sanity: menu price × guests (couples: × 2 when priced "each") + GST.
 */
export async function getMenuPricing(
  ref: string,
): Promise<BookingPricing | null> {
  const parsed = parseMenuRef(ref);
  if (!parsed) {
    console.warn(`[pricing] invalid menu ref: ${ref}`);
    return null;
  }

  try {
    const result = await withTimeout(
      sanityNoCdnClient().fetch<MenuPricingResult>(
        `*[_type == "locationsPage"][0]{
          gstPercent,
          advancePercent,
          "location": locations[slug == $slug][0]{
            name,
            "item": menu[_key == $itemKey][0]{
              name,
              category,
              perPerson,
              "price": options[minutes == $minutes][0].price
            }
          }
        }`,
        {
          slug: parsed.slug,
          itemKey: parsed.itemKey,
          minutes: parsed.minutes,
        },
      ),
      PRICING_TIMEOUT_MS,
    );

    const item = result?.location?.item;
    if (!item?.name || typeof item.price !== "number" || !(item.price > 0)) {
      console.warn(`[pricing] menu item not found or unpriced: ${ref}`);
      return null;
    }

    const quote = quoteMenuItem({
      price: item.price,
      category: item.category,
      perPerson: item.perPerson,
      guests: parsed.guests,
      gstPercent: gstPercentOrDefault(result?.gstPercent),
    });
    const people =
      item.category === "couple"
        ? "couple"
        : `${parsed.guests} guest${parsed.guests > 1 ? "s" : ""}`;

    const payment = splitPayment(
      quote.totalPaise,
      parsed.plan,
      advancePercentOrDefault(result?.advancePercent),
    );

    return {
      id: ref,
      title: `${item.name} (${parsed.minutes} min, ${people}) · ${result?.location?.name ?? parsed.slug}${
        payment.plan === "advance" ? " · advance" : ""
      }`,
      priceAmount: payment.dueNowPaise / 100,
      currency: "INR",
      totalAmount: quote.totalPaise / 100,
      balanceAmount: payment.balancePaise / 100,
      plan: payment.plan,
    };
  } catch (err) {
    console.error(
      `[pricing] getMenuPricing failed for ${ref}:`,
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

/** Price for any booking: a spa-menu treatment or an older experience. */
export async function getBookingPricing(
  experienceId: string,
): Promise<BookingPricing | null> {
  return experienceId.startsWith("menu:")
    ? getMenuPricing(experienceId)
    : getExperiencePricing(experienceId);
}

// ─── Location Detail ───

function galleryCard(
  stored: GalleryCardContent | undefined,
  fallback: GalleryCardContent | undefined,
): LocationGalleryCard {
  return {
    image: imageUrl(stored?.image, fallback?.image ?? {}),
    tag: text(stored?.tag, fallback?.tag ?? ""),
    title: text(stored?.title, fallback?.title ?? ""),
    badge: text(stored?.badge, fallback?.badge ?? ""),
    subtitle: text(stored?.subtitle, fallback?.subtitle ?? ""),
  };
}

// Only allow real Google Maps embed links inside the iframe.
function googleMapsEmbed(url: string | undefined): string | null {
  const value = url?.trim();
  return value?.startsWith("https://www.google.com/maps/embed") ? value : null;
}

function toLocationDetail(
  stored: LocationContent | undefined,
  fallback: LocationContent | undefined,
  glanceHeading: string,
): LocationDetail {
  const s = stored ?? fallback ?? { name: "" };
  const f = fallback ?? s;
  return {
    name: text(s.name, f.name),
    slug: text(s.slug, f.slug ?? ""),
    address: text(s.address, f.address ?? ""),
    description: text(s.description, f.description ?? ""),
    breadcrumbEyebrow: text(s.breadcrumbEyebrow, f.breadcrumbEyebrow ?? ""),
    sanctuaryId: text(s.sanctuaryId, f.sanctuaryId ?? ""),
    glanceHeading,
    sanctuaryInfo: list(s.sanctuaryInfo, f.sanctuaryInfo ?? []),
    primaryCta: link(s.primaryCta, {
      label: f.primaryCta?.label ?? "BOOK TREATMENT & STAY",
      url: f.primaryCta?.url ?? "/contact",
    }),
    dossier: s.dossier?.url
      ? {
          label: text(
            s.dossierLabel,
            f.dossierLabel ?? "SANCTUARY DOSSIER (PDF)",
          ),
          url: s.dossier.url,
        }
      : null,
    mapUrl: s.mapUrl?.trim() || null,
    mapEmbedUrl: googleMapsEmbed(s.mapEmbedUrl),

    gallery: {
      mainCard: galleryCard(s.gallery?.mainCard, f.gallery?.mainCard),
      topRightCard: galleryCard(
        s.gallery?.topRightCard,
        f.gallery?.topRightCard,
      ),
      bottomRightCard: galleryCard(
        s.gallery?.bottomRightCard,
        f.gallery?.bottomRightCard,
      ),
    },
    facilities: list(s.facilities, f.facilities ?? []).map((facility) => ({
      icon: facility.icon ?? "sun",
      title: facility.title,
      subtitle: facility.subtitle ?? "",
    })),
  };
}

export async function getLocationBySlug(
  slug: string,
): Promise<LocationDetail | null> {
  const page = await getLocationsPage();
  const defaults = locationsPageDefaults;
  const stored = page?.locations?.find((l) => l.slug === slug);
  const fallback = defaults.locations.find((l) => l.slug === slug);
  if (!stored && !fallback) return null;
  return toLocationDetail(
    stored,
    fallback,
    text(page?.glanceHeading, defaults.glanceHeading),
  );
}

export async function getAllLocationSlugs(): Promise<string[]> {
  const page = await getLocationsPage();
  const locations = list(page?.locations, locationsPageDefaults.locations);
  return locations
    .map((l) => l.slug)
    .filter((s): s is string => typeof s === "string" && s.length > 0);
}
