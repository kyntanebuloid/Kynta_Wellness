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

/** An image projected in GROQ as `image{ "url": asset->url, alt }`. */
export interface ResolvedImage {
  url?: string | null;
  alt?: string | null;
}

export interface CmsLink {
  label?: string;
  url?: string;
}

export interface SiteSettings {
  topBar?: {
    partnerText?: string;
    phone?: string;
  };
  logo?: ResolvedImage | null;
  navigation?: {
    label: string;
    url: string;
  }[];
  headerButton?: CmsLink;
  footer?: {
    brandDescription?: string;
    certificationText?: string;
    newsletterHeading?: string;
    newsletterDescription?: string;
    newsletterPlaceholder?: string;
    newsletterButtonLabel?: string;
    legalLinks?: { label: string; url: string }[];
    copyright?: string;
  };
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  whatsapp?: string;
}

export interface Homepage {
  hero?: {
    eyebrow?: string;
    headline?: string;
    headlineItalic?: string;
    subtitle?: string;
    primaryCta?: CmsLink;
    secondaryCta?: CmsLink;
    image?: ResolvedImage | null;
  };
  servicesSection?: {
    eyebrow?: string;
    heading?: string;
    /** Label under the name on cards without a photo. */
    noPhotoText?: string;
    services?: {
      name: string;
      description: string;
      image?: ResolvedImage | null;
      buttonLabel?: string;
      buttonUrl?: string;
    }[];
  };
  destinationsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    /** Label under the name on cards without a photo. */
    noPhotoText?: string;
  };
  guestPathSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    steps?: {
      number: string;
      title: string;
      description: string;
      icon?: string;
    }[];
    stats?: {
      value: string;
      label: string;
      highlight?: boolean;
    }[];
    trustedByHeading?: string;
    hotelNames?: string[];
    testimonials?: {
      quote: string;
      name: string;
      affiliation?: string;
    }[];
  };
  partnershipSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primaryCta?: CmsLink;
    secondaryCta?: CmsLink;
    services?: {
      icon?: string;
      title: string;
      description: string;
    }[];
  };
  journalSection?: {
    eyebrow?: string;
    heading?: string;
    allArticlesLink?: CmsLink;
    articles?: {
      image?: ResolvedImage | null;
      category?: string;
      readTime?: string;
      topic?: string;
      title: string;
      excerpt: string;
      url?: string;
    }[];
  };
  reservationSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    infoCards?: {
      icon?: string;
      title: string;
      description: string;
    }[];
    whatsapp?: {
      title?: string;
      subtitle?: string;
      buttonLabel?: string;
      url?: string;
    };
    formHeading?: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface ExperiencesPage {
  _id: string;
  _type: "experiencesPage";
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
  };
  filters?: {
    label: string;
    value: string;
  }[];
  experiences?: {
    title: string;
    description: string;
    category: string;
    image?: SanityImage;
    duration?: string;
    price?: string;
  }[];
  pillars?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    cards?: {
      icon?: string;
      title: string;
      description: string;
    }[];
  };
  treatmentsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    cards?: {
      title: string;
      slug?: string;
      description: string;
      duration?: string;
      sensoryNote?: string;
      image?: SanityImage;
    }[];
  };
  protocolSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    steps?: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}

export interface LocationsPage {
  _id: string;
  _type: "locationsPage";
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
  };
  locations?: {
    name: string;
    address: string;
    description?: string;
    region: string;
    price?: string;
    slug?: string;
    imagePath?: string;
    detailsUrl?: string;
    hours?: string;
    phone?: string;
    email?: string;
    image?: ResolvedImage | null;
    services?: string[];
  }[];
  ctaSection?: {
    heading?: string;
    description?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}

export interface AboutPage {
  _id: string;
  _type: "aboutPage";
  hero?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    image?: SanityImage;
    stats?: {
      value: string;
      label: string;
    }[];
  };
  triadSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    cards?: {
      title: string;
      description: string;
      image?: SanityImage;
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
      image?: SanityImage;
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
      image?: SanityImage;
    }[];
  };
  stewardshipSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    features?: {
      title: string;
      description: string;
    }[];
    images?: SanityImage[];
  };
  accreditationsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    awards?: {
      title: string;
      organization: string;
      year?: string;
      description?: string;
    }[];
  };
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}

export interface HospitalityPage {
  _id: string;
  _type: "hospitalityPage";
  hero?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    image?: SanityImage;
    stats?: {
      value: string;
      label: string;
    }[];
  };
  statsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    metrics?: {
      value: string;
      label: string;
      description: string;
    }[];
  };
  modelsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    models?: {
      title: string;
      description: string;
      features?: string[];
    }[];
  };
  viabilitySection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    stats?: {
      value: string;
      label: string;
      description: string;
    }[];
    image?: SanityImage;
  };
  transformationsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    transformations?: {
      title: string;
      before: string;
      after: string;
      description: string;
    }[];
  };
  assuranceSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    pillars?: {
      icon?: string;
      title: string;
      description: string;
    }[];
  };
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}

export interface BlogPage {
  _id: string;
  _type: "blogPage";
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
  };
  filters?: {
    label: string;
    value: string;
  }[];
  inquiriesSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    articles?: {
      title: string;
      excerpt: string;
      category?: string;
      readTime?: string;
      author?: string;
      image?: SanityImage;
    }[];
  };
  compendiumSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    chapters?: {
      title: string;
      description: string;
      chapterNumber?: string;
      author?: string;
      image?: SanityImage;
    }[];
    practitionerNotes?: {
      title: string;
      author: string;
      role?: string;
      excerpt?: string;
    }[];
  };
  philosophySection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    fieldNotes?: {
      title: string;
      excerpt: string;
      category?: string;
      author?: string;
      image?: SanityImage;
    }[];
    audioTracks?: {
      title: string;
      duration: string;
      category?: string;
      audioUrl?: string;
    }[];
  };
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}

export interface ContactPage {
  _id: string;
  _type: "contactPage";
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
  };
  tabs?: {
    label: string;
    value: string;
  }[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    workingHours?: string;
  };
  locationCards?: {
    name: string;
    address: string;
    phone?: string;
    hours?: string;
    image?: SanityImage;
  }[];
  formFields?: {
    nameLabel?: string;
    emailLabel?: string;
    phoneLabel?: string;
    serviceLabel?: string;
    messageLabel?: string;
    submitButtonLabel?: string;
  };
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

export interface Experience {
  _id: string;
  _type: "experience";
  title: string;
  slug: SanitySlug;
  eyebrow?: string;
  description: string;
  category?: string;
  duration?: string;
  sensoryNote?: string;
  price?: string;
  priceAmount?: number;
  currency?: string;
  primaryCta?: {
    label?: string;
    url?: string;
  };
  secondaryCta?: {
    label?: string;
    url?: string;
  };
  image?: SanityImage;
  gallery?: {
    mainCard?: {
      image?: SanityImage;
      tag?: string;
      title?: string;
      badge?: string;
    };
    topRightCard?: {
      image?: SanityImage;
      tag?: string;
      title?: string;
    };
    bottomRightCard?: {
      image?: SanityImage;
      tag?: string;
      title?: string;
    };
  };
  footerNote?: string;
  highlights?: string[];
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}
