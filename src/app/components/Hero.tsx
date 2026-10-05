import Image from "next/image";
import Link from "next/link";
import { realHomeText } from "@/content/real-home";
import type { Homepage } from "@/types/sanity";

interface HeroProps {
  data?: Homepage["hero"];
}

export function Hero({ data }: HeroProps) {
  const eyebrow = data?.eyebrow || "Indian Spa & Wellness";
  const headline = data?.headline || "Wellness,";
  const headlineItalic = data?.headlineItalic || "Made with Care.";
  const subtitle = data?.subtitle || realHomeText.hero.subtitle;
  const ctaText = data?.primaryCta?.label || "See Our Treatments";
  const ctaUrl = data?.primaryCta?.url || "/experiences";
  const secondaryText = data?.secondaryCta?.label || "Partner With Kynta";
  const secondaryUrl = data?.secondaryCta?.url || "/partner";
  const imageSrc = data?.image?.url || "/hero-bg.jpg";
  const imageAlt =
    data?.image?.alt ||
    "Luxurious Indian heritage spa courtyard with lotus pool";

  // The last word of the italic line is set upright, e.g. "Made with *Care.*"
  const italicWords = headlineItalic.trim().split(/\s+/);
  const uprightWord = italicWords.length > 1 ? italicWords.pop() : undefined;
  const italicLead = italicWords.join(" ");

  return (
    <section className="relative w-full overflow-hidden -mt-[72px]" id="hero">
      <div className="hero-frame relative w-full">
        <div
          className="absolute inset-x-0 -top-[10%] bottom-0"
          data-parallax="8"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div
          className="hero-wash absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.45) 30%, rgba(255,255,255,0.08) 55%, transparent 70%)",
          }}
        />

        <div className="hero-smoke" aria-hidden="true">
          <span className="wisp wisp-1" />
          <span className="wisp wisp-2" />
          <span className="wisp wisp-3" />
          <span className="wisp wisp-4" />
          <span className="wisp wisp-5" />
          <span className="wisp wisp-6" />
        </div>

        <div className="hero-content absolute inset-0 flex items-center">
          <div className="container-site w-full">
            <div className="max-w-xl lg:max-w-2xl" data-reveal-stagger>
              <div className="flex items-center gap-2 mb-6 -ml-3">
                <span className="section-label text-kynta-charcoal px-3 py-1 rounded-full">
                  {eyebrow}
                </span>
              </div>

              <h1 className="font-serif leading-[1.1] mb-6">
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-kynta-charcoal">
                  {headline}
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-normal text-kynta-charcoal">
                  {italicLead}
                  {uprightWord && (
                    <>
                      {" "}
                      <span className="not-italic">{uprightWord}</span>
                    </>
                  )}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-kynta-warm-gray leading-relaxed max-w-lg mb-8">
                {subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={ctaUrl}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide text-white bg-kynta-teal-dark rounded-full hover:bg-kynta-teal transition-all duration-200"
                >
                  {ctaText}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
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
                <Link
                  href={secondaryUrl}
                  className="inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide text-kynta-charcoal bg-white border border-kynta-charcoal rounded-full hover:bg-kynta-charcoal hover:text-white transition-all duration-200"
                >
                  {secondaryText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
				#hero .hero-frame {
					aspect-ratio: 16 / 7.5;
				}

				#hero .hero-smoke {
					position: absolute;
					inset: 0;
					overflow: hidden;
					pointer-events: none;
				}

				#hero .wisp {
					position: absolute;
					border-radius: 50%;
					background: radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0) 70%);
					filter: blur(38px);
					will-change: transform, opacity;
					animation: hero-smoke-drift var(--dur) ease-in-out var(--delay) infinite alternate;
				}

				#hero .wisp-1 { --dur: 26s; --delay: 0s;   width: 60%; height: 70%; left: -18%; top: 5%;  opacity: 0.85; }
				#hero .wisp-2 { --dur: 32s; --delay: -8s;  width: 45%; height: 55%; left: 5%;   top: 40%; opacity: 0.7; }
				#hero .wisp-3 { --dur: 28s; --delay: -14s; width: 40%; height: 45%; left: 18%;  top: -10%; opacity: 0.55; }
				#hero .wisp-4 { --dur: 36s; --delay: -4s;  width: 30%; height: 38%; left: 38%;  top: 55%; opacity: 0.35; }
				#hero .wisp-5 { --dur: 40s; --delay: -20s; width: 26%; height: 30%; left: 55%;  top: 10%; opacity: 0.22; }
				#hero .wisp-6 { --dur: 30s; --delay: -11s; width: 50%; height: 40%; left: -10%; top: 70%; opacity: 0.6; }

				@keyframes hero-smoke-drift {
					0%   { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
					50%  { transform: translate3d(6%, -8%, 0) scale(1.12) rotate(6deg); }
					100% { transform: translate3d(12%, -3%, 0) scale(0.95) rotate(-4deg); }
				}

				@media (prefers-reduced-motion: reduce) {
					#hero .wisp { animation: none; }
				}

				/* 72px = header height; the header overlaps the top of the hero */
				#hero .hero-content {
					padding-top: 72px;
				}

				@media (min-width: 1024px) {
					#hero .hero-frame {
						min-height: 640px;
					}
				}

				@media (max-width: 1023px) {
					#hero .hero-frame {
						aspect-ratio: auto;
						min-height: 600px;
						display: flex;
						flex-direction: column;
						justify-content: center;
					}

					#hero .hero-content {
						position: relative;
						inset: auto;
						width: 100%;
						padding-top: 144px;
						padding-bottom: 80px;
					}
				}

				@media (max-width: 767px) {
					/* Text spans the full width on phones, so wash the whole image for readability */
					#hero .hero-wash {
						background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.72) 30%, rgba(255,255,255,0.72) 78%, rgba(255,255,255,0.25) 100%) !important;
					}
				}

				@media (max-width: 639px) {
					#hero .hero-frame {
						min-height: 540px;
					}

					#hero .hero-content {
						padding-top: 120px;
						padding-bottom: 56px;
					}
				}
			`}</style>
    </section>
  );
}
