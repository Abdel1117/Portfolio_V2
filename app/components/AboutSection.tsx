"use client";

import SectionHeader from "./SectionHeader";
import { useFadeFromBottom, useCountUp } from "@/app/hooks/useFadeIn";

function StatItem({
  target,
  decimals = 0,
  suffix = "",
  label,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  label: string;
}) {
  const valueRef = useCountUp<HTMLDivElement>(target, { decimals, suffix });

  return (
    <div>
      <div ref={valueRef} className="text-[32px] text-(--fg)">
        0
      </div>
      <div className="text-[11px] tracking-[0.06em] uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useFadeFromBottom();

  return (
    <section
      id="apropos"
      className="scroll-mt-[72px] max-w-[1280px] mx-auto px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:py-[100px]"
    >
      <SectionHeader title="À propos" tag="PRÉSENTATION" />
      <div
        ref={ref}
        className="grid grid-cols-1 gap-9 md:grid-cols-[1.3fr_1fr] md:gap-16 items-start"
      >
        <p className="font-serif font-normal text-[clamp(24px,3vw,34px)] leading-[1.35] tracking-[-0.01em] m-0">
          Développeur full-stack à dominante back-end Python, je conçois et
          livre des fonctionnalités{" "}
          <em className="italic text-(--accent)">end-to-end</em>, fiables et
          bien industrialisées.
        </p>
        <div className="text-base leading-[1.7] text-(--fg-2)">
          <p className="m-0 mb-[18px]">
            4 ans d&apos;expérience, dont 2,5 ans chez Crédit Agricole
            Assurances, sur des applications internes et des environnements SaaS
            — back-end FastAPI / Django, front React / TypeScript / Redux.
          </p>
          <p className="m-0">
            Habitué à la livraison fréquente en production, à
            l&apos;industrialisation (Docker, Jenkins, SonarQube) et à
            l&apos;amélioration continue de la qualité logicielle — jusqu&apos;à
            85 % de couverture back-end.
          </p>
          <div className="flex gap-10 mt-[34px] font-mono">
            <StatItem target={4} label="Ans d'expérience" />
            <StatItem target={100} suffix="%" label="de satisfaction" />
            <StatItem
              target={2.5}
              decimals={1}
              label="Ans chez CA Assurances"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
