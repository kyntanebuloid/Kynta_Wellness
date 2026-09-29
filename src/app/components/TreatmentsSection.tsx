import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "@/types/sanity";

interface TreatmentsSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    treatments?: {
      title: string;
      description: string;
      duration?: string;
      sensoryNote?: string;
      image?: SanityImage;
    }[];
  };
}

const defaultTreatments = [
  {
    image: "/treatment-spa-sojourns.jpg",
    label: "Signature Bodywork",
    duration: "75 / 90 Mins",
    title: "SPA SOJOURNS",
    description:
      "Spa Sojourns are immersive wellness journeys that blend therapeutic touch with deep relaxation. Crafted to rejuvenate from head to toe, these rituals leave you feeling renewed, centered, and completely at ease.",
    sensory: "Cedarwood • Ginger Root • Smoky Vetiver",
  },
  {
    image: "/treatment-massage.jpg",
    label: "Mind Tranquility",
    duration: "60 / 90 Mins",
    title: "MASSAGE SELECTIONS",
    description:
      "Step into a world of deep relaxation with our curated Full Body Massage selections. Each therapy is thoughtfully designed to release tension, improve circulation, and restore inner harmony. Surrender to skilled hands and experience complete mind-body renewal.",
    sensory: "Brahmi • Ashwagandha • Sandalwood",
  },
  {
    image: "/treatment-glamour-glow.jpg",
    label: "Full Body Glow",
    duration: "60 Mins",
    title: "GLAMOUR GLOW",
    description:
      "Indulge in our Glamour Glow ritual, a luxurious facial or body scrub designed to gently exfoliate, deeply nourish, and revive dull skin. Enriched with skin-loving ingredients, this treatment removes impurities, enhances natural radiance, and leaves your skin smooth, refreshed, and beautifully glowing. Perfect before special occasions or whenever your skin needs a luminous boost.",
    sensory: "Floral Jasmine • Mineral Crisp • Sweet Neroli",
  },
];

function TreatmentCard({
  image,
  label,
  duration,
  title,
  description,
  sensory,
}: {
  image: string;
  label: string;
  duration: string;
  title: string;
  description: string;
  sensory: string;
}) {
  return (
    <div className="flex flex-col bg-white rounded-md overflow-hidden border border-kynta-border/40">
      <div className="relative w-full" style={{ aspectRatio: "295 / 172" }}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide text-kynta-charcoal bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded">
          {label}
        </span>
        <span className="absolute bottom-3 right-3 text-[11px] font-semibold text-white bg-kynta-teal-dark px-3 py-1.5 rounded">
          {duration}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <h3 className="font-serif text-lg tracking-wide text-kynta-charcoal mb-3">
          {title}
        </h3>
        <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-4 flex-1">
          {description}
        </p>
        <p className="text-[13px] leading-relaxed text-kynta-warm-gray mb-5">
          <span className="font-semibold text-kynta-rust italic">Sensory:</span>{" "}
          {sensory}
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-kynta-teal hover:text-kynta-teal-light transition-colors"
        >
          Reserve
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
      </div>
    </div>
  );
}

function CircleArrowButton({ direction }: { direction: "left" | "right" }) {
  return (
    <button
      type="button"
      className="w-10 h-10 rounded-full bg-kynta-teal-dark text-white flex items-center justify-center hover:bg-kynta-teal transition-colors"
      aria-label={`Scroll ${direction}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
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

export function TreatmentsSection({ data }: TreatmentsSectionProps) {
  const eyebrow = data?.eyebrow || "Apothecary & Therapies";
  const heading =
    data?.heading ||
    "Signature rituals conceived for deep restorative release.";

  const treatments =
    data?.treatments?.map((t) => ({
      image: "/treatment-spa-sojourns.jpg",
      label: "Signature Bodywork",
      duration: t.duration || "60 Mins",
      title: t.title,
      description: t.description,
      sensory: t.sensoryNote || "",
    })) || defaultTreatments;

  return (
    <section className="w-full bg-kynta-section-bg py-20 md:py-24 lg:py-28">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-14">
          <div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-4">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal whitespace-pre-line">
              {heading}
            </h2>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-[15px] leading-[1.7] text-kynta-warm-gray max-w-sm">
              Formulated with single-estate botanical extracts, warm Himalayan
              stone compresses, and ancient marma touch.
            </p>
            <div className="flex items-center gap-3 mt-6 md:mt-0 md:justify-end">
              <CircleArrowButton direction="left" />
              <CircleArrowButton direction="right" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {treatments.map((t) => (
            <TreatmentCard key={t.title} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
