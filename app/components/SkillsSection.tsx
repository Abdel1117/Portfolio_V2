import SectionHeader from "./SectionHeader";
import { chipMd } from "./styles";
import { skills } from "./data";
import { useStaggerReveal } from "@/app/hooks/useFadeIn";

export default function SkillsSection() {
  const gridRef = useStaggerReveal({ stagger: 0.18 });

  return (
    <section
      id="competences"
      className="scroll-mt-[72px] bg-(--bg-2) border-t border-(--line) border-b"
      style={{ transition: "background .45s ease" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:py-[100px]">
        <SectionHeader title="Compétences" tag="STACK TECHNIQUE" />
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-[14px]"
        >
          {skills.map((s) => (
            <div
              key={s.n}
              className="tile col-span-1 md:[grid-column:var(--col-span)] bg-(--bg) border border-(--line) p-8 rounded-xl"
              style={{ "--col-span": `span ${s.span}` } as React.CSSProperties}
            >
              <div className="flex justify-between items-baseline mb-6">
                <span className="font-mono text-xs tracking-[0.06em] uppercase text-(--fg-2)">
                  // {s.label}
                </span>
                <span className="font-sans font-bold text-[34px] leading-none text-(--line)">
                  {s.n}
                </span>
              </div>
              <div className="flex flex-wrap gap-[9px]">
                {s.tags.map((t) => (
                  <span key={t} className={chipMd}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="tile col-span-1 md:col-span-2 bg-(--fg) text-(--bg) p-8 flex flex-col justify-center">
            <p className="font-serif italic font-normal text-[clamp(20px,2.2vw,26px)] leading-[1.3] m-0">
              « Le bon outil au bon endroit. La technique au service du produit,
              jamais l&apos;inverse. »
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
