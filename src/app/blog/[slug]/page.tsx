import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticle } from "@/app/components/BlogArticle";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { TopBar } from "@/app/components/TopBar";
import { getBlogPost, getBlogPosts, getSiteSettings } from "@/lib/sanity/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Posts added later in Sanity are rendered on their first visit.
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Article Not Found | Kynta Wellness Group" };
  }

  const description = post.seo?.description || post.excerpt || undefined;
  const image = post.featuredImage?.url;
  return {
    title: post.seo?.title || `${post.title} | Kynta Wellness Group`,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, posts, siteSettings] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
    getSiteSettings(),
  ]);

  if (!post) {
    notFound();
  }

  // The next posts in blog order, wrapping round to the start.
  const index = posts.findIndex((p) => p.slug === post.slug);
  const others =
    index === -1
      ? posts
      : [...posts.slice(index + 1), ...posts.slice(0, index)];

  return (
    <>
      <TopBar settings={siteSettings} />
      <Header settings={siteSettings} />
      <main>
        <BlogArticle post={post} morePosts={others.slice(0, 3)} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
