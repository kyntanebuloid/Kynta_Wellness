"use client";

import Image from "next/image";
import Link from "next/link";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const headingItalic = text(data?.headingItalic, d.headingItalic);
  const heading = text(data?.heading, d.heading);
  const headingLine2 = text(data?.headingLine2, d.headingLine2);
  const description = text(data?.description, d.description);

  const categories = list(data?.categories, d.categories).map((c, i) => {
    const fallback = d.categories[i % d.categories.length];
    return {
      label: c.label,
      image: imageUrl(c.image, fallback.image),
      alt: imageAlt(c.image, { alt: c.title || c.label }),
      tags: (c.tags ?? []).slice(0, 2),
      eyebrow: c.eyebrow ?? "",
      title: c.title ?? c.label,
      description: c.description ?? "",
      buttonLabel: text(c.buttonLabel, "Book an Immersion"),
      buttonUrl: text(c.buttonUrl, "/book"),
    };
  });
  const active = categories[Math.min(activeIndex, categories.length - 1)];

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        {/* ── Pill Eyebrow ── */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase px-5 py-2.5 rounded-full border text-center"
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
            <span>{eyebrow}</span>
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

        {/* ── Category Buttons ── */}
        <div
          className="flex flex-wrap justify-center gap-2.5 mb-14"
          role="tablist"
          aria-label="Experience categories"
        >
          {categories.map((cat, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${cat.label}-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(index)}
                className="text-[13px] font-medium tracking-wide px-5 py-2 rounded-full border transition-colors duration-150"
                style={{
                  backgroundColor: isActive
                    ? "var(--kynta-teal-dark)"
                    : "#f0eeeb",
                  color: isActive ? "#ffffff" : "#5a5a5a",
                  borderColor: isActive ? "var(--kynta-teal-dark)" : "#e4e0db",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Featured Card for the selected category ── */}
        <div className="flex justify-center">
          <div
            className="relative w-full overflow-hidden aspect-[4/5] sm:aspect-[818/370]"
            style={{ maxWidth: "818px", borderRadius: "14px" }}
            role="tabpanel"
          >
            {/* All photos are stacked so switching crossfades instead of flashing. */}
            {categories.map((cat, index) => (
              <Image
                key={`${cat.image}-${index}`}
                src={cat.image}
                alt={index === activeIndex ? cat.alt : ""}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, 818px"
                priority={index === 0}
              />
            ))}

            {/* Dark gradient overlay for readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.05) 75%, transparent 100%)",
              }}
            />

            {/* Tags – top-left */}
            {active.tags.length > 0 && (
              <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                {active.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.92)",
                      color: "#2c2c2c",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span
                      className="inline-block w-[5px] h-[5px] rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#b0603a" }}
                      aria-hidden="true"
                    />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom content row */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 p-5 sm:p-6 md:p-7">
              <div className="max-w-[440px]">
                {active.eyebrow && (
                  <p
                    className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {active.eyebrow}
                  </p>
                )}
                <h3 className="font-serif text-[24px] md:text-[28px] leading-[1.2] text-white mb-2">
                  {active.title}
                </h3>
                {active.description && (
                  <p
                    className="text-[13px] leading-[1.6]"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {active.description}
                  </p>
                )}
              </div>

              <Link
                href={active.buttonUrl}
                className="flex-shrink-0 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase px-5 py-3 rounded-md bg-white hover:bg-gray-50 transition-colors"
                style={{ color: "#2c2c2c" }}
              >
                {active.buttonLabel}
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
                  <title>Arrow</title>
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
