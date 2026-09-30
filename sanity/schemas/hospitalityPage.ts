import { defineField, defineType } from "sanity";
import {
  choice,
  img,
  linkObj,
  obj,
  objList,
  seo,
  str,
  strList,
  txt,
} from "./helpers";

// Mirrors src/content/hospitality.ts, top to bottom of the For Hotels page.
export default defineType({
  name: "hospitalityPage",
  title: "For Hotels Page",
  type: "document",
  fields: [
    obj("hero", "1. Hero", [
      str("eyebrow", "Small Label"),
      txt("heading", "Heading", 2),
      txt("description", "Description", 3),
      linkObj("primaryCta", "Main Button"),
      str("prospectusLabel", "Prospectus Button Label", {
        description: "e.g. DOWNLOAD PROSPECTUS",
      }),
      defineField({
        name: "prospectusPdf",
        title: "Prospectus PDF",
        type: "file",
        description:
          "Upload a PDF to show the prospectus button. Leave empty to hide it.",
        options: { accept: ".pdf,application/pdf" },
      }),
      strList("badges", "Trust Badges", { description: "Up to two." }),
      img("image", "Photo"),
      str("imageCaption", "Photo Caption"),
    ]),
    obj("statsSection", "2. Numbers Strip", [
      objList(
        "metrics",
        "Numbers",
        "metric",
        "Number",
        [
          str("value", "Value"),
          str("label", "Label"),
          str("description", "Description"),
        ],
        "label",
      ),
    ]),
    obj("modelsSection", "3. Partnership Models", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      objList("models", "Models", "model", "Model", [
        str("number", "Number"),
        str("pillLabel", "Tag"),
        defineField({
          name: "highlighted",
          title: "Highlight this card",
          type: "boolean",
        }),
        str("title", "Title"),
        txt("description", "Description"),
        strList("features", "Bullet Points"),
        str("ctaLabel", "Link Label"),
        str("ctaUrl", "Link"),
      ]),
    ]),
    obj("viabilitySection", "4. Commercial Viability", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      img("image", "Photo"),
      str("imageCaption", "Photo Caption"),
      objList(
        "stats",
        "Stat Cards",
        "stat",
        "Stat",
        [
          str("value", "Value"),
          str("label", "Label"),
          txt("description", "Description", 2),
        ],
        "label",
      ),
    ]),
    obj("transformationsSection", "5. Transformations", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      img("image", "Banner Photo"),
      objList("transformations", "Cards", "transformation", "Card", [
        str("location", "Location"),
        str("metric", "Result Tag"),
        defineField({
          name: "metricHighlighted",
          title: "Teal result tag",
          type: "boolean",
        }),
        str("title", "Title"),
        txt("description", "Description"),
        str("footerLabel", "Footer Label"),
      ]),
    ]),
    obj("assuranceSection", "6. Assurance", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      objList("pillars", "Cards", "assurancePillar", "Card", [
        choice("icon", "Icon", [
          ["certified", "Badge"],
          ["housing", "House"],
          ["closed-loop", "Recycle"],
          ["pms", "Arrows"],
        ]),
        str("title", "Title"),
        txt("description", "Description"),
      ]),
    ]),
    seo(),
  ],
  preview: {
    prepare: () => ({ title: "For Hotels Page" }),
  },
});
