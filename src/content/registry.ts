import { aboutDefaults } from "./about";
import { blogPageDefaults } from "./blog";
import { contactPageDefaults } from "./contact";
import { experiencesPageDefaults } from "./experiences";
import { hospitalityPageDefaults } from "./hospitality";
import { locationsPageDefaults } from "./locations";

// Every Sanity document whose content is seeded from this folder by
// scripts/sync-content-to-sanity.ts.
export const contentDocuments: {
  id: string;
  type: string;
  content: object;
}[] = [
  { id: "aboutPage", type: "aboutPage", content: aboutDefaults },
  {
    id: "experiencesPage",
    type: "experiencesPage",
    content: experiencesPageDefaults,
  },
  {
    id: "locationsPage",
    type: "locationsPage",
    content: locationsPageDefaults,
  },
  {
    id: "hospitalityPage",
    type: "hospitalityPage",
    content: hospitalityPageDefaults,
  },
  { id: "blogPage", type: "blogPage", content: blogPageDefaults },
  { id: "contactPage", type: "contactPage", content: contactPageDefaults },
];
