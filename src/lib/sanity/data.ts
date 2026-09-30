import { unstable_cache } from "next/cache";
import type { AboutPageContent } from "@/content/about";
import type { BlogPageContent } from "@/content/blog";
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
import { imageUrl, link, list, text } from "@/content/types";
import type {
  BlogPost,
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
  allBlogPostsQuery,
  allExperienceSlugsQuery,
  allExperiencesQuery,
  allFaqsQuery,
  allServicesQuery,
  allTestimonialsQuery,
  allTreatmentsQuery,
  blogPostBySlugQuery,
  blogPostsByCategoryQuery,
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
      return {
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
  return fetchPage<BlogPageContent>("blogPage");
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

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const result = await fetchSanity<BlogPost[]>(allBlogPostsQuery);
  return result ?? [];
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  return fetchSanity<BlogPost>(blogPostBySlugQuery, { slug });
}

export async function getBlogPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  const result = await fetchSanity<BlogPost[]>(blogPostsByCategoryQuery, {
    category,
  });
  return result ?? [];
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

export const fallbackExperiences: Experience[] = [
  {
    _id: "experience-spa-sojourns",
    _type: "experience",
    title: "Spa Sojourns",
    slug: { _type: "slug", current: "spa-sojourns" },
    eyebrow: "SACRED HEALING SERIES",
    description:
      "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe, these rituals leave you feeling renewed, centered, and completely at ease.",
    category: "Signature Bodywork",
    duration: "75 / 90 Mins",
    sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver",
    price: "₹8,500",
    priceAmount: 8500,
    currency: "INR",
    primaryCta: {
      label: "EXPLORE MASSAGES",
      url: "/experiences/massage-selections",
    },
    secondaryCta: {
      label: "CONCIERGE SCHEDULING",
      url: "/contact",
    },
    gallery: {
      mainCard: {
        tag: "RITUAL BASELINE",
        title: "Traditional Abhyanga & Tailam",
        badge: "01 / MASTER RITUAL",
      },
      topRightCard: {
        tag: "THERAPEUTIC HEAT",
        title: "Herbal Potli Kizhi Compress",
      },
      bottomRightCard: {
        tag: "SANCTUARY SUITES",
        title: "Private Stone & Teak Pavilions",
      },
    },
    footerNote:
      "Curated full-body therapies with cold-pressed botanical infusions",
    highlights: ["TAILORED PRESSURE", "AROMA ELIXIRS", "PRIVATE SUITES"],
    seo: {
      title: "Spa Sojourns | Kynta Wellness Group",
      description:
        "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe.",
    },
  },
  {
    _id: "experience-massage-selections",
    _type: "experience",
    title: "Massage Selections",
    slug: { _type: "slug", current: "massage-selections" },
    eyebrow: "THERAPEUTIC RESTORATIVE SERIES",
    description:
      "Step into a world of deep relaxation with our curated Full Body Massage selections. Each therapy is thoughtfully designed to release tension, improve circulation, and restore inner harmony. Surrender to skilled hands and experience complete mind-body renewal.",
    category: "Signature Bodywork",
    duration: "60 / 90 Mins",
    sensoryNote: "Brahmi • Ashwagandha • Sandalwood",
    price: "₹6,500",
    priceAmount: 6500,
    currency: "INR",
    primaryCta: {
      label: "RESERVE THERAPY",
      url: "/contact",
    },
    secondaryCta: {
      label: "CONCIERGE SCHEDULING",
      url: "/contact",
    },
    gallery: {
      mainCard: {
        tag: "SOMATIC MASTERY",
        title: "Deep Somatic Tissue & Marma Release",
        badge: "02 / RESTORATIVE",
      },
      topRightCard: {
        tag: "THERMAL RELEASE",
        title: "Warm Herbal Compresses",
      },
      bottomRightCard: {
        tag: "SANCTUARY SUITES",
        title: "Himalayan Cedar Suites",
      },
    },
    footerNote:
      "Ancient nadi pressure release synchronized with slow rhythmic breathing",
    highlights: ["DEEP TISSUE FLOW", "WARM CEDAR OILS", "MARMA BALANCE"],
    seo: {
      title: "Massage Selections | Kynta Wellness Group",
      description:
        "Curated Full Body Massage selections designed to release tension, improve circulation, and restore inner harmony.",
    },
  },
  {
    _id: "experience-glamour-glow",
    _type: "experience",
    title: "Glamour Glow",
    slug: { _type: "slug", current: "glamour-glow" },
    eyebrow: "BOTANICAL RADIANCE SERIES",
    description:
      "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin. Enriched with skin-loving ingredients, this treatment removes impurities, enhances natural radiance, and leaves your skin smooth, refreshed, and beautifully glowing. Perfect before special occasions or whenever your skin needs a luminous boost.",
    category: "Signature Bodywork",
    duration: "60 Mins",
    sensoryNote: "Floral Jasmine • Mineral Crisp • Sweet Neroli",
    price: "₹5,500",
    priceAmount: 5500,
    currency: "INR",
    primaryCta: {
      label: "EXPLORE RITUALS",
      url: "/experiences/spa-sojourns",
    },
    secondaryCta: {
      label: "CONCIERGE SCHEDULING",
      url: "/contact",
    },
    gallery: {
      mainCard: {
        tag: "BOTANICAL FACIAL",
        title: "Kumkumadi & Gold Saffron Elixir",
        badge: "03 / RADIANCE",
      },
      topRightCard: {
        tag: "GENTLE BUFFING",
        title: "Crushed Walnut & Rose Exfoliation",
      },
      bottomRightCard: {
        tag: "SANCTUARY SUITES",
        title: "Sunlit Marble Grooming Lounges",
      },
    },
    footerNote:
      "Single-estate lunar-harvested saffron with pure botanical lipids",
    highlights: ["CELLULAR POLISH", "KUMKUMADI INFUSION", "LUMINOUS FINISH"],
    seo: {
      title: "Glamour Glow | Kynta Wellness Group",
      description:
        "Luxurious facial and body scrub designed to gently exfoliate, deeply nourish, and revive dull skin.",
    },
  },
  {
    _id: "experience-hydrotherapy-plunge",
    _type: "experience",
    title: "Hydrotherapy Plunge",
    slug: { _type: "slug", current: "hydrotherapy-plunge" },
    eyebrow: "AQUATIC THERMAL SERIES",
    description:
      "Alternating thermal circuits designed to stimulate lymphatic flow and deepen somatic restoration. Our hydrotherapy protocols combine heated mineral pools with cold plunge immersion for maximum therapeutic benefit.",
    category: "Hydrothermal & Thermal Baths",
    duration: "45 Mins",
    sensoryNote: "Eucalyptus • Sea Salt • Mountain Pine",
    price: "₹4,500",
    priceAmount: 4500,
    currency: "INR",
    primaryCta: {
      label: "EXPLORE CIRCUITS",
      url: "/experiences",
    },
    secondaryCta: {
      label: "CONCIERGE SCHEDULING",
      url: "/contact",
    },
    gallery: {
      mainCard: {
        tag: "HYDRO CIRCUIT",
        title: "Stepped Magnesium Flotation Pool",
        badge: "04 / HYDROTHERMAL",
      },
      topRightCard: {
        tag: "VAPOR CHAMBER",
        title: "Herbal Steam Cavern",
      },
      bottomRightCard: {
        tag: "CRYOTHERAPY",
        title: "Glacial Mineral Plunge",
      },
    },
    footerNote:
      "Closed-loop thermodynamic mineral recirculation with zero hydro waste",
    highlights: ["THERMAL SHOCK", "SALINE FLOTATION", "LYMPHATIC RESET"],
    seo: {
      title: "Hydrotherapy Plunge | Kynta Wellness Group",
      description:
        "Alternating thermal circuits designed to stimulate lymphatic flow and deepen somatic restoration.",
    },
  },
  {
    _id: "experience-couples-sanctuary",
    _type: "experience",
    title: "Couples Sanctuary",
    slug: { _type: "slug", current: "couples-sanctuary" },
    eyebrow: "DUET CONTEMPLATION SERIES",
    description:
      "A shared journey of restoration in our private couples pavilion with dual treatment beds and synchronized botanical rituals. Designed for partners seeking a communal path to deep relaxation and cellular renewal.",
    category: "Couples & Duets",
    duration: "120 Mins",
    sensoryNote: "White Lotus • Rose Absolute • Cardamom",
    price: "₹18,000",
    priceAmount: 18000,
    currency: "INR",
    primaryCta: {
      label: "RESERVE DUET",
      url: "/contact",
    },
    secondaryCta: {
      label: "CONCIERGE SCHEDULING",
      url: "/contact",
    },
    gallery: {
      mainCard: {
        tag: "SHARED STILLNESS",
        title: "Synchronized Dual Abhyanga",
        badge: "05 / DUET",
      },
      topRightCard: {
        tag: "BATH RITUAL",
        title: "Copper Basin Floral Bath",
      },
      bottomRightCard: {
        tag: "PRIVATE RETREAT",
        title: "Forest View Teak Pavilion",
      },
    },
    footerNote:
      "Intimate seclusion with private botanical steam and open garden verandas",
    highlights: ["SYNCHRONIZED TOUCH", "DUAL TEAK BEDS", "PRIVATE VERANDAH"],
    seo: {
      title: "Couples Sanctuary | Kynta Wellness Group",
      description:
        "A shared journey of restoration in our private couples pavilion with dual treatment beds and synchronized botanical rituals.",
    },
  },
  {
    _id: "experience-sound-immersion",
    _type: "experience",
    title: "Sound Immersion",
    slug: { _type: "slug", current: "sound-immersion" },
    eyebrow: "SONIC VIBRATION SERIES",
    description:
      "Acoustic healing through traditional Indian instruments calibrated for deep theta meditation states. Experience the resonant frequencies of Tibetan singing bowls, crystal bowls, and traditional Rudra Veena harmonics.",
    category: "Sound & Meditative Immersion",
    duration: "60 Mins",
    sensoryNote: "Frankincense • Myrrh • Himalayan Sandalwood",
    price: "₹5,000",
    priceAmount: 5000,
    currency: "INR",
    primaryCta: {
      label: "EXPLORE SOUNDSCAPES",
      url: "/blog",
    },
    secondaryCta: {
      label: "CONCIERGE SCHEDULING",
      url: "/contact",
    },
    gallery: {
      mainCard: {
        tag: "ACOUSTIC CHAMBER",
        title: "Singing Bowls & Rudra Veena Harmonics",
        badge: "06 / SONIC",
      },
      topRightCard: {
        tag: "VIBRATIONAL HEALING",
        title: "Sub-24dB Porous Stone Acoustics",
      },
      bottomRightCard: {
        tag: "MEDITATION VAULT",
        title: "Lime Plaster Resonance Grottos",
      },
    },
    footerNote:
      "Calibrated spatial soundscapes engineered for deep parasympathetic alignment",
    highlights: ["THETA HARMONICS", "TIBETAN BELLS", "ACOUSTIC SILENCE"],
    seo: {
      title: "Sound Immersion | Kynta Wellness Group",
      description:
        "Acoustic healing through traditional Indian instruments calibrated for deep theta meditation states.",
    },
  },
];

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
