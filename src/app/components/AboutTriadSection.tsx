import Image from "next/image";

const triads = [
  {
    number: "01",
    iconColor: "teal" as const,
    title: "Vedic Authenticity & Pure Formulations",
    body: "We reject synthetic binders, parabens, and diluted carrier bases. Our oils are simmered for 72 consecutive hours over slow red-sand furnaces in Kerala using ancient taila-paka methods, aligning formulations with regional doshic seasons.",
    image: "/triad-vedic.jpg",
    footerLabel: "Botanical Integrity",
    footerValue: "100% Raw Lineage",
    footerValueColor: "rust" as const,
  },
  {
    number: "02",
    iconColor: "rust" as const,
    title: "Sensory & Spatial Architecture",
    body: "A restorative experience is governed by spatial biology. Our treatment suites feature low reverberation acoustics (<24dB), natural lime-wash walls that breathe, hand-turned teakwood joinery, and circadian warmth illumination that restores melatonin rhythm.",
    image: "/triad-spatial.jpg",
    footerLabel: "Acoustic & Thermal",
    footerValue: "Decibel Calibrated",
    footerValueColor: "rust" as const,
  },
  {
    number: "03",
    iconColor: "teal" as const,
    title: "Masterful Human Touch",
    body: "Touch is an energetic transmission, not a mechanical routine. Kynta therapists undergo over 1,200 hours of somatic alignment, breath synchronization, and nadi pressure point training. We enforce deliberate, unhurried 90 to 120-minute therapeutic cadences.",
    image: "/triad-touch.jpg",
    footerLabel: "Clinical Standards",
    footerValue: "1,200+ Training Hours",
    footerValueColor: "teal" as const,
  },
];

function CardIcon({ color }: { color: "teal" | "rust" }) {
  const bgClass = color === "rust" ? "bg-kynta-rust/10" : "bg-kynta-teal/10";
  const textClass = color === "rust" ? "text-kynta-rust" : "text-kynta-teal";

  return (
    <div
      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${bgClass}`}
    >
      {color === "teal" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={textClass}
        >
          <title>Shield</title>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={textClass}
        >
          <title>Architecture</title>
          <path d="M2 20h20" />
          <path d="M5 20V8l7-5 7 5v12" />
          <path d="M10 20v-6h4v6" />
        </svg>
      )}
    </div>
  );
}

function TriadCard({
  number,
  iconColor,
  title,
  body,
  image,
  footerLabel,
  footerValue,
  footerValueColor,
}: (typeof triads)[number]) {
  const valueColor =
    footerValueColor === "rust" ? "var(--kynta-rust)" : "var(--kynta-teal)";

  return (
    <div
      className="flex flex-col rounded-[14px] p-6 border border-kynta-border/30"
      style={{ backgroundColor: "#fbfaf8" }}
    >
      <div className="flex items-start justify-between mb-5">
        <span className="text-[13px] font-medium text-kynta-warm-gray">
          {number}
        </span>
        <CardIcon color={iconColor} />
      </div>

      <h3 className="font-serif text-xl lg:text-[22px] leading-snug text-kynta-charcoal mb-3">
        {title}
      </h3>

      <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-5 flex-1">
        {body}
      </p>

      <div
        className="relative w-full overflow-hidden mb-4"
        style={{ aspectRatio: "4 / 3", borderRadius: "10px" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-kynta-charcoal">
          {footerLabel}
        </p>
        <p
          className="text-[11px] font-semibold italic"
          style={{ color: valueColor }}
        >
          {footerValue}
        </p>
      </div>
    </div>
  );
}

interface AboutTriadSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    cards?: {
      title: string;
      description: string;
      image?: {
        _type: "image";
        asset: { _ref: string; _type: "reference" };
        alt?: string;
      };
    }[];
  };
}

export function AboutTriadSection({ data }: AboutTriadSectionProps) {
  const eyebrow = data?.eyebrow || "The Triad of Intent";
  const heading = data?.heading || "The Three Pillars of Sanctuary Design";
  const description =
    data?.description ||
    "Every spatial footprint, herb infusion, and human interaction is calibrated against an immutable sacred framework.";

  const displayTriads = data?.cards?.length
    ? data.cards.map((card, i) => ({
        ...triads[i % triads.length],
        title: card.title || triads[i % triads.length].title,
        body: card.description || triads[i % triads.length].body,
        image: card.image?.asset?._ref
          ? `/triad-${String(i + 1).padStart(2, "0")}.jpg`
          : triads[i % triads.length].image,
      }))
    : triads;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span
                className="block h-px flex-shrink-0"
                style={{
                  width: "48px",
                  backgroundColor: "var(--kynta-charcoal)",
                  opacity: 0.25,
                }}
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-kynta-rust tracking-wide">
                {eyebrow}
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-4">
              {heading}
            </h2>
          </div>

          <div className="flex items-start md:pt-4">
            <p className="text-[15px] leading-[1.7] text-kynta-warm-gray max-w-lg">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayTriads.map((t) => (
            <TriadCard key={t.number} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
