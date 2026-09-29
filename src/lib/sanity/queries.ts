import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  title,
  description,
  logo,
  ogImage,
  contactEmail,
  contactPhone,
  address,
  socialLinks,
  topBar,
  navigation[]{
    label,
    url,
    isButton
  },
  footer{
    brandName,
    brandDescription,
    newsletterHeading,
    newsletterDescription,
    newsletterPlaceholder,
    newsletterButtonLabel,
    footerNav[]{
      heading,
      links[]{
        label,
        url
      }
    }
  }
}`);

export const homepageQuery = defineQuery(`*[_type == "homepage"][0]{
  hero{
    eyebrow,
    headline,
    subtitle,
    ctaText,
    ctaUrl,
    image
  },
  introSection{
    eyebrow,
    heading,
    description,
    stats[]{
      value,
      label
    }
  },
  pillarsSection{
    eyebrow,
    heading,
    description,
    pillars[]{
      icon,
      title,
      description
    }
  },
  treatmentsSection{
    eyebrow,
    heading,
    description,
    treatments[]{
      title,
      description,
      duration,
      sensoryNote,
      image
    }
  },
  destinationsSection{
    eyebrow,
    heading,
    description,
    destinations[]{
      name,
      address,
      hours,
      phone,
      email,
      image,
      tags,
      services
    }
  },
  guestPathSection{
    eyebrow,
    heading,
    description,
    steps[]{
      number,
      title,
      description
    },
    faq[]{
      question,
      answer
    },
    stats[]{
      value,
      label
    }
  },
  partnershipSection{
    eyebrow,
    heading,
    description,
    services[]{
      icon,
      title,
      description
    }
  },
  journalSection{
    eyebrow,
    heading,
    description,
    articles[]{
      title,
      excerpt,
      category,
      readTime,
      author,
      image
    }
  },
  reservationSection{
    eyebrow,
    heading,
    description,
    infoCards[]{
      icon,
      title,
      description
    },
    contactPhone,
    contactEmail,
    contactAddress
  },
  seo
}`);

export const experiencesPageQuery =
  defineQuery(`*[_type == "experiencesPage"][0]{
  hero{
    eyebrow,
    heading,
    subheading
  },
  filters[]{
    label,
    value
  },
  experiences[]{
    title,
    description,
    category,
    image,
    duration,
    price
  },
  pillars{
    eyebrow,
    heading,
    description,
    cards[]{
      icon,
      title,
      description
    }
  },
  treatmentsSection{
    eyebrow,
    heading,
    description,
    cards[]{
      title,
      slug,
      description,
      duration,
      sensoryNote,
      image
    }
  },
  protocolSection{
    eyebrow,
    heading,
    description,
    steps[]{
      number,
      title,
      description
    }
  },
  seo
}`);

export const locationsPageQuery = defineQuery(`*[_type == "locationsPage"][0]{
  hero{
    eyebrow,
    heading,
    subheading
  },
  locations[]{
    name,
    address,
    region,
    price,
    slug,
    imagePath,
    detailsUrl,
    hours,
    phone,
    email,
    image,
    services
  },
  ctaSection{
    heading,
    description,
    ctaText,
    ctaUrl
  },
  seo
}`);

export const locationBySlugQuery = defineQuery(`*[_type == "locationsPage"][0]{
  "location": locations[slug == $slug][0]{
    name,
    address,
    region,
    price,
    slug,
    imagePath,
    detailsUrl,
    hours,
    phone,
    email,
    image,
    services
  }
}.location`);

export const allLocationSlugsQuery = defineQuery(
  `*[_type == "locationsPage"][0].locations[].slug`,
);

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"][0]{
  hero{
    eyebrow,
    heading,
    description,
    image,
    stats[]{
      value,
      label
    }
  },
  triadSection{
    eyebrow,
    heading,
    description,
    cards[]{
      title,
      description,
      image
    }
  },
  timelineSection{
    eyebrow,
    heading,
    description,
    milestones[]{
      year,
      title,
      description,
      image
    }
  },
  leadershipSection{
    eyebrow,
    heading,
    description,
    members[]{
      name,
      role,
      bio,
      image
    }
  },
  stewardshipSection{
    eyebrow,
    heading,
    description,
    features[]{
      title,
      description
    },
    images[]{
      asset,
      alt
    }
  },
  accreditationsSection{
    eyebrow,
    heading,
    description,
    awards[]{
      title,
      organization,
      year,
      description
    }
  },
  seo
}`);

export const hospitalityPageQuery =
  defineQuery(`*[_type == "hospitalityPage"][0]{
  hero{
    eyebrow,
    heading,
    description,
    image,
    stats[]{
      value,
      label
    }
  },
  statsSection{
    eyebrow,
    heading,
    description,
    metrics[]{
      value,
      label,
      description
    }
  },
  modelsSection{
    eyebrow,
    heading,
    description,
    models[]{
      title,
      description,
      features
    }
  },
  viabilitySection{
    eyebrow,
    heading,
    description,
    stats[]{
      value,
      label,
      description
    },
    image
  },
  transformationsSection{
    eyebrow,
    heading,
    description,
    transformations[]{
      title,
      before,
      after,
      description
    }
  },
  assuranceSection{
    eyebrow,
    heading,
    description,
    pillars[]{
      icon,
      title,
      description
    }
  },
  seo
}`);

export const blogPageQuery = defineQuery(`*[_type == "blogPage"][0]{
  hero{
    eyebrow,
    heading,
    subheading
  },
  filters[]{
    label,
    value
  },
  inquiriesSection{
    eyebrow,
    heading,
    description,
    articles[]{
      title,
      excerpt,
      category,
      readTime,
      author,
      image
    }
  },
  compendiumSection{
    eyebrow,
    heading,
    description,
    chapters[]{
      title,
      description,
      chapterNumber,
      author,
      image
    },
    practitionerNotes[]{
      title,
      author,
      role,
      excerpt
    }
  },
  philosophySection{
    eyebrow,
    heading,
    description,
    fieldNotes[]{
      title,
      excerpt,
      category,
      author,
      image
    },
    audioTracks[]{
      title,
      duration,
      category,
      audioUrl
    }
  },
  seo
}`);

export const contactPageQuery = defineQuery(`*[_type == "contactPage"][0]{
  hero{
    eyebrow,
    heading,
    subheading
  },
  tabs[]{
    label,
    value
  },
  contactInfo{
    email,
    phone,
    address,
    workingHours
  },
  locationCards[]{
    name,
    address,
    phone,
    hours,
    image
  },
  formFields{
    nameLabel,
    emailLabel,
    phoneLabel,
    serviceLabel,
    messageLabel,
    submitButtonLabel
  },
  seo
}`);

export const allServicesQuery = defineQuery(
  `*[_type == "service"] | order(title asc) {
    _id,
    title,
    slug,
    shortDescription,
    image,
    "treatments": *[_type == "treatment" && service._ref == ^._id] {
      _id,
      title,
      slug,
      shortDescription,
      image
    }
  }`,
);

export const serviceBySlugQuery = defineQuery(
  `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    image,
    seo,
    "treatments": *[_type == "treatment" && service._ref == ^._id] {
      _id,
      title,
      slug,
      description,
      shortDescription,
      image
    }
  }`,
);

export const allTreatmentsQuery = defineQuery(
  `*[_type == "treatment"] | order(title asc) {
    _id,
    title,
    slug,
    shortDescription,
    image,
    service->{ title, slug }
  }`,
);

export const treatmentBySlugQuery = defineQuery(
  `*[_type == "treatment" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    image,
    seo,
    service->{ title, slug }
  }`,
);

export const allBlogPostsQuery = defineQuery(
  `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    category,
    publishedAt
  }`,
);

export const blogPostBySlugQuery = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    category,
    content,
    publishedAt,
    seo
  }`,
);

export const blogPostsByCategoryQuery = defineQuery(
  `*[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    category,
    publishedAt
  }`,
);

export const allTestimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    clientName,
    clientTitle,
    quote,
    clientImage,
    rating,
    service->{ title }
  }`,
);

export const testimonialsByServiceQuery = defineQuery(
  `*[_type == "testimonial" && service._ref == $serviceId] | order(_createdAt desc) {
    _id,
    clientName,
    clientTitle,
    quote,
    clientImage,
    rating
  }`,
);

export const allFaqsQuery = defineQuery(
  `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`,
);

export const faqsByCategoryQuery = defineQuery(
  `*[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`,
);

export const allExperiencesQuery = defineQuery(
  `*[_type == "experience"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    eyebrow,
    description,
    category,
    duration,
    sensoryNote,
    price,
    priceAmount,
    currency,
    primaryCta,
    secondaryCta,
    image,
    gallery,
    footerNote,
    highlights,
    seo
  }`,
);

export const bookableExperiencesQuery = defineQuery(
  `*[
    _type == "experience" &&
    !(_id in path("drafts.**")) &&
    defined(priceAmount) &&
    priceAmount > 0 &&
    currency == "INR"
  ] | order(title asc) {
    _id,
    title,
    duration,
    price,
    priceAmount,
    currency
  }`,
);

export const experiencePricingByIdQuery = defineQuery(
  `*[
    _type == "experience" &&
    !(_id in path("drafts.**")) &&
    _id == $id
  ][0] {
    _id,
    title,
    priceAmount,
    currency
  }`,
);

export const experienceBySlugQuery = defineQuery(
  `*[_type == "experience" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    eyebrow,
    description,
    category,
    duration,
    sensoryNote,
    price,
    priceAmount,
    currency,
    primaryCta,
    secondaryCta,
    image,
    gallery,
    footerNote,
    highlights,
    seo
  }`,
);

export const allExperienceSlugsQuery = defineQuery(
  `*[_type == "experience" && defined(slug.current)][].slug.current`,
);
