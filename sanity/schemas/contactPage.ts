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
    obj(
      "form",
      "3. Enquiry Form (right column)",
      [
        str("eyebrow", "Small Label"),
        str("heading", "Heading"),
        txt("description", "Description", 2),
        strList("tabs", "Tabs", {
          description:
            "Exactly two: the guest form first, then the hotel / resort form.",
        }),
        str("nameLabel", "Name – Label"),
        str("namePlaceholder", "Name – Placeholder"),
        str("emailLabel", "Email – Label"),
        str("emailPlaceholder", "Email – Placeholder"),
        str("phoneLabel", "Phone – Label"),
        str("phonePlaceholder", "Phone – Placeholder"),
        str("sanctuaryLabel", "Guest: Preferred Spa – Label"),
        str("sanctuaryPlaceholder", "Guest: Preferred Spa – Placeholder"),
        strList("sanctuaries", "Guest: Preferred Spa – Options", {
          description:
            "Leave empty to list the spas from the Locations page automatically.",
        }),
        str("propertyLabel", "Hotel: Property Name – Label"),
        str("propertyPlaceholder", "Hotel: Property Name – Placeholder"),
        str("cityLabel", "Hotel: City – Label"),
        str("cityPlaceholder", "Hotel: City – Placeholder"),
        str("serviceLabel", "Hotel: Service – Label"),
        str("servicePlaceholder", "Hotel: Service – Placeholder"),
        strList("hotelServices", "Hotel: Service – Options", {
          description:
            "Keep the first three in the same order as the For Hotels partnership models (turnkey, design, licensing): their buttons open this form with that option picked.",
        }),
        str("messageLabel", "Message – Label"),
        txt("messagePlaceholder", "Guest: Message – Placeholder", 2),
        txt("hotelMessagePlaceholder", "Hotel: Message – Placeholder", 2),
        str("privacyNote", "Privacy Note"),
        str("submitLabel", "Submit Button"),
        txt("successMessage", "Thank-you Message", 2),
        txt("errorMessage", "Error Message", 2, {
          description: "Shown if the message could not be sent.",
        }),
      ],
      {
        description:
          "Messages are emailed to CONTACT_EMAIL (or BOOKING_OWNER_EMAIL) set in Vercel.",
      },
    ),
    seo(),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
