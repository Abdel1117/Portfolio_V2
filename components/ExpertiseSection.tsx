import SectionHeader from "./SectionHeader";
import { chipSm } from "./styles";
import { expertise } from "./data";

export default function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="scroll-mt-[72px] bg-(--bg-2) border-t border-(--line) border-b"
      style={{ transition: "background .45s ease" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:py-[100px]">
        <SectionHeader num="( 02 )" title="Expertise" tag="CE QUE JE LIVRE" />
        <p
          data-reveal
          className="font-serif font-normal text-[clamp(22px,3vw,32px)] leading-[1.35] tracking-[-0.01em] m-0 mb-14 max-w-[30ch]"
        >
          Un accompagnement complet,{" "}
          <em className="italic text-(--accent)">
            de la première ligne de code
          </em>{" "}
          jusqu&apos;à la mise en production — et au-delà.
        </p>
        <div
          data-stagger="0.09"
          className="flex flex-col border-t border-(--line)"
        >
          {expertise.map((x) => (
            <article
              key={x.n}
              data-reveal="left"
              className="exp-row grid grid-cols-[40px_1fr] gap-[10px_14px] py-6 border-b border-(--line) items-start md:grid-cols-[64px_1fr_1.15fr_auto] md:gap-7 md:py-9"
            >
              <span className="font-mono text-[13px] text-(--fg-2)">{x.n}</span>
              <h3 className="font-sans font-semibold text-[clamp(22px,2.6vw,30px)] tracking-[-0.02em] m-0">
                {x.title}
              </h3>
              <div className="col-start-2 mt-1 md:col-auto md:mt-0">
                <p className="text-base leading-[1.6] text-(--fg-2) m-0 mb-4">
                  {x.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {x.tags.map((t) => (
                    <span key={t} className={chipSm}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="hidden md:block font-mono text-base text-(--fg-2)">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
