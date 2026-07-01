"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export default function Nav({ theme, onToggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const topBtnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const ids = [
      "apropos",
      "expertise",
      "competences",
      "projets",
      "parcours",
      "contact",
    ];
    const links: Record<string, HTMLAnchorElement> = {};
    document
      .querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')
      .forEach((a) => {
        links[(a.getAttribute("href") || "").slice(1)] = a;
      });
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight || 1;
      const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      if (progressRef.current) progressRef.current.style.width = pct + "%";
      if (topBtnRef.current) {
        const show = window.scrollY > window.innerHeight * 0.6;
        const b = topBtnRef.current;
        b.style.opacity = show ? "1" : "0";
        b.style.transform = show ? "none" : "translateY(12px)";
        b.style.pointerEvents = show ? "auto" : "none";
      }
      let active = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4)
          active = id;
      }
      ids.forEach((id) => {
        const a = links[id];
        if (a) a.classList.toggle("active", id === active);
      });
    };
    window.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("scroll", onScroll, {
        capture: true,
      } as EventListenerOptions);
    };
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3.5 md:gap-6 px-5 py-3.5 md:px-8 md:py-4 font-mono text-xs tracking-wider border-b border-(--line) backdrop-blur-[14px]"
        style={{
          background: "color-mix(in srgb, var(--bg) 82%, transparent)",
          transition: "background .45s ease",
        }}
      >
        <a
          href="#accueil"
          className="flex items-center gap-2.5 font-medium uppercase"
        >
          <span className="inline-block w-2.25 h-2.25 bg-(--accent) rounded-full" />
          A.&nbsp;Adjali
        </a>

        <div className={`nav__links${menuOpen ? " open" : ""}`}>
          <a href="#apropos" className="navlink uppercase" onClick={close}>
            À propos
          </a>
          <a href="#expertise" className="navlink uppercase" onClick={close}>
            Expertise
          </a>
          <a href="#competences" className="navlink uppercase" onClick={close}>
            Compétences
          </a>
          <a href="#projets" className="navlink uppercase" onClick={close}>
            Projets
          </a>
          <a href="#parcours" className="navlink uppercase" onClick={close}>
            Parcours
          </a>
          <a href="#contact" className="navlink uppercase" onClick={close}>
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            className="nav__burger font-mono"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
          <button
            onClick={onToggleTheme}
            className="btn-ghost font-mono text-[11px] tracking-[0.08em] uppercase bg-transparent text-(--fg) border border-(--line) px-3 py-2 cursor-pointer"
          >
            {theme === "dark" ? "☀ Clair" : "☾ Sombre"}
          </button>
        </div>

        <div
          ref={progressRef}
          className="absolute left-0 -bottom-px h-0.5 w-0 bg-(--fg)"
          style={{ transition: "width .12s linear" }}
        />
      </nav>

      <a
        ref={topBtnRef}
        href="#accueil"
        aria-label="Haut de page"
        className="btn-solid fixed bottom-6.5 right-6.5 z-60 w-12 h-12 flex items-center justify-center bg-(--fg) text-(--bg) border border-(--fg) text-lg opacity-0 translate-y-3 pointer-events-none"
        style={{
          transition: "opacity .3s, transform .3s, background .45s ease",
        }}
      >
        ↑
      </a>
    </>
  );
}
