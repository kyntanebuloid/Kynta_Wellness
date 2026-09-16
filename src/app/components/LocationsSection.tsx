"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Destination = {
  id: string;
  image: string;
  price: string;
  title: string;
  region: "himalayan" | "rajasthan";
  facilities: string[];
  detailsHref: string;
};

const destinations: Destination[] = [
  {
    id: "indraprastha-dharamshala",
    image: "/location-indraprastha.jpg",
    price: "200$ / Night",
    title: "Indraprastha Resort Dharamshala",
    region: "himalayan",
    facilities: ["spa", "dining", "pool", "wifi", "suite"],
    detailsHref: "/locations/indraprastha-dharamshala",
  },
  {
    id: "asia-spa-dharamshala",
    image: "/location-asia-spa.jpg",
    price: "200$ / Night",
    title: "Asia spa & Resort - Dharamshala",
    region: "himalayan",
    facilities: ["spa", "dining", "pool", "wifi", "suite"],
    detailsHref: "/locations/asia-spa-dharamshala",
  },
  {
    id: "indraprastha-dalhousie",
    image: "/location-dalhousie.jpg",
    price: "200$ / Night",
    title: "Indraprastha spa Resorts - Dalhousie",
    region: "himalayan",
    facilities: ["spa", "dining", "pool", "wifi", "suite"],
    detailsHref: "/locations/indraprastha-dalhousie",
  },
  {
    id: "bhanjwar-palace",
    image: "/location-bhanjwar.jpg",
    price: "300$ / Night",
    title: "Bhanjwar Singh Palace Rajasthan",
    region: "rajasthan",
    facilities: ["spa", "dining", "pool", "wifi", "suite"],
    detailsHref: "/locations/bhanjwar-palace",
  },
  {
    id: "rawai-tents-pushkar",
    image: "/location-rawai-tents.jpg",
    price: "300$ / Night",
    title: "Rawai Luxury Tents - Pushkar",
    region: "rajasthan",
    facilities: ["spa", "dining", "pool", "wifi", "suite"],
    detailsHref: "/locations/rawai-tents",
  },
  {
    id: "infinitea-palampur",
    image: "/location-infinitea.jpg",
    price: "100$ / Night",
    title: "Infinitea Sports Club & Tea Garden Resort, Palampur",
    region: "himalayan",
    facilities: ["spa", "dining", "pool", "wifi", "suite"],
    detailsHref: "/locations/infinitea-palampur",
  },
];

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
  aspectRatio = "1 / 0.85",
}: Destination & { aspectRatio?: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[14px]"
      style={{ aspectRatio }}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
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

          <Link
            href={detailsHref}
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-white/90 hover:text-white transition-colors"
          >
            Details
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
          </Link>
        </div>
      </div>
    </div>
  );
}

const filters = [
  { key: "all", label: "All Enclaves (6)" },
  { key: "himalayan", label: "Himachal Pradesh (4)" },
  { key: "rajasthan", label: "Rajasthan (2)" },
  { key: "facilities", label: "Filter Facilities" },
] as const;

interface LocationsSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
  };
  locations?: {
    name: string;
    address: string;
    region: string;
    hours?: string;
    phone?: string;
    email?: string;
    image?: {
      _type: "image";
      asset: { _ref: string; _type: "reference" };
      alt?: string;
    };
    services?: string[];
  }[];
}

export function LocationsSection({
  data,
  locations: sanityLocations,
}: LocationsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const mappedDestinations: Destination[] = sanityLocations
    ? sanityLocations.map((loc, i) => ({
        id: loc.name.toLowerCase().replace(/\s+/g, "-"),
        image: loc.image?.asset?._ref
          ? `/locations/${loc.name.toLowerCase().replace(/\s+/g, "-")}.jpg`
          : destinations[i % destinations.length].image,
        price: `${loc.region === "rajasthan" ? "300" : "200"}$ / Night`,
        title: loc.name,
        region: loc.region.toLowerCase().includes("rajasthan")
          ? "rajasthan"
          : "himalayan",
        facilities: loc.services?.length
          ? loc.services
          : ["spa", "dining", "pool", "wifi", "suite"],
        detailsHref: `/locations/${loc.name.toLowerCase().replace(/\s+/g, "-")}`,
      }))
    : destinations;

  const filtered =
    activeFilter === "all" || activeFilter === "facilities"
      ? mappedDestinations
      : mappedDestinations.filter((d) => d.region === activeFilter);

  const row1 = filtered.slice(0, 3);
  const row2 = filtered.slice(3, 5);
  const row3 = filtered.slice(5, 6);

  const eyebrow = data?.eyebrow || "Sanctuary Enclaves & Destinations";
  const headingHeading = data?.heading || "Spas & Sanctuary Locations";
  const description =
    data?.subheading ||
    "Five sacred havens engineered across tranquil Himalayan cedar valleys, royal heritage courtyards, and silent desert dunes — each offering NABH-certified classical Ayurvedic rejuvenation.";

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal">
            <span
              className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ backgroundColor: "var(--kynta-rust)" }}
              aria-hidden="true"
            />
            {eyebrow}
          </span>
        </div>

        <h2
          className="font-serif text-center leading-[1.18] mb-4"
          style={{
            fontSize: "clamp(30px, 3.5vw, 48px)",
            color: "var(--kynta-charcoal)",
          }}
        >
          <span style={{ color: "var(--kynta-teal)" }}>{headingHeading}</span>
        </h2>

        <p
          className="text-center mx-auto mb-8"
          style={{
            maxWidth: "520px",
            fontSize: "14px",
            lineHeight: "1.75",
            color: "var(--kynta-warm-gray)",
          }}
        >
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

        {row1.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {row1.map((d) => (
              <LocationCard key={d.id} {...d} aspectRatio="1 / 0.9" />
            ))}
          </div>
        )}

        {row2.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {row2.map((d) => (
              <LocationCard key={d.id} {...d} aspectRatio="1 / 0.7" />
            ))}
          </div>
        )}

        {row3.length > 0 && (
          <div className="grid grid-cols-1 gap-5">
            {row3.map((d) => (
              <LocationCard key={d.id} {...d} aspectRatio="16 / 6" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
