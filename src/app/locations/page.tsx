import type { Metadata } from "next";
import { getLocationsPage, getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { LocationsSection } from "../components/LocationsSection";
import { SanctuaryCTASection } from "../components/SanctuaryCTASection";

export const metadata: Metadata = {
  title: "Locations | Kynta Wellness Group",
  description:
    "Kynta Wellness spas at six hotels and resorts in Dharamshala, Dalhousie, Palampur and Pushkar, offering Ayurveda-rooted massages, facials, couple spa and spa journeys.",
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
