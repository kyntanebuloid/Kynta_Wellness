import { realHospitalityText } from "./real-hospitality";
import type { ContentFile, ContentImage, ContentLink } from "./types";

export type AssuranceIcon = "certified" | "housing" | "closed-loop" | "pms";

export interface HospitalityPageContent {
  hero?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primaryCta?: ContentLink;
    prospectusLabel?: string;
    /** The prospectus button only shows once a PDF is uploaded. */
    prospectusPdf?: ContentFile;
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

// Text comes from ./real-hospitality.ts (real facts only); photos stay here.
const r = realHospitalityText;

export const hospitalityPageDefaults = {
  hero: {
    eyebrow: r.hero.eyebrow,
    heading: r.hero.heading,
    description: r.hero.description,
    primaryCta: r.hero.primaryCta,
    prospectusLabel: "DOWNLOAD PROSPECTUS",
    badges: r.hero.badges,
    image: { url: "/hospitality-pool.jpg", alt: r.hero.imageAlt },
    imageCaption: r.hero.imageCaption,
  },
  statsSection: r.statsSection,
  modelsSection: r.modelsSection,
  viabilitySection: {
    eyebrow: r.viabilitySection.eyebrow,
    heading: r.viabilitySection.heading,
    description: r.viabilitySection.description,
    image: {
      url: "/hospitality-chamber.jpg",
      alt: r.viabilitySection.imageAlt,
    },
    imageCaption: r.viabilitySection.imageCaption,
    stats: r.viabilitySection.stats,
  },
  transformationsSection: {
    eyebrow: r.transformationsSection.eyebrow,
    heading: r.transformationsSection.heading,
    description: r.transformationsSection.description,
    image: {
      url: "/hospitality-terrains.jpg",
      alt: r.transformationsSection.imageAlt,
    },
    transformations: r.transformationsSection.transformations,
  },
  assuranceSection: r.assuranceSection,
} satisfies Required<HospitalityPageContent>;
