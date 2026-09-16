interface PillarsSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    pillars?: {
      icon?: string;
      title: string;
      description: string;
    }[];
  };
}

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-kynta-teal"
    >
      <title>Master Therapists</title>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-kynta-teal"
    >
      <title>120-Point Protocol</title>
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <circle cx="9" cy="8" r="2" fill="currentColor" />
      <circle cx="15" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

function CalibrateIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-kynta-teal"
    >
      <title>Dosha Calibration</title>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-kynta-teal"
    >
      <title>Yield Elevation</title>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

const iconMap: Record<string, React.FC> = {
  shield: ShieldIcon,
  sliders: SlidersIcon,
  calibrate: CalibrateIcon,
  trendUp: TrendUpIcon,
};

const defaultPillars = [
  {
    icon: "shield",
    title: "Master Therapists",
    description:
      "Every Kynta practitioner undergoes 400+ hours of rigorous residential curriculum via the Kynta Wellness Academy, certified in authentic marma stimulation and anatomical ergonomics.",
    badge: "Zero Staff Turnover Risk",
  },
  {
    icon: "sliders",
    title: "120-Point Protocol",
    description:
      "Uncompromising standardization across thermal temperatures, cold-chain botanical oil freshness, ambient acoustic parameters, and five-star linen hygiene audits.",
    badge: "Monthly Quality Audits",
  },
  {
    icon: "calibrate",
    title: "Dosha Calibration",
    description:
      "No generic treatments. Each session commences with our sensory diagnostics questionnaire and pulse check, dynamically tailoring thermal oil infusions and touch pressure.",
    badge: "Bespoke Blends Per Guest",
  },
  {
    icon: "trendUp",
    title: "Yield Elevation",
    description:
      "Designed for luxury hotel P&Ls. We maximize RevPASH (Revenue Per Available Spa Hour) through dynamic booking orchestration, experiential retail, and elevated guest retention.",
    badge: "Average +32% RevPASH",
  },
];

function PillarCard({
  number,
  icon,
  title,
  body,
  badge,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  badge: string;
}) {
  return (
    <div className="flex flex-col bg-white rounded-lg p-5 border border-kynta-border/50">
      <div className="flex items-start justify-between mb-4">
        <span className="text-lg font-semibold text-kynta-rust">{number}</span>
        {icon}
      </div>
      <h3 className="font-serif text-lg leading-snug text-kynta-charcoal mb-3">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.65] text-kynta-warm-gray mb-5 flex-1">
        {body}
      </p>
      <span className="inline-block self-start text-[12px] font-medium text-kynta-teal-dark bg-kynta-badge-green px-3 py-1.5 rounded-md">
        {badge}
      </span>
    </div>
  );
}

export function PillarsSection({ data }: PillarsSectionProps) {
  const eyebrow = data?.eyebrow || "The Four Architectural Pillars";
  const heading =
    data?.heading ||
    "Institutional discipline meets classical restorative lineage.";

  const pillars =
    data?.pillars?.map((p, i) => ({
      ...p,
      number: String(i + 1).padStart(2, "0"),
      badge: defaultPillars[i]?.badge || "",
    })) ||
    defaultPillars.map((p, i) => ({
      ...p,
      number: String(i + 1).padStart(2, "0"),
    }));

  return (
    <section className="w-full bg-kynta-pillars-bg pt-20 md:pt-[85px] pb-20 md:pb-24">
      <div className="container-site">
        <p className="text-sm font-medium text-kynta-rust tracking-wide mb-4">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl lg:text-[34px] leading-[1.25] text-kynta-charcoal max-w-2xl mb-12 md:mb-14 whitespace-pre-line">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => {
            const IconComponent = iconMap[pillar.icon || ""] || ShieldIcon;
            return (
              <PillarCard
                key={pillar.title}
                number={pillar.number}
                icon={<IconComponent />}
                title={pillar.title}
                body={pillar.description}
                badge={pillar.badge}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
