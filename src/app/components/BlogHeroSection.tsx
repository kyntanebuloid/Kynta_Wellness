"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const blogCategories = [
  "ALL ESSAYS",
  "BOTANICAL APOTHECARY",
  "SANCTUARY ARCHITECTURE",
  "CIRCADIAN SOMATICS",
  "AYURVEDIC SCIENCE",
  "VAIDYA CASE STUDIES",
];

export const featuredArticle = {
  badge: "COVER MONOGRAPH",
  category: "BOTANICAL APOTHECARY",
  issue: "ISSUE 28",
  readTime: "8 MIN READ",
  title:
    "The Alchemy of Fresh Wildcrafted Botanicals: Seasonal Kashayams in High-Stress Restoration",
  description:
    "Why fresh-pressed decoctions and artisanal marma formulations yield biological equilibrium far beyond standardized extracts. Dr. Ananya Varma details our 48-hour wildcrafting harvest protocols in the Nilgiri foothills.",
  author: {
    initials: "AV",
    name: "DR. ANANYA VARMA",
    role: "Chief Vaidya & Botanical Formulation Director",
  },
  image: "/blog-featured-kashayam.jpg",
  imageAlt:
    "Ayurvedic botanical oil extraction with golden elixir dropper into hammered bronze bowl",
  href: "/blog/alchemy-of-fresh-wildcrafted-botanicals",
};

interface BlogHeroSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
  };
  filters?: {
    label: string;
    value: string;
  }[];
}

export function BlogHeroSection({ data, filters }: BlogHeroSectionProps) {
  const categories = filters
    ? filters.map((f) => f.label.toUpperCase())
    : blogCategories;
  const [activeCategory, setActiveCategory] = useState(
    categories[0] ?? "ALL ESSAYS",
  );

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee9df] border border-kynta-border/50 mb-6">
          <span
            className="w-1.5 h-1.5 rounded-full bg-kynta-rust flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold tracking-wider uppercase text-kynta-rust">
            {data?.eyebrow || "THE KYNTA SANCTUARY GAZETTE — VOL. IV"}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-kynta-charcoal font-normal mb-5 max-w-2xl">
          {data?.heading ||
            "Treatises on Stillness, Botanical Formulations &amp; Restorative Space."}
        </h1>

        <p className="text-base sm:text-lg text-kynta-warm-gray leading-relaxed max-w-xl mb-8 md:mb-10">
          {data?.subheading ||
            "Dispatches from our Ayurvedic practitioners, spatial masterplanners, and apothecary artisans exploring the intersection of Vedic healing, circadian biology, and contemporary architecture."}
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 md:mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`text-[9.5px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase px-3.5 py-2 rounded-[6px] transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-[#eee9df] text-kynta-charcoal/80 hover:bg-[#e4ded3]"
                }`}
                style={isActive ? { backgroundColor: "#004349" } : undefined}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-[18px] sm:rounded-[20px] overflow-hidden border border-kynta-border/40 shadow-[0_8px_30px_rgba(0,0,0,0.035)] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 relative w-full h-[280px] sm:h-[340px] lg:h-auto min-h-[320px] lg:min-h-[420px] overflow-hidden bg-[#ebe8e1]">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-[6px] px-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-white/80">
              <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-rust">
                {featuredArticle.badge}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
            <div>
              <p className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-kynta-rust mb-3">
                {featuredArticle.category} &nbsp;•&nbsp; {featuredArticle.issue}{" "}
                &nbsp;•&nbsp; {featuredArticle.readTime}
              </p>

              <h2 className="font-serif text-[21px] sm:text-[23px] md:text-[25px] lg:text-[27px] leading-[1.22] font-normal text-kynta-charcoal mb-3.5">
                <Link
                  href={featuredArticle.href}
                  className="hover:text-kynta-teal-dark transition-colors"
                >
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-[11.5px] sm:text-[12px] leading-[1.65] text-kynta-warm-gray mb-8">
                {featuredArticle.description}
              </p>
            </div>

            <div className="pt-4 border-t border-kynta-border/30 flex items-center justify-between gap-4 mt-auto">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-[6px] text-white flex items-center justify-center font-serif text-[12px] font-medium flex-shrink-0"
                  style={{ backgroundColor: "#004349" }}
                >
                  {featuredArticle.author.initials}
                </div>
                <div>
                  <p className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.06em] uppercase text-kynta-charcoal leading-tight">
                    {featuredArticle.author.name}
                  </p>
                  <p className="text-[9.5px] sm:text-[10px] text-kynta-warm-gray leading-tight mt-0.5">
                    {featuredArticle.author.role}
                  </p>
                </div>
              </div>

              <Link
                href={featuredArticle.href}
                className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors flex items-center gap-1.5 flex-shrink-0 group"
                style={{ color: "var(--kynta-teal-dark)" }}
              >
                <span>READ TREATISE</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
