import type { Metadata } from "next";
import {
  getExperiencesPage,
  getLocationsPage,
  getSiteSettings,
} from "@/lib/sanity/data";
import { ExperienceGoodToKnowSection } from "../components/ExperienceGoodToKnowSection";
import { ExperienceMembershipSection } from "../components/ExperienceMembershipSection";
import { ExperiencePillarsSection } from "../components/ExperiencePillarsSection";
import { ExperienceProtocolSection } from "../components/ExperienceProtocolSection";
import { ExperiencesSection } from "../components/ExperiencesSection";
import { ExperienceTreatmentsSection } from "../components/ExperienceTreatmentsSection";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Experiences | Kynta Wellness Group",
  description:
    "Kynta spa treatments: Spa Sojourns, Couple Spa, Massage Selections, Glamour Glow and Rapid Relax, plus the Kynta Revibe membership. Rooted in Ayurveda, offered at Kynta spas across India.",
};

export default async function ExperiencesPage() {
  const [experiences, siteSettings, locationsPage] = await Promise.all([
    getExperiencesPage(),
    getSiteSettings(),
    getLocationsPage(),
  ]);

  return (
    <>
      <main>
        <ExperiencesSection data={experiences?.hero} />
        <ExperiencePillarsSection data={experiences?.pillars} />
        <ExperienceTreatmentsSection data={experiences?.treatmentsSection} />
        <ExperienceProtocolSection data={experiences?.protocolSection} />
        <ExperienceMembershipSection
          data={experiences?.membershipSection}
          locations={locationsPage?.locations}
          fallbackPhone={siteSettings?.topBar?.phone}
        />
        <ExperienceGoodToKnowSection data={experiences?.goodToKnowSection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
