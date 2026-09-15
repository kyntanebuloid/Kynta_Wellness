export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityBlock {
  _type: "block";
  _key: string;
  style: string;
  children: {
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }[];
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  title: string;
  description?: string;
  logo?: SanityImage;
  ogImage?: SanityImage;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface Homepage {
  _id: string;
  _type: "homepage";
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  heroCtaText?: string;
  heroCtaLink?: string;
  featuredServicesTitle?: string;
  aboutTitle?: string;
  aboutText?: SanityBlock[];
  aboutImage?: SanityImage;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  slug: SanitySlug;
  description?: SanityBlock[];
  shortDescription?: string;
  image?: SanityImage;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
  treatments?: Treatment[];
}

export interface Treatment {
  _id: string;
  _type: "treatment";
  title: string;
  slug: SanitySlug;
  service?: { title: string; slug: SanitySlug };
  description?: SanityBlock[];
  shortDescription?: string;
  image?: SanityImage;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}

export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  featuredImage?: SanityImage;
  author: string;
  category?: string;
  content?: (
    | SanityBlock
    | {
        _type: "contentImage";
        _key: string;
        asset: { _ref: string };
        alt?: string;
      }
  )[];
  publishedAt: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  clientName: string;
  clientTitle?: string;
  quote: string;
  clientImage?: SanityImage;
  rating?: number;
  service?: { title: string };
}

export interface Faq {
  _id: string;
  _type: "faq";
  question: string;
  answer: SanityBlock[];
  category?: string;
  order?: number;
}
