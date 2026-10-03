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
    eyebrow: "About Kynta Wellness",
    heading: "Rooted in Ayurveda.\nCrafted for Calm.",
    description:
      "Kynta Wellness is a luxury wellness and spa brand dedicated to holistic healing and deep relaxation. Rooted in Ayurvedic wisdom, it offers therapeutic massages and rejuvenating spa experiences designed to balance the body, calm the mind and restore inner harmony. Every treatment is thoughtfully curated to promote well-being, relaxation and renewal, creating a serene escape from everyday stress.",
    philosophyLabel: "Explore Our Philosophy",

    secondaryCta: { label: "Inquire With Concierge", url: "/contact" },
    image: {
      url: "/about-hero.jpg",
      alt: "Kynta Wellness spa interior",
    },
    imageCaption: "Kynta Wellness",
    badgeLabel: "Our Values",
    badgeText: "Balance · Healing · Inner Peace\nHarmony · Vitality",
    stats: [
      {
        value: "6",
        label: "Spa Locations",
        description: "Across Himachal Pradesh & Rajasthan",
      },
      {
        value: "22",
        label: "Treatments",
        description: "From 30-minute therapies to five-session journeys",
      },
      {
        value: "5",
        label: "Treatment Categories",
        description:
          "Spa Sojourns, Couple Spa, Massages, Glamour Glow & Rapid Relax",
      },
      {
        value: "3",
        label: "Membership Plans",
        description: "Kynta Revibe: Peace, Serenity & Tranquility",
      },
    ],
  },
  triadSection: {
    eyebrow: "What We Stand For",
    heading: "Three Promises in Every Treatment",
    description:
      "Every treatment is thoughtfully curated to promote well-being, relaxation and renewal.",
    cards: [
      {
        number: "01",
        title: "Rooted in Ayurvedic Wisdom",
        description:
          "Our therapies draw on traditional Indian techniques: Abhyanga with warm herbal oils, herbal Potli compresses and marma-point massage, to balance the body, calm the mind and restore inner harmony.",
        image: {
          url: "/triad-vedic.jpg",
          alt: "Ayurvedic oils and herbs",
        },
        iconColor: "teal",
        footerLabel: "Our Roots",
        footerValue: "Ayurveda",
        footerValueColor: "rust",
      },
      {
        number: "02",
        title: "Thoughtfully Curated Treatments",
        description:
          "Twenty-two treatments across five categories, from focused 30-minute Rapid Relax therapies to the five-massage Royal Renewal, each designed to leave you refreshed and deeply restored.",
        image: {
          url: "/triad-spatial.jpg",
          alt: "Kynta Wellness treatment room",
        },
        iconColor: "rust",
        footerLabel: "Our Menu",
        footerValue: "22 Treatments",
        footerValueColor: "rust",
      },
      {
        number: "03",
        title: "Skilled, Respectful Care",
        description:
          "Expert therapists tailor every treatment to you, with professional draping throughout and a calm, quiet setting that respects your privacy and comfort.",
        image: { url: "/triad-touch.jpg", alt: "Therapist giving a massage" },
        iconColor: "teal",
        footerLabel: "Our Care",
        footerValue: "Privacy First",
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
    eyebrow: "A SERENE ESCAPE",
    heading: "Designed for Calm, Comfort and Renewal",
    description:
      "Every visit is planned around your comfort: a quiet setting, skilled hands and treatments tailored to you, so you leave refreshed, glowing and deeply restored from within.",
    features: [
      {
        title: "Calm, Quiet Spaces",
        description:
          "Phones on silent and soft voices keep every Kynta spa serene for all guests.",
      },
      {
        title: "Your Privacy Respected",
        description:
          "Professional draping throughout every treatment, with disposable undergarments provided.",
      },
      {
        title: "Premium Oil Blends",
        description:
          "Add one of our premium oil blends to any treatment, at an additional charge.",
      },
    ],
    // Photo grid order: top-left, bottom-left, top-right, bottom-right.
    images: [
      {
        url: "/stewardship-foraging.jpg",
        alt: "Fresh herbs and botanicals",
      },
      {
        url: "/stewardship-extraction.jpg",
        alt: "Herbal oil being prepared",
      },
      {
        url: "/stewardship-apothecary.jpg",
        alt: "Oils and dried herbs",
      },
      {
        url: "/stewardship-hydro.jpg",
        alt: "Garden with a water feature",
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
