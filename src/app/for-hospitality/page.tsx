import type { Metadata } from "next";
import { getHospitalityPage, getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { HospitalityAssuranceSection } from "../components/HospitalityAssuranceSection";
import { HospitalityHeroSection } from "../components/HospitalityHeroSection";
import { HospitalityModelsSection } from "../components/HospitalityModelsSection";
import { HospitalityStatsSection } from "../components/HospitalityStatsSection";
import { HospitalityTransformationsSection } from "../components/HospitalityTransformationsSection";
import { HospitalityViabilitySection } from "../components/HospitalityViabilitySection";

export const metadata: Metadata = {
  title: "For Hospitality | Kynta Wellness Group",
  description:
    "Elevating Luxury Hospitality Through Restorative Architecture. Turnkey governance and 100% operational integration for premier hotels and resort sanctuaries.",
};

export default async function ForHospitalityPage() {
  const [hospitality, siteSettings] = await Promise.all([
    getHospitalityPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <main>
        <HospitalityHeroSection data={hospitality?.hero} />
        <HospitalityStatsSection data={hospitality?.statsSection} />
        <HospitalityModelsSection data={hospitality?.modelsSection} />
        <HospitalityViabilitySection data={hospitality?.viabilitySection} />
        <HospitalityTransformationsSection
          data={hospitality?.transformationsSection}
        />
        <HospitalityAssuranceSection data={hospitality?.assuranceSection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
