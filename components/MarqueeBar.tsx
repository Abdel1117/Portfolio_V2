import { marqueeItems } from "./data";

export default function MarqueeBar() {
  return (
    <div
      className="border-b border-(--line) bg-(--fg) text-(--bg) overflow-hidden py-4.5"
      style={{ transition: "background .45s ease, color .45s ease" }}
    >
      <div
        className="flex w-max font-sans font-semibold text-[clamp(22px,3vw,38px)] tracking-[-0.02em] whitespace-nowrap"
        style={{ animation: "aaMarquee 28s linear infinite" }}
      >
        {[0, 1].map((dup) => (
          <span key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {marqueeItems.map((it, i) => (
              <span key={i} className="flex items-center">
                <span className="px-7">{it}</span>
                <span className="opacity-40">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
