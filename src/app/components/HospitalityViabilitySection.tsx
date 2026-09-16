import Image from "next/image";

export interface ViabilityStat {
  id: string;
  metric: string;
  label: string;
  description: string;
}

export const viabilityStats: ViabilityStat[] = [
  {
    id: "length-of-stay",
    metric: "+2.4 Days",
    label: "LENGTH OF STAY",
    description:
      "Curated curative retreat programs convert overnight guests to extended-stay wellness patrons.",
  },
  {
    id: "off-season",
    metric: "62%",
    label: "OFF-SEASON RESILIENCE",
    description:
      "Monsoon panchakarma and seasonal thermal therapies maintain high occupancy through shoulder months.",
  },
  {
    id: "retail-attachment",
    metric: "42%",
    label: "RETAIL ATTACHMENT",
    description:
      "Hand-crafted tisanes, dosha oils, and wellness lifestyle wares generating top-tier retail gross margins.",
  },
  {
    id: "accreditations",
    metric: "Tier-1",
    label: "GLOBAL ACCREDITATIONS",
    description:
      "Immediate readiness for Condé Nast Johansens, Tatler Spa Awards, and Global Wellness Institute benchmarks.",
  },
];

interface HospitalityViabilitySectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    stats?: {
      value: string;
      label: string;
      description: string;
    }[];
    image?: {
      _type: "image";
      asset: { _ref: string; _type: "reference" };
      alt?: string;
    };
  };
}

export function HospitalityViabilitySection({
  data,
}: HospitalityViabilitySectionProps) {
  const eyebrow = data?.eyebrow || "COMMERCIAL VIABILITY";
  const heading = data?.heading || "Tangible Asset Enhancement";
  const description =
    data?.description ||
    "Transforming spatial footprint into predictable, premium-yielding hospitality assets.";

  const stats: ViabilityStat[] = data?.stats?.length
    ? data.stats.map((s, i) => ({
        ...viabilityStats[i % viabilityStats.length],
        metric: s.value || viabilityStats[i % viabilityStats.length].metric,
        label: s.label || viabilityStats[i % viabilityStats.length].label,
        description:
          s.description ||
          viabilityStats[i % viabilityStats.length].description,
      }))
    : viabilityStats;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] aspect-[459/344] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.07)]">
              <Image
                src="/hospitality-chamber.jpg"
                alt="Apothecary and marma therapy treatment chamber with teakwood louvers and natural stone textures"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md border border-white/80 rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center">
                <span className="text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.1em] uppercase text-kynta-charcoal whitespace-nowrap">
                  APOTHECARY &amp; MARMA CHAMBER DETAILING
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-start">
            <p className="text-[10.5px] md:text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-2">
              {eyebrow}
            </p>

            <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] leading-[1.18] text-kynta-charcoal font-normal mb-3">
              {heading}
            </h2>

            <p className="text-[12px] md:text-[12.5px] leading-[1.65] text-kynta-warm-gray mb-7 sm:mb-8 max-w-[460px]">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white rounded-[14px] p-5 sm:p-5.5 border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-start"
                >
                  <span
                    className="font-serif text-[26px] sm:text-[28px] md:text-[30px] leading-tight font-normal mb-1.5"
                    style={{ color: "var(--kynta-teal-dark)" }}
                  >
                    {stat.metric}
                  </span>

                  <h3 className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.12em] uppercase text-kynta-charcoal mb-2">
                    {stat.label}
                  </h3>

                  <p className="text-[11px] sm:text-[11.5px] leading-[1.58] text-kynta-warm-gray">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
