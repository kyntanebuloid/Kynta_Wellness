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
export const DEFAULT_GST_PERCENT = 5;
/** Share of the total paid online for the "advance" option; the rest at the spa. */
export const DEFAULT_ADVANCE_PERCENT = 25;

/** Pay the full amount online, or an advance (token) now and the rest at the spa. */
export type PaymentPlan = "full" | "advance";
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
  plan: PaymentPlan = "full",
): string {
  const base = `menu:${slug}:${itemKey}:${minutes}:${guests}`;
  return plan === "advance" ? `${base}:advance` : base;
}

export function parseMenuRef(ref: string): {
  slug: string;
  itemKey: string;
  minutes: number;
  guests: number;
  plan: PaymentPlan;
} | null {
  const match =
    /^menu:([a-z0-9-]+):([A-Za-z0-9_-]+):(\d+):(\d+)(?::(advance))?$/.exec(ref);
  if (!match) return null;
  const minutes = Number(match[3]);
  const guests = Number(match[4]);
  if (!(minutes > 0) || guests < 1 || guests > MAX_GUESTS) return null;
  return {
    slug: match[1],
    itemKey: match[2],
    minutes,
    guests,
    plan: match[5] === "advance" ? "advance" : "full",
  };
}

/**
 * How much is paid online now and how much at the spa. "advance" pays the
 * advance % of the total (incl. GST) now; it falls back to full payment when
 * the advance option is switched off (0%).
 */
export function splitPayment(
  totalPaise: number,
  plan: PaymentPlan,
  advancePercent: number,
): { dueNowPaise: number; balancePaise: number; plan: PaymentPlan } {
  if (plan !== "advance" || advancePercent <= 0 || advancePercent >= 100) {
    return { dueNowPaise: totalPaise, balancePaise: 0, plan: "full" };
  }
  const dueNowPaise = Math.round((totalPaise * advancePercent) / 10_000) * 100;
  return {
    dueNowPaise,
    balancePaise: totalPaise - dueNowPaise,
    plan: "advance",
  };
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
  // Rounded to whole rupees so the shown and charged amounts always match.
  const taxPaise = Math.round((subtotalPaise * gstPercent) / 10_000) * 100;
  return {
    quantity,
    subtotalPaise,
    taxPaise,
    totalPaise: subtotalPaise + taxPaise,
  };
}

/** 0 switches the advance option off. */
export function advancePercentOrDefault(value: unknown): number {
  return typeof value === "number" && value >= 0 && value < 100
    ? value
    : DEFAULT_ADVANCE_PERCENT;
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
