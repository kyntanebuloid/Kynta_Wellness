import { defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow / Series",
      type: "string",
      description: "e.g. SACRED HEALING SERIES",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Signature Bodywork, Signature Rituals",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 75 / 90 Mins",
    }),
    defineField({
      name: "sensoryNote",
      title: "Sensory Note",
      type: "string",
      description: "e.g. Cedarwood • Ginger Root • Smoky Vetiver",
    }),
    defineField({
      name: "price",
      title: "Price (display)",
      type: "string",
      description: "Display only, e.g. ₹8,500 — not used for payments",
    }),
    defineField({
      name: "priceAmount",
      title: "Price Amount",
      type: "number",
      description:
        "Numeric price in INR major units for Razorpay (e.g. 8500 = ₹8,500). Source of truth for booking charges.",
      validation: (rule) => rule.min(0).precision(2),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [{ title: "INR (₹)", value: "INR" }],
      },
      initialValue: "INR",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary Call to Action",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Button Label", type: "string" }),
        defineField({ name: "url", title: "Button URL", type: "string" }),
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary Call to Action",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Button Label", type: "string" }),
        defineField({ name: "url", title: "Button URL", type: "string" }),
      ],
    }),
    defineField({
      name: "image",
      title: "Main Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "gallery",
      title: "Detail Gallery Cards",
      type: "object",
      fields: [
        defineField({
          name: "mainCard",
          title: "Main Large Left Card",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Card Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "tag",
              title: "Tag / Eyebrow",
              type: "string",
            }),
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({
              name: "badge",
              title: "Right Badge",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "topRightCard",
          title: "Top-Right Card",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Card Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "tag",
              title: "Tag / Eyebrow",
              type: "string",
            }),
            defineField({ name: "title", title: "Card Title", type: "string" }),
          ],
        }),
        defineField({
          name: "bottomRightCard",
          title: "Bottom-Right Card",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Card Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "tag",
              title: "Tag / Eyebrow",
              type: "string",
            }),
            defineField({ name: "title", title: "Card Title", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "footerNote",
      title: "Footer Note",
      type: "string",
      description:
        "e.g. Curated full-body therapies with cold-pressed botanical infusions",
    }),
    defineField({
      name: "highlights",
      title: "Sensory Highlights / Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO Title", type: "string" }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "ogImage",
          title: "OG Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
