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
import { sanityClient } from "./client";
import {
  aboutPageQuery,
  allBlogPostsQuery,
  allExperiencesQuery,
  allExperienceSlugsQuery,
  allFaqsQuery,
  allServicesQuery,
  allTestimonialsQuery,
  allTreatmentsQuery,
  blogPageQuery,
  blogPostBySlugQuery,
  blogPostsByCategoryQuery,
  contactPageQuery,
  experienceBySlugQuery,
  experiencesPageQuery,
  faqsByCategoryQuery,
  homepageQuery,
  hospitalityPageQuery,
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

export async function getServiceBySlug(
  slug: string,
): Promise<Service | null> {
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
  const result = await fetchSanity<Testimonial[]>(
    testimonialsByServiceQuery,
    { serviceId },
  );
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
