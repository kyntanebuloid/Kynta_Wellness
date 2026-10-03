// Real text for the Locations page and each spa's page, from the printed spa
// menus and the team (addresses, hours, reservation number). Photos, booking
// menus, membership plans and map links are not touched by this file.
// Applied to the built-in defaults (src/content/locations.ts) and pushed to
// Sanity text-only by `npm run apply:real-text`.

import type {
  GalleryCardContent,
  LocationContent,
  LocationFacilityIcon,
  LocationService,
} from "./locations";

export const RESERVATION_PHONE = "+91 7250333494";

const TREATMENT_LIST =
  "Spa Sojourns • Couple Spa • Massages • Glamour Glow • Rapid Relax";

type SpaFacts = {
  name: string;
  /** The hotel or resort, used in sentences. */
  hotel: string;
  city: string;
  state: string;
  address: string;
  /** Leave out when the team hasn't confirmed the timings yet. */
  hours?: string;
  /** Lowest treatment price on this spa's menu (before tax). */
  fromPrice: number;
};

const SPAS: Record<string, SpaFacts> = {
  "indraprastha-dharamshala": {
    name: "Indraprastha Resort, Dharamshala",
    hotel: "Indraprastha Resort",
    city: "Dharamshala",
    state: "Himachal Pradesh",
    address:
      "Strawberry Hills, Satobari, near Dal Lake – McLeod Ganj, Dharamshala, Dhial, Himachal Pradesh 176216",
    fromPrice: 2000,
  },
  "asia-spa-dharamshala": {
    name: "Asia Spa & Resort, Dharamshala",
    hotel: "Asia Spa & Resort",
    city: "Dharamshala",
    state: "Himachal Pradesh",
    address: "Dharamshala, Himachal Pradesh",
    fromPrice: 2000,
  },
  "indraprastha-dalhousie": {
    name: "Indraprastha Spa Resort, Dalhousie",
    hotel: "Indraprastha Spa Resort",
    city: "Dalhousie",
    state: "Himachal Pradesh",
    address:
      "Dalhousie – Chamba Rd, Near Bus Stand, Moti Tiba, Dalhousie, Himachal Pradesh 176304",
    hours: "08:00 – 20:00 Daily",
    fromPrice: 1100,
  },
  "bhanjwar-palace": {
    name: "Bhanwar Singh Palace, Pushkar",
    hotel: "Bhanwar Singh Palace",
    city: "Pushkar",
    state: "Rajasthan",
    address:
      "Bhanwar Singh Palace, Village Hokra, Ajmer–Pushkar Bypass, Pushkar, Rajasthan 305022",
    fromPrice: 2000,
  },
  "rawai-tents": {
    name: "Rawai Luxury Tents, Pushkar",
    hotel: "Rawai Luxury Tents",
    city: "Pushkar",
    state: "Rajasthan",
    address:
      "Brahma Mandir Rd, near Savitri Mata Temple, Pushkar, Rajasthan 305022",
    fromPrice: 2000,
  },
  "infinitea-palampur": {
    name: "Infinitea Sports Club & Tea Garden Resort, Palampur",
    hotel: "Infinitea Sports Club & Tea Garden Resort",
    city: "Palampur",
    state: "Himachal Pradesh",
    address: "Bundla Tea Estate, Chopati, Palampur, Himachal Pradesh 176061",
    hours: "10:00 – 20:00 Daily",
    fromPrice: 1100,
  },
};

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** The text fields a spa's card and page show, built from its real facts. */
export type RealLocationText = Required<
  Pick<
    LocationContent,
    | "name"
    | "address"
    | "hours"
    | "phone"
    | "price"
    | "cardDescription"
    | "breadcrumbEyebrow"
    | "description"
    | "sanctuaryId"
    | "sanctuaryInfo"
    | "primaryCta"
  >
> & {
  services: LocationService[];
  facilities: { icon: LocationFacilityIcon; title: string; subtitle: string }[];
  gallery: {
    mainCard: GalleryCardContent;
    topRightCard: GalleryCardContent;
    bottomRightCard: GalleryCardContent;
  };
};

export function realLocationText(slug: string): RealLocationText | null {
  const spa = SPAS[slug];
  if (!spa) return null;
  const hours = spa.hours ?? "Call for timings";
  return {
    name: spa.name,
    address: spa.address,
    hours,
    phone: RESERVATION_PHONE,
    price: `Treatments from ${inr(spa.fromPrice)}`,
    cardDescription: `Massages, facials, couple spa and Spa Sojourns at ${spa.hotel}, rooted in Ayurvedic wisdom.`,
    breadcrumbEyebrow: `KYNTA SPA • ${spa.city.toUpperCase()}, ${spa.state.toUpperCase()}`,
    description: `The Kynta Wellness spa at ${spa.hotel}, ${spa.city}. Rooted in Ayurvedic wisdom, it offers therapeutic massages, facials, couple spa experiences and immersive Spa Sojourns, each designed to balance the body, calm the mind and restore inner harmony.`,
    sanctuaryId: spa.city.toUpperCase(),
    sanctuaryInfo: [
      { label: "ADDRESS", title: spa.address },
      { label: "SPA HOURS", title: hours },
      { label: "RESERVATIONS", title: RESERVATION_PHONE },
      { label: "TREATMENTS", title: TREATMENT_LIST },
    ],
    primaryCta: { label: "BOOK A TREATMENT", url: "/book" },
    services: ["spa"],
    facilities: [
      {
        icon: "flower",
        title: "Ayurvedic Massages",
        subtitle: "Abhyanga, herbal Potli & more",
      },
      {
        icon: "sun",
        title: "Spa Sojourns",
        subtitle: "Deep Sleep, Nourish & Royal Renewal",
      },
      {
        icon: "mountain",
        title: "Glamour Glow",
        subtitle: "Facials & body treatments",
      },
      {
        icon: "car",
        title: "Rapid Relax",
        subtitle: "30-minute head, face, foot & back",
      },
    ],
    gallery: {
      mainCard: {
        tag: `KYNTA SPA • ${spa.city.toUpperCase()}`,
        title: "Massage Selections",
        badge: "60 / 90 MIN",
        subtitle: "Swedish, Deep Tissue, Aroma, Abhyanga, Potli & Signature",
      },
      topRightCard: {
        tag: "COUPLE SPA",
        title: "Couple's Retreat & Couple's Bliss",
        subtitle: "Side by side in a private suite",
      },
      bottomRightCard: {
        tag: "GLAMOUR GLOW",
        title: "Facials & Body Treatments",
        subtitle: "Scrubs, polishers, masques & facials",
      },
    },
  };
}

/** Puts the real text onto a spa, keeping its photos and other fields. */
export function withRealText(location: LocationContent): LocationContent {
  const real = location.slug ? realLocationText(location.slug) : null;
  if (!real) return location;
  return {
    ...location,
    ...real,
    gallery: {
      mainCard: { ...location.gallery?.mainCard, ...real.gallery.mainCard },
      topRightCard: {
        ...location.gallery?.topRightCard,
        ...real.gallery.topRightCard,
      },
      bottomRightCard: {
        ...location.gallery?.bottomRightCard,
        ...real.gallery.bottomRightCard,
      },
    },
  };
}

export const realLocationsPageText = {
  hero: {
    eyebrow: "Kynta Spas",
    heading: "Our Spa Locations",
    subheading:
      "Kynta Wellness spas at six hotels and resorts across Himachal Pradesh and Rajasthan. Every spa offers the same Ayurveda-rooted menu of massages, facials and spa journeys; prices vary by location.",
  },
  filterLabels: {
    all: "All Spas",
    himalayan: "Himachal Pradesh",
    rajasthan: "Rajasthan",
  },
  ctaSection: {
    badge: "Spa Reservations",
    heading: "Need Help Choosing a Spa?",
    description: `Call or WhatsApp our reservations team on ${RESERVATION_PHONE} and we will help you choose a spa, a treatment and a time that suits you.`,
    ctaText: "Contact Us",
    ctaUrl: "/contact",
    whatsappLabel: "WhatsApp Us",
    whatsappUrl: "https://wa.me/917250333494",
  },
};
