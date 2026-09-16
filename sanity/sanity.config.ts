import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

export default defineConfig({
  name: "kynta",
  title: "Kynta Wellness",
  projectId,
  dataset,
  plugins: [
    structureTool({
      name: "structure",
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.listItem()
              .title("Pages")
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Homepage")
                      .child(
                        S.document()
                          .schemaType("homepage")
                          .documentId("homepage"),
                      ),
                    S.listItem()
                      .title("Experiences")
                      .child(
                        S.document()
                          .schemaType("experiencesPage")
                          .documentId("experiencesPage"),
                      ),
                    S.listItem()
                      .title("Locations")
                      .child(
                        S.document()
                          .schemaType("locationsPage")
                          .documentId("locationsPage"),
                      ),
                    S.listItem()
                      .title("About")
                      .child(
                        S.document()
                          .schemaType("aboutPage")
                          .documentId("aboutPage"),
                      ),
                    S.listItem()
                      .title("Hospitality")
                      .child(
                        S.document()
                          .schemaType("hospitalityPage")
                          .documentId("hospitalityPage"),
                      ),
                    S.listItem()
                      .title("Blog")
                      .child(
                        S.document()
                          .schemaType("blogPage")
                          .documentId("blogPage"),
                      ),
                    S.listItem()
                      .title("Contact")
                      .child(
                        S.document()
                          .schemaType("contactPage")
                          .documentId("contactPage"),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Services & Treatments")
              .child(
                S.list()
                  .title("Services & Treatments")
                  .items([
                    S.listItem()
                      .title("Services")
                      .child(S.documentTypeList("service").title("Services")),
                    S.listItem()
                      .title("Treatments")
                      .child(
                        S.documentTypeList("treatment").title("Treatments"),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Blog Posts")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
            S.listItem()
              .title("Testimonials")
              .child(S.documentTypeList("testimonial").title("Testimonials")),
            S.listItem()
              .title("FAQs")
              .child(S.documentTypeList("faq").title("FAQs")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
