import {
  type BlogPageContent,
  blogPageDefaults,
  type ChapterIcon as ChapterIconType,
} from "@/content/blog";
import { list, text } from "@/content/types";

function ChapterIcon({ type }: { type: ChapterIconType }) {
  switch (type) {
    case "microbiome":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#5eead4]"
          aria-hidden="true"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "thermal":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#5eead4]"
          aria-hidden="true"
        >
          <path d="M12 2v8" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m19.07 10.93-1.41 1.41" />
          <path d="M22 22H2" />
          <path d="m8 22 4-10 4 10" />
        </svg>
      );
    default:
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#5eead4]"
          aria-hidden="true"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M8 10h.01" />
          <path d="M16 10h.01" />
          <path d="M8 14h.01" />
          <path d="M16 14h.01" />
        </svg>
      );
  }
}

interface BlogCompendiumSectionProps {
  data?: BlogPageContent["compendiumSection"];
}

const barColors = { teal: "#004349", rust: "#9b5440" } as const;

export function BlogCompendiumSection({ data }: BlogCompendiumSectionProps) {
  const d = blogPageDefaults.compendiumSection;
  const chapters = list(data?.chapters, d.chapters).map((ch, i) => ({
    title: ch.title,
    subtitle: ch.description,
    iconType: ch.icon ?? d.chapters[i % d.chapters.length].icon,
  }));
  const monographLabel = text(data?.monographLabel, d.monographLabel);
  const monographPdf = data?.monographPdf?.url ?? null;
  const hardcoverLabel = text(data?.hardcoverCta?.label, d.hardcoverCta.label);
  const hardcoverUrl = data?.hardcoverCta?.url?.trim() || null;
  const l = data?.ledger;
  const ledger = {
    label: text(l?.label, d.ledger.label),
    code: text(l?.code, d.ledger.code),
    statValue: text(l?.statValue, d.ledger.statValue),
    statLabel: text(l?.statLabel, d.ledger.statLabel),
    bars: list(l?.bars, d.ledger.bars).map((bar) => ({
      label: bar.label,
      value: bar.value,
      percent: Math.min(100, Math.max(0, bar.percent ?? 0)),
      color: barColors[bar.color ?? "teal"],
      isRust: bar.color === "rust",
    })),
    footnote: text(l?.footnote, d.ledger.footnote),
  };

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden text-white"
      style={{ backgroundColor: "#004349" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-[#a5c8c2] mb-5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
              <span>{text(data?.eyebrow, d.eyebrow)}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-white font-normal mb-4 max-w-xl">
              {text(data?.heading, d.heading)}
            </h2>

            <p className="text-[15px] leading-[1.7] text-[#a0beb6] max-w-xl mb-8">
              {text(data?.description, d.description)}
            </p>

            <div className="w-full space-y-3 mb-8">
              {chapters.map((chapter, index) => (
                <div
                  key={`${chapter.title}-${index}`}
                  className="rounded-[12px] p-4 sm:p-4.5 bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all flex items-start gap-3.5"
                >
                  <div
                    className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  >
                    <ChapterIcon type={chapter.iconType} />
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-[15px] font-serif text-white font-normal mb-1 leading-snug">
                      {chapter.title}
                    </h3>
                    <p className="text-[13px] leading-[1.6] text-[#a0beb6]">
                      {chapter.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {(monographPdf || hardcoverUrl) && (
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {monographPdf && (
                  <a
                    href={monographPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-[6px] text-white text-[10px] sm:text-[10.5px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 shadow-sm flex items-center gap-2"
                    style={{ backgroundColor: "#9b5440" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>{monographLabel}</span>
                  </a>
                )}

                {hardcoverUrl && (
                  <a
                    href={hardcoverUrl}
                    className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.12em] uppercase text-white/90 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <span>{hardcoverLabel}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[430px] bg-white rounded-[20px] p-6 sm:p-7 shadow-[0_16px_48px_rgba(0,30,25,0.25)] flex flex-col justify-between text-kynta-charcoal">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-kynta-rust">
                    {ledger.label}
                  </span>
                  <span className="text-[10px] tracking-wider text-kynta-warm-gray font-mono">
                    {ledger.code}
                  </span>
                </div>

                <div className="rounded-[10px] p-4 bg-[#f7faf8] border border-kynta-border/30 mb-6 flex items-center justify-between">
                  <div>
                    <p
                      className="font-serif text-[26px] sm:text-[28px] leading-tight font-normal"
                      style={{ color: "var(--kynta-teal-dark)" }}
                    >
                      {ledger.statValue}
                    </p>
                    <p className="text-[9px] font-semibold tracking-[0.12em] uppercase text-kynta-warm-gray mt-0.5">
                      {ledger.statLabel}
                    </p>
                  </div>

                  <div className="text-kynta-rust flex items-center justify-center pr-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                </div>

                {ledger.bars.map((bar, index) => (
                  <div
                    key={`${bar.label}-${index}`}
                    className={
                      index === ledger.bars.length - 1 ? "mb-6" : "mb-5"
                    }
                  >
                    <div className="flex items-center justify-between text-[11px] sm:text-[11.5px] font-medium mb-1.5">
                      <span className="text-kynta-charcoal">{bar.label}</span>
                      <span
                        className={
                          bar.isRust
                            ? "font-semibold text-kynta-rust"
                            : "font-semibold"
                        }
                        style={
                          bar.isRust
                            ? undefined
                            : { color: "var(--kynta-teal-dark)" }
                        }
                      >
                        {bar.value}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#e8ecea] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${bar.percent}%`,
                          backgroundColor: bar.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-kynta-border/20 text-center">
                <p className="text-[10px] italic text-kynta-warm-gray leading-normal">
                  {ledger.footnote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
