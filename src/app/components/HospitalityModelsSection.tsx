import Link from "next/link";

import {
  type HospitalityPageContent,
  hospitalityPageDefaults,
} from "@/content/hospitality";
import { list, text } from "@/content/types";

interface PartnershipModel {
  number: string;
  pillLabel: string;
  isHighlighted: boolean;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
}

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

          {isHighlighted ? (
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
          {model.bullets.map((bullet, index) => (
            <li
              key={`${bullet}-${index}`}
              className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-kynta-charcoal/85"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                  isHighlighted
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
  data?: HospitalityPageContent["modelsSection"];
}

export function HospitalityModelsSection({
  data,
}: HospitalityModelsSectionProps) {
  const d = hospitalityPageDefaults.modelsSection;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);

  const models: PartnershipModel[] = list(data?.models, d.models).map(
    (m, i) => ({
      number: text(m.number, String(i + 1).padStart(2, "0")),
      pillLabel: m.pillLabel ?? "",
      isHighlighted: m.highlighted ?? false,
      title: m.title,
      description: m.description,
      bullets: m.features ?? [],
      ctaLabel: m.ctaLabel ?? "",
      ctaHref: text(m.ctaUrl, "/contact"),
    }),
  );

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="section-label font-semibold text-kynta-rust tracking-wide mb-3">
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
          {models.map((model, index) => (
            <ModelCard key={`${model.title}-${index}`} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
}
