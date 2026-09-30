import type { Metadata } from "next";
import { getHomepage, getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { PartnershipSection } from "../components/PartnershipSection";

export const metadata: Metadata = {
  title: "Partner With Kynta Wellness | B2B Partnerships",
  description:
    "Explore partnership opportunities with Kynta Wellness. Collaborate on wellness initiatives, institutional advisory, and transformative retreat experiences.",
};

export default async function PartnerPage() {
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
