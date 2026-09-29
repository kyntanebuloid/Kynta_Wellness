interface ExperienceProtocolSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    steps?: {
      number: string;
      title: string;
      description: string;
    }[];
  };
}

const defaultSteps = [
  {
    number: "01",
    accent: "teal" as const,
    title: "Arrival & Unclutter",
    body: "Warm botanical foot soak with freshly crushed marigold, rock salt, and cardamom infusion to ground bodily static.",
    footer: "15 Minutes",
  },
  {
    number: "02",
    accent: "teal" as const,
    title: "Diagnostic Consultation",
    body: "Pulse reading by Vaidya, thermal chamber calibration, and bespoke botanical scent harmonization for your bio-energy.",
    footer: "15 Minutes",
  },
  {
    number: "03",
    accent: "rust" as const,
    title: "Therapeutic Core Touch",
    body: "Customized rhythmic strokes, heated river stone gliding, and single-estate cold-pressed oil absorption.",
    footer: "60 – 90 Minutes",
  },
  {
    number: "04",
    accent: "teal" as const,
    title: "Stillness Lounge",
    body: "Acoustic relaxation in sound-dampened lime plaster grottos with restorative warm herbal tonics and organic dry fruits.",
    footer: "30 Minutes",
  },
  {
    number: "05",
    accent: "teal" as const,
    title: "Home Integration",
    body: "Custom apothecary formulations, dosha-specific nutrition guidelines, and circadian sleep rituals sent to your private portal.",
    footer: "Post-Care Protocol",
  },
];

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
  const steps = data?.steps
    ? data.steps.map((step, i) => ({
        number: step.number || String(i + 1).padStart(2, "0"),
        accent: (i === 2 ? "rust" : "teal") as "teal" | "rust",
        title: step.title,
        body: step.description,
        footer:
          [
            "15 Minutes",
            "15 Minutes",
            "60 – 90 Minutes",
            "30 Minutes",
            "Post-Care Protocol",
          ][i] || "15 Minutes",
      }))
    : defaultSteps;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-4">
          {data?.eyebrow || "Somatic Ritual Sequence"}
        </p>
        <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-5">
          {data?.heading || "The Five-Step Experience Protocol"}
        </h2>
        <p
          className="text-[15px] leading-[1.75] text-kynta-warm-gray mb-14"
          style={{ maxWidth: "650px" }}
        >
          {data?.description ||
            "Every visit at a Kynta sanctuary follows a rigorous ritual protocol engineered to guide the physiology effortlessly from beta-stress states into parasympathetic renewal."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
