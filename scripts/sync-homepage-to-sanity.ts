// Rewrites the Sanity "homepage" and "siteSettings" documents so they match
// the current schema and the homepage as designed in code:
//   - every section gets the simplified homepage copy and photos
//     (local photos are uploaded as Sanity images),
//   - fields the page no longer uses are removed,
//   - SEO text and the site name already in Sanity are kept.
// With --keep-current-text, text already in Sanity is kept wherever the page
// was showing it, and only missing fields are filled in.
// A JSON backup of both documents is written before anything changes.
//
// Dry run (no token needed, writes the planned documents to sanity/backups/):
//   npx tsx scripts/sync-homepage-to-sanity.ts --dry-run
// Apply (needs an Editor token from sanity.io/manage → API → Tokens):
//   SANITY_API_WRITE_TOKEN=xxx npx tsx scripts/sync-homepage-to-sanity.ts

import { createReadStream, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });
config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run");
const keepCurrentText = process.argv.includes("--keep-current-text");

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}
if (!dryRun && !token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage → API → Tokens, or run with --dry-run.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

type Doc = Record<string, any>;
type ImageValue = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  alt?: string;
};

let keyCounter = 0;
const key = (prefix: string) => `${prefix}-${(keyCounter++).toString(36)}`;
const keyed = <T extends object>(type: string, items: T[]) =>
  items.map((item) => ({ _key: key(type), _type: type, ...item }));
const link = (label: string, url: string) => ({ label, url });
const pick = <T>(value: T | undefined | null, fallback: T): T =>
  value === undefined || value === null || value === "" ? fallback : value;
const pickList = <T>(value: T[] | undefined | null, fallback: T[]): T[] =>
  Array.isArray(value) && value.length > 0 ? value : fallback;

// Local /public images are uploaded once per run and reused.
const uploaded = new Map<string, string>();
async function image(publicPath: string, alt: string): Promise<ImageValue> {
  if (dryRun) {
    return {
      _type: "image",
      asset: { _type: "reference", _ref: `(would upload ${publicPath})` },
      alt,
    };
  }
  let assetId = uploaded.get(publicPath);
  if (!assetId) {
    const file = path.join(process.cwd(), "public", publicPath);
    const asset = await client.assets.upload("image", createReadStream(file), {
      filename: path.basename(file),
    });
    assetId = asset._id;
    uploaded.set(publicPath, assetId);
    console.log(`  ↑ uploaded ${publicPath}`);
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetId }, alt };
}

async function buildHomepage(current: Doc): Promise<Doc> {
  const hero = current.hero ?? {};
  const guest = current.guestPathSection ?? {};
  const partner = current.partnershipSection ?? {};
  const journal = current.journalSection ?? {};
  const booking = current.reservationSection ?? {};

  const serviceCards = [
    ["Massages", "Healing massages that relax your body and take away pain.", "/treatment-massage.jpg"],
    ["Beauty Care", "Face and skin care made with natural plants and herbs.", "/treatment-glamour-glow.jpg"],
    ["Couple Massage", "A relaxing massage for two people, side by side.", "/treatment-spa-sojourns.jpg"],
    ["Quick Treatments", "Short treatments for when you do not have much time.", "/treatment-massage.jpg"],
    ["Full Spa Day", "Long spa sessions that mix old Indian healing with modern comfort.", "/treatment-spa-sojourns.jpg"],
  ];

  const articleImages = [
    "/article-herbal-compress.jpg",
    "/article-spa-design.jpg",
    "/article-revpash.jpg",
  ];
  const defaultArticles = [
    { category: "Health", readTime: "6 Min Read", topic: "Ayurveda", title: "How Warm Herbal Bags Help You Recover From Stress", excerpt: "Warm bags filled with herbs relax deep muscles and help lower stress in your body.", url: "/blog/herbal-compresses" },
    { category: "Spa Design", readTime: "8 Min Read", topic: "Design", title: "How to Build a Calm Spa With Nature and Ayurveda", excerpt: "How stone, quiet rooms and natural light help your body relax on its own.", url: "/blog/spa-sanctuaries" },
    { category: "Hotel Business", readTime: "5 Min Read", topic: "Hotels", title: "How a Good Spa Helps a Hotel Earn More", excerpt: "Why smart hotel owners turn empty spa space into busy spas that bring in more money.", url: "/blog/revpash-optimization" },
  ];
  // The page showed "<readTime> • <author>" for Sanity articles; author becomes the topic.
  const articleSource: Doc[] = Array.isArray(journal.articles) && journal.articles.length > 0
    ? journal.articles.map((a: Doc) => ({
        category: pick(a.category, "Wellness"),
        readTime: pick(a.readTime, "5 Min Read"),
        topic: pick(a.author, "Kynta Wellness"),
        title: a.title,
        excerpt: a.excerpt,
        url: "/blog",
      }))
    : defaultArticles;

  const stepIcons = ["footbath", "clipboard", "hands", "cup", "infinity"];
  const defaultSteps = [
    { number: "01", title: "ARRIVE & RELAX", description: "We wash your feet in warm flower water and give you a cool herbal drink." },
    { number: "02", title: "CHECK-UP", description: "We talk with you about your body, your stress, where it hurts, and the smells you like." },
    { number: "03", title: "MASSAGE", description: "Natural oils, warmed just right, used by gentle and skilled hands." },
    { number: "04", title: "REST", description: "Rest in a quiet room with hot Kashmiri tea and dry fruits." },
    { number: "05", title: "CARE AT HOME", description: "We give you simple tips, breathing exercises, and oils to use at home." },
  ];
  const hasSanityStats = Array.isArray(guest.stats) && guest.stats.length > 0;
  const stats: Doc[] = hasSanityStats
    ? guest.stats.map((s: Doc) => ({ value: s.value, label: s.label, highlight: false }))
    : [
        { value: "18+", label: "Spas", highlight: false },
        { value: "9", label: "Cities in India", highlight: false },
        { value: "140+", label: "Trained Therapists", highlight: false },
        { value: "85k+", label: "Treatments Given", highlight: false },
        { value: "98.4%", label: "Happy Guests", highlight: true },
      ];

  return {
    _id: "homepage",
    _type: "homepage",
    hero: {
      eyebrow: pick(hero.eyebrow, "Indian Spa & Wellness"),
      headline: "Wellness,",
      headlineItalic: "Made with Care.",
      subtitle: pick(
        hero.subtitle,
        "Relaxing Ayurvedic spa treatments inside the best hotels, palaces and nature resorts in India.",
      ),
      primaryCta: link(pick(hero.ctaText, "See Our Treatments"), pick(hero.ctaUrl, "/experiences")),
      secondaryCta: link("Partner With Kynta", "/partner"),
      image: await image("/hero-bg.jpg", "Luxurious Indian heritage spa courtyard with lotus pool"),
    },
    servicesSection: {
      eyebrow: "OUR SERVICES",
      heading: "What We Offer",
      services: keyed(
        "serviceCard",
        await Promise.all(
          serviceCards.map(async ([name, description, img]) => ({
            name,
            description,
            image: await image(img, name),
            buttonLabel: "Book Now",
            buttonUrl: "/book",
          })),
        ),
      ),
    },
    destinationsSection: {
      eyebrow: "Our Spa Locations",
      heading: "Our spas across India.",
      description:
        "Find us in the hills of Rajasthan, the mountains of Himachal, and other beautiful places in India.",
    },
    guestPathSection: {
      eyebrow: pick(guest.eyebrow, "Your Visit in 5 Steps"),
      heading: pick(guest.heading, "A calm visit, from start to finish."),
      description:
        "From the moment you arrive until after you go home, we take care of every small detail.",
      steps: keyed(
        "step",
        pickList(guest.steps as Doc[], defaultSteps).map((s: Doc, i: number) => ({
          number: s.number,
          title: s.title,
          description: s.description,
          icon: stepIcons[i % stepIcons.length],
        })),
      ),
      stats: keyed("stat", stats),
      trustedByHeading: "Trusted by Top Hotels in India",
      hotelNames: ["THE GLENWOOD MANOR", "HERITAGE RETREATS", "PALMS MORJIM", "METROPOLITAN HOTELS"],
      testimonials: keyed("review", [
        {
          quote: "“The Kynta herbal massage fixed my tired body after weeks of work travel. The therapist was very skilled and the oil smelled lovely. One of the best spas in Asia.”",
          name: "Ananya Singhania",
          affiliation: "Stayed at Glenwood Manor, Shimla",
        },
        {
          quote: "“Letting Kynta run our spa was our best business decision of 2024. Our spa income went up by 38%, and twice as many guests talked about our spa.”",
          name: "Vikramjit Oberoi-Mehra",
          affiliation: "Owner, Heritage Palace Hotels",
        },
        {
          quote: "“The Kumkumadi facial made my skin glow for days. It felt warm and caring, not like a normal hotel spa.”",
          name: "Claire Beauchamp",
          affiliation: "Guest at Kynta Palms Resort, Goa",
        },
      ]),
    },
    partnershipSection: {
      eyebrow: pick(partner.eyebrow, "For Hotel Owners"),
      heading: pick(partner.heading, "We run your hotel spa for you."),
      description:
        "Running a spa is hard work. We do it all for you. We plan the space, hire trained therapists, run the spa every day, and help your hotel earn more.",
      primaryCta: link("Get Partner Details", "/partner"),
      secondaryCta: link("Book a Call With Us", "/contact"),
      services: keyed(
        "homepageServiceItem",
        pickList(partner.services as Doc[], [
          { icon: "spatial", title: "Spa Design & Planning", description: "We help you plan the spa rooms, water areas, quiet spaces and the full layout." },
          { icon: "management", title: "We Run Your Spa Daily", description: "We do everything: bookings, guest service, supplies, towels and safety checks." },
          { icon: "sourcing", title: "Trained Therapists", description: "We hire and train the therapists. We pay them and take care of all their paperwork." },
          { icon: "formulation", title: "Our Own Herbal Products", description: "Pure herbal oils and products, even with your hotel's name on them, in eco-friendly glass bottles." },
          { icon: "revpash", title: "More Spa Income", description: "Smart booking keeps your spa rooms busy at all hours, so your hotel earns more money." },
          { icon: "brand", title: "Better Hotel Reviews", description: "A great spa makes your hotel look better. Our partner hotels get higher ratings on sites like TripAdvisor." },
        ]).map((s: Doc) => ({
          icon: pick(s.icon, "spatial"),
          title: s.title,
          description: s.description,
        })),
      ),
    },
    journalSection: {
      eyebrow: pick(journal.eyebrow, "Kynta Blog"),
      heading: pick(journal.heading, "Read about herbs, spa design and hotel business."),
      allArticlesLink: link("Read All Articles", "/blog"),
      articles: keyed(
        "article",
        await Promise.all(
          articleSource.map(async (a, i) => ({
            ...a,
            image: await image(articleImages[i % articleImages.length], a.title),
          })),
        ),
      ),
    },
    reservationSection: {
      eyebrow: pick(booking.eyebrow, "Book Your Spa Visit"),
      heading: pick(booking.heading, "Book a Treatment"),
      description: pick(
        booking.description,
        "Book one short session or a stay of many days. Our team will plan every detail for you.",
      ),
      infoCards: keyed(
        "infoCard",
        pickList(booking.infoCards as Doc[], [
          { icon: "clock", title: "No Rush, No Crowds", description: "We take only a few bookings each day, so the spa always stays quiet and calm." },
          { icon: "shield", title: "Your Privacy Matters", description: "Tell us about food needs, private travel or a private room. We keep it all private." },
        ]).map((c: Doc) => ({
          icon: c.icon === "shield" ? "shield" : "clock",
          title: c.title,
          description: c.description,
        })),
      ),
      whatsapp: {
        title: "Talk to Us",
        subtitle: "Book fast on WhatsApp",
        buttonLabel: "WhatsApp",
        url: "https://wa.me/917250333494?text=Hello%20Kynta%20Wellness%20%F0%9F%8C%B8%0A%0AI%E2%80%99d%20love%20to%20explore%20your%20wellness%20and%20spa%20experiences.%20Could%20you%20please%20share%20the%20available%20treatments%2C%20pricing%2C%20and%20appointment%20availability%3F",
      },
      formHeading: "Your Booking Details",
    },
    seo: {
      title: pick(current.seo?.title, "Kynta Wellness Group | Premium Spa & Wellness Hospitality"),
      description: pick(
        current.seo?.description,
        "Premium restorative sanctuaries and turnkey spa operations crafted exclusively for India's most exceptional hotels, heritage palaces, and boutique wilderness retreats.",
      ),
    },
  };
}

async function buildSiteSettings(current: Doc): Promise<Doc> {
  const footer = current.footer ?? {};
  return {
    _id: "siteSettings",
    _type: "siteSettings",
    title: pick(current.title, "Kynta Wellness"),
    topBar: {
      partnerText: pick(current.topBar?.partnerText, "Trusted Spa Partner for 5-Star Hotels"),
      phone: pick(current.topBar?.phone, "+91 7250333494"),
    },
    logo: await image("/kynta-logo-full.png", "Kynta Wellness Group"),
    navigation: keyed(
      "navItem",
      pickList(current.navigation as Doc[], [
        { label: "HOME", url: "/" },
        { label: "EXPERIENCES", url: "/experiences" },
        { label: "LOCATIONS", url: "/locations" },
        { label: "ABOUT", url: "/about" },
        { label: "FOR HOTELS", url: "/for-hospitality" },
        { label: "BLOG", url: "/blog" },
        { label: "CONTACT", url: "/contact" },
      ]).map((n: Doc) => ({ label: n.label, url: n.url })),
    ),
    headerButton: link("BOOK NOW", "/book"),
    footer: {
      brandDescription: pick(
        footer.brandDescription,
        "Old Indian healing in calm, modern spas. Made for top hotels and for anyone who wants to relax and feel better.",
      ),
      certificationText: "Certified Ayurveda & Water Therapy Spas",
      newsletterHeading: pick(footer.newsletterHeading, "Our Newsletter"),
      newsletterDescription: pick(
        footer.newsletterDescription,
        "Get news about our spas, special offers and health tips.",
      ),
      newsletterPlaceholder: pick(footer.newsletterPlaceholder, "Your email address"),
      newsletterButtonLabel: "Subscribe",
      legalLinks: keyed("footerLink", [
        link("Privacy Policy", "/privacy"),
        link("Terms of Service", "/terms"),
        link("Spa", "/spas"),
      ]),
      copyright: "© 2025 Kynta Wellness Private Limited. All rights reserved.",
    },
    socialLinks: {
      instagram: "https://www.instagram.com/kyntawellnessgroup",
      facebook: "https://www.facebook.com/netlafeadsmarketing",
      linkedin: "https://www.linkedin.com/company/kyntawellness/",
      whatsapp: "https://whatsapp.com/channel/0029VbCmXZFGZNCwHs3hTf21",
    },
  };
}

async function main() {
  const current = await client.fetch<{ homepage: Doc | null; siteSettings: Doc | null }>(
    `{"homepage": *[_id == "homepage"][0], "siteSettings": *[_id == "siteSettings"][0]}`,
  );

  const backupDir = path.join(process.cwd(), "sanity", "backups");
  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(backupDir, `homepage-sitesettings-${stamp}.json`);
  writeFileSync(backupFile, JSON.stringify(current, null, 2));
  console.log(`Backup written: ${path.relative(process.cwd(), backupFile)}`);

  const homepageSource = keepCurrentText
    ? (current.homepage ?? {})
    : { seo: current.homepage?.seo };
  const siteSettingsSource = keepCurrentText
    ? (current.siteSettings ?? {})
    : { title: current.siteSettings?.title };
  const homepage = await buildHomepage(homepageSource);
  const siteSettings = await buildSiteSettings(siteSettingsSource);

  if (dryRun) {
    const planFile = path.join(backupDir, `planned-${stamp}.json`);
    writeFileSync(planFile, JSON.stringify({ homepage, siteSettings }, null, 2));
    console.log(`Dry run: planned documents written to ${path.relative(process.cwd(), planFile)}`);
    return;
  }

  await client
    .transaction()
    .createOrReplace(homepage as Doc & { _id: string; _type: string })
    .createOrReplace(siteSettings as Doc & { _id: string; _type: string })
    .commit();
  console.log("Homepage and Site Settings updated in Sanity.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
