import Image from "next/image";

import { type AboutPageContent, aboutDefaults, type CredentialIcon as CredentialIconType } from "@/content/about";
import { imageAlt, imageUrl, list, text } from "@/content/types";

interface LeadershipMember {
  role: string;
  name: string;
  bio: string;
  credentialIcon: CredentialIconType;
  credentialText: string;
  image: string;
  imageAlt: string;
}

function CredentialIcon({
  type,
}: {
  type: CredentialIconType;
}) {
  switch (type) {
    case "hospitality":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-kynta-warm-gray"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "protocol":
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-kynta-warm-gray"
          aria-hidden="true"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <path d="M12 11v4" />
          <path d="M10 13h4" />
        </svg>
      );
    default:
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-kynta-warm-gray"
          aria-hidden="true"
        >
          <path d="m18 2 4 4-12 12-4-4L18 2z" />
          <path d="m15 5 4 4" />
          <path d="m2 22 4-1-3-3-1 4z" />
        </svg>
      );
  }
}

function LeadershipCard({ member }: { member: LeadershipMember }) {
  return (
    <div className="flex flex-col h-full bg-white rounded-[16px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.035)] border border-kynta-border/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
      <div className="relative w-full h-[218px] overflow-hidden bg-[#ebe8e1]">
        <Image
          src={member.image}
          alt={member.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 282px"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div className="p-[22px] flex flex-col flex-1">
        <p className="text-xs font-semibold tracking-wider uppercase text-kynta-rust mb-1.5">
          {member.role}
        </p>

        <h3 className="font-serif text-xl leading-snug text-kynta-charcoal mb-2">
          {member.name}
        </h3>

        <p className="text-[13px] leading-[1.65] text-kynta-warm-gray mb-6 flex-1">
          {member.bio}
        </p>

        <div className="flex items-center gap-2 pt-1 mt-auto">
          <CredentialIcon type={member.credentialIcon} />
          <span className="text-xs text-kynta-warm-gray font-normal">
            {member.credentialText}
          </span>
        </div>
      </div>
    </div>
  );
}

interface AboutLeadershipSectionProps {
  data?: AboutPageContent["leadershipSection"];
}

export function AboutLeadershipSection({ data }: AboutLeadershipSectionProps) {
  const d = aboutDefaults.leadershipSection;
  const eyebrow = text(data?.eyebrow, d.eyebrow);
  const heading = text(data?.heading, d.heading);
  const description = text(data?.description, d.description);

  const team: LeadershipMember[] = list(data?.members, d.members).map((m, i) => {
    const fallback = d.members[i % d.members.length];
    return {
      name: m.name,
      role: m.role,
      bio: m.bio ?? "",
      credentialIcon: m.credentialIcon ?? fallback.credentialIcon,
      credentialText: m.credentialText ?? "",
      image: imageUrl(m.image, fallback.image),
      imageAlt: imageAlt(m.image, { alt: m.name }),
    };
  });

  return (
    <section
      className="w-full py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#f7faf8" }}
    >
      <div className="container-site">
        <div className="text-left mb-12 md:mb-14">
          <p className="text-[13px] sm:text-[14px] font-semibold text-kynta-rust tracking-wide mb-3">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.2] text-kynta-charcoal mb-4">
            {heading}
          </h2>
          <p className="text-[15px] leading-[1.7] text-kynta-warm-gray max-w-xl" data-reveal>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-reveal-stagger>
          {team.map((member, index) => (
            <LeadershipCard key={`${member.name}-${index}`} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
