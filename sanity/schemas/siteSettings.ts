import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
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
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
      ],
    }),
    defineField({
      name: "topBar",
      title: "Top Bar",
      type: "object",
      fields: [
        defineField({
          name: "partnerText",
          title: "Partner Text",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
        }),
        defineField({
          name: "b2bLabel",
          title: "B2B Link Label",
          type: "string",
        }),
        defineField({
          name: "b2bUrl",
          title: "B2B Link URL",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Main Navigation",
      type: "array",
      of: [
        defineField({
          name: "navItem",
          title: "Nav Item",
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
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "isButton",
              title: "Is Button Style",
              type: "boolean",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "brandName", title: "Brand Name", type: "string" }),
        defineField({
          name: "brandDescription",
          title: "Brand Description",
          type: "text",
          rows: 3,
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
          name: "footerNav",
          title: "Footer Navigation",
          type: "array",
          of: [
            defineField({
              name: "footerNavGroup",
              title: "Footer Nav Group",
              type: "object",
              fields: [
                defineField({
                  name: "heading",
                  title: "Group Heading",
                  type: "string",
                }),
                defineField({
                  name: "links",
                  title: "Links",
                  type: "array",
                  of: [
                    defineField({
                      name: "footerLink",
                      title: "Footer Link",
                      type: "object",
                      fields: [
                        defineField({
                          name: "label",
                          title: "Label",
                          type: "string",
                        }),
                        defineField({
                          name: "url",
                          title: "URL",
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
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
