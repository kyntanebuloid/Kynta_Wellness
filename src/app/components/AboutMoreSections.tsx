import Image from "next/image";
import Link from "next/link";

import { type AboutPageContent, aboutDefaults } from "@/content/about";
import type { LocationContent } from "@/content/locations";
import { list, text } from "@/content/types";
import { locationSlugOf } from "@/lib/booking/menu";
import type { Experience } from "@/types/sanity";
import { NoPhoto } from "./NoPhoto";

function SectionHeading({
  eyebrow,
  heading,
  description,
  center = false,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  center?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl mb-10 md:mb-12 ${center ? "mx-auto text-center" : ""}`}
    >
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-3">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-4">
        {heading}
      </h2>
      <p className="text-[14.5px] leading-[1.75] text-kynta-warm-gray">
        {description}
      </p>
    </div>
  );
}

/** The five values printed on every Kynta menu. */
export function AboutValuesSection({
  data,
}: {
  data?: AboutPageContent["valuesSection"];
}) {
  const d = aboutDefaults.valuesSection;
  const values = list(data?.values, d.values);
  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="container-site">
        <SectionHeading
          center
          eyebrow={text(data?.eyebrow, d.eyebrow)}
          heading={text(data?.heading, d.heading)}
          description={text(data?.description, d.description)}
        />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          data-reveal-stagger
        >
          {values.map((value, index) => (
            <div
              key={value.title}
              className="rounded-[14px] border border-kynta-border/40 bg-[#f7f9f7] p-6 text-center"
            >
              <p className="font-serif text-[13px] text-kynta-rust mb-2">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-[22px] text-kynta-charcoal mb-2">
                {value.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-kynta-warm-gray">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Same order as the printed menu.
const MENU_ORDER = [
  "spa-sojourns",
  "couple-spa",
  "massage-selections",
  "glamour-glow",
  "rapid-relax",
];

/** The real treatment categories, from the experience pages. */
export function AboutTreatmentsSection({
  data,
  experiences,
}: {
  data?: AboutPageContent["treatmentsSection"];
  experiences: Experience[];
}) {
  const d = aboutDefaults.treatmentsSection;
  const cards = experiences
    .filter((e) => e.slug?.current)
    .sort(
      (a, b) =>
        ((MENU_ORDER.indexOf(a.slug.current) + 99) % 99) -
        ((MENU_ORDER.indexOf(b.slug.current) + 99) % 99),
    );
  if (cards.length === 0) return null;

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <SectionHeading
          eyebrow={text(data?.eyebrow, d.eyebrow)}
          heading={text(data?.heading, d.heading)}
          description={text(data?.description, d.description)}
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-reveal-stagger
        >
          {cards.map((e) => (
            <Link
              key={e._id}
              href={`/experiences/${e.slug.current}`}
              className="group flex flex-col rounded-[14px] border border-kynta-border/40 bg-white p-6 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="font-serif text-[22px] text-kynta-charcoal group-hover:text-kynta-teal-dark transition-colors">
                  {e.title}
                </h3>
                {e.price && (
                  <span className="text-[12px] font-semibold text-kynta-teal-dark whitespace-nowrap">
                    {e.price}
                  </span>
                )}
              </div>
              {e.duration && (
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-kynta-rust mb-3">
                  {e.duration}
                </p>
              )}
              <p className="text-[13px] leading-[1.7] text-kynta-warm-gray line-clamp-4 mb-4">
                {e.description}
              </p>
              {e.highlights && e.highlights.length > 0 && (
                <p className="mt-auto text-[11px] tracking-[0.08em] uppercase text-kynta-charcoal/70">
                  {e.highlights.join(" • ")}
                </p>
              )}
            </Link>
          ))}
          <Link
            href="/experiences#good-to-know"
            className="flex flex-col justify-center rounded-[14px] bg-kynta-teal-dark p-6 text-white hover:bg-kynta-teal transition-colors"
          >
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/70 mb-2">
              Before You Visit
            </p>
            <p className="font-serif text-[22px] leading-snug mb-2">
              Membership, spa etiquette &amp; good to know
            </p>
            <p className="text-[13px] text-white/80">
              Kynta Revibe plans, cancellation rules and everything else from
              our menu →
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

/** All Kynta spas, from the Locations page. */
export function AboutSpasSection({
  data,
  locations,
}: {
  data?: AboutPageContent["spasSection"];
  locations: LocationContent[];
}) {
  const d = aboutDefaults.spasSection;
  if (locations.length === 0) return null;
  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow={text(data?.eyebrow, d.eyebrow)}
          heading={text(data?.heading, d.heading)}
          description={text(data?.description, d.description)}
        />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-reveal-stagger
        >
          {locations.map((l) => {
            const photo = l.image?.url || l.imagePath;
            return (
              <Link
                key={locationSlugOf(l)}
                href={l.detailsUrl || `/locations/${locationSlugOf(l)}`}
                className="group block overflow-hidden rounded-[14px] border border-kynta-border/40 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe8e1]">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={l.image?.alt || l.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <NoPhoto title={l.name} label="Photo coming soon" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-[19px] leading-snug text-kynta-charcoal mb-1.5 group-hover:text-kynta-teal-dark transition-colors">
                    {l.name}
                  </h3>
                  {l.address && (
                    <p className="text-[12.5px] leading-[1.6] text-kynta-warm-gray mb-2">
                      {l.address}
                    </p>
                  )}
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-kynta-rust">
                    {[l.price, l.hours].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Closing banner: book, explore, or call. */
export function AboutCtaSection({
  data,
}: {
  data?: AboutPageContent["ctaSection"];
}) {
  const d = aboutDefaults.ctaSection;
  const primary = {
    label: text(data?.primaryCta?.label, d.primaryCta.label),
    url: text(data?.primaryCta?.url, d.primaryCta.url),
  };
  const secondary = {
    label: text(data?.secondaryCta?.label, d.secondaryCta.label),
    url: text(data?.secondaryCta?.url, d.secondaryCta.url),
  };
  return (
    <section className="w-full bg-kynta-teal-dark py-16 md:py-20">
      <div className="container-site text-center text-white">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/70 mb-3">
          {text(data?.eyebrow, d.eyebrow)}
        </p>
        <h2 className="font-serif text-3xl lg:text-[40px] leading-[1.2] mb-4 max-w-2xl mx-auto">
          {text(data?.heading, d.heading)}
        </h2>
        <p className="text-[14.5px] leading-[1.75] text-white/80 max-w-2xl mx-auto mb-8">
          {text(data?.description, d.description)}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={primary.url}
            className="px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase bg-white text-kynta-teal-dark rounded-md hover:bg-kynta-section-bg transition-colors"
          >
            {primary.label}
          </Link>
          <Link
            href={secondary.url}
            className="px-7 py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase border border-white/60 text-white rounded-md hover:bg-white/10 transition-colors"
          >
            {secondary.label}
          </Link>
        </div>
        <p className="mt-6 text-[12.5px] text-white/70">
          {text(data?.note, d.note)}
        </p>
      </div>
    </section>
  );
}
