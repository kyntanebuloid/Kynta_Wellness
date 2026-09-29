import Link from "next/link";

interface SanctuaryCTASectionProps {
  data?: {
    heading?: string;
    description?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
}

export function SanctuaryCTASection({ data }: SanctuaryCTASectionProps) {
  const heading =
    data?.heading || "Planning a Multi-Sanctuary Ayurvedic Pilgrimage?";
  const description =
    data?.description ||
    "Our Senior Vaidyas and private sanctuary concierge coordinate seamless inter-resort journeys — from private Dharamshala helicopter transfers to camel-backed Pushkar sunsets — with harmonized treatment dossiers.";
  const ctaText = data?.ctaText || "Consult Sanctuary Desk";
  const ctaUrl = data?.ctaUrl || "/contact";

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <div
          className="w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-center"
          style={{
            backgroundColor: "var(--kynta-teal-dark)",
            borderRadius: "22px",
            padding: "40px 42px",
          }}
        >
          <div>
            <span
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <span
                className="inline-block w-[5px] h-[5px] rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--kynta-rust)" }}
                aria-hidden="true"
              />
              Sanctuary Concierge &amp; Transfers
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-[1.22] text-white mb-4">
              {heading}
            </h2>

            <p className="text-[15px] leading-[1.7] text-white/70 max-w-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={ctaUrl}
              className="inline-flex items-center justify-center gap-2.5 w-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#f7ddd0",
                color: "#2c2c2c",
                borderRadius: "10px",
                padding: "15px 24px",
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
                <title>Phone</title>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {ctaText}
            </Link>

            <Link
              href="https://wa.me/917250333494"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full text-[11px] font-semibold tracking-[0.12em] uppercase border transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.85)",
                borderColor: "rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "15px 24px",
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
              WhatsApp Concierge
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
