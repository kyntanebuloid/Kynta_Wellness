"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type LocationContent,
  locationsPageDefaults,
} from "@/content/locations";
import { realHomeText } from "@/content/real-home";
import { whatsappChatUrl } from "@/lib/whatsapp";
import type { Homepage } from "@/types/sanity";
import { NoPhoto } from "./NoPhoto";
import { useCarousel } from "./useCarousel";

interface DestinationsSectionProps {
  data?: Homepage["destinationsSection"];
  locations?: LocationContent[];
}

function DestinationCard({
  image,
  locationPill,
  hours,
  title,
  description,
  tags,
  detailsHref,
  noPhotoText,
}: {
  image: string | null;
  noPhotoText: string;
  locationPill: string;
  hours: string;
  title: string;
  description: string;
  tags: string[];
  detailsHref: string;
}) {
  return (
    <div className="flex flex-col bg-white rounded-md overflow-hidden border border-kynta-border/40 group">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "310 / 165" }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <NoPhoto title={title} label={noPhotoText} />
        )}
        <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide text-kynta-charcoal bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded">
          {locationPill}
        </span>
        <span className="absolute bottom-3 right-3 text-[11px] font-medium text-kynta-charcoal bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded">
          {hours}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <h3 className="font-serif text-xl lg:text-[22px] text-kynta-charcoal leading-snug mb-3">
          {title}
        </h3>
        <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-5">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-kynta-charcoal border border-kynta-border rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
          <Link
            href={whatsappChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-kynta-teal hover:text-kynta-teal-light transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="flex-shrink-0"
            >
              <title>WhatsApp</title>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </Link>
          <Link
            href={detailsHref}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide text-kynta-teal border border-kynta-teal rounded-full px-4 py-2 hover:bg-kynta-teal hover:text-white transition-all duration-200"
          >
            View Spa Details
            <svg
              className="w-3 h-3"
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
    </div>
  );
}

export function DestinationsSection({
  data,
  locations,
}: DestinationsSectionProps) {
  const { trackRef, scrollable, next, prev } = useCarousel({
    autoplayMs: 2000,
  });
  const eyebrow = data?.eyebrow || "Our Spa Locations";
  const heading = data?.heading || "Our spas across India.";
  const description =
    data?.description || realHomeText.destinationsSection.description;
  const noPhotoText = data?.noPhotoText || "Photo coming soon";

  // Without Sanity, the six real spas from the built-in content.
  const destinations = (locations ?? locationsPageDefaults.locations).map(
    (d) => ({
      // No photo in Sanity: the card shows a NoPhoto panel instead.
      image: d.image?.url || d.imagePath || null,
      locationPill: d.address || "",
      hours: d.hours || "Call for timings",
      title: d.name,
      address: d.address || "",
      description: d.cardDescription || d.address || "A calm and relaxing spa",
      tags: d.services || [],
      detailsHref:
        d.detailsUrl || (d.slug ? `/locations/${d.slug}` : "/locations"),
    }),
  );

  return (
    <section className="w-full bg-kynta-section-bg pt-10 pb-16 md:pt-12 md:pb-24">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-12">
          <div>
            <p className="section-label text-kynta-rust mb-4">{eyebrow}</p>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-4 whitespace-pre-line">
              {heading}
            </h2>
            <p className="text-[15px] leading-[1.7] text-kynta-warm-gray max-w-lg">
              {description}
            </p>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <div
              className={`flex items-center gap-3 ${scrollable ? "" : "invisible"}`}
            >
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 rounded-full bg-kynta-teal-dark text-white flex items-center justify-center hover:bg-kynta-teal transition-colors"
                aria-label="Scroll left"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <title>Previous</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 rounded-full bg-kynta-teal-dark text-white flex items-center justify-center hover:bg-kynta-teal transition-colors"
                aria-label="Scroll right"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <title>Next</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel - 2 items visible */}
        <div
          ref={trackRef}
          data-reveal-stagger
          className="relative no-scrollbar flex gap-[18px] overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {destinations.map((d) => (
            <div
              key={d.title}
              className="snap-start flex-shrink-0 w-full md:w-[calc((100%-18px)/2)]"
            >
              <DestinationCard {...d} noPhotoText={noPhotoText} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
