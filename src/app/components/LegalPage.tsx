import Link from "next/link";

export interface LegalSection {
  heading: string;
  /** Paragraphs; a string array inside is shown as a bullet list. */
  body: (string | string[])[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/** Shared layout for the Privacy Policy and Terms of Service pages. */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <article className="w-full bg-[#f7f9f7] py-14 md:py-20">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-kynta-rust mb-3">
            {eyebrow}
          </p>
          <h1 className="font-serif text-[34px] sm:text-[44px] leading-[1.15] text-kynta-charcoal mb-3">
            {title}
          </h1>
          <p className="text-[12.5px] text-kynta-warm-gray mb-8">
            Last updated: {updated}
          </p>
          <p className="text-[15.5px] leading-[1.8] text-kynta-charcoal/85 mb-10">
            {intro}
          </p>

          <nav
            aria-label="On this page"
            className="mb-12 rounded-[12px] border border-kynta-border/50 bg-white p-5"
          >
            <p className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-kynta-charcoal mb-3">
              On this page
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13px]">
              {sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#section-${i + 1}`}
                    className="text-kynta-teal-dark hover:underline"
                  >
                    {i + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map((section, i) => (
            <section
              key={section.heading}
              id={`section-${i + 1}`}
              className="mb-10 scroll-mt-28"
            >
              <h2 className="font-serif text-[23px] text-kynta-charcoal mb-4">
                {i + 1}. {section.heading}
              </h2>
              {section.body.map((block) =>
                Array.isArray(block) ? (
                  <ul
                    key={block.join("|")}
                    className="mb-4 ml-5 list-disc space-y-1.5 text-[14.5px] leading-[1.75] text-kynta-charcoal/85 marker:text-kynta-rust"
                  >
                    {block.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p
                    key={block}
                    className="mb-4 text-[14.5px] leading-[1.8] text-kynta-charcoal/85"
                  >
                    {block}
                  </p>
                ),
              )}
            </section>
          ))}

          <div className="mt-14 rounded-[12px] border border-kynta-border/50 bg-white p-6 text-[13.5px] leading-[1.7] text-kynta-warm-gray">
            Questions about this page? Contact us through our{" "}
            <Link href="/contact" className="text-kynta-teal-dark underline">
              contact page
            </Link>{" "}
            or call{" "}
            <a
              href="tel:+917250333494"
              className="text-kynta-teal-dark underline"
            >
              +91&nbsp;7250333494
            </a>
            .
          </div>
        </div>
      </div>
    </article>
  );
}
