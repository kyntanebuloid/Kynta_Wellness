import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    value: "14+",
    label: "Sanctuaries Curated",
    description: "Across premier heritage palaces and coastal hideaways",
  },
  {
    value: "100%",
    label: "Wild & Organic Harvest",
    description: "Cold-pressed botanicals from Kerala & Western Ghats",
  },
  {
    value: "120+",
    label: "Master Vaidyas & Healers",
    description: "Marma therapy adepts and licensed somatic clinicians",
  },
  {
    value: "5.0",
    label: "Guest Excellence Rating",
    description: "Sustained across five-star global hospitality audits",
  },
];

interface AboutHeroSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    image?: {
      _type: "image";
      asset: { _ref: string; _type: "reference" };
      alt?: string;
    };
    stats?: {
      value: string;
      label: string;
      description?: string;
    }[];
  };
}

export function AboutHeroSection({ data }: AboutHeroSectionProps) {
  const eyebrow = data?.eyebrow || "A Monograph on Heritage & Equilibrium";
  const heading = data?.heading || "Ancient Wisdom.\nArchitectural Stillness.";
  const description =
    data?.description ||
    "Kynta was conceived at the quiet crossroads where classical Ayurvedic therapeutics intersect with modern architectural composure. We construct sensory sanctuaries where the nervous system unwinds, breathing life into unhurried restorative traditions within the world&apos;s most discerning luxury hospitality environments.";
  const displayStats = data?.stats?.length ? data.stats : stats;

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-24">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="block h-px flex-shrink-0"
                style={{
                  width: "48px",
                  backgroundColor: "var(--kynta-charcoal)",
                  opacity: 0.25,
                }}
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust whitespace-nowrap">
                {eyebrow}
              </span>
            </div>

            <p
              className="font-serif italic text-[18px] md:text-[20px] leading-[1.45] mb-5"
              style={{ color: "var(--kynta-charcoal)" }}
            >
              {heading.split("\n").map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>

            <p
              className="text-[15px] leading-[1.8] mb-8"
              style={{
                color: "var(--kynta-warm-gray)",
                maxWidth: "440px",
              }}
            >
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#philosophy"
                className="inline-flex items-center gap-2.5 text-[13px] font-medium text-white px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "var(--kynta-teal-dark)",
                }}
              >
                Explore Our Philosophy
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Down arrow</title>
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 text-[13px] font-medium px-6 py-3.5 rounded-full border hover:bg-gray-50 transition-colors"
                style={{
                  color: "var(--kynta-charcoal)",
                  borderColor: "var(--kynta-border)",
                  backgroundColor: "#ffffff",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Chat</title>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Inquire With Concierge
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative w-full overflow-hidden"
              style={{
                borderRadius: "16px",
                aspectRatio: "300 / 370",
                maxWidth: "520px",
                marginLeft: "auto",
              }}
            >
              <Image
                src="/about-hero.jpg"
                alt="Kynta sanctuary interior with heritage architecture and turquoise plunge pool"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
                priority
              />

              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                }}
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/70">
                  Spatial Concept · Sanctum 01
                </p>
              </div>
            </div>

            <div
              className="absolute -bottom-6 left-0 lg:-left-6 flex items-center gap-3.5 bg-white px-5 py-4 z-10"
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                maxWidth: "280px",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#f7ddd0" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-kynta-rust"
                >
                  <title>Heritage</title>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-kynta-rust mb-0.5">
                  Lineage Assured
                </p>
                <p className="text-[13px] font-medium text-kynta-charcoal leading-snug">
                  8th-Generation Herbal
                  <br />
                  Apothecary Traditions
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pt-4">
          {displayStats.map((s) => (
            <div key={s.label}>
              <p
                className="font-serif italic text-[28px] leading-none mb-2"
                style={{ color: "var(--kynta-teal)" }}
              >
                {s.value}
              </p>

              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5">
                {s.label}
              </p>

              <p className="text-[13px] leading-[1.6] text-kynta-warm-gray">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
