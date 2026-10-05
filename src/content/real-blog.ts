// The five Kynta blog posts, one per blog category, in the order the team
// sent them (1 Botanical Apothecary … 5 Vaidya Case Studies). Each post starts
// from the team's own text; treatment details come from the printed spa menu
// (src/content/real-experiences.ts). Pushed to Sanity by
// `npm run seed:blog`, which replaces every existing post.
//
// Body format: one string per block. "## " starts a heading, "- " a bullet,
// "> " a quote. Links are written [text](/path).

export type RealBlogPost = {
  slug: string;
  title: string;
  /** Blog category button this post belongs to (uppercase, as on the page). */
  category: string;
  readTime: string;
  excerpt: string;
  /** Cover photo in /public (also uploaded to Sanity by the seed). */
  image: string;
  /** Alt text describing the cover photo. */
  imageAlt: string;
  seoTitle?: string;
  seoDescription: string;
  body: string[];
};

export const BLOG_AUTHOR = "Kynta Wellness";

export const realBlogPosts: RealBlogPost[] = [
  {
    slug: "luxury-spa-massage-with-mountain-views",
    title: "Luxury Spa Massage with Mountain Views",
    category: "BOTANICAL APOTHECARY",
    readTime: "4 MIN READ",
    excerpt:
      "A personalised full-body massage with warm stones, fresh botanicals and soft morning light, designed for stress relief, rejuvenation and deep peace.",
    image: "/blog/luxury-spa-massage-with-mountain-views.jpg",
    imageAlt:
      "Therapist giving a back massage at sunset in a spa room with floor-to-ceiling windows over a green mountain valley, with herbs and oils on a wooden tray",
    seoTitle:
      "Luxury Spa Massage with Mountain Views | Relaxing Body Treatment & Wellness Experience",
    seoDescription:
      "Personalised full-body massage therapies, body treatments and wellness experiences at Kynta Wellness spas, designed for stress relief, rejuvenation and deep peace.",
    body: [
      "Picture a quiet treatment room above a mountain valley. Soft golden morning light fills the room, the air carries a hint of aromatic steam, and you rest on a comfortable massage table, draped in plush white towels and blankets. Smooth stones and fresh botanical foliage sit close by. This is the calm every Kynta massage is designed around.",
      "## A Massage Shaped Around You",
      "Every treatment begins with you. Our skilled therapists tailor the pressure and technique to what your body needs that day, from long, flowing strokes that melt away stress to firm, focused work for tired muscles.",
      "## The Botanical Touch",
      "Warm oils, fresh botanicals and the gentle warmth of the room work together to help you let go. It is a holistic experience for the body and the mind, and the reason guests leave feeling rested and renewed.",
      "## Choosing Your Massage",
      "- **Swedish Massage**: medium pressure and long kneading strokes. Ideal for first-time guests and anyone seeking calm and balance.",
      "- **Deep Tissue Massage**: firm, focused pressure that targets deep layers of muscle to release chronic tension, knots and stiffness.",
      "- **Aroma Massage**: warm, natural essential oils chosen to suit your mood, with gentle, flowing strokes.",
      "- **Indian Abhyanga**: a massage based on traditional Indian techniques, with herbal essential oils to ease muscle knots and overall body fatigue.",
      "- **Ayurvedic Potli Massage**: warm herbal compresses that combine heat therapy and herbal healing.",
      "- **Kynta Signature Therapy**: massage combined with yoga stretches and acupressure movements to ease tension and energise the body.",
      "See every massage, with durations, on our [Experiences page](/experiences), or [book your treatment](/book) at the Kynta spa nearest you.",
    ],
  },
  {
    slug: "sanctuary-architecture-designed-for-deep-rest",
    title: "Sanctuary Architecture: Spaces Designed for Deep Rest",
    category: "SANCTUARY ARCHITECTURE",
    readTime: "3 MIN READ",
    excerpt:
      "Curved rammed earth, biophilic teak and filtered morning light: how the space around you shapes how deeply you can rest.",
    image: "/blog/sanctuary-architecture-designed-for-deep-rest.jpg",
    imageAlt:
      "Guest resting on a stone daybed beside a curved rammed-earth wall and reflecting pool, under a slatted wooden roof with filtered light and a garden view",
    seoDescription:
      "Sanctuary architecture designed for deep rest, where curved rammed earth, biophilic teak and filtered morning light come together at Kynta Wellness for restoration.",
    body: [
      "> Sanctuary architecture designed for deep rest, where curved rammed earth, biophilic teak and filtered morning light converge at Kynta Wellness for ultimate restoration.",
      "## Why the Space Matters",
      "Rest is not only about the treatment. The room around you, its light, its materials and its quiet, shapes how easily the body lets go. Natural textures, soft daylight and calm, uncluttered spaces help the mind slow down before the first touch.",
      "## Materials From Nature",
      "Earth, wood and greenery bring the outdoors in. Biophilic design connects interiors with nature through materials such as earthen walls and teak, living plants and views of the landscape, so a space feels grounded and peaceful.",
      "## Light That Follows the Day",
      "Filtered morning light is gentle on the eyes and the mind. Soft, indirect light keeps a treatment room warm and restful from the first moment to the last.",
      "## Designing Spas With Our Partners",
      "Kynta Wellness runs spas inside hotels and resorts in Himachal Pradesh and Rajasthan, and helps partner properties plan treatment rooms, couple's suites and a calm, private journey for every guest. Hotel owners can learn more on our [Partner page](/partner).",
    ],
  },
  {
    slug: "golden-hour-mindfulness-living-in-rhythm",
    title: "Golden Hour Mindfulness: Living in Rhythm With the Day",
    category: "CIRCADIAN SOMATICS",
    readTime: "4 MIN READ",
    excerpt:
      "A quiet seat on a wooden deck, morning sun over misty peaks and a cup of herbal tea: simple rituals for calm, presence and balance.",
    image: "/blog/golden-hour-mindfulness-living-in-rhythm.jpg",
    imageAlt:
      "Woman in off-white linen meditating on a wooden deck at sunrise, facing misty mountain ridges, with a teacup and herbs on a tray beside her",
    seoDescription:
      "Mindfulness at golden hour: simple morning rituals for calm, presence and balance, in tune with your natural daily rhythm.",
    body: [
      "On an open-air wooden deck above a mountain valley, a woman sits in quiet meditation. Dressed in loose, off-white linen, she faces the horizon as the morning sun breaks over distant, misty peaks. Beside her rest a woven mat, a long bolster, a ceramic teacup and fresh herbal sprigs. It is a picture of calm, presence and balance.",
      "## Living in Rhythm",
      "Our bodies follow a natural daily rhythm of waking, activity and rest. Slow mornings, time outdoors and gentle routines are simple ways to live in step with that rhythm, rather than against it.",
      "## A Simple Morning Ritual",
      "- Find a quiet spot facing the morning light, seated on a mat or cushion.",
      "- Sit comfortably and let your breath slow down.",
      "- Take in the view: the light, the trees, the layers of the landscape.",
      "- Sip a warm herbal tea, without your phone.",
      "- Stay for a few minutes and notice how you feel.",
      "## Bringing the Calm to the Spa",
      "The same unhurried feeling guides our Spa Sojourns. Deep Sleep is a two-hour journey of Deep Tissue Massage, Marma Head Massage and Foot to Knee Bliss, made for profound relaxation and restorative sleep. Explore it on our [Experiences page](/experiences).",
    ],
  },
  {
    slug: "the-ayurvedic-apothecary-herbs-and-oils",
    title: "The Ayurvedic Apothecary: Herbs, Oils and Healing Traditions",
    category: "AYURVEDIC SCIENCE",
    readTime: "4 MIN READ",
    excerpt:
      "Tulsi, turmeric, ginger and golden herbal oil: the plant-based traditions behind Ayurvedic care and the treatments on the Kynta menu.",
    image: "/blog/the-ayurvedic-apothecary-herbs-and-oils.jpg",
    imageAlt:
      "Therapist giving a massage in a spa room with large windows over misty Himalayan hills at sunrise, with herbal oils, mortars and a brass bowl",
    seoDescription:
      "Traditional Ayurvedic botanicals, herbal oils and plant-based healing practices, and how they shape Kynta Wellness spa treatments.",
    body: [
      "High above a mountain valley at sunrise, a rustic wooden table holds the tools of a traditional Ayurvedic apothecary: a granite mortar and pestle with freshly picked holy basil (tulsi), small wooden and brass bowls of dried herbs and turmeric, raw ginger root, a clay urn, stacked massage stones and a glass bottle of golden herbal oil.",
      "## Plant-Based Healing",
      "Ayurveda, India's traditional system of wellbeing, has long turned to plants for balance and care. Herbs, spices and warm oils sit at the heart of its practice, used to soothe the body and calm the mind.",
      "## Herbs and Oils in Kynta Treatments",
      "- **Indian Abhyanga**: time-honoured Indian techniques with herbal essential oils, to ease muscle knots and overall body fatigue.",
      "- **Ayurvedic Potli Massage**: warm herbal compresses applied in circular or tapping motions, each herb selected for its own properties.",
      "- **Marma Head Massage**: gentle pressure and warm herbal oils on 37 vital marma points of the head and upper body.",
      "- **Kansa Foot Revive Massage**: warm herbal oils and a kansa wand to relax tired feet and stimulate marma points.",
      "## Quiet Luxury, Inner Balance",
      "Morning light, earthy textures and the scent of fresh herbs: Ayurvedic care is as much about the experience as the treatment. Find these therapies on our [Experiences page](/experiences).",
    ],
  },
  {
    slug: "personalised-wellness-the-ayurvedic-approach",
    title: "Personalised Wellness: The Ayurvedic Approach",
    category: "VAIDYA CASE STUDIES",
    readTime: "3 MIN READ",
    excerpt:
      "Ayurveda sees every person as different. A look at personalised, holistic care, and how Kynta therapists tailor each treatment to you.",
    image: "/blog/personalised-wellness-the-ayurvedic-approach.jpg",
    imageAlt:
      "Woman sitting on a terrace above misty green hills at sunrise, beside a stone mortar and pestle with tulsi, turmeric, ginger and golden herbal oil",
    seoDescription:
      "Peaceful Ayurvedic wellness and meditation experience overlooking lush Himalayan mountains at sunrise, representing holistic healing, mindfulness, relaxation, personalised wellness and natural Ayurvedic care.",
    body: [
      "A woman in comfortable white clothing sits calmly on a wooden terrace, overlooking lush green hills and mist-covered mountains. Warm golden-hour light, fresh mountain air and earthy textures surround her. It is a picture of mindful self-care, rejuvenation and a balanced way of living.",
      "## Every Person Is Different",
      "In Ayurveda, no two people are alike. Each of us has our own balance of the three doshas, Vata, Pitta and Kapha, so the path to wellbeing is personal too. Traditional and holistic care looks at the whole person, not just a single symptom.",
      "## Tailored at Every Kynta Spa",
      "Our therapists tailor each treatment to your needs, from the choice of massage to the pressure and oils used. In Nourish, for example, you choose Swedish, Deep Tissue or Abhyanga massage, followed by your choice of facial.",
      "## Wellness as a Habit",
      "Lasting balance comes from regular care. The Kynta Revibe membership offers prepaid Peace, Serenity and Tranquility plans for guests who want to make the spa part of their routine. Find a Kynta spa near you on our [Locations page](/locations).",
    ],
  },
];
