import { defineType } from "sanity";
import { choice, img, obj, objList, seo, str, strList, txt } from "./helpers";

// Mirrors src/content/contact.ts, top to bottom of the Contact page.
export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    obj("hero", "1. Heading", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("subheading", "Description"),
    ]),
    obj("desks", "2. Contact Details (left column)", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      objList(
        "phones",
        "Phone Numbers",
        "phoneRow",
        "Phone Number",
        [
          choice("kind", "Type", [
            ["phone", "Phone call"],
            ["whatsapp", "WhatsApp"],
          ]),
          str("label", "Label", {
            description: "e.g. PRIVATE GUEST CONCIERGE",
          }),
          str("number", "Number", {
            description: "With country code, e.g. +91 72503 33494",
          }),
          str("note", "Note on the right", {
            description:
              "e.g. hours for a phone, INSTANT for WhatsApp. Optional.",
          }),
        ],
        "number",
        {
          description:
            "Add as many as needed. Rows without a number are skipped; with none, this part is hidden.",
        },
      ),
      str("emailHeading", "Emails – Heading"),
      objList(
        "emails",
        "Emails",
        "emailRow",
        "Email",
        [str("label", "Label"), str("email", "Email Address")],
        "email",
        {
          description:
            "Add as many as needed. Rows without an address are skipped; with none, the email box is hidden.",
        },
      ),
      img("image", "Photo"),
      str("imageLabel", "Photo – Small Label"),
      str("imageCaption", "Photo – Caption"),
      str("hoursHeading", "Hours – Heading"),
      txt("hoursText", "Hours – Text", 3),
    ]),
    obj("form", "3. Enquiry Form (right column)", [
      str("eyebrow", "Small Label"),
      str("heading", "Heading"),
      txt("description", "Description", 2),
      strList("tabs", "Tabs", { description: "Three enquiry types." }),
      str("nameLabel", "Name – Label"),
      str("namePlaceholder", "Name – Placeholder"),
      str("emailLabel", "Email – Label"),
      str("emailPlaceholder", "Email – Placeholder"),
      str("phoneLabel", "Phone – Label"),
      str("phonePlaceholder", "Phone – Placeholder"),
      str("sanctuaryLabel", "Sanctuary – Label"),
      str("sanctuaryPlaceholder", "Sanctuary – Placeholder"),
      strList("sanctuaries", "Sanctuary Options"),
      str("intentLabel", "Intent – Label"),
      str("intentDefault", "Intent – Pre-filled Text"),
      str("datesLabel", "Dates – Label"),
      str("datesPlaceholder", "Dates – Placeholder"),
      str("messageLabel", "Message – Label"),
      txt("messagePlaceholder", "Message – Placeholder", 2),
      str("privacyNote", "Privacy Note"),
      str("submitLabel", "Submit Button"),
      txt("successMessage", "Thank-you Message", 2),
    ]),
    seo(),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
