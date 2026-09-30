import type {
  AccentColor,
  ContentFile,
  ContentImage,
  ContentLink,
} from "./types";

export type ChapterIcon = "microbiome" | "thermal" | "architecture";

/** A category button and the featured article it shows. */
export interface BlogCategory {
  label: string;
  /** Picked Blog Post; when set (and visible) the card shows and opens it. */
  post?: BlogPostSummary | null;
  image?: ContentImage;
  badge?: string;
  category?: string;
  issue?: string;
  readTime?: string;
  title?: string;
  description?: string;
  authorInitials?: string;
  authorName?: string;
  authorRole?: string;
  /** The read link shows only when a PDF or a link is set (PDF wins). */
  pdf?: ContentFile;
  url?: string;
  linkLabel?: string;
}

export interface BlogPageContent {
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    categories?: BlogCategory[];
  };
  inquiriesSection?: {
    eyebrow?: string;
    heading?: string;
    note?: string;
    articles?: {
      image?: ContentImage;
      tag?: string;
      meta?: string;
      title: string;
      description: string;
      linkLabel?: string;
      /** The read link shows only when a PDF or a link is set (PDF wins). */
      pdf?: ContentFile;
      url?: string;
    }[];
  };
  compendiumSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    chapters?: { icon?: ChapterIcon; title: string; description: string }[];
    monographLabel?: string;
    /** The monograph button only shows once a PDF is uploaded. */
    monographPdf?: ContentFile;
    /** The hardcover button only shows when a link is set. */
    hardcoverCta?: ContentLink;
    ledger?: {
      label?: string;
      code?: string;
      statValue?: string;
      statLabel?: string;
      bars?: {
        label: string;
        value: string;
        percent?: number;
        color?: AccentColor;
      }[];
      footnote?: string;
    };
  };
  philosophySection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    fieldNotes?: {
      author?: string;
      location?: string;
      title: string;
      quote: string;
    }[];
    soundEyebrow?: string;
    soundHeading?: string;
    soundDescription?: string;
    audioTracks?: {
      title: string;
      subtitle?: string;
      duration?: string;
      color?: AccentColor;
    }[];
    soundNote?: string;
  };
}

/** A blog post as listed on /blog (a Sanity "Blog Post" document). */
export interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: ContentImage | null;
  category?: string | null;
  readTime?: string | null;
  author?: string | null;
  authorRole?: string | null;
  publishedAt?: string | null;
}

/** An inline image in the article text. */
export interface BlogBodyImage extends ContentImage {
  _type: "contentImage";
  _key: string;
  caption?: string | null;
}

export interface BlogPostDetail extends BlogPostSummary {
  /** Portable Text blocks and inline images. */
  content?: ({ _type: string; _key: string } & Record<string, unknown>)[];
  /** The download button only shows once a PDF is uploaded. */
  pdf?: ContentFile | null;
  pdfLabel?: string | null;
  seo?: { title?: string | null; description?: string | null } | null;
}

const postDate = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/** "12 Mar 2026", or "" when the date is missing or invalid. */
export function formatPostDate(value?: string | null): string {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? postDate.format(date) : "";
}

/** "6 MIN READ · 12 MAR 2026" — whichever parts are set. */
export function blogPostMeta(post: BlogPostSummary): string {
  return [post.readTime, formatPostDate(post.publishedAt).toUpperCase()]
    .filter(Boolean)
    .join(" · ");
}

export const blogPageDefaults = {
  hero: {
    eyebrow: "THE KYNTA SANCTUARY GAZETTE — VOL. IV",
    heading:
      "Treatises on Stillness, Botanical Formulations & Restorative Space.",
    subheading:
      "Dispatches from our Ayurvedic practitioners, spatial masterplanners, and apothecary artisans exploring the intersection of Vedic healing, circadian biology, and contemporary architecture.",
    categories: [
      {
        label: "ALL ESSAYS",
        image: {
          url: "/blog-featured-kashayam.jpg",
          alt: "Ayurvedic botanical oil extraction with golden elixir dropper into hammered bronze bowl",
        },
        badge: "COVER MONOGRAPH",
        category: "BOTANICAL APOTHECARY",
        issue: "ISSUE 28",
        readTime: "8 MIN READ",
        title:
          "The Alchemy of Fresh Wildcrafted Botanicals: Seasonal Kashayams in High-Stress Restoration",
        description:
          "Why fresh-pressed decoctions and artisanal marma formulations yield biological equilibrium far beyond standardized extracts. Dr. Ananya Varma details our 48-hour wildcrafting harvest protocols in the Nilgiri foothills.",
        authorInitials: "AV",
        authorName: "DR. ANANYA VARMA",
        authorRole: "Chief Vaidya & Botanical Formulation Director",
        url: "",
        linkLabel: "READ TREATISE",
      },
      {
        label: "BOTANICAL APOTHECARY",
        image: {
          url: "/article-herbal-compress.jpg",
          alt: "Warm herbal compress bundles",
        },
        badge: "APOTHECARY NOTES",
        category: "BOTANICAL APOTHECARY",
        issue: "ISSUE 27",
        readTime: "6 MIN READ",
        title: "How Warm Herbal Compresses Help the Body Recover From Stress",
        description:
          "Warm bundles filled with herbs relax deep muscles and help lower stress in the body.",
        authorInitials: "HN",
        authorName: "DR. HARISH NAMBOODIRI",
        authorRole: "Chief Ayurvedic Vaidya",
        url: "",
        linkLabel: "READ TREATISE",
      },
      {
        label: "SANCTUARY ARCHITECTURE",
        image: {
          url: "/inquiry-architecture.jpg",
          alt: "Serene stepped courtyard pool garden with stone walkway and pergola",
        },
        badge: "ARCHITECTURE NOTE",
        category: "SANCTUARY ARCHITECTURE",
        issue: "ISSUE 26",
        readTime: "6 MIN READ",
        title:
          "Acoustic Silence and Sub-24dB Spatial Attenuation in Luxury Sanctuaries",
        description:
          "How porous limestone, stepped courtyards, and subterranean water circuits recalibrate autonomic nervous system reactivity.",
        authorInitials: "DS",
        authorName: "DEVENDRA SENGUPTA",
        authorRole: "Head of Spatial Architecture",
        url: "",
        linkLabel: "READ ARCHITECTURE NOTE",
      },
      {
        label: "CIRCADIAN SOMATICS",
        image: {
          url: "/timeline-kerala.jpg",
          alt: "Misty herbal plantation terraces at dawn",
        },
        badge: "FIELD NOTE",
        category: "CIRCADIAN SOMATICS",
        issue: "ISSUE 25",
        readTime: "4 MIN READ",
        title: "On the Sacred Stillness of Bramha Muhurta",
        description:
          "The ninety minutes prior to sunrise possess a rarefied rhythm. When meditating before ambient light saturates the courtyard, cellular metabolic tension settles into genuine rest.",
        authorInitials: "SN",
        authorName: "VAIDYA SURESH NAIR",
        authorRole: "Kumarakom Retreat",
        url: "",
        linkLabel: "READ FIELD NOTE",
      },
      {
        label: "AYURVEDIC SCIENCE",
        image: {
          url: "/inquiry-ayurveda.jpg",
          alt: "Traditional warm bronze oil vessel with red linen cloth and rolled towels",
        },
        badge: "CLINICAL INSIGHT",
        category: "AYURVEDIC SCIENCE",
        issue: "ISSUE 24",
        readTime: "7 MIN READ",
        title: "Circadian Chronobiology & The Art of the Evening Abhyanga",
        description:
          "Aligning therapeutic pressure sequences with pituitary gland melatonin cycles for deep regenerative sleep.",
        authorInitials: "HN",
        authorName: "DR. HARISH NAMBOODIRI",
        authorRole: "Chief Ayurvedic Vaidya",
        url: "",
        linkLabel: "READ CLINICAL INSIGHT",
      },
      {
        label: "VAIDYA CASE STUDIES",
        image: {
          url: "/inquiry-hydrotherapy.jpg",
          alt: "Calm stone thermal hydro plunge pool with waterfall and loungers",
        },
        badge: "CASE STUDY",
        category: "VAIDYA CASE STUDIES",
        issue: "ISSUE 23",
        readTime: "5 MIN READ",
        title:
          "Thermal Transitions: The Physiological Protocol of Salt Grottos",
        description:
          "Balancing hot vapor rooms with cold mineral plunge immersion to stimulate lymphatic vascular flushing.",
        authorInitials: "HN",
        authorName: "DR. HARISH NAMBOODIRI",
        authorRole: "Chief Ayurvedic Vaidya",
        url: "",
        linkLabel: "READ CASE STUDY",
      },
    ],
  },
  inquiriesSection: {
    eyebrow: "PEER-REVIEWED FIELDWORK",
    heading: "Recent Inquiries & Protocols",
    note: "REFLECTING 2024–2025 SANCTUARY TRIALS",
    articles: [
      {
        image: {
          url: "/inquiry-architecture.jpg",
          alt: "Serene stepped courtyard pool garden with stone walkway and pergola",
        },
        tag: "ARCHITECTURE",
        meta: "SANCTUARY ARCHITECTURE • 6 MIN READ",
        title:
          "Acoustic Silence and Sub-24dB Spatial Attenuation in Luxury Sanctuaries",
        description:
          "How porous limestone, stepped courtyards, and subterranean water circuits recalibrate autonomic nervous system reactivity.",
        linkLabel: "READ ARCHITECTURE NOTE",
        url: "",
      },
      {
        image: {
          url: "/inquiry-ayurveda.jpg",
          alt: "Traditional warm bronze oil vessel with red linen cloth and rolled towels",
        },
        tag: "AYURVEDIC SCIENCE",
        meta: "AYURVEDIC SCIENCE • 7 MIN READ",
        title: "Circadian Chronobiology & The Art of the Evening Abhyanga",
        description:
          "Aligning therapeutic pressure sequences with pituitary gland melatonin cycles for deep regenerative sleep.",
        linkLabel: "READ CLINICAL INSIGHT",
        url: "",
      },
      {
        image: {
          url: "/inquiry-hydrotherapy.jpg",
          alt: "Calm stone thermal hydro plunge pool with waterfall and loungers",
        },
        tag: "HYDROTHERAPY",
        meta: "HYDROTHERMAL THERAPY • 5 MIN READ",
        title:
          "Thermal Transitions: The Physiological Protocol of Salt Grottos",
        description:
          "Balancing hot vapor rooms with cold mineral plunge immersion to stimulate lymphatic vascular flushing.",
        linkLabel: "READ FIELD REPORT",
        url: "",
      },
    ],
  },
  compendiumSection: {
    eyebrow: "SPECIAL MONOGRAPH COLLECTION",
    heading: "The 2025 Integrative Longevity Compendium",
    description:
      "Download our 64-page peer-reviewed monograph examining clinical data from over 14,000 guest retreat journeys across our Indian and overseas sanctuaries.",
    chapters: [
      {
        icon: "microbiome",
        title: "Chapter I: Microbiome Restoration via Triphala Protocols",
        description:
          "Biomarker shifts over 21 days of continuous botanical assimilation in high-altitude environments.",
      },
      {
        icon: "thermal",
        title: "Chapter II: Thermal Shock Proteins in Somatic Healing",
        description:
          "Vascular remodeling observed through alternating cedar sweat lodges and copper ice plunge cycles.",
      },
      {
        icon: "architecture",
        title: "Chapter III: Spatial Biophilic Engineering in Heritage Palaces",
        description:
          "Integrating Vaastu architectural orientations with calibrated acoustic damping for cortisol reduction.",
      },
    ],
    monographLabel: "REQUEST DIGITAL MONOGRAPH (PDF)",
    hardcoverCta: { label: "ORDER HARDCOVER EDITION", url: "" },
    ledger: {
      label: "INSTITUTIONAL LEDGER",
      code: "ISBN 978–0–9882",
      statValue: "14,280+",
      statLabel: "DOCUMENTED GUEST BASELINES",
      bars: [
        {
          label: "Sleep Architecture Index",
          value: "+41.8% REM Stabilization",
          percent: 78,
          color: "teal",
        },
        {
          label: "Salivary Cortisol Reduction",
          value: "−32.4% Post 7–Day Rasayana",
          percent: 64,
          color: "rust",
        },
      ],
      footnote:
        "Compiled across 6 wellness sanctuaries with the International Council for Integrative Therapeutics.",
    },
  },
  philosophySection: {
    eyebrow: "LIVING PHILOSOPHY",
    heading: "Practitioner Field Notes",
    description:
      "Concise reflections on daily mindfulness, prana containment, and herbal decoctions by resident Vaidyas.",
    fieldNotes: [
      {
        author: "VAIDYA SURESH NAIR",
        location: "Kumarakom Retreat",
        title: "On the Sacred Stillness of Bramha Muhurta",
        quote:
          "“The ninety minutes prior to sunrise possess a rarefied electromagnetic rhythm. When meditating before ambient light saturates the courtyard, cellular metabolic tension settles into genuine rest.”",
      },
      {
        author: "MASTER HEALER MIRA PATEL",
        location: "Himalayan High Sanctuaries",
        title: "The Micro-Dosing of Warm Sesame Vata Oils",
        quote:
          "“It is not the quantity of oil poured, but the continuous cadence of friction on key marma points that gently disarms chronic muscular resistance.”",
      },
      {
        author: "ACHARYA DEVRAJ",
        location: "Udaipur Lake Sanctuary",
        title: "Water Temperature as Emotional Architecture",
        quote:
          "“Immersing the spine in 34–degree spring water mirrors uterine thermal equilibrium, instantly softening the sympathetic nervous flight response.”",
      },
    ],
    soundEyebrow: "SONIC RESTORATIVES",
    soundHeading: "Soundscapes & Audio Treatises",
    soundDescription:
      "Bespoke spatial soundscapes recorded inside our temple courtyards, calibrated for deep theta meditation.",
    audioTracks: [
      {
        title: "Rudra Veena Harmonics & Rainfall in Coorg",
        subtitle: "Acoustic Chamber Vol. 3",
        duration: "18 Min Duration",
        color: "teal",
      },
      {
        title: "Guided Nadi Shodhana for Circadian Sunset Transition",
        subtitle: "Voiced by Dr. Ananya Varma",
        duration: "24 Min Duration",
        color: "rust",
      },
      {
        title: "Subterranean Water Flow & Tibetan Bell Resonances",
        subtitle: "Hydrothermal Room Binaural",
        duration: "45 Min Immersion",
        color: "teal",
      },
    ],
    soundNote:
      "All soundscapes are mastered in lossless spatial audio. Listen with noise-isolating headphones in a dim space for optimal neural relaxation.",
  },
} satisfies Required<BlogPageContent>;
