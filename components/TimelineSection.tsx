"use client";

import SectionHeader from "./SectionHeader";
import { timeline } from "./data";
import { useStaggerReveal } from "@/hooks/useFadeIn";

export default function TimelineSection() {
  const listRef = useStaggerReveal({ direction: "left", stagger: 0.1 });

  return (
    <section
      id="parcours"
      className="scroll-mt-[72px] bg-(--bg-2) border-t border-(--line) border-b"
      style={{ transition: "background .45s ease" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:py-[100px]">
        <SectionHeader title="Parcours" tag="EXPÉRIENCE & FORMATION" />
        <div ref={listRef} className="flex flex-col">
          {timeline.map((t, idx) => (
            <div
              key={t.title}
              className={`grid grid-cols-1 gap-1.5 py-[22px] border-t border-(--line) md:grid-cols-[180px_1fr] md:gap-8 md:py-[30px]${idx === timeline.length - 1 ? " border-b" : ""}`}
            >
              <div>
                <div className="font-mono text-[13px] text-(--accent) tracking-[0.04em]">
                  {t.period}
                </div>
                <div className="font-mono text-[10px] text-(--fg-2) tracking-[0.08em] mt-[5px]">
                  {t.kind}
                </div>
              </div>
              <div>
                <h3 className="font-serif font-normal text-2xl m-0 mb-1.5">
                  {t.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-(--fg-2) m-0 max-w-[62ch]">
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
