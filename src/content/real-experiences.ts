// The five real Kynta treatment categories, taken word for word from the
// printed spa menus (typos and the stray "Nirwana" brand fixed). Used to seed
// Sanity (npm run seed:experiences) and as the built-in fallback when Sanity
// is unreachable. Treatment names must match the spa menus exactly so the
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

const OILS_NOTE = "Add our premium oil blends at an additional charge.";
const TAXES_NOTE = "Taxes extra.";

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
    footerNote: `Promotional offers are not applicable on Spa Sojourns packages. ${OILS_NOTE} ${TAXES_NOTE}`,
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
          "Indulge in Kynta's Deep Sleep Experience, an unparalleled spa journey for profound relaxation and restorative sleep. Surrender to the sublime, as expert hands employ time-honoured techniques to alleviate deep-seated tension, remove toxins, and balance the energies coursing through your body. From the crown of your head to the soles of your feet, every muscle will sigh in relief, every thought will float away, and you will be enveloped in a tranquil cocoon that readies you for a night of deep, revitalising sleep. Emerge from this spa experience not just rested, but profoundly restored. The calming aroma oils further soothe your senses, slowing your mind into a meditative state. Gentle, rhythmic strokes lull you into serenity, making it the perfect escape for those seeking mental clarity and emotional balance.",
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
          "Kynta's Nourish is a two-hour spa experience designed to rejuvenate your body and mind. Begin with your choice of massage: Swedish, Deep Tissue, or Abhyanga. Whether it's long kneading strokes to melt away stress, deep pressure to relieve muscle fatigue, or rhythmic movements with warm herbal oil for holistic balance, our skilled healer tailors the therapy to your needs. Complete your journey with a revitalising spa facial, designed to cleanse, nourish, and reveal bright, smooth skin. The calming ambiance and aromatic oils enhance relaxation, allowing you to disconnect completely from daily stress. You'll leave feeling refreshed, glowing, and deeply restored from within.",
        inclusions: [
          "Choice of Swedish, Deep Tissue or Abhyanga Massage (60 minutes)",
          "Choice of Facial (60 minutes)",
        ],
      },
      {
        name: "Royal Renewal",
        duration: "300 min · five massages in a week",
        description:
          "Experience Kynta's Royal Renewal, a five-massage luxury journey crafted to relax, restore, and revive your entire being. Perfect for those seeking deep rejuvenation and lasting wellness. Each session blends Ayurvedic healing with deep therapeutic relaxation for complete balance. Let this royal experience elevate your energy, enhance your glow, and renew you from within.",
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
      "Unwind side by side with your partner in the privacy of our serene couple's therapy suite, with a full-body massage designed for deep relaxation and meaningful connection.",
    highlights: ["SIDE BY SIDE", "PRIVATE SUITE", "ROOM DECORATION ON REQUEST"],
    footerNote: `Promotional offers are not applicable on Couple Spa packages. Room decoration only on prior request and availability. ${OILS_NOTE} ${TAXES_NOTE}`,
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
        duration: "90 min",
        description:
          "Experience the finest in pampering and indulgence with the Couple's Retreat. In the privacy of our serene couple's therapy suite, unwind side by side with your partner as you choose from a Swedish, Deep Tissue, or Abhyanga massage. Let stress melt away, then savour a refreshing fruit bowl and detox juice together. Celebrate your journey of love: rejuvenated, reconnected, and renewed. Feel the harmony deepen as healing strokes awaken your senses and restore inner balance. This intimate spa escape is designed to strengthen your bond, creating cherished memories of togetherness and bliss.",
        inclusions: [
          "Choice of full-body Swedish or Deep Tissue Massage (90 minutes)",
          "Room decoration, only on prior request and availability",
        ],
      },
      {
        name: "Couple's Bliss",
        duration: "60 min",
        description:
          "Share a serene escape with our Couple's Bliss experience, designed for deep relaxation and meaningful connection. Enjoy a synchronised full-body massage in a private, tranquil setting as expert therapists ease tension and restore harmony. This 60-minute journey leaves both partners relaxed, refreshed, and beautifully reconnected.",
        inclusions: [
          "Choice of full-body Swedish or Deep Tissue Massage (60 minutes)",
          "Room decoration, only on prior request and availability",
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
      "Step into a world of deep relaxation with our curated Full Body Massage selections. Each therapy is thoughtfully designed to release tension, improve circulation, and restore inner harmony. Surrender to skilled hands and experience complete mind–body renewal.",
    highlights: ["SWEDISH", "DEEP TISSUE", "ABHYANGA", "POTLI"],
    footerNote: `${OILS_NOTE} ${TAXES_NOTE}`,
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
          "A medium-pressure full-body massage that targets superficial muscles to provide muscle relaxation and increased blood circulation. From strained muscles to tensed minds, the therapist uses traditional long kneading strokes to relieve you after a long day of work and stress. Ideal for first-time guests and those seeking calm, balance, and overall well-being.",
      },
      {
        name: "Deep Tissue Massage",
        duration: "60 / 90 min",
        description:
          "Press the restart switch as you feel all your pain and tension dissipate. Deep Tissue Massage is customisable to your needs: a therapeutic massage designed to target deep layers of muscles and connective tissue. Firm, focused pressure helps release chronic tension, muscle knots, and stiffness. Ideal for relieving pain, improving mobility, and correcting muscle imbalances. This treatment supports faster recovery and long-lasting relief. Best suited for those who prefer intense, result-driven therapy.",
      },
      {
        name: "Aroma Massage",
        duration: "60 / 90 min",
        description:
          "Indulge in a deeply relaxing aromatherapy massage using warm, natural essential oils chosen to suit your mood and needs. Gentle, flowing strokes ease muscle tension, calm the nervous system, improve circulation, and restore emotional balance, leaving you relaxed, refreshed, and renewed.",
      },
      {
        name: "Indian Abhyanga",
        duration: "60 / 90 min",
        description:
          "Rise above the Doshas with Ayurveda. A massage based on the principles of traditional Indian techniques, Abhyanga Massage Therapy helps reduce the knots in the muscles and treats overall body fatigue. An amalgamation of time-honoured healing art with herbal essential oils brings tranquillity to your mind and body.",
      },
      {
        name: "Ayurvedic Potli Massage",
        duration: "60 / 90 min",
        description:
          "The combination of heat therapy and herbal healing creates a synergistic effect that penetrates deep into the body. A therapist applies the herbal compresses in circular or tapping motions, targeting areas that require healing. Each herb is selected for its unique properties, ensuring a personalised and effective treatment.",
      },
      {
        name: "Kynta Signature Therapy",
        duration: "90 min",
        description:
          "The Kynta Signature Therapy incorporates massage with yoga stretches. This holistic wellness experience involves dry and oil-based massage, which eases muscle tension and energises the body with acupressure movements and stretching. The deep pressure applied works effectively on muscles and balances the body's energy levels.",
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
      "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin. Enriched with skin-loving ingredients, this treatment removes impurities, enhances natural radiance, and leaves your skin smooth, refreshed, and beautifully glowing. Perfect before special occasions or whenever your skin needs a luminous boost.",
    highlights: ["BODY SCRUBS", "FACIALS", "NATURAL GLOW"],
    footerNote: `Gentlemen are advised to shave at least 3 hours before a facial session. ${TAXES_NOTE}`,
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
          "Amidst modern chaos, indulge in the Renew & Glow Body Scrub to reclaim your skin's natural glow. Enriched with Kojic Acid, Alpha Arbutin, and Vitamin C, it targets pigmentation, evens tone, and boosts radiance. Gently massaged by our healers, this ritual leaves your skin refreshed, brightened, and visibly glowing.",
      },
      {
        name: "Renew & Glow Body Polisher",
        duration: "45 min",
        description:
          "A revitalising full-body exfoliation treatment designed to remove dead skin cells and reveal smoother, brighter skin. Using nourishing scrubs and gentle massage techniques, this therapy improves circulation, enhances skin texture, and promotes a healthy glow. Your skin is left soft, refreshed, and beautifully polished from head to toe.",
      },
      {
        name: "Soothe & Revive Body Masque",
        duration: "45 min",
        description:
          "Inspired by ancient Indian beauty rituals, the Soothe & Revive Body Masque blends turmeric, Multani Mitti, and rose water to detoxify and nourish your skin. A soothing foot or head massage enhances relaxation and allows the ingredients to work wonders. Once gently rinsed, your skin feels toned, radiant, and deeply revitalised.",
      },
      {
        name: "Cleansing Facial",
        duration: "30 min · recommended for all skin types",
        description:
          "A cleansing facial is a skincare treatment that deeply purifies the skin by removing dirt, oil, and impurities. It helps to unclog pores, prevent breakouts, and leave the skin feeling refreshed and rejuvenated.",
      },
      {
        name: "Shine Facial",
        duration: "60 min · recommended for all skin types",
        description:
          "Unveil your natural glow with our Shine Facial, starting with a soothing cleanser, gentle exfoliation, and a brightening white mud pack. A revitalising massage boosts circulation, finishing with a sun-protective moisturiser for radiant, even-toned, and refreshed skin.",
      },
      {
        name: "Young & Radiant Facial",
        duration: "60 min · recommended for normal to dry skin",
        description:
          "Revitalise your skin with our Young & Radiant Facial, featuring gentle cleansing, kiwi scrub exfoliation, a detoxifying mud pack, a circulation-boosting massage, and SPF protection. This treatment nourishes, hydrates, and restores your skin's natural glow for a refreshed, even-toned look.",
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
      "Enhance your spa experience with our exclusive add-on therapies, designed to complement and elevate your overall relaxation. Choose from focused treatments for specific body areas or indulge in specialised techniques for ultimate revitalisation. These add-ons seamlessly integrate into your chosen spa service. You can also add a product or service to further maximise your rejuvenation at Kynta Wellness.",
    highlights: ["HEAD", "FACE", "FEET", "BACK"],
    footerNote: `Promotional offers are not applicable on Rapid Relax. ${OILS_NOTE} ${TAXES_NOTE}`,
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
          "A therapeutic head massage that uses gentle pressure, circular strokes, and warm herbal oils to activate 37 vital marma points in the head and upper body. It harmonises the nervous system and helps release deeply held stress.",
      },
      {
        name: "Kansa Glow Face Massage",
        duration: "30 min",
        description:
          "A gentle yet therapeutic facial massage performed using a kansa wand. The wand's metal helps draw out heat and acidity from the skin, improves circulation, and promotes a natural glow. It works on marma points to relax facial muscles and restore balance.",
      },
      {
        name: "Foot to Knee Bliss",
        duration: "30 min",
        description:
          "Drawing from the age-old art of reflexology, Foot to Knee Bliss targets over 7,000 nerve endings to relieve fatigue and boost circulation. Our expert therapists use precise pressure and soothing oils on key foot points, reducing fluid build-up and refreshing tired feet, leaving you relaxed, balanced, and re-energised.",
      },
      {
        name: "Kansa Foot Revive Massage",
        duration: "30 min",
        description:
          "A soothing foot massage performed with warm herbal oils and a kansa wand. The metal helps balance the body's pH, relax tired muscles, and stimulate vital marma points on the feet related to the whole body.",
      },
      {
        name: "Back Massage",
        duration: "30 min",
        description:
          "Back Massage combines therapeutic strokes with aromatic oils to ease stiffness and discomfort from the upper to the lower back. Designed to relieve muscle tension and calm the nervous system, this focused therapy leaves you feeling relaxed, refreshed, and recharged, ready to step back into your day with renewed ease and comfort.",
      },
    ],
  },
];
