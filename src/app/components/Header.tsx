"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteSettings } from "@/types/sanity";
import { Logo } from "./Logo";
import { NAVIGATION_EVENT } from "./NavigationProgress";

interface HeaderProps {
  settings?: SiteSettings | null;
}

const defaultNavLinks = [
  { label: "HOME", href: "/" },
  { label: "EXPERIENCES", href: "/experiences" },
  { label: "LOCATIONS", href: "/locations" },
  { label: "ABOUT", href: "/about" },
  { label: "FOR HOTELS", href: "/for-hospitality" },
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

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The header stays mounted across pages (root layout), so close the phone
  // menu whenever the page changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on each navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Turn solid as soon as a link is clicked, so the page change (and the
  // loading bar) happens on the white navbar rather than over the hero blur.
  const [navigating, setNavigating] = useState(false);
  useEffect(() => {
    const onNavigation = (event: Event) =>
      setNavigating((event as CustomEvent<boolean>).detail);
    window.addEventListener(NAVIGATION_EVENT, onNavigation);
    return () => window.removeEventListener(NAVIGATION_EVENT, onNavigation);
  }, []);

  // Only the homepage has a hero image behind the header; elsewhere white text would vanish.
  const solid = scrolled || mobileMenuOpen || navigating || pathname !== "/";

  const navLinks = settings?.navigation?.length
    ? settings.navigation.map((n) => ({ label: n.label, href: n.url }))
    : defaultNavLinks;
  const buttonLabel = settings?.headerButton?.label || "BOOK NOW";
  const buttonUrl = settings?.headerButton?.url || "/book";

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-[background-color,box-shadow,border-color] duration-500 ${
        solid
          ? "bg-white border-kynta-border shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Blur that melts into the content below instead of ending in a hard edge */}
      <div
        aria-hidden="true"
        className={`header-glass pointer-events-none absolute inset-x-0 top-0 h-[120px] backdrop-blur-lg transition-[opacity,visibility] duration-500 ${
          solid ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,30,28,0.35) 0%, rgba(12,30,28,0.22) 45%, rgba(12,30,28,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 100%)",
        }}
      />
      <div className="relative container-site flex items-center justify-between h-[72px]">
        {/* Logo */}
        <div
          className={`transition-[filter] duration-500 ${
            solid ? "brightness-100 invert-0" : "brightness-0 invert"
          }`}
        >
          <Logo
            href="/"
            src={settings?.logo?.url ?? undefined}
            alt={settings?.logo?.alt ?? undefined}
          />
        </div>

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
                className={`text-xs tracking-wider font-medium transition-colors duration-500 ${
                  solid
                    ? active
                      ? "text-kynta-charcoal border-b-2 border-kynta-charcoal pb-0.5"
                      : "text-kynta-warm-gray hover:text-kynta-charcoal"
                    : active
                      ? "text-white border-b-2 border-white pb-0.5"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
        <Link
          href={buttonUrl}
          className="hidden md:inline-flex px-5 py-2.5 text-xs font-medium tracking-wider text-white bg-kynta-teal-dark rounded-full hover:bg-kynta-teal transition-all duration-200 whitespace-nowrap"
        >
          {buttonLabel}
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          className={`lg:hidden -mr-2 p-2 transition-colors duration-500 ${
            solid ? "text-kynta-charcoal" : "text-white"
          }`}
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
      </div>

      {/* Mobile dropdown overlays the page instead of pushing sections down */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto thin-scrollbar border-t border-kynta-border bg-white px-6 py-4 space-y-3 shadow-[0_12px_24px_rgba(0,0,0,0.08)]">
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
              href={buttonUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-xs text-center font-medium tracking-wider text-white bg-kynta-teal-dark rounded-full hover:bg-kynta-teal transition-all duration-200"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
