import Image from "next/image";
import Link from "next/link";
import type { Homepage } from "@/types/sanity";

interface JournalSectionProps {
  data?: Homepage["journalSection"];
}

const defaultArticles = [
  {
    image: "/article-herbal-compress.jpg",
    category: "Health",
    meta: "6 Min Read • Ayurveda",
    title: "How Warm Herbal Bags Help You Recover From Stress",
    description:
      "Warm bags filled with herbs relax deep muscles and help lower stress in your body.",
    href: "/blog/herbal-compresses",
  },
  {
    image: "/article-spa-design.jpg",
    category: "Spa Design",
    meta: "8 Min Read • Design",
    title: "How to Build a Calm Spa With Nature and Ayurveda",
    description:
      "How stone, quiet rooms and natural light help your body relax on its own.",
    href: "/blog/spa-sanctuaries",
  },
  {
    image: "/article-revpash.jpg",
    category: "Hotel Business",
    meta: "5 Min Read • Hotels",
    title: "How a Good Spa Helps a Hotel Earn More",
    description:
      "Why smart hotel owners turn empty spa space into busy spas that bring in more money.",
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
  const eyebrow = data?.eyebrow || "Kynta Blog";
  const heading =
    data?.heading || "Read about herbs, spa design and hotel business.";
  const allArticlesLabel = data?.allArticlesLink?.label || "Read All Articles";
  const allArticlesUrl = data?.allArticlesLink?.url || "/blog";

  const articles = data?.articles?.length
    ? data.articles.map((a, i) => ({
        image:
          a.image?.url || defaultArticles[i % defaultArticles.length].image,
        category: a.category || "Wellness",
        meta: [a.readTime || "5 Min Read", a.topic].filter(Boolean).join(" • "),
        title: a.title,
        description: a.excerpt,
        href: a.url || "/blog",
      }))
    : defaultArticles;

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
            href={allArticlesUrl}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-kynta-charcoal hover:text-kynta-teal transition-colors whitespace-nowrap md:mt-2"
          >
            {allArticlesLabel}
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
          {articles.map((a, index) => (
            <ArticleCard key={`${a.title}-${index}`} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}
