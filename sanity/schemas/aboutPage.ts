import { defineField, defineType } from "sanity";
import {
  accentColor,
  choice,
  img,
  imgList,
  linkObj,
  obj,
  objList,
  seo,
  str,
  txt,
} from "./helpers";

// Mirrors src/content/about.ts, top to bottom of the About page.
export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    obj("hero", "1. Hero", [
      str("eyebrow", "Small Label"),
      txt("heading", "Heading", 2, {
        description: "Press Enter to start a new line.",
      }),
      txt("description", "Description", 4),
      str("philosophyLabel", "Philosophy Button Label", {
        description: "e.g. Explore Our Philosophy",
      }),
      defineField({
        name: "philosophyPdf",
        title: "Philosophy PDF",
        type: "file",
        description:
          "Upload a PDF to show the philosophy button. Leave empty to hide it.",
        options: { accept: ".pdf,application/pdf" },
      }),

      linkObj("secondaryCta", "Second Button"),
      img("image", "Photo"),
      str("imageCaption", "Photo Caption"),
      str("badgeLabel", "Badge – Small Label"),
      txt("badgeText", "Badge – Text", 2),
      objList(
        "stats",
        "Numbers",
        "stat",
        "Number",
        [
          str("value", "Value"),
          str("label", "Label"),
          txt("description", "Description", 2),
        ],
        "label",
      ),
    ]),
    obj("triadSection", "2. Three Pillars", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description"),
      objList("cards", "Cards", "triadCard", "Card", [
        str("number", "Number", { description: "e.g. 01" }),
        str("title", "Title"),
        txt("description", "Description", 4),
        img("image", "Photo"),
        accentColor("iconColor", "Icon Colour"),
        str("footerLabel", "Footer Label"),
        str("footerValue", "Footer Value"),
        accentColor("footerValueColor", "Footer Value Colour"),
      ]),
    ]),
    obj("timelineSection", "3. Timeline", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description"),
      objList("milestones", "Milestones", "milestone", "Milestone", [
        str("year", "Year"),
        str("title", "Title"),
        txt("description", "Description"),
        str("category", "Category"),
        accentColor("categoryColor", "Category Colour"),
        accentColor("dotColor", "Timeline Dot Colour"),
        choice("icon", "Icon", [
          ["botanical", "Botanical"],
          ["blueprint", "Blueprint"],
          ["hospitality", "Hospitality"],
          ["alpine", "Mountain"],
          ["standard", "Compass"],
        ]),
        img("image", "Photo"),
      ]),
    ]),
    obj("leadershipSection", "4. Leadership", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description"),
      objList(
        "members",
        "Team Members",
        "member",
        "Team Member",
        [
          str("name", "Name"),
          str("role", "Role"),
          txt("bio", "Bio"),
          choice("credentialIcon", "Credential Icon", [
            ["hospitality", "Shield"],
            ["protocol", "Briefcase"],
            ["architecture", "Pencil"],
          ]),
          str("credentialText", "Credential"),
          img("image", "Photo"),
        ],
        "name",
      ),
    ]),
    obj("stewardshipSection", "5. Stewardship", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 4),
      objList("features", "Checklist", "feature", "Item", [
        str("title", "Title"),
        txt("description", "Description", 2),
      ]),
      imgList("images", "Photos", {
        description:
          "Four photos: top-left, bottom-left, top-right, bottom-right.",
      }),
    ]),
    obj("accreditationsSection", "6. Accreditations", [
      str("heading", "Heading"),
      objList("awards", "Awards", "award", "Award", [
        str("title", "Title"),
        str("subtitle", "Subtitle"),
        choice("icon", "Icon", [
          ["medal", "Medal"],
          ["shield", "Shield"],
          ["star", "Star"],
          ["eco", "Recycle"],
        ]),
      ]),
    ]),
    seo(),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
