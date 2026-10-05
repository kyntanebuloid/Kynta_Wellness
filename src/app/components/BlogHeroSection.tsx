"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  type BlogCategory,
  type BlogPageContent,
  blogPageDefaults,
} from "@/content/blog";
import { imageAlt, imageUrl, list, text } from "@/content/types";

function initials(name: string): string {
  return name
    .replace(/^(dr|mr|mrs|ms).?s+/i, "")
    .split(/s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Internal pages open in place; PDFs and other sites in a new tab. */
function HeroLink({
  href,
  className,
  style,
  label,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  children?: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} style={style} aria-label={label}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      aria-label={label}
    >
      {children}
    </a>
  );
}

interface BlogHeroSectionProps {
  data?: BlogPageContent["hero"];
}

export function BlogHeroSection({ data }: BlogHeroSectionProps) {
  const d = blogPageDefaults.hero;
  const [activeIndex, setActiveIndex] = useState(0);

  // Older Sanity content stored categories as plain names; treat those as a
  // label with the built-in article for that position.
  const stored = (
    data?.categories as (BlogCategory | string)[] | undefined
  )?.map((c, i) =>
    typeof c === "string"
      ? { ...d.categories[i % d.categories.length], label: c }
      : c,
  );
  const categories = list(stored, d.categories).map((c, i) => {
    const fallback = d.categories[i % d.categories.length];
    // A picked Blog Post fills the card and is what it opens.
    const post = c.post;
    const authorName = post?.author || c.authorName || "";
    const title = post?.title || c.title || c.label;
    return {
      label: c.label,
      image: post?.featuredImage?.url || imageUrl(c.image, fallback.image),
      imageAlt:
        post?.featuredImage?.alt ||
        (post ? post.title : imageAlt(c.image, { alt: title })),
      badge: c.badge ?? "",
      meta: [
        post?.category || c.category,
        c.issue,
        post?.readTime || c.readTime,
      ]
        .filter(Boolean)
        .join("  •  "),
      title,
      description: post?.excerpt || c.description || "",
      author: {
        initials: post?.author
          ? initials(post.author)
          : (c.authorInitials ?? ""),
        name: authorName,
        role: post ? (post.authorRole ?? "") : (c.authorRole ?? ""),
      },
      // Picked post first, then a PDF, then a link; none means no read link.
      href: post ? `/blog/${post.slug}` : c.pdf?.url || c.url?.trim() || null,
      linkLabel: text(c.linkLabel, "READ ARTICLE"),
    };
  });
  const article = categories[Math.min(activeIndex, categories.length - 1)];

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee9df] border border-kynta-border/50 mb-6">
          <span
            className="w-1.5 h-1.5 rounded-full bg-kynta-rust flex-shrink-0"
            aria-hidden="true"
          />
          <span className="section-label text-kynta-rust">
            {text(data?.eyebrow, d.eyebrow)}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-kynta-charcoal font-normal mb-5 max-w-2xl">
          {text(data?.heading, d.heading)}
        </h1>

        <p className="text-base sm:text-lg text-kynta-warm-gray leading-relaxed max-w-xl mb-8 md:mb-10">
          {text(data?.subheading, d.subheading)}
        </p>

        <div
          className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 md:mb-12"
          role="tablist"
          aria-label="Blog categories"
        >
          {categories.map((category, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${category.label}-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(index)}
                className={`text-[9.5px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase px-3.5 py-2 rounded-[6px] transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-[#eee9df] text-kynta-charcoal/80 hover:bg-[#e4ded3]"
                }`}
                style={isActive ? { backgroundColor: "#004349" } : undefined}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div
          className="bg-white rounded-[18px] sm:rounded-[20px] overflow-hidden border border-kynta-border/40 shadow-[0_8px_30px_rgba(0,0,0,0.035)] grid grid-cols-1 lg:grid-cols-12"
          role="tabpanel"
        >
          <div className="lg:col-span-7 relative w-full h-[280px] sm:h-[340px] lg:h-auto min-h-[320px] lg:min-h-[420px] overflow-hidden bg-[#ebe8e1]">
            {/* All photos are stacked so switching crossfades instead of flashing. */}
            {categories.map((category, index) => (
              <Image
                key={`${category.image}-${index}`}
                src={category.image}
                alt={index === activeIndex ? category.imageAlt : ""}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={index === 0}
                className={`object-cover transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {article.href && (
              <HeroLink
                href={article.href}
                label={article.title}
                className="absolute inset-0 z-[5]"
              />
            )}

            {article.badge && (
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-[6px] px-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-white/80">
                <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.14em] uppercase text-kynta-rust">
                  {article.badge}
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
            <div>
              {article.meta && (
                <p className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-kynta-rust mb-3 whitespace-pre-wrap">
                  {article.meta}
                </p>
              )}

              <h2 className="font-serif text-[21px] sm:text-[23px] md:text-[25px] lg:text-[27px] leading-[1.22] font-normal text-kynta-charcoal mb-3.5">
                {article.href ? (
                  <HeroLink
                    href={article.href}
                    className="hover:text-kynta-teal-dark transition-colors"
                  >
                    {article.title}
                  </HeroLink>
                ) : (
                  article.title
                )}
              </h2>

              <p className="text-[11.5px] sm:text-[12px] leading-[1.65] text-kynta-warm-gray mb-8">
                {article.description}
              </p>
            </div>

            <div className="pt-4 border-t border-kynta-border/30 flex items-center justify-between gap-4 mt-auto">
              <div className="flex items-center gap-3">
                {article.author.initials && (
                  <div
                    className="w-9 h-9 rounded-[6px] text-white flex items-center justify-center font-serif text-[12px] font-medium flex-shrink-0"
                    style={{ backgroundColor: "#004349" }}
                  >
                    {article.author.initials}
                  </div>
                )}
                <div>
                  <p className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.06em] uppercase text-kynta-charcoal leading-tight">
                    {article.author.name}
                  </p>
                  <p className="text-[9.5px] sm:text-[10px] text-kynta-warm-gray leading-tight mt-0.5">
                    {article.author.role}
                  </p>
                </div>
              </div>

              {article.href && (
                <HeroLink
                  href={article.href}
                  className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors flex items-center gap-1.5 flex-shrink-0 group"
                  style={{ color: "var(--kynta-teal-dark)" }}
                >
                  <span>{article.linkLabel}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </HeroLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
