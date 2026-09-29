import { config } from "dotenv";
import { createClient } from "@sanity/client";

config({ path: ".env.local" });
config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });

const keyed = <T extends object>(type: string, items: T[]) =>
  items.map((item, i) => ({ _key: `${type}-${i}`, _type: type, ...item }));

// Only these text fields are changed; images, slugs, locations, etc. are left untouched.
const homepage = {
  "hero.subtitle":
    "Relaxing Ayurvedic spa treatments inside the best hotels, palaces and nature resorts in India.",
  "hero.ctaText": "See Our Treatments",

  "guestPathSection.eyebrow": "Your Visit in 5 Steps",
  "guestPathSection.heading": "A calm visit, from start to finish.",
  "guestPathSection.description": "Every visit follows 5 simple steps to help you fully relax.",
  "guestPathSection.steps": keyed("step", [
    { number: "01", title: "ARRIVE & RELAX", description: "We wash your feet in warm flower water and give you a cool herbal drink." },
    { number: "02", title: "CHECK-UP", description: "We talk with you about your body, your stress, where it hurts, and the smells you like." },
    { number: "03", title: "MASSAGE", description: "Natural oils, warmed just right, used by gentle and skilled hands." },
    { number: "04", title: "REST", description: "Rest in a quiet room with hot Kashmiri tea and dry fruits." },
    { number: "05", title: "CARE AT HOME", description: "We give you simple tips, breathing exercises, and oils to use at home." },
  ]),
  "guestPathSection.stats": keyed("stat", [
    { value: "18+", label: "Spas" },
    { value: "9", label: "Cities in India" },
    { value: "140+", label: "Trained Therapists" },
    { value: "85k+", label: "Treatments Given" },
    { value: "98.4%", label: "Happy Guests" },
  ]),

  "partnershipSection.eyebrow": "For Hotel Owners",
  "partnershipSection.heading": "We run your hotel spa for you.",
  "partnershipSection.description": "We take care of your whole hotel spa, from start to finish.",
  "partnershipSection.services": keyed("homepageServiceItem", [
    { icon: "spatial", title: "Spa Design & Planning", description: "We help you plan the spa rooms, water areas, quiet spaces and the full layout." },
    { icon: "management", title: "We Run Your Spa Daily", description: "We do everything: bookings, guest service, supplies, towels and safety checks." },
    { icon: "sourcing", title: "Trained Therapists", description: "We hire and train the therapists. We pay them and take care of all their paperwork." },
    { icon: "formulation", title: "Our Own Herbal Products", description: "Pure herbal oils and products, even with your hotel's name on them, in eco-friendly glass bottles." },
    { icon: "revpash", title: "More Spa Income", description: "Smart booking keeps your spa rooms busy at all hours, so your hotel earns more money." },
    { icon: "brand", title: "Better Hotel Reviews", description: "A great spa makes your hotel look better. Our partner hotels get higher ratings on sites like TripAdvisor." },
  ]),

  "journalSection.eyebrow": "Kynta Blog",
  "journalSection.heading": "Read about herbs, spa design and hotel business.",
  "journalSection.description": "Tips and stories from our therapists and hotel partners.",
  "journalSection.articles": keyed("article", [
    { author: "Dr. Harish Namboodiri", readTime: "6 Min Read", category: "Health", title: "How Warm Herbal Bags Help You Recover From Stress", excerpt: "Warm bags filled with herbs relax deep muscles and help lower stress in your body." },
    { author: "Devendra Sengupta", readTime: "8 Min Read", category: "Spa Design", title: "How to Build a Calm Spa With Nature and Ayurveda", excerpt: "How stone, quiet rooms and natural light help your body relax on its own." },
    { author: "Ananya Varma", readTime: "5 Min Read", category: "Hotel Business", title: "How a Good Spa Helps a Hotel Earn More", excerpt: "Why smart hotel owners turn empty spa space into busy spas that bring in more money." },
  ]),

  "reservationSection.eyebrow": "Book Your Spa Visit",
  "reservationSection.heading": "Book a Treatment",
  "reservationSection.description":
    "Book one short session or a stay of many days. Our team will plan every detail for you.",
  "reservationSection.infoCards": keyed("infoCard", [
    { icon: "clock", title: "No Rush, No Crowds", description: "We take only a few bookings each day, so the spa always stays quiet and calm." },
    { icon: "shield", title: "Your Privacy Matters", description: "Tell us about food needs, private travel or a private room. We keep it all private." },
  ]),
};

const siteSettings = {
  "topBar.partnerText": "Trusted Spa Partner for 5-Star Hotels",
  'navigation[url=="/for-hospitality"].label': "FOR HOTELS",
  "footer.brandDescription":
    "Old Indian healing in calm, modern spas. Made for top hotels and for anyone who wants to relax and feel better.",
  "footer.newsletterHeading": "Our Newsletter",
  "footer.newsletterDescription": "Get news about our spas, special offers and health tips.",
  "footer.newsletterButtonLabel": "Subscribe",
};

client
  .transaction()
  .patch("homepage", (p) => p.set(homepage))
  .patch("siteSettings", (p) => p.set(siteSettings))
  .commit()
  .then(() => console.log("Homepage and site settings text updated."))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
