import Image from "next/image";
import Link from "next/link";

interface HospitalityHeroSectionProps {
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
    }[];
  };
}

export function HospitalityHeroSection({ data }: HospitalityHeroSectionProps) {
  const eyebrow =
    data?.eyebrow || "INSTITUTIONAL HOSPITALITY & SANCTUARY PARTNERSHIPS";
  const heading =
    data?.heading ||
    "Elevating Luxury Hospitality Through Restorative Architecture.";
  const description =
    data?.description ||
    "We convert underutilized hotel square footage into high-yield, brand-defining sanctuaries of unhurried restorative stillness and clinical Ayurvedic excellence.";

  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee9df] border border-kynta-border/50 mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-kynta-rust flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[10px] md:text-[10.5px] font-semibold tracking-[0.14em] uppercase text-kynta-rust">
                {eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-[34px] sm:text-[40px] md:text-[46px] lg:text-[48px] leading-[1.12] text-kynta-charcoal font-normal mb-5 max-w-[520px]">
              {heading}
            </h1>

            <p className="text-[13px] md:text-[13.5px] leading-[1.68] text-kynta-warm-gray max-w-[460px] mb-8">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mb-8 md:mb-10">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[#004349] hover:bg-[#023338] text-white text-[11px] font-medium tracking-[0.12em] uppercase transition-all duration-200 shadow-sm flex items-center gap-2"
              >
                <span>REQUEST FEASIBILITY STUDY</span>
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
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              <button
                type="button"
                className="px-6 py-3 rounded-full bg-white/80 hover:bg-white text-kynta-charcoal border border-kynta-border/80 text-[11px] font-medium tracking-[0.12em] uppercase transition-all duration-200 shadow-sm flex items-center gap-2"
              >
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>DOWNLOAD PROSPECTUS</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-kynta-warm-gray text-[10.5px] md:text-[11px] tracking-[0.08em] uppercase font-medium">
              <div className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-kynta-rust flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
                <span>ACCREDITED CLINICAL VAIDYA STAFFING</span>
              </div>

              <span
                className="hidden sm:inline-block w-1 h-1 rounded-full bg-kynta-border"
                aria-hidden="true"
              />

              <div className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-kynta-rust flex-shrink-0"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>TURNKEY FORBES LQA PROTOCOLS</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[430px] aspect-[405/278] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.09)]">
              <Image
                src="/hospitality-pool.jpg"
                alt="Luxury hotel wellness indoor pool sanctuary with water wall and lounge seating"
                fill
                sizes="(max-width: 768px) 100vw, 430px"
                priority
                className="object-cover"
              />

              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md border border-white/80 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-kynta-rust flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[9px] sm:text-[10px] md:text-[10.5px] font-semibold tracking-[0.08em] uppercase text-kynta-charcoal whitespace-nowrap">
                  TURNKEY GOVERNANCE · 100% OPERATIONAL INTEGRATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
