import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]`);

export const homepageQuery = defineQuery(`*[_type == "homepage"][0]`);

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
