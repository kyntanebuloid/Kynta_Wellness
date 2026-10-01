"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarousel } from "./useCarousel";

import {
  type ExperiencesPageContent,
  experiencesPageDefaults,
} from "@/content/experiences";
import { imageAlt, imageUrl, list, text } from "@/content/types";

interface ExperienceTreatmentsSectionProps {
  data?: ExperiencesPageContent["treatmentsSection"];
}

function TreatmentCard({
  image,
  alt,
  label,
  duration,
  title,
  slug,
  description,
  sensory,
  linkLabel,
}: {
  image: string;
  alt: string;
  label: string;
  duration: string;
  title: string;
  slug: string;
  description: string;
  sensory: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col h-full bg-white rounded-md overflow-hidden border border-kynta-border/40">
      <div className="relative w-full" style={{ aspectRatio: "295 / 172" }}>
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide text-kynta-charcoal bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded border border-kynta-border/30">
          {label}
        </span>
        <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-white bg-kynta-teal-dark px-3 py-1.5 rounded">
          {duration}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <h3 className="font-serif text-lg tracking-wide text-kynta-charcoal mb-3">
          {title}
        </h3>
        <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-4 flex-1">
          {description}
        </p>
        <p className="text-[13px] leading-relaxed text-kynta-warm-gray mb-5">
          <span className="font-semibold text-kynta-rust italic">Sensory:</span>{" "}
          {sensory}
        </p>
        <Link
          href={`/experiences/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-kynta-teal hover:text-kynta-teal-light transition-colors"
        >
          {linkLabel}
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <title>Arrow</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function CircleArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-kynta-teal-dark text-white flex items-center justify-center hover:bg-kynta-teal transition-colors"
      aria-label={`Scroll ${direction}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
      >
        <title>{direction === "left" ? "Previous" : "Next"}</title>
        {direction === "left" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        )}
      </svg>
    </button>
  );
}

export function ExperienceTreatmentsSection({
  data,
}: ExperienceTreatmentsSectionProps) {
  // Same carousel as the home page: a half-shown card is brought fully into
  // view, it loops at both ends, and it moves on its own every 2 seconds.
  const { trackRef, scrollable, next, prev } = useCarousel({
    autoplayMs: 2000,
  });

  const d = experiencesPageDefaults.treatmentsSection;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);
  const linkLabel = text(data?.linkLabel, d.linkLabel);
  const treatments = list(data?.cards, d.cards).map((card, idx) => {
    const fallback = d.cards[idx % d.cards.length];
    const slug =
      card.slug ||
      card.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    return {
      image: imageUrl(card.image, fallback.image),
      alt: imageAlt(card.image, { alt: card.title }),
      label: card.label ?? "",
      duration: card.duration ?? "",
      title: card.title,
      slug,
      description: card.description,
      sensory: card.sensoryNote ?? "",
      linkLabel,
    };
  });

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-14">
          <div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-4">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal">
              {heading}
            </h2>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-[15px] leading-[1.7] text-kynta-warm-gray max-w-sm">
              {description}
            </p>
            <div
              className={`flex items-center gap-3 mt-6 md:mt-0 md:justify-end ${
                scrollable ? "" : "invisible"
              }`}
            >
              <CircleArrowButton direction="left" onClick={prev} />
              <CircleArrowButton direction="right" onClick={next} />
            </div>
          </div>
        </div>
        <div
          ref={trackRef}
          className="relative no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
        >
          {treatments.map((t, index) => (
            <div
              key={`${t.slug}-${index}`}
              className="snap-start flex-shrink-0 w-full sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]"
            >
              <TreatmentCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
