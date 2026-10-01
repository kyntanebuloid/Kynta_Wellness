import type { MenuCategory } from "@/lib/booking/menu";
import type { ContentFile, ContentImage, ContentLink } from "./types";

/** A treatment on a spa's booking menu, with a price per duration. */
export interface SpaMenuItem {
  _key: string;
  name: string;
  category?: MenuCategory;
  /** Couple treatments priced "each": charged for both guests. */
  perPerson?: boolean;
  options?: { _key?: string; minutes: number; price: number }[];
}

export type LocationRegion = "himalayan" | "rajasthan";
export type LocationService = "spa" | "dining" | "pool" | "wifi" | "suite";
export type LocationFacilityIcon = "sun" | "flower" | "mountain" | "car";

export interface GalleryCardContent {
  image?: ContentImage;
  tag?: string;
  title?: string;
  badge?: string;
  subtitle?: string;
}

export interface LocationContent {
  name: string;
  slug?: string;
  region?: LocationRegion;
  address?: string;
  cardDescription?: string;
  price?: string;
  image?: ContentImage;
  /** Legacy local path from before photos were uploaded to Sanity. */
  imagePath?: string;
  detailsUrl?: string;
  hours?: string;
  phone?: string;
  email?: string;
  services?: LocationService[];
  breadcrumbEyebrow?: string;
  description?: string;
  sanctuaryId?: string;
  sanctuaryInfo?: { label: string; title: string }[];
  primaryCta?: ContentLink;
  /** Button text for the downloadable PDF; the button only shows once a PDF is uploaded. */
  dossierLabel?: string;
  dossier?: ContentFile;
  mapUrl?: string;
  mapEmbedUrl?: string;
  /** Treatments bookable online here; empty means call / WhatsApp to book. */
  menu?: SpaMenuItem[];

  gallery?: {
    mainCard?: GalleryCardContent;
    topRightCard?: GalleryCardContent;
    bottomRightCard?: GalleryCardContent;
  };
  facilities?: {
    icon?: LocationFacilityIcon;
    title: string;
    subtitle?: string;
  }[];
}

/** A gallery card ready to render: every field filled, photo as a URL. */
export interface LocationGalleryCard {
  image: string;
  tag: string;
  title: string;
  badge: string;
  subtitle: string;
}

/** Everything a /locations/<slug> page renders. */
export interface LocationDetail {
  name: string;
  slug: string;
  address: string;
  description: string;
  breadcrumbEyebrow: string;
  sanctuaryId: string;
  glanceHeading: string;
  sanctuaryInfo: { label: string; title: string }[];
  primaryCta: Required<ContentLink>;
  /** Null until a PDF is uploaded for this location. */
  dossier: { label: string; url: string } | null;
  /** Null unless a Google Maps link is set in Sanity. */
  mapUrl: string | null;
  /** Null unless a valid Google Maps embed link is set in Sanity. */
  mapEmbedUrl: string | null;

  gallery: {
    mainCard: LocationGalleryCard;
    topRightCard: LocationGalleryCard;
    bottomRightCard: LocationGalleryCard;
  };
  facilities: { icon: LocationFacilityIcon; title: string; subtitle: string }[];
}

export interface LocationsPageContent {
  hero?: { eyebrow?: string; heading?: string; subheading?: string };
  filterLabels?: {
    all?: string;
    himalayan?: string;
    rajasthan?: string;
  };
  detailsLabel?: string;
  glanceHeading?: string;
  /** GST % added to menu prices at online checkout. */
  gstPercent?: number;
  /** % of the total paid online for the advance option (0 = full only). */
  advancePercent?: number;
  locations?: LocationContent[];
  ctaSection?: {
    badge?: string;
    heading?: string;
    description?: string;
    ctaText?: string;
    ctaUrl?: string;
    whatsappLabel?: string;
    whatsappUrl?: string;
  };
}

export const locationsPageDefaults = {
  hero: {
    eyebrow: "Sanctuary Enclaves & Destinations",
    heading: "Spas & Sanctuary Locations",
    subheading:
      "Five sacred havens engineered across tranquil Himalayan cedar valleys, royal heritage courtyards, and silent desert dunes — each offering NABH-certified classical Ayurvedic rejuvenation.",
  },
  filterLabels: {
    all: "All Enclaves",
    himalayan: "Himachal Pradesh",
    rajasthan: "Rajasthan",
  },
  detailsLabel: "Details",
  glanceHeading: "Sanctuary at a Glance",
  // Menus say "taxes extra"; change in Sanity (0 if prices include tax).
  gstPercent: 5,
  // Pay 25% online and the rest at the spa, or pay in full.
  advancePercent: 25,
  locations: [
    {
      name: "Indraprastha Resort Dharamshala",
      slug: "indraprastha-dharamshala",
      region: "himalayan",
      address: "Dharamshala, Himachal Pradesh",
      price: "$220 / NIGHT",
      image: {
        url: "/location-indraprastha.jpg",
        alt: "Indraprastha Resort Dharamshala",
      },
      hours: "08:00 – 21:00 Daily",
      phone: "+91 1892 221 234",
      email: "dharamshala@kyntawellness.com",
      services: ["spa", "dining", "pool", "wifi", "suite"],
      breadcrumbEyebrow: "KANGRA VALLEY • HIMALAYAN CEDAR & ALPINE STILLNESS",
      description:
        "A cedar-clad Himalayan wellness sanctuary perched above the Kangra Valley, offering traditional Ayurvedic panchakarma, alpine hydrotherapy circuits, and panoramic meditation verandas amidst towering deodar forests.",
      sanctuaryId: "HIM A–01",
      sanctuaryInfo: [
        {
          label: "CLIMATE & TERROIR",
          title: "Kangra Valley Sub-Alpine & Deodar Cedar Microclimate",
        },
        {
          label: "LINEAGE TRADITIONS",
          title: "Classical Panchakarma & Mountain Botanical Abhyanga",
        },
        {
          label: "ACCOMMODATIONS",
          title: "24 Heritage Suites & Private Cedar Pavilions",
        },
        {
          label: "NEAREST TRANSIT",
          title: "Gaggal Airport (DHM – 15 min) • Pathankot Rail (CHK – 2 hrs)",
        },
      ],
      primaryCta: {
        label: "BOOK TREATMENT & STAY",
        url: "/contact",
      },
      dossierLabel: "SANCTUARY DOSSIER (PDF)",
      gallery: {
        mainCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCNSLYPmnuaPap66ahjYy1RAlP_oqqHP1_DG4U2zy9n-vOp3KuS4PLbNt2vj52caJrKGXZNi94ti3tRLDDbOCMziXvsbZXvEAMicmNc2vFlvG2BWCQm9b31HlFXmtSGP0EAXb1jE4rNZ0kDaBhZy-Olh51oKeRLbORA1vWGsSmyUqlqiYYgL06r3UfxCPMv5XUsOTp73zWpGAaDhCqjgP.png",
            alt: "Himalayan Cedar Wellness Pavilion",
          },
          tag: "PRINCIPAL SANCTUARY • KANGRA VALLEY ALPINE RETREAT",
          title: "Himalayan Cedar Wellness Pavilion",
          badge: "Deodar Forest Immersion",
          subtitle:
            "Panoramic Kangra Valley views with alpine botanical therapy",
        },
        topRightCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCcdJI4NTtZFr3MpSldween3mNgDK7SIa-ppWquf_Hd6bdzh7PlXi7QcXI4pyRv_78SJengbacGKjuFki0pyTFl-0egrU4q9h8DRe9XXqPsQ4cUfuKY3A8RCNsZ0FW2nYwqiYyb927sCcUlZ15OgNzN_zOd0pLnkAj6uEEjzvtL2W4F4Go-OhfCuI49dHAbQ9wYe-TmrIFoAvw8UA3fu_.png",
            alt: "Mountain Spring Plunge & Cedar Sauna",
          },
          tag: "ALPINE HYDRO CIRCUITS",
          title: "Mountain Spring Plunge & Cedar Sauna",
          subtitle: "Glacial mineral water therapy at 5,200 feet",
        },
        bottomRightCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuDfpAHt6jvK0tqHjSOtwWov5kV0k6drBPNRLSiVIl6HCc8HmYLu6kP7ZcSMkoXJoQYyYna-AECNeG4p-A_ebakRmgUhPH120QlpPIxm37TebKXtltmAosqTtIJE7-VJ_kLKhjO8FKUubN6DEgNmCn8Z_JdjZVbuN-kizPtj0mtNkZ35ZnKBjxclPfIS8sOv3yXGVX6hkKc3M710ZC7yAh.png",
            alt: "Sunrise Pranayama Deck & Valley View",
          },
          tag: "MEDITATION VERANDAS",
          title: "Sunrise Pranayama Deck & Valley View",
          subtitle: "Guided breathwork above the cloud line",
        },
      },
      facilities: [
        {
          icon: "sun",
          title: "Alpine Hydrotherapy Circuit",
          subtitle: "Cedar wood-heated mineral pools",
        },
        {
          icon: "flower",
          title: "Mountain Botanical Apothecary",
          subtitle: "Wild-harvested Himalayan herbs",
        },
        {
          icon: "mountain",
          title: "Valley-View Meditation Deck",
          subtitle: "Facing Dhauladhar ranges",
        },
        {
          icon: "car",
          title: "Airport Transfer & Concierge",
          subtitle: "Complimentary Gaggal pickup",
        },
      ],
    },
    {
      name: "Asia Spa & Resort- Dharamshala",
      slug: "asia-spa-dharamshala",
      region: "himalayan",
      address: "Dharamshala, Himachal Pradesh",
      price: "$200 / NIGHT",
      image: {
        url: "/location-asia-spa.jpg",
        alt: "Asia Spa & Resort- Dharamshala",
      },
      hours: "08:00 – 21:00 Daily",
      phone: "+91 1892 222 345",
      email: "asiaspa@kyntawellness.com",
      services: ["spa", "dining", "pool", "wifi", "suite"],
      breadcrumbEyebrow: "DHARAMSHALA • TIBETAN HEALING & HIMALAYAN PANORAMA",
      description:
        "A contemporary wellness resort harmonizing Tibetan healing traditions with modern spa architecture, offering panoramic Himalayan views, private thermal suites, and integrative Ayurvedic-Tibetan wellness programs.",
      sanctuaryId: "HIM A–02",
      sanctuaryInfo: [
        {
          label: "CLIMATE & TERROIR",
          title: "Upper Dharamshala & McLeod Ganj Alpine Zone",
        },
        {
          label: "LINEAGE TRADITIONS",
          title: "Integrative Tibetan-Ayurvedic Somatic Therapy",
        },
        {
          label: "ACCOMMODATIONS",
          title: "20 Luxury Suites with Private Balcony & Mountain View",
        },
        {
          label: "NEAREST TRANSIT",
          title: "Gaggal Airport (DHM – 20 min) • Dharamshala Town (5 km)",
        },
      ],
      primaryCta: {
        label: "BOOK TREATMENT & STAY",
        url: "/contact",
      },
      dossierLabel: "SANCTUARY DOSSIER (PDF)",
      gallery: {
        mainCard: {
          image: {
            url: "/locations/Asia Spa & Resort Dharamshala/AB6AXuAsEjHi-gOYbQ5cZSt_SYR2sxtCQQ5KqPF84OFsr0yMInrj8Qk515bojFLESUE8EzIumuENEf1JtSooQv1gxSMcpg2_y-hBKoRoE4C8fjEah9Jfhf0LWtHIvsenmVNVqM3kA_r7rwL3YP4xEGbNC1LRI_j8u7lsfDugGq6OONJqxhqpMr6PkmiQr_8FIA0_I-wrhD6DzdJwKSsvh224S4.png",
            alt: "Asia Spa Wellness Pavilion & Infinity Pool",
          },
          tag: "PRINCIPAL SANCTUARY • HIMALAYAN PANORAMIC RETREAT",
          title: "Asia Spa Wellness Pavilion & Infinity Pool",
          badge: "Dhauladhar Panorama",
          subtitle: "Infinity-edge thermal pool with 180° mountain panorama",
        },
        topRightCard: {
          image: {
            url: "/locations/Asia Spa & Resort Dharamshala/AB6AXuBMc2ZJSRilI-cHzDGgxeBsLIhIJYp_-n5gSOuW6Pm-RcR2DQeTQEb45BJG_p9fiS6vHWdPybcLsZ68K2rl0hxLgS-5OIAjQIDwSLxQnZkjAMD5e-sRTJ_aahND_66hoybKnnp06Qmkp96ojDJCOBLlTxqCVyTj1MfA41Wz4BK2zxuYp-VnKbb7dJ2rsI6W-73zHFK138UpbJ4xdg5WN7.png",
            alt: "Private Ku Nye Therapy Chambers",
          },
          tag: "TIBETAN HEALING SUITES",
          title: "Private Ku Nye Therapy Chambers",
          subtitle: "Traditional Tibetan massage & moxibustion",
        },
        bottomRightCard: {
          image: {
            url: "/locations/Asia Spa & Resort Dharamshala/AB6AXuC8_fN4pxmO9IcoBRi5A-JVr5uKAnyfIZCzpCV3bU4C4Z5jTAmW5aLTlVAivqUOOf4K7mK1lW7lbYNIDHAFSy2IHrrhBpNTZLphrfMcZJNfiD21CvCAbQ5dwjM5ecJGXVfYPJNc-By0c7Kf7id1DQIwCBDDwI6_nmA_iONSfzrmyu9ef4jU6nPFob8pHC15tnCSWzeVL0mOeRg8vV8smU.png",
            alt: "Sunrise Yoga & Meditation Terrace",
          },
          tag: "MOUNTAIN VIEW LOUNGE",
          title: "Sunrise Yoga & Meditation Terrace",
          subtitle: "Above-cloud contemplation at 5,800 feet",
        },
      },
      facilities: [
        {
          icon: "sun",
          title: "Thermal Infinity Pool",
          subtitle: "Heated mineral water therapy",
        },
        {
          icon: "flower",
          title: "Tibetan Herbal Pharmacy",
          subtitle: "Amchi medicine dispensary",
        },
        {
          icon: "mountain",
          title: "Panoramic Yoga Terrace",
          subtitle: "Dhauladhar mountain views",
        },
        {
          icon: "car",
          title: "Private Transfer Service",
          subtitle: "Airport & town shuttle",
        },
      ],
    },
    {
      name: "Indraprastha spa Resorts - Dalhousie",
      slug: "indraprastha-dalhousie",
      region: "himalayan",
      address: "Dalhousie, Himachal Pradesh",
      price: "$250 / NIGHT",
      image: {
        url: "/location-dalhousie.jpg",
        alt: "Indraprastha spa Resorts - Dalhousie",
      },
      hours: "08:00 – 21:00 Daily",
      phone: "+91 1899 223 456",
      email: "dalhousie@kyntawellness.com",
      services: ["spa", "dining", "pool", "wifi", "suite"],
      breadcrumbEyebrow:
        "CHAMBA VALLEY • COLONIAL HERITAGE & PINE FOREST STILLNESS",
      description:
        "A colonial-era hill station sanctuary reimagined for modern restorative wellness, offering pine forest hydrotherapy, British-era architecture infused with Ayurvedic warmth, and silent meditation gardens overlooking the Chamba Valley.",
      sanctuaryId: "HIM A–03",
      sanctuaryInfo: [
        {
          label: "CLIMATE & TERROIR",
          title: "Dalhousie Pine Ridge & Chamba Valley Microclimate",
        },
        {
          label: "LINEAGE TRADITIONS",
          title: "Alpine Panchakarma & Forest Bathing Shinrin-Yoku",
        },
        {
          label: "ACCOMMODATIONS",
          title: "22 Heritage Suites with Valley & Pine Forest Views",
        },
        {
          label: "NEAREST TRANSIT",
          title: "Pathankot Rail (CHK – 2 hrs) • Gaggal Airport (DHM – 3 hrs)",
        },
      ],
      primaryCta: {
        label: "BOOK TREATMENT & STAY",
        url: "/contact",
      },
      dossierLabel: "SANCTUARY DOSSIER (PDF)",
      gallery: {
        mainCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuAwrVMzILVkvJdSKHV6KOt4YRo2SBEgnoj2YIROhqctBY7ghysfONhp-fJgI-Ylb5RrEJ4gL3ZY0iUsf9W21qwANDj5UffmPIc8-7MtR2q-Q_UKBZiwEL9a2b_LuJ4cUFy6K8ZqvgAedkiL_dkYASle0anA087NtqKb_GdAP4LtxhmkRSA9reT1KouAqVxmz6ka2OwRSmkPoMx7xBC9zA.png",
            alt: "Pine Forest Wellness Lodge & Thermal Baths",
          },
          tag: "PRINCIPAL SANCTUARY • CHAMBA VALLEY HERITAGE RETREAT",
          title: "Pine Forest Wellness Lodge & Thermal Baths",
          badge: "Heritage Hill Station",
          subtitle:
            "Colonial architecture with Ayurvedic warmth amidst pine forests",
        },
        topRightCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCPWnQOPklAH1szhLjSPp6mN5iKEs3NUuDXzMuOp0I9B_BetMCz6udfMOp9ACsKuf3DOUzoet0sOSH8Nrg1ugXaqyVjO98qFFKJDmiOX0lZBUjbz3QiBw3eKp1Eibv3jnRk5aCqe7ArM3Y-M2gpAz_ifo9zKDLBh8rT3Lt1m0t5oH_MJnBt9S7yUatFjfznXHsA2q9ecJXj7l1hqesuq7.png",
            alt: "Pine-Infused Thermal Circuit & Plunge",
          },
          tag: "FOREST HYDRO SUITES",
          title: "Pine-Infused Thermal Circuit & Plunge",
          subtitle: "Mountain spring water with alpine botanicals",
        },
        bottomRightCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/WhatsApp-Image-2026-07-17-at-3.21.44-PM 3.png",
            alt: "Chamba Valley Silent Garden & Yoga Shala",
          },
          tag: "VALLEY MEDITATION",
          title: "Chamba Valley Silent Garden & Yoga Shala",
          subtitle: "Secluded contemplation among ancient pines",
        },
      },
      facilities: [
        {
          icon: "sun",
          title: "Pine Forest Thermal Baths",
          subtitle: "Natural spring-fed pools",
        },
        {
          icon: "flower",
          title: "Heritage Botanical Garden",
          subtitle: "Medicinal Himalayan herbs",
        },
        {
          icon: "mountain",
          title: "Valley Meditation Gardens",
          subtitle: "Chamba panoramic views",
        },
        {
          icon: "car",
          title: "Hill Station Concierge",
          subtitle: "Pathankot rail transfers",
        },
      ],
    },
    {
      name: "Bhanwar Singh Palace Rajasthan",
      slug: "bhanjwar-palace",
      region: "rajasthan",
      address: "Rajasthan",
      price: "$300 / NIGHT",
      image: {
        url: "/location-bhanjwar.jpg",
        alt: "Bhanwar Singh Palace Rajasthan",
      },
      hours: "08:00 – 21:00 Daily",
      phone: "+91 141 224 567",
      email: "bhanjwar@kyntawellness.com",
      services: ["spa", "dining", "pool", "wifi", "suite"],
      breadcrumbEyebrow: "MARWAR HERITAGE • ROYAL COURTYARDS & PALACE AYURVEDA",
      description:
        "A 19th-century royal palace meticulously restored as a sovereign Ayurvedic sanctuary, offering heritage hammam rituals, rose-infused hydrotherapy in royal courtyards, and bespoke Marwar botanical treatments drawn from princely apothecary traditions.",
      sanctuaryId: "RAJ R–01",
      sanctuaryInfo: [
        {
          label: "CLIMATE & TERROIR",
          title: "Arid Marwar Plateau & Desert Rose Microclimate",
        },
        {
          label: "LINEAGE TRADITIONS",
          title: "Royal Hammam & Marwar Princely Apothecary Rituals",
        },
        {
          label: "ACCOMMODATIONS",
          title: "16 Palace Suites with Courtyard & Haveli Architecture",
        },
        {
          label: "NEAREST TRANSIT",
          title: "Jodhpur Airport (JDH – 40 min) • Private Helipad Available",
        },
      ],
      primaryCta: {
        label: "BOOK TREATMENT & STAY",
        url: "/contact",
      },
      dossierLabel: "SANCTUARY DOSSIER (PDF)",
      gallery: {
        mainCard: {
          image: {
            url: "/locations/Bhanwar Singh Palace Rajasthan/unnamed (1) 1.png",
            alt: "Palace Courtyard & Royal Hammam Pavilion",
          },
          tag: "PRINCIPAL SANCTUARY • MARWAR ROYAL PALACE HERITAGE",
          title: "Palace Courtyard & Royal Hammam Pavilion",
          badge: "Heritage Palace Retreat",
          subtitle: "19th-century courtyard with rose-petal hydrotherapy pools",
        },
        topRightCard: {
          image: {
            url: "/locations/Bhanwar Singh Palace Rajasthan/file_0000000020f87209babcb5ae3725f9f8 1.png",
            alt: "Marwar Botanical Treatment Chamber",
          },
          tag: "ROYAL APOTHECARY",
          title: "Marwar Botanical Treatment Chamber",
          subtitle: "Princely herbal traditions & desert flora infusions",
        },
        bottomRightCard: {
          image: {
            url: "/locations/Bhanwar Singh Palace Rajasthan/unsplash_olEZANsI-gI.png",
            alt: "Heritage Suite & Private Jharokha Terrace",
          },
          tag: "HAVELI SUITES",
          title: "Heritage Suite & Private Jharokha Terrace",
          subtitle: "Hand-painted frescoes & royal Rajasthani architecture",
        },
      },
      facilities: [
        {
          icon: "sun",
          title: "Royal Hammam & Rose Pool",
          subtitle: "Heated courtyard hydrotherapy",
        },
        {
          icon: "flower",
          title: "Marwar Desert Botanicals",
          subtitle: "Rare desert flora formulations",
        },
        {
          icon: "mountain",
          title: "Palace Yoga Courtyard",
          subtitle: "Sunrise sessions in heritage gardens",
        },
        {
          icon: "car",
          title: "Royal Concierge & Helipad",
          subtitle: "Private VIP desert arrival",
        },
      ],
    },
    {
      name: "Rawai Luxury Tents - Pushkar",
      slug: "rawai-tents",
      region: "rajasthan",
      address: "Pushkar, Rajasthan",
      price: "$190 / NIGHT",
      image: {
        url: "/location-rawai-tents.jpg",
        alt: "Rawai Luxury Tents - Pushkar",
      },
      hours: "08:00 – 21:00 Daily",
      phone: "+91 145 225 678",
      email: "rawai@kyntawellness.com",
      services: ["spa", "dining", "pool", "wifi", "suite"],
      breadcrumbEyebrow: "PUSHKAR SAND DUNES • STARLIT OASIS & DESERT SERENITY",
      description:
        "An ultra-luxury safari glamping sanctuary nestled among undulating dunes, offering open-air private plunge hydrotherapy, starlit celestial meditation, and desert botanical detox rituals rooted in classical Charaka Samhita traditions.",
      sanctuaryId: "THAR D–04",
      sanctuaryInfo: [
        {
          label: "CLIMATE & TERROIR",
          title: "Pushkar Sacred Lake & Thar Desert Microclimate",
        },
        {
          label: "LINEAGE TRADITIONS",
          title: "Desert Hydrotherapy & Somatic Starlight Yoga Nidra",
        },
        {
          label: "ACCOMMODATIONS",
          title: "18 Hand-Woven Canvas Safari Pavilions & Private Plunges",
        },
        {
          label: "NEAREST TRANSIT",
          title:
            "Kishangarh Airport (KQH – 45 min) • Jaipur Int'l (JAI – 2.5 hrs) • Private Helipad On-Site",
        },
      ],
      primaryCta: {
        label: "BOOK TREATMENT & STAY",
        url: "/contact",
      },
      dossierLabel: "SANCTUARY DOSSIER (PDF)",
      gallery: {
        mainCard: {
          image: {
            url: "/locations/Rawai Luxury Tents  Pushkar/AB6AXuDvSt3fXT690wv7fUHWE9b4LAgkQXISOFDoYJ89E-g6e6LtasJrGXJhCCOn_VlvN-F-i5RBFA9AkiH7_1ZDneN8GzS1jhffmX8AoR13LoHFgynCYLIjcrquRawnkfqfPVGJ5Vh4ISKDCo7Dy6mua7Ag8CADviAjNSeva1afl_Uiw7rICe62wIhKgpDNffYFFsGVzeGKCSJrwdbNe4jpnu.png",
            alt: "Private Heated Dunes Pool & Safari Deck",
          },
          tag: "PRINCIPAL SANCTUARY • DESERT DUNES & STARLIGHT PLUNGE POOL",
          title: "Private Heated Dunes Pool & Safari Deck",
          badge: "Unpolluted Starlight Horizon",
          subtitle:
            "Panoramic views of Thar desert ridges and cosmic skyways with sacred fireside aromatherapy",
        },
        topRightCard: {
          image: {
            url: "/locations/Rawai Luxury Tents  Pushkar/Desert Sandstone & Teak Bhashpa Chamber.png",
            alt: "Desert Sandstone & Teak Bhashpa Chamber",
          },
          tag: "HERBAL VAPOR CHAMBERS",
          title: "Desert Sandstone & Teak Bhashpa Chamber",
          subtitle: "Therapeutic neem, eucalyptus, and camel milk infusions",
        },
        bottomRightCard: {
          image: {
            url: "/locations/Rawai Luxury Tents  Pushkar/Celestial Twilight Yogic Deck & Sound Shala.png",
            alt: "Celestial Twilight Yogic Deck & Sound Shala",
          },
          tag: "OPEN-AIR SOMATICS",
          title: "Celestial Twilight Yogic Deck & Sound Shala",
          subtitle:
            "Vocal acoustic resonance beneath unpolluted Rajasthani skies",
        },
      },
      facilities: [
        {
          icon: "sun",
          title: "Solar-Heated Private Plunges",
          subtitle: "Filtered rainwater & mineral salts",
        },
        {
          icon: "flower",
          title: "Desert Rose & Frankincense",
          subtitle: "Freshly distilled farm hydrosols",
        },
        {
          icon: "mountain",
          title: "Dune Meditation Platforms",
          subtitle: "Oriented to sunrise and pole star",
        },
        {
          icon: "car",
          title: "Dedicated Chauffeur & Helipad",
          subtitle: "Seamless VIP desert arrival",
        },
      ],
    },
    {
      name: "Infinte Sports Club & Tea Garden Resort, Palampur",
      slug: "infinitea-palampur",
      region: "himalayan",
      address: "Palampur, Himachal Pradesh",
      price: "$300 / NIGHT",
      image: {
        url: "/location-infinitea.jpg",
        alt: "Infinte Sports Club & Tea Garden Resort, Palampur",
      },
      hours: "08:00 – 21:00 Daily",
      phone: "+91 1894 226 789",
      email: "infinitea@kyntawellness.com",
      services: ["spa", "dining", "pool", "wifi", "suite"],
      breadcrumbEyebrow:
        "KANGRA TEA COUNTRY • PLANTATION WELLNESS & ALPINE SPORT",
      description:
        "A lush tea-garden wellness estate in the Kangra Valley, combining active sport rejuvenation with traditional Ayurvedic spa therapies, surrounded by emerald tea plantations and the snow-capped Dhauladhar range.",
      sanctuaryId: "HIM A–04",
      sanctuaryInfo: [
        {
          label: "CLIMATE & TERROIR",
          title: "Palampur Tea Belt & Lower Dhauladhar Foothills",
        },
        {
          label: "LINEAGE TRADITIONS",
          title: "Active Sport Recovery & Tea-Infused Ayurvedic Therapy",
        },
        {
          label: "ACCOMMODATIONS",
          title: "28 Plantation Cottages & Mountain-View Sport Suites",
        },
        {
          label: "NEAREST TRANSIT",
          title: "Gaggal Airport (DHM – 30 min) • Palampur Town (3 km)",
        },
      ],
      primaryCta: {
        label: "BOOK TREATMENT & STAY",
        url: "/contact",
      },
      dossierLabel: "SANCTUARY DOSSIER (PDF)",
      gallery: {
        mainCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuAwyidA0IfYKksUZ7WDNhdZezNraDVHG-jfyN4VzkVB3ul6zfjC7Ub5vV-Go3QmT_Pe5qLLGZbmEn7EmIfAwgDjCxNAxZcWiGa7DVdh5fjlDlMckkYQIBSFIcg8rNo-AxmxOEX4qgpGIV232efeM-r1Qudt4PfHmSn6tQdi3MV48cGG23A9fhJXWrVLswKp3I5uDDOE2kyS6SXAbWA7Nz.png",
            alt: "Tea Garden Wellness Pavilion & Sport Courts",
          },
          tag: "PRINCIPAL SANCTUARY • KANGRA TEA PLANTATION ESTATE",
          title: "Tea Garden Wellness Pavilion & Sport Courts",
          badge: "Plantation Retreat",
          subtitle: "Emerald tea terraces with Dhauladhar mountain backdrop",
        },
        topRightCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuCcdJI4NTtZFr3MpSldween3mNgDK7SIa-ppWquf_Hd6bdzh7PlXi7QcXI4pyRv_78SJengbacGKjuFki0pyTFl-0egrU4q9h8DRe9XXqPsQ4cUfuKY3A8RCNsZ0FW2nYwqiYyb927sCcUlZ15OgNzN_zOd0pLnkAj6uEEjzvtL2W4F4Go-OhfCuI49dHAbQ9wYe-TmrIFoAvw8UA3fu_.png",
            alt: "Active Rejuvenation & Cold Plunge Suite",
          },
          tag: "SPORT RECOVERY CENTER",
          title: "Active Rejuvenation & Cold Plunge Suite",
          subtitle: "Post-sport hydrotherapy & deep tissue recovery",
        },
        bottomRightCard: {
          image: {
            url: "/locations/Indraprastha Spa Resort Dharamshala/AB6AXuDfpAHt6jvK0tqHjSOtwWov5kV0k6drBPNRLSiVIl6HCc8HmYLu6kP7ZcSMkoXJoQYyYna-AECNeG4p-A_ebakRmgUhPH120QlpPIxm37TebKXtltmAosqTtIJE7-VJ_kLKhjO8FKUubN6DEgNmCn8Z_JdjZVbuN-kizPtj0mtNkZ35ZnKBjxclPfIS8sOv3yXGVX6hkKc3M710ZC7yAh.png",
            alt: "Plantation Walk & Green Tea Detox Ritual",
          },
          tag: "TEA GARDEN THERAPY",
          title: "Plantation Walk & Green Tea Detox Ritual",
          subtitle: "Fresh-leaf green tea infusion & aromatic garden paths",
        },
      },
      facilities: [
        {
          icon: "sun",
          title: "Sport Recovery Hydrotherapy",
          subtitle: "Cold plunge & thermal contrast",
        },
        {
          icon: "flower",
          title: "Tea-Infused Botanical Spa",
          subtitle: "Estate-grown green tea therapy",
        },
        {
          icon: "mountain",
          title: "Plantation Walking Trails",
          subtitle: "Guided tea garden meditation",
        },
        {
          icon: "car",
          title: "Airport Shuttle & Concierge",
          subtitle: "Gaggal airport transfers",
        },
      ],
    },
  ] as LocationContent[],
  ctaSection: {
    badge: "Sanctuary Concierge & Transfers",
    heading: "Planning a Multi-Sanctuary Ayurvedic Pilgrimage?",
    description:
      "Our Senior Vaidyas and private sanctuary concierge coordinate seamless inter-resort journeys — from private Dharamshala helicopter transfers to camel-backed Pushkar sunsets — with harmonized treatment dossiers.",
    ctaText: "Consult Sanctuary Desk",
    ctaUrl: "/contact",
    whatsappLabel: "WhatsApp Concierge",
    whatsappUrl: "https://wa.me/917250333494",
  },
} satisfies Required<LocationsPageContent>;
