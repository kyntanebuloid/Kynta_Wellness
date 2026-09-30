"use client";

import { usePathname } from "next/navigation";

const NO_CHROME = /^\/(studio|admin)(\/|$)/;

/**
 * The top bar and navbar, shared by every page from the root layout so they
 * stay mounted across page changes (and can animate between states). Hidden
 * on the Studio and admin screens.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return NO_CHROME.test(pathname) ? null : children;
}
