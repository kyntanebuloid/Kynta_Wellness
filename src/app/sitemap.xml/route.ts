import { sanityNoCdnClient } from "@/lib/sanity/client";

const DOMAIN = "https://kyntawellness.com";

const staticPages = [
  { url: "/", priority: 1.0, changefreq: "weekly" },
  { url: "/about", priority: 0.9, changefreq: "monthly" },
  { url: "/experiences", priority: 0.9, changefreq: "weekly" },
  { url: "/locations", priority: 0.9, changefreq: "monthly" },
  { url: "/blog", priority: 0.8, changefreq: "weekly" },
  { url: "/book", priority: 0.9, changefreq: "weekly" },
  { url: "/contact", priority: 0.7, changefreq: "monthly" },
  { url: "/for-hospitality", priority: 0.7, changefreq: "monthly" },
  { url: "/partner", priority: 0.7, changefreq: "monthly" },
];

async function getBlogPostSlugs() {
  const query = `*[_type == "blogPost"]{ slug, _updatedAt }`;
  const client = sanityNoCdnClient();
  return client.fetch(query);
}

async function getExperienceSlugs() {
  const query = `*[_type == "experience"]{ slug, _updatedAt }`;
  const client = sanityNoCdnClient();
  return client.fetch(query);
}

async function getLocationSlugs() {
  const query = `*[_type == "location"]{ slug, _updatedAt }`;
  const client = sanityNoCdnClient();
  return client.fetch(query);
}

function generateSiteMap(urls: Array<{ url: string; lastmod?: string; priority?: number; changefreq?: string }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(({ url, lastmod, priority, changefreq }) => {
      return `  <url>
    <loc>${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    ${priority ? `<priority>${priority}</priority>` : ""}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
  </url>`;
    })
    .join("\n")}
</urlset>`;
}

export async function GET() {
  try {
    const [blogPosts, experiences, locations] = await Promise.all([
      getBlogPostSlugs(),
      getExperienceSlugs(),
      getLocationSlugs(),
    ]);

    const urls = [
      ...staticPages.map((page) => ({
        url: `${DOMAIN}${page.url}`,
        priority: page.priority,
        changefreq: page.changefreq,
      })),
      ...blogPosts.map((post: { slug: { current: string }; _updatedAt: string }) => ({
        url: `${DOMAIN}/blog/${post.slug.current}`,
        lastmod: post._updatedAt?.split("T")[0],
        priority: 0.8,
        changefreq: "monthly",
      })),
      ...experiences.map((exp: { slug: { current: string }; _updatedAt: string }) => ({
        url: `${DOMAIN}/experiences/${exp.slug.current}`,
        lastmod: exp._updatedAt?.split("T")[0],
        priority: 0.8,
        changefreq: "monthly",
      })),
      ...locations.map((loc: { slug: { current: string }; _updatedAt: string }) => ({
        url: `${DOMAIN}/locations/${loc.slug.current}`,
        lastmod: loc._updatedAt?.split("T")[0],
        priority: 0.8,
        changefreq: "monthly",
      })),
    ];

    const sitemap = generateSiteMap(urls);

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Failed to generate sitemap", { status: 500 });
  }
}
