// The five real Kynta treatment categories, taken from the printed spa menus
// (typos and the stray "Nirwana" brand fixed). Used to seed Sanity
// (npm run seed:experiences) and as the built-in fallback when Sanity is
// unreachable. Treatment names must match the spa menus exactly so the
// experience pages can show "from" prices.

export interface RealTreatment {
  name: string;
  duration: string;
  description: string;
  inclusions?: string[];
}

export interface RealExperience {
  slug: string;
  title: string;
  eyebrow: string;
  category: string;
  duration: string;
  description: string;
  highlights: string[];
  footerNote: string;
  /** Lowest price across the spa menus, for cards ("From ₹…"). */
  fromPrice: number;
  gallery: {
    main: { tag: string; title: string; badge: string };
    topRight: { tag: string; title: string };
    bottomRight: { tag: string; title: string };
  };
  treatments: RealTreatment[];
}

const OILS_NOTE = "Premium oil blends are available at an additional charge.";

export const realExperiences: RealExperience[] = [
  {
    slug: "spa-sojourns",
    title: "Spa Sojourns",
    eyebrow: "SPA SOJOURNS · 120 – 300 MIN",
    category: "Spa Sojourns",
    duration: "120 – 300 Min",
    description:
      "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe, these rituals leave you feeling renewed, centred and completely at ease.",
    highlights: ["DEEP SLEEP", "NOURISH", "ROYAL RENEWAL"],
    footerNote: `Promotional offers are not applicable on Spa Sojourns packages. ${OILS_NOTE}`,
    fromPrice: 3000,
    gallery: {
      main: { tag: "SPA SOJOURN", title: "Deep Sleep", badge: "120 MIN" },
      topRight: { tag: "MASSAGE & FACIAL", title: "Nourish" },
      bottomRight: { tag: "FIVE MASSAGES IN A WEEK", title: "Royal Renewal" },
    },
    treatments: [
      {
        name: "Deep Sleep",
        duration: "120 min",
        description:
          "A spa journey for profound relaxation and restorative sleep. Expert hands use time-honoured techniques to release deep-seated tension and balance the body from head to toe, while calming aroma oils slow the mind into a meditative state, readying you for a night of deep, revitalising sleep.",
        inclusions: [
          "Deep Tissue Massage (60 minutes)",
          "Marma Head Massage (30 minutes)",
          "Foot to Knee Bliss (30 minutes)",
        ],
      },
      {
        name: "Nourish",
        duration: "120 min",
        description:
          "A two-hour experience to rejuvenate body and mind. Begin with your choice of Swedish, Deep Tissue or Abhyanga massage, tailored to your needs, then finish with a revitalising facial that cleanses, nourishes and reveals bright, smooth skin.",
        inclusions: [
          "Choice of Swedish, Deep Tissue or Abhyanga Massage (60 minutes)",
          "Choice of Facial (60 minutes)",
        ],
      },
      {
        name: "Royal Renewal",
        duration: "5 sessions in a week",
        description:
          "A five-massage journey crafted to relax, restore and revive your entire being. Each session blends Ayurvedic healing with deep therapeutic relaxation, perfect for those seeking deep rejuvenation and lasting wellness.",
        inclusions: [
          "Choice of Swedish, Deep Tissue or Abhyanga Massage (60 minutes)",
          "Five massages in a week",
        ],
      },
    ],
  },
  {
    slug: "couple-spa",
    title: "Couple Spa",
    eyebrow: "COUPLE SPA · 60 / 90 MIN",
    category: "Couple Spa",
    duration: "60 / 90 Min",
    description:
      "Unwind side by side with your partner in the privacy of our couple's therapy suite. Choose a full-body Swedish or Deep Tissue massage designed for deep relaxation and meaningful connection.",
    highlights: ["SIDE BY SIDE", "PRIVATE SUITE", "ROOM DECORATION ON REQUEST"],
    footerNote: `Prices are per person. Room decoration only on prior request and availability. ${OILS_NOTE}`,
    fromPrice: 3150,
    gallery: {
      main: { tag: "COUPLE SPA", title: "Couple's Retreat", badge: "90 MIN" },
      topRight: { tag: "COUPLE SPA", title: "Couple's Bliss" },
      bottomRight: {
        tag: "PRIVATE SUITE",
        title: "Room Decoration on Request",
      },
    },
    treatments: [
      {
        name: "Couple's Retreat",
        duration: "90 min · price per person",
        description:
          "Pampering for two in our serene couple's suite. Unwind side by side with a Swedish, Deep Tissue or Abhyanga massage, then share a refreshing fruit bowl and detox juice together.",
        inclusions: [
          "Choice of full-body Swedish or Deep Tissue Massage (90 minutes)",
          "Room decoration, on prior request and availability",
        ],
      },
      {
        name: "Couple's Bliss",
        duration: "60 min · price per person",
        description:
          "A synchronised full-body massage for two in a private, tranquil setting. This 60-minute journey leaves both partners relaxed, refreshed and beautifully reconnected.",
        inclusions: [
          "Choice of full-body Swedish or Deep Tissue Massage (60 minutes)",
          "Room decoration, on prior request and availability",
        ],
      },
    ],
  },
  {
    slug: "massage-selections",
    title: "Massage Selections",
    eyebrow: "MASSAGE SELECTIONS · 60 / 90 MIN",
    category: "Massage Selections",
    duration: "60 / 90 Min",
    description:
      "Step into a world of deep relaxation with our curated full-body massages. Each therapy is designed to release tension, improve circulation and restore inner harmony. Surrender to skilled hands and experience complete mind–body renewal.",
    highlights: ["SWEDISH", "DEEP TISSUE", "ABHYANGA", "POTLI"],
    footerNote: OILS_NOTE,
    fromPrice: 2100,
    gallery: {
      main: {
        tag: "AYURVEDIC",
        title: "Indian Abhyanga",
        badge: "60 / 90 MIN",
      },
      topRight: { tag: "HEAT & HERBS", title: "Ayurvedic Potli Massage" },
      bottomRight: { tag: "FIRM PRESSURE", title: "Deep Tissue Massage" },
    },
    treatments: [
      {
        name: "Swedish Massage",
        duration: "60 / 90 min",
        description:
          "A medium-pressure full-body massage with traditional long strokes that relax the muscles and boost circulation. Ideal for first-time guests and anyone seeking calm and balance after a long day.",
      },
      {
        name: "Deep Tissue Massage",
        duration: "60 / 90 min",
        description:
          "A therapeutic massage that targets deep layers of muscle and connective tissue. Firm, focused pressure releases chronic tension, knots and stiffness, helping relieve pain and improve mobility.",
      },
      {
        name: "Aroma Massage",
        duration: "60 / 90 min",
        description:
          "A deeply relaxing massage with warm, natural essential oils chosen for your mood. Gentle, flowing strokes ease tension, calm the nervous system and restore emotional balance.",
      },
      {
        name: "Indian Abhyanga",
        duration: "60 / 90 min",
        description:
          "A massage based on traditional Indian techniques that eases muscle knots and overall body fatigue. Time-honoured healing with herbal oils brings tranquillity to mind and body.",
      },
      {
        name: "Ayurvedic Potli Massage",
        duration: "60 / 90 min",
        description:
          "Warm herbal compresses, applied in circular or tapping motions, combine heat therapy with herbal healing to reach deep into the body. Each herb is chosen for its healing properties.",
      },
      {
        name: "Kynta Signature Therapy",
        duration: "90 min",
        description:
          "Massage combined with yoga stretches. Dry and oil-based techniques with acupressure and stretching ease muscle tension, energise the body and balance its energy.",
      },
    ],
  },
  {
    slug: "glamour-glow",
    title: "Glamour Glow",
    eyebrow: "GLAMOUR GLOW · 30 – 60 MIN",
    category: "Glamour Glow",
    duration: "30 – 60 Min",
    description:
      "Facials and body treatments that gently exfoliate, deeply nourish and revive dull skin. They remove impurities, enhance your natural radiance and leave your skin smooth, refreshed and glowing. Perfect before special occasions.",
    highlights: ["BODY SCRUBS", "FACIALS", "NATURAL GLOW"],
    footerNote:
      "Gentlemen are advised to shave at least 3 hours before a facial.",
    fromPrice: 1250,
    gallery: {
      main: { tag: "FACIAL", title: "Shine Facial", badge: "60 MIN" },
      topRight: { tag: "BODY", title: "Renew & Glow Body Scrub" },
      bottomRight: { tag: "BODY", title: "Soothe & Revive Body Masque" },
    },
    treatments: [
      {
        name: "Renew & Glow Body Scrub",
        duration: "45 min",
        description:
          "A brightening body scrub enriched with Kojic Acid, Alpha Arbutin and Vitamin C to target pigmentation, even skin tone and boost radiance.",
      },
      {
        name: "Renew & Glow Body Polisher",
        duration: "45 min",
        description:
          "A full-body exfoliation that removes dead skin cells and improves circulation, leaving your skin soft, smooth and polished from head to toe.",
      },
      {
        name: "Soothe & Revive Body Masque",
        duration: "45 min",
        description:
          "Inspired by Indian beauty rituals: turmeric, Multani Mitti and rose water detoxify and nourish the skin, with a soothing foot or head massage while it works.",
      },
      {
        name: "Cleansing Facial",
        duration: "30 min · all skin types",
        description:
          "A facial that deeply purifies the skin, removing dirt, oil and impurities to unclog pores and leave it refreshed.",
      },
      {
        name: "Shine Facial",
        duration: "60 min · all skin types",
        description:
          "A soothing cleanse, gentle exfoliation and a brightening white mud pack, with a circulation-boosting massage and sun-protective moisturiser for radiant, even-toned skin.",
      },
      {
        name: "Young & Radiant Facial",
        duration: "60 min · normal to dry skin",
        description:
          "Gentle cleansing, kiwi scrub exfoliation, a detoxifying mud pack, massage and SPF protection to nourish, hydrate and restore your skin's natural glow.",
      },
    ],
  },
  {
    slug: "rapid-relax",
    title: "Rapid Relax",
    eyebrow: "RAPID RELAX · 30 MIN",
    category: "Rapid Relax",
    duration: "30 Min",
    description:
      "Focused 30-minute therapies for specific areas of the body. Enjoy one on its own, or add it to any treatment for deeper relaxation.",
    highlights: ["HEAD", "FACE", "FEET", "BACK"],
    footerNote: `Promotional offers are not applicable on Rapid Relax. ${OILS_NOTE}`,
    fromPrice: 1100,
    gallery: {
      main: {
        tag: "MARMA POINTS",
        title: "Marma Head Massage",
        badge: "30 MIN",
      },
      topRight: { tag: "KANSA WAND", title: "Kansa Glow Face Massage" },
      bottomRight: { tag: "REFLEXOLOGY", title: "Foot to Knee Bliss" },
    },
    treatments: [
      {
        name: "Marma Head Massage",
        duration: "30 min",
        description:
          "Gentle pressure, circular strokes and warm herbal oils activate 37 vital marma points in the head and upper body to release deeply held stress.",
      },
      {
        name: "Kansa Glow Face Massage",
        duration: "30 min",
        description:
          "A facial massage with a kansa wand that draws out heat, improves circulation and promotes a natural glow while relaxing the facial muscles.",
      },
      {
        name: "Foot to Knee Bliss",
        duration: "30 min",
        description:
          "Reflexology-based massage from foot to knee that relieves fatigue, boosts circulation and refreshes tired feet.",
      },
      {
        name: "Kansa Foot Revive Massage",
        duration: "30 min",
        description:
          "A soothing foot massage with warm herbal oils and a kansa wand that relaxes tired muscles and stimulates the marma points of the feet.",
      },
      {
        name: "Back Massage",
        duration: "30 min",
        description:
          "Therapeutic strokes with aromatic oils ease stiffness from the upper to the lower back, relieving tension and calming the nervous system.",
      },
    ],
  },
];
