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
    tabs?: string[];
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    sanctuaryLabel?: string;
    sanctuaryPlaceholder?: string;
    sanctuaries?: string[];
    intentLabel?: string;
    intentDefault?: string;
    datesLabel?: string;
    datesPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    privacyNote?: string;
    submitLabel?: string;
    successMessage?: string;
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
    eyebrow: "CONCIERGE INTAKE",
    heading: "Initiate Sanctuary Dialogue",
    description:
      "Please share your preferred rhythm, sanctuary location, or operational scope. Our desk curator will review and assemble your customized therapeutic folio.",
    tabs: [
      "PRIVATE GUEST BOOKING",
      "HOSPITALITY & TURNKEY",
      "VAIDYA CONSULTATION",
    ],
    nameLabel: "PRINCIPAL GUEST / EXECUTIVE NAME *",
    namePlaceholder: "e.g. Lady Anya Vardhan",
    emailLabel: "CONFIDENTIAL EMAIL ADDRESS *",
    emailPlaceholder: "name@domain.com",
    phoneLabel: "DIRECT TELEPHONE / WHATSAPP",
    phonePlaceholder: "+91 / +44 / +1 ...",
    sanctuaryLabel: "SANCTUARY OF RESONANCE *",
    sanctuaryPlaceholder: "Select an Estate",
    sanctuaries: [
      "Kumarakom Retreat, Kerala",
      "Udaipur Lake Sanctuary, Rajasthan",
      "Himalayan High Sanctuaries, Shimla",
      "Mandrem Coconut Grove, North Goa",
      "Bhanjwar Estate, Kangra Valley",
      "Multiple Sanctuaries / Institutional Scope",
    ],
    intentLabel: "PRIMARY THERAPEUTIC INTENT",
    intentDefault: "14–21 Day Classical Panchakarma",
    datesLabel: "ANTICIPATED SEASON / DATES",
    datesPlaceholder: "e.g. October 2025 / Flexible",
    messageLabel:
      "SOMATIC SENSITIVITIES, DIETARY PRINCIPLES, OR PROJECT SPECIFICATIONS",
    messagePlaceholder:
      "Detail any existing medical protocols, sleep rhythms, botanical allergies, or institutional hotel scale requirements...",
    privacyNote:
      "All intakes are bound by statutory Ayush and GDPR confidential protocols.",
    submitLabel: "TRANSMIT CONCIERGE FOLIO",
    successMessage:
      "Thank you. Your concierge intake folio has been securely transmitted. A sanctuary curator will contact you promptly.",
  },
} satisfies Required<ContactPageContent>;
