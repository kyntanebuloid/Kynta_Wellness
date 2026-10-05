import { realHomeText } from "@/content/real-home";
import type { Homepage } from "@/types/sanity";

interface GuestPathSectionProps {
  data?: Homepage["guestPathSection"];
  /** Hotel names from the Locations page, shown in the "Trusted by" strip. */
  hotelNames?: string[];
}

const defaultGuestSteps = realHomeText.guestPathSection.steps;

const defaultStats = realHomeText.guestPathSection.stats;

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
          <title>Check-up</title>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="14" x2="15" y2="14" />
          <line x1="9" y1="6" x2="11" y2="6" />
        </svg>
      );
    case "hands":
      return (
        <svg {...common} className={cls}>
          <title>Massage</title>
          <path d="M12 21c-4-2-8-5-8-10a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 5-4 8-8 10z" />
        </svg>
      );
    case "cup":
      return (
        <svg {...common} className={cls}>
          <title>Rest</title>
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
          <title>Care at home</title>
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
    <div className="flex flex-col w-[calc((100%-12px)/2)] sm:w-[calc((100%-24px)/3)] lg:w-[calc((100%-48px)/5)] bg-kynta-section-bg rounded-[5px] p-4 lg:p-5 border border-kynta-border/30">
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

const iconTypes = ["footbath", "clipboard", "hands", "cup", "infinity"];

export function GuestPathSection({
  data,
  hotelNames: locationHotelNames = [],
}: GuestPathSectionProps) {
  const eyebrow = data?.eyebrow || "Your Visit in 5 Steps";
  const heading = data?.heading || "A calm visit, from start to finish.";
  const description =
    data?.description || realHomeText.guestPathSection.description;

  const guestSteps = data?.steps?.length
    ? data.steps.map((s, i) => ({
        number: s.number,
        title: s.title,
        description: s.description,
        icon: s.icon || iconTypes[i % iconTypes.length],
      }))
    : defaultGuestSteps;

  const stats = data?.stats?.length ? data.stats : defaultStats;
  const trustedByHeading =
    data?.trustedByHeading || realHomeText.guestPathSection.trustedByHeading;
  // The real partner hotels (Locations page) always win over typed names.
  const hotelNames = locationHotelNames.length
    ? locationHotelNames
    : (data?.hotelNames ?? []);
  // Only real reviews entered in Sanity; the block hides when there are none.
  const testimonials = (data?.testimonials ?? []).filter(
    (t) => t.quote?.trim() && t.name?.trim(),
  );

  return (
    <>
      <section className="w-full bg-kynta-section-bg pt-16 md:pt-20 pb-16 md:pb-20">
        <div className="container-site">
          <div className="text-center mb-10 md:mb-12">
            <p className="section-label text-kynta-rust mb-3">{eyebrow}</p>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mx-auto max-w-xl mb-4 whitespace-pre-line">
              {heading}
            </h2>
            <p className="text-[14px] leading-[1.7] text-kynta-warm-gray mx-auto max-w-lg">
              {description}
            </p>
          </div>
          <div
            className="flex flex-wrap justify-center gap-3"
            data-reveal-stagger
          >
            {guestSteps.map((step) => (
              <GuestPathCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 md:py-14 border-t border-b border-kynta-border/50">
        <div className="container-site">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {stats.map((s) => (
              <div
                key={s.label}
                className="w-[calc((100%-24px)/2)] sm:w-[calc((100%-48px)/3)] lg:w-[calc((100%-96px)/5)]"
              >
                <p
                  data-count
                  className={`font-serif text-3xl lg:text-4xl leading-tight mb-1.5 tabular-nums ${
                    s.highlight ? "text-kynta-rust" : "text-kynta-charcoal"
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

      {hotelNames.length > 0 && (
        <section className="w-full bg-kynta-section-bg py-12 md:py-16">
          <div className="container-site text-center">
            <p className="text-[13px] text-kynta-warm-gray tracking-wide mb-8">
              {trustedByHeading}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {hotelNames.map((name, index) => (
                <div key={name} className="flex items-center gap-6 md:gap-8">
                  <span className="font-serif text-lg md:text-xl lg:text-2xl tracking-[0.08em] text-kynta-charcoal">
                    {name}
                  </span>
                  {index < hotelNames.length - 1 && (
                    <span className="text-kynta-border">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="w-full bg-kynta-section-bg pb-16 md:pb-20">
          <div className="container-site">
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              data-reveal-stagger
            >
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
      )}
    </>
  );
}
