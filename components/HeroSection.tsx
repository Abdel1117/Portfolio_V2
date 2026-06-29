"use client";

import { useEffect, useState } from "react";
import NetworkCanvas from "./NetworkCanvas";
import ImageSlot from "./ImageSlot";

export default function HeroSection() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Europe/Paris",
          }),
        );
      } catch {}
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="accueil">
      {/* Dark hero panel */}
      <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-center">
        <NetworkCanvas />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_90%_at_50%_0%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

        {/* Showreel bar */}
        <div className="absolute top-[66px] md:top-[92px] left-0 right-0 z-[2] max-w-[1280px] mx-auto px-6 md:px-8 flex items-center gap-3.5 font-mono text-xs tracking-[0.12em] uppercase text-white/70">
          <span>Showreel</span>
          <span className="flex-1 h-px bg-white/[0.18]" />
          <span>2026</span>
        </div>

        {/* Side-by-side body */}
        <div className="relative z-[2] max-w-[1280px] w-full mx-auto px-5 sm:px-6 md:px-8 pt-[90px] pb-12 sm:pt-[110px] sm:pb-[60px] md:pt-[150px] md:pb-[90px] text-white flex flex-col md:flex-row items-center gap-9 md:gap-16">
          <div className="flex-1 min-w-0 w-full">
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-white/65 mb-[22px]">
              Portfolio — Développeur Web Full Stack
            </div>
            <h1 className="font-sans font-semibold text-[clamp(40px,6vw,88px)] leading-[0.88] tracking-[-0.045em] m-0">
              Abderahmane
              <br />
              Adjali<span className="text-white">.</span>
            </h1>
          </div>

          <div className="flex-1 min-w-0 w-full">
            <ImageSlot
              id="hero-photo"
              placeholder="Déposez une image (votre photo, un visuel…)"
              style={{
                width: "100%",
                height: "clamp(280px,42vh,500px)",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.16)",
              }}
            />
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#apropos"
          className="absolute bottom-[26px] right-5 md:right-8 z-[2] font-mono text-[11px] tracking-[0.1em] uppercase text-white/70 flex flex-col items-center gap-2"
        >
          <span>Défiler</span>
          <span style={{ animation: "aaPulse 1.8s ease-in-out infinite" }}>
            ↓
          </span>
        </a>
      </div>

      {/* Info strip below the dark panel */}
      <div className="max-w-[1280px] mx-auto px-5 py-10 sm:px-6 sm:py-[60px] md:px-8 md:py-[90px]">
        <div className="flex flex-wrap justify-between items-end gap-12">
          <div data-reveal="left" className="max-w-[46ch]">
            <p className="font-mono text-[13px] tracking-[0.06em] uppercase text-(--accent) m-0 mb-[22px]">
              Développeur Full Stack — React / FastAPI
            </p>
            <p className="text-lg leading-[1.6] text-(--fg) m-0">
              Je conçois et développe des applications web performantes, de
              l&apos;architecture back-end jusqu&apos;à l&apos;interface.{" "}
              <em className="font-serif italic text-[20px]">
                Du code propre, des produits qui durent.
              </em>
            </p>
            <div className="flex gap-3.5 mt-[34px]">
              <a
                href="#projets"
                className="btn-solid font-mono text-xs tracking-[0.06em] uppercase bg-(--fg) text-(--bg) px-[22px] py-[14px] border border-(--fg)"
              >
                Voir mes projets →
              </a>
              <a
                href="#contact"
                className="btn-ghost font-mono text-xs tracking-[0.06em] uppercase bg-transparent text-(--fg) px-[22px] py-[14px] border border-(--line)"
              >
                Me contacter
              </a>
            </div>
          </div>

          <div
            data-reveal="right"
            className="font-mono text-xs leading-[2.2] text-(--fg-2) text-right"
          >
            <div className="flex justify-end gap-[18px]">
              <span>LOCALISATION</span>
              <span className="text-(--fg)">PARIS · FR</span>
            </div>
            <div className="flex justify-end gap-[18px]">
              <span>HEURE LOCALE</span>
              <span className="text-(--fg)">{time}</span>
            </div>
            <div className="flex justify-end items-center gap-[18px]">
              <span>STATUT</span>
              <span className="text-(--fg) inline-flex items-center gap-[7px]">
                <span className="w-2 h-2 rounded-full bg-(--fg)" />
                DISPONIBLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
