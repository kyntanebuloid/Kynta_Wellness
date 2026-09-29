"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { SanityImage } from "@/types/sanity";

interface ServicesSectionProps {
  data?: {
    services?: {
      id?: string;
      name: string;
      description: string;
      image?: SanityImage;
    }[];
  };
}

const defaultServices = [
  {
    id: "1",
    name: "Massages",
    description: "Healing massages that relax your body and take away pain.",
    image: "/treatment-massage.jpg",
  },
  {
    id: "2",
    name: "Beauty Care",
    description: "Face and skin care made with natural plants and herbs.",
    image: "/treatment-glamour-glow.jpg",
  },
  {
    id: "3",
    name: "Couple Massage",
    description: "A relaxing massage for two people, side by side.",
    image: "/treatment-spa-sojourns.jpg",
  },
  {
    id: "4",
    name: "Quick Treatments",
    description: "Short treatments for when you do not have much time.",
    image: "/treatment-massage.jpg",
  },
  {
    id: "5",
    name: "Full Spa Day",
    description: "Long spa sessions that mix old Indian healing with modern comfort.",
    image: "/treatment-spa-sojourns.jpg",
  },
];

// Convert Sanity image reference to URL
function getSanityImageUrl(image?: SanityImage): string {
  if (!image) return "/treatment-spa-sojourns.jpg";
  if (typeof image === "string") return image;
  
  const ref = image.asset?._ref;
  if (!ref) return "/treatment-spa-sojourns.jpg";
  
  // Convert Sanity asset ref to image URL
  // Format: image-abc123-800x600-jpg -> https://cdn.sanity.io/images/[projectId]/[dataset]/abc123-800x600.jpg
  const [, id, ...rest] = ref.split("-");
  const dimensions = rest.slice(0, -1).join("-");
  const format = rest[rest.length - 1];
  
  return `https://cdn.sanity.io/images/projectId/dataset/${id}-${dimensions}.${format}`;
}

export function ServicesSection({ data }: ServicesSectionProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Use Sanity data if available, otherwise use defaults
  const services = data?.services || defaultServices;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const card = scrollContainer.current.firstElementChild as HTMLElement | null;
      const scrollAmount = card ? card.offsetWidth + 24 : 340;
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-kynta-section-bg pt-20 pb-10 md:pt-24 md:pb-12">
      <div className="container-site">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-2">
              OUR SERVICES
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-kynta-charcoal">
              What We Offer
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
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
              onClick={() => scroll("right")}
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
          ref={scrollContainer}
          data-reveal-stagger
          className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="snap-start flex-shrink-0 w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] flex flex-col bg-white rounded-lg overflow-hidden border border-kynta-border/40 group"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={typeof service.image === "string" ? service.image : getSanityImageUrl(service.image as SanityImage)}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-xl text-kynta-charcoal mb-3 truncate">
                  {service.name}
                </h3>
                <p className="flex-1 text-sm text-kynta-warm-gray mb-6 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <Link
                  href="/book"
                  className="self-start inline-flex items-center gap-2 text-sm font-semibold text-kynta-teal hover:text-kynta-teal-light transition-colors"
                >
                  Book Now
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
