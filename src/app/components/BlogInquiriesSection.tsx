import Image from "next/image";

import { type BlogPageContent, blogPageDefaults } from "@/content/blog";
import { imageAlt, imageUrl, list, text } from "@/content/types";

interface BlogInquiriesSectionProps {
  data?: BlogPageContent["inquiriesSection"];
}

export function BlogInquiriesSection({ data }: BlogInquiriesSectionProps) {
  const d = blogPageDefaults.inquiriesSection;
  const articles = list(data?.articles, d.articles).map((a, i) => {
    const fallback = d.articles[i % d.articles.length];
    return {
      categoryPill: a.tag ?? "",
      metadata: a.meta ?? "",
      title: a.title,
      description: a.description,
      ctaLabel: text(a.linkLabel, "READ MORE"),
      // PDF first, then a link; nothing means no read link at all.
      ctaHref: a.pdf?.url || a.url?.trim() || null,
      image: imageUrl(a.image, fallback.image),
      imageAlt: imageAlt(a.image, { alt: a.title }),
    };
  });

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24 overflow-hidden border-t border-kynta-border/30"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-2">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {articles.map((article, index) => (
            <article
              key={`${article.title}-${index}`}
              className="bg-white rounded-[16px] overflow-hidden border border-kynta-border/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group"
            >
              <div>
                <div className="relative w-full aspect-[270/169] overflow-hidden bg-[#ebe8e1]">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-md rounded-[5px] px-2.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-white/80">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-kynta-rust">
                      {article.categoryPill}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pb-4">
                  <p className="text-xs font-semibold tracking-wider uppercase text-kynta-rust mb-2.5">
                    {article.metadata}
                  </p>

                  <h3 className="font-serif text-xl leading-snug font-normal text-kynta-charcoal mb-3">
                    {article.ctaHref ? (
                      <a
                        href={article.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-kynta-teal-dark transition-colors"
                      >
                        {article.title}
                      </a>
                    ) : (
                      article.title
                    )}
                  </h3>

                  <p className="text-[13px] leading-[1.7] text-kynta-warm-gray">
                    {article.description}
                  </p>
                </div>
              </div>

              {article.ctaHref && (
                <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 mt-auto">
                  <a
                    href={article.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1.5 group-hover:text-kynta-teal text-kynta-teal-dark"
                  >
                    <span>{article.ctaLabel}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
