import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
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

// Digits (and % +) only: listed before Playfair in --font-serif so numbers in
// serif headings and stats use these even, structured figures. No fallback
// face: a fallback without the unicode-range would take over every letter.
const digits = localFont({
  src: "../fonts/geist-latin-wght.woff2",
  variable: "--font-digits",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
  declarations: [
    { prop: "unicode-range", value: "U+0030-0039, U+0025, U+002B" },
  ],
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
      className={`${geistSans.variable} ${digits.variable} ${playfairDisplay.variable} h-full antialiased thin-scrollbar`}
    >
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MPB5FD6T');`,
        }}
      />
      <body className="min-h-full flex flex-col font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MPB5FD6T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
