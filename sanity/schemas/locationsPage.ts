import { defineField, defineType } from "sanity";

export default defineType({
  name: "locationsPage",
  title: "Locations Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "locations",
      title: "Location Cards",
      type: "array",
      of: [
        defineField({
          name: "location",
          title: "Location",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "address", title: "Address", type: "string" }),
            defineField({ name: "region", title: "Region", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({ name: "slug", title: "Slug / Identifier", type: "string" }),
            defineField({ name: "imagePath", title: "Local Image Path", type: "string" }),
            defineField({ name: "detailsUrl", title: "Details URL", type: "string" }),
            defineField({ name: "hours", title: "Hours", type: "string" }),
            defineField({ name: "phone", title: "Phone", type: "string" }),
            defineField({ name: "email", title: "Email", type: "string" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt Text", type: "string" }),
              ],
            }),
            defineField({
              name: "services",
              title: "Available Services",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "ctaSection",
      title: "CTA Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
        }),
        defineField({
          name: "ctaUrl",
          title: "CTA Button URL",
          type: "string",
        }),
      ],
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
    select: { title: "hero.heading" },
  },
});
