import type { ContentImage } from "./types";

export interface ContactPhone {
  kind?: "phone" | "whatsapp";
  label?: string;
  number?: string;
  /** Hours for a phone line, a badge such as INSTANT for WhatsApp. */
  note?: string;
}

/**
 * The single phone and WhatsApp fields Sanity held before the Phone Numbers
 * list; still read until the Contact page is re-synced or edited.
 */
export interface LegacyContactPhones {
  phoneLabel?: string;
  phone?: string;
  phoneHours?: string;
  whatsappLabel?: string;
  whatsappNumber?: string;
  whatsappBadge?: string;
}

export interface ContactPageContent {
  hero?: { eyebrow?: string; heading?: string; subheading?: string };
  desks?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    phones?: ContactPhone[];
    emailHeading?: string;
    emails?: { label?: string; email?: string }[];
    image?: ContentImage;
    imageLabel?: string;
    imageCaption?: string;
    hoursHeading?: string;
    hoursText?: string;
  };
  form?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    /** Two tabs: the guest form first, then the hotel / resort form. */
    tabs?: string[];
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    /** Guest form: preferred spa. Options default to the Locations page names. */
    sanctuaryLabel?: string;
    sanctuaryPlaceholder?: string;
    sanctuaries?: string[];
    /** Hotel form. */
    propertyLabel?: string;
    propertyPlaceholder?: string;
    cityLabel?: string;
    cityPlaceholder?: string;
    serviceLabel?: string;
    servicePlaceholder?: string;
    /**
     * In the same order as the For Hotels partnership models, so the links
     * there (/contact?tier=turnkey, advisory, licensing) pick the right one.
     */
    hotelServices?: string[];
    messageLabel?: string;
    messagePlaceholder?: string;
    hotelMessagePlaceholder?: string;
    privacyNote?: string;
    submitLabel?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export const contactPageDefaults = {
  hero: {
    eyebrow: "SANCTUARY LIAISON & CONCIERGE",
    heading: "Connect With Our Sanctuary Desks",
    subheading:
      "Connect with our sanctuary curators for retreat reservations, clinical Vaidya consultations, and institutional advisory. Our team responds with ancestral precision and unyielding discretion.",
  },
  desks: {
    eyebrow: "DIRECT COMMUNICATION PORTALS",
    heading: "Sanctuary Desks",
    description:
      "Our stewards oversee limited correspondence streams to preserve the sanctity and deep attention owed to every guest and institutional patron.",
    phones: [
      {
        kind: "phone",
        label: "PRIVATE GUEST CONCIERGE",
        number: "+91 7250333494",
        note: "07:00 – 22:00 IST",
      },
      {
        kind: "whatsapp",
        label: "ENCRYPTED SANCTUARY WHATSAPP",
        number: "+91 98200 48300",
        note: "INSTANT",
      },
    ] satisfies ContactPhone[],
    emailHeading: "SPECIALIZED EMAIL DESKS",
    emails: [
      { label: "Official email address", email: "info@kyntawellness.com" },
      { label: "Official email address", email: "bussinss@kyntawellness.com" },
    ],
    image: { url: "/contact-chamber.png", alt: "Kynta Treatment Chambers" },
    imageLabel: "THERAPEUTIC ARCHITECTURE",
    imageCaption: "Kynta Treatment Chambers • Udaipur, Shimla & Mandrem",
    hoursHeading: "CIRCADIAN RECEPTION HOURS",
    hoursText:
      "In alignment with ancient chronobiology (Brahma Muhurta through Sandhya), our telephone concierges are accessible from 07:00 to 22:00 IST. Digital dispatches undergo intake around the clock.",
  },
  form: {
    eyebrow: "GET IN TOUCH",
    heading: "Send Us a Message",
    description:
      "Tell us a little about what you need and our team will reply within one working day.",
    tabs: ["I'M A GUEST", "I'M A HOTEL / RESORT"],
    nameLabel: "YOUR NAME *",
    namePlaceholder: "Full name",
    emailLabel: "EMAIL *",
    emailPlaceholder: "name@example.com",
    phoneLabel: "PHONE / WHATSAPP",
    phonePlaceholder: "+91 98765 43210",
    sanctuaryLabel: "PREFERRED SPA",
    sanctuaryPlaceholder: "Any location",
    sanctuaries: [],
    propertyLabel: "HOTEL / PROPERTY NAME *",
    propertyPlaceholder: "e.g. The Lake Palace",
    cityLabel: "CITY",
    cityPlaceholder: "e.g. Udaipur",
    serviceLabel: "WHAT DO YOU NEED?",
    servicePlaceholder: "Choose one",
    hotelServices: [
      "Full spa management (turnkey)",
      "Spa design & planning",
      "Kynta products under your brand",
      "Not sure yet, let's talk",
    ],
    messageLabel: "MESSAGE",
    messagePlaceholder:
      "Preferred dates, treatments you are interested in, or anything we should know.",
    hotelMessagePlaceholder:
      "Number of rooms, spa size, opening timeline, or anything else that helps.",
    privacyNote: "We only use your details to reply to you.",
    submitLabel: "SEND MESSAGE",
    successMessage:
      "Thank you, your message has been sent. We will get back to you within one working day.",
    errorMessage:
      "Sorry, your message could not be sent. Please call or WhatsApp us instead.",
  },
} satisfies Required<ContactPageContent>;
