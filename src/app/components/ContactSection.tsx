"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  type ContactPageContent,
  type ContactPhone,
  contactPageDefaults,
  type LegacyContactPhones,
} from "@/content/contact";
import { imageAlt, imageUrl, list, text } from "@/content/types";
import { sendContactEnquiry } from "@/lib/actions/contact";
import { keepPhoneTogether } from "@/lib/phone";
import { whatsappChatUrl } from "@/lib/whatsapp";

interface ContactSectionProps {
  data?: ContactPageContent;
  /** Spa names from the Locations page, for the guest form. */
  locationNames?: string[];
}

// For Hotels page buttons link to /contact?tier=…; same order as hotelServices.
const HOTEL_TIERS = ["turnkey", "advisory", "licensing"];

/**
 * Phone rows to show. Uses Sanity's Phone Numbers list; before that list
 * exists, the older single phone/WhatsApp fields; built-in numbers only when
 * Sanity has no Contact page at all. Rows without a number are skipped.
 */
function contactPhones(data?: ContactPageContent | null) {
  const d = contactPageDefaults.desks;
  const stored = data?.desks as
    | (NonNullable<ContactPageContent["desks"]> & LegacyContactPhones)
    | undefined;
  let rows: ContactPhone[];
  if (!data) {
    rows = d.phones;
  } else if (stored?.phones) {
    rows = stored.phones;
  } else {
    rows = [
      {
        kind: "phone",
        label: stored?.phoneLabel,
        number: stored?.phone,
        note: stored?.phoneHours,
      },
      {
        kind: "whatsapp",
        label: stored?.whatsappLabel,
        number: stored?.whatsappNumber,
        note: stored?.whatsappBadge,
      },
    ];
  }
  return rows
    .filter((row) => row.number?.trim())
    .map((row) => {
      const digits = (row.number ?? "").replace(/[^\d+]/g, "");
      const whatsapp = row.kind === "whatsapp";
      return {
        whatsapp,
        label: row.label ?? "",
        number: keepPhoneTogether(row.number ?? ""),
        note: row.note ?? "",
        href: whatsapp ? whatsappChatUrl(digits) : `tel:${digits}`,
      };
    });
}

const inputClass =
  "w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal placeholder:text-kynta-warm-gray/70 outline-none";
const labelClass =
  "text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5";

function SelectBox({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] pl-3.5 pr-9 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal appearance-none cursor-pointer outline-none"
      >
        {children}
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
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

export function ContactSection({
  data,
  locationNames = [],
}: ContactSectionProps) {
  const [mode, setMode] = useState<"guest" | "hotel">("guest");
  const [serviceIndex, setServiceIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorText, setErrorText] = useState("");
  const startedAt = useRef(0);

  // Remember when the form appeared (spam check), and open the hotel form
  // with the right service when coming from a For Hotels page button.
  useEffect(() => {
    startedAt.current = Date.now();
    const tier = new URLSearchParams(window.location.search).get("tier");
    const index = tier ? HOTEL_TIERS.indexOf(tier) : -1;
    if (index >= 0) {
      setMode("hotel");
      setServiceIndex(index);
    }
  }, []);

  const d = contactPageDefaults;
  const hero = {
    eyebrow: text(data?.hero?.eyebrow, d.hero.eyebrow),
    heading: text(data?.hero?.heading, d.hero.heading),
    subheading: text(data?.hero?.subheading, d.hero.subheading),
  };
  const dk = data?.desks;
  const desks = {
    eyebrow: text(dk?.eyebrow, d.desks.eyebrow),
    heading: text(dk?.heading, d.desks.heading),
    description: text(dk?.description, d.desks.description),
    phones: contactPhones(data),
    emailHeading: text(dk?.emailHeading, d.desks.emailHeading),
    // Once Sanity has the page, an empty list there hides the email box.
    emails: (data ? (dk?.emails ?? []) : d.desks.emails).filter(
      (row): row is { label?: string; email: string } => !!row.email?.trim(),
    ),
    image: imageUrl(dk?.image, d.desks.image),
    imageAlt: imageAlt(dk?.image, d.desks.image),
    imageLabel: text(dk?.imageLabel, d.desks.imageLabel),
    imageCaption: text(dk?.imageCaption, d.desks.imageCaption),
    hoursHeading: text(dk?.hoursHeading, d.desks.hoursHeading),
    hoursText: text(dk?.hoursText, d.desks.hoursText),
  };
  const f = data?.form;
  const form = {
    eyebrow: text(f?.eyebrow, d.form.eyebrow),
    heading: text(f?.heading, d.form.heading),
    description: text(f?.description, d.form.description),
    guestTab: text(f?.tabs?.[0], d.form.tabs[0]),
    hotelTab: text(f?.tabs?.[1], d.form.tabs[1]),
    nameLabel: text(f?.nameLabel, d.form.nameLabel),
    namePlaceholder: text(f?.namePlaceholder, d.form.namePlaceholder),
    emailLabel: text(f?.emailLabel, d.form.emailLabel),
    emailPlaceholder: text(f?.emailPlaceholder, d.form.emailPlaceholder),
    phoneLabel: text(f?.phoneLabel, d.form.phoneLabel),
    phonePlaceholder: text(f?.phonePlaceholder, d.form.phonePlaceholder),
    sanctuaryLabel: text(f?.sanctuaryLabel, d.form.sanctuaryLabel),
    sanctuaryPlaceholder: text(
      f?.sanctuaryPlaceholder,
      d.form.sanctuaryPlaceholder,
    ),
    // Typed-in options win; otherwise the spas on the Locations page.
    sanctuaries: [...new Set(list(f?.sanctuaries, locationNames))],
    propertyLabel: text(f?.propertyLabel, d.form.propertyLabel),
    propertyPlaceholder: text(
      f?.propertyPlaceholder,
      d.form.propertyPlaceholder,
    ),
    cityLabel: text(f?.cityLabel, d.form.cityLabel),
    cityPlaceholder: text(f?.cityPlaceholder, d.form.cityPlaceholder),
    serviceLabel: text(f?.serviceLabel, d.form.serviceLabel),
    servicePlaceholder: text(f?.servicePlaceholder, d.form.servicePlaceholder),
    hotelServices: [...new Set(list(f?.hotelServices, d.form.hotelServices))],
    messageLabel: text(f?.messageLabel, d.form.messageLabel),
    messagePlaceholder: text(f?.messagePlaceholder, d.form.messagePlaceholder),
    hotelMessagePlaceholder: text(
      f?.hotelMessagePlaceholder,
      d.form.hotelMessagePlaceholder,
    ),
    privacyNote: text(f?.privacyNote, d.form.privacyNote),
    submitLabel: text(f?.submitLabel, d.form.submitLabel),
    successMessage: text(f?.successMessage, d.form.successMessage),
    errorMessage: text(f?.errorMessage, d.form.errorMessage),
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    formData.set("type", mode);
    formData.set("startedAt", String(startedAt.current));
    if (mode === "hotel") {
      formData.set(
        "service",
        serviceIndex === null ? "" : (form.hotelServices[serviceIndex] ?? ""),
      );
    }

    setStatus("sending");
    try {
      const result = await sendContactEnquiry(formData);
      if (result.ok) {
        setStatus("sent");
        formEl.reset();
        setServiceIndex(null);
      } else {
        setStatus("error");
        setErrorText(
          result.error === "send" ? form.errorMessage : result.error,
        );
      }
    } catch {
      setStatus("error");
      setErrorText(form.errorMessage);
    }
  };

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#f1f4f2" }}
    >
      <div className="container-site">
        <div className="mb-12 sm:mb-14 lg:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-kynta-rust flex-shrink-0" />
            <span className="text-xs font-semibold tracking-wider uppercase text-kynta-rust">
              {hero.eyebrow}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-kynta-teal-dark font-normal mb-4">
            {hero.heading}
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[1.75] text-kynta-warm-gray max-w-2xl">
            {hero.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-6">
              <p className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-1.5">
                {desks.eyebrow}
              </p>
              <h2 className="font-serif text-[26px] sm:text-[30px] md:text-[32px] leading-tight text-kynta-teal-dark font-normal mb-2.5">
                {desks.heading}
              </h2>
              <p className="text-[12px] sm:text-[12.5px] leading-[1.62] text-kynta-warm-gray">
                {desks.description}
              </p>
            </div>

            {desks.phones.map((row, index) => (
              <div
                key={`${row.number}-${index}`}
                className="bg-white rounded-[12px] p-4 sm:p-4.5 border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center justify-between gap-3 mb-3.5 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] bg-[#eef4f1] flex items-center justify-center flex-shrink-0 ${
                      row.whatsapp ? "text-[#2d7a5b]" : "text-kynta-teal-dark"
                    }`}
                  >
                    {row.whatsapp ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    {row.label && (
                      <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-0.5">
                        {row.label}
                      </span>
                    )}
                    <a
                      href={row.href}
                      {...(row.whatsapp
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[13.5px] sm:text-[14px] font-semibold text-kynta-charcoal block hover:text-kynta-teal-dark transition-colors"
                    >
                      {row.number}
                    </a>
                  </div>
                </div>
                {row.note &&
                  (row.whatsapp ? (
                    <span className="text-[9px] font-semibold tracking-[0.14em] uppercase px-2 py-0.5 rounded-[4px] bg-[#fdf0ec] text-kynta-rust whitespace-nowrap">
                      {row.note}
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-[11px] text-kynta-warm-gray font-normal whitespace-nowrap pl-2">
                      {row.note}
                    </span>
                  ))}
              </div>
            ))}

            {desks.emails.length > 0 && (
              <div className="bg-white rounded-[12px] p-5 border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.02)] mb-4">
                <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-3">
                  {desks.emailHeading}
                </span>
                <div className="space-y-2.5">
                  {desks.emails.map((row, index) => (
                    <div
                      key={`${row.email}-${index}`}
                      className={`flex items-center justify-between text-[11.5px] sm:text-[12px] gap-2${
                        index > 0 ? " pt-2 border-t border-kynta-border/20" : ""
                      }`}
                    >
                      <span className="text-kynta-warm-gray">{row.label}</span>
                      <a
                        href={`mailto:${row.email.trim()}`}
                        className="text-kynta-teal-dark hover:underline font-medium break-all"
                      >
                        {row.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative rounded-[14px] overflow-hidden border border-kynta-border/40 shadow-sm mb-4 bg-kynta-charcoal aspect-[16/9.5] group">
              <Image
                src={desks.image}
                alt={desks.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141412] via-[#141412]/80 via-40% to-transparent flex flex-col justify-end p-5">
                <p className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#d5c3aa] mb-1">
                  {desks.imageLabel}
                </p>
                <p className="font-serif text-[14px] sm:text-[15px] font-normal text-white leading-snug">
                  {desks.imageCaption}
                </p>
              </div>
            </div>

            <div
              className="rounded-[10px] p-4 sm:p-4.5 border border-[#dbe1de]"
              style={{ backgroundColor: "#e6e9e7" }}
            >
              <div className="flex items-center gap-2 mb-2 text-kynta-teal-dark">
                <svg
                  aria-hidden="true"
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
                  {desks.hoursHeading}
                </span>
              </div>
              <p className="text-[11px] sm:text-[11.5px] leading-[1.62] text-kynta-warm-gray">
                {desks.hoursText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-[16px] p-6 sm:p-8 md:p-10 border border-kynta-border/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <p className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-2">
              {form.eyebrow}
            </p>
            <h2 className="font-serif text-[28px] sm:text-[34px] leading-tight text-kynta-teal-dark font-normal mb-2.5">
              {form.heading}
            </h2>
            <p className="text-[12px] sm:text-[12.5px] leading-[1.6] text-kynta-warm-gray mb-6">
              {form.description}
            </p>

            <fieldset className="m-0 min-w-0 border-0 bg-[#eceeeb] p-1 rounded-[8px] grid grid-cols-2 gap-1 mb-6">
              <legend className="sr-only">Who is getting in touch</legend>
              {(["guest", "hotel"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={mode === value}
                  onClick={() => setMode(value)}
                  className={`py-2.5 px-3 text-[9.5px] sm:text-[10px] tracking-[0.12em] uppercase font-semibold rounded-[6px] transition-all text-center ${
                    mode === value
                      ? "bg-kynta-teal-dark text-white shadow-sm"
                      : "text-kynta-warm-gray hover:text-kynta-charcoal"
                  }`}
                >
                  {value === "guest" ? form.guestTab : form.hotelTab}
                </button>
              ))}
            </fieldset>

            <form onSubmit={handleSubmit} className="relative space-y-4">
              {/* Hidden from people; bots that fill it in are ignored. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[10000px] h-px w-px overflow-hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    {form.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    autoComplete="name"
                    placeholder={form.namePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    {form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder={form.emailPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    {form.phoneLabel}
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    maxLength={40}
                    autoComplete="tel"
                    placeholder={form.phonePlaceholder}
                    className={inputClass}
                  />
                </div>

                {mode === "guest" ? (
                  <div>
                    <label htmlFor="contact-location" className={labelClass}>
                      {form.sanctuaryLabel}
                    </label>
                    <SelectBox id="contact-location" name="location">
                      <option value="">{form.sanctuaryPlaceholder}</option>
                      {form.sanctuaries.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SelectBox>
                  </div>
                ) : (
                  <>
                    <div>
                      <label htmlFor="contact-property" className={labelClass}>
                        {form.propertyLabel}
                      </label>
                      <input
                        id="contact-property"
                        name="property"
                        type="text"
                        required
                        maxLength={160}
                        autoComplete="organization"
                        placeholder={form.propertyPlaceholder}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-city" className={labelClass}>
                        {form.cityLabel}
                      </label>
                      <input
                        id="contact-city"
                        name="city"
                        type="text"
                        maxLength={80}
                        autoComplete="address-level2"
                        placeholder={form.cityPlaceholder}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-service" className={labelClass}>
                        {form.serviceLabel}
                      </label>
                      <SelectBox
                        id="contact-service"
                        value={
                          serviceIndex === null ? "" : String(serviceIndex)
                        }
                        onChange={(event) =>
                          setServiceIndex(
                            event.target.value === ""
                              ? null
                              : Number(event.target.value),
                          )
                        }
                      >
                        <option value="">{form.servicePlaceholder}</option>
                        {form.hotelServices.map((option, index) => (
                          <option key={option} value={index}>
                            {option}
                          </option>
                        ))}
                      </SelectBox>
                    </div>
                  </>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  {form.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  maxLength={4000}
                  placeholder={
                    mode === "hotel"
                      ? form.hotelMessagePlaceholder
                      : form.messagePlaceholder
                  }
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
                    aria-hidden="true"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <p className="text-[10px] sm:text-[10.5px] leading-tight max-w-[280px]">
                    {form.privacyNote}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-kynta-teal-dark hover:bg-kynta-teal disabled:opacity-60 disabled:cursor-wait text-white text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase px-7 py-3.5 rounded-[6px] transition-all duration-200 shadow-sm whitespace-nowrap active:scale-[0.98] self-start sm:self-auto"
                >
                  {status === "sending" ? "SENDING…" : form.submitLabel}
                </button>
              </div>

              <div aria-live="polite">
                {status === "sent" && (
                  <div className="mt-3 p-3 rounded-[6px] bg-[#eef4f1] border border-[#d2e2db] text-[11.5px] text-kynta-teal-dark text-center font-medium">
                    {form.successMessage}
                  </div>
                )}
                {status === "error" && (
                  <div className="mt-3 p-3 rounded-[6px] bg-[#fdf0ec] border border-[#f3d5c8] text-[11.5px] text-kynta-rust text-center font-medium">
                    {errorText}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
