import Link from "next/link";

export interface PartnershipModel {
  id: string;
  number: string;
  pillLabel: string;
  pillType: "neutral" | "highlight";
  title: string;
  description: string;
  bullets: string[];
  bulletDotColor: "rust" | "teal";
  ctaLabel: string;
  ctaHref: string;
  isHighlighted?: boolean;
}

export const partnershipModels: PartnershipModel[] = [
  {
    id: "model-turnkey",
    number: "01",
    pillLabel: "TIER A",
    pillType: "neutral",
    title: "Full Turnkey Management",
    description:
      "Autonomous operational stewardship spanning certified talent, botanical provisioning, and full P&L governance.",
    bullets: [
      "Full P&L custodianship & transparent ledger reporting",
      "Proprietary Vaidya somatic staffing pipeline",
      "Forbes 5–Star spa readiness protocols",
    ],
    bulletDotColor: "rust",
    ctaLabel: "EXPLORE TURNKEY TERMS",
    ctaHref: "/contact?tier=turnkey",
    isHighlighted: false,
  },
  {
    id: "model-masterplanning",
    number: "02",
    pillLabel: "ARCHITECT PICK",
    pillType: "highlight",
    title: "Spatial & Acoustic Masterplanning",
    description:
      "Architectural co-creation, hydrothermal circuit engineering, circadian lighting, and sub-24dB sound isolation.",
    bullets: [
      "Sub-24dB acoustic decoupling blueprints",
      "Circadian photobiology & hydrothermal zoning",
      "Biophilic local stone & timber integration",
    ],
    bulletDotColor: "teal",
    ctaLabel: "INQUIRE DESIGN ADVISORY",
    ctaHref: "/contact?tier=advisory",
    isHighlighted: true,
  },
  {
    id: "model-licensing",
    number: "03",
    pillLabel: "TIER C",
    pillType: "neutral",
    title: "White-Label Sanctuary Licensing",
    description:
      "Wild-harvested herbal formulation lines under your resort's banner, backed by Kynta curative standards.",
    bullets: [
      "Co-branded organic apothecary formulations",
      "Certified 28-day restorative ritual menus",
      "Quarterly somatic audits & masterclasses",
    ],
    bulletDotColor: "rust",
    ctaLabel: "REQUEST LICENSING KIT",
    ctaHref: "/contact?tier=licensing",
    isHighlighted: false,
  },
];

function ModelCard({ model }: { model: PartnershipModel }) {
  const isHighlighted = model.isHighlighted;

  return (
    <div
      className={`bg-white rounded-[16px] p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full transition-all duration-300 ${
        isHighlighted
          ? "border-[1.5px] border-[#0a4844]/45 shadow-[0_6px_28px_rgba(10,72,68,0.06)]"
          : "border border-kynta-border/40 shadow-[0_2px_14px_rgba(0,0,0,0.025)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.04)]"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <span className="font-serif italic text-[15px] sm:text-[16px] text-kynta-rust">
            {model.number}
          </span>

          {model.pillType === "highlight" ? (
            <span
              className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.08em] px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: "#004349" }}
            >
              {model.pillLabel}
            </span>
          ) : (
            <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.08em] px-2.5 py-1 rounded-full bg-[#ebe8e1] text-kynta-charcoal">
              {model.pillLabel}
            </span>
          )}
        </div>

        <h3 className="font-serif text-xl lg:text-[22px] leading-snug text-kynta-charcoal mb-3">
          {model.title}
        </h3>

        <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-6">
          {model.description}
        </p>

        <ul className="space-y-2.5 mb-8">
          {model.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-kynta-charcoal/85"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                  model.bulletDotColor === "teal"
                    ? "bg-kynta-teal-dark"
                    : "bg-kynta-rust"
                }`}
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 mt-auto">
        <Link
          href={model.ctaHref}
          className="text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1.5 group text-kynta-teal-dark hover:text-kynta-teal"
        >
          <span>{model.ctaLabel}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

interface HospitalityModelsSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    models?: {
      title: string;
      description: string;
      features?: string[];
    }[];
  };
}

export function HospitalityModelsSection({
  data,
}: HospitalityModelsSectionProps) {
  const eyebrow = data?.eyebrow || "FLEXIBLE INTEGRATION";
  const heading = data?.heading || "Three Bespoke Partnership Models";
  const description =
    data?.description ||
    "Calibrated to ownership governance, development stage, and target capital efficiency.";

  const models: PartnershipModel[] = data?.models?.length
    ? data.models.map((m, i) => ({
        ...partnershipModels[i % partnershipModels.length],
        title: m.title || partnershipModels[i % partnershipModels.length].title,
        description:
          m.description ||
          partnershipModels[i % partnershipModels.length].description,
        bullets: m.features?.length
          ? m.features
          : partnershipModels[i % partnershipModels.length].bullets,
      }))
    : partnershipModels;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-3">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-4 max-w-xl">
              {heading}
            </h2>
          </div>

          <div className="md:pt-6">
            <p className="text-[15px] leading-[1.7] text-kynta-warm-gray max-w-md">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
}
