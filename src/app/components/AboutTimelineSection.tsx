import Image from "next/image";

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  category: string;
  categoryColor: "rust" | "teal";
  nodeColor: "rust" | "teal";
  image: string;
  imageAlt: string;
  iconType: "botanical" | "blueprint" | "hospitality" | "alpine" | "standard";
  layout: "text-left" | "text-right";
}

export const journeyMilestones: Milestone[] = [
  {
    id: "genesis-2018",
    year: "2018",
    title: "The Genesis & The Kerala Pharmacopeia",
    description:
      "Kynta was born out of an experimental organic herb farm in Wayanad, Kerala. Here, master botanists formulated 18 foundational tailams (herbal oils), verifying therapeutic bioavailability and shelf-stability without chemical stabilizers.",
    category: "THE BOTANICAL ROOT",
    categoryColor: "rust",
    nodeColor: "rust",
    image: "/timeline-kerala.jpg",
    imageAlt: "Misty tea and herbal plantation terraces in Wayanad Kerala",
    iconType: "botanical",
    layout: "text-left",
  },
  {
    id: "blueprint-2020",
    year: "2020",
    title: "The Architectural Blueprint",
    description:
      "Partnering with biophilic architects, Kynta codified the first 'Sanctuary Protocol' — a comprehensive spatial blueprint for five-star hotels encompassing hydro-circuit temperature profiling, private contemplation gardens, and allergen-neutral ventilation.",
    category: "SPATIAL STANDARDIZATION",
    categoryColor: "teal",
    nodeColor: "teal",
    image: "/timeline-blueprint.jpg",
    imageAlt:
      "Architectural blueprint, material swatches and interior design layout",
    iconType: "blueprint",
    layout: "text-right",
  },
  {
    id: "deployments-2022",
    year: "2022",
    title: "Palace & Coastal Deployments",
    description:
      "Kynta assumed turnkey operational leadership for seven flagship resort sanctuaries in Udaipur, Goa, and Rishikesh. Operating with unbroken 99.4% guest satisfaction scores and setting new benchmarks for luxury wellness yield.",
    category: "HOSPITALITY INTEGRATION",
    categoryColor: "rust",
    nodeColor: "rust",
    image: "/timeline-palace.jpg",
    imageAlt: "Heritage palace courtyard reflection pool illuminated at dusk",
    iconType: "hospitality",
    layout: "text-left",
  },
  {
    id: "alpine-2024",
    year: "2024",
    title: "Alpine Corridors & Global Reach",
    description:
      "Adapting classical Vedic thermotherapy to sub-zero and alpine climates, launching flagship sanctuaries across high-altitude Himalayan corridors and European wellness retreats with climate-synchronized thermal circuits.",
    category: "CONTINENTAL ADAPTATION",
    categoryColor: "teal",
    nodeColor: "teal",
    image: "/timeline-alpine.jpg",
    imageAlt:
      "Minimalist luxury alpine wellness pavilion overlooking snowy peaks",
    iconType: "alpine",
    layout: "text-right",
  },
  {
    id: "future-present",
    year: "Today & The Future",
    title: "Global Restorative Hospitality",
    description:
      "Managing 14+ elite wellness destination properties, expanding bespoke apothecary laboratories, and training the next generation of Vaidyas in cross-disciplinary therapeutic architecture.",
    category: "THE DEFINITIVE STANDARD",
    categoryColor: "teal",
    nodeColor: "rust",
    image: "/experience-hydro-colonnade.jpg",
    imageAlt:
      "Luxury tropical wellness sanctuary pool, colonnades and pavilions",
    iconType: "standard",
    layout: "text-left",
  },
];

function CategoryIcon({
  type,
  colorClass,
}: {
  type: Milestone["iconType"];
  colorClass: string;
}) {
  switch (type) {
    case "botanical":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10" />
          <path d="M8 11l4-4 4 4" />
        </svg>
      );
    case "blueprint":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case "hospitality":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "alpine":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
          aria-hidden="true"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      );
    default:
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m4.93 19.07 4.24-4.24" />
        </svg>
      );
  }
}

function TimelineNode({ color }: { color: "rust" | "teal" }) {
  const isRust = color === "rust";
  const bgClass = isRust ? "bg-[#8e4835]" : "bg-[#184643]";

  return (
    <div
      className={`w-[15px] h-[15px] rounded-full ${bgClass} ring-4 ring-[#f7faf8] flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex-shrink-0`}
      aria-hidden="true"
    >
      <span className="w-[4px] h-[4px] rounded-full bg-[#f7faf8] block" />
    </div>
  );
}

interface AboutTimelineSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    milestones?: {
      year: string;
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

export function AboutTimelineSection({ data }: AboutTimelineSectionProps) {
  const eyebrow = data?.eyebrow || "THE JOURNEY OF KYNTA";
  const heading =
    data?.heading || "From Forest Apothecary to Global Sanctuaries";
  const description =
    data?.description ||
    "A progression grounded in clinical rigor, heritage preservation, and architectural mastery.";

  const milestones: Milestone[] = data?.milestones?.length
    ? data.milestones.map((m, i) => ({
        ...journeyMilestones[i % journeyMilestones.length],
        year: m.year || journeyMilestones[i % journeyMilestones.length].year,
        title: m.title || journeyMilestones[i % journeyMilestones.length].title,
        description:
          m.description ||
          journeyMilestones[i % journeyMilestones.length].description,
        image: m.image?.asset?._ref
          ? `/timeline-${String(i + 1).padStart(2, "0")}.jpg`
          : journeyMilestones[i % journeyMilestones.length].image,
        imageAlt:
          m.image?.alt ||
          journeyMilestones[i % journeyMilestones.length].imageAlt,
      }))
    : journeyMilestones;

  return (
    <section
      className="w-full py-20 md:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-sm font-medium text-kynta-rust tracking-wide mb-3">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-4">
            {heading}
          </h2>
          <p className="text-[15px] leading-[1.7] text-kynta-warm-gray max-w-lg mx-auto">
            {description}
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2"
            style={{ backgroundColor: "#dedad2" }}
            aria-hidden="true"
          />

          <div
            className="md:hidden absolute left-[19px] top-4 bottom-4 w-px"
            style={{ backgroundColor: "#dedad2" }}
            aria-hidden="true"
          />

          <div className="space-y-14 md:space-y-20 lg:space-y-24">
            {milestones.map((item) => {
              const isTextLeft = item.layout === "text-left";
              const isCategoryRust = item.categoryColor === "rust";
              const categoryColorClass = isCategoryRust
                ? "text-kynta-rust"
                : "text-kynta-teal";

              const textContent = (align: "left" | "right") => (
                <div
                  className={`max-w-[360px] flex flex-col ${
                    align === "right"
                      ? "text-right items-end ml-auto"
                      : "text-left items-start mr-auto"
                  }`}
                >
                  <span className="text-xs font-semibold text-kynta-rust mb-1 tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl text-kynta-charcoal leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] leading-[1.7] text-kynta-warm-gray mb-3">
                    {item.description}
                  </p>
                  <div
                    className={`flex items-center gap-1.5 ${
                      align === "right" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${categoryColorClass}`}
                    >
                      {item.category}
                    </span>
                    <CategoryIcon
                      type={item.iconType}
                      colorClass={categoryColorClass}
                    />
                  </div>
                </div>
              );

              const imageContent = (
                <div
                  className="relative w-[280px] max-w-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  style={{
                    aspectRatio: "280 / 155",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 300px, 280px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              );

              return (
                <div key={item.id} className="relative">
                  <div className="hidden md:flex items-center">
                    <div className="w-1/2 pr-10 lg:pr-14 flex justify-end">
                      {isTextLeft ? (
                        textContent("right")
                      ) : (
                        <div className="flex justify-end w-full">
                          {imageContent}
                        </div>
                      )}
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <TimelineNode color={item.nodeColor} />
                    </div>

                    <div className="w-1/2 pl-10 lg:pl-14 flex justify-start">
                      {isTextLeft ? (
                        <div className="flex justify-start w-full">
                          {imageContent}
                        </div>
                      ) : (
                        textContent("left")
                      )}
                    </div>
                  </div>

                  <div className="md:hidden relative flex items-start pl-12">
                    <div className="absolute left-[12px] top-1.5 z-10">
                      <TimelineNode color={item.nodeColor} />
                    </div>

                    <div className="w-full flex flex-col items-start gap-4">
                      {textContent("left")}
                      <div className="w-full max-w-[300px]">{imageContent}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
