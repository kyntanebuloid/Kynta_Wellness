import { defineField, defineType } from "sanity";

// Saved automatically when someone signs up in the website footer.
export default defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "unsubscribed",
      title: "Unsubscribed",
      description: "Turn on if this person asks to stop receiving emails.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "subscribedAtDesc",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "email",
      date: "subscribedAt",
      unsubscribed: "unsubscribed",
    },
    prepare: ({ title, date, unsubscribed }) => ({
      title,
      subtitle: `${unsubscribed ? "Unsubscribed · " : ""}${
        date ? new Date(date).toLocaleDateString("en-IN") : ""
      }`,
    }),
  },
});
