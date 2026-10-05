import { BLOG_AUTHOR, realBlogPosts } from "./real-blog";
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

/** A blog category button, filled from its Kynta blog post. */
function blogCategoryDefault(
  label: string,
  postIndex: number,
  badge = "",
): BlogCategory & { image: ContentImage } {
  const post = realBlogPosts[postIndex];
  return {
    label,
    image: { url: post.image, alt: post.imageAlt },
    badge,
    category: post.category,
    issue: "",
    readTime: post.readTime,
    title: post.title,
    description: post.excerpt,
    authorInitials: "KW",
    authorName: BLOG_AUTHOR.toUpperCase(),
    authorRole: "",
    url: `/blog/${post.slug}`,
    linkLabel: "READ ARTICLE",
  };
}

export const blogPageDefaults = {
  hero: {
    eyebrow: "THE KYNTA JOURNAL",
    heading: "Notes on Ayurveda, Massage and Restful Living.",
    subheading:
      "Stories from Kynta Wellness on Ayurvedic care, mindful rest and the spaces designed for it, with the treatments from our spa menu.",
    categories: [
      blogCategoryDefault("ALL ESSAYS", 0, "LATEST ARTICLE"),
      blogCategoryDefault("BOTANICAL APOTHECARY", 0),
      blogCategoryDefault("SANCTUARY ARCHITECTURE", 1),
      blogCategoryDefault("CIRCADIAN SOMATICS", 2),
      blogCategoryDefault("AYURVEDIC SCIENCE", 3),
      blogCategoryDefault("VAIDYA CASE STUDIES", 4),
    ],
  },
  inquiriesSection: {
    eyebrow: "FROM THE JOURNAL",
    heading: "All Articles",
    note: "",
    articles: realBlogPosts.slice(1, 4).map((post) => ({
      image: { url: post.image, alt: post.imageAlt },
      tag: post.category,
      meta: `${post.category} • ${post.readTime}`,
      title: post.title,
      description: post.excerpt,
      linkLabel: "READ ARTICLE",
      url: `/blog/${post.slug}`,
    })),
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
