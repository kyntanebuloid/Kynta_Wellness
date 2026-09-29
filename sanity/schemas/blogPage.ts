import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPage",
  title: "Blog Page",
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
      name: "inquiriesSection",
      title: "Inquiries Section",
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
          title: "Inquiry Articles",
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
      name: "compendiumSection",
      title: "Compendium Section",
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
          name: "chapters",
          title: "Compendium Chapters",
          type: "array",
          of: [
            defineField({
              name: "chapter",
              title: "Chapter",
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
                  name: "chapterNumber",
                  title: "Chapter Number",
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
        defineField({
          name: "practitionerNotes",
          title: "Practitioner Notes",
          type: "array",
          of: [
            defineField({
              name: "note",
              title: "Practitioner Note",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "author",
                  title: "Author",
                  type: "string",
                }),
                defineField({ name: "role", title: "Role", type: "string" }),
                defineField({
                  name: "excerpt",
                  title: "Excerpt",
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
      name: "philosophySection",
      title: "Philosophy & Sound Section",
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
          name: "fieldNotes",
          title: "Field Notes",
          type: "array",
          of: [
            defineField({
              name: "fieldNote",
              title: "Field Note",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "excerpt",
                  title: "Excerpt",
                  type: "text",
                  rows: 2,
                }),
                defineField({
                  name: "category",
                  title: "Category",
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
        defineField({
          name: "audioTracks",
          title: "Audio Tracks",
          type: "array",
          of: [
            defineField({
              name: "track",
              title: "Audio Track",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "duration",
                  title: "Duration",
                  type: "string",
                }),
                defineField({
                  name: "category",
                  title: "Category",
                  type: "string",
                }),
                defineField({
                  name: "audioUrl",
                  title: "Audio URL",
                  type: "url",
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
