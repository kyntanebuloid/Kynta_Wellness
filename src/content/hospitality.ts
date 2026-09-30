import type { ContentImage, ContentLink } from "./types";

export type AssuranceIcon = "certified" | "housing" | "closed-loop" | "pms";

export interface HospitalityPageContent {
  hero?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primaryCta?: ContentLink;
    secondaryCta?: ContentLink;
    badges?: string[];
    image?: ContentImage;
    imageCaption?: string;
  };
  statsSection?: {
    metrics?: { value: string; label: string; description?: string }[];
  };
  modelsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    models?: {
      number?: string;
      pillLabel?: string;
      highlighted?: boolean;
      title: string;
      description: string;
      features?: string[];
      ctaLabel?: string;
      ctaUrl?: string;
    }[];
  };
  viabilitySection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    image?: ContentImage;
    imageCaption?: string;
    stats?: { value: string; label: string; description?: string }[];
  };
  transformationsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    image?: ContentImage;
    transformations?: {
      location?: string;
      metric?: string;
      metricHighlighted?: boolean;
      title: string;
      description: string;
      footerLabel?: string;
    }[];
  };
  assuranceSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    pillars?: { icon?: AssuranceIcon; title: string; description: string }[];
  };
}

export const hospitalityPageDefaults = {
  hero: {
    eyebrow: "INSTITUTIONAL HOSPITALITY & SANCTUARY PARTNERSHIPS",
    heading: "Elevating Luxury Hospitality Through Restorative Architecture.",
    description:
      "We convert underutilized hotel square footage into high-yield, brand-defining sanctuaries of unhurried restorative stillness and clinical Ayurvedic excellence.",
    primaryCta: { label: "REQUEST FEASIBILITY STUDY", url: "/contact" },
    secondaryCta: { label: "DOWNLOAD PROSPECTUS", url: "" },
    badges: [
      "ACCREDITED CLINICAL VAIDYA STAFFING",
      "TURNKEY FORBES LQA PROTOCOLS",
    ],
    image: {
      url: "/hospitality-pool.jpg",
      alt: "Luxury hotel wellness indoor pool sanctuary with water wall and lounge seating",
    },
    imageCaption: "TURNKEY GOVERNANCE · 100% OPERATIONAL INTEGRATION",
  },
  statsSection: {
    metrics: [
      {
        value: "+38%",
        label: "REVPAR & SPA CAPTURE",
        description: "Direct guest spend accretion",
      },
      {
        value: "14+",
        label: "SANCTUARIES MANAGED",
        description: "Flagship resorts & heritage estates",
      },
      {
        value: "1,200h",
        label: "CLINICAL RIGOR STANDARD",
        description: "Certified Vaidya somatic training",
      },
      {
        value: "0%",
        label: "NET HYDRO WASTE",
        description: "Closed-loop thermal recirculation",
      },
    ],
  },
  modelsSection: {
    eyebrow: "FLEXIBLE INTEGRATION",
    heading: "Three Bespoke Partnership Models",
    description:
      "Calibrated to ownership governance, development stage, and target capital efficiency.",
    models: [
      {
        number: "01",
        pillLabel: "TIER A",
        highlighted: false,
        title: "Full Turnkey Management",
        description:
          "Autonomous operational stewardship spanning certified talent, botanical provisioning, and full P&L governance.",
        features: [
          "Full P&L custodianship & transparent ledger reporting",
          "Proprietary Vaidya somatic staffing pipeline",
          "Forbes 5–Star spa readiness protocols",
        ],
        ctaLabel: "EXPLORE TURNKEY TERMS",
        ctaUrl: "/contact?tier=turnkey",
      },
      {
        number: "02",
        pillLabel: "ARCHITECT PICK",
        highlighted: true,
        title: "Spatial & Acoustic Masterplanning",
        description:
          "Architectural co-creation, hydrothermal circuit engineering, circadian lighting, and sub-24dB sound isolation.",
        features: [
          "Sub-24dB acoustic decoupling blueprints",
          "Circadian photobiology & hydrothermal zoning",
          "Biophilic local stone & timber integration",
        ],
        ctaLabel: "INQUIRE DESIGN ADVISORY",
        ctaUrl: "/contact?tier=advisory",
      },
      {
        number: "03",
        pillLabel: "TIER C",
        highlighted: false,
        title: "White-Label Sanctuary Licensing",
        description:
          "Wild-harvested herbal formulation lines under your resort's banner, backed by Kynta curative standards.",
        features: [
          "Co-branded organic apothecary formulations",
          "Certified 28-day restorative ritual menus",
          "Quarterly somatic audits & masterclasses",
        ],
        ctaLabel: "REQUEST LICENSING KIT",
        ctaUrl: "/contact?tier=licensing",
      },
    ],
  },
  viabilitySection: {
    eyebrow: "COMMERCIAL VIABILITY",
    heading: "Tangible Asset Enhancement",
    description:
      "Transforming spatial footprint into predictable, premium-yielding hospitality assets.",
    image: {
      url: "/hospitality-chamber.jpg",
      alt: "Apothecary and marma therapy treatment chamber with teakwood louvers and natural stone textures",
    },
    imageCaption: "APOTHECARY & MARMA CHAMBER DETAILING",
    stats: [
      {
        value: "+2.4 Days",
        label: "LENGTH OF STAY",
        description:
          "Curated curative retreat programs convert overnight guests to extended-stay wellness patrons.",
      },
      {
        value: "62%",
        label: "OFF-SEASON RESILIENCE",
        description:
          "Monsoon panchakarma and seasonal thermal therapies maintain high occupancy through shoulder months.",
      },
      {
        value: "42%",
        label: "RETAIL ATTACHMENT",
        description:
          "Hand-crafted tisanes, dosha oils, and wellness lifestyle wares generating top-tier retail gross margins.",
      },
      {
        value: "Tier-1",
        label: "GLOBAL ACCREDITATIONS",
        description:
          "Immediate readiness for Condé Nast Johansens, Tatler Spa Awards, and Global Wellness Institute benchmarks.",
      },
    ],
  },
  transformationsSection: {
    eyebrow: "PROVEN TRANSFORMATIONS",
    heading: "Sanctuaries Across Diverse Terrains",
    description:
      "Each sanctuary is uniquely contextualized to geographic topology, indigenous flora, and native architecture.",
    image: {
      url: "/hospitality-terrains.jpg",
      alt: "Luxury resort sanctuary outdoor hydro pool with waterfall and loungers",
    },
    transformations: [
      {
        location: "UDAIPUR, RAJASTHAN",
        metric: "+44% Yield",
        metricHighlighted: true,
        title: "The Royal Stepped Reservoir",
        description:
          "16,000 sq ft subterranean stepped reservoir converted into cavernous hydrothermal suites and acoustic salt-immersion grottos.",
        footerLabel: "HISTORIC PALACE HERITAGE CONVERSION",
      },
      {
        location: "SHIMLA, HIMALAYAS",
        metric: "+3.1d Stay",
        metricHighlighted: false,
        title: "The Pine Canopy Pavilion",
        description:
          "Glass-enclosed cedar hydro-sanctuary with altitude-acclimatizing herbal steam circuits and panoramic alpine views.",
        footerLabel: "ALPINE BIOPHILIC HYDROTHERAPY",
      },
      {
        location: "NORTH GOA COAST",
        metric: "98.6% Rating",
        metricHighlighted: true,
        title: "The Coconut Grove Hermitage",
        description:
          "Woven bamboo open-air pavilions and warm sea-salt hydro pools integrating Marma point bodywork and Ayurvedic compresses.",
        footerLabel: "COASTAL WELLNESS SANCTUARY",
      },
    ],
  },
  assuranceSection: {
    eyebrow: "INSTITUTIONAL ASSURANCE",
    heading: "Uncompromising Operational Rigor",
    description:
      "Statutory clinical compliance, ecological safeguards, and seamless technical integration to protect your property's brand equity.",
    pillars: [
      {
        icon: "certified",
        title: "NABH & Ayush Certified",
        description:
          "100% adherence to statutory clinical benchmarks and wild-harvested botanicals with zero synthetics.",
      },
      {
        icon: "housing",
        title: "Fair-Wage & Housing",
        description:
          "Dedicated staff accommodation, ethical remuneration, and continuous career mastery ensuring 94% retention.",
      },
      {
        icon: "closed-loop",
        title: "Zero-Plastic Closed-Loop",
        description:
          "Closed-loop graywater botanical regeneration and zero single-use plastics throughout all treatment grottos.",
      },
      {
        icon: "pms",
        title: "Seamless PMS Integration",
        description:
          "Native synchronization with Oracle Opera Cloud, Infor HMS, Protel, and enterprise CRS ledgers.",
      },
    ],
  },
} satisfies Required<HospitalityPageContent>;
