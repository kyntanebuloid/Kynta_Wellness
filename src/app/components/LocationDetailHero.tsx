import Image from "next/image";
import Link from "next/link";
import type { LocationDetail } from "@/lib/sanity/data";

interface LocationDetailHeroProps {
  location: LocationDetail;
}

/* ── Facility icons ── */
const facilityIconMap: Record<string, React.ReactNode> = {
  sun: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <title>Solar</title>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
  flower: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <title>Botanical</title>
      <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 0 4.5-4.5M12 16.5V15m4.5-3H15" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  mountain: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <title>Meditation</title>
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  ),
  car: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <title>Transit</title>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A2 2 0 0 0 13.7 5H6.3a2 2 0 0 0-1.6.9L2 9.5C1.4 9.7 1 10.4 1 11.1V16c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  ),
};

/* ── Helper: split title to get italic place name (last word) ── */
function formatTitle(name: string) {
  const words = name.split(" ");
  // Find common place keywords to italicize
  const placeKeywords = ["Pushkar", "Dharamshala", "Dalhousie", "Rajasthan", "Palampur", "Resort"];
  const lastWord = words[words.length - 1];
  const hasItalicPlace = placeKeywords.includes(lastWord);

  if (hasItalicPlace) {
    return {
      main: words.slice(0, -1).join(" "),
      italic: lastWord,
    };
  }
  return { main: name, italic: "" };
}

export function LocationDetailHero({ location }: LocationDetailHeroProps) {
  const { main: titleMain, italic: titleItalic } = formatTitle(location.name);

  return (
    <section className="w-full bg-white" id="location-detail">
      {/* ═══ Top Hero Section ═══ */}
      <div className="w-full pt-8 sm:pt-10 md:pt-12 pb-10 md:pb-14" style={{ backgroundColor: "#f7f9f7" }}>
        <div className="container-site">
          {/* Breadcrumb Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-block w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: "var(--kynta-gold)" }}
              aria-hidden="true"
            />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-kynta-warm-gray">
              {location.breadcrumbEyebrow}
            </span>
          </div>

          {/* Two-column layout: Content + Info Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column — Title, Description, CTAs */}
            <div className="lg:col-span-7">
              <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.1] text-kynta-charcoal font-normal mb-5">
                {titleMain}{" "}
                {titleItalic && (
                  <em className="italic">{titleItalic}</em>
                )}
              </h1>

              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-kynta-warm-gray max-w-xl mb-8">
                {location.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href={location.primaryCta.url}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-widest uppercase text-white bg-kynta-teal-dark rounded-full hover:bg-kynta-teal transition-all duration-200"
                >
                  {location.primaryCta.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <title>Arrow</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href={location.secondaryCta.url}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-widest uppercase text-kynta-charcoal bg-white border border-kynta-charcoal rounded-full hover:bg-kynta-charcoal hover:text-white transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <title>Download</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                  </svg>
                  {location.secondaryCta.label}
                </Link>
              </div>
            </div>

            {/* Right Column — Sanctuary Info Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[6px] border border-kynta-border bg-white p-6 sm:p-7">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-kynta-border/60">
                  <h2 className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-kynta-charcoal">
                    Sanctuary at a Glance
                  </h2>
                  <span className="text-[11px] font-semibold tracking-wide text-kynta-teal">
                    {location.sanctuaryId}
                  </span>
                </div>

                {/* Info Rows */}
                <div className="flex flex-col gap-4">
                  {location.sanctuaryInfo.map((info) => (
                    <div key={info.label}>
                      <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-kynta-warm-gray mb-1">
                        {info.label}
                      </p>
                      <p className="text-[13px] sm:text-[14px] leading-[1.5] text-kynta-charcoal font-medium">
                        {info.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Image Gallery Section ═══ */}
      <div className="w-full py-6 md:py-8" style={{ backgroundColor: "#f7f9f7" }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
            {/* Left Large Card */}
            <div className="lg:col-span-7 relative rounded-[6px] overflow-hidden aspect-[4/3] lg:aspect-[429/312] min-h-[260px] bg-kynta-charcoal group">
              <Image
                src={location.gallery.mainCard.image}
                alt={location.gallery.mainCard.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 660px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end justify-between p-5 sm:p-6">
                <div className="max-w-[70%]">
                  <p className="text-[8px] sm:text-[9px] font-semibold tracking-[0.16em] uppercase text-white/70 mb-1.5">
                    {location.gallery.mainCard.tag}
                  </p>
                  <h3 className="font-serif text-[19px] sm:text-[22px] md:text-[24px] text-white font-normal leading-snug mb-1">
                    {location.gallery.mainCard.title}
                  </h3>
                  {location.gallery.mainCard.subtitle && (
                    <p className="text-[11px] sm:text-[12px] text-white/60 leading-relaxed hidden sm:block">
                      {location.gallery.mainCard.subtitle}
                    </p>
                  )}
                </div>
                <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-[4px] whitespace-nowrap self-end mb-0.5">
                  {location.gallery.mainCard.badge}
                </span>
              </div>
            </div>

            {/* Right Stacked Cards */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
              {/* Top-Right Card */}
              <div className="relative rounded-[6px] overflow-hidden aspect-[16/9] lg:aspect-[303/148] min-h-[135px] bg-kynta-charcoal group flex-1">
                <Image
                  src={location.gallery.topRightCard.image}
                  alt={location.gallery.topRightCard.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
                  <p className="text-[8.5px] sm:text-[9px] font-semibold tracking-[0.16em] uppercase text-white/70 mb-1">
                    {location.gallery.topRightCard.tag}
                  </p>
                  <h3 className="font-serif text-[16px] sm:text-[18px] text-white font-normal leading-snug">
                    {location.gallery.topRightCard.title}
                  </h3>
                  {location.gallery.topRightCard.subtitle && (
                    <p className="text-[10px] sm:text-[11px] text-white/55 mt-1 hidden sm:block">
                      {location.gallery.topRightCard.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom-Right Card */}
              <div className="relative rounded-[6px] overflow-hidden aspect-[16/9] lg:aspect-[303/148] min-h-[135px] bg-kynta-charcoal group flex-1">
                <Image
                  src={location.gallery.bottomRightCard.image}
                  alt={location.gallery.bottomRightCard.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
                  <p className="text-[8.5px] sm:text-[9px] font-semibold tracking-[0.16em] uppercase text-white/70 mb-1">
                    {location.gallery.bottomRightCard.tag}
                  </p>
                  <h3 className="font-serif text-[16px] sm:text-[18px] text-white font-normal leading-snug">
                    {location.gallery.bottomRightCard.title}
                  </h3>
                  {location.gallery.bottomRightCard.subtitle && (
                    <p className="text-[10px] sm:text-[11px] text-white/55 mt-1 hidden sm:block">
                      {location.gallery.bottomRightCard.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Facilities Strip ═══ */}
      <div className="w-full py-5 md:py-6 border-t border-kynta-border/40" style={{ backgroundColor: "#f7f9f7" }}>
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {location.facilities.map((facility) => (
              <div key={facility.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 text-kynta-rust mt-0.5">
                  {facilityIconMap[facility.icon] || facilityIconMap.sun}
                </div>
                <div>
                  <p className="text-[13px] sm:text-[14px] font-semibold text-kynta-charcoal leading-tight mb-0.5">
                    {facility.title}
                  </p>
                  <p className="text-[11px] sm:text-[12px] text-kynta-warm-gray leading-snug">
                    {facility.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
