import {
  type HospitalityPageContent,
  hospitalityPageDefaults,
} from "@/content/hospitality";
import { list } from "@/content/types";

interface HospitalityStatsSectionProps {
  data?: HospitalityPageContent["statsSection"];
}

export function HospitalityStatsSection({
  data,
}: HospitalityStatsSectionProps) {
  const metrics = list(
    data?.metrics,
    hospitalityPageDefaults.statsSection.metrics,
  );

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 border-t border-b border-kynta-border/40"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {metrics.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex flex-col items-start">
              <span
                className="font-serif text-[40px] sm:text-[44px] md:text-[48px] leading-none font-normal mb-2.5"
                style={{ color: "var(--kynta-teal-dark)" }}
              >
                {item.value}
              </span>

              <h3 className="text-[10px] md:text-[10.5px] font-semibold tracking-[0.14em] uppercase text-kynta-charcoal mb-1.5">
                {item.label}
              </h3>

              <p className="text-[11.5px] md:text-[12px] leading-relaxed text-kynta-warm-gray">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
