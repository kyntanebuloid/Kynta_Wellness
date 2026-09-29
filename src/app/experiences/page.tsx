import type { Metadata } from "next";
import { getExperiencesPage, getSiteSettings } from "@/lib/sanity/data";
import { ExperiencePillarsSection } from "../components/ExperiencePillarsSection";
import { ExperienceProtocolSection } from "../components/ExperienceProtocolSection";
import { ExperiencesSection } from "../components/ExperiencesSection";
import { ExperienceTreatmentsSection } from "../components/ExperienceTreatmentsSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TopBar } from "../components/TopBar";

export const metadata: Metadata = {
  title: "Experiences | Kynta Wellness Group",
  description:
    "Transformative journeys crafted for body and mind. From single bespoke somatic rituals to multi-day immersive detox retreats across India's most extraordinary palace hotels and secluded eco-resorts.",
};

export default async function ExperiencesPage() {
  const [experiences, siteSettings] = await Promise.all([
    getExperiencesPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <TopBar data={siteSettings?.topBar} />
      <Header navigation={siteSettings?.navigation} logo={siteSettings?.logo} />
      <main>
        <ExperiencesSection data={experiences?.hero} />
        <ExperiencePillarsSection data={experiences?.pillars} />
        <ExperienceTreatmentsSection data={experiences?.treatmentsSection} />
        <ExperienceProtocolSection data={experiences?.protocolSection} />
      </main>
      <Footer data={siteSettings?.footer} />
    </>
  );
}
