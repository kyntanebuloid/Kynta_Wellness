import type { AccentColor, ContentImage } from "./types";

export type PillarIcon = "flask" | "pulse" | "building" | "hourglass";
export type PillarFooterIcon = "leaf" | "target" | "droplet" | "moon";

export interface ExperienceCategory {
  label: string;
  image?: ContentImage;
  tags?: string[];
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
}

export interface ExperiencesPageContent {
  hero?: {
    eyebrow?: string;
    headingItalic?: string;
    heading?: string;
    headingLine2?: string;
    description?: string;
    /** One button per category; clicking it shows that category's card. */
    categories?: ExperienceCategory[];
  };
  pillars?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    cards?: {
      number?: string;
      icon?: PillarIcon;
      title: string;
      description: string;
      footerLabel?: string;
      footerIcon?: PillarFooterIcon;
    }[];
  };
  treatmentsSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    linkLabel?: string;
    cards?: {
      image?: ContentImage;
      label?: string;
      duration?: string;
      title: string;
      slug?: string;
      description: string;
      sensoryNote?: string;
    }[];
  };
  protocolSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    steps?: {
      number?: string;
      title: string;
      description: string;
      duration?: string;
      color?: AccentColor;
    }[];
  };
  /** Plans and prices come from each spa (Pages → Locations). */
  membershipSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    benefits?: { title: string; description: string }[];
    note?: string;
    terms?: string[];
    ctaLabel?: string;
  };
  goodToKnowSection?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    groups?: { title: string; items: string[] }[];
  };
}

// Everything below comes from the printed Kynta spa menus (same treatments at
// every spa; prices vary by spa and live in Pages → Locations → Booking Menu).
export const experiencesPageDefaults = {
  hero: {
    eyebrow: "Spa Treatments & Rituals  ·  Rooted in Ayurveda",
    headingItalic: "Healing Treatments",
    heading: "Crafted",
    headingLine2: "for Body & Mind.",
    description:
      "Therapeutic massages, facials and spa journeys rooted in Ayurvedic wisdom, designed to balance the body, calm the mind and restore inner harmony. Offered at Kynta spas across India.",
    categories: [
      {
        label: "All Treatments",
        image: {
          url: "/exp-spa-sojourns-main.jpg",
          alt: "Kynta Wellness treatment room",
        },
        tags: ["Rooted in Ayurveda", "Skilled Therapists"],
        eyebrow: "Balance · Healing · Inner Peace · Harmony · Vitality",
        title: "Five Ways to Unwind",
        description:
          "Kynta Wellness is a luxury wellness and spa brand dedicated to holistic healing and deep relaxation. Every treatment is thoughtfully curated to promote well-being, relaxation and renewal.",
        buttonLabel: "Book a Treatment",
        buttonUrl: "/book",
      },
      {
        label: "Spa Sojourns",
        image: {
          url: "/treatment-spa-sojourns.jpg",
          alt: "Spa Sojourns treatment",
        },
        tags: ["Deep Sleep", "Nourish", "Royal Renewal"],
        eyebrow: "Spa Sojourns · 120 – 300 Min",
        title: "Spa Sojourns",
        description:
          "Immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe, these rituals leave you feeling renewed, centred and completely at ease.",
        buttonLabel: "Explore Spa Sojourns",
        buttonUrl: "/experiences/spa-sojourns",
      },
      {
        label: "Couple Spa",
        image: {
          url: "/destination-glenwood.jpg",
          alt: "Couple's treatment suite",
        },
        tags: ["Couple's Retreat", "Couple's Bliss"],
        eyebrow: "Couple Spa · 60 / 90 Min",
        title: "Couple Spa",
        description:
          "Unwind side by side with your partner in the privacy of our couple's suite, with a full-body Swedish or Deep Tissue massage designed for deep relaxation and meaningful connection.",
        buttonLabel: "Explore Couple Spa",
        buttonUrl: "/experiences/couple-spa",
      },
      {
        label: "Massage Selections",
        image: {
          url: "/treatment-massage.jpg",
          alt: "Full-body massage",
        },
        tags: ["Swedish", "Deep Tissue", "Abhyanga"],
        eyebrow: "Massage Selections · 60 / 90 Min",
        title: "Massage Selections",
        description:
          "Curated full-body massages, each designed to release tension, improve circulation and restore inner harmony. Surrender to skilled hands and experience complete mind–body renewal.",
        buttonLabel: "Explore Massages",
        buttonUrl: "/experiences/massage-selections",
      },
      {
        label: "Glamour Glow",
        image: {
          url: "/treatment-glamour-glow.jpg",
          alt: "Facial treatment",
        },
        tags: ["Body Scrubs", "Facials"],
        eyebrow: "Glamour Glow · 30 – 60 Min",
        title: "Glamour Glow",
        description:
          "Facials and body treatments that gently exfoliate, deeply nourish and revive dull skin, leaving it smooth, refreshed and glowing. Perfect before special occasions.",
        buttonLabel: "Explore Glamour Glow",
        buttonUrl: "/experiences/glamour-glow",
      },
      {
        label: "Rapid Relax",
        image: {
          url: "/triad-touch.jpg",
          alt: "Focused head and foot massage",
        },
        tags: ["Head", "Face", "Feet", "Back"],
        eyebrow: "Rapid Relax · 30 Min",
        title: "Rapid Relax",
        description:
          "Focused 30-minute therapies for the head, face, feet and back. Enjoy one on its own or add it to any treatment.",
        buttonLabel: "Explore Rapid Relax",
        buttonUrl: "/experiences/rapid-relax",
      },
    ],
  },
  pillars: {
    eyebrow: "Our Approach",
    heading: "What Makes a Kynta Treatment",
    description:
      "Balance, healing, inner peace, harmony and vitality: every treatment is designed around these five.",
    cards: [
      {
        number: "01",
        icon: "flask",
        title: "Rooted in Ayurveda",
        description:
          "Therapies based on traditional Indian techniques such as Abhyanga and herbal Potli compresses, using warm herbal and essential oils.",
        footerLabel: "Ayurvedic Wisdom",
        footerIcon: "leaf",
      },
      {
        number: "02",
        icon: "pulse",
        title: "Skilled Therapists",
        description:
          "Expert hands tailor the pressure and technique of every treatment to what your body needs that day.",
        footerLabel: "Tailored to You",
        footerIcon: "target",
      },
      {
        number: "03",
        icon: "building",
        title: "Privacy & Comfort",
        description:
          "Professional draping throughout every treatment, disposable undergarments provided, and a calm, quiet setting.",
        footerLabel: "Your Privacy First",
        footerIcon: "droplet",
      },
      {
        number: "04",
        icon: "hourglass",
        title: "Time to Unwind",
        description:
          "From 30-minute Rapid Relax therapies to a five-session Royal Renewal, choose the time that suits you.",
        footerLabel: "No Rush",
        footerIcon: "moon",
      },
    ],
  },
  treatmentsSection: {
    eyebrow: "Our Menu",
    heading: "Five treatment categories, one calm experience.",
    description:
      "Every Kynta spa offers the same menu. Prices vary by location; you see the exact price for your spa when you book.",
    linkLabel: "Explore",
    cards: [
      {
        image: { url: "/treatment-spa-sojourns.jpg", alt: "Spa Sojourns" },
        label: "Spa Sojourns",
        duration: "120 – 300 Min",
        title: "SPA SOJOURNS",
        slug: "spa-sojourns",
        description:
          "Immersive journeys that combine several treatments: Deep Sleep for restful sleep, Nourish (massage and facial) and the five-massage Royal Renewal.",
        sensoryNote: "Deep Sleep • Nourish • Royal Renewal",
      },
      {
        image: { url: "/destination-glenwood.jpg", alt: "Couple Spa" },
        label: "Couple Spa",
        duration: "60 / 90 Min",
        title: "COUPLE SPA",
        slug: "couple-spa",
        description:
          "A synchronized full-body Swedish or Deep Tissue massage for two in our private couple's suite. Room decoration on request.",
        sensoryNote: "Couple's Retreat • Couple's Bliss",
      },
      {
        image: { url: "/treatment-massage.jpg", alt: "Massage Selections" },
        label: "Massage Selections",
        duration: "60 / 90 Min",
        title: "MASSAGE SELECTIONS",
        slug: "massage-selections",
        description:
          "Swedish, Deep Tissue, Aroma, Indian Abhyanga, Ayurvedic Potli and the Kynta Signature Therapy, each tailored to release tension and restore balance.",
        sensoryNote: "Swedish • Deep Tissue • Abhyanga • Potli",
      },
      {
        image: { url: "/treatment-glamour-glow.jpg", alt: "Glamour Glow" },
        label: "Glamour Glow",
        duration: "30 – 60 Min",
        title: "GLAMOUR GLOW",
        slug: "glamour-glow",
        description:
          "Body scrubs, polishers and masques, plus Cleansing, Shine and Young & Radiant facials for smooth, refreshed and glowing skin.",
        sensoryNote: "Body Scrub • Shine Facial • Young & Radiant",
      },
      {
        image: { url: "/triad-touch.jpg", alt: "Rapid Relax" },
        label: "Rapid Relax",
        duration: "30 Min",
        title: "RAPID RELAX",
        slug: "rapid-relax",
        description:
          "Focused 30-minute therapies: Marma head massage, Kansa face and foot massages, Foot to Knee Bliss and back massage.",
        sensoryNote: "Head • Face • Feet • Back",
      },
    ],
  },
  protocolSection: {
    eyebrow: "Your Visit",
    heading: "What to Expect",
    description:
      "A few simple steps from booking your treatment to leaving refreshed.",
    steps: [
      {
        number: "01",
        title: "Book Your Treatment",
        description:
          "Book online and pay in full or a 25% advance, or call us on +91\u00A07250333494.",
        duration: "Online or by Phone",
        color: "teal",
      },
      {
        number: "02",
        title: "Arrive Early",
        description:
          "Please arrive 15 minutes before your session so you can settle in calmly.",
        duration: "15 Minutes",
        color: "teal",
      },
      {
        number: "03",
        title: "Your Treatment",
        description:
          "Your therapist tailors the treatment to you, with professional draping throughout to respect your privacy.",
        duration: "30 – 120 Minutes",
        color: "rust",
      },
      {
        number: "04",
        title: "Unwind",
        description:
          "Keep phones silent and speak softly so everyone can relax, then leave refreshed and renewed.",
        duration: "After Your Session",
        color: "teal",
      },
      {
        number: "05",
        title: "Change of Plans",
        description:
          "Let us know at least 4 working hours before your appointment if you need to cancel. Late cancellations are charged 50%.",
        duration: "4 Working Hours",
        color: "teal",
      },
    ],
  },
  // From the menus' "Kynta Revibe" page.
  membershipSection: {
    eyebrow: "Kynta Revibe Membership",
    heading: "Commit to Wellness with Kynta Revibe",
    description:
      "Kynta Revibe is the perfect way to make wellness part of your routine. A membership with Kynta offers a wide range of value-added extras in a luxurious environment, so a good spa therapy is no longer a drain on your pocket. Escape the chaos of daily life and rejuvenate in an oasis of calm.",
    benefits: [
      {
        title: "More Spa",
        description:
          "Attractive membership discounts get you more spa services.",
      },
      {
        title: "Cashless",
        description: "No hassle of paying on each visit.",
      },
      {
        title: "Sharing",
        description: "Spread wellness cheer with your friends and family.",
      },
      {
        title: "More Discounts",
        description:
          "Flat 25% off with the Tranquility membership at select Kynta locations.",
      },
    ],
    note: "The expected number of services is worked out on a 60-minute Swedish Massage and changes with the treatments you choose. Taxes extra.",
    terms: [
      "Kynta Revibe is a prepaid spa membership plan from Kynta Wellness.",
      "The membership can be redeemed only at your home centre.",
      "Pay in advance and go cashless for every booking under the membership.",
      "Memberships can be used during spa operating hours; a 24-hour prior appointment is required.",
      "Membership plans are not applicable to Spa Sojourns.",
      "Membership packages are non-refundable and can only be used with a membership card or booklet.",
    ],
    ctaLabel: "Ask About Membership",
  },
  // From the menus' "General Information" page.
  goodToKnowSection: {
    eyebrow: "General Information",
    heading: "Good to Know",
    description:
      "A few things to help every guest enjoy a calm, comfortable visit.",
    groups: [
      {
        title: "Reservation & Cancellation",
        items: [
          "Please arrive 15 minutes before your scheduled spa session.",
          "For the convenience of other guests, kindly tell us about any cancellation at least 4 working hours before your appointment.",
          "Late cancellations are charged a 50% cancellation fee.",
          "Promotional offers are not applicable on Spa Sojourns, Couple Spa and Rapid Relax.",
          "Premium oil blends are available at an additional charge. All prices are plus taxes.",
        ],
      },
      {
        title: "Spa Etiquette",
        items: [
          "Help us keep the spa serene by keeping mobile phones silent and speaking softly.",
          "Guests under the age of 16 are not permitted in the spa unless accompanied by an adult.",
          "Smoking and alcohol are not allowed in the spa area.",
          "The spa management may decline to serve guests under the influence of alcohol.",
          "Gentlemen are advised to shave at least 3 hours before a facial session.",
          "Disposable undergarments are provided for your comfort; kindly wear them during your session.",
          "Our therapists always use draping techniques during treatments to maintain your comfort and privacy.",
        ],
      },
      {
        title: "Considerations",
        items: [
          "Membership packages are non-refundable and can only be used with a membership card or booklet.",
          "Pregnant guests and guests with any medical condition should consult their doctor before booking and tell the spa therapist about the condition.",
          "Our spa treatments are professional in nature. Any illicit or sexually suggestive behaviour, remarks or advances will end the session immediately and may result in legal action; the full charge for the service still applies.",
          "Spa treatments serve general well-being and are not a substitute for professional medical treatment. Kynta Wellness, its employees and representatives are not liable for any incident experienced during or after a spa service.",
        ],
      },
    ],
  },
} satisfies Required<ExperiencesPageContent>;
