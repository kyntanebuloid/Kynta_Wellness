import type { SanityImageSource } from "@sanity/image-url";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient());

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function urlForThumbnail(source: SanityImageSource) {
  return builder.image(source).width(400).height(300).fit("crop");
}

export function urlForOg(source: SanityImageSource) {
  return builder.image(source).width(1200).height(630).fit("crop");
}
