import type { Metadata } from "next";
import { getBookableExperienceOptions } from "@/lib/actions/bookings";
import {
  getHomepage,
  getLocationsPage,
  getSiteSettings,
} from "@/lib/sanity/data";
import { DestinationsSection } from "./components/DestinationsSection";
import { Footer } from "./components/Footer";
import { GuestPathSection } from "./components/GuestPathSection";
import { Hero } from "./components/Hero";
import { JournalSection } from "./components/JournalSection";
import { PartnershipSection } from "./components/PartnershipSection";
import { ReservationSection } from "./components/ReservationSection";
import { ServicesSection } from "./components/ServicesSection";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  return {
    ...(homepage?.seo?.title ? { title: homepage.seo.title } : {}),
    ...(homepage?.seo?.description
      ? { description: homepage.seo.description }
      : {}),
  };
}

export default async function Home() {
  const [siteSettings, homepage, experiencesResult, locationsPage] =
    await Promise.all([
      getSiteSettings(),
      getHomepage(),
      getBookableExperienceOptions(),
      getLocationsPage(),
    ]);
  const services = experiencesResult.data ?? [];

  return (
    <>
      <main>
        <Hero data={homepage?.hero} />
        <ServicesSection data={homepage?.servicesSection} />
        <DestinationsSection
          data={homepage?.destinationsSection}
          locations={locationsPage?.locations}
        />
        <GuestPathSection data={homepage?.guestPathSection} />
        <PartnershipSection data={homepage?.partnershipSection} />
        <JournalSection data={homepage?.journalSection} />
        <ReservationSection
          data={homepage?.reservationSection}
          services={services}
          locations={locationsPage?.locations}
        />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
