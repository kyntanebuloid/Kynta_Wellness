import type { Metadata } from "next";
import { getLocationsPage, getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LocationsSection } from "../components/LocationsSection";
import { SanctuaryCTASection } from "../components/SanctuaryCTASection";
import { TopBar } from "../components/TopBar";

export const metadata: Metadata = {
  title: "Locations | Kynta Wellness Group",
  description:
    "Five sacred havens across tranquil Himalayan cedar valleys, royal heritage courtyards, and silent desert dunes — each offering NABH-certified classical Ayurvedic rejuvenation.",
};

export default async function LocationsPage() {
  const [locations, siteSettings] = await Promise.all([
    getLocationsPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <TopBar data={siteSettings?.topBar} />
      <Header navigation={siteSettings?.navigation} logo={siteSettings?.logo} />
      <main>
        <LocationsSection
          data={locations?.hero}
          locations={locations?.locations}
        />
        <SanctuaryCTASection data={locations?.ctaSection} />
      </main>
      <Footer data={siteSettings?.footer} />
    </>
  );
}
