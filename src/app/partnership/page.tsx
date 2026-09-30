import type { Metadata } from "next";
import { getHomepage, getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TopBar } from "../components/TopBar";
import { PartnershipSection } from "../components/PartnershipSection";

export const metadata: Metadata = {
  title: "Partnership Models | Kynta Wellness Group",
  description: "Discover our flexible partnership models designed for institutions, hospitality partners, and wellness collaborators seeking to integrate Kynta's transformative approach.",
};

export default async function PartnershipPage() {
  const [siteSettings, homepage] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
  ]);

  return (
    <>
      <TopBar settings={siteSettings} />
      <Header settings={siteSettings} />
      <main>
        <PartnershipSection data={homepage?.partnershipSection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
