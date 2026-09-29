import type { Metadata } from "next";
import { getContactPage, getSiteSettings } from "@/lib/sanity/data";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TopBar } from "../components/TopBar";

export const metadata: Metadata = {
  title: "Contact & Concierge Liaison | Kynta Wellness Group",
  description:
    "Connect with our sanctuary curators for retreat reservations, clinical Vaidya consultations, and institutional advisory. Our team responds with ancestral precision and unyielding discretion.",
};

export default async function ContactPage() {
  const [contact, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <TopBar settings={siteSettings} />
      <Header settings={siteSettings} />
      <main>
        <ContactSection data={contact || undefined} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
