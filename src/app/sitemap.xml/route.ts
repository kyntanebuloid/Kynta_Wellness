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

function generateSiteMap(urls: Array<{ url: string; priority?: number; changefreq?: string }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(({ url, priority, changefreq }) => {
      return `  <url>
    <loc>${url}</loc>
    ${priority ? `<priority>${priority}</priority>` : ""}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
  </url>`;
    })
    .join("\n")}
</urlset>`;
}

export async function GET() {
  try {
    const urls = staticPages.map((page) => ({
      url: `${DOMAIN}${page.url}`,
      priority: page.priority,
      changefreq: page.changefreq,
    }));

    const sitemap = generateSiteMap(urls);

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Failed to generate sitemap", { status: 500 });
  }
}
