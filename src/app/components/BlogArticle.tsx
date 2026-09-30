import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";

import {
  type BlogBodyImage,
  type BlogPostDetail,
  type BlogPostSummary,
  blogPostMeta,
  formatPostDate,
} from "@/content/blog";
import { BlogArticleList, type BlogListItem } from "./BlogArticleList";

function initials(name: string): string {
  return name
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[16px] md:text-[17px] leading-[1.85] text-kynta-charcoal/85 mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-[26px] md:text-[30px] leading-[1.25] text-kynta-charcoal mt-12 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-[21px] md:text-[23px] leading-[1.3] text-kynta-charcoal mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-kynta-rust mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-kynta-rust pl-6 font-serif text-[21px] md:text-[24px] italic leading-[1.5] text-kynta-charcoal">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-5 list-disc space-y-2 text-[16px] md:text-[17px] leading-[1.8] text-kynta-charcoal/85 marker:text-kynta-rust">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2 text-[16px] md:text-[17px] leading-[1.8] text-kynta-charcoal/85 marker:text-kynta-rust">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-kynta-teal-dark underline decoration-kynta-teal/40 underline-offset-4 hover:decoration-kynta-teal"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    contentImage: ({ value }: { value: BlogBodyImage }) =>
      value.url ? (
        <figure className="my-10">
          <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[14px] bg-[#ebe8e1]">
            <Image
              src={value.url}
              alt={value.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-[13px] text-kynta-warm-gray">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
};

interface BlogArticleProps {
  post: BlogPostDetail;
  morePosts: BlogPostSummary[];
}

export function BlogArticle({ post, morePosts }: BlogArticleProps) {
  const meta = [post.category, post.readTime].filter(Boolean).join(" · ");
  const date = formatPostDate(post.publishedAt);
  const cover = post.featuredImage?.url;
  const pdfUrl = post.pdf?.url;

  const more: BlogListItem[] = morePosts.map((p) => ({
    key: p._id,
    title: p.title,
    href: `/blog/${p.slug}`,
    external: false,
    image: p.featuredImage?.url || "/blog-featured-kashayam.jpg",
    imageAlt: p.featuredImage?.alt || p.title,
    tag: p.category ?? "",
    meta: blogPostMeta(p),
    description: p.excerpt ?? "",
    ctaLabel: "READ ARTICLE",
  }));

  return (
    <>
      <article className="w-full bg-[#f7faf8] pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="container-site">
          <header className="mx-auto max-w-3xl">
            <Link
              href="/blog#articles"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-kynta-warm-gray hover:text-kynta-charcoal transition-colors"
            >
              <span aria-hidden="true">←</span> All articles
            </Link>

            {meta && (
              <p className="mt-8 text-xs font-semibold tracking-[0.14em] uppercase text-kynta-rust">
                {meta}
              </p>
            )}
            <h1 className="mt-4 font-serif text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.12] text-kynta-charcoal font-normal">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 text-[17px] md:text-[19px] leading-[1.7] text-kynta-warm-gray">
                {post.excerpt}
              </p>
            )}

            {(post.author || date) && (
              <div className="mt-8 flex items-center gap-4 border-t border-kynta-border/50 pt-6">
                {post.author && (
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-kynta-charcoal text-[13px] font-semibold tracking-wider text-white"
                  >
                    {initials(post.author)}
                  </span>
                )}
                <div className="text-[13px] leading-snug">
                  {post.author && (
                    <p className="font-semibold uppercase tracking-wider text-kynta-charcoal">
                      {post.author}
                    </p>
                  )}
                  <p className="text-kynta-warm-gray">
                    {[post.authorRole, date].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            )}
          </header>

          {cover && (
            <div className="relative mx-auto mt-10 md:mt-14 w-full max-w-5xl aspect-[16/10] md:aspect-[16/8] overflow-hidden rounded-[16px] bg-[#ebe8e1]">
              <Image
                src={cover}
                alt={post.featuredImage?.alt || post.title}
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          <div className="mx-auto mt-12 md:mt-16 max-w-[68ch]">
            {post.content && post.content.length > 0 ? (
              <PortableText value={post.content} components={bodyComponents} />
            ) : null}

            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-kynta-charcoal px-6 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-white hover:bg-kynta-teal-dark transition-colors"
              >
                {post.pdfLabel?.trim() || "DOWNLOAD PDF"}
                <span aria-hidden="true">↓</span>
              </a>
            )}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="w-full border-t border-kynta-border/30 bg-white py-16 md:py-20">
          <div className="container-site">
            <h2 className="mb-8 md:mb-10 font-serif text-3xl lg:text-[34px] leading-[1.2] text-kynta-charcoal font-normal">
              More from the journal
            </h2>
            <BlogArticleList items={more} />
          </div>
        </section>
      )}
    </>
  );
}
