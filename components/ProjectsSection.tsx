"use client";

import SectionHeader from "./SectionHeader";
import { chipSm } from "./styles";
import { projects, type Project } from "./data";
import { useFadeFromBottom } from "@/hooks/useFadeIn";

export default function ProjectsSection() {
  return (
    <section
      id="projets"
      className="scroll-mt-[72px] max-w-[1280px] mx-auto px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:py-[100px]"
    >
      <SectionHeader title="Projets" tag="SÉLECTION · 04" />
      <div className="flex flex-col">
        {projects.map((p, idx) => (
          <ProjectCard key={p.n} p={p} isLast={idx === projects.length - 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, isLast }: { p: Project; isLast: boolean }) {
  const ref = useFadeFromBottom();

  const previewBlock = (
    <div
      className={`${p.flip ? "md:order-2" : "md:order-1"} aspect-[16/11] bg-(--bg-2) border border-(--line) relative overflow-hidden flex items-end justify-between p-[18px]`}
    >
      <span className="font-sans font-bold text-[clamp(60px,9vw,120px)] leading-[0.8] text-(--line) absolute top-[6px] left-[14px]">
        {p.n}
      </span>
      <span className="font-mono text-[11px] text-(--fg-2) relative">
        [ aperçu — {p.preview} ]
      </span>
      <span className="font-mono text-[11px] text-(--fg-2) relative">↗</span>
    </div>
  );

  const textBlock = (
    <div className={p.flip ? "md:order-1" : "md:order-2"}>
      <div className="flex justify-between font-mono text-xs text-(--fg-2) tracking-[0.05em] mb-[18px]">
        <span>{p.n}</span>
        <span>{p.kind}</span>
      </div>
      <h3 className="font-serif font-normal text-[clamp(28px,3.4vw,40px)] m-0 mb-4 leading-[1.05]">
        {p.title}
      </h3>
      <p className="text-base leading-[1.65] text-(--fg-2) m-0 mb-[22px] max-w-[48ch]">
        {p.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className={chipSm}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <article
      ref={ref}
      className={`proj grid grid-cols-1 gap-5 py-9 border-t border-(--line) items-center md:grid-cols-2 md:gap-12 md:py-12${isLast ? " border-b" : ""}`}
    >
      {/* image DOM-first so the 3D-tilt selector (div:first-child) hits it */}
      {previewBlock}
      {textBlock}
    </article>
  );
}
