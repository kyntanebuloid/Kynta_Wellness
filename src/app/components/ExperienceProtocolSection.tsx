import {
  type ExperiencesPageContent,
  experiencesPageDefaults,
} from "@/content/experiences";
import { list, text } from "@/content/types";

interface ExperienceProtocolSectionProps {
  data?: ExperiencesPageContent["protocolSection"];
}

function StepBadge({
  number,
  accent,
}: {
  number: string;
  accent: "teal" | "rust";
}) {
  const bg = accent === "rust" ? "bg-kynta-rust" : "bg-kynta-teal-dark";

  return (
    <span
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-[13px] font-semibold text-white ${bg}`}
    >
      {number}
    </span>
  );
}

function StepCard({
  number,
  accent,
  title,
  body,
  footer,
}: {
  number: string;
  accent: "teal" | "rust";
  title: string;
  body: string;
  footer: string;
}) {
  return (
    <div
      className="flex flex-col rounded-[14px] p-6"
      style={{ backgroundColor: "#f0eeeb" }}
    >
      <div className="mb-6">
        <StepBadge number={number} accent={accent} />
      </div>
      <h3 className="font-serif text-[17px] leading-snug text-kynta-charcoal mb-3">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.65] text-kynta-warm-gray mb-6 flex-1">
        {body}
      </p>
      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal mt-auto">
        {footer}
      </p>
    </div>
  );
}

export function ExperienceProtocolSection({
  data,
}: ExperienceProtocolSectionProps) {
  const d = experiencesPageDefaults.protocolSection;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);
  const steps = list(data?.steps, d.steps).map((step, i) => ({
    number: text(step.number, String(i + 1).padStart(2, "0")),
    accent: step.color ?? d.steps[i % d.steps.length].color,
    title: step.title,
    body: step.description,
    footer: step.duration ?? "",
  }));

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <p className="section-label font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-4">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-5">
          {heading}
        </h2>
        <p
          className="text-[15px] leading-[1.75] text-kynta-warm-gray mb-14"
          style={{ maxWidth: "650px" }}
        >
          {description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <StepCard key={`${step.number}-${index}`} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
