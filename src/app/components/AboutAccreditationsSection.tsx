export interface Accreditation {
  id: string;
  title: string;
  subtitle: string;
  iconType: "medal" | "shield" | "star" | "eco";
}

export const accreditations: Accreditation[] = [
  {
    id: "gwi",
    title: "Global Wellness Institute",
    subtitle: "CHARTER SPA MEMBER",
    iconType: "medal",
  },
  {
    id: "apb",
    title: "Ayurvedic Pharmacopoeia Board",
    subtitle: "CERTIFIED 100% PURE ORIGIN",
    iconType: "shield",
  },
  {
    id: "lsa",
    title: "Luxury Spa Awards",
    subtitle: "BEST HOLISTIC CONCEPT 2024",
    iconType: "star",
  },
  {
    id: "ess",
    title: "Eco-Sanctuary Standard",
    subtitle: "ZERO SINGLE-USE PLASTIC",
    iconType: "eco",
  },
];

function AccreditationIcon({ type }: { type: Accreditation["iconType"] }) {
  switch (type) {
    case "medal":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-kynta-rust"
          aria-hidden="true"
        >
          <circle cx="12" cy="8.5" r="5.5" />
          <path d="m9 8.5 1.5 1.5 4-4" />
          <path d="M8.2 13.5 6 21l6-3 6 3-2.2-7.5" />
        </svg>
      );
    case "shield":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-kynta-rust"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "star":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-kynta-rust"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return (
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-kynta-rust"
          aria-hidden="true"
        >
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
          <path d="M11 19h8.2a1.8 1.8 0 0 0 1.55-2.7L18 12" />
          <path d="m11 5 2.5 4.5" />
          <path d="m14 2 3 3-3 3" />
          <path d="m2 14 3-3 3 3" />
        </svg>
      );
  }
}

interface AboutAccreditationsSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    awards?: {
      title: string;
      organization: string;
      year?: string;
      description?: string;
    }[];
  };
}

export function AboutAccreditationsSection({
  data,
}: AboutAccreditationsSectionProps) {
  const eyebrow =
    data?.eyebrow ||
    "RECOGNIZED BY GLOBAL WELLNESS & HERITAGE HOSPITALITY COUNCILS";

  const displayAccreditations: Accreditation[] = data?.awards?.length
    ? data.awards.map((a, i) => ({
        ...accreditations[i % accreditations.length],
        title: a.title || accreditations[i % accreditations.length].title,
        subtitle:
          a.organization || accreditations[i % accreditations.length].subtitle,
      }))
    : accreditations;

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <p className="text-sm font-medium tracking-wide text-kynta-charcoal text-center mb-8 md:mb-10">
          {eyebrow}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayAccreditations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[14px] border border-kynta-border/30 shadow-[0_2px_12px_rgba(0,0,0,0.025)] py-7 px-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
            >
              <div className="mb-3.5 flex items-center justify-center">
                <AccreditationIcon type={item.iconType} />
              </div>

              <h3 className="font-serif text-base md:text-lg leading-snug font-normal text-kynta-charcoal mb-1.5">
                {item.title}
              </h3>

              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-kynta-warm-gray">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
