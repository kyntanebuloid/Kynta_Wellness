import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TopBar } from "../components/TopBar";
import { PartnershipSection } from "../components/PartnershipSection";

export const metadata: Metadata = {
  title: "Partner With Kynta Wellness | B2B Partnerships",
  description: "Explore partnership opportunities with Kynta Wellness. Collaborate on wellness initiatives, institutional advisory, and transformative retreat experiences.",
};

export default async function PartnerPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <TopBar data={siteSettings?.topBar} />
      <Header navigation={siteSettings?.navigation} logo={siteSettings?.logo} />
      <main>
        <PartnershipSection />
      </main>
      <Footer data={siteSettings?.footer} />
    </>
  );
}
