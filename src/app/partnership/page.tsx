import type { Metadata } from "next";
import { getHomepage, getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { PartnershipSection } from "../components/PartnershipSection";

export const metadata: Metadata = {
  title: "Partnership Models | Kynta Wellness Group",
  description:
    "Discover our flexible partnership models designed for institutions, hospitality partners, and wellness collaborators seeking to integrate Kynta's transformative approach.",
};

export default async function PartnershipPage() {
  const [siteSettings, homepage] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
  ]);

  return (
    <>
      <main>
        <PartnershipSection data={homepage?.partnershipSection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
