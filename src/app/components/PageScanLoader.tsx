"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// A blueprint-style "scan" shown while a page change is slow. It covers the
// page below the navbar, which stays put. Fast navigations never show it.

const SHOW_AFTER_MS = 200;
const MIN_VISIBLE_MS = 450;
const GIVE_UP_MS = 12_000;
const EXCLUDED_ROUTES = /^\/(studio|admin)(\/|$)/;

type Phase = "idle" | "waiting" | "visible" | "leaving";
type TimerList = { current: ReturnType<typeof setTimeout>[] };

function clearTimers(timers: TimerList) {
  for (const t of timers.current) clearTimeout(t);
  timers.current = [];
}

function isInternalNavigation(event: MouseEvent): string | null {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }
  const anchor = (event.target as Element | null)?.closest("a");
  if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return null;
  }
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname) return null;
  if (EXCLUDED_ROUTES.test(url.pathname)) return null;
  return url.pathname;
}

export function PageScanLoader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [top, setTop] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const shownAt = useRef(0);

  // Start waiting when an internal link is clicked.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!isInternalNavigation(event)) return;
      clearTimers(timers);
      setPhase("waiting");
      timers.current.push(
        setTimeout(() => {
          const header = document.querySelector("header");
          setTop(Math.max(0, header?.getBoundingClientRect().bottom ?? 0));
          shownAt.current = Date.now();
          setPhase("visible");
        }, SHOW_AFTER_MS),
        setTimeout(() => setPhase("idle"), GIVE_UP_MS),
      );
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimers(timers);
    };
  }, []);

  // The new page has rendered: skip the loader, or fade it out.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on each navigation
  useEffect(() => {
    setPhase((current) => {
      if (current === "waiting") {
        clearTimers(timers);
        return "idle";
      }
      if (current !== "visible") return current;
      clearTimers(timers);
      const remaining = Math.max(
        0,
        MIN_VISIBLE_MS - (Date.now() - shownAt.current),
      );
      timers.current.push(
        setTimeout(() => setPhase("leaving"), remaining),
        setTimeout(() => setPhase("idle"), remaining + 400),
      );
      return current;
    });
  }, [pathname]);

  if (phase === "idle" || phase === "waiting") return null;

  return (
    <output
      className={`page-scan ${phase === "leaving" ? "page-scan--leaving" : ""}`}
      style={{ top }}
      aria-live="polite"
    >
      <span className="sr-only">Loading page…</span>
      <svg
        className="page-scan__blueprint"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMin meet"
        aria-hidden="true"
      >
        {/* Heading lines */}
        <rect x="60" y="70" width="420" height="22" rx="2" pathLength={1} />
        <rect x="60" y="112" width="560" height="44" rx="2" pathLength={1} />
        <rect x="60" y="176" width="480" height="14" rx="2" pathLength={1} />
        <rect x="60" y="202" width="400" height="14" rx="2" pathLength={1} />
        {/* Buttons */}
        <rect x="60" y="252" width="180" height="46" rx="23" pathLength={1} />
        <rect x="260" y="252" width="180" height="46" rx="23" pathLength={1} />
        {/* Feature image */}
        <rect x="700" y="60" width="440" height="300" rx="10" pathLength={1} />
        <line x1="700" y1="60" x2="1140" y2="360" pathLength={1} />
        <line x1="1140" y1="60" x2="700" y2="360" pathLength={1} />
        {/* Cards */}
        <rect x="60" y="430" width="340" height="270" rx="10" pathLength={1} />
        <rect x="430" y="430" width="340" height="270" rx="10" pathLength={1} />
        <rect x="800" y="430" width="340" height="270" rx="10" pathLength={1} />
        <rect x="84" y="454" width="292" height="140" rx="6" pathLength={1} />
        <rect x="454" y="454" width="292" height="140" rx="6" pathLength={1} />
        <rect x="824" y="454" width="292" height="140" rx="6" pathLength={1} />
        <rect x="84" y="614" width="220" height="12" rx="2" pathLength={1} />
        <rect x="454" y="614" width="220" height="12" rx="2" pathLength={1} />
        <rect x="824" y="614" width="220" height="12" rx="2" pathLength={1} />
        <rect x="84" y="640" width="180" height="10" rx="2" pathLength={1} />
        <rect x="454" y="640" width="180" height="10" rx="2" pathLength={1} />
        <rect x="824" y="640" width="180" height="10" rx="2" pathLength={1} />
      </svg>
      <div className="page-scan__beam" aria-hidden="true" />
    </output>
  );
}
