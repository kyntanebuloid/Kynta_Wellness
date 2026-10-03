import type { Metadata } from "next";
import { getAboutPage, getSiteSettings } from "@/lib/sanity/data";
import { AboutHeroSection } from "../components/AboutHeroSection";
import { AboutStewardshipSection } from "../components/AboutStewardshipSection";
import { AboutTriadSection } from "../components/AboutTriadSection";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "About | Kynta Wellness Group",
  description:
    "Kynta Wellness is a luxury wellness and spa brand rooted in Ayurvedic wisdom, offering therapeutic massages and rejuvenating spa experiences at six spas across Himachal Pradesh and Rajasthan.",
};

export default async function AboutPage() {
  const [about, siteSettings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <main>
        <AboutHeroSection data={about?.hero} />
        <AboutTriadSection data={about?.triadSection} />
        {/* Timeline, leadership and awards are hidden until real details
            are provided (their content was placeholder). The components
            and Sanity fields are still there to switch them back on. */}
        <AboutStewardshipSection data={about?.stewardshipSection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
