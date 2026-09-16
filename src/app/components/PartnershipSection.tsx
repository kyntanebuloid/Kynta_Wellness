import Link from "next/link";

interface PartnershipSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    services?: {
      icon?: string;
      title: string;
      description: string;
    }[];
  };
}

const defaultServices = [
  {
    icon: "spatial",
    title: "Spatial Concept & Flow",
    description:
      "Advisory on wet/dry zoning, MEP requirements, acoustic buffering, treatment room ergonomics, and thermal water circuits.",
  },
  {
    icon: "management",
    title: "Turnkey Daily Management",
    description:
      "100% outsourced operations: reservation desk management, luxury service standards, inventory, linen stewardship, and safety audits.",
  },
  {
    icon: "sourcing",
    title: "Academy Therapist Sourcing",
    description:
      "Certified residential recruitment pipeline. We absorb therapist payroll, ongoing certification, medical compliance, and retention risk.",
  },
  {
    icon: "formulation",
    title: "Apothecary Formulation",
    description:
      "Exclusive single-estate herbal formulations and custom hotel-branded apothecary lines packaged in sustainable apothecary glass.",
  },
  {
    icon: "revpash",
    title: "RevPASH Optimization",
    description:
      "Proprietary yield algorithms driving treatment room utilization across peak and non-peak hours, increasing overall property ADR.",
  },
  {
    icon: "brand",
    title: "Brand Asset Elevation",
    description:
      "Enhance your luxury hotel credentials. Partner properties report immediate boosts in Condé Nast and TripAdvisor wellness ratings.",
  },
];

function ServiceIcon({ type }: { type: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "spatial":
      return (
        <svg {...common}>
          <title>Spatial Concept</title>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "management":
      return (
        <svg {...common}>
          <title>Daily Management</title>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "sourcing":
      return (
        <svg {...common}>
          <title>Therapist Sourcing</title>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "formulation":
      return (
        <svg {...common}>
          <title>Apothecary Formulation</title>
          <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
          <path d="M8.5 2h7" />
          <path d="M7 16.5h10" />
        </svg>
      );
    case "revpash":
      return (
        <svg {...common}>
          <title>RevPASH Optimization</title>
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "brand":
      return (
        <svg {...common}>
          <title>Brand Asset Elevation</title>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    default:
      return null;
  }
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col rounded-[5px] border border-white/10 bg-white/[0.06] p-[18px]">
      <div className="w-9 h-9 rounded-md bg-white/[0.08] border border-white/10 flex items-center justify-center text-kynta-teal-light mb-4">
        <ServiceIcon type={icon} />
      </div>
      <h3 className="font-serif text-[16px] text-white leading-snug mb-2.5">
        {title}
      </h3>
      <p className="text-[12.5px] leading-[1.65] text-white/55">
        {description}
      </p>
    </div>
  );
}

export function PartnershipSection({ data }: PartnershipSectionProps) {
  const eyebrow = data?.eyebrow || "Institutional Hospitality Management";
  const heading =
    data?.heading ||
    "A turnkey wellness operation built for five-star hospitality.";

  const services =
    data?.services?.map((s) => ({
      icon: s.icon || "spatial",
      title: s.title,
      description: s.description,
    })) || defaultServices;

  return (
    <section
      className="w-full py-16 md:pt-20 md:pb-24"
      style={{ backgroundColor: "#0c4a46" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-14">
          <div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-4">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl lg:text-[36px] leading-[1.2] text-white mb-5 whitespace-pre-line">
              {heading}
            </h2>
            <p className="text-[14px] leading-[1.7] text-white/55 max-w-md">
              We eliminate the operational friction of hotel spa management.
              Kynta assumes full custodial responsibility—from architecting
              physical footprints to hiring certified therapists and driving
              ancillary guest folio spend.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3 md:max-w-sm md:ml-auto">
            <Link
              href="/partner"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 text-[13px] font-semibold tracking-wide text-white rounded-md transition-colors"
              style={{ backgroundColor: "#9b5a3c" }}
            >
              Request Partnership Dossier
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <title>Arrow</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center w-full px-6 py-3.5 text-[13px] font-semibold tracking-wide text-white border border-white/20 rounded-md hover:bg-white/10 transition-colors"
            >
              Schedule a Hotel Audit Call
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
