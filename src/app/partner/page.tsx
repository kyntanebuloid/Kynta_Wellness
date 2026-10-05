import type { Metadata } from "next";
import Link from "next/link";
import {
  getHomepage,
  getHospitalityPage,
  getSiteSettings,
} from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { HospitalityAssuranceSection } from "../components/HospitalityAssuranceSection";
import { HospitalityHeroSection } from "../components/HospitalityHeroSection";
import { HospitalityModelsSection } from "../components/HospitalityModelsSection";
import { HospitalityStatsSection } from "../components/HospitalityStatsSection";
import { HospitalityTransformationsSection } from "../components/HospitalityTransformationsSection";
import { PartnershipSection } from "../components/PartnershipSection";

export const metadata: Metadata = {
  title: "Partner With Kynta Wellness | Spas for Hotels & Resorts",
  description:
    "Partner with Kynta Wellness: spa management, spa design and products for hotels and resorts, with trained therapists, the 22-treatment Kynta menu, online booking and membership.",
};

// Everything a hotel owner needs: what we take care of, how to partner,
// where Kynta runs today and our standards, then a way to get in touch.
export default async function PartnerPage() {
  const [siteSettings, homepage, hospitality] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
    getHospitalityPage(),
  ]);

  return (
    <>
      <main>
        <HospitalityHeroSection data={hospitality?.hero} />
        <HospitalityStatsSection data={hospitality?.statsSection} />
        <PartnershipSection data={homepage?.partnershipSection} hideButtons />
        <HospitalityModelsSection data={hospitality?.modelsSection} />
        <HospitalityTransformationsSection
          data={hospitality?.transformationsSection}
        />
        <HospitalityAssuranceSection data={hospitality?.assuranceSection} />
        <section className="w-full bg-kynta-teal-dark py-16 md:py-20">
          <div className="container-site text-center text-white">
            <p className="section-label text-white/70 mb-3">
              Let&apos;s Talk
            </p>
            <h2 className="font-serif text-3xl lg:text-[40px] leading-[1.2] mb-4 max-w-2xl mx-auto">
              Bring a Kynta Spa to Your Hotel
            </h2>
            <p className="text-[14.5px] leading-[1.75] text-white/80 max-w-xl mx-auto mb-8">
              Tell us about your property and what you need. Our team will reply
              within one working day.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?tier=turnkey"
                className="px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase bg-white text-kynta-teal-dark rounded-md hover:bg-kynta-section-bg transition-colors"
              >
                Send an Enquiry
              </Link>
              <a
                href="tel:+917250333494"
                className="px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase border border-white/60 text-white rounded-md hover:bg-white/10 transition-colors"
              >
                Call +91&nbsp;7250333494
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
