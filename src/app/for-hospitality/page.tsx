import type { Metadata } from "next";
import { getHospitalityPage, getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HospitalityAssuranceSection } from "../components/HospitalityAssuranceSection";
import { HospitalityHeroSection } from "../components/HospitalityHeroSection";
import { HospitalityModelsSection } from "../components/HospitalityModelsSection";
import { HospitalityStatsSection } from "../components/HospitalityStatsSection";
import { HospitalityTransformationsSection } from "../components/HospitalityTransformationsSection";
import { HospitalityViabilitySection } from "../components/HospitalityViabilitySection";
import { TopBar } from "../components/TopBar";

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
      <TopBar data={siteSettings?.topBar} />
      <Header navigation={siteSettings?.navigation} logo={siteSettings?.logo} />
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
      <Footer data={siteSettings?.footer} />
    </>
  );
}
