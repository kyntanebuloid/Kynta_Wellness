"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// A thin bar under the navbar while a page change is slow: it creeps towards
// the end while waiting, then completes and fades once the page arrives.
// Fast navigations never show it.

const SHOW_AFTER_MS = 150;
const GIVE_UP_MS = 12_000;
const EXCLUDED_ROUTES = /^\/(studio|admin)(\/|$)/;

// 0 hidden, 1 appear, 2 creeping, 3 finishing
type Stage = 0 | 1 | 2 | 3;
type TimerList = { current: ReturnType<typeof setTimeout>[] };

function clearTimers(timers: TimerList) {
  for (const t of timers.current) clearTimeout(t);
  timers.current = [];
}

function isInternalNavigation(event: MouseEvent): boolean {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false;
  }
  const anchor = (event.target as Element | null)?.closest("a");
  if (
    !anchor ||
    anchor.target === "_blank" ||
    anchor.hasAttribute("download")
  ) {
    return false;
  }
  const url = new URL(anchor.href, window.location.href);
  return (
    url.origin === window.location.origin &&
    url.pathname !== window.location.pathname &&
    !EXCLUDED_ROUTES.test(url.pathname)
  );
}

const STAGE_STYLE: Record<Exclude<Stage, 0>, React.CSSProperties> = {
  1: { transform: "scaleX(0.08)", transition: "none" },
  2: {
    transform: "scaleX(0.85)",
    transition: "transform 8s cubic-bezier(0.1, 0.7, 0.2, 1)",
  },
  3: {
    transform: "scaleX(1)",
    opacity: 0,
    transition: "transform 0.2s ease-out, opacity 0.25s ease 0.2s",
  },
};

export function NavigationProgress() {
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>(0);
  const [top, setTop] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const waiting = useRef(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!isInternalNavigation(event)) return;
      clearTimers(timers);
      waiting.current = true;
      timers.current.push(
        setTimeout(() => {
          const header = document.querySelector("header");
          setTop(Math.max(0, header?.getBoundingClientRect().bottom ?? 0));
          setStage(1);
          // Let the starting width paint before the slow creep begins.
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setStage((s) => (s === 1 ? 2 : s))),
          );
        }, SHOW_AFTER_MS),
        setTimeout(() => {
          waiting.current = false;
          setStage(0);
        }, GIVE_UP_MS),
      );
    };
    // Capture phase: next/link calls preventDefault() on its own click, which
    // runs before a bubbling document listener would see the event.
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers(timers);
    };
  }, []);

  // The new page has rendered: finish the bar, or never show it.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on each navigation
  useEffect(() => {
    if (!waiting.current) return;
    waiting.current = false;
    clearTimers(timers);
    setStage((current) => {
      if (current === 0) return 0;
      timers.current.push(setTimeout(() => setStage(0), 500));
      return 3;
    });
  }, [pathname]);

  if (stage === 0) return null;

  return (
    <div
      className="nav-progress"
      style={{ top, ...STAGE_STYLE[stage] }}
      role="progressbar"
      aria-label="Loading page"
    />
  );
}
