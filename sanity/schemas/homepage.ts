import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 2,
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
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "introSection",
      title: "Intro Section",
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
      name: "pillarsSection",
      title: "Pillars Section",
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
          name: "treatments",
          title: "Treatment Cards",
          type: "array",
          of: [
            defineField({
              name: "homepageTreatmentItem",
              title: "Treatment",
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
      name: "destinationsSection",
      title: "Destinations Section",
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
          name: "destinations",
          title: "Destination Cards",
          type: "array",
          of: [
            defineField({
              name: "destination",
              title: "Destination",
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({
                  name: "address",
                  title: "Address",
                  type: "string",
                }),
                defineField({ name: "hours", title: "Hours", type: "string" }),
                defineField({ name: "phone", title: "Phone", type: "string" }),
                defineField({ name: "email", title: "Email", type: "string" }),
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
                defineField({
                  name: "tags",
                  title: "Tags",
                  type: "array",
                  of: [{ type: "string" }],
                }),
                defineField({
                  name: "services",
                  title: "Services",
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
      name: "guestPathSection",
      title: "Guest Path Section",
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
          title: "Journey Steps",
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
        defineField({
          name: "faq",
          title: "FAQ",
          type: "array",
          of: [
            defineField({
              name: "faqItem",
              title: "FAQ Item",
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "text",
                  rows: 3,
                }),
              ],
            }),
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
      name: "partnershipSection",
      title: "Partnership Section",
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
          name: "services",
          title: "Service Cards",
          type: "array",
          of: [
            defineField({
              name: "homepageServiceItem",
              title: "Service",
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
      name: "journalSection",
      title: "Journal Section",
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
          name: "articles",
          title: "Article Cards",
          type: "array",
          of: [
            defineField({
              name: "article",
              title: "Article",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "excerpt",
                  title: "Excerpt",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "category",
                  title: "Category",
                  type: "string",
                }),
                defineField({
                  name: "readTime",
                  title: "Read Time",
                  type: "string",
                }),
                defineField({
                  name: "author",
                  title: "Author",
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
      name: "reservationSection",
      title: "Reservation Section",
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
          name: "infoCards",
          title: "Info Cards",
          type: "array",
          of: [
            defineField({
              name: "infoCard",
              title: "Info Card",
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
        defineField({
          name: "contactPhone",
          title: "Contact Phone",
          type: "string",
        }),
        defineField({
          name: "contactEmail",
          title: "Contact Email",
          type: "string",
        }),
        defineField({
          name: "contactAddress",
          title: "Contact Address",
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
    select: { title: "hero.headline" },
  },
});
