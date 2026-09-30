import { defineField, defineType } from "sanity";
import {
  choice,
  img,
  linkObj,
  obj,
  objList,
  seo,
  str,
  txt,
} from "./helpers";

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

const location = defineField({
  name: "location",
  title: "Location",
  type: "object",
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "detail", title: "Detail Page" },
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
    str("phone", "Phone", { group: "card" }),
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
    linkObj("secondaryCta", "Second Button", { group: "detail" }),
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
        str("facilities", "Facilities"),
      ],
      { description: "Counts are added automatically, e.g. “All Enclaves (6)”." },
    ),
    str("detailsLabel", "Card Link Label"),
    str("glanceHeading", "Detail Page – “At a Glance” Heading"),
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
