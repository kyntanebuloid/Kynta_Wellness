import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientTitle",
      title: "Client Title / Context",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientImage",
      title: "Client Image",
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
      name: "rating",
      title: "Rating",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5].map((n) => ({ title: `${n}`, value: n })),
      },
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "service",
      title: "Related Service",
      type: "reference",
      to: [{ type: "service" }],
    }),
  ],
  preview: {
    select: { title: "clientName", subtitle: "quote", media: "clientImage" },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle ? `"${subtitle.slice(0, 60)}..."` : "",
        media,
      };
    },
  },
});
