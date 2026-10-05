import type { Metadata } from "next";
import { getBlogPage, getBlogPosts, getSiteSettings } from "@/lib/sanity/data";
import { BlogHeroSection } from "../components/BlogHeroSection";
import { BlogInquiriesSection } from "../components/BlogInquiriesSection";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "The Kynta Journal | Kynta Wellness",
  description:
    "Stories from Kynta Wellness on Ayurvedic care, massage, mindful rest and the spaces designed for it.",
};

// The compendium and field-notes sections are left out until there is real
// content for them (their Sanity fields and components are kept).
export default async function BlogPage() {
  const [blog, posts, siteSettings] = await Promise.all([
    getBlogPage(),
    getBlogPosts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <main>
        <BlogHeroSection data={blog?.hero} />
        <BlogInquiriesSection data={blog?.inquiriesSection} posts={posts} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
