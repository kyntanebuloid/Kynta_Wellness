import type { SocialLinks } from "@/types/sanity";

const DEFAULT_SOCIAL_LINKS: Required<SocialLinks> = {
  instagram: "https://www.instagram.com/kyntawellnessgroup",
  facebook: "https://www.facebook.com/netlafeadsmarketing",
  linkedin: "https://www.linkedin.com/company/kyntawellness/",
  whatsapp: "https://whatsapp.com/channel/0029VbCmXZFGZNCwHs3hTf21",
};

export function resolveSocialLinks(
  links?: SocialLinks | null,
): Required<SocialLinks> {
  return {
    instagram: links?.instagram || DEFAULT_SOCIAL_LINKS.instagram,
    facebook: links?.facebook || DEFAULT_SOCIAL_LINKS.facebook,
    linkedin: links?.linkedin || DEFAULT_SOCIAL_LINKS.linkedin,
    whatsapp: links?.whatsapp || DEFAULT_SOCIAL_LINKS.whatsapp,
  };
}
