import type {
  AboutPage,
  BlogPage,
  BlogPost,
  ContactPage,
  ExperiencesPage,
  Faq,
  Homepage,
  HospitalityPage,
  LocationsPage,
  Service,
  SiteSettings,
  Testimonial,
  Treatment,
} from "@/types/sanity";
import { sanityClient } from "./client";
import {
  aboutPageQuery,
  allBlogPostsQuery,
  allFaqsQuery,
  allServicesQuery,
  allTestimonialsQuery,
  allTreatmentsQuery,
  blogPageQuery,
  blogPostBySlugQuery,
  blogPostsByCategoryQuery,
  contactPageQuery,
  experiencesPageQuery,
  faqsByCategoryQuery,
  homepageQuery,
  hospitalityPageQuery,
  locationsPageQuery,
  serviceBySlugQuery,
  siteSettingsQuery,
  testimonialsByServiceQuery,
  treatmentBySlugQuery,
} from "./queries";

async function fetchSanity<T>(
  query: string,
  params?: Record<string, string>,
): Promise<T | null> {
  try {
    const client = sanityClient();
    if (params) {
      return await client.fetch<T>(query, params);
    }
    return await client.fetch<T>(query);
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchSanity<SiteSettings>(siteSettingsQuery);
}

export async function getHomepage(): Promise<Homepage | null> {
  return fetchSanity<Homepage>(homepageQuery);
}

export async function getExperiencesPage(): Promise<ExperiencesPage | null> {
  return fetchSanity<ExperiencesPage>(experiencesPageQuery);
}

export async function getLocationsPage(): Promise<LocationsPage | null> {
  return fetchSanity<LocationsPage>(locationsPageQuery);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return fetchSanity<AboutPage>(aboutPageQuery);
}

export async function getHospitalityPage(): Promise<HospitalityPage | null> {
  return fetchSanity<HospitalityPage>(hospitalityPageQuery);
}

export async function getBlogPage(): Promise<BlogPage | null> {
  return fetchSanity<BlogPage>(blogPageQuery);
}

export async function getContactPage(): Promise<ContactPage | null> {
  return fetchSanity<ContactPage>(contactPageQuery);
}

export async function getAllServices(): Promise<Service[]> {
  const result = await fetchSanity<Service[]>(allServicesQuery);
  return result ?? [];
}

export async function getServiceBySlug(
  slug: string,
): Promise<Service | null> {
  return fetchSanity<Service>(serviceBySlugQuery, { slug });
}

export async function getAllTreatments(): Promise<Treatment[]> {
  const result = await fetchSanity<Treatment[]>(allTreatmentsQuery);
  return result ?? [];
}

export async function getTreatmentBySlug(
  slug: string,
): Promise<Treatment | null> {
  return fetchSanity<Treatment>(treatmentBySlugQuery, { slug });
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const result = await fetchSanity<BlogPost[]>(allBlogPostsQuery);
  return result ?? [];
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  return fetchSanity<BlogPost>(blogPostBySlugQuery, { slug });
}

export async function getBlogPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  const result = await fetchSanity<BlogPost[]>(blogPostsByCategoryQuery, {
    category,
  });
  return result ?? [];
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const result = await fetchSanity<Testimonial[]>(allTestimonialsQuery);
  return result ?? [];
}

export async function getTestimonialsByService(
  serviceId: string,
): Promise<Testimonial[]> {
  const result = await fetchSanity<Testimonial[]>(
    testimonialsByServiceQuery,
    { serviceId },
  );
  return result ?? [];
}

export async function getAllFaqs(): Promise<Faq[]> {
  const result = await fetchSanity<Faq[]>(allFaqsQuery);
  return result ?? [];
}

export async function getFaqsByCategory(category: string): Promise<Faq[]> {
  const result = await fetchSanity<Faq[]>(faqsByCategoryQuery, { category });
  return result ?? [];
}
