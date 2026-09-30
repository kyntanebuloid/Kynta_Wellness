import Image from "next/image";

import {
  type HospitalityPageContent,
  hospitalityPageDefaults,
} from "@/content/hospitality";
import { imageAlt, imageUrl, list, text } from "@/content/types";

interface HospitalityViabilitySectionProps {
  data?: HospitalityPageContent["viabilitySection"];
}

export function HospitalityViabilitySection({
  data,
}: HospitalityViabilitySectionProps) {
  const d = hospitalityPageDefaults.viabilitySection;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);
  const photo = imageUrl(data?.image, d.image);
  const photoAlt = imageAlt(data?.image, d.image);
  const imageCaption = text(data?.imageCaption, d.imageCaption);
  const stats = list(data?.stats, d.stats);

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] aspect-[459/344] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.07)]">
              <Image
                src={photo}
                alt={photoAlt}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md border border-white/80 rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center">
                <span className="text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.1em] uppercase text-kynta-charcoal whitespace-nowrap">
                  {imageCaption}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-start">
            <p className="text-sm font-medium text-kynta-rust tracking-wide mb-3">
              {eyebrow}
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-kynta-charcoal font-normal mb-4">
              {heading}
            </h2>

            <p className="text-[15px] leading-[1.7] text-kynta-warm-gray mb-8 max-w-lg">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
              {stats.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="bg-white rounded-[14px] p-5 sm:p-5.5 border border-kynta-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-start"
                >
                  <span
                    className="font-serif text-3xl lg:text-[34px] leading-tight font-normal mb-1.5"
                    style={{ color: "var(--kynta-teal-dark)" }}
                  >
                    {stat.value}
                  </span>

                  <h3 className="text-xs font-semibold tracking-wider uppercase text-kynta-charcoal mb-2">
                    {stat.label}
                  </h3>

                  <p className="text-[13px] leading-[1.65] text-kynta-warm-gray">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
