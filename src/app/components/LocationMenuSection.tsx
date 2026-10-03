import Link from "next/link";

import type { LocationDetail } from "@/content/locations";
import { MENU_CATEGORY_LABELS, type MenuCategory } from "@/lib/booking/menu";

interface LocationMenuSectionProps {
  location: LocationDetail;
  gstPercent: number;
}

const inr = (rupees: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);

const CATEGORY_ORDER = Object.keys(MENU_CATEGORY_LABELS) as MenuCategory[];

/** This spa's own treatments, prices and membership plans, from its menu. */
export function LocationMenuSection({
  location,
  gstPercent,
}: LocationMenuSectionProps) {
  const menu = location.menu.filter(
    (item) => item.name && (item.options ?? []).some((o) => o.price > 0),
  );
  if (menu.length === 0) return null;

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    label: MENU_CATEGORY_LABELS[category],
    items: menu.filter((item) => (item.category ?? "massage") === category),
  })).filter((group) => group.items.length > 0);
  const plans = location.membership.filter((p) => p.plan && p.pay > 0);

  return (
    <section className="w-full bg-white py-16 md:py-20" id="spa-menu">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-2">
              Spa Menu
            </p>
            <h2 className="font-serif text-3xl lg:text-[36px] leading-[1.2] text-kynta-charcoal">
              Treatments &amp; Prices at {location.name}
            </h2>
          </div>
          <p className="text-[12.5px] leading-[1.6] text-kynta-warm-gray max-w-sm md:text-right">
            Prices at this spa, in ₹
            {gstPercent > 0 ? `, plus ${gstPercent}% GST` : ""}. Book online and
            pay in full or a 25% advance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-kynta-teal-dark border-b border-kynta-border/60 pb-2 mb-3">
                {group.label}
              </h3>
              <ul className="divide-y divide-kynta-border/30">
                {group.items.map((item) => (
                  <li
                    key={item._key}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <span className="font-serif text-[16px] text-kynta-charcoal">
                      {item.name}
                      {item.perPerson && (
                        <span className="ml-2 text-[11px] font-sans text-kynta-warm-gray">
                          (each)
                        </span>
                      )}
                    </span>
                    <span className="text-right text-[13px] text-kynta-charcoal whitespace-nowrap">
                      {(item.options ?? [])
                        .filter((o) => o.price > 0)
                        .map((o) => (
                          <span key={o.minutes} className="ml-3 inline-block">
                            <span className="text-kynta-warm-gray">
                              {o.minutes} min
                            </span>{" "}
                            <span className="font-semibold">
                              {inr(o.price)}
                            </span>
                          </span>
                        ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {plans.length > 0 && (
          <div className="mt-12 rounded-[14px] border border-kynta-border/50 bg-[#f7f9f7] p-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
              <h3 className="font-serif text-[22px] text-kynta-charcoal">
                Kynta Revibe Membership at this spa
              </h3>
              <p className="text-[12px] text-kynta-warm-gray">
                Prepaid, plus taxes. Ask at the spa or call us.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plans.map((p) => (
                <div
                  key={p._key ?? p.plan}
                  className="rounded-[10px] bg-white border border-kynta-border/40 p-4"
                >
                  <p className="font-serif text-[18px] text-kynta-charcoal">
                    {p.plan}
                  </p>
                  <p className="text-[13px] text-kynta-charcoal mt-1">
                    Pay <strong>{inr(p.pay)}</strong>, get{" "}
                    <strong>{inr(p.openingBalance)}</strong>
                  </p>
                  <p className="text-[12px] text-kynta-warm-gray mt-1">
                    {p.discount ? `${p.discount} off · ` : ""}
                    {p.services ? `about ${p.services} services · ` : ""}
                    {p.validityMonths ? `${p.validityMonths} months` : ""}
                  </p>
                </div>
              ))}
            </div>
            {location.membershipBasePrice ? (
              <p className="mt-3 text-[11.5px] text-kynta-warm-gray">
                Services worked out on a 60-minute Swedish Massage at{" "}
                {inr(location.membershipBasePrice)}.
              </p>
            ) : null}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/book"
            className="px-6 py-3 text-[11px] font-bold tracking-[0.12em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors"
          >
            Book a Treatment
          </Link>
          <Link
            href="/experiences"
            className="px-6 py-3 text-[11px] font-bold tracking-[0.12em] uppercase text-kynta-teal-dark border border-kynta-teal-dark rounded-md hover:bg-kynta-teal-dark hover:text-white transition-colors"
          >
            About the Treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
