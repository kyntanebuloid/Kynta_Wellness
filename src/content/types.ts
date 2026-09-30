// Shapes shared by page content. Sanity documents are converted to these
// shapes in src/lib/sanity/data.ts (images become plain URLs), and the
// built-in defaults in this folder use the same shapes, so a component can
// fall back field by field.

export interface ContentImage {
  url?: string | null;
  alt?: string | null;
}

export interface ContentLink {
  label?: string;
  url?: string;
}

export type AccentColor = "teal" | "rust";

/** Returns the CMS value unless it is missing or blank. */
export function text<T extends string>(
  value: T | null | undefined,
  fallback: T,
): T {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

/** Returns the CMS list unless it is missing or empty. */
export function list<T>(value: T[] | null | undefined, fallback: T[]): T[] {
  return Array.isArray(value) && value.length > 0 ? value : fallback;
}

/** Image URL from the CMS, or the built-in image. */
export function imageUrl(
  value: ContentImage | null | undefined,
  fallback: ContentImage,
): string {
  return value?.url || fallback.url || "";
}

export function imageAlt(
  value: ContentImage | null | undefined,
  fallback: ContentImage,
): string {
  return value?.alt || fallback.alt || "";
}

export function link(
  value: ContentLink | null | undefined,
  fallback: Required<ContentLink>,
): Required<ContentLink> {
  return {
    label: text(value?.label, fallback.label),
    url: text(value?.url, fallback.url),
  };
}
