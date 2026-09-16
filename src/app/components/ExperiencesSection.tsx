"use client";

import Image from "next/image";
import { useState } from "react";

interface ExperiencesSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    filters?: {
      label: string;
      value: string;
    }[];
    experiences?: {
      title: string;
      description: string;
      category: string;
      image?: string;
      duration?: string;
      price?: string;
    }[];
  };
}

const defaultCategories = [
  "All Experiences",
  "Signature Rituals",
  "Hydrothermal & Thermal Baths",
  "Multi-Day Retreats",
  "Couples & Duets",
  "Sound & Meditative Immersion",
];

export function ExperiencesSection({ data }: ExperiencesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All Experiences");

  const filters = data?.filters?.map((f) => f.value) || defaultCategories;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        {/* ── Pill Eyebrow ── */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase px-5 py-2.5 rounded-full border"
            style={{
              color: "#3a3a3a",
              borderColor: "#d6d1ca",
              backgroundColor: "#ffffff",
            }}
          >
            <span
              className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ backgroundColor: "#b0603a" }}
              aria-hidden="true"
            />
            {data?.eyebrow ||
              "Curated Experiences &amp; Restorative Rituals &nbsp;·&nbsp; Vedic Medicine &amp; Hydrotherapy"}
          </span>
        </div>

        {/* ── Heading ── */}
        <h2
          className="font-serif text-center leading-[1.18] mb-5"
          style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            color: "var(--kynta-charcoal)",
          }}
        >
          <em
            className="not-italic font-serif italic"
            style={{ color: "var(--kynta-teal)" }}
          >
            {data?.heading?.split(" ").slice(0, 2).join(" ") ||
              "Transformative Journeys"}
          </em>{" "}
          {data?.heading?.split(" ").slice(2).join(" ") || "Crafted"}
          <br />
          {data?.subheading || "for Body &amp; Mind."}
        </h2>

        {/* ── Description ── */}
        <p
          className="text-center mx-auto mb-10"
          style={{
            maxWidth: "560px",
            fontSize: "15px",
            lineHeight: "1.75",
            color: "var(--kynta-warm-gray)",
          }}
        >
          {data?.subheading ||
            "From single bespoke somatic rituals to multi-day immersive detox retreats across India's most extraordinary palace hotels and secluded eco-resorts."}
        </p>

        {/* ── Category Filter Pills ── */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {filters.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className="text-[13px] font-medium tracking-wide px-5 py-2 rounded-full border transition-colors duration-150"
                style={{
                  backgroundColor: isActive
                    ? "var(--kynta-teal-dark)"
                    : "#f0eeeb",
                  color: isActive ? "#ffffff" : "#5a5a5a",
                  borderColor: isActive ? "var(--kynta-teal-dark)" : "#e4e0db",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Featured Experience Card ── */}
        <div className="flex justify-center">
          <div
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: "818px",
              borderRadius: "14px",
              aspectRatio: "818 / 370",
            }}
          >
            {/* Image */}
            <Image
              src={
                data?.experiences?.[0]?.image ||
                "/experience-hydro-colonnade.jpg"
              }
              alt={
                data?.experiences?.[0]?.title ||
                "The Royal Stepped Hydro-Colonnade"
              }
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 818px"
              priority
            />

            {/* Dark gradient overlay for readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.05) 70%, transparent 100%)",
              }}
            />

            {/* Feature pills – top-left */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.92)",
                  color: "#2c2c2c",
                  backdropFilter: "blur(4px)",
                }}
              >
                {/* Sound wave icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Acoustic</title>
                  <path d="M2 10v4" />
                  <path d="M6 6v12" />
                  <path d="M10 8v8" />
                  <path d="M14 4v16" />
                  <path d="M18 8v8" />
                  <path d="M22 10v4" />
                </svg>
                Acoustic Silence &lt; 24dB
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.92)",
                  color: "#2c2c2c",
                  backdropFilter: "blur(4px)",
                }}
              >
                {/* Leaf/herb icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Herbals</title>
                  <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z" />
                  <path d="M12 6v12" />
                  <path d="M8 10l4-4 4 4" />
                </svg>
                Single-Batch Cold Pressed Herbals
              </span>
            </div>

            {/* Bottom content row */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 md:p-7">
              {/* Left – text content */}
              <div className="max-w-[420px]">
                <p
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {data?.experiences?.[0]?.category || "Spatial Architecture"}
                </p>
                <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.2] text-white mb-2">
                  {data?.experiences?.[0]?.title ||
                    "The Royal Stepped Hydro-Colonnade"}
                </h3>
                <p
                  className="text-[13px] leading-[1.6]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {data?.experiences?.[0]?.description ||
                    "Natural sandstone pavilions calibrated with thermostatic plunge chambers and sound-dampened lime plaster vaults."}
                </p>
              </div>

              {/* Right – CTA button */}
              <a
                href="/book"
                className="flex-shrink-0 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase px-5 py-3 rounded-md bg-white hover:bg-gray-50 transition-colors"
                style={{ color: "#2c2c2c" }}
              >
                Book an Immersion
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>External link</title>
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
