export interface AssurancePillar {
  id: string;
  title: string;
  description: string;
  iconType: "certified" | "housing" | "closed-loop" | "pms";
}

export const assurancePillars: AssurancePillar[] = [
  {
    id: "certified",
    title: "NABH & Ayush Certified",
    description:
      "100% adherence to statutory clinical benchmarks and wild-harvested botanicals with zero synthetics.",
    iconType: "certified",
  },
  {
    id: "housing",
    title: "Fair-Wage & Housing",
    description:
      "Dedicated staff accommodation, ethical remuneration, and continuous career mastery ensuring 94% retention.",
    iconType: "housing",
  },
  {
    id: "closed-loop",
    title: "Zero-Plastic Closed-Loop",
    description:
      "Closed-loop graywater botanical regeneration and zero single-use plastics throughout all treatment grottos.",
    iconType: "closed-loop",
  },
  {
    id: "pms",
    title: "Seamless PMS Integration",
    description:
      "Native synchronization with Oracle Opera Cloud, Infor HMS, Protel, and enterprise CRS ledgers.",
    iconType: "pms",
  },
];

function AssuranceIcon({ type }: { type: AssurancePillar["iconType"] }) {
  switch (type) {
    case "certified":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#6ee7b7]"
          aria-hidden="true"
        >
          <path d="M12 2l2.4 2.8 3.7-.4 1.4 3.4 3.4 1.4-.4 3.7 2.8 2.4-2.8 2.4.4 3.7-3.4 1.4-1.4 3.4-3.7-.4L12 22l-2.4-2.8-3.7.4-1.4-3.4-3.4-1.4.4-3.7-2.8-2.4 2.8-2.4-.4-3.7 3.4-1.4 1.4-3.4 3.7.4z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "housing":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#6ee7b7]"
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "closed-loop":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#6ee7b7]"
          aria-hidden="true"
        >
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
          <path d="M11 19h8.2a1.8 1.8 0 0 0 1.55-2.7L18 12" />
          <path d="m11 5 2.5 4.5" />
          <path d="m14 2 3 3-3 3" />
          <path d="m2 14 3-3 3 3" />
        </svg>
      );
    default:
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#6ee7b7]"
          aria-hidden="true"
        >
          <path d="m17 7 4 4-4 4" />
          <path d="M3 11h18" />
          <path d="m7 17-4-4 4-4" />
          <path d="M21 13H3" />
        </svg>
      );
  }
}

interface HospitalityAssuranceSectionProps {
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

export function HospitalityAssuranceSection({
  data,
}: HospitalityAssuranceSectionProps) {
  const eyebrow = data?.eyebrow || "INSTITUTIONAL ASSURANCE";
  const heading = data?.heading || "Uncompromising Operational Rigor";
  const description =
    data?.description ||
    "Statutory clinical compliance, ecological safeguards, and seamless technical integration to protect your property's brand equity.";

  const pillars: AssurancePillar[] = data?.pillars?.length
    ? data.pillars.map((p, i) => ({
        ...assurancePillars[i % assurancePillars.length],
        title: p.title || assurancePillars[i % assurancePillars.length].title,
        description:
          p.description ||
          assurancePillars[i % assurancePillars.length].description,
      }))
    : assurancePillars;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden text-white"
      style={{ backgroundColor: "#004349" }}
    >
      <div className="container-site">
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-[#a5c8c2] tracking-wide mb-3">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-white mb-4">
            {heading}
          </h2>
          <p className="text-[15px] leading-[1.7] text-[#a0beb6] max-w-xl">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pillars.map((item) => (
            <div
              key={item.id}
              className="rounded-[16px] p-6 sm:p-7 border border-[#176a71]/60 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex flex-col justify-start h-full transition-all duration-300 hover:border-[#228b94]/80 hover:-translate-y-0.5"
              style={{ backgroundColor: "#085258" }}
            >
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 mb-5"
                style={{ backgroundColor: "#0d5f66" }}
              >
                <AssuranceIcon type={item.iconType} />
              </div>

              <h3 className="font-serif text-xl font-normal leading-snug text-white mb-2.5">
                {item.title}
              </h3>

              <p className="text-[13px] leading-[1.7] text-[#a0beb6]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
