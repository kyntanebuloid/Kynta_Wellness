import { defineField, defineType } from "sanity";

// Shared by every page: top bar, header and footer. Every field is rendered;
// the site falls back to built-in text when one is empty.

const linkFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "url", title: "Link", type: "string" }),
];

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "topBar", title: "Top Bar", default: true },
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "social", title: "Social Links" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Site Name",
      type: "string",
      description: "Internal name for this settings document.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "topBar",
      title: "Top Bar",
      type: "object",
      group: "topBar",
      description: "Thin strip above the header (hidden on phones).",
      fields: [
        defineField({
          name: "partnerText",
          title: "Left Text",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "header",
      description:
        "Used in the header and footer. Leave empty to use the built-in logo.",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "navigation",
      title: "Menu Links",
      type: "array",
      group: "header",
      of: [
        defineField({
          name: "navItem",
          title: "Menu Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "headerButton",
      title: "Header Button",
      type: "object",
      group: "header",
      fields: linkFields,
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "brandDescription",
          title: "About Text",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "certificationText",
          title: "Certification Line",
          type: "string",
        }),
        defineField({
          name: "newsletterHeading",
          title: "Newsletter Heading",
          type: "string",
        }),
        defineField({
          name: "newsletterDescription",
          title: "Newsletter Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "newsletterPlaceholder",
          title: "Newsletter Email Placeholder",
          type: "string",
        }),
        defineField({
          name: "newsletterButtonLabel",
          title: "Newsletter Button Label",
          type: "string",
        }),
        defineField({
          name: "legalLinks",
          title: "Bottom Links",
          type: "array",
          of: [
            defineField({
              name: "footerLink",
              title: "Link",
              type: "object",
              fields: linkFields,
              preview: { select: { title: "label", subtitle: "url" } },
            }),
          ],
        }),
        defineField({
          name: "copyright",
          title: "Copyright Line",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      group: "social",
      description: "Shown as icons in the top bar and footer.",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "whatsapp", title: "WhatsApp", type: "url" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
