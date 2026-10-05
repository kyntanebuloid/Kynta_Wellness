import {
  type BlogPageContent,
  type BlogPostSummary,
  blogPageDefaults,
  blogPostMeta,
} from "@/content/blog";
import { imageAlt, imageUrl, list, text } from "@/content/types";
import { BlogArticleList, type BlogListItem } from "./BlogArticleList";

interface BlogInquiriesSectionProps {
  data?: BlogPageContent["inquiriesSection"];
  /** Blog Post documents from Sanity; when there are any they replace the articles above. */
  posts?: BlogPostSummary[];
}

export function BlogInquiriesSection({
  data,
  posts = [],
}: BlogInquiriesSectionProps) {
  const d = blogPageDefaults.inquiriesSection;
  const fallbackImage = d.articles[0].image;

  const items: BlogListItem[] =
    posts.length > 0
      ? posts.map((post) => ({
          key: post._id,
          title: post.title,
          href: `/blog/${post.slug}`,
          external: false,
          image: imageUrl(post.featuredImage, fallbackImage),
          imageAlt: imageAlt(post.featuredImage, { alt: post.title }),
          tag: post.category ?? "",
          meta: blogPostMeta(post),
          description: post.excerpt ?? "",
          ctaLabel: "READ ARTICLE",
        }))
      : list(data?.articles, d.articles).map((a, i) => {
          const fallback = d.articles[i % d.articles.length];
          // PDF first, then a link; nothing means no read link at all.
          const href = a.pdf?.url || a.url?.trim() || null;
          return {
            key: `${a.title}-${i}`,
            title: a.title,
            href,
            external: Boolean(href && !href.startsWith("/")),
            image: imageUrl(a.image, fallback.image),
            imageAlt: imageAlt(a.image, { alt: a.title }),
            tag: a.tag ?? "",
            meta: a.meta ?? "",
            description: a.description,
            ctaLabel: text(a.linkLabel, "READ MORE"),
          };
        });

  return (
    <section
      id="articles"
      className="w-full py-16 md:py-20 lg:py-24 overflow-hidden border-t border-kynta-border/30 scroll-mt-24"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <p className="section-label font-semibold text-kynta-rust tracking-wide mb-2">
              {text(data?.eyebrow, d.eyebrow)}
            </p>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal font-normal">
              {text(data?.heading, d.heading)}
            </h2>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-kynta-warm-gray sm:text-right pb-1">
              {text(data?.note, d.note)}
            </p>
          </div>
        </div>

        <BlogArticleList items={items} />
      </div>
    </section>
  );
}
