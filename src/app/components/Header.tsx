"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SanityImage } from "@/types/sanity";

interface HeaderProps {
  navigation?: {
    label: string;
    url: string;
    isButton?: boolean;
  }[];
  logo?: SanityImage;
}

const defaultNavLinks = [
  { label: "HOME", href: "/" },
  { label: "EXPERIENCES", href: "/experiences" },
  { label: "LOCATIONS", href: "/locations" },
  { label: "ABOUT", href: "/about" },
  { label: "FOR HOSPITALITY", href: "/for-hospitality" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

function isLinkActive(href: string, pathname: string): boolean {
  if (!pathname) return false;

  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/for-hospitality") {
    return (
      pathname === "/for-hospitality" ||
      pathname.startsWith("/for-hospitality/") ||
      pathname === "/hospitality" ||
      pathname.startsWith("/hospitality/")
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ navigation, logo }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks =
    navigation?.map((n) => ({ label: n.label, href: n.url })) ||
    defaultNavLinks;

  return (
    <header className="w-full bg-white border-b border-kynta-border">
      <div className="container-site flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {logo ? (
            <Image
              src={logo.asset._ref}
              alt={logo.alt || "Kynta Wellness Group"}
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <Image
              src="/kynta-logo.jpg"
              alt="Kynta Wellness Group"
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-wider font-medium transition-colors ${
                  active
                    ? "text-kynta-charcoal border-b-2 border-kynta-charcoal pb-0.5"
                    : "text-kynta-warm-gray hover:text-kynta-charcoal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/partner"
            className="px-5 py-2.5 text-xs font-medium tracking-wider text-kynta-charcoal border border-kynta-charcoal rounded-full hover:bg-kynta-charcoal hover:text-white transition-all duration-200"
          >
            Partner With Us
          </Link>
          <Link
            href="/book"
            className="px-5 py-2.5 text-xs font-medium tracking-wider text-white bg-kynta-teal-dark rounded-full hover:bg-kynta-teal transition-all duration-200"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 text-kynta-charcoal"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <title>{mobileMenuOpen ? "Close" : "Menu"}</title>
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-kynta-border bg-white px-6 py-4 space-y-3 animate-in fade-in duration-200">
          <nav
            className="flex flex-col space-y-3"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs tracking-wider font-medium transition-colors py-1 inline-block w-fit ${
                    active
                      ? "text-kynta-charcoal border-b-2 border-kynta-charcoal pb-0.5"
                      : "text-kynta-warm-gray hover:text-kynta-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-kynta-border/50">
            <Link
              href="/partner"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-xs text-center font-medium tracking-wider text-kynta-charcoal border border-kynta-charcoal rounded-full hover:bg-kynta-charcoal hover:text-white transition-all duration-200"
            >
              Partner With Us
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-xs text-center font-medium tracking-wider text-white bg-kynta-teal-dark rounded-full hover:bg-kynta-teal transition-all duration-200"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
