import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { getSiteSettings } from "@/lib/sanity/data";
import { Header } from "./components/Header";
import { NavigationProgress } from "./components/NavigationProgress";
import { SanityLiveRefresh } from "./components/SanityLiveRefresh";
import { ScrollEffects } from "./components/ScrollEffects";
import { SiteChrome } from "./components/SiteChrome";
import { TopBar } from "./components/TopBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kynta Wellness Group | Premium Spa & Wellness Hospitality",
  description:
    "Premium restorative sanctuaries and turnkey spa operations crafted exclusively for India's most exceptional hotels, heritage palaces, and boutique wilderness retreats.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const siteSettings = await getSiteSettings();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfairDisplay.variable} h-full antialiased thin-scrollbar`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ScrollEffects />
        <NavigationProgress />
        {/* Shared by every page, so the navbar stays put between pages */}
        <SiteChrome>
          <TopBar settings={siteSettings} />
          <Header settings={siteSettings} />
        </SiteChrome>
        {children}
        <SanityLiveRefresh />
      </body>
    </html>
  );
}
