import Image from "next/image";
import type { LocationDetail } from "@/lib/sanity/data";

interface LocationSpacesSectionProps {
  spaces: LocationDetail["spaces"];
}

export function LocationSpacesSection({ spaces }: LocationSpacesSectionProps) {
  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="container-site">
        {/* ── Centered Header ── */}
        <div className="flex justify-center mb-4">
          <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-kynta-teal">
            {spaces.eyebrow}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-center mb-4 text-kynta-charcoal">
          {spaces.heading}{" "}
          <em className="italic">{spaces.headingItalic}</em>
        </h2>

        <p className="text-center mx-auto mb-12 md:mb-14 max-w-xl text-[15px] leading-[1.7] text-kynta-warm-gray">
          {spaces.description}
        </p>

        {/* ── 4 Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {spaces.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[6px] overflow-hidden border border-kynta-border/50 bg-white"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[4/3] bg-kynta-charcoal overflow-hidden group">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col p-5 sm:p-6 flex-1">
                {/* Tag */}
                <p
                  className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase mb-2.5"
                  style={{
                    color:
                      card.tagColor === "rust"
                        ? "var(--kynta-rust)"
                        : "var(--kynta-teal)",
                  }}
                >
                  {card.tag}
                </p>

                {/* Title */}
                <h3 className="font-serif text-[18px] sm:text-[20px] leading-[1.3] text-kynta-charcoal mb-2.5">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-[14px] leading-[1.65] text-kynta-warm-gray">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
