import Image from "next/image";
import Link from "next/link";
import { type AboutPageContent, aboutDefaults } from "@/content/about";
import { imageAlt, imageUrl, link, list, text } from "@/content/types";

interface AboutHeroSectionProps {
  data?: AboutPageContent["hero"];
}

export function AboutHeroSection({ data }: AboutHeroSectionProps) {
  const d = aboutDefaults.hero;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);
  const philosophyLabel = text(data?.philosophyLabel, d.philosophyLabel);
  const philosophyPdf = data?.philosophyPdf?.url ?? null;

  const secondaryCta = link(data?.secondaryCta, d.secondaryCta);
  const photo = imageUrl(data?.image, d.image);
  const photoAlt = imageAlt(data?.image, d.image);
  const imageCaption = text(data?.imageCaption, d.imageCaption);
  const badgeLabel = text(data?.badgeLabel, d.badgeLabel);
  const badgeText = text(data?.badgeText, d.badgeText);
  const displayStats = list(data?.stats, d.stats);

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-24">
          <div className="flex flex-col justify-center" data-reveal-stagger>
            <div className="flex items-center gap-4 mb-4">
              <span
                className="block h-px flex-shrink-0"
                style={{
                  width: "48px",
                  backgroundColor: "var(--kynta-charcoal)",
                  opacity: 0.25,
                }}
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-kynta-rust tracking-wide">
                {eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-kynta-charcoal mb-4">
              {heading.split("\n").map((line, i) => (
                <span key={`${i}-${line}`}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-[16px] leading-[1.75] text-kynta-warm-gray max-w-xl mb-8">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {philosophyPdf && (
                <a
                  href={philosophyPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide text-white bg-kynta-teal-dark rounded-full hover:bg-kynta-teal transition-all duration-200"
                >
                  {philosophyLabel}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <title>Download</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                  </svg>
                </a>
              )}

              <Link
                href={secondaryCta.url}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide text-kynta-charcoal bg-white border border-kynta-charcoal rounded-full hover:bg-kynta-charcoal hover:text-white transition-all duration-200"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative" data-reveal="scale">
            <div
              className="relative w-full overflow-hidden"
              style={{
                borderRadius: "16px",
                aspectRatio: "300 / 370",
                maxWidth: "520px",
                marginLeft: "auto",
              }}
            >
              <Image
                src={photo}
                alt={photoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
                priority
              />

              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                }}
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/70">
                  {imageCaption}
                </p>
              </div>
            </div>

            <div
              className="absolute -bottom-6 left-0 lg:-left-6 flex items-center gap-3.5 bg-white px-5 py-4 z-10"
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                maxWidth: "280px",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#f7ddd0" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-kynta-rust"
                >
                  <title>Heritage</title>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-kynta-rust mb-0.5">
                  {badgeLabel}
                </p>
                <p className="text-[13px] font-medium text-kynta-charcoal leading-snug whitespace-pre-line">
                  {badgeText}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pt-4"
          data-reveal-stagger
        >
          {displayStats.map((s) => (
            <div key={s.label}>
              <p
                data-count
                className="font-serif italic text-[28px] leading-none mb-2"
                style={{ color: "var(--kynta-teal)" }}
              >
                {s.value}
              </p>

              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5">
                {s.label}
              </p>

              <p className="text-[13px] leading-[1.6] text-kynta-warm-gray">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}