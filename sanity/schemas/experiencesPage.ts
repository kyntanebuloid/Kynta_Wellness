import { defineType } from "sanity";
import {
  accentColor,
  choice,
  img,
  obj,
  objList,
  seo,
  str,
  strList,
  txt,
} from "./helpers";

// Mirrors src/content/experiences.ts, top to bottom of the Experiences page.
export default defineType({
  name: "experiencesPage",
  title: "Experiences Page",
  type: "document",
  fields: [
    obj("hero", "1. Hero", [
      str("eyebrow", "Small Label"),
      str("headingItalic", "Heading – Italic Part", {
        description: "Shown first, in teal italics.",
      }),
      str("heading", "Heading – Rest of Line 1"),
      str("headingLine2", "Heading – Line 2"),
      txt("description", "Description", 3),
      strList("filters", "Category Buttons"),
      obj("featured", "Featured Card", [
        img("image", "Photo"),
        strList("tags", "Tags (top-left pills)", {
          description: "Up to two; the first shows a sound icon, the second a leaf.",
        }),
        str("category", "Category"),
        str("title", "Title"),
        txt("description", "Description", 2),
        str("buttonLabel", "Button Label"),
        str("buttonUrl", "Button Link"),
      ]),
    ]),
    obj("pillars", "2. Four Pillars", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      objList("cards", "Cards", "pillarCard", "Card", [
        str("number", "Number"),
        choice("icon", "Icon", [
          ["flask", "Flask"],
          ["pulse", "Pulse"],
          ["building", "Building"],
          ["hourglass", "Hourglass"],
        ]),
        str("title", "Title"),
        txt("description", "Description"),
        str("footerLabel", "Footer Label"),
        choice("footerIcon", "Footer Icon", [
          ["leaf", "Leaf"],
          ["target", "Target"],
          ["droplet", "Droplet"],
          ["moon", "Moon"],
        ]),
      ]),
    ]),
    obj("treatmentsSection", "3. Signature Rituals", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      str("linkLabel", "Card Link Label"),
      objList("cards", "Cards", "treatmentCard", "Card", [
        img("image", "Photo"),
        str("label", "Tag"),
        str("duration", "Duration"),
        str("title", "Title"),
        str("slug", "Experience Slug", {
          description: "The card links to /experiences/<slug>.",
        }),
        txt("description", "Description", 4),
        str("sensoryNote", "Sensory Note"),
      ]),
    ]),
    obj("protocolSection", "4. Five-Step Protocol", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      objList("steps", "Steps", "protocolStep", "Step", [
        str("number", "Number"),
        str("title", "Title"),
        txt("description", "Description"),
        str("duration", "Duration"),
        accentColor("color", "Number Colour"),
      ]),
    ]),
    seo(),
  ],
  preview: {
    prepare: () => ({ title: "Experiences Page" }),
  },
});
