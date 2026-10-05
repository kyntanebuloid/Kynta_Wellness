import {
  type ExperiencesPageContent,
  experiencesPageDefaults,
} from "@/content/experiences";
import { list, text } from "@/content/types";

interface ExperienceGoodToKnowSectionProps {
  data?: ExperiencesPageContent["goodToKnowSection"];
}

/** The menus' "General Information": reservations, etiquette, considerations. */
export function ExperienceGoodToKnowSection({
  data,
}: ExperienceGoodToKnowSectionProps) {
  const d = experiencesPageDefaults.goodToKnowSection;
  const groups = list(data?.groups, d.groups).filter(
    (g) => g.title && g.items?.length,
  );

  return (
    <section
      id="good-to-know"
      className="w-full py-16 md:py-20 lg:py-24 border-t border-kynta-border/40 scroll-mt-24"
      style={{ backgroundColor: "#f7f9f7" }}
    >
      <div className="container-site">
        <div className="max-w-2xl mb-10">
          <p className="section-label text-kynta-rust mb-3">
            {text(data?.eyebrow, d.eyebrow)}
          </p>
          <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-3">
            {text(data?.heading, d.heading)}
          </h2>
          <p className="text-[14px] leading-[1.7] text-kynta-warm-gray">
            {text(data?.description, d.description)}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-[14px] bg-white border border-kynta-border/40 p-6"
            >
              <h3 className="font-serif text-[20px] text-kynta-charcoal mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2.5 text-[13px] leading-[1.65] text-kynta-warm-gray">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-kynta-rust"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
