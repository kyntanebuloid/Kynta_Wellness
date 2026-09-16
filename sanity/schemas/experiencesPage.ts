import { defineField, defineType } from "sanity";

export default defineType({
  name: "experiencesPage",
  title: "Experiences Page",
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
      name: "filters",
      title: "Category Filters",
      type: "array",
      of: [
        defineField({
          name: "filter",
          title: "Filter",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "experiences",
      title: "Experience Cards",
      type: "array",
      of: [
        defineField({
          name: "experience",
          title: "Experience",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
            }),
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
              name: "duration",
              title: "Duration",
              type: "string",
            }),
            defineField({ name: "price", title: "Price", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "pillars",
      title: "Experience Pillars Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "cards",
          title: "Pillar Cards",
          type: "array",
          of: [
            defineField({
              name: "pillar",
              title: "Pillar",
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon Name",
                  type: "string",
                }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "treatmentsSection",
      title: "Treatments Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "cards",
          title: "Treatment Cards",
          type: "array",
          of: [
            defineField({
              name: "treatmentCard",
              title: "Treatment Card",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "duration",
                  title: "Duration",
                  type: "string",
                }),
                defineField({
                  name: "sensoryNote",
                  title: "Sensory Note",
                  type: "string",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "protocolSection",
      title: "Protocol Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "steps",
          title: "Protocol Steps",
          type: "array",
          of: [
            defineField({
              name: "step",
              title: "Step",
              type: "object",
              fields: [
                defineField({
                  name: "number",
                  title: "Step Number",
                  type: "string",
                }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
              ],
            }),
          ],
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
