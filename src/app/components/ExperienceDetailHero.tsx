import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/types/sanity";
import { urlFor } from "@/lib/sanity/image";

interface ExperienceDetailHeroProps {
  experience: Experience;
}

function resolveImageUrl(
  imageSource: any,
  fallbackUrl: string,
): string {
  if (!imageSource) return fallbackUrl;
  if (typeof imageSource === "string") return imageSource;
  try {
    return urlFor(imageSource).url();
  } catch {
    return fallbackUrl;
  }
}

export function ExperienceDetailHero({ experience }: ExperienceDetailHeroProps) {
  // Default image fallbacks based on slug or sensible defaults
  const slug = experience.slug?.current || "";

  let defaultMainImg = "/exp-spa-sojourns-main.png";
  let defaultTopRightImg = "/exp-spa-sojourns-potli.png";
  let defaultBottomRightImg = "/exp-spa-sojourns-pavilion.png";

  if (slug === "massage-selections") {
    defaultMainImg = "/treatment-massage.jpg";
    defaultTopRightImg = "/article-herbal-compress.jpg";
    defaultBottomRightImg = "/destination-glenwood.jpg";
  } else if (slug === "glamour-glow") {
    defaultMainImg = "/treatment-glamour-glow.jpg";
    defaultTopRightImg = "/triad-touch.jpg";
    defaultBottomRightImg = "/hospitality-chamber.jpg";
  } else if (slug === "hydrotherapy-plunge") {
    defaultMainImg = "/experience-hydro-colonnade.jpg";
    defaultTopRightImg = "/inquiry-hydrotherapy.jpg";
    defaultBottomRightImg = "/destination-heritage.jpg";
  } else if (slug === "couples-sanctuary") {
    defaultMainImg = "/destination-glenwood.jpg";
    defaultTopRightImg = "/triad-spatial.jpg";
    defaultBottomRightImg = "/location-rawai-tents.jpg";
  } else if (slug === "sound-immersion") {
    defaultMainImg = "/triad-vedic.jpg";
    defaultTopRightImg = "/inquiry-architecture.jpg";
    defaultBottomRightImg = "/timeline-alpine.jpg";
  }

  const mainCardImage = resolveImageUrl(
    experience.gallery?.mainCard?.image || experience.image,
    defaultMainImg,
  );
  const topRightImage = resolveImageUrl(
    experience.gallery?.topRightCard?.image,
    defaultTopRightImg,
  );
  const bottomRightImage = resolveImageUrl(
    experience.gallery?.bottomRightCard?.image,
    defaultBottomRightImg,
  );

  const highlights = experience.highlights?.length
    ? experience.highlights
    : ["TAILORED PRESSURE", "AROMA ELIXIRS", "PRIVATE SUITES"];

  return (
    <section className="w-full bg-white pt-10 sm:pt-14 md:pt-16 pb-16 md:pb-20">
      <div className="container-site">
        {/* ── Eyebrow Pill ── */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase px-4 py-1.5 rounded-full border border-[#ece8e1] bg-[#fbf9f5] text-[#9b5440]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9b5440] flex-shrink-0" />
            {experience.eyebrow || "SACRED HEALING SERIES"}
          </span>
        </div>

        {/* ── Title ── */}
        <h1 className="font-serif text-center text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px] leading-[1.1] text-kynta-teal-dark font-normal mb-4">
          {experience.title}
        </h1>

        {/* ── Description ── */}
        <p className="text-center text-[15px] sm:text-[16px] leading-[1.75] text-kynta-warm-gray max-w-xl mx-auto mb-8">
          {experience.description}
        </p>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12 sm:mb-14">
          <Link
            href={experience.primaryCta?.url || "/experiences"}
            className="bg-kynta-teal-dark hover:bg-kynta-teal text-white text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300"
          >
            {experience.primaryCta?.label || "EXPLORE MASSAGES"}
          </Link>
          <Link
            href={experience.secondaryCta?.url || "/contact"}
            className="bg-white hover:bg-[#f7f9f7] text-kynta-teal-dark border border-kynta-border/80 text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-all duration-300 shadow-sm"
          >
            {experience.secondaryCta?.label || "CONCIERGE SCHEDULING"}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* ── Visual Gallery Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 mb-6">
          {/* Left Large Card */}
          <div className="lg:col-span-7 relative rounded-[6px] overflow-hidden aspect-[429/312] min-h-[260px] bg-kynta-charcoal group">
            <Image
              src={mainCardImage}
              alt={experience.gallery?.mainCard?.title || experience.title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 660px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between p-5 sm:p-6">
              <div>
                <p className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.16em] uppercase text-white/70 mb-1">
                  {experience.gallery?.mainCard?.tag || "RITUAL BASELINE"}
                </p>
                <h3 className="font-serif text-[19px] sm:text-[22px] md:text-[24px] text-white font-normal leading-snug">
                  {experience.gallery?.mainCard?.title || "Traditional Abhyanga & Tailam"}
                </h3>
              </div>
              <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-[4px] whitespace-nowrap self-end mb-0.5">
                {experience.gallery?.mainCard?.badge || "01 / MASTER RITUAL"}
              </span>
            </div>
          </div>

          {/* Right Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            {/* Top-Right Card */}
            <div className="relative rounded-[6px] overflow-hidden aspect-[303/148] min-h-[135px] bg-kynta-charcoal group flex-1">
              <Image
                src={topRightImage}
                alt={experience.gallery?.topRightCard?.title || "Therapeutic Heat"}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 440px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
                <p className="text-[8.5px] sm:text-[9px] font-semibold tracking-[0.16em] uppercase text-white/70 mb-1">
                  {experience.gallery?.topRightCard?.tag || "THERAPEUTIC HEAT"}
                </p>
                <h3 className="font-serif text-[16px] sm:text-[18px] text-white font-normal leading-snug">
                  {experience.gallery?.topRightCard?.title || "Herbal Potli Kizhi Compress"}
                </h3>
              </div>
            </div>

            {/* Bottom-Right Card */}
            <div className="relative rounded-[6px] overflow-hidden aspect-[303/148] min-h-[135px] bg-kynta-charcoal group flex-1">
              <Image
                src={bottomRightImage}
                alt={experience.gallery?.bottomRightCard?.title || "Sanctuary Suites"}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 440px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
                <p className="text-[8.5px] sm:text-[9px] font-semibold tracking-[0.16em] uppercase text-white/70 mb-1">
                  {experience.gallery?.bottomRightCard?.tag || "SANCTUARY SUITES"}
                </p>
                <h3 className="font-serif text-[16px] sm:text-[18px] text-white font-normal leading-snug">
                  {experience.gallery?.bottomRightCard?.title || "Private Stone & Teak Pavilions"}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Information Strip ── */}
        <div className="w-full py-4 px-5 sm:px-6 rounded-[6px] flex flex-col md:flex-row items-center justify-between gap-3 bg-[#f2f4f2] border border-kynta-border/30">
          <div className="flex items-center gap-2.5 text-kynta-charcoal">
            {/* Lotus/Botanical Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9b5440"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M12 3a9 9 0 0 0-9 9c0 5 9 9 9 9s9-4 9-9a9 9 0 0 0-9-9z" />
              <path d="M12 3v18" />
              <path d="M12 12c-2.5-2-4.5-2-4.5 0s2 2 4.5 0z" />
              <path d="M12 12c2.5-2 4.5-2 4.5 0s-2 2-4.5 0z" />
            </svg>
            <span className="text-[11.5px] sm:text-[12px] text-kynta-charcoal/90 font-normal">
              {experience.footerNote ||
                "Curated full-body therapies with cold-pressed botanical infusions"}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-kynta-warm-gray">
            {highlights.map((item, idx) => (
              <span key={item} className="flex items-center gap-2.5">
                {idx > 0 && <span className="text-kynta-warm-gray/50">•</span>}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
