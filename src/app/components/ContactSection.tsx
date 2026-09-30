"use client";

import Image from "next/image";
import { useState } from "react";
import { type ContactPageContent, contactPageDefaults } from "@/content/contact";
import { imageAlt, imageUrl, list, text } from "@/content/types";

interface ContactSectionProps {
  data?: ContactPageContent;
}

const inputClass =
  "w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal placeholder:text-kynta-warm-gray/70 outline-none";
const labelClass =
  "text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal block mb-1.5";

export function ContactSection({ data }: ContactSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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
    phoneLabel: text(dk?.phoneLabel, d.desks.phoneLabel),
    phone: text(dk?.phone, d.desks.phone),
    phoneHours: text(dk?.phoneHours, d.desks.phoneHours),
    whatsappLabel: text(dk?.whatsappLabel, d.desks.whatsappLabel),
    whatsappNumber: text(dk?.whatsappNumber, d.desks.whatsappNumber),
    whatsappUrl: text(dk?.whatsappUrl, d.desks.whatsappUrl),
    whatsappBadge: text(dk?.whatsappBadge, d.desks.whatsappBadge),
    emailHeading: text(dk?.emailHeading, d.desks.emailHeading),
    emails: list(dk?.emails, d.desks.emails),
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
    tabs: list(f?.tabs, d.form.tabs),
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
    sanctuaries: list(f?.sanctuaries, d.form.sanctuaries),
    intentLabel: text(f?.intentLabel, d.form.intentLabel),
    intentDefault: text(f?.intentDefault, d.form.intentDefault),
    datesLabel: text(f?.datesLabel, d.form.datesLabel),
    datesPlaceholder: text(f?.datesPlaceholder, d.form.datesPlaceholder),
    messageLabel: text(f?.messageLabel, d.form.messageLabel),
    messagePlaceholder: text(f?.messagePlaceholder, d.form.messagePlaceholder),
    privacyNote: text(f?.privacyNote, d.form.privacyNote),
    submitLabel: text(f?.submitLabel, d.form.submitLabel),
    successMessage: text(f?.successMessage, d.form.successMessage),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
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
                    {desks.phoneLabel}
                  </span>
                  <a
                    href={`tel:${desks.phone.replace(/[^+\d]/g, "")}`}
                    className="text-[13.5px] sm:text-[14px] font-semibold text-kynta-charcoal block hover:text-kynta-teal-dark transition-colors"
                  >
                    {desks.phone}
                  </a>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] text-kynta-warm-gray font-normal whitespace-nowrap pl-2">
                {desks.phoneHours}
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
                    {desks.whatsappLabel}
                  </span>
                  <a
                    href={desks.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] sm:text-[14px] font-semibold text-kynta-charcoal block hover:text-kynta-teal-dark transition-colors"
                  >
                    {desks.whatsappNumber}
                  </a>
                </div>
              </div>
              <span className="text-[9px] font-semibold tracking-[0.14em] uppercase px-2 py-0.5 rounded-[4px] bg-[#fdf0ec] text-kynta-rust whitespace-nowrap">
                {desks.whatsappBadge}
              </span>
            </div>

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
                      href={`mailto:${row.email}`}
                      className="text-kynta-teal-dark hover:underline font-medium"
                    >
                      {row.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

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

            <div className="bg-[#eceeeb] p-1 rounded-[8px] flex items-center gap-1 mb-6 overflow-x-auto">
              {form.tabs.map((tab, index) => (
                <button
                  key={`${tab}-${index}`}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 py-2 px-3 text-[9.5px] sm:text-[10px] tracking-[0.12em] uppercase font-semibold rounded-[6px] transition-all whitespace-nowrap text-center ${
                    activeTab === index
                      ? "bg-kynta-teal-dark text-white shadow-sm"
                      : "text-kynta-warm-gray hover:text-kynta-charcoal"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guest-name" className={labelClass}>
                    {form.nameLabel}
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    placeholder={form.namePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="guest-email" className={labelClass}>
                    {form.emailLabel}
                  </label>
                  <input
                    id="guest-email"
                    type="email"
                    required
                    placeholder={form.emailPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="guest-phone" className={labelClass}>
                    {form.phoneLabel}
                  </label>
                  <input
                    id="guest-phone"
                    type="tel"
                    placeholder={form.phonePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="sanctuary-select" className={labelClass}>
                    {form.sanctuaryLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="sanctuary-select"
                      required
                      defaultValue=""
                      className="w-full bg-[#f0f2f0] border border-transparent focus:border-kynta-teal focus:bg-white transition-all rounded-[6px] px-3.5 py-2.5 text-[12px] sm:text-[12.5px] text-kynta-charcoal appearance-none cursor-pointer outline-none"
                    >
                      <option value="" disabled>
                        {form.sanctuaryPlaceholder}
                      </option>
                      {form.sanctuaries.map((option, index) => (
                        <option key={`${option}-${index}`} value={option}>
                          {option}
                        </option>
                      ))}
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
                  <label htmlFor="therapeutic-intent" className={labelClass}>
                    {form.intentLabel}
                  </label>
                  <input
                    id="therapeutic-intent"
                    type="text"
                    defaultValue={form.intentDefault}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="anticipated-dates" className={labelClass}>
                    {form.datesLabel}
                  </label>
                  <input
                    id="anticipated-dates"
                    type="text"
                    placeholder={form.datesPlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project-specifications" className={labelClass}>
                  {form.messageLabel}
                </label>
                <textarea
                  id="project-specifications"
                  rows={4}
                  placeholder={form.messagePlaceholder}
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
                    {form.privacyNote}
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-kynta-teal-dark hover:bg-kynta-teal text-white text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase px-7 py-3.5 rounded-[6px] transition-all duration-200 shadow-sm whitespace-nowrap active:scale-[0.98] self-start sm:self-auto"
                >
                  {form.submitLabel}
                </button>
              </div>

              {submitted && (
                <div className="mt-3 p-3 rounded-[6px] bg-[#eef4f1] border border-[#d2e2db] text-[11.5px] text-kynta-teal-dark text-center font-medium transition-opacity duration-300">
                  {form.successMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
