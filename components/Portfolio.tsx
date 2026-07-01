"use client";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import HeroSection from "./HeroSection";
import MarqueeBar from "./MarqueeBar";
import AboutSection from "./AboutSection";
import ExpertiseSection from "./ExpertiseSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import TimelineSection from "./TimelineSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      const t = localStorage.getItem("aa-portfolio-theme");
      if (t === "light" || t === "dark") setTheme(t);
    } catch {}
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(hover: none)").matches) return;
    const targets: [HTMLElement, number][] = [];
    document
      .querySelectorAll<HTMLElement>("#competences .tile")
      .forEach((e) => targets.push([e, 7]));
    document
      .querySelectorAll<HTMLElement>("#projets article > div:first-child")
      .forEach((e) => targets.push([e, 6]));
    const cleanups: (() => void)[] = [];
    targets.forEach(([el, max]) => {
      el.style.transformStyle = "preserve-3d";
      el.style.willChange = "transform";
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = "transform .08s linear";
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(8px)`;
      };
      const onLeave = () => {
        el.style.transition = "transform .55s cubic-bezier(.22,1,.36,1)";
        el.style.transform = "";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("aa-portfolio-theme", next);
      } catch {}
      return next;
    });
  };

  return (
    <div
      data-theme={theme}
      className="bg-theme text-theme font-sans min-h-screen overflow-x-hidden"
      style={{ transition: "background .45s ease, color .45s ease" }}
    >
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <HeroSection />
      <MarqueeBar />
      <AboutSection />
      <ExpertiseSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
