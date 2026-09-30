import { defineField, defineType } from "sanity";
import {
  accentColor,
  choice,
  img,
  linkObj,
  obj,
  objList,
  pdf,
  seo,
  str,
  txt,
} from "./helpers";

// Mirrors src/content/blog.ts, top to bottom of the Blog page.
export default defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  fields: [
    obj("hero", "1. Hero & Featured Article", [
      str("eyebrow", "Small Label"),
      txt("heading", "Heading", 2),
      txt("subheading", "Description", 3),
      defineField({
        name: "categories",
        title: "Categories",
        description:
          "Each category is a button. Clicking it shows that category's featured article. The first one shows when the page opens.",
        type: "array",
        of: [
          defineField({
            name: "blogCategory",
            title: "Category",
            type: "object",
            fields: [
              str("label", "Button Label", { description: "e.g. ALL ESSAYS" }),
              img("image", "Photo"),
              str("badge", "Photo Badge"),
              str("category", "Category"),
              str("issue", "Issue"),
              str("readTime", "Read Time"),
              txt("title", "Title", 2),
              txt("description", "Description", 3),
              str("authorInitials", "Author Initials"),
              str("authorName", "Author Name"),
              str("authorRole", "Author Role"),
              pdf("pdf", "Article PDF", {
                description:
                  "Upload the article as a PDF. The read link only shows when a PDF or a link is set.",
              }),
              str("url", "Or Article Link", {
                description:
                  "Used when there is no PDF. Leave empty to hide the link.",
              }),
              str("linkLabel", "Link Label"),
            ],
            preview: {
              select: { title: "label", subtitle: "title", media: "image" },
            },
          }),
        ],
      }),
    ]),
    obj("inquiriesSection", "2. Recent Articles", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      str("note", "Right-hand Note"),
      objList("articles", "Articles", "inquiryArticle", "Article", [
        img("image", "Photo"),
        str("tag", "Photo Tag"),
        str("meta", "Category & Read Time"),
        txt("title", "Title", 2),
        txt("description", "Description", 2),
        str("linkLabel", "Link Label"),
        pdf("pdf", "Article PDF", {
          description: "The read link only shows when a PDF or a link is set.",
        }),
        str("url", "Or Article Link", {
          description:
            "Used when there is no PDF. Leave empty to hide the link.",
        }),
      ]),
    ]),
    obj("compendiumSection", "3. Monograph", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description"),
      objList("chapters", "Chapters", "chapter", "Chapter", [
        choice("icon", "Icon", [
          ["microbiome", "Leaf"],
          ["thermal", "Sunrise"],
          ["architecture", "Building"],
        ]),
        str("title", "Title"),
        txt("description", "Description", 2),
      ]),
      str("monographLabel", "Monograph Button Label"),
      pdf("monographPdf", "Monograph PDF", {
        description:
          "Upload a PDF to show the monograph button. Leave empty to hide it.",
      }),
      linkObj("hardcoverCta", "Hardcover Button", {
        description:
          "Set a link (e.g. /contact) to show this button. Leave the link empty to hide it.",
      }),
      obj("ledger", "Data Card", [
        str("label", "Small Label"),
        str("code", "Code (e.g. ISBN)"),
        str("statValue", "Big Number"),
        str("statLabel", "Big Number Label"),
        objList(
          "bars",
          "Progress Bars",
          "bar",
          "Bar",
          [
            str("label", "Label"),
            str("value", "Result"),
            defineField({
              name: "percent",
              title: "Bar Fill (%)",
              type: "number",
              validation: (rule) => rule.min(0).max(100),
            }),
            accentColor("color", "Colour"),
          ],
          "label",
        ),
        txt("footnote", "Footnote", 2),
      ]),
    ]),
    obj("philosophySection", "4. Field Notes & Soundscapes", [
      str("eyebrow", "Field Notes – Small Label"),
      str("heading", "Field Notes – Heading"),
      txt("description", "Field Notes – Description", 2),
      objList("fieldNotes", "Field Notes", "fieldNote", "Note", [
        str("author", "Author"),
        str("location", "Location"),
        str("title", "Title"),
        txt("quote", "Quote"),
      ]),
      str("soundEyebrow", "Soundscapes – Small Label"),
      str("soundHeading", "Soundscapes – Heading"),
      txt("soundDescription", "Soundscapes – Description", 2),
      objList("audioTracks", "Tracks", "audioTrack", "Track", [
        str("title", "Title"),
        str("subtitle", "Subtitle"),
        str("duration", "Duration"),
        accentColor("color", "Colour"),
      ]),
      txt("soundNote", "Listening Note", 2),
    ]),
    seo(),
  ],
  preview: {
    prepare: () => ({ title: "Blog Page" }),
  },
});
