import type { Metadata } from "next";
import { getBlogPage, getSiteSettings } from "@/lib/sanity/data";
import { BlogCompendiumSection } from "../components/BlogCompendiumSection";
import { BlogHeroSection } from "../components/BlogHeroSection";
import { BlogInquiriesSection } from "../components/BlogInquiriesSection";
import { BlogPhilosophySoundSection } from "../components/BlogPhilosophySoundSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TopBar } from "../components/TopBar";

export const metadata: Metadata = {
  title: "The Gazette & Journal | Kynta Wellness Group",
  description:
    "Treatises on Stillness, Botanical Formulations & Restorative Space. Dispatches from our Ayurvedic practitioners, spatial masterplanners, and apothecary artisans.",
};

export default async function BlogPage() {
  const [blog, siteSettings] = await Promise.all([
    getBlogPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <TopBar data={siteSettings?.topBar} />
      <Header navigation={siteSettings?.navigation} logo={siteSettings?.logo} />
      <main>
        <BlogHeroSection data={blog?.hero} filters={blog?.filters} />
        <BlogInquiriesSection data={blog?.inquiriesSection} />
        <BlogCompendiumSection data={blog?.compendiumSection} />
        <BlogPhilosophySoundSection data={blog?.philosophySection} />
      </main>
      <Footer data={siteSettings?.footer} />
    </>
  );
}
