"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const EXCLUDED_ROUTES = /^\/(studio|admin)(\/|$)/;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollEffects() {
  const pathname = usePathname();
  const enabled = !EXCLUDED_ROUTES.test(pathname);

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      anchors: true,
      allowNestedScroll: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const revealBase = {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      };

      gsap.utils
        .toArray<HTMLElement>("[data-reveal], main section h2")
        .forEach((el) => {
          if (el.closest("[data-reveal-stagger]")) return;
          gsap.from(el, {
            ...revealBase,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        gsap.from(el.children, {
          ...revealBase,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax) || 8,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        // Effects can re-run (Strict Mode, navigation), so keep the real value on the node.
        el.dataset.countFinal ??= el.textContent ?? "";
        const match = el.dataset.countFinal.match(/^(\D*)([\d.]+)(.*)$/);
        if (!match) return;
        const [, prefix, num, suffix] = match;
        const target = Number.parseFloat(num);
        const decimals = num.split(".")[1]?.length ?? 0;
        const counter = { value: 0 };
        el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
          },
        });
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [enabled, pathname]);

  return null;
}
