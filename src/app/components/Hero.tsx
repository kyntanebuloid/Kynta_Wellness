import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "@/types/sanity";

interface HeroProps {
  data?: {
    eyebrow?: string;
    headline?: string;
    subtitle?: string;
    ctaText?: string;
    ctaUrl?: string;
    image?: SanityImage;
  };
}

export function Hero({ data }: HeroProps) {
  const eyebrow =
    data?.eyebrow || "Contemporary Indian Wellness & Spa Hospitality";
  const headline = data?.headline || "Wellness, Thoughtfully Delivered.";
  const subtitle =
    data?.subtitle ||
    "Premium restorative sanctuaries and turnkey spa operations crafted exclusively for India's most exceptional hotels, heritage palaces, and boutique wilderness retreats.";
  const ctaText = data?.ctaText || "Explore Our Spas";
  const ctaUrl = data?.ctaUrl || "/spas";

  return (
    <section className="relative w-full overflow-hidden" id="hero">
      <div className="relative w-full" style={{ aspectRatio: "16 / 7.5" }}>
        <Image
          src="/hero-bg.jpg"
          alt="Luxurious Indian heritage spa courtyard with lotus pool"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0.1) 55%, transparent 70%)",
          }}
        />

        <div className="absolute inset-0 flex items-center">
          <div className="container-site w-full">
            <div className="max-w-xl lg:max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="inline-block w-2 h-2 rounded-full bg-kynta-gold"
                  aria-hidden="true"
                />
                <span className="text-sm tracking-wide text-kynta-charcoal bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
                  {eyebrow}
                </span>
              </div>

              <h1 className="font-serif leading-[1.1] mb-6">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-kynta-charcoal">
                  Wellness,
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic font-normal text-kynta-charcoal">
                  Thoughtfully <span className="not-italic">Delivered.</span>
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
                  href="/partner"
                  className="inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide text-kynta-charcoal bg-white border border-kynta-charcoal rounded-full hover:bg-kynta-charcoal hover:text-white transition-all duration-200"
                >
                  Partner With Kynta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
				@media (max-width: 639px) {
					#hero > div:first-child {
						aspect-ratio: 4 / 5;
					}
				}
			`}</style>
    </section>
  );
}
