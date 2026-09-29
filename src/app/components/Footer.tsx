"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { SiteSettings } from "@/types/sanity";
import { resolveSocialLinks } from "./social-links";

interface FooterProps {
  settings?: SiteSettings | null;
}

const defaultLegalLinks = [
  { label: "Privacy Policy", url: "/privacy" },
  { label: "Terms of Service", url: "/terms" },
  { label: "Spa", url: "/spas" },
];

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#e8ede9] text-[#274f46] hover:bg-[#274f46] hover:text-white transition-all duration-300"
      aria-label={label}
    >
      {children}
    </Link>
  );
}

export function Footer({ settings }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const data = settings?.footer;
  const social = resolveSocialLinks(settings?.socialLinks);
  const logoSrc = settings?.logo?.url || "/kynta-logo-full.png";
  const logoAlt = settings?.logo?.alt || "Kynta Wellness Group";
  const brandDescription =
    data?.brandDescription ||
    "Old Indian healing in calm, modern spas. Made for top hotels and for anyone who wants to relax and feel better.";
  const certificationText =
    data?.certificationText || "Certified Ayurveda & Water Therapy Spas";
  const newsletterHeading = data?.newsletterHeading || "Our Newsletter";
  const newsletterDescription =
    data?.newsletterDescription ||
    "Get news about our spas, special offers and health tips.";
  const newsletterPlaceholder =
    data?.newsletterPlaceholder || "Your email address";
  const newsletterButtonLabel = data?.newsletterButtonLabel || "Subscribe";
  const legalLinks = data?.legalLinks?.length
    ? data.legalLinks
    : defaultLegalLinks;
  const copyright =
    data?.copyright ||
    "© 2025 Kynta Wellness Private Limited. All rights reserved.";

  return (
    <footer className="w-full bg-gradient-to-b from-[#f2f5f3] to-[#eff2f0] pt-16 pb-10 border-t border-[#e2e8e4]">
      <div className="container-site">
        {/* 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-12">
          {/* Column 1: Brand & Certification */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Link href="/">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <p className="text-[13px] leading-[1.7] text-[#55635d] max-w-[345px] mb-8">
              {brandDescription}
            </p>

            <div className="flex items-center gap-2.5 text-[11px] font-medium tracking-wide text-[#3d4d46]">
              <span className="w-2 h-2 rounded-full bg-[#274f46] flex-shrink-0" />
              <span>{certificationText}</span>
            </div>
          </div>

          {/* Column 2: Newsletter */}
          <div className="flex flex-col">
            <h4 className="text-[14px] font-bold tracking-[0.03em] text-[#1c2924] mb-3 uppercase">
              {newsletterHeading}
            </h4>
            <p className="text-[13px] leading-[1.6] text-[#55635d] max-w-[345px] mb-5">
              {newsletterDescription}
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 max-w-[360px]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterPlaceholder}
                required
                className="flex-1 w-full bg-white border border-[#d2dbd5] rounded-md px-4 py-2.5 text-[13px] text-[#2c3833] placeholder-[#8a9690] focus:outline-none focus:border-[#274f46] focus:ring-1 focus:ring-[#274f46]/20 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#274f46] hover:bg-[#0f3d39] text-white text-[12px] font-semibold tracking-wider uppercase rounded-md transition-colors duration-300 whitespace-nowrap"
              >
                {newsletterButtonLabel}
              </button>
            </form>
          </div>
        </div>

        {/* Elegant Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#d8e0db] to-transparent my-12" />

        {/* Bottom Section: Legal Links & Social */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Legal Links */}
          <div className="flex items-center gap-8 text-[11.5px]">
            {legalLinks.map((link, idx) => (
              <div key={link.url} className="flex items-center gap-8">
                <Link
                  href={link.url}
                  className="text-[#606d67] hover:text-[#274f46] font-medium transition-colors duration-300"
                >
                  {link.label}
                </Link>
                {idx < legalLinks.length - 1 && (
                  <span className="text-[#d8e0db]">·</span>
                )}
              </div>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <SocialIcon href={social.instagram} label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <title>Instagram</title>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </SocialIcon>

            <SocialIcon href={social.facebook} label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <title>Facebook</title>
                <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h1z" />
              </svg>
            </SocialIcon>

            <SocialIcon href={social.linkedin} label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <title>LinkedIn</title>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" fill="currentColor" />
              </svg>
            </SocialIcon>

            <SocialIcon href={social.whatsapp} label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-8 border-t border-[#e2e8e4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#606d67] tracking-wide">
            {copyright}
          </p>
          <p className="text-[11px] text-[#8a9690] tracking-wide">
            Designed, developed &amp; maintained by{" "}
            <span className="font-semibold text-[#274f46]">
              Nebuloid Tech Studio
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
