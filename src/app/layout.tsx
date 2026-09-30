import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { NavigationProgress } from "./components/NavigationProgress";
import { SanityLiveRefresh } from "./components/SanityLiveRefresh";
import { ScrollEffects } from "./components/ScrollEffects";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfairDisplay.variable} h-full antialiased thin-scrollbar`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ScrollEffects />
        <NavigationProgress />
        {children}
        <SanityLiveRefresh />
      </body>
    </html>
  );
}
