"use client";

import SectionHeader from "./SectionHeader";
import { testimonials } from "./data";
import { useFadeFromBottom } from "@/hooks/useFadeIn";

export default function TestimonialsSection() {
  const ref = useFadeFromBottom();

  return (
    <section
      id="temoignages"
      className="scroll-mt-[72px] max-w-[1280px] mx-auto px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:py-[100px]"
    >
      <SectionHeader title="Témoignages" tag="RETOURS" />
      <div
        ref={ref}
        className="grid grid-cols-1 gap-px md:grid-cols-2 bg-(--line) border border-(--line)"
      >
        {testimonials.map((tm) => (
          <blockquote key={tm.author} className="bg-(--bg) m-0 p-11">
            <p className="font-serif font-normal italic text-[clamp(22px,2.5vw,28px)] leading-[1.4] m-0 mb-7">
              {tm.quote}
            </p>
            <footer className="font-mono text-xs tracking-[0.05em] text-(--fg-2) uppercase">
              {tm.author}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
