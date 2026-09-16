import { getHomepage, getSiteSettings } from "@/lib/sanity/data";
import { DestinationsSection } from "./components/DestinationsSection";
import { Footer } from "./components/Footer";
import { GuestPathSection } from "./components/GuestPathSection";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { IntroSection } from "./components/IntroSection";
import { JournalSection } from "./components/JournalSection";
import { PartnershipSection } from "./components/PartnershipSection";
import { PillarsSection } from "./components/PillarsSection";
import { ReservationSection } from "./components/ReservationSection";
import { TopBar } from "./components/TopBar";
import { TreatmentsSection } from "./components/TreatmentsSection";

export default async function Home() {
  const [siteSettings, homepage] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
  ]);

  return (
    <>
      <TopBar data={siteSettings?.topBar} />
      <Header navigation={siteSettings?.navigation} logo={siteSettings?.logo} />
      <main>
        <Hero data={homepage?.hero} />
        <IntroSection data={homepage?.introSection} />
        <PillarsSection data={homepage?.pillarsSection} />
        <TreatmentsSection data={homepage?.treatmentsSection} />
        <DestinationsSection data={homepage?.destinationsSection} />
        <GuestPathSection data={homepage?.guestPathSection} />
        <PartnershipSection data={homepage?.partnershipSection} />
        <JournalSection data={homepage?.journalSection} />
        <ReservationSection data={homepage?.reservationSection} />
      </main>
      <Footer data={siteSettings?.footer} />
    </>
  );
}
