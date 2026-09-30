import type { Metadata } from "next";
import { getLocationsPage, getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { LocationsSection } from "../components/LocationsSection";
import { SanctuaryCTASection } from "../components/SanctuaryCTASection";

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
      <main>
        <LocationsSection page={locations} />
        <SanctuaryCTASection data={locations?.ctaSection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
