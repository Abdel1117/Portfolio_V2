type Props = { num: string; title: string; tag: string };

export default function SectionHeader({ num, title, tag }: Props) {
  return (
    <div data-reveal className="mb-14">
      <div className="flex items-baseline gap-4 pb-4.5">
        <span className="font-mono text-xs text-(--accent) tracking-widest">
          {num}
        </span>
        <h2 className="font-serif font-normal text-[clamp(30px,5vw,54px)] m-0 leading-none">
          <span className="aa-clip">
            <span>{title}</span>
          </span>
        </h2>
        <span className="ml-auto font-mono text-[11px] text-(--fg-2) tracking-[0.08em]">
          {tag}
        </span>
      </div>
      <div data-line className="h-px bg-(--line)" />
    </div>
  );
}
