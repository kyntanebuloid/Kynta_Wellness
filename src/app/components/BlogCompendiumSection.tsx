export interface CompendiumChapter {
  id: string;
  title: string;
  subtitle: string;
  iconType: "microbiome" | "thermal" | "architecture";
}

export const compendiumChapters: CompendiumChapter[] = [
  {
    id: "chapter-1",
    title: "Chapter I: Microbiome Restoration via Triphala Protocols",
    subtitle:
      "Biomarker shifts over 21 days of continuous botanical assimilation in high-altitude environments.",
    iconType: "microbiome",
  },
  {
    id: "chapter-2",
    title: "Chapter II: Thermal Shock Proteins in Somatic Healing",
    subtitle:
      "Vascular remodeling observed through alternating cedar sweat lodges and copper ice plunge cycles.",
    iconType: "thermal",
  },
  {
    id: "chapter-3",
    title: "Chapter III: Spatial Biophilic Engineering in Heritage Palaces",
    subtitle:
      "Integrating Vaastu architectural orientations with calibrated acoustic damping for cortisol reduction.",
    iconType: "architecture",
  },
];

function ChapterIcon({ type }: { type: CompendiumChapter["iconType"] }) {
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
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    chapters?: {
      title: string;
      description: string;
      chapterNumber?: string;
      author?: string;
      image?: { asset?: { _ref: string }; alt?: string };
    }[];
    practitionerNotes?: {
      title: string;
      author: string;
      role?: string;
      excerpt?: string;
    }[];
  };
}

export function BlogCompendiumSection({ data }: BlogCompendiumSectionProps) {
  const chapters = data?.chapters
    ? data.chapters.map((ch, i) => ({
        id: ch.chapterNumber || `chapter-${i + 1}`,
        title: ch.title,
        subtitle: ch.description,
        iconType:
          (["microbiome", "thermal", "architecture"][
            i % 3
          ] as CompendiumChapter["iconType"]) || "architecture",
      }))
    : compendiumChapters;

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden text-white"
      style={{ backgroundColor: "#004349" }}
    >
      <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
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
              <span>{data?.eyebrow || "SPECIAL MONOGRAPH COLLECTION"}</span>
            </div>

            <h2 className="font-serif text-[30px] sm:text-[36px] md:text-[42px] leading-[1.15] text-white font-normal mb-4 max-w-[500px]">
              {data?.heading || "The 2025 Integrative Longevity Compendium"}
            </h2>

            <p className="text-[12px] md:text-[12.5px] leading-[1.65] text-[#90b8b1] max-w-[490px] mb-8">
              {data?.description ||
                "Download our 64-page peer-reviewed monograph examining clinical data from over 14,000 guest retreat journeys across our Indian and overseas sanctuaries."}
            </p>

            <div className="w-full space-y-3 mb-8">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="rounded-[12px] p-4 sm:p-4.5 bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all flex items-start gap-3.5"
                >
                  <div
                    className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  >
                    <ChapterIcon type={chapter.iconType} />
                  </div>

                  <div>
                    <h3 className="text-[13px] sm:text-[13.5px] font-serif text-white font-normal mb-1 leading-snug">
                      {chapter.title}
                    </h3>
                    <p className="text-[11px] leading-[1.55] text-[#90b8b1]">
                      {chapter.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="#download-pdf"
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
                <span>REQUEST DIGITAL MONOGRAPH (PDF)</span>
              </a>

              <a
                href="#order-hardcover"
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
                <span>ORDER HARDCOVER EDITION</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[430px] bg-white rounded-[20px] p-6 sm:p-7 shadow-[0_16px_48px_rgba(0,30,25,0.25)] flex flex-col justify-between text-kynta-charcoal">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-kynta-rust">
                    INSTITUTIONAL LEDGER
                  </span>
                  <span className="text-[10px] tracking-wider text-kynta-warm-gray font-mono">
                    ISBN 978–0–9882
                  </span>
                </div>

                <div className="rounded-[10px] p-4 bg-[#f7faf8] border border-kynta-border/30 mb-6 flex items-center justify-between">
                  <div>
                    <p
                      className="font-serif text-[26px] sm:text-[28px] leading-tight font-normal"
                      style={{ color: "var(--kynta-teal-dark)" }}
                    >
                      14,280+
                    </p>
                    <p className="text-[9px] font-semibold tracking-[0.12em] uppercase text-kynta-warm-gray mt-0.5">
                      DOCUMENTED GUEST BASELINES
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

                <div className="mb-5">
                  <div className="flex items-center justify-between text-[11px] sm:text-[11.5px] font-medium mb-1.5">
                    <span className="text-kynta-charcoal">
                      Sleep Architecture Index
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--kynta-teal-dark)" }}
                    >
                      +41.8% REM Stabilization
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#e8ecea] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: "78%", backgroundColor: "#004349" }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-[11px] sm:text-[11.5px] font-medium mb-1.5">
                    <span className="text-kynta-charcoal">
                      Salivary Cortisol Reduction
                    </span>
                    <span className="font-semibold text-kynta-rust">
                      −32.4% Post 7–Day Rasayana
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#e8ecea] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: "64%", backgroundColor: "#9b5440" }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-kynta-border/20 text-center">
                <p className="text-[10px] italic text-kynta-warm-gray leading-normal">
                  Compiled across 6 wellness sanctuaries with the International
                  Council for Integrative Therapeutics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
