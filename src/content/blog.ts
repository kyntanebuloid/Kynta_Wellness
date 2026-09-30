import type { AccentColor, ContentImage, ContentLink } from "./types";

export type ChapterIcon = "microbiome" | "thermal" | "architecture";

export interface BlogPageContent {
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    categories?: string[];
    featured?: {
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
      url?: string;
      linkLabel?: string;
    };
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
      url?: string;
    }[];
  };
  compendiumSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    chapters?: { icon?: ChapterIcon; title: string; description: string }[];
    primaryCta?: ContentLink;
    secondaryCta?: ContentLink;
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

export const blogPageDefaults = {
  hero: {
    eyebrow: "THE KYNTA SANCTUARY GAZETTE — VOL. IV",
    heading:
      "Treatises on Stillness, Botanical Formulations & Restorative Space.",
    subheading:
      "Dispatches from our Ayurvedic practitioners, spatial masterplanners, and apothecary artisans exploring the intersection of Vedic healing, circadian biology, and contemporary architecture.",
    categories: [
      "ALL ESSAYS",
      "BOTANICAL APOTHECARY",
      "SANCTUARY ARCHITECTURE",
      "CIRCADIAN SOMATICS",
      "AYURVEDIC SCIENCE",
      "VAIDYA CASE STUDIES",
    ],
    featured: {
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
      url: "/blog/alchemy-of-fresh-wildcrafted-botanicals",
      linkLabel: "READ TREATISE",
    },
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
        url: "/blog/acoustic-silence-spatial-attenuation",
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
        url: "/blog/circadian-chronobiology-evening-abhyanga",
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
        url: "/blog/thermal-transitions-salt-grottos",
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
    primaryCta: { label: "REQUEST DIGITAL MONOGRAPH (PDF)", url: "#download-pdf" },
    secondaryCta: { label: "ORDER HARDCOVER EDITION", url: "#order-hardcover" },
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
