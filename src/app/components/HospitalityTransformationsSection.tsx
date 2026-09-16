import Image from "next/image";

export interface TransformationCard {
  id: string;
  location: string;
  metricPill: string;
  metricPillColor: "teal" | "neutral";
  title: string;
  description: string;
  footerLabel: string;
}

export const transformations: TransformationCard[] = [
  {
    id: "udaipur",
    location: "UDAIPUR, RAJASTHAN",
    metricPill: "+44% Yield",
    metricPillColor: "teal",
    title: "The Royal Stepped Reservoir",
    description:
      "16,000 sq ft subterranean stepped reservoir converted into cavernous hydrothermal suites and acoustic salt-immersion grottos.",
    footerLabel: "HISTORIC PALACE HERITAGE CONVERSION",
  },
  {
    id: "shimla",
    location: "SHIMLA, HIMALAYAS",
    metricPill: "+3.1d Stay",
    metricPillColor: "neutral",
    title: "The Pine Canopy Pavilion",
    description:
      "Glass-enclosed cedar hydro-sanctuary with altitude-acclimatizing herbal steam circuits and panoramic alpine views.",
    footerLabel: "ALPINE BIOPHILIC HYDROTHERAPY",
  },
  {
    id: "goa",
    location: "NORTH GOA COAST",
    metricPill: "98.6% Rating",
    metricPillColor: "teal",
    title: "The Coconut Grove Hermitage",
    description:
      "Woven bamboo open-air pavilions and warm sea-salt hydro pools integrating Marma point bodywork and Ayurvedic compresses.",
    footerLabel: "COASTAL WELLNESS SANCTUARY",
  },
];

interface HospitalityTransformationsSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    transformations?: {
      title: string;
      before: string;
      after: string;
      description: string;
    }[];
  };
}

export function HospitalityTransformationsSection({
  data,
}: HospitalityTransformationsSectionProps) {
  const eyebrow = data?.eyebrow || "PROVEN TRANSFORMATIONS";
  const heading = data?.heading || "Sanctuaries Across Diverse Terrains";
  const description =
    data?.description ||
    "Each sanctuary is uniquely contextualized to geographic topology, indigenous flora, and native architecture.";

  const displayTransformations: TransformationCard[] = data?.transformations
    ?.length
    ? data.transformations.map((t, i) => ({
        ...transformations[i % transformations.length],
        title: t.title || transformations[i % transformations.length].title,
        description:
          t.description ||
          transformations[i % transformations.length].description,
      }))
    : transformations;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 md:mb-16">
          <div className="lg:col-span-5 flex flex-col items-start">
            <p className="text-[10.5px] md:text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-2">
              {eyebrow}
            </p>
            <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[36px] leading-[1.18] text-kynta-charcoal font-normal mb-3.5 max-w-[420px]">
              {heading}
            </h2>
            <p className="text-[12px] md:text-[12.5px] leading-[1.65] text-kynta-warm-gray max-w-[400px]">
              {description}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[553/173] rounded-[16px] sm:rounded-[18px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <Image
                src="/hospitality-terrains.jpg"
                alt="Luxury resort sanctuary outdoor hydro pool with waterfall and loungers"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {displayTransformations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[16px] border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.025)] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_6px_22px_rgba(0,0,0,0.04)]"
            >
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.12em] uppercase text-kynta-rust">
                    {item.location}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[9.5px] font-semibold tracking-[0.04em] px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                      item.metricPillColor === "teal"
                        ? "bg-[#e5f0ed] text-[#0a4844]"
                        : "bg-[#e8ebec] text-[#2c4046]"
                    }`}
                  >
                    {item.metricPill}
                  </span>
                </div>

                <h3 className="font-serif text-[17px] sm:text-[18px] md:text-[19px] leading-snug font-normal text-kynta-charcoal mb-2.5">
                  {item.title}
                </h3>

                <p className="text-[11.5px] md:text-[12px] leading-[1.62] text-kynta-warm-gray flex-1">
                  {item.description}
                </p>
              </div>

              <div className="px-6 py-3.5 sm:px-7 bg-[#f7faf8] border-t border-kynta-border/30">
                <p className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.12em] uppercase text-kynta-warm-gray">
                  {item.footerLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
