import type { ReactNode } from "react";

function FlaskIcon() {
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
      className="text-kynta-rust"
    >
      <title>Botanical Sourcing</title>
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.63a1 1 0 0 0 .9 1.37h12.76a1 1 0 0 0 .9-1.37l-5.07-10.207A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
    </svg>
  );
}

function PulseIcon() {
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
      className="text-kynta-rust"
    >
      <title>Precision Diagnostics</title>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function BuildingIcon() {
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
      className="text-kynta-rust"
    >
      <title>Hydrothermal Architecture</title>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M12 7V3" />
      <path d="M8 7V5" />
      <path d="M16 7V5" />
      <path d="M6 11h4" />
      <path d="M14 11h4" />
      <path d="M6 15h4" />
      <path d="M14 15h4" />
    </svg>
  );
}

function HourglassIcon() {
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
      className="text-kynta-rust"
    >
      <title>Unhurried Cadence</title>
      <path d="M5 22h14" />
      <path d="M5 2h14" />
      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </svg>
  );
}

function LeafSmallIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-kynta-teal"
    >
      <title>Leaf</title>
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.8 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function TargetSmallIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-kynta-teal"
    >
      <title>Target</title>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function DropletSmallIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-kynta-teal"
    >
      <title>Droplet</title>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function MoonSmallIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-kynta-teal"
    >
      <title>Moon</title>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

const iconMap: Record<string, ReactNode> = {
  flask: <FlaskIcon />,
  pulse: <PulseIcon />,
  building: <BuildingIcon />,
  hourglass: <HourglassIcon />,
};

const footerIconMap: Record<string, ReactNode> = {
  leaf: <LeafSmallIcon />,
  target: <TargetSmallIcon />,
  droplet: <DropletSmallIcon />,
  moon: <MoonSmallIcon />,
};

interface ExperiencePillarsSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    cards?: {
      icon?: string;
      title: string;
      description: string;
    }[];
  };
}

const defaultPillars = [
  {
    number: "01",
    iconKey: "flask",
    icon: <FlaskIcon />,
    title: "Botanical Sourcing",
    body: "Single-estate hand-pressed oils, wild-harvested Himalayan cedar, high-altitude saffron, and sacred white lotus distilled under lunar cycles.",
    footerLabel: "Pure Botanical Potency",
    footerIcon: <LeafSmallIcon />,
  },
  {
    number: "02",
    iconKey: "pulse",
    icon: <PulseIcon />,
    title: "Precision Diagnostics",
    body: "Comprehensive Nadi Pariksha (pulse assessment), somatic tissue mapping, and doshic constitutional calibration before ritual touch initiates.",
    footerLabel: "Doshic Tri-Balance",
    footerIcon: <TargetSmallIcon />,
  },
  {
    number: "03",
    iconKey: "building",
    icon: <BuildingIcon />,
    title: "Hydrothermal Architecture",
    body: "Hyper-dilute magnesium saline flotation pools, herb-infused steam grottos, and stepped thermal plunge baths designed with acoustic isolation.",
    footerLabel: "Somatic Hydro-Plunges",
    footerIcon: <DropletSmallIcon />,
  },
  {
    number: "04",
    iconKey: "hourglass",
    icon: <HourglassIcon />,
    title: "Unhurried Cadence",
    body: "A minimum 90-minute immersion window ensuring full parasympathetic nervous down-regulation, zero transition rush, and profound cellular stillness.",
    footerLabel: "Parasympathetic Shift",
    footerIcon: <MoonSmallIcon />,
  },
];

function ExperiencePillarCard({
  number,
  icon,
  title,
  body,
  footerLabel,
  footerIcon,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  body: string;
  footerLabel: string;
  footerIcon: ReactNode;
}) {
  return (
    <div className="flex flex-col bg-white rounded-[10px] p-5 border border-kynta-border/50">
      <div className="flex items-start justify-between mb-6">
        <span className="font-serif text-xl text-kynta-teal">{number}</span>
        {icon}
      </div>
      <h3 className="font-serif text-[17px] leading-snug text-kynta-charcoal mb-3">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.65] text-kynta-warm-gray mb-6 flex-1">
        {body}
      </p>
      <div className="flex items-center gap-1.5 mt-auto">
        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-kynta-teal">
          {footerLabel}
        </span>
        {footerIcon}
      </div>
    </div>
  );
}

export function ExperiencePillarsSection({
  data,
}: ExperiencePillarsSectionProps) {
  const pillars = data?.cards
    ? data.cards.map((card, i) => {
        const num = String(i + 1).padStart(2, "0");
        const iconKey = card.icon || "flask";
        const footerLabels = [
          "Pure Botanical Potency",
          "Doshic Tri-Balance",
          "Somatic Hydro-Plunges",
          "Parasympathetic Shift",
        ];
        const footerIconKeys = ["leaf", "target", "droplet", "moon"];
        return {
          number: num,
          icon: iconMap[iconKey] || <FlaskIcon />,
          title: card.title,
          body: card.description,
          footerLabel: footerLabels[i] || "Pure Botanical Potency",
          footerIcon: footerIconMap[footerIconKeys[i]] || <LeafSmallIcon />,
        };
      })
    : defaultPillars;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f0f3f1" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-4">
              {data?.eyebrow || "Foundational Methodology"}
            </p>
            <h2 className="font-serif text-3xl lg:text-[36px] leading-[1.22] text-kynta-charcoal">
              {data?.heading || (
                <>
                  The Four Pillars of the
                  <br className="hidden sm:inline" /> Kynta Experience
                </>
              )}
            </h2>
          </div>
          <div className="flex items-start md:pt-7">
            <p className="text-[14px] leading-[1.75] text-kynta-warm-gray max-w-sm">
              {data?.description ||
                "Where sacred Vedic therapeutic canons intersect with precise clinical physiology to induce total restorative harmony."}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar) => (
            <ExperiencePillarCard key={pillar.number} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
