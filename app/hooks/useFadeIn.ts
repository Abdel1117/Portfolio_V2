"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type FadeDirection = "left" | "right" | "top" | "bottom";

export interface UseFadeInOptions {
  /** Distance (px) the element travels from before fading into place. */
  distance?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  /** ScrollTrigger "start" position. */
  start?: string;
  /** Play once vs. replay on re-entry. */
  once?: boolean;
  /** Set to false to defer setup (e.g. until a loading screen is gone). */
  enabled?: boolean;
}

const OFFSETS: Record<FadeDirection, { x: number; y: number }> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  top: { x: 0, y: -1 },
  bottom: { x: 0, y: 1 },
};

export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  direction: FadeDirection,
  options: UseFadeInOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    distance = 60,
    duration = 0.8,
    delay = 0,
    ease = "power3.out",
    start = "top 85%",
    once = true,
    enabled = true,
  } = options;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const { x, y } = OFFSETS[direction];

    if (!enabled) {
      gsap.set(el, { opacity: 0, x: x * distance, y: y * distance });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: x * distance, y: y * distance },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, ease, start, once, enabled]);

  return ref;
}

export function useFadeFromLeft<T extends HTMLElement = HTMLDivElement>(
  options?: UseFadeInOptions,
) {
  return useFadeIn<T>("left", options);
}

export function useFadeFromRight<T extends HTMLElement = HTMLDivElement>(
  options?: UseFadeInOptions,
) {
  return useFadeIn<T>("right", options);
}

export function useFadeFromTop<T extends HTMLElement = HTMLDivElement>(
  options?: UseFadeInOptions,
) {
  return useFadeIn<T>("top", options);
}

export function useFadeFromBottom<T extends HTMLElement = HTMLDivElement>(
  options?: UseFadeInOptions,
) {
  return useFadeIn<T>("bottom", options);
}

export interface UseStaggerRevealOptions extends UseFadeInOptions {
  direction?: FadeDirection;
  stagger?: number;
}

/** Reveals the direct children of the returned ref, one after another. */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseStaggerRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    direction = "bottom",
    stagger = 0.09,
    distance = 60,
    duration = 0.8,
    ease = "power3.out",
    start = "top 85%",
    once = true,
  } = options;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(children, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const { x, y } = OFFSETS[direction];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, x: x * distance, y: y * distance },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [direction, stagger, distance, duration, ease, start, once]);

  return ref;
}

export interface UseCountUpOptions {
  decimals?: number;
  suffix?: string;
  duration?: number;
  start?: string;
  once?: boolean;
}

/** Animates a number from 0 to `target` when the element scrolls into view. */
export function useCountUp<T extends HTMLElement = HTMLDivElement>(
  target: number,
  options: UseCountUpOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    decimals = 0,
    suffix = "",
    duration = 1.4,
    start = "top 85%",
    once = true,
  } = options;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      n.toLocaleString("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(target);
      return;
    }

    el.textContent = format(0);
    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
        onUpdate: () => {
          el.textContent = format(counter.val);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, decimals, suffix, duration, start, once]);

  return ref;
}

/** Reveals a SectionHeader: clip-in title + growing underline, in sync. */
export function useSectionReveal(options: UseFadeInOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { start = "top 85%", once = true } = options;

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
      if (clipRef.current) {
        tl.fromTo(
          clipRef.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.85, ease: "power3.out" },
          0,
        );
      }
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power3.out" },
          0.15,
        );
      }
    }, el);

    return () => ctx.revert();
  }, [start, once]);

  return { containerRef, clipRef, lineRef };
}
