import type { Metadata } from "next";
import { locationsPageDefaults } from "@/content/locations";
import { list } from "@/content/types";
import {
  getContactPage,
  getLocationsPage,
  getSiteSettings,
} from "@/lib/sanity/data";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact & Concierge Liaison | Kynta Wellness Group",
  description:
    "Connect with our sanctuary curators for retreat reservations, clinical Vaidya consultations, and institutional advisory. Our team responds with ancestral precision and unyielding discretion.",
};

export default async function ContactPage() {
  const [contact, locationsPage, siteSettings] = await Promise.all([
    getContactPage(),
    getLocationsPage(),
    getSiteSettings(),
  ]);
  const locationNames = list(
    locationsPage?.locations,
    locationsPageDefaults.locations,
  ).map((location) => location.name);

  return (
    <>
      <main>
        <ContactSection
          data={contact || undefined}
          locationNames={locationNames}
        />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
