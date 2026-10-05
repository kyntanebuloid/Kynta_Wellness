// Real text for the For Hotels page. Only facts we can stand behind: the six
// hotels Kynta runs spas at today, the printed spa menu, the website's own
// booking and payment features, and the standards printed in the menu.
// Applied to the built-in defaults (src/content/hospitality.ts) and pushed to
// Sanity text-only by `npm run apply:real-text`. Photos are not touched.

import type { HospitalityPageContent } from "./hospitality";

type Section<K extends keyof HospitalityPageContent> = NonNullable<
  HospitalityPageContent[K]
>;

export const realHospitalityText = {
  hero: {
    eyebrow: "FOR HOTELS & RESORTS",
    heading: "A Kynta Spa for Your Hotel.",
    description:
      "Kynta Wellness runs Ayurveda-rooted spas inside hotels and resorts across Himachal Pradesh and Rajasthan, with a complete menu of massages, facials and spa journeys, online booking for your guests and a prepaid membership that keeps them coming back.",
    primaryCta: { label: "PARTNER WITH KYNTA", url: "/contact?tier=turnkey" },
    badges: ["SPAS AT 6 HOTELS & RESORTS", "22-TREATMENT KYNTA MENU"],
    imageCaption: "KYNTA WELLNESS SPA",
    imageAlt: "Hotel spa and pool",
  },
  statsSection: {
    metrics: [
      {
        value: "6",
        label: "PARTNER HOTELS & RESORTS",
        description: "Running Kynta spas today",
      },
      {
        value: "4",
        label: "CITIES",
        description: "Dharamshala, Dalhousie, Palampur & Pushkar",
      },
      {
        value: "22",
        label: "TREATMENTS",
        description: "Five categories, the same menu at every spa",
      },
      {
        value: "25%",
        label: "ADVANCE BOOKING",
        description: "Guests book online and pay in full or a 25% advance",
      },
    ],
  } satisfies Section<"statsSection">,
  modelsSection: {
    eyebrow: "HOW WE WORK",
    heading: "Three Ways to Partner",
    description:
      "Choose the support your property needs. Every option comes with the Kynta treatment menu and the standards printed in it.",
    // Same order as the contact form's hotel options (turnkey, design, products).
    models: [
      {
        number: "01",
        pillLabel: "COMPLETE",
        highlighted: false,
        title: "Full Spa Management",
        description:
          "We run the spa for you: trained Kynta therapists, the full treatment menu with your own price list, and guest bookings and payments.",
        features: [
          "Trained Kynta therapists",
          "The 22-treatment Kynta menu at your own prices",
          "Online booking and payments for your guests",
        ],
        ctaLabel: "ENQUIRE ABOUT MANAGEMENT",
        ctaUrl: "/contact?tier=turnkey",
      },
      {
        number: "02",
        pillLabel: "NEW SPAS",
        highlighted: true,
        title: "Spa Design & Planning",
        description:
          "Planning a new spa or refreshing an existing one? We help you plan treatment and couple's rooms and a calm, private journey for every guest.",
        features: [
          "Treatment rooms and couple's suites",
          "A calm, private guest journey",
          "Planned around your property",
        ],
        ctaLabel: "ENQUIRE ABOUT DESIGN",
        ctaUrl: "/contact?tier=advisory",
      },
      {
        number: "03",
        pillLabel: "PRODUCTS",
        highlighted: false,
        title: "Kynta Products Under Your Brand",
        description:
          "Spa oils and products for your property, used alongside Kynta treatments. Ask us what is available for your hotel.",
        features: [
          "Co-branded spa products",
          "Used in Kynta treatments",
          "Ask us about availability",
        ],
        ctaLabel: "ENQUIRE ABOUT PRODUCTS",
        ctaUrl: "/contact?tier=licensing",
      },
    ],
  } satisfies Section<"modelsSection">,
  viabilitySection: {
    eyebrow: "FOR YOUR GUESTS",
    heading: "A Complete Spa Experience",
    description:
      "Everything a Kynta spa brings to your guests, straight from our spa menu.",
    imageCaption: "KYNTA TREATMENT ROOM",
    imageAlt: "Kynta Wellness treatment room",
    stats: [
      {
        value: "5",
        label: "TREATMENT CATEGORIES",
        description:
          "Spa Sojourns, Couple Spa, Massage Selections, Glamour Glow and Rapid Relax.",
      },
      {
        value: "30–300",
        label: "MINUTES",
        description:
          "From a 30-minute Marma head massage to the five-massage Royal Renewal.",
      },
      {
        value: "3",
        label: "MEMBERSHIP PLANS",
        description:
          "Kynta Revibe Peace, Serenity and Tranquility, redeemed at your hotel's spa.",
      },
      {
        value: "2",
        label: "WAYS TO PAY",
        description:
          "Guests pay in full or a 25% advance online, with GST shown before they pay.",
      },
    ],
  },
  transformationsSection: {
    eyebrow: "OUR PARTNER PROPERTIES",
    heading: "Where Kynta Runs Today",
    description:
      "Kynta spas at six hotels and resorts, from the hills of Himachal Pradesh to the temple town of Pushkar.",
    imageAlt: "Resort pool and gardens",
    transformations: [
      {
        location: "DHARAMSHALA, HIMACHAL PRADESH",
        metric: "From ₹2,000",
        metricHighlighted: true,
        title: "Indraprastha Resort",
        description:
          "Satobari, near Dal Lake and McLeod Ganj. A full Kynta menu for guests exploring Naddi and the Dhauladhar foothills. Open 10:00 to 20:00 daily.",
        footerLabel: "KYNTA SPA",
      },
      {
        location: "DHARAMSHALA, HIMACHAL PRADESH",
        metric: "From ₹2,000",
        metricHighlighted: false,
        title: "Asia Spa & Resort",
        description:
          "In Dharamshala Cantt, minutes from Dal Lake and Naddi View Point, with couple's treatment rooms. Open 10:00 to 20:00 daily.",
        footerLabel: "KYNTA SPA",
      },
      {
        location: "DALHOUSIE, HIMACHAL PRADESH",
        metric: "From ₹1,100",
        metricHighlighted: true,
        title: "Indraprastha Spa Resort",
        description:
          "On Chamba Road near Moti Tibba, a short drive from Gandhi Chowk. Open 08:00 to 20:00 daily.",
        footerLabel: "KYNTA SPA",
      },
      {
        location: "PALAMPUR, HIMACHAL PRADESH",
        metric: "From ₹1,100",
        metricHighlighted: false,
        title: "Infinitea Sports Club & Tea Garden Resort",
        description:
          "At Bundla Tea Estate, alongside the resort's sports club. Open 10:00 to 20:00 daily.",
        footerLabel: "KYNTA SPA",
      },
      {
        location: "PUSHKAR, RAJASTHAN",
        metric: "From ₹2,000",
        metricHighlighted: true,
        title: "Bhanwar Singh Palace",
        description:
          "On the Ajmer–Pushkar road at Village Honkra, about ten minutes from Pushkar Lake. Open 10:00 to 20:00 daily.",
        footerLabel: "KYNTA SPA",
      },
      {
        location: "PUSHKAR, RAJASTHAN",
        metric: "From ₹2,000",
        metricHighlighted: false,
        title: "Rawai Luxury Tents",
        description:
          "On Brahma Mandir Road, a five-minute walk from the Brahma and Savitri Mata temples. Open 10:00 to 20:00 daily.",
        footerLabel: "KYNTA SPA",
      },
    ],
  },
  assuranceSection: {
    eyebrow: "THE KYNTA STANDARD",
    heading: "Professional Care in Every Session",
    description:
      "The same standards at every Kynta spa, as printed in our spa menu.",
    pillars: [
      {
        icon: "certified",
        title: "Professional Treatments",
        description:
          "Every treatment is professional in nature, with a strict conduct policy that protects guests and therapists.",
      },
      {
        icon: "housing",
        title: "Privacy & Draping",
        description:
          "Therapists use professional draping throughout every treatment, and disposable undergarments are provided.",
      },
      {
        icon: "closed-loop",
        title: "Clear Guest Policies",
        description:
          "Arrival, cancellation and spa etiquette rules shared with every guest, including the 4-hour cancellation window.",
      },
      {
        icon: "pms",
        title: "Online Booking & Payments",
        description:
          "Your spa's own price list online, full or 25% advance payment, GST at checkout and confirmation emails for every booking.",
      },
    ],
  } satisfies Section<"assuranceSection">,
};

/** The "For Hotel Owners" section on the home page and /partner. */
export const realPartnershipText = {
  eyebrow: "For Hotel Owners",
  heading: "We run your hotel spa for you.",
  description:
    "Running a spa takes time and skill. Kynta can plan it, staff it with trained therapists and run it every day, with the full Kynta menu, online booking and a membership that brings guests back.",
  primaryCta: { label: "Get Partner Details", url: "/partner" },
  secondaryCta: { label: "Book a Call With Us", url: "/contact?tier=turnkey" },
  services: [
    {
      icon: "spatial",
      title: "Spa Design & Planning",
      description:
        "We help you plan treatment rooms, couple's suites and a calm, private journey for every guest.",
    },
    {
      icon: "management",
      title: "We Run Your Spa Daily",
      description:
        "Day-to-day spa operations, from guest bookings and service to supplies.",
    },
    {
      icon: "sourcing",
      title: "Trained Therapists",
      description:
        "Skilled Kynta therapists who tailor every treatment and follow our professional standards, with draping throughout.",
    },
    {
      icon: "formulation",
      title: "The Kynta Menu",
      description:
        "22 treatments across five categories, from Ayurvedic massages and facials to Spa Sojourns, at your spa's own price list.",
    },
    {
      icon: "revpash",
      title: "Online Booking & Payments",
      description:
        "Guests book online and pay in full or a 25% advance, with a confirmation email for every booking.",
    },
    {
      icon: "brand",
      title: "Kynta Revibe Membership",
      description:
        "A prepaid spa membership with Peace, Serenity and Tranquility plans that brings guests and locals back to your spa.",
    },
  ],
};
