// Spa menus: each location in Sanity (Pages → Locations → Booking Menu) lists
// its treatments with a price per duration. Shared by the booking form (to
// show the price) and the server (to charge it), so both always agree.

export type MenuCategory =
  | "sojourn"
  | "couple"
  | "massage"
  | "glamour"
  | "rapid";

export const MENU_CATEGORY_LABELS: Record<MenuCategory, string> = {
  sojourn: "Spa Sojourns",
  couple: "Couple Spa",
  massage: "Massage Selections",
  glamour: "Glamour Glow",
  rapid: "Rapid Relax",
};

/** Used when the GST field in Sanity is empty (menus say "taxes extra"). */
export const DEFAULT_GST_PERCENT = 18;
export const MAX_GUESTS = 6;

/**
 * What a booking stores in `experience_id` for a menu treatment:
 * menu:<location slug>:<treatment key>:<minutes>:<guests>.
 * The server reads the price for this from Sanity; nothing is trusted from
 * the browser except the choice itself.
 */
export function menuRef(
  slug: string,
  itemKey: string,
  minutes: number,
  guests: number,
): string {
  return `menu:${slug}:${itemKey}:${minutes}:${guests}`;
}

export function parseMenuRef(ref: string): {
  slug: string;
  itemKey: string;
  minutes: number;
  guests: number;
} | null {
  const match = /^menu:([a-z0-9-]+):([A-Za-z0-9_-]+):(\d+):(\d+)$/.exec(ref);
  if (!match) return null;
  const minutes = Number(match[3]);
  const guests = Number(match[4]);
  if (!(minutes > 0) || guests < 1 || guests > MAX_GUESTS) return null;
  return { slug: match[1], itemKey: match[2], minutes, guests };
}

export type MenuQuote = {
  /** How many times the menu price is charged. */
  quantity: number;
  subtotalPaise: number;
  taxPaise: number;
  totalPaise: number;
};

/**
 * Couple treatments are one booking for two people: charged twice when the
 * price is "each", once otherwise. Everything else is charged per guest.
 */
export function quoteMenuItem({
  price,
  category,
  perPerson,
  guests,
  gstPercent,
}: {
  price: number;
  category?: string | null;
  perPerson?: boolean | null;
  guests: number;
  gstPercent: number;
}): MenuQuote {
  const quantity = category === "couple" ? (perPerson ? 2 : 1) : guests;
  const subtotalPaise = Math.round(price * 100) * quantity;
  const taxPaise = Math.round((subtotalPaise * gstPercent) / 100);
  return {
    quantity,
    subtotalPaise,
    taxPaise,
    totalPaise: subtotalPaise + taxPaise,
  };
}

export function gstPercentOrDefault(value: unknown): number {
  return typeof value === "number" && value >= 0 && value <= 28
    ? value
    : DEFAULT_GST_PERCENT;
}

/** A location's slug, or one made from its name (form and server agree). */
export function locationSlugOf(location: {
  slug?: string | null;
  name: string;
}): string {
  return (
    location.slug ||
    location.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}
