import type { Metadata } from "next";
import { getAboutPage, getSiteSettings } from "@/lib/sanity/data";
import { AboutAccreditationsSection } from "../components/AboutAccreditationsSection";
import { AboutHeroSection } from "../components/AboutHeroSection";
import { AboutLeadershipSection } from "../components/AboutLeadershipSection";
import { AboutStewardshipSection } from "../components/AboutStewardshipSection";
import { AboutTimelineSection } from "../components/AboutTimelineSection";
import { AboutTriadSection } from "../components/AboutTriadSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TopBar } from "../components/TopBar";

export const metadata: Metadata = {
  title: "About | Kynta Wellness Group",
  description:
    "Ancient wisdom meets architectural stillness. Kynta constructs sensory sanctuaries where classical Ayurvedic therapeutics intersect with modern luxury hospitality.",
};

export default async function AboutPage() {
  const [about, siteSettings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <TopBar data={siteSettings?.topBar} />
      <Header navigation={siteSettings?.navigation} logo={siteSettings?.logo} />
      <main>
        <AboutHeroSection data={about?.hero} />
        <AboutTriadSection data={about?.triadSection} />
        <AboutTimelineSection data={about?.timelineSection} />
        <AboutLeadershipSection data={about?.leadershipSection} />
        <AboutStewardshipSection data={about?.stewardshipSection} />
        <AboutAccreditationsSection data={about?.accreditationsSection} />
      </main>
      <Footer data={siteSettings?.footer} />
    </>
  );
}
