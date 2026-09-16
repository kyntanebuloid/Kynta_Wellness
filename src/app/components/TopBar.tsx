import Link from "next/link";

interface TopBarProps {
  data?: {
    partnerText?: string;
    phone?: string;
    b2bLabel?: string;
    b2bUrl?: string;
  };
}

export function TopBar({ data }: TopBarProps) {
  const partnerText =
    data?.partnerText ||
    "Partnering with Premier Hotels & Resorts Across India";
  const partnerTextShort = "Premier Hotels & Resorts";
  const phone = data?.phone || "+91 7250333494";
  const b2bLabel = data?.b2bLabel || "B2B Hospitality Inquiries";
  const b2bUrl = data?.b2bUrl || "/contact";

  return (
    <div className="w-full bg-kynta-topbar-bg border-b border-kynta-border">
      <div className="container-site flex items-center justify-between py-2">
        <div className="flex items-center gap-2 text-sm text-kynta-charcoal">
          <span
            className="inline-block w-2 h-2 rounded-full bg-kynta-gold"
            aria-hidden="true"
          />
          <span className="hidden sm:inline">{partnerText}</span>
          <span className="sm:hidden text-xs">{partnerTextShort}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-kynta-charcoal">
          <span className="hidden md:inline">
            Concierge &amp; Desk: {phone}
          </span>
          <span className="hidden md:inline text-kynta-border">|</span>
          <Link
            href={b2bUrl}
            className="hidden md:inline hover:text-kynta-teal transition-colors"
          >
            {b2bLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
