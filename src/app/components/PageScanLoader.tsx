"use client";

import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";

// A blueprint-style "scan" shown while a page change is slow. It outlines the
// first screen of the page being opened (below the navbar, which stays put)
// in that page's background colour. Fast navigations never show it.

const SHOW_AFTER_MS = 120;
const MIN_VISIBLE_MS = 400;
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
  if (
    !anchor ||
    anchor.target === "_blank" ||
    anchor.hasAttribute("download")
  ) {
    return null;
  }
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname) return null;
  if (EXCLUDED_ROUTES.test(url.pathname)) return null;
  return url.pathname;
}

// ── Outlines ─────────────────────────────────────────────────────────────
// Each block draws in left-to-right, one after another (`--i` staggers it).

type Next = () => CSSProperties;

function counter(): Next {
  let i = 0;
  return () => ({ "--i": i++ }) as CSSProperties;
}

function Heading({ n, center = false }: { n: Next; center?: boolean }) {
  const mx = center ? "mx-auto" : "";
  return (
    <>
      <div className={`ps ps-pill w-40 mb-6 ${mx}`} style={n()} />
      <div className={`ps ps-h w-11/12 sm:w-3/4 mb-3 ${mx}`} style={n()} />
      <div className={`ps ps-h w-2/3 sm:w-1/2 mb-6 ${mx}`} style={n()} />
      <div className={`ps ps-line w-full sm:w-2/3 mb-2.5 ${mx}`} style={n()} />
      <div className={`ps ps-line w-4/5 sm:w-1/2 ${mx}`} style={n()} />
    </>
  );
}

function Buttons({ n, center = false }: { n: Next; center?: boolean }) {
  return (
    <div className={`mt-8 flex gap-3 ${center ? "justify-center" : ""}`}>
      <div className="ps ps-btn" style={n()} />
      <div className="ps ps-btn" style={n()} />
    </div>
  );
}

function Chips({ n, count }: { n: Next; count: number }) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {Array.from({ length: count }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed placeholder list
          key={i}
          className={`ps ps-chip ${i % 2 ? "w-24 sm:w-28" : "w-28 sm:w-36"} ${i >= 3 ? "hidden sm:block" : ""}`}
          style={n()}
        />
      ))}
    </div>
  );
}

function HomeOutline() {
  const n = counter();
  return (
    <div className="ps ps-img absolute inset-0 rounded-none" style={n()}>
      <div className="container-site absolute inset-x-0 bottom-[12vh]">
        <div className="ps ps-h w-11/12 sm:w-1/2 mb-3" style={n()} />
        <div className="ps ps-h w-3/4 sm:w-1/3 mb-6" style={n()} />
        <div className="ps ps-line w-full sm:w-2/5" style={n()} />
        <Buttons n={n} />
      </div>
    </div>
  );
}

function ExperiencesOutline() {
  const n = counter();
  return (
    <div className="container-site">
      <Heading n={n} />
      <Chips n={n} count={6} />
      <div
        className="ps ps-img mt-8 aspect-[4/3] sm:aspect-[818/370]"
        style={n()}
      />
    </div>
  );
}

function DetailOutline() {
  const n = counter();
  return (
    <div className="container-site">
      <Heading n={n} center />
      <Buttons n={n} center />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="ps ps-img lg:col-span-7 aspect-[429/312]" style={n()} />
        <div className="hidden lg:col-span-5 lg:flex flex-col gap-4">
          <div className="ps ps-img flex-1" style={n()} />
          <div className="ps ps-img flex-1" style={n()} />
        </div>
      </div>
    </div>
  );
}

function LocationsOutline() {
  const n = counter();
  return (
    <div className="container-site">
      <Heading n={n} />
      <Chips n={n} count={3} />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`ps ps-img aspect-[1/0.85] ${i > 0 ? "hidden sm:block" : ""}`}
            style={n()}
          />
        ))}
      </div>
    </div>
  );
}

function SplitOutline() {
  const n = counter();
  return (
    <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-center">
      <div className="lg:col-span-7">
        <Heading n={n} />
        <Buttons n={n} />
      </div>
      <div className="ps ps-img lg:col-span-5 aspect-[405/278]" style={n()} />
    </div>
  );
}

function BlogOutline() {
  const n = counter();
  return (
    <div className="container-site">
      <Heading n={n} />
      <Chips n={n} count={6} />
      <div
        className="ps ps-img mt-10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
        style={n()}
      >
        <div className="ps ps-img rounded-none lg:col-span-7 h-[200px] sm:h-[320px] lg:h-[400px]" />
        <div className="lg:col-span-5 p-5 sm:p-6 lg:p-9">
          <div className="ps ps-line w-1/2 mb-4" style={n()} />
          <div className="ps ps-h w-full mb-3" style={n()} />
          <div className="ps ps-h w-3/4 mb-6" style={n()} />
          <div className="ps ps-line w-full mb-2.5" style={n()} />
          <div className="ps ps-line w-5/6" style={n()} />
        </div>
      </div>
    </div>
  );
}

function ArticleOutline() {
  const n = counter();
  return (
    <div className="container-site">
      <div className="mx-auto max-w-3xl">
        <div className="ps ps-line w-28 mb-8" style={n()} />
        <div className="ps ps-line w-44 mb-4" style={n()} />
        <div className="ps ps-h w-full mb-3" style={n()} />
        <div className="ps ps-h w-3/4 mb-6" style={n()} />
        <div className="ps ps-line w-full mb-2.5" style={n()} />
        <div className="ps ps-line w-2/3 mb-8" style={n()} />
        <div className="flex items-center gap-4">
          <div className="ps h-11 w-11 rounded-full" style={n()} />
          <div className="ps ps-line w-40" style={n()} />
        </div>
      </div>
      <div
        className="ps ps-img mx-auto mt-10 max-w-5xl aspect-[16/10] md:aspect-[16/8]"
        style={n()}
      />
    </div>
  );
}

function ContactOutline() {
  const n = counter();
  return (
    <div className="container-site">
      <div className="ps ps-line w-48 mb-4" style={n()} />
      <div className="ps ps-h w-3/4 sm:w-1/2 mb-4" style={n()} />
      <div className="ps ps-line w-full sm:w-2/3 mb-12" style={n()} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          <div className="ps ps-card h-[72px]" style={n()} />
          <div className="ps ps-card h-[72px]" style={n()} />
          <div className="ps ps-card h-28" style={n()} />
        </div>
        <div
          className="ps ps-card hidden lg:block lg:col-span-7 p-8"
          style={n()}
        >
          <div className="grid grid-cols-2 gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="ps ps-field" style={n()} />
            ))}
            <div className="ps ps-field col-span-2 h-28" style={n()} />
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericOutline() {
  const n = counter();
  return (
    <div className="container-site">
      <Heading n={n} />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`ps ps-img aspect-[4/3] ${i > 0 ? "hidden md:block" : ""}`}
            style={n()}
          />
        ))}
      </div>
    </div>
  );
}

type Outline = { background: string; Shape: () => React.ReactNode };

/** The outline and background colour of the page at `path`. */
function outlineFor(path: string): Outline {
  const [, first = "", second] = path.split("/");
  if (first === "") return { background: "#f7f9f7", Shape: HomeOutline };
  if (first === "experiences")
    return second
      ? { background: "#ffffff", Shape: DetailOutline }
      : { background: "#f7f9f7", Shape: ExperiencesOutline };
  if (first === "locations")
    return second
      ? { background: "#f7f9f7", Shape: DetailOutline }
      : { background: "#f7f9f7", Shape: LocationsOutline };
  if (first === "about") return { background: "#f7f9f7", Shape: SplitOutline };
  if (first === "hospitality" || first === "for-hospitality")
    return { background: "#f7faf8", Shape: SplitOutline };
  if (first === "blog")
    return second
      ? { background: "#f7faf8", Shape: ArticleOutline }
      : { background: "#f7faf8", Shape: BlogOutline };
  if (first === "contact")
    return { background: "#f1f4f2", Shape: ContactOutline };
  return { background: "#f7f9f7", Shape: GenericOutline };
}

export function PageScanLoader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [top, setTop] = useState(0);
  const [target, setTarget] = useState("/");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const shownAt = useRef(0);

  // Start waiting when an internal link is clicked.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const next = isInternalNavigation(event);
      if (!next) return;
      clearTimers(timers);
      setTarget(next);
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
    // Capture phase: next/link calls preventDefault() on its own click, which
    // runs before a bubbling document listener would see the event.
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
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
        setTimeout(() => setPhase("idle"), remaining + 300),
      );
      return current;
    });
  }, [pathname]);

  if (phase === "idle" || phase === "waiting") return null;

  const { background, Shape } = outlineFor(target);

  return (
    <output
      className={`page-scan ${phase === "leaving" ? "page-scan--leaving" : ""}`}
      style={{ top, background }}
      aria-live="polite"
    >
      <span className="sr-only">Loading page…</span>
      <div className="page-scan__layout" aria-hidden="true">
        <Shape />
      </div>
      <div className="page-scan__beam" aria-hidden="true" />
    </output>
  );
}
