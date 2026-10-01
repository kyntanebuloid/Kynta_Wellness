"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Pixels of rounding slack when comparing card edges with the visible area.
const SLACK = 2;

/**
 * Arrow buttons for a horizontal, snap-start carousel. "Next" brings the
 * first card that is cut off on the right fully into view (it never skips a
 * half-shown card); "Previous" does the same on the left. At either end it
 * loops round. Optional autoplay pauses while the pointer or focus is on it.
 *
 * The track must be `position: relative` so card offsets are measured from it.
 */
export function useCarousel({ autoplayMs = 0 } = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lastMove = useRef(0);
  const [scrollable, setScrollable] = useState(true);

  const go = useCallback((direction: "next" | "prev") => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const view = track.clientWidth;
    const max = track.scrollWidth - view;
    const left = track.scrollLeft;
    if (cards.length === 0 || max <= SLACK) return;

    let target: number;
    if (direction === "next") {
      if (left >= max - SLACK) {
        target = 0; // at the end: loop back to the start
      } else {
        const cut = cards.find(
          (c) => c.offsetLeft + c.offsetWidth > left + view + SLACK,
        );
        // The first card-aligned position that shows the cut-off card in full.
        const needed = cut ? cut.offsetLeft + cut.offsetWidth - view : max;
        const start = cards.find(
          (c) => c.offsetLeft > left + SLACK && c.offsetLeft >= needed - SLACK,
        );
        target = start ? start.offsetLeft : max;
      }
    } else if (left <= SLACK) {
      target = max; // at the start: loop round to the end
    } else {
      // The last card that starts before the visible area (cut off on the left).
      const cut = cards.filter((c) => c.offsetLeft < left - SLACK).pop();
      target = cut ? cut.offsetLeft : 0;
    }
    track.scrollTo({ left: Math.min(target, max), behavior: "smooth" });
  }, []);

  // Hide the buttons when every card already fits.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () =>
      setScrollable(track.scrollWidth - track.clientWidth > SLACK);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Autoplay: pauses on hover/focus, and waits after a click or swipe.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !autoplayMs || !scrollable) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    const touched = () => {
      lastMove.current = Date.now();
    };
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);
    track.addEventListener("pointerdown", touched);

    const timer = setInterval(() => {
      const idle = Date.now() - lastMove.current >= autoplayMs;
      if (!paused && idle && !document.hidden) go("next");
    }, autoplayMs);

    return () => {
      clearInterval(timer);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
      track.removeEventListener("pointerdown", touched);
    };
  }, [autoplayMs, scrollable, go]);

  const move = (direction: "next" | "prev") => {
    lastMove.current = Date.now();
    go(direction);
  };

  return {
    trackRef,
    scrollable,
    next: () => move("next"),
    prev: () => move("prev"),
  };
}
