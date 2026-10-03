import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExperienceDetailHero } from "@/app/components/ExperienceDetailHero";
import { ExperienceTreatmentList } from "@/app/components/ExperienceTreatmentList";
import { Footer } from "@/app/components/Footer";
import { gstPercentOrDefault } from "@/lib/booking/menu";
import {
  getAllExperienceSlugs,
  getExperienceBySlug,
  getLocationsPage,
  getSiteSettings,
} from "@/lib/sanity/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllExperienceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    return {
      title: "Experience Not Found | Kynta Wellness Group",
    };
  }

  return {
    title:
      experience.seo?.title || `${experience.title} | Kynta Wellness Group`,
    description: experience.seo?.description || experience.description,
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [experience, siteSettings, locationsPage] = await Promise.all([
    getExperienceBySlug(slug),
    getSiteSettings(),
    getLocationsPage(),
  ]);

  // Lowest price for each treatment name across every spa menu.
  const fromPrices = new Map<string, number>();
  for (const location of locationsPage?.locations ?? []) {
    for (const item of location.menu ?? []) {
      const name = item.name?.trim().toLowerCase();
      for (const option of item.options ?? []) {
        if (!name || !(option.price > 0)) continue;
        fromPrices.set(
          name,
          Math.min(fromPrices.get(name) ?? Infinity, option.price),
        );
      }
    }
  }

  if (!experience) {
    notFound();
  }

  return (
    <>
      <main>
        <ExperienceDetailHero experience={experience} />
        <ExperienceTreatmentList
          treatments={experience.treatments ?? []}
          fromPrices={fromPrices}
          gstPercent={gstPercentOrDefault(locationsPage?.gstPercent)}
        />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
