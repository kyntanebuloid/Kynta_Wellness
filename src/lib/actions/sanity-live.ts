"use server";

import { updateTag } from "next/cache";
import { SANITY_CACHE_TAG } from "@/lib/sanity/data";

const MIN_INTERVAL_MS = 2000;
let lastRefreshAt = 0;

// Called by every open tab when Sanity reports a change, so it is throttled:
// one publish arrives from many browsers at once, and anyone can call it.
export async function refreshSanityContent(): Promise<void> {
  const now = Date.now();
  if (now - lastRefreshAt < MIN_INTERVAL_MS) return;
  lastRefreshAt = now;
  updateTag(SANITY_CACHE_TAG);
}
