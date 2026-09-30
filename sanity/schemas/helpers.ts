import { defineField } from "sanity";

// Small builders shared by the page schemas. Field names must match the
// content shapes in src/content/*.ts.

type Extra = { description?: string; group?: string };

export const str = (name: string, title: string, extra: Extra = {}) =>
  defineField({ name, title, type: "string", ...extra });

export const txt = (
  name: string,
  title: string,
  rows = 3,
  extra: Extra = {},
) => defineField({ name, title, type: "text", rows, ...extra });

export const img = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    ...extra,
  });

export const linkObj = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [str("label", "Label"), str("url", "Link")],
    ...extra,
  });

export const choice = (
  name: string,
  title: string,
  options: [value: string, label: string][],
  extra: Extra = {},
) =>
  defineField({
    name,
    title,
    type: "string",
    options: {
      list: options.map(([value, label]) => ({ title: label, value })),
    },
    ...extra,
  });

export const accentColor = (name: string, title: string) =>
  choice(name, title, [
    ["teal", "Teal"],
    ["rust", "Rust"],
  ]);

export const obj = (
  name: string,
  title: string,
  // biome-ignore lint/suspicious/noExplicitAny: Sanity field definitions
  fields: any[],
  extra: Extra = {},
) => defineField({ name, title, type: "object", fields, ...extra });

/** Array of objects; `itemName` becomes the `_type` of each item. */
export const objList = (
  name: string,
  title: string,
  itemName: string,
  itemTitle: string,
  // biome-ignore lint/suspicious/noExplicitAny: Sanity field definitions
  fields: any[],
  previewTitle = "title",
  extra: Extra = {},
) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineField({
        name: itemName,
        title: itemTitle,
        type: "object",
        fields,
        preview: { select: { title: previewTitle } },
      }),
    ],
    ...extra,
  });

export const strList = (name: string, title: string, extra: Extra = {}) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }], ...extra });

export const imgList = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineField({
        name: "image",
        title: "Image",
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({ name: "alt", title: "Alt Text", type: "string" }),
        ],
      }),
    ],
    options: { layout: "grid" },
    ...extra,
  });

export const seo = () =>
  obj(
    "seo",
    "SEO",
    [str("title", "SEO Title"), txt("description", "SEO Description", 2)],
    { description: "Browser tab title and search-engine description." },
  );
