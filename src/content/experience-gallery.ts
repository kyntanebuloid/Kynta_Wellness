// Built-in gallery photos for each experience detail page, keyed by slug.
// Used when the experience in Sanity has no photo for a card.

export interface ExperienceGalleryImages {
  main: string;
  topRight: string;
  bottomRight: string;
}

export const experienceGalleryDefaults: Record<string, ExperienceGalleryImages> =
  {
    "spa-sojourns": {
      main: "/exp-spa-sojourns-main.png",
      topRight: "/exp-spa-sojourns-potli.png",
      bottomRight: "/exp-spa-sojourns-pavilion.png",
    },
    "massage-selections": {
      main: "/treatment-massage.jpg",
      topRight: "/article-herbal-compress.jpg",
      bottomRight: "/destination-glenwood.jpg",
    },
    "glamour-glow": {
      main: "/treatment-glamour-glow.jpg",
      topRight: "/triad-touch.jpg",
      bottomRight: "/hospitality-chamber.jpg",
    },
    "hydrotherapy-plunge": {
      main: "/experience-hydro-colonnade.jpg",
      topRight: "/inquiry-hydrotherapy.jpg",
      bottomRight: "/destination-heritage.jpg",
    },
    "couples-sanctuary": {
      main: "/destination-glenwood.jpg",
      topRight: "/triad-spatial.jpg",
      bottomRight: "/location-rawai-tents.jpg",
    },
    "sound-immersion": {
      main: "/triad-vedic.jpg",
      topRight: "/inquiry-architecture.jpg",
      bottomRight: "/timeline-alpine.jpg",
    },
  };

export function experienceGalleryFor(slug: string): ExperienceGalleryImages {
  return (
    experienceGalleryDefaults[slug] ?? experienceGalleryDefaults["spa-sojourns"]
  );
}
