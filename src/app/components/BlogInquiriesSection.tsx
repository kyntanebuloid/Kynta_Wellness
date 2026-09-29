import Image from "next/image";
import Link from "next/link";

export interface InquiryArticle {
  id: string;
  categoryPill: string;
  metadata: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

export const inquiryArticles: InquiryArticle[] = [
  {
    id: "acoustic-silence",
    categoryPill: "ARCHITECTURE",
    metadata: "SANCTUARY ARCHITECTURE • 6 MIN READ",
    title:
      "Acoustic Silence and Sub-24dB Spatial Attenuation in Luxury Sanctuaries",
    description:
      "How porous limestone, stepped courtyards, and subterranean water circuits recalibrate autonomic nervous system reactivity.",
    ctaLabel: "READ ARCHITECTURE NOTE",
    ctaHref: "/blog/acoustic-silence-spatial-attenuation",
    image: "/inquiry-architecture.jpg",
    imageAlt:
      "Serene stepped courtyard pool garden with stone walkway and pergola",
  },
  {
    id: "circadian-chronobiology",
    categoryPill: "AYURVEDIC SCIENCE",
    metadata: "AYURVEDIC SCIENCE • 7 MIN READ",
    title: "Circadian Chronobiology & The Art of the Evening Abhyanga",
    description:
      "Aligning therapeutic pressure sequences with pituitary gland melatonin cycles for deep regenerative sleep.",
    ctaLabel: "READ CLINICAL INSIGHT",
    ctaHref: "/blog/circadian-chronobiology-evening-abhyanga",
    image: "/inquiry-ayurveda.jpg",
    imageAlt:
      "Traditional warm bronze oil vessel with red linen cloth and rolled towels",
  },
  {
    id: "thermal-transitions",
    categoryPill: "HYDROTHERAPY",
    metadata: "HYDROTHERMAL THERAPY • 5 MIN READ",
    title: "Thermal Transitions: The Physiological Protocol of Salt Grottos",
    description:
      "Balancing hot vapor rooms with cold mineral plunge immersion to stimulate lymphatic vascular flushing.",
    ctaLabel: "READ FIELD REPORT",
    ctaHref: "/blog/thermal-transitions-salt-grottos",
    image: "/inquiry-hydrotherapy.jpg",
    imageAlt:
      "Calm stone thermal hydro plunge pool with waterfall and loungers",
  },
];

interface BlogInquiriesSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    articles?: {
      title: string;
      excerpt: string;
      category?: string;
      readTime?: string;
      author?: string;
      image?: { asset?: { _ref: string }; alt?: string };
    }[];
  };
}

export function BlogInquiriesSection({ data }: BlogInquiriesSectionProps) {
  const articles = data?.articles
    ? data.articles.map((a, i) => ({
        id: String(i),
        categoryPill: a.category || inquiryArticles[i]?.categoryPill || "",
        metadata: `${a.category || ""} • ${a.readTime || ""}`,
        title: a.title,
        description: a.excerpt,
        ctaLabel: "READ MORE",
        ctaHref: `/blog/${a.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")}`,
        image: a.image?.asset?._ref
          ? `/inquiry-${i}.jpg`
          : inquiryArticles[i]?.image || "",
        imageAlt: a.image?.alt || inquiryArticles[i]?.imageAlt || "",
      }))
    : inquiryArticles;

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24 overflow-hidden border-t border-kynta-border/30"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-2">
              {data?.eyebrow || "PEER-REVIEWED FIELDWORK"}
            </p>
            <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal font-normal">
              {data?.heading || "Recent Inquiries &amp; Protocols"}
            </h2>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-kynta-warm-gray sm:text-right pb-1">
              {data?.description || "REFLECTING 2024–2025 SANCTUARY TRIALS"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {articles.map((article) => (
            <article
              key={article.id}
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
                    <Link
                      href={article.ctaHref}
                      className="hover:text-kynta-teal-dark transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-[13px] leading-[1.7] text-kynta-warm-gray">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 mt-auto">
                <Link
                  href={article.ctaHref}
                  className="text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1.5 group-hover:text-kynta-teal text-kynta-teal-dark"
                >
                  <span>{article.ctaLabel}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
