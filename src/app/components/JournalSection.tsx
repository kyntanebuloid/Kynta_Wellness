import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "@/types/sanity";

interface JournalSectionProps {
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
      image?: SanityImage;
    }[];
  };
}

const defaultArticles = [
  {
    image: "/article-herbal-compress.jpg",
    category: "Therapeutic Science",
    meta: "6 Min Read • Ayurvedic Biochemistry",
    title: "The Science of Warm Herbal Compresses in High-Stress Recovery",
    description:
      "How thermotherapy combined with lipid-soluble terpene botanicals penetrates deep myofascial barriers to regulate cortisol spikes.",
    href: "/blog/herbal-compresses",
  },
  {
    image: "/article-spa-design.jpg",
    category: "Design & Space",
    meta: "8 Min Read • Spatial Architecture",
    title:
      "Designing Spa Sanctuaries: The Convergence of Biophilia and Ayurveda",
    description:
      "An inquiry into how tactile raw stone, micro-acoustics, and natural light rhythms induce involuntary parasympathetic downregulation.",
    href: "/blog/spa-sanctuaries",
  },
  {
    image: "/article-revpash.jpg",
    category: "Hospitality Economics",
    meta: "5 Min Read • Hotel Asset Management",
    title: "Optimizing Hotel RevPASH Through Integrated Wellness Programming",
    description:
      "Why luxury resort developers are transforming passive spa square footage into high-yield restorative hubs that augment overall property\u2026",
    href: "/blog/revpash-optimization",
  },
];

function ArticleCard({
  image,
  category,
  meta,
  title,
  description,
  href,
}: {
  image: string;
  category: string;
  meta: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col bg-white rounded-[5px] overflow-hidden border border-kynta-border/40">
      <div className="relative w-full h-[200px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide text-white bg-kynta-teal-dark/85 backdrop-blur-sm px-3 py-1 rounded">
          {category}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] text-kynta-warm-gray tracking-wide mb-2.5">
          {meta}
        </p>
        <h3 className="font-serif text-[17px] leading-snug text-kynta-charcoal mb-3">
          {title}
        </h3>
        <p className="text-[13px] leading-[1.65] text-kynta-warm-gray mb-5 flex-1">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-kynta-teal hover:text-kynta-teal-light transition-colors"
        >
          Read Article
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <title>Arrow</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export function JournalSection({ data }: JournalSectionProps) {
  const eyebrow = data?.eyebrow || "The Kynta Gazette";
  const heading =
    data?.heading ||
    "Dispatches on botanical science, architecture & hotel yield.";

  const articles =
    data?.articles?.map((a) => ({
      image: "/article-herbal-compress.jpg",
      category: a.category || "Wellness",
      meta: `${a.readTime || "5 Min Read"} • ${a.author || "Kynta Wellness"}`,
      title: a.title,
      description: a.excerpt,
      href: "/blog",
    })) || defaultArticles;

  return (
    <section className="w-full bg-kynta-section-bg py-16 md:py-20 lg:py-24">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-3">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl lg:text-[36px] leading-[1.2] text-kynta-charcoal whitespace-pre-line">
              {heading}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-kynta-charcoal hover:text-kynta-teal transition-colors whitespace-nowrap md:mt-2"
          >
            Read All Journal Entries
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <title>Arrow</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {articles.map((a) => (
            <ArticleCard key={a.title} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}
