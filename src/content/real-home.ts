// Real text for the home page: only the six partner hotels, the printed spa
// menu (categories, treatments, general information) and the website's own
// booking features. Used as the components' built-in defaults and pushed to
// Sanity text-only by `npm run apply:real-text`. Photos are not touched.
// Reviews (guestPathSection.testimonials) are left as entered in Sanity.

import { realBlogPosts } from "./real-blog";

export const realHomeText = {
  hero: {
    eyebrow: "Indian Spa & Wellness",
    headline: "Wellness,",
    headlineItalic: "Made with Care.",
    subtitle:
      "Ayurveda-rooted massages, facials and spa journeys at six hotels and resorts in Himachal Pradesh and Rajasthan.",
    primaryCta: { label: "See Our Treatments" },
    secondaryCta: { label: "Partner With Kynta" },
  },
  // Same order as the photos already in Sanity (index by index).
  servicesSection: {
    eyebrow: "OUR SERVICES",
    heading: "What We Offer",
    services: [
      {
        name: "Massage Selections",
        description:
          "Full-body massages, from Swedish and Deep Tissue to Indian Abhyanga and Ayurvedic Potli, to release tension and restore harmony.",
        buttonLabel: "Book Now",
      },
      {
        name: "Glamour Glow",
        description:
          "Facials and body treatments that exfoliate, nourish and revive dull skin, leaving it smooth and glowing.",
        buttonLabel: "Book Now",
      },
      {
        name: "Rapid Relax",
        description:
          "Focused 30-minute therapies for the head, face, feet and back. Enjoy one on its own or add it to any treatment.",
        buttonLabel: "Book Now",
      },
      {
        name: "Couple Spa",
        description:
          "Unwind side by side with your partner in our private couple's suite, with a full-body massage for two.",
        buttonLabel: "Book Now",
      },
      {
        name: "Spa Sojourns",
        description:
          "Two-hour and multi-session spa journeys, Deep Sleep, Nourish and Royal Renewal, that renew you from head to toe.",
        buttonLabel: "Book Now",
      },
    ],
  },
  destinationsSection: {
    eyebrow: "Our Spa Locations",
    heading: "Our spas across India.",
    description:
      "Six Kynta spas at hotels and resorts in Dharamshala, Dalhousie and Palampur in Himachal Pradesh, and Pushkar in Rajasthan.",
  },
  guestPathSection: {
    eyebrow: "Your Visit in 5 Steps",
    heading: "A calm visit, from start to finish.",
    description:
      "From booking to your treatment and beyond, here is what to expect at every Kynta spa.",
    steps: [
      {
        number: "01",
        title: "BOOK",
        description:
          "Choose your spa, treatment and time online, and pay in full or a 25% advance. You can also call or WhatsApp us.",
        icon: "clipboard",
      },
      {
        number: "02",
        title: "ARRIVE EARLY",
        description:
          "Please arrive 15 minutes before your session, so you can settle in without rushing.",
        icon: "footbath",
      },
      {
        number: "03",
        title: "YOUR TREATMENT",
        description:
          "Skilled therapists tailor every treatment to you, with professional draping throughout for your comfort and privacy.",
        icon: "hands",
      },
      {
        number: "04",
        title: "UNWIND",
        description:
          "Phones stay silent and voices soft, so the spa stays calm for every guest.",
        icon: "cup",
      },
      {
        number: "05",
        title: "COME BACK",
        description:
          "Make wellness a habit with a Kynta Revibe membership: prepaid Peace, Serenity and Tranquility plans.",
        icon: "infinity",
      },
    ],
    stats: [
      { value: "6", label: "Spas" },
      { value: "4", label: "Cities" },
      { value: "22", label: "Treatments" },
      { value: "5", label: "Treatment Categories" },
      { value: "3", label: "Membership Plans", highlight: true },
    ],
    trustedByHeading: "Kynta Spas at These Hotels & Resorts",
  },
  reservationSection: {
    eyebrow: "Book Your Spa Visit",
    heading: "Book a Treatment",
    description:
      "Choose your spa, treatment and time. Pay in full or a 25% advance online, with GST shown before you pay.",
    formHeading: "Your Booking Details",
    infoCards: [
      {
        icon: "clock",
        title: "Arrive 15 Minutes Early",
        description:
          "Changes or cancellations need at least 4 working hours' notice; late cancellations are charged 50%.",
      },
      {
        icon: "shield",
        title: "Your Comfort & Privacy",
        description:
          "Disposable undergarments are provided, and our therapists use professional draping throughout every treatment.",
      },
    ],
    whatsapp: {
      title: "Talk to Us",
      subtitle: "Call or WhatsApp, 10:00 – 20:00",
      buttonLabel: "WhatsApp",
    },
  },
  journalSection: {
    eyebrow: "Kynta Blog",
    heading: "Notes on Ayurveda, massage and restful living.",
    allArticlesLink: { label: "Read All Articles" },
    // Only shown while there are no blog posts in Sanity.
    articles: realBlogPosts.slice(0, 3).map((post) => ({
      category: post.category,
      title: post.title,
      excerpt: post.excerpt,
      readTime: post.readTime,
      topic: "",
    })),
  },
};
