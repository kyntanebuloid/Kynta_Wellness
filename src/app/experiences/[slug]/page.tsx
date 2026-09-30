import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExperienceDetailHero } from "@/app/components/ExperienceDetailHero";
import { Footer } from "@/app/components/Footer";
import {
  getAllExperienceSlugs,
  getExperienceBySlug,
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
  const [experience, siteSettings] = await Promise.all([
    getExperienceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!experience) {
    notFound();
  }

  return (
    <>
      <main>
        <ExperienceDetailHero experience={experience} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
