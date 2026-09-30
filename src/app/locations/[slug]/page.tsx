import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/app/components/Footer";
import { LocationDetailHero } from "@/app/components/LocationDetailHero";
import { SanctuaryCTASection } from "@/app/components/SanctuaryCTASection";
import {
  getAllLocationSlugs,
  getLocationBySlug,
  getLocationsPage,
  getSiteSettings,
} from "@/lib/sanity/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found | Kynta Wellness Group",
    };
  }

  return {
    title: `${location.name} | Kynta Wellness Group`,
    description: location.description,
  };
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [location, siteSettings, locationsPage] = await Promise.all([
    getLocationBySlug(slug),
    getSiteSettings(),
    getLocationsPage(),
  ]);

  if (!location) {
    notFound();
  }

  return (
    <>
      <main>
        <LocationDetailHero location={location} />
        <SanctuaryCTASection data={locationsPage?.ctaSection} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
