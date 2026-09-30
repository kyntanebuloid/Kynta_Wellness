"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface BlogListItem {
  key: string;
  title: string;
  /** Where the article opens; null means there is nothing to open yet. */
  href: string | null;
  /** External links and PDFs open in a new tab. */
  external: boolean;
  image: string;
  imageAlt: string;
  tag: string;
  meta: string;
  description: string;
  ctaLabel: string;
}

function ArticleLink({
  item,
  className,
  children,
}: {
  item: BlogListItem & { href: string };
  className: string;
  children: React.ReactNode;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  );
}

function hasHref(item: BlogListItem): item is BlogListItem & { href: string } {
  return item.href !== null;
}

function Arrow() {
  return (
    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
      →
    </span>
  );
}

function DesktopCard({ item }: { item: BlogListItem }) {
  const body = (
    <>
      <div>
        <div className="relative w-full aspect-[270/169] overflow-hidden bg-[#ebe8e1]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 1280px) 33vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {item.tag && (
            <div className="absolute top-3.5 left-3.5 z-10 bg-white/95 rounded-[5px] px-2.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-white/80">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-kynta-rust">
                {item.tag}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-7 pb-4">
          {item.meta && (
            <p className="text-xs font-semibold tracking-wider uppercase text-kynta-rust mb-2.5">
              {item.meta}
            </p>
          )}
          <h3 className="font-serif text-xl leading-snug font-normal text-kynta-charcoal mb-3 transition-colors group-hover:text-kynta-teal-dark">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-[13px] leading-[1.7] text-kynta-warm-gray">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {item.href && (
        <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 mt-auto">
          <span className="text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1.5 group-hover:text-kynta-teal text-kynta-teal-dark">
            <span>{item.ctaLabel}</span>
            <Arrow />
          </span>
        </div>
      )}
    </>
  );

  const cardClass =
    "bg-white rounded-[16px] overflow-hidden border border-kynta-border/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group";

  return hasHref(item) ? (
    <ArticleLink item={item} className={cardClass}>
      {body}
    </ArticleLink>
  ) : (
    <article className={cardClass}>{body}</article>
  );
}

// Phones show titles only. Tapping a title drops its image down, and tapping
// the image opens the article.
function MobileList({ items }: { items: BlogListItem[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  // Images load on first open, then stay mounted so closing can animate.
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());

  const toggle = (key: string) => {
    setOpenKey((current) => (current === key ? null : key));
    setLoaded((current) => {
      if (current.has(key)) return current;
      const next = new Set(current);
      next.add(key);
      return next;
    });
  };

  return (
    <ul className="md:hidden border-t border-kynta-border/50">
      {items.map((item) => {
        const open = openKey === item.key;
        const panelId = `blog-item-${item.key}`;
        const picture = loaded.has(item.key) && (
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[12px] bg-[#ebe8e1]">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            {item.href && (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-3.5 pt-10 text-white">
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {item.ctaLabel}
                </span>
                <span aria-hidden="true">→</span>
              </div>
            )}
          </div>
        );

        return (
          <li key={item.key} className="border-b border-kynta-border/50">
            <button
              type="button"
              onClick={() => toggle(item.key)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
            >
              <span>
                {item.tag && (
                  <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-kynta-rust mb-1.5">
                    {item.tag}
                  </span>
                )}
                <span className="block font-serif text-[19px] leading-snug text-kynta-charcoal">
                  {item.title}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-kynta-border text-kynta-charcoal transition-transform duration-300 ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>

            <div
              id={panelId}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="pb-5">
                  {hasHref(item) ? (
                    <ArticleLink item={item} className="block">
                      {picture}
                    </ArticleLink>
                  ) : (
                    picture
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function BlogArticleList({ items }: { items: BlogListItem[] }) {
  return (
    <>
      <MobileList items={items} />
      <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {items.map((item) => (
          <DesktopCard key={item.key} item={item} />
        ))}
      </div>
    </>
  );
}
