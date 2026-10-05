import {
  type HospitalityPageContent,
  hospitalityPageDefaults,
  type AssuranceIcon as AssuranceIconType,
} from "@/content/hospitality";
import { list, text } from "@/content/types";

function AssuranceIcon({ type }: { type: AssuranceIconType }) {
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
  data?: HospitalityPageContent["assuranceSection"];
}

export function HospitalityAssuranceSection({
  data,
}: HospitalityAssuranceSectionProps) {
  const d = hospitalityPageDefaults.assuranceSection;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);
  const pillars = list(data?.pillars, d.pillars).map((p, i) => ({
    title: p.title,
    description: p.description,
    iconType: p.icon ?? d.pillars[i % d.pillars.length].icon,
  }));

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden text-white"
      style={{ backgroundColor: "#004349" }}
    >
      <div className="container-site">
        <div className="mb-12 md:mb-16">
          <p className="section-label font-semibold text-[#a5c8c2] tracking-wide mb-3">
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
          {pillars.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
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
