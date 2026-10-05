import Image from "next/image";

import { type AboutPageContent, aboutDefaults } from "@/content/about";
import { imageAlt, imageUrl, list, text } from "@/content/types";

interface AboutStewardshipSectionProps {
  data?: AboutPageContent["stewardshipSection"];
}

export function AboutStewardshipSection({
  data,
}: AboutStewardshipSectionProps) {
  const d = aboutDefaults.stewardshipSection;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);
  const features = list(data?.features, d.features);
  const photos = d.images.map((fallback, i) => ({
    src: imageUrl(data?.images?.[i], fallback),
    alt: imageAlt(data?.images?.[i], fallback),
  }));
  const [foraging, extraction, apothecary, hydro] = photos;

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div
          data-reveal="scale"
          className="rounded-[24px] md:rounded-[28px] p-7 sm:p-10 md:p-12 lg:p-14 shadow-[0_12px_44px_rgba(0,45,40,0.15)] relative overflow-hidden"
          style={{ backgroundColor: "#004349" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3.5">
                <span
                  className="block w-6 h-px bg-white/40 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="section-label font-semibold tracking-wide text-[#e2ede8]">
                  {eyebrow}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-[1.2] text-white font-normal mb-3.5">
                {heading}
              </h2>

              <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#a0beb6] max-w-lg mb-8 md:mb-9">
                {description}
              </p>

              <div className="space-y-5" data-reveal-stagger>
                {features.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div
                      className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[#5eead4]"
                      style={{ backgroundColor: "#0b524c" }}
                      aria-hidden="true"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <title>Check</title>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[14px] md:text-[15px] font-medium text-white mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-[1.65] text-[#a0beb6]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[440px] mx-auto lg:max-w-none" data-reveal-stagger>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="relative aspect-[4/3] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-sm">
                    <Image
                      src={foraging.src}
                      alt={foraging.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="relative aspect-[16/10] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-sm">
                    <Image
                      src={extraction.src}
                      alt={extraction.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <div className="relative aspect-[4/3] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-sm">
                    <Image
                      src={apothecary.src}
                      alt={apothecary.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="relative aspect-[4/3] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-sm">
                    <Image
                      src={hydro.src}
                      alt={hydro.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
