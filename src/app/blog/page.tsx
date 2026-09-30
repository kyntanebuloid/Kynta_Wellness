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
      <TopBar settings={siteSettings} />
      <Header settings={siteSettings} />
      <main>
        <BlogHeroSection data={blog?.hero} />
        <BlogInquiriesSection data={blog?.inquiriesSection} />
        <BlogCompendiumSection data={blog?.compendiumSection} />
        <BlogPhilosophySoundSection data={blog?.philosophySection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
