import Link from "next/link";

import type { Experience } from "@/types/sanity";

interface ExperienceTreatmentListProps {
  treatments: NonNullable<Experience["treatments"]>;
  /** Lowest menu price (before GST) per treatment name, across all spas. */
  fromPrices: Map<string, number>;
  gstPercent: number;
}

const inr = (rupees: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);

/** The real treatments in an experience category, with "from" prices. */
export function ExperienceTreatmentList({
  treatments,
  fromPrices,
  gstPercent,
}: ExperienceTreatmentListProps) {
  const rows = treatments.filter((t) => t.name?.trim());
  if (rows.length === 0) return null;

  return (
    <section className="w-full bg-[#f7f9f7] py-16 md:py-20">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-2">
              Treatments &amp; Prices
            </p>
            <h2 className="font-serif text-3xl lg:text-[36px] leading-[1.2] text-kynta-charcoal">
              Choose your treatment
            </h2>
          </div>
          <p className="text-[12.5px] leading-[1.6] text-kynta-warm-gray max-w-sm md:text-right">
            Prices vary by spa. &ldquo;From&rdquo; is the lowest price across
            our spas{gstPercent > 0 ? `, before ${gstPercent}% GST` : ""}. You
            see the exact price for your spa when you book.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map((t) => {
            const from = fromPrices.get((t.name ?? "").trim().toLowerCase());
            return (
              <article
                key={t._key}
                className="flex flex-col bg-white rounded-[12px] border border-kynta-border/40 p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-serif text-[20px] leading-snug text-kynta-charcoal">
                    {t.name}
                  </h3>
                  {from !== undefined && (
                    <p className="text-right flex-shrink-0">
                      <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-kynta-warm-gray">
                        From
                      </span>
                      <span className="text-[16px] font-semibold text-kynta-teal-dark">
                        {inr(from)}
                      </span>
                    </p>
                  )}
                </div>
                {t.duration && (
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-kynta-rust mb-3">
                    {t.duration}
                  </p>
                )}
                {t.description && (
                  <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-4">
                    {t.description}
                  </p>
                )}
                {t.inclusions && t.inclusions.length > 0 && (
                  <ul className="mb-4 space-y-1 text-[12.5px] text-kynta-charcoal">
                    {t.inclusions.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-kynta-rust" aria-hidden="true">
                          ✦
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="/book"
                  className="mt-auto self-start text-[11px] font-bold tracking-[0.12em] uppercase text-kynta-teal-dark hover:text-kynta-teal transition-colors"
                >
                  Book this treatment →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
