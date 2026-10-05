import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { LegalPage, type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Kynta Wellness Group",
  description:
    "How Kynta Wellness collects, uses and protects your personal information when you book a treatment, contact us or subscribe to our newsletter.",
};

// Describes what this website actually does with personal data.
const sections: LegalSection[] = [
  {
    heading: "Who We Are",
    body: [
      'This website is run by Kynta Wellness Group ("Kynta", "we", "us"), which operates Kynta Wellness spas at partner hotels and resorts in Himachal Pradesh and Rajasthan, India.',
      "This policy explains what personal information we collect through this website, why we collect it, who we share it with and the choices you have.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "We only collect information you give us through the forms on this website:",
      [
        "Booking a treatment: your name, email address, phone or WhatsApp number, the spa, treatment, date, time and number of guests, and anything you choose to tell us in the notes (for example allergies, pain areas or preferences).",
        "Booking requests and the contact form: your name, email address, phone number and your message; for hotel enquiries, also your property name, city and the service you are interested in.",
        "Newsletter: your email address.",
        "Payments: your payment is processed by Razorpay. We receive the payment status and reference numbers, but we never see or store your full card, UPI or bank details.",
      ],
      "Please only share health information that helps us look after you safely during your treatment.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      [
        "To confirm, manage and deliver your booking, and to send you booking confirmations.",
        "To reply to your enquiries and booking requests, including forwarding a booking request to the spa you chose.",
        "To take payments and keep records required for accounting and tax (including GST).",
        "To send our newsletter, only if you subscribed. You can unsubscribe at any time by replying to any of our emails.",
        "To keep the website secure and prevent misuse, such as spam form submissions.",
      ],
      "We do not sell your personal information, and we do not use it for third-party advertising.",
    ],
  },
  {
    heading: "Who We Share It With",
    body: [
      "We share your information only with the services we need to run this website and your booking:",
      [
        "The Kynta spa and partner hotel you book or enquire about, so they can prepare for your visit.",
        "Razorpay, to process online payments.",
        "Supabase, which stores booking records.",
        "Sanity, which stores website content and newsletter sign-ups.",
        "Vercel, which hosts this website.",
        "Our email providers (Google / Resend), which deliver confirmation and reply emails.",
      ],
      "We may also share information when the law requires it.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This website uses only the cookies it needs to work, such as keeping you signed in to your account and protecting the admin area. We do not use advertising or tracking cookies.",
      "If a spa page shows an embedded Google Map, Google may set its own cookies when the map loads.",
    ],
  },
  {
    heading: "How Long We Keep It",
    body: [
      "We keep booking and payment records for as long as needed to provide our services and to meet legal, accounting and tax obligations. Enquiries are kept for as long as needed to answer them and follow up. Newsletter sign-ups are kept until you unsubscribe.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Under India's Digital Personal Data Protection Act, 2023, you can ask us to:",
      [
        "tell you what personal information we hold about you;",
        "correct or update it;",
        "delete it, where we are not required to keep it by law;",
        "stop sending you newsletters.",
      ],
      "To make a request, contact us through the contact page or by phone. We will respond within a reasonable time.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We use reputable, secure service providers and encrypted (HTTPS) connections, and we limit access to personal information to people who need it. No method of sending or storing data is completely secure, but we work to protect your information.",
    ],
  },
  {
    heading: "Children",
    body: [
      "Our spas welcome guests under 16 only when accompanied by an adult, and bookings should be made by an adult. We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this policy from time to time. The latest version is always on this page, with the date it was last updated.",
    ],
  },
];

export default async function PrivacyPage() {
  const siteSettings = await getSiteSettings();
  return (
    <>
      <main>
        <LegalPage
          eyebrow="Kynta Wellness"
          title="Privacy Policy"
          updated="5 October 2026"
          intro="Your privacy matters to us, at our spas and online. This page explains, in plain words, how we handle the personal information you share with us on this website."
          sections={sections}
        />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
