import type { Metadata } from "next";
import { locationsPageDefaults } from "@/content/locations";
import { list } from "@/content/types";
import {
  getHomepage,
  getLocationsPage,
  getSiteSettings,
} from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { ReservationSection } from "../components/ReservationSection";

export const metadata: Metadata = {
  title: "Book Your Sanctuary Retreat | Kynta Wellness Group",
  description:
    "Reserve your transformative wellness retreat at Kynta Wellness sanctuaries. Select your destination, experiences, and dates to begin your healing journey.",
};

export default async function BookPage() {
  const [siteSettings, homepage, locationsPage] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
    getLocationsPage(),
  ]);

  return (
    <>
      <main>
        <ReservationSection
          data={homepage?.reservationSection}
          locations={list(
            locationsPage?.locations,
            locationsPageDefaults.locations,
          )}
          gstPercent={locationsPage?.gstPercent}
          advancePercent={locationsPage?.advancePercent}
          fallbackPhone={siteSettings?.topBar?.phone}
        />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
