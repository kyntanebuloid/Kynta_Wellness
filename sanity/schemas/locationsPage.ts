import { defineField, defineType } from "sanity";
import { choice, img, linkObj, obj, objList, seo, str, txt } from "./helpers";

// Mirrors src/content/locations.ts. Each location powers its card on the
// Locations page and homepage and its own /locations/<slug> detail page.

const galleryCard = (name: string, title: string, withBadge: boolean) =>
  obj(name, title, [
    img("image", "Photo"),
    str("tag", "Small Label"),
    str("title", "Title"),
    ...(withBadge ? [str("badge", "Badge")] : []),
    txt("subtitle", "Subtitle", 2),
  ]);

// One bookable treatment at a spa, with a price per duration. The booking
// form lists these for the chosen spa; the server charges these prices.
export const MENU_CATEGORIES: [value: string, label: string][] = [
  ["sojourn", "Spa Sojourns"],
  ["couple", "Couple Spa"],
  ["massage", "Massage Selections"],
  ["glamour", "Glamour Glow"],
  ["rapid", "Rapid Relax"],
];

const menuItem = defineField({
  name: "menuItem",
  title: "Treatment",
  type: "object",
  fields: [
    str("name", "Treatment Name"),
    choice("category", "Category", MENU_CATEGORIES),
    defineField({
      name: "perPerson",
      title: "Price is per person",
      description:
        'Turn on for couple treatments priced "each": the price is charged for both guests.',
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "options",
      title: "Durations & Prices",
      description:
        "One row per duration, e.g. 60 min ₹3,900 and 90 min ₹5,850.",
      type: "array",
      of: [
        defineField({
          name: "menuOption",
          title: "Duration",
          type: "object",
          fields: [
            defineField({
              name: "minutes",
              title: "Minutes",
              type: "number",
              validation: (rule) => rule.required().integer().min(5),
            }),
            defineField({
              name: "price",
              title: "Price (₹, before tax)",
              type: "number",
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { minutes: "minutes", price: "price" },
            prepare: ({ minutes, price }) => ({
              title: `${minutes ?? "?"} min · ₹${price ?? "?"}`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", category: "category", options: "options" },
    prepare: ({ title, category, options }) => ({
      title,
      subtitle: [
        MENU_CATEGORIES.find(([value]) => value === category)?.[1],
        (options as { minutes?: number; price?: number }[] | undefined)
          ?.map((o) => `${o.minutes} min ₹${o.price}`)
          .join(" · "),
      ]
        .filter(Boolean)
        .join(" — "),
    }),
  },
});

const location = defineField({
  name: "location",
  title: "Location",
  type: "object",
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "detail", title: "Detail Page" },
    { name: "booking", title: "Booking Menu" },
  ],
  fields: [
    str("name", "Name", { group: "card" }),
    str("slug", "Slug", {
      group: "card",
      description: "The detail page lives at /locations/<slug>.",
    }),
    choice(
      "region",
      "Region",
      [
        ["himalayan", "Himachal Pradesh"],
        ["rajasthan", "Rajasthan"],
      ],
      { group: "card" },
    ),
    str("address", "Address", { group: "card" }),
    txt("cardDescription", "Homepage Card Text", 2, {
      group: "card",
      description: "Short text on the homepage card. Defaults to the address.",
    }),
    str("price", "Price", { group: "card" }),
    img("image", "Card Photo", { group: "card" }),
    str("imagePath", "Local Image Path (old)", {
      group: "card",
      description: "Only used when no Card Photo is uploaded.",
    }),
    str("detailsUrl", "Custom Details Link", {
      group: "card",
      description: "Leave empty to link to /locations/<slug>.",
    }),
    str("hours", "Opening Hours", { group: "card" }),
    str("phone", "Phone", {
      group: "card",
      description:
        'Reservation number. Also used for the "Call to book" button on the booking form.',
    }),
    str("email", "Email", { group: "card" }),
    defineField({
      name: "services",
      title: "Service Icons",
      type: "array",
      group: "card",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Spa", value: "spa" },
          { title: "Dining", value: "dining" },
          { title: "Pool", value: "pool" },
          { title: "Wi-Fi", value: "wifi" },
          { title: "Suite", value: "suite" },
        ],
      },
    }),
    str("breadcrumbEyebrow", "Top Label", { group: "detail" }),
    txt("description", "Description", 4, { group: "detail" }),
    str("sanctuaryId", "Sanctuary Code", {
      group: "detail",
      description: "e.g. HIM A–01",
    }),
    objList(
      "sanctuaryInfo",
      "At a Glance",
      "infoRow",
      "Row",
      [str("label", "Label"), str("title", "Text")],
      "label",
      { group: "detail" },
    ),
    linkObj("primaryCta", "Main Button", { group: "detail" }),
    defineField({
      name: "dossier",
      title: "Dossier PDF",
      type: "file",
      group: "detail",
      description:
        "Upload a PDF to show the download button on this location's page. Leave empty to hide the button.",
      options: { accept: ".pdf,application/pdf" },
    }),
    str("dossierLabel", "Dossier Button Label", {
      group: "detail",
      description: "e.g. SANCTUARY DOSSIER (PDF)",
    }),
    str("mapUrl", "Google Maps Link", {
      group: "detail",
      description:
        "Open the place in Google Maps → Share → Copy link, then paste it here. Leave empty to hide the button.",
    }),
    str("mapEmbedUrl", "Google Maps Embed Link", {
      group: "detail",
      description:
        'Google Maps → Share → Embed a map → copy only the src="…" part (starts with https://www.google.com/maps/embed). Leave empty to hide the map.',
    }),
    obj(
      "gallery",
      "Photo Gallery",
      [
        galleryCard("mainCard", "Large Photo", true),
        galleryCard("topRightCard", "Top-Right Photo", false),
        galleryCard("bottomRightCard", "Bottom-Right Photo", false),
      ],
      { group: "detail" },
    ),
    objList(
      "facilities",
      "Facilities Strip",
      "facility",
      "Facility",
      [
        choice("icon", "Icon", [
          ["sun", "Sun"],
          ["flower", "Flower"],
          ["mountain", "Mountain"],
          ["car", "Car"],
        ]),
        str("title", "Title"),
        str("subtitle", "Subtitle"),
      ],
      "title",
      { group: "detail" },
    ),
    defineField({
      name: "menu",
      title: "Treatments & Prices",
      description:
        "What guests can book online at this spa. Leave empty and the booking form shows Call / WhatsApp to book instead.",
      type: "array",
      group: "booking",
      of: [menuItem],
    }),
  ],
  preview: { select: { title: "name", subtitle: "address", media: "image" } },
});

export default defineType({
  name: "locationsPage",
  title: "Locations Page",
  type: "document",
  fields: [
    obj("hero", "1. Heading", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("subheading", "Description", 3),
    ]),
    obj(
      "filterLabels",
      "2. Filter Buttons",
      [
        str("all", "All"),
        str("himalayan", "Himachal Pradesh"),
        str("rajasthan", "Rajasthan"),
      ],
      {
        description: "Counts are added automatically, e.g. “All Enclaves (6)”.",
      },
    ),
    str("detailsLabel", "Card Link Label"),
    str("glanceHeading", "Detail Page – “At a Glance” Heading"),
    defineField({
      name: "gstPercent",
      title: "Booking – GST % added at checkout",
      description:
        'Added on top of the menu prices when guests pay online (menus say "taxes extra"). Use 0 if prices already include tax.',
      type: "number",
      validation: (rule) => rule.min(0).max(28),
    }),
    defineField({
      name: "locations",
      title: "3. Locations",
      type: "array",
      of: [location],
    }),
    obj("ctaSection", "4. Concierge Banner", [
      str("badge", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description"),
      str("ctaText", "Main Button Label"),
      str("ctaUrl", "Main Button Link"),
      str("whatsappLabel", "WhatsApp Button Label"),
      str("whatsappUrl", "WhatsApp Link"),
    ]),
    seo(),
  ],
  preview: {
    prepare: () => ({ title: "Locations Page" }),
  },
});
