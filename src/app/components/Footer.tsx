"use client";

import Link from "next/link";
import { useState } from "react";

interface FooterProps {
  data?: {
    brandName?: string;
    brandDescription?: string;
    newsletterHeading?: string;
    newsletterDescription?: string;
    newsletterPlaceholder?: string;
    newsletterButtonLabel?: string;
    footerNav?: {
      heading: string;
      links: {
        label: string;
        url: string;
      }[];
    }[];
  };
}

const defaultFooterNav = [
  {
    heading: "Explore",
    links: [
      { label: "Therapeutic Rituals", url: "/rituals" },
      { label: "Destination Spas", url: "/destinations" },
      { label: "The Healing Philosophy", url: "/philosophy" },
      { label: "Wellness Journal", url: "/journal" },
      { label: "Careers & Apprentices", url: "/careers" },
    ],
  },
  {
    heading: "Hospitality & Desks",
    links: [
      { label: "Turnkey Spa Operations", url: "/turnkey-operations" },
      { label: "Resort Design Advisory", url: "/resort-advisory" },
      { label: "Owner Inquiries & RFP", url: "/owner-rfp" },
      { label: "Guest Concierge Booking", url: "/concierge" },
    ],
  },
];

const defaultLegalLinks = [
  { label: "Privacy Policy", url: "/privacy" },
  { label: "Terms of Service", url: "/terms" },
  { label: "Spa Concierge", url: "/concierge" },
];

export function Footer({ data }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const footerNav = data?.footerNav || defaultFooterNav;
  const brandDescription =
    data?.brandDescription ||
    "Bridging ancient Indian restorative therapeutics with modern architectural stillness. Crafted exclusively for world-class hospitality sanctuaries and discerning seekers.";
  const newsletterHeading = data?.newsletterHeading || "Sanctuary Gazette";
  const newsletterDescription =
    data?.newsletterDescription ||
    "Discreet seasonal retreat schedules, botanical dispatches, and hotelier previews.";
  const newsletterPlaceholder =
    data?.newsletterPlaceholder || "Your email address";
  const newsletterButtonLabel = data?.newsletterButtonLabel || "Inscribe";

  return (
    <footer className="w-full bg-[#f2f5f3] pt-11 pb-8 border-t border-[#e2e8e4]">
      <div className="container-site">
        {/* 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1.3fr] gap-8 lg:gap-10 xl:gap-14">
          {/* Column 1: Brand & Certification */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center gap-1.5">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M18 3C18 3 13 7.5 13 13.5C13 17 15.5 19.5 18 20.5C20.5 19.5 23 17 23 13.5C23 7.5 18 3 18 3Z"
                    fill="#1a5a54"
                  />
                  <path
                    d="M11 9C8 11 6.5 15 7.5 18C8.5 20.5 11 21.5 13.5 20.5C13.5 17 12 13 11 9Z"
                    fill="#2e7c74"
                  />
                  <path
                    d="M25 9C28 11 29.5 15 28.5 18C27.5 20.5 25 21.5 22.5 20.5C22.5 17 24 13 25 9Z"
                    fill="#2e7c74"
                  />
                  <path
                    d="M8 19C8 26 12.5 30 18 30C23.5 30 28 26 28 19H8Z"
                    fill="#c8784e"
                  />
                  <rect
                    x="6.5"
                    y="17.5"
                    width="23"
                    height="2"
                    rx="1"
                    fill="#b3643c"
                  />
                  <circle cx="21" cy="11.5" r="2" fill="#df8e63" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[15px] tracking-tight text-[#0f3d39]">
                    KYNTA.
                  </span>
                  <span className="text-[6.5px] font-semibold tracking-[0.18em] text-[#0f3d39] uppercase">
                    Wellness Group
                  </span>
                </div>
              </div>

              <span className="font-serif text-[21px] font-bold text-[#0f3d39] tracking-tight ml-1">
                {data?.brandName || "Kynta Wellness"}
              </span>
            </div>

            <p className="text-[13px] leading-[1.65] text-[#55635d] max-w-[345px] mb-6">
              {brandDescription}
            </p>

            <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-[#3d4d46]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#274f46] flex-shrink-0" />
              <span>Certified Ayurvedic &amp; Hydro-Therapy Sanctums</span>
            </div>
          </div>

          {/* Navigation columns */}
          {footerNav.map((group) => (
            <div key={group.heading} className="flex flex-col">
              <h4 className="text-[13px] font-bold tracking-[0.02em] text-[#1c2924] mb-4">
                {group.heading}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-[13px] text-[#55635d] hover:text-[#0f3d39] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold tracking-[0.02em] text-[#1c2924] mb-4">
              {newsletterHeading}
            </h4>
            <p className="text-[12.5px] leading-[1.55] text-[#55635d] max-w-[275px] mb-4">
              {newsletterDescription}
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 max-w-[310px]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterPlaceholder}
                required
                className="flex-1 min-w-0 bg-white border border-[#d2dbd5] rounded px-3.5 py-2 text-[12px] text-[#2c3833] placeholder-[#8a9690] focus:outline-none focus:border-[#0f3d39] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#063833] hover:bg-[#0f4f48] text-white text-[12px] font-medium tracking-wide rounded transition-colors whitespace-nowrap"
              >
                {newsletterButtonLabel}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-[#d8e0db] mt-12 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-[#606d67]">
          <p>© 2025 Kynta Wellness Private Limited. All rights reserved.</p>

          <div className="flex items-center gap-6 text-[#4a5651]">
            {defaultLegalLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="hover:text-[#1c2924] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
