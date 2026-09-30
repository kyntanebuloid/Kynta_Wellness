import type { AccentColor, ContentImage } from "./types";

export type PillarIcon = "flask" | "pulse" | "building" | "hourglass";
export type PillarFooterIcon = "leaf" | "target" | "droplet" | "moon";

export interface ExperienceCategory {
  label: string;
  image?: ContentImage;
  tags?: string[];
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
}

export interface ExperiencesPageContent {
  hero?: {
    eyebrow?: string;
    headingItalic?: string;
    heading?: string;
    headingLine2?: string;
    description?: string;
    /** One button per category; clicking it shows that category's card. */
    categories?: ExperienceCategory[];
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

const extraTreatmentCards = [
  {
    image: { url: "/experience-hydro-colonnade.jpg", alt: "Hydrotherapy Plunge" },
    label: "Hydrothermal & Thermal Baths",
    duration: "45 Mins",
    title: "HYDROTHERAPY PLUNGE",
    slug: "hydrotherapy-plunge",
    description:
      "Alternating thermal circuits designed to stimulate lymphatic flow and deepen somatic restoration. Our hydrotherapy protocols combine heated mineral pools with cold plunge immersion for maximum therapeutic benefit.",
    sensoryNote: "Eucalyptus • Sea Salt • Mountain Pine",
  },
  {
    image: { url: "/destination-glenwood.jpg", alt: "Couples Sanctuary" },
    label: "Couples & Duets",
    duration: "120 Mins",
    title: "COUPLES SANCTUARY",
    slug: "couples-sanctuary",
    description:
      "A shared journey of restoration in our private couples pavilion with dual treatment beds and synchronized botanical rituals. Designed for partners seeking a communal path to deep relaxation and cellular renewal.",
    sensoryNote: "White Lotus • Rose Absolute • Cardamom",
  },
  {
    image: { url: "/triad-vedic.jpg", alt: "Sound Immersion" },
    label: "Sound & Meditative Immersion",
    duration: "60 Mins",
    title: "SOUND IMMERSION",
    slug: "sound-immersion",
    description:
      "Acoustic healing through traditional Indian instruments calibrated for deep theta meditation states. Experience the resonant frequencies of Tibetan singing bowls, crystal bowls, and traditional Rudra Veena harmonics.",
    sensoryNote: "Frankincense • Myrrh • Himalayan Sandalwood",
  },
];

export const experiencesPageDefaults = {
  hero: {
    eyebrow:
      "Curated Experiences & Restorative Rituals  ·  Vedic Medicine & Hydrotherapy",
    headingItalic: "Transformative Journeys",
    heading: "Crafted",
    headingLine2: "for Body & Mind.",
    description:
      "From single bespoke somatic rituals to multi-day immersive detox retreats across India's most extraordinary palace hotels and secluded eco-resorts.",
    categories: [
      {
        label: "All Experiences",
        image: {
          url: "/experience-hydro-colonnade.jpg",
          alt: "The Royal Stepped Hydro-Colonnade",
        },
        tags: ["Acoustic Silence < 24dB", "Single-Batch Cold Pressed Herbals"],
        eyebrow: "Spatial Architecture",
        title: "The Royal Stepped Hydro-Colonnade",
        description:
          "Natural sandstone pavilions calibrated with thermostatic plunge chambers and sound-dampened lime plaster vaults.",
        buttonLabel: "Book an Immersion",
        buttonUrl: "/book",
      },
      {
        label: "Signature Rituals",
        image: {
          url: "/exp-spa-sojourns-main.png",
          alt: "Spa Sojourns treatment pavilion",
        },
        tags: ["Tailored Pressure", "Aroma Elixirs"],
        eyebrow: "Signature Bodywork · 75 / 90 Mins",
        title: "Spa Sojourns",
        description:
          "Immersive wellness journeys that blend therapeutic touch with deep relaxation, crafted to rejuvenate from head to toe.",
        buttonLabel: "Explore Ritual",
        buttonUrl: "/experiences/spa-sojourns",
      },
      {
        label: "Hydrothermal & Thermal Baths",
        image: {
          url: "/inquiry-hydrotherapy.jpg",
          alt: "Stone thermal hydro plunge pool",
        },
        tags: ["Thermal Shock", "Saline Flotation"],
        eyebrow: "Hydrothermal & Thermal Baths · 45 Mins",
        title: "Hydrotherapy Plunge",
        description:
          "Alternating thermal circuits designed to stimulate lymphatic flow and deepen somatic restoration.",
        buttonLabel: "Explore Ritual",
        buttonUrl: "/experiences/hydrotherapy-plunge",
      },
      {
        label: "Multi-Day Retreats",
        image: {
          url: "/destination-heritage.jpg",
          alt: "Heritage retreat courtyard",
        },
        tags: ["Personalised Programme", "Resident Vaidyas"],
        eyebrow: "Multi-Day Retreats",
        title: "Immersive Restorative Retreats",
        description:
          "Multi-day programmes combining daily rituals, Ayurvedic consultations and nourishing cuisine at our partner sanctuaries.",
        buttonLabel: "Plan a Retreat",
        buttonUrl: "/contact",
      },
      {
        label: "Couples & Duets",
        image: {
          url: "/destination-glenwood.jpg",
          alt: "Couples treatment pavilion",
        },
        tags: ["Synchronized Touch", "Dual Teak Beds"],
        eyebrow: "Couples & Duets · 120 Mins",
        title: "Couples Sanctuary",
        description:
          "A shared journey of restoration in our private couples pavilion with dual treatment beds and synchronized botanical rituals.",
        buttonLabel: "Explore Ritual",
        buttonUrl: "/experiences/couples-sanctuary",
      },
      {
        label: "Sound & Meditative Immersion",
        image: {
          url: "/triad-vedic.jpg",
          alt: "Sound and meditation chamber",
        },
        tags: ["Theta Harmonics", "Tibetan Bells"],
        eyebrow: "Sound & Meditative Immersion · 60 Mins",
        title: "Sound Immersion",
        description:
          "Acoustic healing through traditional Indian instruments calibrated for deep theta meditation states.",
        buttonLabel: "Explore Ritual",
        buttonUrl: "/experiences/sound-immersion",
      },
    ],
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
        duration: "60 / 90 Mins",
        title: "MASSAGE SELECTIONS",
        slug: "massage-selections",
        description:
          "Step into a world of deep relaxation with our curated Full Body Massage selections. Each therapy is thoughtfully designed to release tension, improve circulation, and restore inner harmony. Surrender to skilled hands and experience complete mind-body renewal.",
        sensoryNote: "Brahmi • Ashwagandha • Sandalwood",
      },
      {
        image: { url: "/treatment-glamour-glow.jpg", alt: "Glamour Glow" },
        label: "Signature Bodywork",
        duration: "60 Mins",
        title: "GLAMOUR GLOW",
        slug: "glamour-glow",
        description:
          "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin. Enriched with skin-loving ingredients, this treatment removes impurities, enhances natural radiance, and leaves your skin smooth, refreshed, and beautifully glowing. Perfect before special occasions or whenever your skin needs a luminous boost.",
        sensoryNote: "Floral Jasmine • Mineral Crisp • Sweet Neroli",
      },
      ...extraTreatmentCards,
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
