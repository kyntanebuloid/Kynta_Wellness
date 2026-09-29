"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { refreshSanityContent } from "@/lib/actions/sanity-live";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Listens to Sanity's Live Content API and refreshes the cached content as
// soon as anything is published. The browser connects directly, so the site's
// domain must be listed under CORS origins in the Sanity project settings.
export function SanityLiveRefresh() {
  const router = useRouter();

  useEffect(() => {
    if (!projectId || typeof EventSource === "undefined") return;

    const source = new EventSource(
      `https://${projectId}.api.sanity.io/v2025-01-01/data/live/events/${dataset}`,
    );
    let refreshing = false;
    let queued = false;

    const refresh = async () => {
      if (refreshing) {
        queued = true;
        return;
      }
      refreshing = true;
      try {
        await refreshSanityContent();
        router.refresh();
      } catch {
        // The next change or the periodic revalidation will catch up.
      } finally {
        refreshing = false;
        if (queued) {
          queued = false;
          void refresh();
        }
      }
    };

    source.addEventListener("message", refresh);
    source.addEventListener("restart", refresh);
    source.onerror = () => {
      // A CORS rejection closes the stream for good; don't keep retrying.
      if (source.readyState === EventSource.CLOSED) source.close();
    };

    return () => source.close();
  }, [router]);

  return null;
}
