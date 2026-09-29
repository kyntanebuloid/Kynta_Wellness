import Link from "next/link";

interface IntroSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    stats?: {
      value: string;
      label: string;
    }[];
  };
}

function Eyebrow({
  children,
  color = "teal",
}: {
  children: React.ReactNode;
  color?: "teal" | "rust";
}) {
  const colorClass = color === "rust" ? "text-kynta-rust" : "text-kynta-teal";
  return (
    <p
      className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${colorClass} mb-4`}
    >
      {children}
    </p>
  );
}

function HangerIcon() {
  return (
    <div className="w-12 h-12 rounded-lg border border-kynta-border flex items-center justify-center mb-5 bg-white">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-kynta-rust"
      >
        <title>Guest experiences</title>
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7" />
        <path d="m2 18 8.5-6.5a2 2 0 0 1 3 0L22 18" />
        <path d="M2 18h20" />
      </svg>
    </div>
  );
}

function BuildingIcon() {
  return (
    <div className="w-12 h-12 rounded-lg border border-kynta-border flex items-center justify-center mb-5 bg-white">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-kynta-teal"
      >
        <title>Partnership models</title>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    </div>
  );
}

function BulletItem({
  children,
  color = "teal",
}: {
  children: React.ReactNode;
  color?: "teal" | "rust";
}) {
  const dotColor = color === "rust" ? "bg-kynta-rust" : "bg-kynta-teal";
  return (
    <li className="flex items-start gap-2.5 text-[15px] text-kynta-warm-gray leading-relaxed">
      <span
        className={`inline-block w-[6px] h-[6px] rounded-full ${dotColor} mt-[9px] flex-shrink-0`}
        aria-hidden="true"
      />
      {children}
    </li>
  );
}

function CardLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[15px] font-semibold text-kynta-teal hover:text-kynta-teal-light transition-colors mt-auto pt-6"
    >
      {children}
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
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
  );
}

export function IntroSection({ data }: IntroSectionProps) {
  const eyebrow = data?.eyebrow || "Holistic Gravitas • Hotelier Precision";
  const heading =
    data?.heading || "Where hospitality meets\nholistic wellness.";

  return (
    <section className="w-full bg-kynta-section-bg py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 mb-16 md:mb-20">
          <div>
            <p className="text-sm text-kynta-teal tracking-wide mb-4">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-kynta-charcoal whitespace-pre-line">
              {heading}
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <p className="text-[16px] leading-[1.75] text-kynta-warm-gray">
              Kynta redefines the Indian hotel spa paradigm. Rather than
              treating wellness as an isolated amenity, we curate complete
              therapeutic ecosystems where ancient Ayurvedic lineages, rare
              Himalayan flora, and uncompromising five-star hospitality
              standards coalesce.
            </p>
            <p className="text-[16px] leading-[1.75] text-kynta-warm-gray">
              We partner exclusively with luxury resorts, boutique heritage
              properties, and premier metropolitan hotels—serving as both an
              oasis of transcendent restoration for international travelers and
              a turnkey operational engine for institutional asset owners.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px]">
          <div className="flex flex-col rounded-[14px] border border-kynta-border bg-white p-8 md:p-[38px]">
            <HangerIcon />
            <Eyebrow color="rust">For Retreat Seekers &amp; Guests</Eyebrow>
            <h3 className="font-serif text-2xl lg:text-[28px] text-kynta-charcoal leading-tight mb-4">
              An Oasis of Pure Restoration
            </h3>
            <p className="text-[15px] leading-[1.75] text-kynta-warm-gray mb-6">
              Experience therapeutic rituals formulated from cold-pressed
              botanical extractions, sacred brass kansa techniques, and
              dosha-balancing touch delivered by master therapists in tranquil
              suites.
            </p>
            <ul className="flex flex-col gap-2 mb-6">
              <BulletItem color="teal">
                Bespoke Dosha &amp; Tension Diagnostic
              </BulletItem>
              <BulletItem color="teal">
                Rare Mountain Botanicals &amp; Kumkumadi Oils
              </BulletItem>
              <BulletItem color="teal">
                Acoustically Calibrated Sound Therapy
              </BulletItem>
            </ul>
            <CardLink href="/experiences">Explore Guest Experiences</CardLink>
          </div>

          <div className="flex flex-col rounded-[14px] border border-kynta-border bg-kynta-card-green p-8 md:p-[38px]">
            <BuildingIcon />
            <Eyebrow color="rust">For Hoteliers &amp; Developers</Eyebrow>
            <h3 className="font-serif text-2xl lg:text-[28px] text-kynta-charcoal leading-tight mb-4">
              Turnkey Wellness Operations
            </h3>
            <p className="text-[15px] leading-[1.75] text-kynta-warm-gray mb-6">
              Elevate your property asset yield. We assume end-to-end
              operational responsibility: spatial ergonomics, Academy therapist
              deployment, certified compliance, and luxury brand equity
              amplification.
            </p>
            <ul className="flex flex-col gap-2 mb-6">
              <BulletItem color="rust">
                Full P&amp;L Accountability &amp; RevPASH Optimization
              </BulletItem>
              <BulletItem color="rust">
                Permanent On-Site Management &amp; Audit
              </BulletItem>
              <BulletItem color="rust">
                Proprietary SOPs &amp; Apothecary Formulation
              </BulletItem>
            </ul>
            <CardLink href="/partnership">Explore Partnership Models</CardLink>
          </div>
        </div>
      </div>
    </section>
  );
}
