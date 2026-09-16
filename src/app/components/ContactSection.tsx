"use client";

import Image from "next/image";
import { useState } from "react";

type BookingTab = "private" | "hospitality" | "vaidya";

interface ContactSectionProps {
  data?: {
    hero?: {
      eyebrow?: string;
      heading?: string;
      subheading?: string;
    };
    tabs?: {
      label: string;
      value: string;
    }[];
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
      workingHours?: string;
    };
    locationCards?: {
      name: string;
      address: string;
      phone?: string;
      hours?: string;
      image?: { asset?: { _ref: string }; alt?: string };
    }[];
    formFields?: {
      nameLabel?: string;
      emailLabel?: string;
      phoneLabel?: string;
      serviceLabel?: string;
      messageLabel?: string;
      submitButtonLabel?: string;
    };
  };
}

export function ContactSection({ data }: ContactSectionProps) {
  const [activeTab, setActiveTab] = useState<BookingTab>("private");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#f1f4f2" }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="mb-12 sm:mb-14 lg:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-kynta-rust flex-shrink-0" />
            <span className="text-[10px] sm:text-[10.5px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-kynta-rust">
              {data?.hero?.eyebrow || "SANCTUARY LIAISON &amp; CONCIERGE"}
            </span>
          </div>
          <h1 className="font-serif text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.12] text-kynta-teal-dark font-normal mb-3.5">
            {data?.hero?.heading || "Connect With Our Sanctuary Desks"}
          </h1>
          <p className="text-[13px] sm:text-[13.5px] md:text-[14px] leading-[1.65] text-kynta-warm-gray max-w-[760px]">
            {data?.hero?.subheading ||
              "Connect with our sanctuary curators for retreat reservations, clinical Vaidya consultations, and institutional advisory. Our team responds with ancestral precision and unyielding discretion."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-6">
              <p className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-1.5">
                DIRECT COMMUNICATION PORTALS
              </p>
              <h2 className="font-serif text-[26px] sm:text-[30px] md:text-[32px] leading-tight text-kynta-teal-dark font-normal mb-2.5">
                Sanctuary Desks
              </h2>
              <p className="text-[12px] sm:text-[12.5px] leading-[1.62] text-kynta-warm-gray">
                Our stewards oversee limited correspondence streams to preserve
                the sanctity and deep attention owed to every guest and
                institutional patron.
              </p>
            </div>

            <div className="bg-white rounded-[12px] p-4 sm:p-4.5 border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center justify-between gap-3 mb-3.5 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] bg-[#eef4f1] text-kynta-teal-dark flex items-center justify-center flex-shrink-0">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-0.5">
                    PRIVATE GUEST CONCIERGE
                  </span>
                  <a
                    href={`tel:${data?.contactInfo?.phone || "+917250333494"}`}
                    className="text-[13.5px] sm:text-[14px] font-semibold text-kynta-charcoal block hover:text-kynta-teal-dark transition-colors"
                  >
                    {data?.contactInfo?.phone || "+91 7250333494"}
                  </a>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] text-kynta-warm-gray font-normal whitespace-nowrap pl-2">
                {data?.contactInfo?.workingHours || "07:00 – 22:00 IST"}
              </span>
            </div>

            <div className="bg-white rounded-[12px] p-4 sm:p-4.5 border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center justify-between gap-3 mb-3.5 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] bg-[#eef4f1] text-[#2d7a5b] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-0.5">
                    ENCRYPTED SANCTUARY WHATSAPP
                  </span>
                  <a
                    href="https://wa.me/919820048300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] sm:text-[14px] font-semibold text-kynta-charcoal block hover:text-kynta-teal-dark transition-colors"
                  >
                    +91 98200 48300
                  </a>
                </div>
              </div>
              <span className="text-[9px] font-semibold tracking-[0.14em] uppercase px-2 py-0.5 rounded-[4px] bg-[#fdf0ec] text-kynta-rust whitespace-nowrap">
                INSTANT
              </span>
            </div>

            <div className="bg-white rounded-[12px] p-5 border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.02)] mb-4">
              <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-3">
                SPECIALIZED EMAIL DESKS
              </span>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11.5px] sm:text-[12px] gap-2">
                  <span className="text-kynta-warm-gray">
                    Official email address
                  </span>
                  <a
                    href={`mailto:${data?.contactInfo?.email || "info@kyntawellness.com"}`}
                    className="text-kynta-teal-dark hover:underline font-medium"
                  >
                    {data?.contactInfo?.email || "info@kyntawellness.com"}
                  </a>
                </div>
                <div className="flex items-center justify-between text-[11.5px] sm:text-[12px] gap-2 pt-2 border-t border-kynta-border/20">
                  <span className="text-kynta-warm-gray">
                    Official email address
                  </span>
                  <a
                    href="mailto:bussinss@kyntawellness.com"
                    className="text-kynta-teal-dark hover:underline font-medium"
                  >
                    bussinss@kyntawellness.com
                  </a>
                </div>
              </div>
            </div>

            <div className="relative rounded-[14px] overflow-hidden border border-kynta-border/40 shadow-sm mb-4 bg-kynta-charcoal aspect-[16/9.5] group">
              <Image
                src="/contact-chamber.png"
                alt="Kynta Treatment Chambers"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141412] via-[#141412]/80 via-40% to-transparent flex flex-col justify-end p-5">
                <p className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#d5c3aa] mb-1">
                  THERAPEUTIC ARCHITECTURE
                </p>
                <p className="font-serif text-[14px] sm:text-[15px] font-normal text-white leading-snug">
                  Kynta Treatment Chambers • Udaipur, Shimla &amp; Mandrem
                </p>
              </div>
            </div>

            <div
              className="rounded-[10px] p-4 sm:p-4.5 border border-[#dbe1de]"
              style={{ backgroundColor: "#e6e9e7" }}
            >
              <div className="flex items-center gap-2 mb-2 text-kynta-teal-dark">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal">
                  CIRCADIAN RECEPTION HOURS
                </span>
              </div>
              <p className="text-[11px] sm:text-[11.5px] leading-[1.62] text-kynta-warm-gray">
                In alignment with ancient chronobiology (Brahma Muhurta through
                Sandhya), our telephone concierges are accessible from 07:00 to
                22:00 IST. Digital dispatches undergo intake around the clock.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-[16px] p-6 sm:p-8 md:p-10 border border-kynta-border/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <p className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-2">
              CONCIERGE INTAKE
            </p>
            <h2 className="font-serif text-[28px] sm:text-[34px] leading-tight text-kynta-teal-dark font-normal mb-2.5">
              Initiate Sanctuary Dialogue
            </h2>
            <p className="text-[12px] sm:text-[12.5px] leading-[1.6] text-kynta-warm-gray mb-6">
              Please share your preferred rhythm, sanctuary location, or
              operational scope. Our desk curator will review and assemble your
              customized therapeutic folio.
            </p>

            <div className="bg-[#eceeeb] p-1 rounded-[8px] flex items-center gap-1 mb-6 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("private")}
                className={`flex-1 py-2 px-3 text-[9.5px] sm:text-[10px] tracking-[0.12em] uppercase font-semibold rounded-[6px] transition-all whitespace-nowrap text-center ${
                  activeTab === "private"
                    ? "bg-kynta-teal-dark text-white shadow-sm"
                    : "text-kynta-warm-gray hover:text-kynta-charcoal"
                }`}
              >
                PRIVATE GUEST BOOKING
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hospitality")}
                className={`flex-1 py-2 px-3 text-[9.5px] sm:text-[10px] tracking-[0.12em] uppercase font-semibold rounded-[6px] transition-all whitespace-nowrap text-center ${
                  activeTab === "hospitality"
                    ? "bg-kynta-teal-dark text-white shadow-sm"
                    : "text-kynta-warm-gray hover:text-kynta-charcoal"
                }`}
              >
                HOSPITALITY &amp; TURNKEY
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vaidya")}
                className={`flex-1 py-2 px-3 text-[9.5px] sm:text-[10px] tracking-[0.12em] uppercase font-semibold rounded-[6px] transition-all whitespace-nowrap text-center ${
                  activeTab === "vaidya"
                    ? "bg-kynta-teal-dark text-white shadow-sm"
                    : "text-kynta-warm-gray hover:text-kynta-charcoal"
                }`}
              >
                VAIDYA CONSULTATION
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="guest-name"
                    className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5"
                  >
                    {data?.formFields?.nameLabel ||
                      "PRINCIPAL GUEST / EXECUTIVE NAME *"}
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    placeholder="e.g. Lady Anya Vardhan"
                    className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal placeholder:text-kynta-warm-gray/70 outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guest-email"
                    className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5"
                  >
                    {data?.formFields?.emailLabel ||
                      "CONFIDENTIAL EMAIL ADDRESS *"}
                  </label>
                  <input
                    id="guest-email"
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal placeholder:text-kynta-warm-gray/70 outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guest-phone"
                    className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5"
                  >
                    {data?.formFields?.phoneLabel ||
                      "DIRECT TELEPHONE / WHATSAPP"}
                  </label>
                  <input
                    id="guest-phone"
                    type="tel"
                    placeholder="+91 / +44 / +1 ..."
                    className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal placeholder:text-kynta-warm-gray/70 outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sanctuary-select"
                    className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5"
                  >
                    {data?.formFields?.serviceLabel ||
                      "SANCTUARY OF RESONANCE *"}
                  </label>
                  <div className="relative">
                    <select
                      id="sanctuary-select"
                      required
                      defaultValue=""
                      className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal appearance-none cursor-pointer outline-none"
                    >
                      <option value="" disabled>
                        Select an Estate
                      </option>
                      <option value="kumarakom">
                        Kumarakom Retreat, Kerala
                      </option>
                      <option value="udaipur">
                        Udaipur Lake Sanctuary, Rajasthan
                      </option>
                      <option value="shimla">
                        Himalayan High Sanctuaries, Shimla
                      </option>
                      <option value="goa">
                        Mandrem Coconut Grove, North Goa
                      </option>
                      <option value="bhanjwar">
                        Bhanjwar Estate, Kangra Valley
                      </option>
                      <option value="multiple">
                        Multiple Sanctuaries / Institutional Scope
                      </option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-kynta-warm-gray">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="therapeutic-intent"
                    className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5"
                  >
                    PRIMARY THERAPEUTIC INTENT
                  </label>
                  <input
                    id="therapeutic-intent"
                    type="text"
                    defaultValue="14–21 Day Classical Panchakarma"
                    className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal placeholder:text-kynta-warm-gray/70 outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="anticipated-dates"
                    className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5"
                  >
                    ANTICIPATED SEASON / DATES
                  </label>
                  <input
                    id="anticipated-dates"
                    type="text"
                    placeholder="e.g. October 2025 / Flexible"
                    className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal placeholder:text-kynta-warm-gray/70 outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-specifications"
                  className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5"
                >
                  {data?.formFields?.messageLabel ||
                    "SOMATIC SENSITIVITIES, DIETARY PRINCIPLES, OR PROJECT SPECIFICATIONS"}
                </label>
                <textarea
                  id="project-specifications"
                  rows={4}
                  placeholder="Detail any existing medical protocols, sleep rhythms, botanical allergies, or institutional hotel scale requirements..."
                  className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] p-3.5 text-[12px] leading-[1.6] text-kynta-charcoal placeholder:text-kynta-warm-gray/70 outline-none resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3">
                <div className="flex items-center gap-2 text-kynta-warm-gray">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <p className="text-[10px] sm:text-[10.5px] leading-tight max-w-[280px]">
                    All intakes are bound by statutory Ayush and GDPR
                    confidential protocols.
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-kynta-teal-dark hover:bg-kynta-teal text-white text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase px-7 py-3.5 rounded-[6px] transition-all duration-200 shadow-sm whitespace-nowrap active:scale-[0.98] self-start sm:self-auto"
                >
                  {data?.formFields?.submitButtonLabel ||
                    "TRANSMIT CONCIERGE FOLIO"}
                </button>
              </div>

              {submitted && (
                <div className="mt-3 p-3 rounded-[6px] bg-[#eef4f1] border border-[#d2e2db] text-[11.5px] text-kynta-teal-dark text-center font-medium transition-opacity duration-300">
                  Thank you. Your concierge intake folio has been securely
                  transmitted. A sanctuary curator will contact you promptly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
