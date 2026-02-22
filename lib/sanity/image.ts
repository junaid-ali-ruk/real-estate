import type { SanityImageSource } from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Enhanced urlFor that returns blur placeholder data if available in the Sanity image metadata
 */
export function urlForWithPlaceholder(
  source: SanityImageSource & { asset?: { metadata?: { lqip?: string } } },
) {
  const image = builder.image(source);
  const lqip = source?.asset?.metadata?.lqip;

  return {
    src: image.url(),
    placeholder: lqip ? ("blur" as const) : undefined,
    blurDataURL: lqip,
  };
}
