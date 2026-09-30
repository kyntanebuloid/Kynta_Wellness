import type { AccentColor, ContentImage } from "./types";

export type PillarIcon = "flask" | "pulse" | "building" | "hourglass";
export type PillarFooterIcon = "leaf" | "target" | "droplet" | "moon";

export interface ExperiencesPageContent {
  hero?: {
    eyebrow?: string;
    headingItalic?: string;
    heading?: string;
    headingLine2?: string;
    description?: string;
    filters?: string[];
    featured?: {
      image?: ContentImage;
      tags?: string[];
      category?: string;
      title?: string;
      description?: string;
      buttonLabel?: string;
      buttonUrl?: string;
    };
  };
  pillars?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    cards?: {
      number?: string;
      icon?: PillarIcon;
      title: string;
      description: string;
      footerLabel?: string;
      footerIcon?: PillarFooterIcon;
    }[];
  };
  treatmentsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    linkLabel?: string;
    cards?: {
      image?: ContentImage;
      label?: string;
      duration?: string;
      title: string;
      slug?: string;
      description: string;
      sensoryNote?: string;
    }[];
  };
  protocolSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    steps?: {
      number?: string;
      title: string;
      description: string;
      duration?: string;
      color?: AccentColor;
    }[];
  };
}

export const experiencesPageDefaults = {
  hero: {
    eyebrow:
      "Curated Experiences & Restorative Rituals  ·  Vedic Medicine & Hydrotherapy",
    headingItalic: "Transformative Journeys",
    heading: "Crafted",
    headingLine2: "for Body & Mind.",
    description:
      "From single bespoke somatic rituals to multi-day immersive detox retreats across India's most extraordinary palace hotels and secluded eco-resorts.",
    filters: [
      "All Experiences",
      "Signature Rituals",
      "Hydrothermal & Thermal Baths",
      "Multi-Day Retreats",
      "Couples & Duets",
      "Sound & Meditative Immersion",
    ],
    featured: {
      image: {
        url: "/experience-hydro-colonnade.jpg",
        alt: "The Royal Stepped Hydro-Colonnade",
      },
      tags: ["Acoustic Silence < 24dB", "Single-Batch Cold Pressed Herbals"],
      category: "Spatial Architecture",
      title: "The Royal Stepped Hydro-Colonnade",
      description:
        "Natural sandstone pavilions calibrated with thermostatic plunge chambers and sound-dampened lime plaster vaults.",
      buttonLabel: "Book an Immersion",
      buttonUrl: "/book",
    },
  },
  pillars: {
    eyebrow: "Foundational Methodology",
    heading: "The Four Pillars of the Kynta Experience",
    description:
      "Where sacred Vedic therapeutic canons intersect with precise clinical physiology to induce total restorative harmony.",
    cards: [
      {
        number: "01",
        icon: "flask",
        title: "Botanical Sourcing",
        description:
          "Single-estate hand-pressed oils, wild-harvested Himalayan cedar, high-altitude saffron, and sacred white lotus distilled under lunar cycles.",
        footerLabel: "Pure Botanical Potency",
        footerIcon: "leaf",
      },
      {
        number: "02",
        icon: "pulse",
        title: "Precision Diagnostics",
        description:
          "Comprehensive Nadi Pariksha (pulse assessment), somatic tissue mapping, and doshic constitutional calibration before ritual touch initiates.",
        footerLabel: "Doshic Tri-Balance",
        footerIcon: "target",
      },
      {
        number: "03",
        icon: "building",
        title: "Hydrothermal Architecture",
        description:
          "Hyper-dilute magnesium saline flotation pools, herb-infused steam grottos, and stepped thermal plunge baths designed with acoustic isolation.",
        footerLabel: "Somatic Hydro-Plunges",
        footerIcon: "droplet",
      },
      {
        number: "04",
        icon: "hourglass",
        title: "Unhurried Cadence",
        description:
          "A minimum 90-minute immersion window ensuring full parasympathetic nervous down-regulation, zero transition rush, and profound cellular stillness.",
        footerLabel: "Parasympathetic Shift",
        footerIcon: "moon",
      },
    ],
  },
  treatmentsSection: {
    eyebrow: "Apothecary & Therapies",
    heading: "Signature rituals conceived for deep restorative release.",
    description:
      "Formulated with single-estate botanical extracts, warm Himalayan stone compresses, and ancient marma touch.",
    linkLabel: "Explore",
    cards: [
      {
        image: { url: "/treatment-spa-sojourns.jpg", alt: "Spa Sojourns" },
        label: "Signature Bodywork",
        duration: "75 / 90 Mins",
        title: "SPA SOJOURNS",
        slug: "spa-sojourns",
        description:
          "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe, these rituals leave you feeling renewed, centered, and completely at ease.",
        sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver",
      },
      {
        image: { url: "/treatment-massage.jpg", alt: "Massage Selections" },
        label: "Signature Bodywork",
        duration: "75 / 90 Mins",
        title: "MASSAGE SELECTIONS",
        slug: "massage-selections",
        description:
          "Step into a world of deep relaxation with our curated Full Body Massage selections. Each therapy is thoughtfully designed to release tension, improve circulation, and restore inner harmony. Surrender to skilled hands and experience complete mind-body renewal.",
        sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver",
      },
      {
        image: { url: "/treatment-glamour-glow.jpg", alt: "Glamour Glow" },
        label: "Signature Bodywork",
        duration: "75 / 90 Mins",
        title: "GLAMOUR GLOW",
        slug: "glamour-glow",
        description:
          "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin. Enriched with skin-loving ingredients, this treatment removes impurities, enhances natural radiance, and leaves your skin smooth, refreshed, and beautifully glowing. Perfect before special occasions or whenever your skin needs a luminous boost.",
        sensoryNote: "Cedarwood • Ginger Root • Smoky Vetiver",
      },
    ],
  },
  protocolSection: {
    eyebrow: "Somatic Ritual Sequence",
    heading: "The Five-Step Experience Protocol",
    description:
      "Every visit at a Kynta sanctuary follows a rigorous ritual protocol engineered to guide the physiology effortlessly from beta-stress states into parasympathetic renewal.",
    steps: [
      {
        number: "01",
        title: "Arrival & Unclutter",
        description:
          "Warm botanical foot soak with freshly crushed marigold, rock salt, and cardamom infusion to ground bodily static.",
        duration: "15 Minutes",
        color: "teal",
      },
      {
        number: "02",
        title: "Diagnostic Consultation",
        description:
          "Pulse reading by Vaidya, thermal chamber calibration, and bespoke botanical scent harmonization for your bio-energy.",
        duration: "15 Minutes",
        color: "teal",
      },
      {
        number: "03",
        title: "Therapeutic Core Touch",
        description:
          "Customized rhythmic strokes, heated river stone gliding, and single-estate cold-pressed oil absorption.",
        duration: "60 – 90 Minutes",
        color: "rust",
      },
      {
        number: "04",
        title: "Stillness Lounge",
        description:
          "Acoustic relaxation in sound-dampened lime plaster grottos with restorative warm herbal tonics and organic dry fruits.",
        duration: "30 Minutes",
        color: "teal",
      },
      {
        number: "05",
        title: "Home Integration",
        description:
          "Custom apothecary formulations, dosha-specific nutrition guidelines, and circadian sleep rituals sent to your private portal.",
        duration: "Post-Care Protocol",
        color: "teal",
      },
    ],
  },
} satisfies Required<ExperiencesPageContent>;
