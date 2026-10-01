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
    eyebrow: "CONTACT US",
    heading: "Get in Touch with Kynta Wellness",
    subheading:
      "Whether you are planning a visit to one of our spas or exploring a spa partnership for your hotel, our team is here to help. We usually reply within one working day.",
  },
  desks: {
    eyebrow: "CONTACT DETAILS",
    heading: "Speak to Our Team",
    description: "Call, message or email us, whichever is easiest for you.",
    phones: [
      {
        kind: "phone",
        label: "BOOKINGS & ENQUIRIES",
        number: "+91 7250333494",
        note: "07:00 – 22:00 IST",
      },
      {
        kind: "whatsapp",
        label: "WHATSAPP",
        number: "+91 98200 48300",
        note: "QUICK REPLY",
      },
    ] satisfies ContactPhone[],
    emailHeading: "EMAIL",
    emails: [
      { label: "General enquiries", email: "info@kyntawellness.com" },
      { label: "Business & partnerships", email: "bussinss@kyntawellness.com" },
    ],
    image: {
      url: "/contact-chamber.png",
      alt: "A Kynta Wellness treatment room",
    },
    imageLabel: "OUR SPAS",
    imageCaption: "A Kynta Wellness treatment room",
    hoursHeading: "OPENING HOURS",
    hoursText:
      "Our team is available by phone from 07:00 to 22:00 IST, seven days a week. Emails and messages sent through this page are answered within one working day.",
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
