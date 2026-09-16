"use client";

import Link from "next/link";

interface ReservationSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    infoCards?: {
      icon?: string;
      title: string;
      description: string;
    }[];
    contactPhone?: string;
    contactEmail?: string;
    contactAddress?: string;
  };
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-lg border border-kynta-border/40 p-4">
      <div className="w-9 h-9 rounded-full bg-kynta-section-bg border border-kynta-border/40 flex items-center justify-center flex-shrink-0 text-kynta-teal">
        {icon}
      </div>
      <div>
        <h4 className="font-serif text-[15px] text-kynta-charcoal mb-1">
          {title}
        </h4>
        <p className="text-[12px] leading-[1.6] text-kynta-warm-gray">
          {description}
        </p>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Unhurried</title>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Confidential</title>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Direct concierge</title>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5"
    >
      {children}
      {required && <span className="text-kynta-rust"> *</span>}
    </label>
  );
}

const defaultInfoCards = [
  {
    icon: "clock",
    title: "Unhurried Reservations",
    description:
      "We limit daily reservations per sanctuary to preserve tranquil acoustics and zero-congestion hydrothermal access.",
  },
  {
    icon: "shield",
    title: "Confidential Discretion",
    description:
      "Special dietary preferences, high-privacy transit, and private hydro-suite arrangements catered with utmost discretion.",
  },
];

export function ReservationSection({ data }: ReservationSectionProps) {
  const eyebrow = data?.eyebrow || "Priority Spa Concierge";
  const heading = data?.heading || "Request a Curated Experience";
  const description =
    data?.description ||
    "Whether reserving a standalone afternoon somatic session or coordinating a multi-day private sanctuary retreat, our Ayurvedic concierge team personalizes every botanical parameter.";
  const whatsappNumber = data?.contactPhone || "917250333494";

  const infoCards =
    data?.infoCards?.map((c) => ({
      icon: c.icon === "shield" ? "shield" : "clock",
      title: c.title,
      description: c.description,
    })) || defaultInfoCards;

  return (
    <section className="w-full bg-kynta-section-bg py-16 md:py-20 lg:py-24">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[44%_1fr] gap-7">
          <div className="flex flex-col">
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-kynta-rust mb-3">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl lg:text-[34px] leading-[1.2] text-kynta-charcoal mb-4">
              {heading}
            </h2>
            <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-8 max-w-sm">
              {description}
            </p>
            <div className="flex flex-col gap-3">
              {infoCards.map((card) => (
                <InfoCard
                  key={card.title}
                  icon={card.icon === "shield" ? <ShieldIcon /> : <ClockIcon />}
                  title={card.title}
                  description={card.description}
                />
              ))}
              <div className="flex items-center justify-between bg-white rounded-lg border border-kynta-border/40 p-4">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-kynta-section-bg border border-kynta-border/40 flex items-center justify-center flex-shrink-0 text-kynta-teal">
                    <ChatIcon />
                  </div>
                  <div>
                    <h4 className="font-serif text-[15px] text-kynta-charcoal">
                      Direct Concierge Channel
                    </h4>
                    <p className="text-[11px] text-kynta-warm-gray">
                      Instant booking via WhatsApp
                    </p>
                  </div>
                </div>
                <Link
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-[12px] font-semibold text-white bg-[#25D366] rounded-md hover:bg-[#1fb855] transition-colors"
                >
                  WhatsApp Desk
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-kynta-border/40 p-6 lg:p-7">
            <h3 className="font-serif text-xl lg:text-[22px] text-kynta-charcoal mb-6">
              Reservation Particulars
            </h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel htmlFor="guest-name" required>
                    Guest Full Name
                  </FieldLabel>
                  <input
                    id="guest-name"
                    type="text"
                    placeholder="e.g. Maharani Gayatri Devi"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="phone">Phone / WhatsApp</FieldLabel>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91(0) 98765 43210"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel htmlFor="destination" required>
                    Sanctuary Destination
                  </FieldLabel>
                  <input
                    id="destination"
                    type="text"
                    placeholder="The Oberoi Rajvilas, Jaipur"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="experience">
                    Preferred Experience
                  </FieldLabel>
                  <input
                    id="experience"
                    type="text"
                    placeholder="Kynta Prana Herbal Compress (90 Min)"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <FieldLabel htmlFor="target-date" required>
                    Target Date
                  </FieldLabel>
                  <input
                    id="target-date"
                    type="date"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal transition-colors"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="time-slot" required>
                    Time Slot
                  </FieldLabel>
                  <input
                    id="time-slot"
                    type="text"
                    placeholder="09:30 AM (Morning Stillness)"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="party-size">Party Size</FieldLabel>
                  <input
                    id="party-size"
                    type="text"
                    placeholder="1 Guest"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors"
                  />
                </div>
              </div>
              <div>
                <FieldLabel htmlFor="special-requests">
                  Somatic Notes &amp; Special Requests
                </FieldLabel>
                <textarea
                  id="special-requests"
                  rows={3}
                  placeholder="Please mention muscle strain points, sensitivities to specific floral essences, or hydro-temperature preferences..."
                  className="w-full px-3 py-2.5 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 resize-none focus:outline-none focus:border-kynta-teal transition-colors"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-1">
                <p className="text-[11px] leading-[1.5] text-kynta-warm-gray max-w-[200px]">
                  Our Vaidya concierge confirms availability within 2 business
                  hours.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors whitespace-nowrap"
                >
                  Submit Experience Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
