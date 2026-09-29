import Image from "next/image";

export interface StewardshipFeature {
  id: string;
  title: string;
  description: string;
}

export const stewardshipFeatures: StewardshipFeature[] = [
  {
    id: "fair-trade",
    title: "Direct Fair-Trade Foraging Alliances",
    description:
      "Supporting 240+ tribal farming families with stable year-round honorariums.",
  },
  {
    id: "zero-synthetics",
    title: "100% Zero Single-Use Synthetics",
    description:
      "All vessel packaging is hand-blown amber glass or unglazed terracotta earthenware.",
  },
  {
    id: "hydro-systems",
    title: "Closed-Loop Hydro Systems",
    description:
      "Thermal suites utilize mineral stone filtering to recycle 94% of restorative water.",
  },
];

export const stewardshipImages = {
  foraging: {
    src: "/stewardship-foraging.jpg",
    alt: "Indigenous women harvesting botanicals according to lunar cycles in Nilgiri hills",
  },
  apothecary: {
    src: "/stewardship-apothecary.jpg",
    alt: "Ceramic apothecary elixir vessels and dried botanical herbs on linen",
  },
  extraction: {
    src: "/stewardship-extraction.jpg",
    alt: "Clay distillation vessel dripping pure herbal essence into laboratory beakers",
  },
  hydro: {
    src: "/stewardship-hydro.jpg",
    alt: "Biophilic sanctuary garden with pebble water stream and lush tropical foliage",
  },
};

interface AboutStewardshipSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    features?: {
      title: string;
      description: string;
    }[];
    images?: {
      _type: "image";
      asset: { _ref: string; _type: "reference" };
      alt?: string;
    }[];
  };
}

export function AboutStewardshipSection({
  data,
}: AboutStewardshipSectionProps) {
  const eyebrow = data?.eyebrow || "ECOLOGICAL STEWARDSHIP";
  const heading = data?.heading || "Honoring the Soil That Restores Us";
  const description =
    data?.description ||
    "True wellness cannot be extracted at the expense of local communities or living ecosystems. Our whole-plant botanicals are hand-harvested according to traditional lunar cycles by indigenous tribal cooperatives in the Nilgiri and Western Ghats biospheres.";

  const features: StewardshipFeature[] = data?.features?.length
    ? data.features.map((f, i) => ({
        ...stewardshipFeatures[i % stewardshipFeatures.length],
        title:
          f.title || stewardshipFeatures[i % stewardshipFeatures.length].title,
        description:
          f.description ||
          stewardshipFeatures[i % stewardshipFeatures.length].description,
      }))
    : stewardshipFeatures;

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div
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
                <span className="text-sm font-medium tracking-wide text-[#e2ede8]">
                  {eyebrow}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-[1.2] text-white font-normal mb-3.5">
                {heading}
              </h2>

              <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#a0beb6] max-w-lg mb-8 md:mb-9">
                {description}
              </p>

              <div className="space-y-5">
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
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[440px] mx-auto lg:max-w-none">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="relative aspect-[4/3] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-sm">
                    <Image
                      src={stewardshipImages.foraging.src}
                      alt={stewardshipImages.foraging.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="relative aspect-[16/10] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-sm">
                    <Image
                      src={stewardshipImages.extraction.src}
                      alt={stewardshipImages.extraction.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <div className="relative aspect-[4/3] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-sm">
                    <Image
                      src={stewardshipImages.apothecary.src}
                      alt={stewardshipImages.apothecary.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="relative aspect-[4/3] w-full rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-sm">
                    <Image
                      src={stewardshipImages.hydro.src}
                      alt={stewardshipImages.hydro.alt}
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
