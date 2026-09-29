import { getBookableExperienceOptions } from "@/lib/actions/bookings";
import { getHomepage, getSiteSettings, getLocationsPage } from "@/lib/sanity/data";
import { DestinationsSection } from "./components/DestinationsSection";
import { Footer } from "./components/Footer";
import { GuestPathSection } from "./components/GuestPathSection";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { JournalSection } from "./components/JournalSection";
import { PartnershipSection } from "./components/PartnershipSection";
import { PillarsSection } from "./components/PillarsSection";
import { ReservationSection } from "./components/ReservationSection";
import { TopBar } from "./components/TopBar";
import { TreatmentsSection } from "./components/TreatmentsSection";
import { ServicesSection } from "./components/ServicesSection";


export default async function Home() {
  const [siteSettings, homepage, experiencesResult, locationsPage] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
    getBookableExperienceOptions(),
    getLocationsPage(),
  ]);
  const services = experiencesResult.data ?? [];

  return (
    <>
      <TopBar data={siteSettings?.topBar} />
      <Header navigation={siteSettings?.navigation} logo={siteSettings?.logo} />
      <main>
        <Hero data={homepage?.hero} />
        <ServicesSection data={homepage?.servicesSection} />


        {/* <TreatmentsSection data={homepage?.treatmentsSection} /> */}
        <DestinationsSection locations={locationsPage?.locations} />
        <GuestPathSection data={homepage?.guestPathSection} />
        <PartnershipSection data={homepage?.partnershipSection} />
        <JournalSection data={homepage?.journalSection} />
        <ReservationSection
          data={homepage?.reservationSection}
          services={services}
          locations={locationsPage?.locations}
        />
      </main>
      <Footer data={siteSettings?.footer} />
    </>
  );
}
