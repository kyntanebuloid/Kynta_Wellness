import type {
  AccentColor,
  ContentFile,
  ContentImage,
  ContentLink,
} from "./types";

export type TimelineIcon =
  | "botanical"
  | "blueprint"
  | "hospitality"
  | "alpine"
  | "standard";
export type CredentialIcon = "hospitality" | "protocol" | "architecture";
export type AccreditationIcon = "medal" | "shield" | "star" | "eco";

export interface AboutPageContent {
  hero?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    philosophyLabel?: string;
    philosophyPdf?: ContentFile;
    secondaryCta?: ContentLink;
    image?: ContentImage;
    imageCaption?: string;
    badgeLabel?: string;
    badgeText?: string;
    stats?: { value: string; label: string; description?: string }[];
  };
  triadSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    cards?: {
      number?: string;
      title: string;
      description: string;
      image?: ContentImage;
      iconColor?: AccentColor;
      footerLabel?: string;
      footerValue?: string;
      footerValueColor?: AccentColor;
    }[];
  };
  timelineSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    milestones?: {
      year: string;
      title: string;
      description: string;
      category?: string;
      categoryColor?: AccentColor;
      dotColor?: AccentColor;
      icon?: TimelineIcon;
      image?: ContentImage;
    }[];
  };
  leadershipSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    members?: {
      name: string;
      role: string;
      bio?: string;
      credentialIcon?: CredentialIcon;
      credentialText?: string;
      image?: ContentImage;
    }[];
  };
  stewardshipSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    features?: { title: string; description: string }[];
    images?: ContentImage[];
  };
  accreditationsSection?: {
    heading?: string;
    awards?: {
      title: string;
      subtitle?: string;
      icon?: AccreditationIcon;
    }[];
  };
}

export const aboutDefaults = {
  hero: {
    eyebrow: "A Monograph on Heritage & Equilibrium",
    heading: "Ancient Wisdom.\nArchitectural Stillness.",
    description:
      "Kynta was conceived at the quiet crossroads where classical Ayurvedic therapeutics intersect with modern architectural composure. We construct sensory sanctuaries where the nervous system unwinds, breathing life into unhurried restorative traditions within the world's most discerning luxury hospitality environments.",
    philosophyLabel: "Explore Our Philosophy",

    secondaryCta: { label: "Inquire With Concierge", url: "/contact" },
    image: {
      url: "/about-hero.jpg",
      alt: "Kynta sanctuary interior with heritage architecture and turquoise plunge pool",
    },
    imageCaption: "Spatial Concept · Sanctum 01",
    badgeLabel: "Lineage Assured",
    badgeText: "8th-Generation Herbal\nApothecary Traditions",
    stats: [
      {
        value: "14+",
        label: "Sanctuaries Curated",
        description: "Across premier heritage palaces and coastal hideaways",
      },
      {
        value: "100%",
        label: "Wild & Organic Harvest",
        description: "Cold-pressed botanicals from Kerala & Western Ghats",
      },
      {
        value: "120+",
        label: "Master Vaidyas & Healers",
        description: "Marma therapy adepts and licensed somatic clinicians",
      },
      {
        value: "5.0",
        label: "Guest Excellence Rating",
        description: "Sustained across five-star global hospitality audits",
      },
    ],
  },
  triadSection: {
    eyebrow: "The Triad of Intent",
    heading: "The Three Pillars of Sanctuary Design",
    description:
      "Every spatial footprint, herb infusion, and human interaction is calibrated against an immutable sacred framework.",
    cards: [
      {
        number: "01",
        title: "Vedic Authenticity & Pure Formulations",
        description:
          "We reject synthetic binders, parabens, and diluted carrier bases. Our oils are simmered for 72 consecutive hours over slow red-sand furnaces in Kerala using ancient taila-paka methods, aligning formulations with regional doshic seasons.",
        image: {
          url: "/triad-vedic.jpg",
          alt: "Vedic Authenticity & Pure Formulations",
        },
        iconColor: "teal",
        footerLabel: "Botanical Integrity",
        footerValue: "100% Raw Lineage",
        footerValueColor: "rust",
      },
      {
        number: "02",
        title: "Sensory & Spatial Architecture",
        description:
          "A restorative experience is governed by spatial biology. Our treatment suites feature low reverberation acoustics (<24dB), natural lime-wash walls that breathe, hand-turned teakwood joinery, and circadian warmth illumination that restores melatonin rhythm.",
        image: {
          url: "/triad-spatial.jpg",
          alt: "Sensory & Spatial Architecture",
        },
        iconColor: "rust",
        footerLabel: "Acoustic & Thermal",
        footerValue: "Decibel Calibrated",
        footerValueColor: "rust",
      },
      {
        number: "03",
        title: "Masterful Human Touch",
        description:
          "Touch is an energetic transmission, not a mechanical routine. Kynta therapists undergo over 1,200 hours of somatic alignment, breath synchronization, and nadi pressure point training. We enforce deliberate, unhurried 90 to 120-minute therapeutic cadences.",
        image: { url: "/triad-touch.jpg", alt: "Masterful Human Touch" },
        iconColor: "teal",
        footerLabel: "Clinical Standards",
        footerValue: "1,200+ Training Hours",
        footerValueColor: "teal",
      },
    ],
  },
  timelineSection: {
    eyebrow: "THE JOURNEY OF KYNTA",
    heading: "From Forest Apothecary to Global Sanctuaries",
    description:
      "A progression grounded in clinical rigor, heritage preservation, and architectural mastery.",
    milestones: [
      {
        year: "2018",
        title: "The Genesis & The Kerala Pharmacopeia",
        description:
          "Kynta was born out of an experimental organic herb farm in Wayanad, Kerala. Here, master botanists formulated 18 foundational tailams (herbal oils), verifying therapeutic bioavailability and shelf-stability without chemical stabilizers.",
        category: "THE BOTANICAL ROOT",
        categoryColor: "rust",
        dotColor: "rust",
        icon: "botanical",
        image: {
          url: "/timeline-kerala.jpg",
          alt: "Misty tea and herbal plantation terraces in Wayanad Kerala",
        },
      },
      {
        year: "2020",
        title: "The Architectural Blueprint",
        description:
          "Partnering with biophilic architects, Kynta codified the first 'Sanctuary Protocol' — a comprehensive spatial blueprint for five-star hotels encompassing hydro-circuit temperature profiling, private contemplation gardens, and allergen-neutral ventilation.",
        category: "SPATIAL STANDARDIZATION",
        categoryColor: "teal",
        dotColor: "teal",
        icon: "blueprint",
        image: {
          url: "/timeline-blueprint.jpg",
          alt: "Architectural blueprint, material swatches and interior design layout",
        },
      },
      {
        year: "2022",
        title: "Palace & Coastal Deployments",
        description:
          "Kynta assumed turnkey operational leadership for seven flagship resort sanctuaries in Udaipur, Goa, and Rishikesh. Operating with unbroken 99.4% guest satisfaction scores and setting new benchmarks for luxury wellness yield.",
        category: "HOSPITALITY INTEGRATION",
        categoryColor: "rust",
        dotColor: "rust",
        icon: "hospitality",
        image: {
          url: "/timeline-palace.jpg",
          alt: "Heritage palace courtyard reflection pool illuminated at dusk",
        },
      },
      {
        year: "2024",
        title: "Alpine Corridors & Global Reach",
        description:
          "Adapting classical Vedic thermotherapy to sub-zero and alpine climates, launching flagship sanctuaries across high-altitude Himalayan corridors and European wellness retreats with climate-synchronized thermal circuits.",
        category: "CONTINENTAL ADAPTATION",
        categoryColor: "teal",
        dotColor: "teal",
        icon: "alpine",
        image: {
          url: "/timeline-alpine.jpg",
          alt: "Minimalist luxury alpine wellness pavilion overlooking snowy peaks",
        },
      },
      {
        year: "Today & The Future",
        title: "Global Restorative Hospitality",
        description:
          "Managing 14+ elite wellness destination properties, expanding bespoke apothecary laboratories, and training the next generation of Vaidyas in cross-disciplinary therapeutic architecture.",
        category: "THE DEFINITIVE STANDARD",
        categoryColor: "teal",
        dotColor: "rust",
        icon: "standard",
        image: {
          url: "/experience-hydro-colonnade.jpg",
          alt: "Luxury tropical wellness sanctuary pool, colonnades and pavilions",
        },
      },
    ],
  },
  leadershipSection: {
    eyebrow: "CLINICAL & CREATIVE LEADERSHIP",
    heading: "Stewarded by Masters of Lineage & Space",
    description:
      "Our council unites traditional Vaidyas, hospitality innovators, and sensory designers to deliver authentic, medically grounded tranquility.",
    members: [
      {
        name: "Ananya Varma",
        role: "FOUNDER & MANAGING DIRECTOR",
        bio: "Former director of luxury resort developments across Southeast Asia and Switzerland. Dedicated the last 15 years to institutionalizing traditional Indian healing into seamless five-star operational frameworks.",
        credentialIcon: "hospitality",
        credentialText: "22 Years in Luxury Hospitality",
        image: {
          url: "/leadership-ananya.jpg",
          alt: "Ananya Varma, Founder & Managing Director",
        },
      },
      {
        name: "Dr. Harish Namboodiri, BAMS",
        role: "CHIEF AYURVEDIC VAIDYA",
        bio: "Descendant of an illustrious Malabar healing family. Dr. Namboodiri oversees Kynta's botanical pharmacopeia, pulse diagnostic diagnostics, and therapist marma certification curriculum.",
        credentialIcon: "protocol",
        credentialText: "Dean of Clinical Protocol",
        image: {
          url: "/leadership-harish.jpg",
          alt: "Dr. Harish Namboodiri, Chief Ayurvedic Vaidya",
        },
      },
      {
        name: "Devendra Sengupta",
        role: "HEAD OF SPATIAL ARCHITECTURE",
        bio: "Specialist in sensorial acoustic design and biophilic thermal circuits. Curates soundscapes, stone stratification, and micro-climates inside our sanctuary treatment pavilions.",
        credentialIcon: "architecture",
        credentialText: "Architectural Sensory Lead",
        image: {
          url: "/leadership-devendra.jpg",
          alt: "Devendra Sengupta, Head of Spatial Architecture",
        },
      },
    ],
  },
  stewardshipSection: {
    eyebrow: "ECOLOGICAL STEWARDSHIP",
    heading: "Honoring the Soil That Restores Us",
    description:
      "True wellness cannot be extracted at the expense of local communities or living ecosystems. Our whole-plant botanicals are hand-harvested according to traditional lunar cycles by indigenous tribal cooperatives in the Nilgiri and Western Ghats biospheres.",
    features: [
      {
        title: "Direct Fair-Trade Foraging Alliances",
        description:
          "Supporting 240+ tribal farming families with stable year-round honorariums.",
      },
      {
        title: "100% Zero Single-Use Synthetics",
        description:
          "All vessel packaging is hand-blown amber glass or unglazed terracotta earthenware.",
      },
      {
        title: "Closed-Loop Hydro Systems",
        description:
          "Thermal suites utilize mineral stone filtering to recycle 94% of restorative water.",
      },
    ],
    // Photo grid order: top-left, bottom-left, top-right, bottom-right.
    images: [
      {
        url: "/stewardship-foraging.jpg",
        alt: "Indigenous women harvesting botanicals according to lunar cycles in Nilgiri hills",
      },
      {
        url: "/stewardship-extraction.jpg",
        alt: "Clay distillation vessel dripping pure herbal essence into laboratory beakers",
      },
      {
        url: "/stewardship-apothecary.jpg",
        alt: "Ceramic apothecary elixir vessels and dried botanical herbs on linen",
      },
      {
        url: "/stewardship-hydro.jpg",
        alt: "Biophilic sanctuary garden with pebble water stream and lush tropical foliage",
      },
    ],
  },
  accreditationsSection: {
    heading: "RECOGNIZED BY GLOBAL WELLNESS & HERITAGE HOSPITALITY COUNCILS",
    awards: [
      {
        title: "Global Wellness Institute",
        subtitle: "CHARTER SPA MEMBER",
        icon: "medal",
      },
      {
        title: "Ayurvedic Pharmacopoeia Board",
        subtitle: "CERTIFIED 100% PURE ORIGIN",
        icon: "shield",
      },
      {
        title: "Luxury Spa Awards",
        subtitle: "BEST HOLISTIC CONCEPT 2024",
        icon: "star",
      },
      {
        title: "Eco-Sanctuary Standard",
        subtitle: "ZERO SINGLE-USE PLASTIC",
        icon: "eco",
      },
    ],
  },
} satisfies Required<AboutPageContent>;
