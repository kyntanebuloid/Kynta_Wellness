import type {
  AboutPage,
  BlogPage,
  BlogPost,
  ContactPage,
  Experience,
  ExperiencesPage,
  Faq,
  Homepage,
  HospitalityPage,
  LocationsPage,
  Service,
  SiteSettings,
  Testimonial,
  Treatment,
} from "@/types/sanity";
import { sanityClient, sanityNoCdnClient } from "./client";
import {
  aboutPageQuery,
  allBlogPostsQuery,
  allExperienceSlugsQuery,
  allExperiencesQuery,
  allFaqsQuery,
  allLocationSlugsQuery,
  allServicesQuery,
  allTestimonialsQuery,
  allTreatmentsQuery,
  blogPageQuery,
  blogPostBySlugQuery,
  blogPostsByCategoryQuery,
  bookableExperiencesQuery,
  contactPageQuery,
  experienceBySlugQuery,
  experiencePricingByIdQuery,
  experiencesPageQuery,
  faqsByCategoryQuery,
  homepageQuery,
  hospitalityPageQuery,
  locationBySlugQuery,
  locationsPageQuery,
  serviceBySlugQuery,
  siteSettingsQuery,
  testimonialsByServiceQuery,
  treatmentBySlugQuery,
} from "./queries";

async function fetchSanity<T>(
  query: string,
  params?: Record<string, string>,
): Promise<T | null> {
  try {
    const client = sanityClient();
    if (params) {
      return await client.fetch<T>(query, params);
    }
    return await client.fetch<T>(query);
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchSanity<SiteSettings>(siteSettingsQuery);
}

export async function getHomepage(): Promise<Homepage | null> {
  return fetchSanity<Homepage>(homepageQuery);
}

export async function getExperiencesPage(): Promise<ExperiencesPage | null> {
  return fetchSanity<ExperiencesPage>(experiencesPageQuery);
}

export async function getLocationsPage(): Promise<LocationsPage | null> {
  return fetchSanity<LocationsPage>(locationsPageQuery);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return fetchSanity<AboutPage>(aboutPageQuery);
}

export async function getHospitalityPage(): Promise<HospitalityPage | null> {
  return fetchSanity<HospitalityPage>(hospitalityPageQuery);
}

export async function getBlogPage(): Promise<BlogPage | null> {
  return fetchSanity<BlogPage>(blogPageQuery);
}

export async function getContactPage(): Promise<ContactPage | null> {
  return fetchSanity<ContactPage>(contactPageQuery);
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
    const result = await client.fetch<ExperiencePricing | null>(
      experiencePricingByIdQuery,
      { id: experienceId },
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

export interface LocationDetail {
  name: string;
  slug: string;
  address: string;
  region: string;
  price: string;
  description: string;
  breadcrumbEyebrow: string;
  sanctuaryId: string;
  sanctuaryInfo: {
    label: string;
    title: string;
    value: string;
  }[];
  primaryCta: { label: string; url: string };
  secondaryCta: { label: string; url: string };
  gallery: {
    mainCard: {
      image: string;
      tag: string;
      title: string;
      badge: string;
      subtitle?: string;
    };
    topRightCard: {
      image: string;
      tag: string;
      title: string;
      subtitle?: string;
    };
    bottomRightCard: {
      image: string;
      tag: string;
      title: string;
      subtitle?: string;
    };
  };
  facilities: { icon: string; title: string; subtitle: string }[];
  spaces: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    description: string;
    cards: {
      image: string;
      tag: string;
      tagColor: "teal" | "rust";
      title: string;
      description: string;
    }[];
  };
  services?: string[];
  hours?: string;
  phone?: string;
  email?: string;
}

const fallbackLocations: LocationDetail[] = [
  {
    name: "Rawai Luxury Tents Pushkar",
    slug: "rawai-tents",
    address: "Pushkar, Rajasthan",
    region: "rajasthan",
    price: "$190 / NIGHT",
    description:
      "An ultra-luxury safari glamping sanctuary nestled among undulating dunes, offering open-air private plunge hydrotherapy, starlit celestial meditation, and desert botanical detox rituals rooted in classical Charaka Samhita traditions.",
    breadcrumbEyebrow: "PUSHKAR SAND DUNES • STARLIT OASIS & DESERT SERENITY",
    sanctuaryId: "THAR D–04",
    sanctuaryInfo: [
      {
        label: "CLIMATE & TERROIR",
        title: "Pushkar Sacred Lake & Thar Desert Microclimate",
        value: "",
      },
      {
        label: "LINEAGE TRADITIONS",
        title: "Desert Hydrotherapy & Somatic Starlight Yoga Nidra",
        value: "",
      },
      {
        label: "ACCOMMODATIONS",
        title: "18 Hand-Woven Canvas Safari Pavilions & Private Plunges",
        value: "",
      },
      {
        label: "NEAREST TRANSIT",
        title:
          "Kishangarh Airport (KQH – 45 min) • Jaipur Int'l (JAI – 2.5 hrs) • Private Helipad On-Site",
        value: "",
      },
    ],
    primaryCta: { label: "BOOK TREATMENT & STAY", url: "/contact" },
    secondaryCta: { label: "SANCTUARY DOSSIER (PDF)", url: "#" },
    gallery: {
      mainCard: {
        image:
          "/locations/Rawai Luxury Tents  Pushkar/AB6AXuDvSt3fXT690wv7fUHWE9b4LAgkQXISOFDoYJ89E-g6e6LtasJrGXJhCCOn_VlvN-F-i5RBFA9AkiH7_1ZDneN8GzS1jhffmX8AoR13LoHFgynCYLIjcrquRawnkfqfPVGJ5Vh4ISKDCo7Dy6mua7Ag8CADviAjNSeva1afl_Uiw7rICe62wIhKgpDNffYFFsGVzeGKCSJrwdbNe4jpnu.png",
        tag: "PRINCIPAL SANCTUARY • DESERT DUNES & STARLIGHT PLUNGE POOL",
        title: "Private Heated Dunes Pool & Safari Deck",
        badge: "Unpolluted Starlight Horizon",
        subtitle:
          "Panoramic views of Thar desert ridges and cosmic skyways with sacred fireside aromatherapy",
      },
      topRightCard: {
        image:
          "/locations/Rawai Luxury Tents  Pushkar/Desert Sandstone & Teak Bhashpa Chamber.png",
        tag: "HERBAL VAPOR CHAMBERS",
        title: "Desert Sandstone & Teak Bhashpa Chamber",
        subtitle: "Therapeutic neem, eucalyptus, and camel milk infusions",
      },
      bottomRightCard: {
        image:
          "/locations/Rawai Luxury Tents  Pushkar/Celestial Twilight Yogic Deck & Sound Shala.png",
        tag: "OPEN-AIR SOMATICS",
        title: "Celestial Twilight Yogic Deck & Sound Shala",
        subtitle:
          "Vocal acoustic resonance beneath unpolluted Rajasthani skies",
      },
    },
    facilities: [
      {
        icon: "sun",
        title: "Solar-Heated Private Plunges",
        subtitle: "Filtered rainwater & mineral salts",
      },
      {
        icon: "flower",
        title: "Desert Rose & Frankincense",
        subtitle: "Freshly distilled farm hydrosols",
      },
      {
        icon: "mountain",
        title: "Dune Meditation Platforms",
        subtitle: "Oriented to sunrise and pole star",
      },
      {
        icon: "car",
        title: "Dedicated Chauffeur & Helipad",
        subtitle: "Seamless VIP desert arrival",
      },
    ],
    spaces: {
      eyebrow: "ARCHITECTURAL STILLNESS",
      heading: "Sacred Spaces of the",
      headingItalic: "Desert Oasis",
      description:
        "Thoughtfully positioned pavilions engineered with double-membrane desert canvas, sound insulation, and thermal airflow vents.",
      cards: [
        {
          image:
            "/locations/Rawai Luxury Tents  Pushkar/AB6AXuBPa34fE0kpcLq_30OMOadsYo1mW0wJS8VQ5GNwgjEHN8pZymOHU2QrBKRzCEWjMBTu6LR75vfpP2NO_GOxy_mtuaR4q-xMQNVdTB8lAMWwg-FRZsDO4SoKkLmbwogr9L1rDSpYkdhB-6T_nHEA2ybx3EjCi8lhk-oswsI4EdqVXZZt0F_mNQPfqv4AG2dho2NVPBipkRdSCP-tm9xWPU.png",
          tag: "SANCTUARY SUITE",
          tagColor: "teal",
          title: "Private Dune Plunge Pavilion",
          description:
            "Individual heated plunge pools facing open horizons, framed with sustainable teakwood and shaded daybeds.",
        },
        {
          image:
            "/locations/Rawai Luxury Tents  Pushkar/AB6AXuCVcUEoVmXP0M9uK7HqQKwtc1ulf-iSohioYUTE39d-e5QG-OOTWmOu8tLIQygnxhwKeK33OeiHHa1ScsevWZUCkTIlDuOoOMP0qUZXJZaMCj4dz816kK5emtSo5zWE-XY2mMcCQyLqHSTnxvBoqhmZklbRAmae81c8Oz67EJC2JuDm9AeJ4R4XAyJe9JQpGd7c9KDyaj_OYmMYKiszkr.png",
          tag: "THERAPY CHAMBER",
          tagColor: "rust",
          title: "Desert Rose & Sandalwood Shala",
          description:
            "High-ceilinged ventilated canvas pavilion equipped for deep herbal basti, classical abhyanga, and swedana.",
        },
        {
          image:
            "/locations/Rawai Luxury Tents  Pushkar/AB6AXuDNXuu7es3XXV5upy_9vJ9oNiryhrrYTdotbn4IYWdSOk_f9lcSD0cs_C6E6SlitUMwruzaMhADtvNKi6z8Vbf8zhxokWs4xn7P7O_ak4bW-C8KWOlGwIZBlMwvOWN68d5Y97iJ2lXb0nvtUeDtRPaInxyZh5fT0bhEmfaGcKdYy2D8oHAriFqL3zoBgTm08pek3PmM1-IdKtUlVYfatB.png",
          tag: "CELESTIAL OBSERVATORY",
          tagColor: "teal",
          title: "Celestial Astronomy & Yogic Platform",
          description:
            "Rooftop wooden deck elevated above the dune crest for nocturnal sound meditations and stargazing.",
        },
        {
          image:
            "/locations/Rawai Luxury Tents  Pushkar/AB6AXuDvSt3fXT690wv7fUHWE9b4LAgkQXISOFDoYJ89E-g6e6LtasJrGXJhCCOn_VlvN-F-i5RBFA9AkiH7_1ZDneN8GzS1jhffmX8AoR13LoHFgynCYLIjcrquRawnkfqfPVGJ5Vh4ISKDCo7Dy6mua7Ag8CADviAjNSeva1afl_Uiw7rICe62wIhKgpDNffYFFsGVzeGKCSJrwdbNe4jpnu.png",
          tag: "DISPENSARY",
          tagColor: "rust",
          title: "Pushkar Botanical & Attar Apothecary",
          description:
            "On-site compounding of fresh rose hydrosols, virgin desert oils, and organic adaptogenic night infusions.",
        },
      ],
    },
    services: ["spa", "dining", "pool", "wifi", "suite"],
    hours: "08:00 – 21:00 Daily",
    phone: "+91 145 225 678",
    email: "rawai@kyntawellness.com",
  },
  {
    name: "Indraprastha Resort Dharamshala",
    slug: "indraprastha-dharamshala",
    address: "Dharamshala, Himachal Pradesh",
    region: "himalayan",
    price: "$220 / NIGHT",
    description:
      "A cedar-clad Himalayan wellness sanctuary perched above the Kangra Valley, offering traditional Ayurvedic panchakarma, alpine hydrotherapy circuits, and panoramic meditation verandas amidst towering deodar forests.",
    breadcrumbEyebrow: "KANGRA VALLEY • HIMALAYAN CEDAR & ALPINE STILLNESS",
    sanctuaryId: "HIM A–01",
    sanctuaryInfo: [
      {
        label: "CLIMATE & TERROIR",
        title: "Kangra Valley Sub-Alpine & Deodar Cedar Microclimate",
        value: "",
      },
      {
        label: "LINEAGE TRADITIONS",
        title: "Classical Panchakarma & Mountain Botanical Abhyanga",
        value: "",
      },
      {
        label: "ACCOMMODATIONS",
        title: "24 Heritage Suites & Private Cedar Pavilions",
        value: "",
      },
      {
        label: "NEAREST TRANSIT",
        title: "Gaggal Airport (DHM – 15 min) • Pathankot Rail (CHK – 2 hrs)",
        value: "",
      },
    ],
    primaryCta: { label: "BOOK TREATMENT & STAY", url: "/contact" },
    secondaryCta: { label: "SANCTUARY DOSSIER (PDF)", url: "#" },
    gallery: {
      mainCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCNSLYPmnuaPap66ahjYy1RAlP_oqqHP1_DG4U2zy9n-vOp3KuS4PLbNt2vj52caJrKGXZNi94ti3tRLDDbOCMziXvsbZXvEAMicmNc2vFlvG2BWCQm9b31HlFXmtSGP0EAXb1jE4rNZ0kDaBhZy-Olh51oKeRLbORA1vWGsSmyUqlqiYYgL06r3UfxCPMv5XUsOTp73zWpGAaDhCqjgP.png",
        tag: "PRINCIPAL SANCTUARY • KANGRA VALLEY ALPINE RETREAT",
        title: "Himalayan Cedar Wellness Pavilion",
        badge: "Deodar Forest Immersion",
        subtitle: "Panoramic Kangra Valley views with alpine botanical therapy",
      },
      topRightCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCcdJI4NTtZFr3MpSldween3mNgDK7SIa-ppWquf_Hd6bdzh7PlXi7QcXI4pyRv_78SJengbacGKjuFki0pyTFl-0egrU4q9h8DRe9XXqPsQ4cUfuKY3A8RCNsZ0FW2nYwqiYyb927sCcUlZ15OgNzN_zOd0pLnkAj6uEEjzvtL2W4F4Go-OhfCuI49dHAbQ9wYe-TmrIFoAvw8UA3fu_.png",
        tag: "ALPINE HYDRO CIRCUITS",
        title: "Mountain Spring Plunge & Cedar Sauna",
        subtitle: "Glacial mineral water therapy at 5,200 feet",
      },
      bottomRightCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuDfpAHt6jvK0tqHjSOtwWov5kV0k6drBPNRLSiVIl6HCc8HmYLu6kP7ZcSMkoXJoQYyYna-AECNeG4p-A_ebakRmgUhPH120QlpPIxm37TebKXtltmAosqTtIJE7-VJ_kLKhjO8FKUubN6DEgNmCn8Z_JdjZVbuN-kizPtj0mtNkZ35ZnKBjxclPfIS8sOv3yXGVX6hkKc3M710ZC7yAh.png",
        tag: "MEDITATION VERANDAS",
        title: "Sunrise Pranayama Deck & Valley View",
        subtitle: "Guided breathwork above the cloud line",
      },
    },
    facilities: [
      {
        icon: "sun",
        title: "Alpine Hydrotherapy Circuit",
        subtitle: "Cedar wood-heated mineral pools",
      },
      {
        icon: "flower",
        title: "Mountain Botanical Apothecary",
        subtitle: "Wild-harvested Himalayan herbs",
      },
      {
        icon: "mountain",
        title: "Valley-View Meditation Deck",
        subtitle: "Facing Dhauladhar ranges",
      },
      {
        icon: "car",
        title: "Airport Transfer & Concierge",
        subtitle: "Complimentary Gaggal pickup",
      },
    ],
    spaces: {
      eyebrow: "ARCHITECTURAL STILLNESS",
      heading: "Sacred Spaces of the",
      headingItalic: "Cedar Sanctuary",
      description:
        "Heritage suites engineered with deodar cedar paneling, acoustic insulation, and panoramic valley-facing meditation verandas.",
      cards: [
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuAwrVMzILVkvJdSKHV6KOt4YRo2SBEgnoj2YIROhqctBY7ghysfONhp-fJgI-Ylb5RrEJ4gL3ZY0iUsf9W21qwANDj5UffmPIc8-7MtR2q-Q_UKBZiwEL9a2b_LuJ4cUFy6K8ZqvgAedkiL_dkYASle0anA087NtqKb_GdAP4LtxhmkRSA9reT1KouAqVxmz6ka2OwRSmkPoMx7xBC9zA.png",
          tag: "SANCTUARY SUITE",
          tagColor: "teal",
          title: "Kangra Valley Heritage Suite",
          description:
            "Private cedar-paneled retreats with floor-to-ceiling valley views and heated stone flooring.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCNSLYPmnuaPap66ahjYy1RAlP_oqqHP1_DG4U2zy9n-vOp3KuS4PLbNt2vj52caJrKGXZNi94ti3tRLDDbOCMziXvsbZXvEAMicmNc2vFlvG2BWCQm9b31HlFXmtSGP0EAXb1jE4rNZ0kDaBhZy-Olh51oKeRLbORA1vWGsSmyUqlqiYYgL06r3UfxCPMv5XUsOTp73zWpGAaDhCqjgP.png",
          tag: "THERAPY CHAMBER",
          tagColor: "rust",
          title: "Alpine Panchakarma Pavilion",
          description:
            "Temperature-controlled treatment rooms with mountain-herb aromatics and warm stone therapy beds.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCcdJI4NTtZFr3MpSldween3mNgDK7SIa-ppWquf_Hd6bdzh7PlXi7QcXI4pyRv_78SJengbacGKjuFki0pyTFl-0egrU4q9h8DRe9XXqPsQ4cUfuKY3A8RCNsZ0FW2nYwqiYyb927sCcUlZ15OgNzN_zOd0pLnkAj6uEEjzvtL2W4F4Go-OhfCuI49dHAbQ9wYe-TmrIFoAvw8UA3fu_.png",
          tag: "HYDRO CIRCUIT",
          tagColor: "teal",
          title: "Mountain Spring Plunge Basin",
          description:
            "Glacial mineral-fed cold plunge pools with alternating cedar wood-heated thermal immersion.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuDfpAHt6jvK0tqHjSOtwWov5kV0k6drBPNRLSiVIl6HCc8HmYLu6kP7ZcSMkoXJoQYyYna-AECNeG4p-A_ebakRmgUhPH120QlpPIxm37TebKXtltmAosqTtIJE7-VJ_kLKhjO8FKUubN6DEgNmCn8Z_JdjZVbuN-kizPtj0mtNkZ35ZnKBjxclPfIS8sOv3yXGVX6hkKc3M710ZC7yAh.png",
          tag: "DISPENSARY",
          tagColor: "rust",
          title: "Himalayan Botanical Apothecary",
          description:
            "Wild-harvested alpine botanicals compounded into proprietary oils, tisanes, and seasonal decoctions.",
        },
      ],
    },
    services: ["spa", "dining", "pool", "wifi", "suite"],
    hours: "08:00 – 21:00 Daily",
    phone: "+91 1892 221 234",
    email: "dharamshala@kyntawellness.com",
  },
  {
    name: "Asia Spa & Resort Dharamshala",
    slug: "asia-spa-dharamshala",
    address: "Dharamshala, Himachal Pradesh",
    region: "himalayan",
    price: "$200 / NIGHT",
    description:
      "A contemporary wellness resort harmonizing Tibetan healing traditions with modern spa architecture, offering panoramic Himalayan views, private thermal suites, and integrative Ayurvedic-Tibetan wellness programs.",
    breadcrumbEyebrow: "DHARAMSHALA • TIBETAN HEALING & HIMALAYAN PANORAMA",
    sanctuaryId: "HIM A–02",
    sanctuaryInfo: [
      {
        label: "CLIMATE & TERROIR",
        title: "Upper Dharamshala & McLeod Ganj Alpine Zone",
        value: "",
      },
      {
        label: "LINEAGE TRADITIONS",
        title: "Integrative Tibetan-Ayurvedic Somatic Therapy",
        value: "",
      },
      {
        label: "ACCOMMODATIONS",
        title: "20 Luxury Suites with Private Balcony & Mountain View",
        value: "",
      },
      {
        label: "NEAREST TRANSIT",
        title: "Gaggal Airport (DHM – 20 min) • Dharamshala Town (5 km)",
        value: "",
      },
    ],
    primaryCta: { label: "BOOK TREATMENT & STAY", url: "/contact" },
    secondaryCta: { label: "SANCTUARY DOSSIER (PDF)", url: "#" },
    gallery: {
      mainCard: {
        image:
          "/locations/Asia Spa & Resort Dharamshala/AB6AXuAsEjHi-gOYbQ5cZSt_SYR2sxtCQQ5KqPF84OFsr0yMInrj8Qk515bojFLESUE8EzIumuENEf1JtSooQv1gxSMcpg2_y-hBKoRoE4C8fjEah9Jfhf0LWtHIvsenmVNVqM3kA_r7rwL3YP4xEGbNC1LRI_j8u7lsfDugGq6OONJqxhqpMr6PkmiQr_8FIA0_I-wrhD6DzdJwKSsvh224S4.png",
        tag: "PRINCIPAL SANCTUARY • HIMALAYAN PANORAMIC RETREAT",
        title: "Asia Spa Wellness Pavilion & Infinity Pool",
        badge: "Dhauladhar Panorama",
        subtitle: "Infinity-edge thermal pool with 180° mountain panorama",
      },
      topRightCard: {
        image:
          "/locations/Asia Spa & Resort Dharamshala/AB6AXuBMc2ZJSRilI-cHzDGgxeBsLIhIJYp_-n5gSOuW6Pm-RcR2DQeTQEb45BJG_p9fiS6vHWdPybcLsZ68K2rl0hxLgS-5OIAjQIDwSLxQnZkjAMD5e-sRTJ_aahND_66hoybKnnp06Qmkp96ojDJCOBLlTxqCVyTj1MfA41Wz4BK2zxuYp-VnKbb7dJ2rsI6W-73zHFK138UpbJ4xdg5WN7.png",
        tag: "TIBETAN HEALING SUITES",
        title: "Private Ku Nye Therapy Chambers",
        subtitle: "Traditional Tibetan massage & moxibustion",
      },
      bottomRightCard: {
        image:
          "/locations/Asia Spa & Resort Dharamshala/AB6AXuC8_fN4pxmO9IcoBRi5A-JVr5uKAnyfIZCzpCV3bU4C4Z5jTAmW5aLTlVAivqUOOf4K7mK1lW7lbYNIDHAFSy2IHrrhBpNTZLphrfMcZJNfiD21CvCAbQ5dwjM5ecJGXVfYPJNc-By0c7Kf7id1DQIwCBDDwI6_nmA_iONSfzrmyu9ef4jU6nPFob8pHC15tnCSWzeVL0mOeRg8vV8smU.png",
        tag: "MOUNTAIN VIEW LOUNGE",
        title: "Sunrise Yoga & Meditation Terrace",
        subtitle: "Above-cloud contemplation at 5,800 feet",
      },
    },
    facilities: [
      {
        icon: "sun",
        title: "Thermal Infinity Pool",
        subtitle: "Heated mineral water therapy",
      },
      {
        icon: "flower",
        title: "Tibetan Herbal Pharmacy",
        subtitle: "Amchi medicine dispensary",
      },
      {
        icon: "mountain",
        title: "Panoramic Yoga Terrace",
        subtitle: "Dhauladhar mountain views",
      },
      {
        icon: "car",
        title: "Private Transfer Service",
        subtitle: "Airport & town shuttle",
      },
    ],
    spaces: {
      eyebrow: "ARCHITECTURAL STILLNESS",
      heading: "Sacred Spaces of the",
      headingItalic: "Mountain Panorama",
      description:
        "Contemporary spa architecture harmonized with Tibetan healing traditions and Dhauladhar mountain panoramas.",
      cards: [
        {
          image:
            "/locations/Asia Spa & Resort Dharamshala/AB6AXuAsEjHi-gOYbQ5cZSt_SYR2sxtCQQ5KqPF84OFsr0yMInrj8Qk515bojFLESUE8EzIumuENEf1JtSooQv1gxSMcpg2_y-hBKoRoE4C8fjEah9Jfhf0LWtHIvsenmVNVqM3kA_r7rwL3YP4xEGbNC1LRI_j8u7lsfDugGq6OONJqxhqpMr6PkmiQr_8FIA0_I-wrhD6DzdJwKSsvh224S4.png",
          tag: "SANCTUARY SUITE",
          tagColor: "teal",
          title: "Mountain Panorama Luxury Suite",
          description:
            "Private balconied suites with 180° Dhauladhar views and underfloor radiant heating.",
        },
        {
          image:
            "/locations/Asia Spa & Resort Dharamshala/AB6AXuBMc2ZJSRilI-cHzDGgxeBsLIhIJYp_-n5gSOuW6Pm-RcR2DQeTQEb45BJG_p9fiS6vHWdPybcLsZ68K2rl0hxLgS-5OIAjQIDwSLxQnZkjAMD5e-sRTJ_aahND_66hoybKnnp06Qmkp96ojDJCOBLlTxqCVyTj1MfA41Wz4BK2zxuYp-VnKbb7dJ2rsI6W-73zHFK138UpbJ4xdg5WN7.png",
          tag: "THERAPY CHAMBER",
          tagColor: "rust",
          title: "Ku Nye Tibetan Healing Room",
          description:
            "Dedicated Tibetan massage chambers with moxibustion stations and herbal steam alcoves.",
        },
        {
          image:
            "/locations/Asia Spa & Resort Dharamshala/AB6AXuBpn9ZD6DEXXvzpHGmMEEdzq6l6ZSZIzc9tNoEj9Gy4KLa-6Uc2v5xCHjNWYs8j-gnPKVn2S1jW__Gqox2-LnEKLj_r3uypu3e_26OtUKDn_gaEZ4ioFM1pxQi6BTSO11c13HXjUOQFvLXBmp7XdlLaVWh9floGIkyhyYoPdH6SNLApuZOwAZOrwT--7LdsckhdM5714E2uLe3-esleIA.png",
          tag: "INFINITY POOL",
          tagColor: "teal",
          title: "Thermal Infinity Edge Pool",
          description:
            "Heated mineral pool with vanishing edge overlooking the Kangra Valley cloud formations.",
        },
        {
          image:
            "/locations/Asia Spa & Resort Dharamshala/AB6AXuC8_fN4pxmO9IcoBRi5A-JVr5uKAnyfIZCzpCV3bU4C4Z5jTAmW5aLTlVAivqUOOf4K7mK1lW7lbYNIDHAFSy2IHrrhBpNTZLphrfMcZJNfiD21CvCAbQ5dwjM5ecJGXVfYPJNc-By0c7Kf7id1DQIwCBDDwI6_nmA_iONSfzrmyu9ef4jU6nPFob8pHC15tnCSWzeVL0mOeRg8vV8smU.png",
          tag: "DISPENSARY",
          tagColor: "rust",
          title: "Amchi Medicine Dispensary",
          description:
            "Traditional Tibetan herbal pharmacy with diagnostic pulse-reading and custom formulations.",
        },
      ],
    },
    services: ["spa", "dining", "pool", "wifi", "suite"],
    hours: "08:00 – 21:00 Daily",
    phone: "+91 1892 222 345",
    email: "asiaspa@kyntawellness.com",
  },
  {
    name: "Indraprastha Spa Resorts Dalhousie",
    slug: "indraprastha-dalhousie",
    address: "Dalhousie, Himachal Pradesh",
    region: "himalayan",
    price: "$250 / NIGHT",
    description:
      "A colonial-era hill station sanctuary reimagined for modern restorative wellness, offering pine forest hydrotherapy, British-era architecture infused with Ayurvedic warmth, and silent meditation gardens overlooking the Chamba Valley.",
    breadcrumbEyebrow:
      "CHAMBA VALLEY • COLONIAL HERITAGE & PINE FOREST STILLNESS",
    sanctuaryId: "HIM A–03",
    sanctuaryInfo: [
      {
        label: "CLIMATE & TERROIR",
        title: "Dalhousie Pine Ridge & Chamba Valley Microclimate",
        value: "",
      },
      {
        label: "LINEAGE TRADITIONS",
        title: "Alpine Panchakarma & Forest Bathing Shinrin-Yoku",
        value: "",
      },
      {
        label: "ACCOMMODATIONS",
        title: "22 Heritage Suites with Valley & Pine Forest Views",
        value: "",
      },
      {
        label: "NEAREST TRANSIT",
        title: "Pathankot Rail (CHK – 2 hrs) • Gaggal Airport (DHM – 3 hrs)",
        value: "",
      },
    ],
    primaryCta: { label: "BOOK TREATMENT & STAY", url: "/contact" },
    secondaryCta: { label: "SANCTUARY DOSSIER (PDF)", url: "#" },
    gallery: {
      mainCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuAwrVMzILVkvJdSKHV6KOt4YRo2SBEgnoj2YIROhqctBY7ghysfONhp-fJgI-Ylb5RrEJ4gL3ZY0iUsf9W21qwANDj5UffmPIc8-7MtR2q-Q_UKBZiwEL9a2b_LuJ4cUFy6K8ZqvgAedkiL_dkYASle0anA087NtqKb_GdAP4LtxhmkRSA9reT1KouAqVxmz6ka2OwRSmkPoMx7xBC9zA.png",
        tag: "PRINCIPAL SANCTUARY • CHAMBA VALLEY HERITAGE RETREAT",
        title: "Pine Forest Wellness Lodge & Thermal Baths",
        badge: "Heritage Hill Station",
        subtitle:
          "Colonial architecture with Ayurvedic warmth amidst pine forests",
      },
      topRightCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCPWnQOPklAH1szhLjSPp6mN5iKEs3NUuDXzMuOp0I9B_BetMCz6udfMOp9ACsKuf3DOUzoet0sOSH8Nrg1ugXaqyVjO98qFFKJDmiOX0lZBUjbz3QiBw3eKp1Eibv3jnRk5aCqe7ArM3Y-M2gpAz_ifo9zKDLBh8rT3Lt1m0t5oH_MJnBt9S7yUatFjfznXHsA2q9ecJXj7l1hqesuq7.png",
        tag: "FOREST HYDRO SUITES",
        title: "Pine-Infused Thermal Circuit & Plunge",
        subtitle: "Mountain spring water with alpine botanicals",
      },
      bottomRightCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/WhatsApp-Image-2026-07-17-at-3.21.44-PM 3.png",
        tag: "VALLEY MEDITATION",
        title: "Chamba Valley Silent Garden & Yoga Shala",
        subtitle: "Secluded contemplation among ancient pines",
      },
    },
    facilities: [
      {
        icon: "sun",
        title: "Pine Forest Thermal Baths",
        subtitle: "Natural spring-fed pools",
      },
      {
        icon: "flower",
        title: "Heritage Botanical Garden",
        subtitle: "Medicinal Himalayan herbs",
      },
      {
        icon: "mountain",
        title: "Valley Meditation Gardens",
        subtitle: "Chamba panoramic views",
      },
      {
        icon: "car",
        title: "Hill Station Concierge",
        subtitle: "Pathankot rail transfers",
      },
    ],
    spaces: {
      eyebrow: "ARCHITECTURAL STILLNESS",
      heading: "Sacred Spaces of the",
      headingItalic: "Pine Ridge",
      description:
        "Colonial-era hill station architecture reimagined with Ayurvedic treatment chambers and pine forest meditation gardens.",
      cards: [
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCPWnQOPklAH1szhLjSPp6mN5iKEs3NUuDXzMuOp0I9B_BetMCz6udfMOp9ACsKuf3DOUzoet0sOSH8Nrg1ugXaqyVjO98qFFKJDmiOX0lZBUjbz3QiBw3eKp1Eibv3jnRk5aCqe7ArM3Y-M2gpAz_ifo9zKDLBh8rT3Lt1m0t5oH_MJnBt9S7yUatFjfznXHsA2q9ecJXj7l1hqesuq7.png",
          tag: "SANCTUARY SUITE",
          tagColor: "teal",
          title: "Heritage Pine Lodge Suite",
          description:
            "Restored colonial suites with period furnishings, pine-scented air, and Chamba Valley views.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCNSLYPmnuaPap66ahjYy1RAlP_oqqHP1_DG4U2zy9n-vOp3KuS4PLbNt2vj52caJrKGXZNi94ti3tRLDDbOCMziXvsbZXvEAMicmNc2vFlvG2BWCQm9b31HlFXmtSGP0EAXb1jE4rNZ0kDaBhZy-Olh51oKeRLbORA1vWGsSmyUqlqiYYgL06r3UfxCPMv5XUsOTp73zWpGAaDhCqjgP.png",
          tag: "THERAPY CHAMBER",
          tagColor: "rust",
          title: "Forest Bathing Therapy Room",
          description:
            "Open-air treatment pavilions surrounded by ancient pine canopy with natural ventilation.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCcdJI4NTtZFr3MpSldween3mNgDK7SIa-ppWquf_Hd6bdzh7PlXi7QcXI4pyRv_78SJengbacGKjuFki0pyTFl-0egrU4q9h8DRe9XXqPsQ4cUfuKY3A8RCNsZ0FW2nYwqiYyb927sCcUlZ15OgNzN_zOd0pLnkAj6uEEjzvtL2W4F4Go-OhfCuI49dHAbQ9wYe-TmrIFoAvw8UA3fu_.png",
          tag: "HYDRO CIRCUIT",
          tagColor: "teal",
          title: "Pine-Infused Thermal Springs",
          description:
            "Natural spring-fed pools infused with pine resin and mountain mineral salts.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/WhatsApp-Image-2026-07-17-at-3.21.44-PM 3.png",
          tag: "DISPENSARY",
          tagColor: "rust",
          title: "Heritage Garden Apothecary",
          description:
            "Medicinal herb gardens with on-site compounding of traditional Himalayan decoctions.",
        },
      ],
    },
    services: ["spa", "dining", "pool", "wifi", "suite"],
    hours: "08:00 – 21:00 Daily",
    phone: "+91 1899 223 456",
    email: "dalhousie@kyntawellness.com",
  },
  {
    name: "Bhanwar Singh Palace Rajasthan",
    slug: "bhanjwar-palace",
    address: "Rajasthan",
    region: "rajasthan",
    price: "$300 / NIGHT",
    description:
      "A 19th-century royal palace meticulously restored as a sovereign Ayurvedic sanctuary, offering heritage hammam rituals, rose-infused hydrotherapy in royal courtyards, and bespoke Marwar botanical treatments drawn from princely apothecary traditions.",
    breadcrumbEyebrow: "MARWAR HERITAGE • ROYAL COURTYARDS & PALACE AYURVEDA",
    sanctuaryId: "RAJ R–01",
    sanctuaryInfo: [
      {
        label: "CLIMATE & TERROIR",
        title: "Arid Marwar Plateau & Desert Rose Microclimate",
        value: "",
      },
      {
        label: "LINEAGE TRADITIONS",
        title: "Royal Hammam & Marwar Princely Apothecary Rituals",
        value: "",
      },
      {
        label: "ACCOMMODATIONS",
        title: "16 Palace Suites with Courtyard & Haveli Architecture",
        value: "",
      },
      {
        label: "NEAREST TRANSIT",
        title: "Jodhpur Airport (JDH – 40 min) • Private Helipad Available",
        value: "",
      },
    ],
    primaryCta: { label: "BOOK TREATMENT & STAY", url: "/contact" },
    secondaryCta: { label: "SANCTUARY DOSSIER (PDF)", url: "#" },
    gallery: {
      mainCard: {
        image: "/locations/Bhanwar Singh Palace Rajasthan/unnamed (1) 1.png",
        tag: "PRINCIPAL SANCTUARY • MARWAR ROYAL PALACE HERITAGE",
        title: "Palace Courtyard & Royal Hammam Pavilion",
        badge: "Heritage Palace Retreat",
        subtitle: "19th-century courtyard with rose-petal hydrotherapy pools",
      },
      topRightCard: {
        image:
          "/locations/Bhanwar Singh Palace Rajasthan/file_0000000020f87209babcb5ae3725f9f8 1.png",
        tag: "ROYAL APOTHECARY",
        title: "Marwar Botanical Treatment Chamber",
        subtitle: "Princely herbal traditions & desert flora infusions",
      },
      bottomRightCard: {
        image:
          "/locations/Bhanwar Singh Palace Rajasthan/unsplash_olEZANsI-gI.png",
        tag: "HAVELI SUITES",
        title: "Heritage Suite & Private Jharokha Terrace",
        subtitle: "Hand-painted frescoes & royal Rajasthani architecture",
      },
    },
    facilities: [
      {
        icon: "sun",
        title: "Royal Hammam & Rose Pool",
        subtitle: "Heated courtyard hydrotherapy",
      },
      {
        icon: "flower",
        title: "Marwar Desert Botanicals",
        subtitle: "Rare desert flora formulations",
      },
      {
        icon: "mountain",
        title: "Palace Yoga Courtyard",
        subtitle: "Sunrise sessions in heritage gardens",
      },
      {
        icon: "car",
        title: "Royal Concierge & Helipad",
        subtitle: "Private VIP desert arrival",
      },
    ],
    spaces: {
      eyebrow: "ARCHITECTURAL STILLNESS",
      heading: "Sacred Spaces of the",
      headingItalic: "Royal Palace",
      description:
        "Meticulously restored 19th-century palace chambers with royal courtyard hydrotherapy and Marwar heritage architecture.",
      cards: [
        {
          image: "/locations/Bhanwar Singh Palace Rajasthan/unnamed (1) 1.png",
          tag: "SANCTUARY SUITE",
          tagColor: "teal",
          title: "Royal Haveli Palace Suite",
          description:
            "Restored princely chambers with hand-painted frescoes, jharokha balconies, and courtyard views.",
        },
        {
          image:
            "/locations/Bhanwar Singh Palace Rajasthan/file_0000000020f87209babcb5ae3725f9f8 1.png",
          tag: "THERAPY CHAMBER",
          tagColor: "rust",
          title: "Royal Hammam & Steam Chamber",
          description:
            "Heritage hammam restored with traditional rose-water steam circuits and warm stone therapy beds.",
        },
        {
          image:
            "/locations/Bhanwar Singh Palace Rajasthan/file_00000000cd907206b8d71d151a1e42e1 1.png",
          tag: "PALACE COURTYARD",
          tagColor: "teal",
          title: "Rose Garden Hydrotherapy Court",
          description:
            "Central courtyard with rose-petal plunge pools and sandstone thermal lounging alcoves.",
        },
        {
          image:
            "/locations/Bhanwar Singh Palace Rajasthan/unsplash_olEZANsI-gI.png",
          tag: "DISPENSARY",
          tagColor: "rust",
          title: "Marwar Royal Apothecary",
          description:
            "Desert flora formulations drawn from princely botanical traditions and rare Rajasthani attars.",
        },
      ],
    },
    services: ["spa", "dining", "pool", "wifi", "suite"],
    hours: "08:00 – 21:00 Daily",
    phone: "+91 141 224 567",
    email: "bhanjwar@kyntawellness.com",
  },
  {
    name: "Infinitea Sports Club & Tea Garden Resort",
    slug: "infinitea-palampur",
    address: "Palampur, Himachal Pradesh",
    region: "himalayan",
    price: "$300 / NIGHT",
    description:
      "A lush tea-garden wellness estate in the Kangra Valley, combining active sport rejuvenation with traditional Ayurvedic spa therapies, surrounded by emerald tea plantations and the snow-capped Dhauladhar range.",
    breadcrumbEyebrow:
      "KANGRA TEA COUNTRY • PLANTATION WELLNESS & ALPINE SPORT",
    sanctuaryId: "HIM A–04",
    sanctuaryInfo: [
      {
        label: "CLIMATE & TERROIR",
        title: "Palampur Tea Belt & Lower Dhauladhar Foothills",
        value: "",
      },
      {
        label: "LINEAGE TRADITIONS",
        title: "Active Sport Recovery & Tea-Infused Ayurvedic Therapy",
        value: "",
      },
      {
        label: "ACCOMMODATIONS",
        title: "28 Plantation Cottages & Mountain-View Sport Suites",
        value: "",
      },
      {
        label: "NEAREST TRANSIT",
        title: "Gaggal Airport (DHM – 30 min) • Palampur Town (3 km)",
        value: "",
      },
    ],
    primaryCta: { label: "BOOK TREATMENT & STAY", url: "/contact" },
    secondaryCta: { label: "SANCTUARY DOSSIER (PDF)", url: "#" },
    gallery: {
      mainCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuAwyidA0IfYKksUZ7WDNhdZezNraDVHG-jfyN4VzkVB3ul6zfjC7Ub5vV-Go3QmT_Pe5qLLGZbmEn7EmIfAwgDjCxNAxZcWiGa7DVdh5fjlDlMckkYQIBSFIcg8rNo-AxmxOEX4qgpGIV232efeM-r1Qudt4PfHmSn6tQdi3MV48cGG23A9fhJXWrVLswKp3I5uDDOE2kyS6SXAbWA7Nz.png",
        tag: "PRINCIPAL SANCTUARY • KANGRA TEA PLANTATION ESTATE",
        title: "Tea Garden Wellness Pavilion & Sport Courts",
        badge: "Plantation Retreat",
        subtitle: "Emerald tea terraces with Dhauladhar mountain backdrop",
      },
      topRightCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCcdJI4NTtZFr3MpSldween3mNgDK7SIa-ppWquf_Hd6bdzh7PlXi7QcXI4pyRv_78SJengbacGKjuFki0pyTFl-0egrU4q9h8DRe9XXqPsQ4cUfuKY3A8RCNsZ0FW2nYwqiYyb927sCcUlZ15OgNzN_zOd0pLnkAj6uEEjzvtL2W4F4Go-OhfCuI49dHAbQ9wYe-TmrIFoAvw8UA3fu_.png",
        tag: "SPORT RECOVERY CENTER",
        title: "Active Rejuvenation & Cold Plunge Suite",
        subtitle: "Post-sport hydrotherapy & deep tissue recovery",
      },
      bottomRightCard: {
        image:
          "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuDfpAHt6jvK0tqHjSOtwWov5kV0k6drBPNRLSiVIl6HCc8HmYLu6kP7ZcSMkoXJoQYyYna-AECNeG4p-A_ebakRmgUhPH120QlpPIxm37TebKXtltmAosqTtIJE7-VJ_kLKhjO8FKUubN6DEgNmCn8Z_JdjZVbuN-kizPtj0mtNkZ35ZnKBjxclPfIS8sOv3yXGVX6hkKc3M710ZC7yAh.png",
        tag: "TEA GARDEN THERAPY",
        title: "Plantation Walk & Green Tea Detox Ritual",
        subtitle: "Fresh-leaf green tea infusion & aromatic garden paths",
      },
    },
    facilities: [
      {
        icon: "sun",
        title: "Sport Recovery Hydrotherapy",
        subtitle: "Cold plunge & thermal contrast",
      },
      {
        icon: "flower",
        title: "Tea-Infused Botanical Spa",
        subtitle: "Estate-grown green tea therapy",
      },
      {
        icon: "mountain",
        title: "Plantation Walking Trails",
        subtitle: "Guided tea garden meditation",
      },
      {
        icon: "car",
        title: "Airport Shuttle & Concierge",
        subtitle: "Gaggal airport transfers",
      },
    ],
    spaces: {
      eyebrow: "ARCHITECTURAL STILLNESS",
      heading: "Sacred Spaces of the",
      headingItalic: "Tea Plantation",
      description:
        "Lush tea-garden cottages combining active sport recovery architecture with traditional Ayurvedic therapy chambers.",
      cards: [
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuAwrVMzILVkvJdSKHV6KOt4YRo2SBEgnoj2YIROhqctBY7ghysfONhp-fJgI-Ylb5RrEJ4gL3ZY0iUsf9W21qwANDj5UffmPIc8-7MtR2q-Q_UKBZiwEL9a2b_LuJ4cUFy6K8ZqvgAedkiL_dkYASle0anA087NtqKb_GdAP4LtxhmkRSA9reT1KouAqVxmz6ka2OwRSmkPoMx7xBC9zA.png",
          tag: "SANCTUARY SUITE",
          tagColor: "teal",
          title: "Plantation View Cottage Suite",
          description:
            "Private tea-garden cottages with panoramic Dhauladhar views and covered meditation verandas.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCNSLYPmnuaPap66ahjYy1RAlP_oqqHP1_DG4U2zy9n-vOp3KuS4PLbNt2vj52caJrKGXZNi94ti3tRLDDbOCMziXvsbZXvEAMicmNc2vFlvG2BWCQm9b31HlFXmtSGP0EAXb1jE4rNZ0kDaBhZy-Olh51oKeRLbORA1vWGsSmyUqlqiYYgL06r3UfxCPMv5XUsOTp73zWpGAaDhCqjgP.png",
          tag: "THERAPY CHAMBER",
          tagColor: "rust",
          title: "Sport Recovery & Deep Tissue Suite",
          description:
            "Dedicated recovery rooms with contrast therapy pools, cryotherapy, and deep tissue equipment.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCcdJI4NTtZFr3MpSldween3mNgDK7SIa-ppWquf_Hd6bdzh7PlXi7QcXI4pyRv_78SJengbacGKjuFki0pyTFl-0egrU4q9h8DRe9XXqPsQ4cUfuKY3A8RCNsZ0FW2nYwqiYyb927sCcUlZ15OgNzN_zOd0pLnkAj6uEEjzvtL2W4F4Go-OhfCuI49dHAbQ9wYe-TmrIFoAvw8UA3fu_.png",
          tag: "TEA GARDEN",
          tagColor: "teal",
          title: "Plantation Wellness Trail",
          description:
            "Guided walking meditation paths through emerald tea terraces with aromatherapy stations.",
        },
        {
          image:
            "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuDfpAHt6jvK0tqHjSOtwWov5kV0k6drBPNRLSiVIl6HCc8HmYLu6kP7ZcSMkoXJoQYyYna-AECNeG4p-A_ebakRmgUhPH120QlpPIxm37TebKXtltmAosqTtIJE7-VJ_kLKhjO8FKUubN6DEgNmCn8Z_JdjZVbuN-kizPtj0mtNkZ35ZnKBjxclPfIS8sOv3yXGVX6hkKc3M710ZC7yAh.png",
          tag: "DISPENSARY",
          tagColor: "rust",
          title: "Green Tea Detox Pharmacy",
          description:
            "Estate-grown green tea blends with Ayurvedic adaptogenic infusions and seasonal tisanes.",
        },
      ],
    },
    services: ["spa", "dining", "pool", "wifi", "suite"],
    hours: "08:00 – 21:00 Daily",
    phone: "+91 1894 226 789",
    email: "infinitea@kyntawellness.com",
  },
];

type SanityLocationResult = {
  name: string;
  address: string;
  region: string;
  price?: string;
  slug?: string;
  imagePath?: string;
  detailsUrl?: string;
  hours?: string;
  phone?: string;
  email?: string;
  services?: string[];
};

export async function getLocationBySlug(
  slug: string,
): Promise<LocationDetail | null> {
  const result = await fetchSanity<SanityLocationResult>(locationBySlugQuery, {
    slug,
  });
  if (result) {
    const fallback = fallbackLocations.find((l) => l.slug === slug);
    if (fallback) {
      return {
        ...fallback,
        name: result.name || fallback.name,
        address: result.address || fallback.address,
        region: result.region || fallback.region,
        price: result.price || fallback.price,
        hours: result.hours || fallback.hours,
        phone: result.phone || fallback.phone,
        email: result.email || fallback.email,
        services: result.services?.length ? result.services : fallback.services,
      };
    }
  }
  return fallbackLocations.find((l) => l.slug === slug) ?? null;
}

export async function getAllLocationSlugs(): Promise<string[]> {
  const result = await fetchSanity<(string | null)[]>(allLocationSlugsQuery);
  if (result && result.length > 0) {
    // Sanity may return null entries for items without slugs; filter those out
    return result.filter(
      (s): s is string => typeof s === "string" && s.length > 0,
    );
  }
  return fallbackLocations.map((l) => l.slug);
}
