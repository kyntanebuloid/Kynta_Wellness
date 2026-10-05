import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { LegalPage, type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Kynta Wellness Group",
  description:
    "The terms for booking treatments, payments, cancellations, memberships and spa visits at Kynta Wellness spas, and for using this website.",
};

// Booking, cancellation, membership and spa rules come from the Kynta spa menu.
const sections: LegalSection[] = [
  {
    heading: "About These Terms",
    body: [
      'These terms apply when you use this website or book a treatment at a Kynta Wellness spa ("Kynta", "we", "us"). By booking or using the website, you agree to them. Please also read our Privacy Policy.',
    ],
  },
  {
    heading: "Bookings",
    body: [
      [
        "You can book online, by phone or on WhatsApp. An online booking is confirmed once payment is received; you will get a confirmation by email.",
        "Treatments, durations and prices differ by spa. The price shown when you book is the price for the spa you chose.",
        "Please give accurate contact details so we can reach you about your booking.",
        "For spas where online booking is not yet available, a booking request is not a confirmed booking until the spa contacts you to confirm it.",
      ],
    ],
  },
  {
    heading: "Prices and Payment",
    body: [
      [
        "Prices are in Indian Rupees. GST (currently 5%) is added and shown before you pay.",
        "You can pay the full amount online, or pay a 25% advance online and the rest at the spa.",
        'Couple treatments marked "each" are priced per person.',
        "Online payments are processed securely by Razorpay.",
        "Premium oil blends and other add-ons are charged extra.",
        "Promotional offers do not apply to Spa Sojourns packages or Rapid Relax treatments.",
      ],
    ],
  },
  {
    heading: "Cancellations and Changes",
    body: [
      [
        "Please arrive 15 minutes before your scheduled session.",
        "To cancel or change a booking, please tell us at least 4 working hours before your appointment.",
        "Late cancellations are charged a 50% cancellation fee.",
        "Any refund due is made to the original payment method.",
      ],
    ],
  },
  {
    heading: "Kynta Revibe Membership",
    body: [
      [
        "Kynta Revibe is a prepaid spa membership. Membership packages are non-refundable.",
        "Memberships can be redeemed only at your home centre, during spa operating hours, with a membership card or booklet.",
        "Appointments under a membership must be made at least 24 hours in advance.",
        "Membership plans do not apply to Spa Sojourns.",
        "Plans, prices, benefits and validity are as shown for your spa at the time of purchase.",
      ],
    ],
  },
  {
    heading: "At the Spa",
    body: [
      [
        "Help us keep the spa calm by keeping mobile phones silent and speaking softly.",
        "Guests under 16 are not permitted in the spa unless accompanied by an adult.",
        "Smoking and alcohol are not allowed in the spa area, and the spa may decline to serve guests under the influence of alcohol.",
        "Gentlemen are advised to shave at least 3 hours before a facial.",
        "Disposable undergarments are provided, and our therapists use professional draping throughout every treatment.",
      ],
    ],
  },
  {
    heading: "Health and Conduct",
    body: [
      "If you are pregnant or have any medical condition, please consult your doctor before booking and tell your therapist before the treatment starts.",
      "Our treatments are professional in nature. Any illicit or sexually suggestive behaviour, remarks or advances will end the session immediately and may result in legal action, and the full charge for the service will still apply.",
    ],
  },
  {
    heading: "Our Responsibility",
    body: [
      "Our spa treatments serve general well-being and are not a substitute for professional medical treatment, whatever condition a guest may have. To the extent permitted by law, Kynta, its employees and representatives are not liable for any incident experienced by a guest during or after a spa service.",
    ],
  },
  {
    heading: "Using This Website",
    body: [
      "The content, text and images on this website belong to Kynta Wellness or are used with permission. Please do not copy or reuse them without our written permission, and do not misuse the website or its forms.",
      "We work to keep information on this website accurate, but treatments, prices and availability may change. The details confirmed for your booking apply.",
    ],
  },
  {
    heading: "Governing Law and Changes",
    body: [
      "These terms are governed by the laws of India. We may update them from time to time; the latest version is always on this page.",
    ],
  },
];

export default async function TermsPage() {
  const siteSettings = await getSiteSettings();
  return (
    <>
      <main>
        <LegalPage
          eyebrow="Kynta Wellness"
          title="Terms of Service"
          updated="5 October 2026"
          intro="These terms explain how booking, payment, cancellation and spa visits work at Kynta Wellness, based on our spa menu. Please read them before you book."
          sections={sections}
        />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
