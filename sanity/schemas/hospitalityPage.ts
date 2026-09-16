import { defineField, defineType } from "sanity";

export default defineType({
  name: "hospitalityPage",
  title: "Hospitality Page",
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
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
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
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            defineField({
              name: "stat",
              title: "Stat",
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "statsSection",
      title: "Stats Section",
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
          name: "metrics",
          title: "Metrics",
          type: "array",
          of: [
            defineField({
              name: "metric",
              title: "Metric",
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 2,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "modelsSection",
      title: "Partnership Models Section",
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
          name: "models",
          title: "Partnership Models",
          type: "array",
          of: [
            defineField({
              name: "model",
              title: "Partnership Model",
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
                  name: "features",
                  title: "Features",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "viabilitySection",
      title: "Viability Section",
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
          name: "stats",
          title: "Viability Stats",
          type: "array",
          of: [
            defineField({
              name: "stat",
              title: "Stat",
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 2,
                }),
              ],
            }),
          ],
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
      ],
    }),
    defineField({
      name: "transformationsSection",
      title: "Transformations Section",
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
          name: "transformations",
          title: "Transformation Cards",
          type: "array",
          of: [
            defineField({
              name: "transformation",
              title: "Transformation",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "before",
                  title: "Before",
                  type: "text",
                  rows: 2,
                }),
                defineField({
                  name: "after",
                  title: "After",
                  type: "text",
                  rows: 2,
                }),
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
      name: "assuranceSection",
      title: "Assurance Section",
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
          name: "pillars",
          title: "Assurance Pillars",
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
