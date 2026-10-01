import { defineField, defineType } from "sanity";

// Field order mirrors the homepage from top to bottom. Every field here is
// rendered on the page; the site falls back to built-in text when one is empty.

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
  });

const linkField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "label", title: "Label", type: "string" }),
      defineField({ name: "url", title: "Link", type: "string" }),
    ],
  });

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "services", title: "2. What We Offer" },
    { name: "locations", title: "3. Spa Locations" },
    { name: "visit", title: "4. Your Visit" },
    { name: "hotels", title: "5. For Hotel Owners" },
    { name: "blog", title: "6. Blog" },
    { name: "booking", title: "7. Booking" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero (top banner)",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small Label",
          type: "string",
          description: "Pill above the heading, e.g. Indian Spa & Wellness",
        }),
        defineField({
          name: "headline",
          title: "Heading – Line 1",
          type: "string",
          description: "e.g. Wellness,",
        }),
        defineField({
          name: "headlineItalic",
          title: "Heading – Line 2 (italic)",
          type: "string",
          description: "e.g. Made with Care. — the last word is shown upright",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 2,
        }),
        linkField("primaryCta", "Main Button"),
        linkField("secondaryCta", "Second Button"),
        imageField("image", "Background Image"),
      ],
    }),
    defineField({
      name: "servicesSection",
      title: "What We Offer",
      type: "object",
      group: "services",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "noPhotoText",
          title: "No-photo Label",
          type: "string",
          description:
            "Service cards without a photo show their name on a teal panel with this small label underneath. Defaults to PHOTO COMING SOON.",
        }),
        defineField({
          name: "services",
          title: "Service Cards",
          type: "array",
          of: [
            defineField({
              name: "serviceCard",
              title: "Service",
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 2,
                }),
                imageField("image", "Image"),
                defineField({
                  name: "buttonLabel",
                  title: "Button Label",
                  type: "string",
                  description: "Defaults to Book Now",
                }),
                defineField({
                  name: "buttonUrl",
                  title: "Button Link",
                  type: "string",
                  description: "Defaults to /book",
                }),
              ],
              preview: { select: { title: "name", media: "image" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "destinationsSection",
      title: "Spa Locations",
      type: "object",
      group: "locations",
      description:
        "The location cards come from the Locations page (Pages → Locations). Edit names, photos and details there.",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "noPhotoText",
          title: "No-photo Label",
          type: "string",
          description:
            "Spa cards without a photo show their name on a teal panel with this small label underneath. Defaults to PHOTO COMING SOON.",
        }),
      ],
    }),
    defineField({
      name: "guestPathSection",
      title: "Your Visit",
      type: "object",
      group: "visit",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "steps",
          title: "Steps",
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
                  rows: 2,
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Foot bath", value: "footbath" },
                      { title: "Clipboard", value: "clipboard" },
                      { title: "Hands", value: "hands" },
                      { title: "Tea cup", value: "cup" },
                      { title: "Infinity", value: "infinity" },
                    ],
                  },
                }),
              ],
              preview: { select: { title: "title", subtitle: "number" } },
            }),
          ],
        }),
        defineField({
          name: "stats",
          title: "Numbers Strip",
          type: "array",
          of: [
            defineField({
              name: "stat",
              title: "Number",
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({
                  name: "highlight",
                  title: "Show in accent colour",
                  type: "boolean",
                }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
        }),
        defineField({
          name: "trustedByHeading",
          title: "Hotel Names – Heading",
          type: "string",
        }),
        defineField({
          name: "hotelNames",
          title: "Hotel Names",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "testimonials",
          title: "Guest Reviews",
          type: "array",
          of: [
            defineField({
              name: "review",
              title: "Review",
              type: "object",
              fields: [
                defineField({
                  name: "quote",
                  title: "Quote",
                  type: "text",
                  rows: 3,
                }),
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({
                  name: "affiliation",
                  title: "Where they stayed / role",
                  type: "string",
                }),
              ],
              preview: { select: { title: "name", subtitle: "affiliation" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "partnershipSection",
      title: "For Hotel Owners",
      type: "object",
      group: "hotels",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        linkField("primaryCta", "Main Button"),
        linkField("secondaryCta", "Second Button"),
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
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Building", value: "spatial" },
                      { title: "Shield", value: "management" },
                      { title: "People", value: "sourcing" },
                      { title: "Bottle", value: "formulation" },
                      { title: "Bar chart", value: "revpash" },
                      { title: "Trend up", value: "brand" },
                    ],
                  },
                }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "journalSection",
      title: "Blog",
      type: "object",
      group: "blog",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        linkField("allArticlesLink", "All Articles Link"),
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
                imageField("image", "Image"),
                defineField({
                  name: "category",
                  title: "Category Tag",
                  type: "string",
                }),
                defineField({
                  name: "readTime",
                  title: "Read Time",
                  type: "string",
                  description: "e.g. 6 Min Read",
                }),
                defineField({
                  name: "topic",
                  title: "Topic",
                  type: "string",
                  description: "Shown after the read time, e.g. Ayurveda",
                }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "excerpt",
                  title: "Short Description",
                  type: "text",
                  rows: 2,
                }),
                defineField({
                  name: "url",
                  title: "Link",
                  type: "string",
                  description: "Defaults to /blog",
                }),
              ],
              preview: { select: { title: "title", media: "image" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "reservationSection",
      title: "Booking",
      type: "object",
      group: "booking",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
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
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Clock", value: "clock" },
                      { title: "Shield", value: "shield" },
                    ],
                  },
                }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 2,
                }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
        defineField({
          name: "whatsapp",
          title: "WhatsApp Card",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "buttonLabel",
              title: "Button Label",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "WhatsApp Link",
              type: "string",
              description: "e.g. https://wa.me/917250333494",
            }),
          ],
        }),
        defineField({
          name: "formHeading",
          title: "Form Heading",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      description: "Browser tab title and search-engine description.",
      fields: [
        defineField({ name: "title", title: "SEO Title", type: "string" }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 2,
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
