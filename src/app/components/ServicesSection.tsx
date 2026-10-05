"use client";

import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "./useCarousel";
import type { Homepage } from "@/types/sanity";
import { NoPhoto } from "./NoPhoto";

interface ServicesSectionProps {
  data?: Homepage["servicesSection"];
}

const defaultServices = [
  {
    name: "Massages",
    description: "Healing massages that relax your body and take away pain.",
    image: "/treatment-massage.jpg",
  },
  {
    name: "Beauty Care",
    description: "Face and skin care made with natural plants and herbs.",
    image: "/treatment-glamour-glow.jpg",
  },
  {
    name: "Couple Massage",
    description: "A relaxing massage for two people, side by side.",
    image: "/treatment-spa-sojourns.jpg",
  },
  {
    name: "Quick Treatments",
    description: "Short treatments for when you do not have much time.",
    image: "/treatment-massage.jpg",
  },
  {
    name: "Full Spa Day",
    description:
      "Long spa sessions that mix old Indian healing with modern comfort.",
    image: "/treatment-spa-sojourns.jpg",
  },
];

export function ServicesSection({ data }: ServicesSectionProps) {
  const { trackRef, scrollable, next, prev } = useCarousel({
    autoplayMs: 2000,
  });

  const eyebrow = data?.eyebrow || "OUR SERVICES";
  const heading = data?.heading || "What We Offer";
  const noPhotoText = data?.noPhotoText || "Photo coming soon";
  const services = data?.services?.length
    ? data.services.map((s) => ({
        name: s.name,
        description: s.description,
        // No photo in Sanity: the card shows a NoPhoto panel instead.
        image: s.image?.url || null,
        alt: s.image?.alt || s.name,
        buttonLabel: s.buttonLabel || "Book Now",
        buttonUrl: s.buttonUrl || "/book",
      }))
    : defaultServices.map((s) => ({
        ...s,
        alt: s.name,
        buttonLabel: "Book Now",
        buttonUrl: "/book",
      }));

  return (
    <section className="w-full bg-kynta-section-bg pt-20 pb-10 md:pt-24 md:pb-12">
      <div className="container-site">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[13px] sm:text-[14px] font-semibold text-kynta-rust tracking-wide mb-2">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-kynta-charcoal">
              {heading}
            </h2>
          </div>

          {/* Navigation Buttons */}
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

        {/* Carousel */}
        <div
          ref={trackRef}
          data-reveal-stagger
          className="relative no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {services.map((service, index) => (
            <div
              key={`${service.name}-${index}`}
              className="snap-start flex-shrink-0 w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] flex flex-col bg-white rounded-lg overflow-hidden border border-kynta-border/40 group"
            >
              <div className="relative w-full h-48 overflow-hidden">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                  />
                ) : (
                  <NoPhoto title={service.name} label={noPhotoText} />
                )}
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-xl text-kynta-charcoal mb-3 truncate">
                  {service.name}
                </h3>
                <p className="flex-1 text-sm text-kynta-warm-gray mb-6 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <Link
                  href={service.buttonUrl}
                  className="self-start inline-flex items-center gap-2 text-sm font-semibold text-kynta-teal hover:text-kynta-teal-light transition-colors"
                >
                  {service.buttonLabel}
                  <svg
                    className="w-4 h-4"
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
          ))}
        </div>
      </div>
    </section>
  );
}
