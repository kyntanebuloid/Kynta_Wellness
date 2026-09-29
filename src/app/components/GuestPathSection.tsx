interface GuestPathSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    steps?: {
      number: string;
      title: string;
      description: string;
    }[];
    faq?: {
      question: string;
      answer: string;
    }[];
    stats?: {
      value: string;
      label: string;
    }[];
  };
}

const defaultGuestSteps = [
  {
    number: "01",
    title: "ARRIVE & UNCLUTTER",
    description:
      "Warm kansa floral footbath with crushed marigolds and a chilled adaptogenic vetiver-cardamom infusion.",
    icon: "footbath",
  },
  {
    number: "02",
    title: "DIAGNOSTIC",
    description:
      "In-depth consultation covering current dosha state, emotional fatigue, tension maps, and botanical scent preferences.",
    icon: "clipboard",
  },
  {
    number: "03",
    title: "THERAPEUTIC TOUCH",
    description:
      "Customized organic botanical oils warmed to exact skin temperature, delivered with deliberate marma flow.",
    icon: "hands",
  },
  {
    number: "04",
    title: "STILLNESS LOUNGE",
    description:
      "Post-treatment quietude in our silent solarium with freshly brewed Kashmiri kahwa and dry figs.",
    icon: "cup",
  },
  {
    number: "05",
    title: "INTEGRATIVE CARE",
    description:
      "Home wellness prescription, circadian breathwork exercises, and customized botanical oil dispensaries.",
    icon: "infinity",
  },
];

const defaultStats = [
  { value: "18+", label: "Destination Spas" },
  { value: "9", label: "Indian Cities & Retreats" },
  { value: "140+", label: "Certified Therapists" },
  { value: "85k+", label: "Rituals Delivered" },
  { value: "98.4%", label: "Guest Satisfaction Index", accent: true },
];

const hotelNames = [
  ["THE GLENWOOD MANOR", "HERITAGE RETREATS", "PALMS MORJIM"],
  ["METROPOLITAN HOTELS"],
];

const testimonials = [
  {
    quote:
      "\u201CThe Kynta Prana Herbal Compress restored my body after grueling weeks of corporate travel. The precision of the therapist\u2019s touch and the organic cedar oil aroma made it one of the finest spas in Asia.\u201D",
    name: "Ananya Singhania",
    affiliation: "Stayed at Glenwood Manor, Shimla",
  },
  {
    quote:
      "\u201CAs resort owners, outsourcing our spa to Kynta was the most profitable operational move we made in 2024. Revenue per treatment room jumped 38%, and guest mentions of the spa doubled.\u201D",
    name: "Vikramjit Oberoi-Mehra",
    affiliation: "Managing Director, Heritage Palace Properties",
  },
  {
    quote:
      "\u201CThe Kumkumadi Golden Radiance facial left my complexion luminous for days. It didn\u2019t feel like a transactional hotel appointment, but an ancient restorative intuition.\u201D",
    name: "Claire Beauchamp",
    affiliation: "Guest at Kynta Palms Resort, Goa",
  },
];

function StepIcon({ type }: { type: string }) {
  const cls = "text-kynta-rust";
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
    case "footbath":
      return (
        <svg {...common} className={cls}>
          <title>Footbath</title>
          <path d="M4 20h16M7 16c0-2 1.5-3 5-3s5 1 5 3" />
          <path d="M12 7v6M9 4c0 1.5 1.5 3 3 3s3-1.5 3-3" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common} className={cls}>
          <title>Diagnostic</title>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="14" x2="15" y2="14" />
          <line x1="9" y1="6" x2="11" y2="6" />
        </svg>
      );
    case "hands":
      return (
        <svg {...common} className={cls}>
          <title>Therapeutic touch</title>
          <path d="M12 21c-4-2-8-5-8-10a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 5-4 8-8 10z" />
        </svg>
      );
    case "cup":
      return (
        <svg {...common} className={cls}>
          <title>Stillness lounge</title>
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case "infinity":
      return (
        <svg {...common} className={cls}>
          <title>Integrative care</title>
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
        </svg>
      );
    default:
      return null;
  }
}

function GuestPathCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col bg-kynta-section-bg rounded-[5px] p-4 lg:p-5 border border-kynta-border/30">
      <span className="text-base font-semibold text-kynta-teal font-serif mb-3">
        {number}
      </span>
      <h4 className="text-[11px] font-bold tracking-[0.12em] text-kynta-charcoal mb-2.5">
        {title}
      </h4>
      <p className="text-[12px] leading-[1.6] text-kynta-warm-gray flex-1 mb-4">
        {description}
      </p>
      <StepIcon type={icon} />
    </div>
  );
}

function RustStars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={`star-${i}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-kynta-rust"
        >
          <title>Star</title>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function CircleArrowButton({ direction }: { direction: "left" | "right" }) {
  return (
    <button
      type="button"
      className="w-8 h-8 rounded-full bg-kynta-section-bg border border-kynta-border text-kynta-warm-gray flex items-center justify-center hover:bg-kynta-teal hover:text-white hover:border-kynta-teal transition-colors"
      aria-label={`Scroll ${direction}`}
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <title>{direction === "left" ? "Previous" : "Next"}</title>
        {direction === "left" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        )}
      </svg>
    </button>
  );
}

const iconTypes = ["footbath", "clipboard", "hands", "cup", "infinity"];

export function GuestPathSection({ data }: GuestPathSectionProps) {
  const eyebrow = data?.eyebrow || "The Fivefold Guest Path";
  const heading =
    data?.heading || "An choreographed immersion in sensory stillness.";

  const guestSteps =
    data?.steps?.map((s, i) => ({
      ...s,
      icon: iconTypes[i] || "footbath",
    })) || defaultGuestSteps;

  const stats = data?.stats || defaultStats;

  return (
    <>
      <section className="w-full bg-kynta-section-bg pt-16 md:pt-20 pb-16 md:pb-20">
        <div className="container-site">
          <div className="relative text-center mb-10 md:mb-12">
            <div className="hidden md:flex items-center gap-2 absolute top-0 right-0">
              <CircleArrowButton direction="left" />
              <CircleArrowButton direction="right" />
            </div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-3">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mx-auto max-w-xl mb-4 whitespace-pre-line">
              {heading}
            </h2>
            <p className="text-[14px] leading-[1.7] text-kynta-warm-gray mx-auto max-w-lg">
              From the instant of reception to ongoing post-retreat integration,
              every micro-moment is deliberately paced.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {guestSteps.map((step) => (
              <GuestPathCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 md:py-14 border-t border-b border-kynta-border/50">
        <div className="container-site">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className={`font-serif text-3xl lg:text-4xl leading-tight mb-1.5 ${
                    "accent" in s && s.accent
                      ? "text-kynta-rust"
                      : "text-kynta-charcoal"
                  }`}
                >
                  {s.value}
                </p>
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-kynta-warm-gray">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-kynta-section-bg py-12 md:py-16">
        <div className="container-site text-center">
          <p className="text-[13px] text-kynta-warm-gray tracking-wide mb-6">
            Trusted by India&apos;s Foremost Independent Luxury Hoteliers
          </p>
          {hotelNames.map((row) => (
            <div
              key={`row-${row.join("-")}`}
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 mb-2"
            >
              {row.map((name) => (
                <span
                  key={name}
                  className="font-serif text-lg md:text-xl lg:text-2xl tracking-[0.08em] text-kynta-charcoal"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-kynta-section-bg pb-16 md:pb-20">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col bg-white rounded-md p-6 border border-kynta-border/30"
              >
                <RustStars />
                <p className="font-serif text-[14px] italic leading-[1.7] text-kynta-charcoal mb-5 flex-1">
                  {t.quote}
                </p>
                <div>
                  <p className="text-[13px] font-semibold text-kynta-charcoal">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-kynta-warm-gray">
                    {t.affiliation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
