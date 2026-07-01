"use client";

import { useEffect, useState } from "react";

const MIN_DURATION = 1800;

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    let pageLoaded = document.readyState === "complete";

    const onLoad = () => {
      pageLoaded = true;
    };
    window.addEventListener("load", onLoad);

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const timeBased = Math.min(100, (elapsed / MIN_DURATION) * 100);
      // Hold at 96% until the page has actually finished loading, so the
      // number never lies about real progress even on a slow connection.
      const pct = pageLoaded ? timeBased : Math.min(timeBased, 96);

      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t1 = setTimeout(() => setFading(true), 200);
    const t2 = setTimeout(() => {
      setMounted(false);
      onDone();
    }, 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [progress, onDone]);

  if (!mounted) return null;

  const shown = Math.floor(progress);

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-(--bg) text-(--fg)"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity .5s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-hidden={fading}
    >
      <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-muted mb-6">
        <span className="inline-block w-2.25 h-2.25 bg-(--accent) rounded-full" />
        A.&nbsp;Adjali
      </div>

      <div className="font-sans font-medium text-[15vw] md:text-[9vw] leading-none tabular-nums">
        {shown}
        <span className="text-muted">%</span>
      </div>

      <div className="mt-8 w-[min(320px,60vw)] h-px bg-(--line) overflow-hidden">
        <div
          className="h-full bg-(--fg)"
          style={{ width: `${progress}%`, transition: "width .1s linear" }}
        />
      </div>
    </div>
  );
}
