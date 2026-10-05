"use client";

import { useState } from "react";

import {
  type ExperiencesPageContent,
  experiencesPageDefaults,
} from "@/content/experiences";
import type { MembershipPlan } from "@/content/locations";
import { list, text } from "@/content/types";
import { locationSlugOf } from "@/lib/booking/menu";
import { keepPhoneTogether } from "@/lib/phone";
import { whatsappChatUrl } from "@/lib/whatsapp";

interface MembershipLocation {
  name: string;
  slug?: string;
  phone?: string;
  membership?: MembershipPlan[];
  membershipBasePrice?: number;
}

interface ExperienceMembershipSectionProps {
  data?: ExperiencesPageContent["membershipSection"];
  locations?: MembershipLocation[];
  fallbackPhone?: string;
}

const inr = (rupees: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);

/** Kynta Revibe prepaid membership: plans and prices for the chosen spa. */
export function ExperienceMembershipSection({
  data,
  locations = [],
  fallbackPhone,
}: ExperienceMembershipSectionProps) {
  const d = experiencesPageDefaults.membershipSection;
  const spas = locations.filter((l) =>
    (l.membership ?? []).some((p) => p.plan && p.pay > 0),
  );
  const [slug, setSlug] = useState(() =>
    spas[0] ? locationSlugOf(spas[0]) : "",
  );
  if (spas.length === 0) return null;

  const spa = spas.find((l) => locationSlugOf(l) === slug) ?? spas[0];
  const plans = (spa.membership ?? []).filter((p) => p.plan && p.pay > 0);
  const phone = keepPhoneTogether(
    spa.phone?.trim() || fallbackPhone?.trim() || "+91 7250333494",
  );
  const digits = phone.replace(/[^\d+]/g, "");
  const whatsapp = whatsappChatUrl(digits);
  const benefits = list(data?.benefits, d.benefits);
  const terms = list(data?.terms, d.terms);

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="container-site">
        <div className="max-w-2xl mb-10">
          <p className="section-label text-kynta-rust mb-3">
            {text(data?.eyebrow, d.eyebrow)}
          </p>
          <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-4">
            {text(data?.heading, d.heading)}
          </h2>
          <p className="text-[14px] leading-[1.75] text-kynta-warm-gray">
            {text(data?.description, d.description)}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-[12px] border border-kynta-border/40 bg-[#f7f9f7] p-4"
            >
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-kynta-teal-dark mb-1">
                {b.title}
              </p>
              <p className="text-[12.5px] leading-[1.55] text-kynta-warm-gray">
                {b.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div className="w-full sm:w-80">
            <label
              htmlFor="membership-spa"
              className="block text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5"
            >
              Membership prices at
            </label>
            <select
              id="membership-spa"
              value={locationSlugOf(spa)}
              onChange={(event) => setSlug(event.target.value)}
              className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal"
            >
              {spas.map((l) => (
                <option key={locationSlugOf(l)} value={locationSlugOf(l)}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11.5px] text-kynta-warm-gray">
            Prices in ₹, plus taxes. Redeemable at your home centre.
          </p>
        </div>

        {/* Table on larger screens, one card per plan on phones */}
        <div className="hidden md:block overflow-hidden rounded-[12px] border border-kynta-border/50">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-kynta-teal-dark text-white">
              <tr>
                {[
                  "Plan",
                  "You Pay",
                  "Opening Balance",
                  "Effective Discount",
                  "Expected Services",
                  "Validity",
                  "Share with Family",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-[10.5px] font-semibold tracking-[0.1em] uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans.map((p, i) => (
                <tr
                  key={p._key ?? p.plan}
                  className={i % 2 ? "bg-white" : "bg-[#fdf7ef]"}
                >
                  <td className="px-4 py-3 font-serif text-[16px] text-kynta-charcoal">
                    {p.plan}
                  </td>
                  <td className="px-4 py-3 font-semibold text-kynta-charcoal">
                    {inr(p.pay)}
                  </td>
                  <td className="px-4 py-3">{inr(p.openingBalance)}</td>
                  <td className="px-4 py-3 text-kynta-rust font-semibold">
                    {p.discount}
                  </td>
                  <td className="px-4 py-3">{p.services ?? "–"}</td>
                  <td className="px-4 py-3">
                    {p.validityMonths ? `${p.validityMonths} months` : "–"}
                  </td>
                  <td className="px-4 py-3">
                    {p.sharing === false ? "No" : "Yes"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden flex flex-col gap-3">
          {plans.map((p) => (
            <div
              key={p._key ?? p.plan}
              className="rounded-[12px] border border-kynta-border/50 p-4"
            >
              <div className="flex items-baseline justify-between mb-2">
                <p className="font-serif text-[18px] text-kynta-charcoal">
                  {p.plan}
                </p>
                <p className="text-[12px] font-semibold text-kynta-rust">
                  {p.discount} off
                </p>
              </div>
              <p className="text-[13px] text-kynta-charcoal">
                Pay <strong>{inr(p.pay)}</strong>, get{" "}
                <strong>{inr(p.openingBalance)}</strong> to spend
              </p>
              <p className="text-[12px] text-kynta-warm-gray mt-1">
                About {p.services ?? "–"} services · {p.validityMonths ?? "–"}{" "}
                months ·{" "}
                {p.sharing === false ? "Not shareable" : "Share with family"}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[12px] leading-[1.6] text-kynta-warm-gray">
          {spa.membershipBasePrice
            ? `Expected services are worked out on a 60-minute Swedish Massage at ${inr(spa.membershipBasePrice)}. `
            : ""}
          {text(data?.note, d.note)}
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-2">
              Terms &amp; Conditions
            </p>
            <ul className="space-y-1.5 text-[12.5px] leading-[1.6] text-kynta-warm-gray">
              {terms.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-kynta-rust" aria-hidden="true">
                    ✦
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={`tel:${digits}`}
              className="px-5 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors"
            >
              {text(data?.ctaLabel, d.ctaLabel)}: {phone}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-[#25D366] rounded-md hover:bg-[#1fb855] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
