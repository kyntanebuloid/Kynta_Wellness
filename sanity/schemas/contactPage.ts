import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
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
      name: "tabs",
      title: "Contact Tabs",
      type: "array",
      of: [
        defineField({
          name: "tab",
          title: "Tab",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({
          name: "address",
          title: "Address",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "workingHours",
          title: "Working Hours",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "locationCards",
      title: "Location Cards",
      type: "array",
      of: [
        defineField({
          name: "locationCard",
          title: "Location Card",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "address", title: "Address", type: "string" }),
            defineField({ name: "phone", title: "Phone", type: "string" }),
            defineField({ name: "hours", title: "Hours", type: "string" }),
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
      ],
    }),
    defineField({
      name: "formFields",
      title: "Form Field Labels",
      type: "object",
      fields: [
        defineField({ name: "nameLabel", title: "Name Label", type: "string" }),
        defineField({
          name: "emailLabel",
          title: "Email Label",
          type: "string",
        }),
        defineField({
          name: "phoneLabel",
          title: "Phone Label",
          type: "string",
        }),
        defineField({
          name: "serviceLabel",
          title: "Service Label",
          type: "string",
        }),
        defineField({
          name: "messageLabel",
          title: "Message Label",
          type: "string",
        }),
        defineField({
          name: "submitButtonLabel",
          title: "Submit Button Label",
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
