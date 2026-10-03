"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  type LocationsPageContent,
  locationsPageDefaults,
} from "@/content/locations";
import { imageUrl, list, text } from "@/content/types";

type Destination = {
  id: string;
  image: string;
  price: string;
  title: string;
  region: "himalayan" | "rajasthan";
  facilities: string[];
  detailsHref: string;
  detailsLabel: string;
};

const facilityIcons: Record<string, React.ReactNode> = {
  spa: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Spa</title>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  dining: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Dining</title>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  pool: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Pool</title>
      <path d="M2 12h20" />
      <path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  ),
  wifi: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>WiFi</title>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  ),
  suite: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Suite</title>
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
      <path d="M10 19v-3.96 3.15" />
      <path d="M2 12h20" />
      <path d="M14 19v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
      <path d="M14 19h8" />
    </svg>
  ),
};

function ViewDots({ count = 4 }: { count?: number }) {
  return (
    <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={`dot-${i}-${count}`}
          className="block w-[5px] h-[5px] rounded-full"
          style={{
            backgroundColor:
              i === 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
          }}
        />
      ))}
    </div>
  );
}

function LocationCard({
  image,
  price,
  title,
  facilities,
  detailsHref,
  detailsLabel,
  aspectRatio = "4 / 3",
}: Destination & { aspectRatio?: string }) {
  return (
    <Link
      href={detailsHref}
      className="group relative block w-full overflow-hidden rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a]"
      style={{ aspectRatio }}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.05) 70%, transparent 100%)",
        }}
      />

      <ViewDots />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {price}
        </p>

        <h3 className="font-serif text-[20px] md:text-[22px] leading-[1.25] text-white mb-4">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/70">
            {facilities.map((f) => (
              <span key={f}>{facilityIcons[f]}</span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-white/90 group-hover:text-white transition-colors">
            {detailsLabel}
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Arrow</title>
              <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

interface LocationsSectionProps {
  page?: LocationsPageContent | null;
}

export function LocationsSection({ page }: LocationsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const d = locationsPageDefaults;
  const detailsLabel = text(page?.detailsLabel, d.detailsLabel);

  const mappedDestinations: Destination[] = list(
    page?.locations,
    d.locations,
  ).map((loc, i) => {
    const fallback =
      d.locations.find((l) => l.slug === loc.slug) ??
      d.locations[i % d.locations.length];
    const slug = loc.slug || loc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return {
      id: slug,
      image: loc.image?.url || loc.imagePath || imageUrl(fallback.image, {}),
      price: loc.price ?? "",
      title: loc.name,
      region: loc.region === "rajasthan" ? "rajasthan" : "himalayan",
      facilities: list(loc.services, fallback.services ?? []),
      detailsHref: loc.detailsUrl || `/locations/${slug}`,
      detailsLabel,
    };
  });

  const totalCount = mappedDestinations.length;
  const himachalCount = mappedDestinations.filter(
    (d) => d.region === "himalayan",
  ).length;
  const rajasthanCount = mappedDestinations.filter(
    (d) => d.region === "rajasthan",
  ).length;

  const labels = page?.filterLabels;
  const filters = [
    {
      key: "all",
      label: `${text(labels?.all, d.filterLabels.all)} (${totalCount})`,
    },
    {
      key: "himalayan",
      label: `${text(labels?.himalayan, d.filterLabels.himalayan)} (${himachalCount})`,
    },
    {
      key: "rajasthan",
      label: `${text(labels?.rajasthan, d.filterLabels.rajasthan)} (${rajasthanCount})`,
    },
  ] as const;

  const filtered =
    activeFilter === "all"
      ? mappedDestinations
      : mappedDestinations.filter((d) => d.region === activeFilter);

  const eyebrow = text(page?.hero?.eyebrow, d.hero.eyebrow);
  const headingHeading = text(page?.hero?.heading, d.hero.heading);
  const description = text(page?.hero?.subheading, d.hero.subheading);

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-kynta-charcoal">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "var(--kynta-rust)" }}
              aria-hidden="true"
            />
            {eyebrow}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-center mb-4 text-kynta-charcoal">
          <span style={{ color: "var(--kynta-teal)" }}>{headingHeading}</span>
        </h2>

        <p className="text-center mx-auto mb-8 max-w-xl text-[15px] leading-[1.7] text-kynta-warm-gray">
          {description}
        </p>

        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {filters.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className="text-[12px] font-medium tracking-wide px-5 py-2 rounded-full border transition-colors duration-150"
                style={{
                  backgroundColor: isActive
                    ? "var(--kynta-teal-dark)"
                    : "#f0eeeb",
                  color: isActive ? "#ffffff" : "#5a5a5a",
                  borderColor: isActive ? "var(--kynta-teal-dark)" : "#e4e0db",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d) => (
              <LocationCard key={d.id} {...d} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
