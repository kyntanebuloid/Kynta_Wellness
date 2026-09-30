import { defineField, defineType } from "sanity";
import { img, pdf, seo, str } from "./helpers";

// Each post is its own document and gets a page at /blog/<slug>.
// The blog page lists visible posts by Position (low → high); hidden posts
// are skipped, so 1, 2, 3, 4, (hidden), (hidden), 7 shows 7 right after 4.

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "listing", title: "Listing", default: true },
    { name: "article", title: "Article" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description:
        "The part after /blog/. Click Generate to make it from the title.",
      type: "slug",
      group: "listing",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showOnSite",
      title: "Show on site",
      description:
        "Turn off to hide this post from the blog without deleting it.",
      type: "boolean",
      group: "listing",
      initialValue: true,
    }),
    defineField({
      name: "position",
      title: "Position",
      description:
        "Order on the blog page — 1 shows first. Hidden posts are skipped. Posts without a number go last, newest first.",
      type: "number",
      group: "listing",
      validation: (rule) => rule.integer().min(1),
    }),
    img("featuredImage", "Cover image", { group: "listing" }),
    str("category", "Category tag", {
      group: "listing",
      description: "Small label on the card, e.g. BOTANICAL APOTHECARY.",
    }),
    str("readTime", "Read time", {
      group: "listing",
      description: "e.g. 6 MIN READ",
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      description: "Shown on the card and under the title on the article page.",
      type: "text",
      rows: 3,
      group: "listing",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "listing",
      initialValue: () => new Date().toISOString(),
    }),
    str("author", "Author name", { group: "article" }),
    str("authorRole", "Author role", {
      group: "article",
      description: "e.g. Chief Ayurvedic Vaidya",
    }),
    defineField({
      name: "content",
      title: "Article text",
      type: "array",
      group: "article",
      of: [
        { type: "block" },
        defineField({
          type: "image",
          name: "contentImage",
          title: "Image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
    }),
    pdf("pdf", "PDF download (optional)", {
      group: "article",
      description: "The download button only shows once a PDF is uploaded.",
    }),
    str("pdfLabel", "PDF button label", {
      group: "article",
      description: "Defaults to DOWNLOAD PDF.",
    }),
    { ...seo(), group: "seo" },
  ],
  orderings: [
    {
      title: "Position",
      name: "positionAsc",
      by: [
        { field: "position", direction: "asc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      position: "position",
      shown: "showOnSite",
      media: "featuredImage",
    },
    prepare({ title, position, shown, media }) {
      const place =
        typeof position === "number" ? `#${position}` : "No position";
      const state = shown === false ? "Hidden" : "Shown";
      return { title, subtitle: `${place} · ${state}`, media };
    },
  },
});
