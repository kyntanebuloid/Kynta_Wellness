import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/data";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TopBar } from "../components/TopBar";
import { ReservationSection } from "../components/ReservationSection";

export const metadata: Metadata = {
    title: "Book Your Sanctuary Retreat | Kynta Wellness Group",
    description:
    "Reserve your transformative wellness retreat at Kynta Wellness sanctuaries. Select your destination, experiences, and dates to begin your healing journey."
};

export default async function BookPage(){
    const siteSettings = await getSiteSettings();

    return(
        <>
            <TopBar settings={siteSettings} />
            <Header settings={siteSettings} />
            <main>
                <ReservationSection/>
            </main>
            <Footer settings={siteSettings} />
        </>
    )
}