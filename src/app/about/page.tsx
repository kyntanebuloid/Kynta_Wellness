import type { Metadata } from "next";
import { locationsPageDefaults } from "@/content/locations";
import { list } from "@/content/types";
import {
  getAboutPage,
  getAllExperiences,
  getLocationsPage,
  getSiteSettings,
} from "@/lib/sanity/data";
import { AboutHeroSection } from "../components/AboutHeroSection";
import {
  AboutCtaSection,
  AboutSpasSection,
  AboutTreatmentsSection,
  AboutValuesSection,
} from "../components/AboutMoreSections";
import { AboutStewardshipSection } from "../components/AboutStewardshipSection";
import { AboutTriadSection } from "../components/AboutTriadSection";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "About | Kynta Wellness Group",
  description:
    "Kynta Wellness is a luxury wellness and spa brand rooted in Ayurvedic wisdom, offering therapeutic massages and rejuvenating spa experiences at six spas across Himachal Pradesh and Rajasthan.",
};

export default async function AboutPage() {
  const [about, siteSettings, experiences, locationsPage] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
    getAllExperiences(),
    getLocationsPage(),
  ]);

  return (
    <>
      <main>
        <AboutHeroSection data={about?.hero} />
        <AboutValuesSection data={about?.valuesSection} />
        <AboutTriadSection data={about?.triadSection} />
        <AboutTreatmentsSection
          data={about?.treatmentsSection}
          experiences={experiences}
        />
        <AboutSpasSection
          data={about?.spasSection}
          locations={list(
            locationsPage?.locations,
            locationsPageDefaults.locations,
          )}
        />
        {/* Timeline, leadership and awards are hidden until real details
            are provided (their content was placeholder). The components
            and Sanity fields are still there to switch them back on. */}
        <AboutStewardshipSection data={about?.stewardshipSection} />
        <AboutCtaSection data={about?.ctaSection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
