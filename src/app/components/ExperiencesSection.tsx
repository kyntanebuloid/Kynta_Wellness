"use client";

import Image from "next/image";
import { useState } from "react";
import {
  type ExperiencesPageContent,
  experiencesPageDefaults,
} from "@/content/experiences";
import { imageAlt, imageUrl, list, text } from "@/content/types";

interface ExperiencesSectionProps {
  data?: ExperiencesPageContent["hero"];
}

export function ExperiencesSection({ data }: ExperiencesSectionProps) {
  const d = experiencesPageDefaults.hero;
  const filters = list(data?.filters, d.filters);
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);

  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const headingItalic = text(data?.headingItalic, d.headingItalic);
  const heading = text(data?.heading, d.heading);
  const headingLine2 = text(data?.headingLine2, d.headingLine2);
  const description = text(data?.description, d.description);
  const f = data?.featured;
  const featured = {
    image: imageUrl(f?.image, d.featured.image),
    alt: imageAlt(f?.image, d.featured.image),
    tags: list(f?.tags, d.featured.tags),
    category: text(f?.category, d.featured.category),
    title: text(f?.title, d.featured.title),
    description: text(f?.description, d.featured.description),
    buttonLabel: text(f?.buttonLabel, d.featured.buttonLabel),
    buttonUrl: text(f?.buttonUrl, d.featured.buttonUrl),
  };

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
            <span className="whitespace-pre">{eyebrow}</span>
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
            {headingItalic}
          </em>{" "}
          {heading}
          <br />
          {headingLine2}
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
          {description}
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
              src={featured.image}
              alt={featured.alt}
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
              {featured.tags[0] && (
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
                {featured.tags[0]}
              </span>
              )}
              {featured.tags[1] && (
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
                {featured.tags[1]}
              </span>
              )}
            </div>

            {/* Bottom content row */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 md:p-7">
              {/* Left – text content */}
              <div className="max-w-[420px]">
                <p
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {featured.category}
                </p>
                <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.2] text-white mb-2">
                  {featured.title}
                </h3>
                <p
                  className="text-[13px] leading-[1.6]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {featured.description}
                </p>
              </div>

              {/* Right – CTA button */}
              <a
                href={featured.buttonUrl}
                className="flex-shrink-0 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase px-5 py-3 rounded-md bg-white hover:bg-gray-50 transition-colors"
                style={{ color: "#2c2c2c" }}
              >
                {featured.buttonLabel}
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
