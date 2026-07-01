"use client";

import { useSectionReveal } from "@/app/hooks/useFadeIn";

type Props = { title: string; tag: string };

export default function SectionHeader({ title, tag }: Props) {
  const { containerRef, clipRef, lineRef } = useSectionReveal();

  return (
    <div ref={containerRef} className="mb-14">
      <div className="flex items-baseline gap-4 pb-4.5">
        <h2 className="font-serif font-normal text-[clamp(30px,5vw,54px)] m-0 leading-none">
          <span className="aa-clip">
            <span ref={clipRef}>{title}</span>
          </span>
        </h2>
        <span className="ml-auto font-mono text-[11px] text-(--fg-2) tracking-[0.08em]">
          {tag}
        </span>
      </div>
      <div
        ref={lineRef}
        className="h-px bg-(--line)"
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
