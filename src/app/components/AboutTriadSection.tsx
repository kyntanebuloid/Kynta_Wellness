import Image from "next/image";
import { type AboutPageContent, aboutDefaults } from "@/content/about";
import { type AccentColor, imageAlt, imageUrl, list, text } from "@/content/types";

function CardIcon({ color }: { color: AccentColor }) {
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

interface TriadCardProps {
  number: string;
  iconColor: AccentColor;
  title: string;
  body: string;
  image: string;
  alt: string;
  footerLabel: string;
  footerValue: string;
  footerValueColor: AccentColor;
}

function TriadCard({
  number,
  iconColor,
  title,
  body,
  image,
  alt,
  footerLabel,
  footerValue,
  footerValueColor,
}: TriadCardProps) {
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
          alt={alt}
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
  data?: AboutPageContent["triadSection"];
}

export function AboutTriadSection({ data }: AboutTriadSectionProps) {
  const d = aboutDefaults.triadSection;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);

  const cards: TriadCardProps[] = list(data?.cards, d.cards).map((card, i) => {
    const fallback = d.cards[i % d.cards.length];
    return {
      number: text(card.number, String(i + 1).padStart(2, "0")),
      iconColor: card.iconColor ?? fallback.iconColor,
      title: card.title,
      body: card.description,
      image: imageUrl(card.image, fallback.image),
      alt: imageAlt(card.image, { alt: card.title }),
      footerLabel: card.footerLabel ?? "",
      footerValue: card.footerValue ?? "",
      footerValueColor: card.footerValueColor ?? fallback.footerValueColor,
    };
  });

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
          {cards.map((card, i) => (
            <TriadCard key={`${card.number}-${i}`} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
