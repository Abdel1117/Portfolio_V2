"use client";

import { useEffect, useRef, useState } from "react";
import NetworkCanvas from "./NetworkCanvas";
import ImageSlot from "./ImageSlot";
import {
  skills,
  expertise,
  projects,
  timeline,
  testimonials,
  marqueeItems,
} from "./data";

const mono = "'IBM Plex Mono',monospace";
const sans = "'Space Grotesk',sans-serif";
const serif = "'Newsreader',serif";

const chipSm: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  padding: "5px 11px",
  border: "1px solid var(--line)",
  letterSpacing: "0.04em",
};
const chipMd: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 13,
  padding: "7px 13px",
  border: "1px solid var(--line)",
};

function SectionHeader({ num, title, tag }: { num: string; title: string; tag: string }) {
  return (
    <div data-reveal style={{ marginBottom: 56 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, paddingBottom: 18 }}>
        <span style={{ fontFamily: mono, fontSize: 12, color: "var(--accent)", letterSpacing: "0.1em" }}>{num}</span>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(30px,5vw,54px)", margin: 0, lineHeight: 1 }}>
          <span className="aa-clip"><span>{title}</span></span>
        </h2>
        <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 11, color: "var(--fg-2)", letterSpacing: "0.08em" }}>{tag}</span>
      </div>
      <div data-line style={{ height: 1, background: "var(--line)" }} />
    </div>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [time, setTime] = useState("--:--:--");
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [formMsg, setFormMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const progressRef = useRef<HTMLDivElement | null>(null);
  const topBtnRef = useRef<HTMLAnchorElement | null>(null);

  // theme: load from storage
  useEffect(() => {
    try {
      const t = localStorage.getItem("aa-portfolio-theme");
      if (t === "light" || t === "dark") setTheme(t);
    } catch {}
  }, []);

  // live clock (Europe/Paris)
  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Europe/Paris",
          })
        );
      } catch {}
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // reveal on scroll + stagger
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      const step = parseFloat(group.getAttribute("data-stagger") || "") || 0.09;
      let i = 0;
      group.querySelectorAll<HTMLElement>(":scope > [data-reveal]").forEach((child) => {
        child.style.setProperty("--aa-delay", (i * step).toFixed(3) + "s");
        i++;
      });
    });
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("aa-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("aa-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const safety = setTimeout(() => els.forEach((el) => el.classList.add("aa-in")), 2500);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  // scroll: progress bar, back-to-top, scroll-spy
  useEffect(() => {
    const ids = ["apropos", "expertise", "competences", "projets", "parcours", "contact"];
    const links: Record<string, HTMLAnchorElement> = {};
    document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]').forEach((a) => {
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
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) active = id;
      }
      ids.forEach((id) => {
        const a = links[id];
        if (a) a.classList.toggle("active", id === active);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true } as EventListenerOptions);
      document.removeEventListener("scroll", onScroll, { capture: true } as EventListenerOptions);
    };
  }, []);

  // 3D tilt on tiles + project previews
  useEffect(() => {
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    const targets: [HTMLElement, number][] = [];
    document
      .querySelectorAll<HTMLElement>("#competences [data-stagger] > [data-reveal]")
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
        el.style.transform =
          "perspective(900px) rotateX(" +
          (-py * max).toFixed(2) +
          "deg) rotateY(" +
          (px * max).toFixed(2) +
          "deg) translateZ(8px)";
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

  const onField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setFormMsg("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.email.trim() || !form.message.trim()) {
      setFormMsg("⚠ Merci de remplir les champs requis.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormMsg("⚠ Adresse email invalide.");
      return;
    }
    setSending(true);
    setFormMsg("Envoi…");
    setTimeout(() => {
      try {
        const subject = encodeURIComponent(
          form.sujet.trim() || "Contact portfolio — " + form.nom.trim()
        );
        const body = encodeURIComponent(
          form.message.trim() + "\n\n— " + form.nom.trim() + " (" + form.email.trim() + ")"
        );
        window.location.href =
          "mailto:Abderahmane.adjali@live.fr?subject=" + subject + "&body=" + body;
      } catch {}
      setSending(false);
      setFormMsg("✓ Message prêt — votre client mail s'ouvre.");
      setForm({ nom: "", email: "", sujet: "", message: "" });
    }, 600);
  };

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "var(--fg)",
    fontFamily: sans,
    fontSize: 16,
    padding: 0,
  };
  const labelHead: React.CSSProperties = {
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--fg-2)",
    marginBottom: 8,
  };

  return (
    <div
      data-theme={theme}
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: sans,
        minHeight: "100vh",
        transition: "background .45s ease, color .45s ease",
        overflowX: "hidden",
      }}
    >
      {/* NAV */}
      <nav className="nav" style={{ fontFamily: mono }}>
        <a href="#accueil" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500, textTransform: "uppercase" }}>
          <span style={{ display: "inline-block", width: 9, height: 9, background: "var(--accent)", borderRadius: "50%" }} />
          A.&nbsp;Adjali
        </a>
        <div className={`nav__links${menuOpen ? " open" : ""}`}>
          <a href="#apropos"     className="navlink" onClick={() => setMenuOpen(false)} style={{ textTransform: "uppercase" }}>À propos</a>
          <a href="#expertise"   className="navlink" onClick={() => setMenuOpen(false)} style={{ textTransform: "uppercase" }}>Expertise</a>
          <a href="#competences" className="navlink" onClick={() => setMenuOpen(false)} style={{ textTransform: "uppercase" }}>Compétences</a>
          <a href="#projets"     className="navlink" onClick={() => setMenuOpen(false)} style={{ textTransform: "uppercase" }}>Projets</a>
          <a href="#parcours"    className="navlink" onClick={() => setMenuOpen(false)} style={{ textTransform: "uppercase" }}>Parcours</a>
          <a href="#contact"     className="navlink" onClick={() => setMenuOpen(false)} style={{ textTransform: "uppercase" }}>Contact</a>
        </div>
        <div className="nav__actions">
          <button
            className="nav__burger"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Menu"
            style={{ fontFamily: mono }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
          <button
            onClick={toggleTheme}
            className="btn-ghost"
            style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", color: "var(--fg)", border: "1px solid var(--line)", padding: "8px 12px", cursor: "pointer" }}
          >
            {theme === "dark" ? "☀ Clair" : "☾ Sombre"}
          </button>
        </div>
        <div ref={progressRef} style={{ position: "absolute", left: 0, bottom: -1, height: 2, width: "0%", background: "var(--fg)", transition: "width .12s linear" }} />
      </nav>

      {/* BACK TO TOP */}
      <a
        ref={topBtnRef}
        href="#accueil"
        aria-label="Haut de page"
        className="btn-solid"
        style={{
          position: "fixed",
          bottom: 26,
          right: 26,
          zIndex: 60,
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--fg)",
          color: "var(--bg)",
          border: "1px solid var(--fg)",
          fontSize: 18,
          opacity: 0,
          transform: "translateY(12px)",
          pointerEvents: "none",
          transition: "opacity .3s, transform .3s, background .45s ease",
        }}
      >
        ↑
      </a>

      {/* HERO */}
      <section id="accueil" style={{ scrollMarginTop: 0 }}>
        <div className="hero">
          <NetworkCanvas />
          <div className="hero__overlay" />

          <div className="hero__showreel" style={{ fontFamily: mono }}>
            <span>Showreel</span>
            <span className="hero__showreel-line" />
            <span>2026</span>
          </div>

          <div className="hero__body">
            <div className="hero__left">
              <div className="hero__label" style={{ fontFamily: mono }}>
                Portfolio — Développeur Web Full Stack
              </div>
              <h1 style={{
                fontFamily: sans,
                fontWeight: 600,
                fontSize: "clamp(40px,6vw,88px)",
                lineHeight: 0.88,
                letterSpacing: "-0.045em",
                margin: 0,
              }}>
                Abderahmane<br />Adjali<span style={{ color: "#fff" }}>.</span>
              </h1>
            </div>

            <div className="hero__right">
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

          <a href="#apropos" className="hero__scroll" style={{ fontFamily: mono }}>
            <span>Défiler</span>
            <span style={{ animation: "aaPulse 1.8s ease-in-out infinite" }}>↓</span>
          </a>
        </div>

        {/* Info strip */}
        <div className="hero-info">
          <div className="hero-info-row">
            <div data-reveal="left" style={{ maxWidth: "46ch" }}>
              <p style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 22px" }}>
                Développeur Full Stack — React / FastAPI
              </p>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--fg)", margin: 0 }}>
                Je conçois et développe des applications web performantes, de l&apos;architecture back-end jusqu&apos;à l&apos;interface.{" "}
                <em style={{ fontFamily: serif, fontStyle: "italic", fontSize: 20 }}>Du code propre, des produits qui durent.</em>
              </p>
              <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
                <a href="#projets" className="btn-solid" style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", background: "var(--fg)", color: "var(--bg)", padding: "14px 22px", border: "1px solid var(--fg)" }}>
                  Voir mes projets →
                </a>
                <a href="#contact" className="btn-ghost" style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", background: "transparent", color: "var(--fg)", padding: "14px 22px", border: "1px solid var(--line)" }}>
                  Me contacter
                </a>
              </div>
            </div>
            <div data-reveal="right" style={{ fontFamily: mono, fontSize: 12, lineHeight: 2.2, color: "var(--fg-2)", textAlign: "right" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 18 }}>
                <span>LOCALISATION</span><span style={{ color: "var(--fg)" }}>PARIS · FR</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 18 }}>
                <span>HEURE LOCALE</span><span style={{ color: "var(--fg)" }}>{time}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 18 }}>
                <span>STATUT</span>
                <span style={{ color: "var(--fg)", display: "inline-flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--fg)" }} />DISPONIBLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderBottom: "1px solid var(--line)", background: "var(--fg)", color: "var(--bg)", overflow: "hidden", padding: "18px 0", transition: "background .45s ease, color .45s ease" }}>
        <div style={{ display: "flex", width: "max-content", animation: "aaMarquee 28s linear infinite", whiteSpace: "nowrap", fontFamily: sans, fontWeight: 600, fontSize: "clamp(22px,3vw,38px)", letterSpacing: "-0.02em" }}>
          {[0, 1].map((dup) => (
            <span key={dup} style={{ display: "flex", alignItems: "center" }} aria-hidden={dup === 1}>
              {marqueeItems.map((it, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "0 28px" }}>{it}</span>
                  <span style={{ opacity: 0.4 }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* À PROPOS */}
      <section id="apropos" className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", scrollMarginTop: 72 }}>
        <SectionHeader num="( 01 )" title="À propos" tag="PRÉSENTATION" />
        <div data-reveal className="about-grid">
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.35, letterSpacing: "-0.01em", margin: 0 }}>
            Développeur full-stack à dominante back-end Python, je conçois et livre des fonctionnalités{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>end-to-end</em>, fiables et bien industrialisées.
          </p>
          <div style={{ fontSize: 16, lineHeight: 1.7, color: "var(--fg-2)" }}>
            <p style={{ margin: "0 0 18px" }}>4 ans d&apos;expérience, dont 2,5 ans chez Crédit Agricole Assurances, sur des applications internes et des environnements SaaS — back-end FastAPI / Django, front React / TypeScript / Redux.</p>
            <p style={{ margin: 0 }}>Habitué à la livraison fréquente en production, à l&apos;industrialisation (Docker, Jenkins, SonarQube) et à l&apos;amélioration continue de la qualité logicielle — jusqu&apos;à 85 % de couverture back-end.</p>
            <div style={{ display: "flex", gap: 40, marginTop: 34, fontFamily: mono }}>
              {[
                ["4", "Ans d'expérience"],
                ["85%", "Couverture back-end"],
                ["2,5", "Ans chez CA Assurances"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 32, color: "var(--fg)" }}>{v}</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", transition: "background .45s ease" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", scrollMarginTop: 72 }}>
          <SectionHeader num="( 02 )" title="Expertise" tag="CE QUE JE LIVRE" />
          <p data-reveal style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.35, letterSpacing: "-0.01em", margin: "0 0 56px", maxWidth: "30ch" }}>
            Un accompagnement complet, <em style={{ fontStyle: "italic", color: "var(--accent)" }}>de la première ligne de code</em> jusqu&apos;à la mise en production — et au-delà.
          </p>
          <div data-stagger="0.09" style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
            {expertise.map((x) => (
              <article
                key={x.n}
                data-reveal="left"
                className="exp-row"
              >
                <span style={{ fontFamily: mono, fontSize: 13, color: "var(--fg-2)" }}>{x.n}</span>
                <h3 style={{ fontFamily: sans, fontWeight: 600, fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-0.02em", margin: 0 }}>{x.title}</h3>
                <div>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--fg-2)", margin: "0 0 16px" }}>{x.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {x.tags.map((t) => (
                      <span key={t} style={chipSm}>{t}</span>
                    ))}
                  </div>
                </div>
                <span style={{ fontFamily: mono, fontSize: 16, color: "var(--fg-2)" }}>↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section id="competences" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", transition: "background .45s ease" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", scrollMarginTop: 72 }}>
          <SectionHeader num="( 03 )" title="Compétences" tag="STACK TECHNIQUE" />
          <div data-stagger="0.08" className="skills-grid">
            {skills.map((s) => (
              <div
                key={s.n}
                data-reveal
                className="tile"
                style={{ gridColumn: "span " + s.span, background: "var(--bg)", border: "1px solid var(--line)", padding: 32, transition: "transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                  <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)" }}>// {s.label}</span>
                  <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 34, lineHeight: 1, color: "var(--line)" }}>{s.n}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                  {s.tags.map((t) => (
                    <span key={t} style={chipMd}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
            <div data-reveal className="tile" style={{ gridColumn: "span 2", background: "var(--fg)", color: "var(--bg)", padding: 32, display: "flex", flexDirection: "column", justifyContent: "center", transition: "transform .35s cubic-bezier(.22,1,.36,1)" }}>
              <p style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(20px,2.2vw,26px)", lineHeight: 1.3, margin: 0 }}>
                « Le bon outil au bon endroit. La technique au service du produit, jamais l&apos;inverse. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", scrollMarginTop: 72 }}>
        <SectionHeader num="( 04 )" title="Projets" tag="SÉLECTION · 04" />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {projects.map((p, idx) => {
            const previewBlock = (
              <div style={{ order: p.flip ? 2 : 1, aspectRatio: "16 / 11", background: "var(--bg-2)", border: "1px solid var(--line)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: 18 }}>
                <span style={{ fontFamily: sans, fontWeight: 700, fontSize: "clamp(60px,9vw,120px)", lineHeight: 0.8, color: "var(--line)", position: "absolute", top: 6, left: 14 }}>{p.n}</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: "var(--fg-2)", position: "relative" }}>[ aperçu — {p.preview} ]</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: "var(--fg-2)", position: "relative" }}>↗</span>
              </div>
            );
            const textBlock = (
              <div style={{ order: p.flip ? 1 : 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, color: "var(--fg-2)", letterSpacing: "0.05em", marginBottom: 18 }}>
                  <span>{p.n}</span><span>{p.kind}</span>
                </div>
                <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(28px,3.4vw,40px)", margin: "0 0 16px", lineHeight: 1.05 }}>{p.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)", margin: "0 0 22px", maxWidth: "48ch" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={chipSm}>{t}</span>
                  ))}
                </div>
              </div>
            );
            return (
              <article
                key={p.n}
                data-reveal
                className="proj"
                style={{ borderBottom: idx === projects.length - 1 ? "1px solid var(--line)" : undefined }}
              >
                {/* image is always DOM-first so the tilt selector (div:first-child) hits it */}
                {previewBlock}
                {textBlock}
              </article>
            );
          })}
        </div>
      </section>

      {/* PARCOURS */}
      <section id="parcours" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", transition: "background .45s ease" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", scrollMarginTop: 72 }}>
          <SectionHeader num="( 05 )" title="Parcours" tag="EXPÉRIENCE & FORMATION" />
          <div data-stagger="0.1" style={{ display: "flex", flexDirection: "column" }}>
            {timeline.map((t, idx) => (
              <div
                key={t.title}
                data-reveal="left"
                className="timeline-row"
                style={{ borderBottom: idx === timeline.length - 1 ? "1px solid var(--line)" : undefined }}
              >
                <div>
                  <div style={{ fontFamily: mono, fontSize: 13, color: "var(--accent)", letterSpacing: "0.04em" }}>{t.period}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: "var(--fg-2)", letterSpacing: "0.08em", marginTop: 5 }}>{t.kind}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 24, margin: "0 0 6px" }}>{t.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)", margin: 0, maxWidth: "62ch" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", scrollMarginTop: 72 }}>
        <SectionHeader num="( 06 )" title="Témoignages" tag="RETOURS" />
        <div data-reveal className="testimonials-grid">
          {testimonials.map((tm) => (
            <blockquote key={tm.author} style={{ background: "var(--bg)", margin: 0, padding: 44 }}>
              <p style={{ fontFamily: serif, fontWeight: 400, fontStyle: "italic", fontSize: "clamp(22px,2.5vw,28px)", lineHeight: 1.4, margin: "0 0 28px" }}>{tm.quote}</p>
              <footer style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.05em", color: "var(--fg-2)", textTransform: "uppercase" }}>{tm.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", transition: "background .45s ease" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "110px 32px 90px", scrollMarginTop: 72 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 48 }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: "var(--accent)", letterSpacing: "0.1em" }}>( 07 )</span>
            <span style={{ fontFamily: mono, fontSize: 11, color: "var(--fg-2)", letterSpacing: "0.08em" }}>CONTACT</span>
          </div>
          <h2 data-reveal style={{ fontFamily: sans, fontWeight: 600, fontSize: "clamp(44px,8vw,120px)", lineHeight: 0.9, letterSpacing: "-0.04em", margin: "0 0 48px" }}>
            Travaillons<br />ensemble<span style={{ color: "var(--accent)" }}>.</span>
          </h2>

          <div data-reveal className="contact-grid">
            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div className="contact-form-row">
                <label style={{ display: "flex", flexDirection: "column", padding: "18px 20px", borderRight: "1px solid var(--line)" }}>
                  <span style={labelHead}>Nom *</span>
                  <input name="nom" value={form.nom} onChange={onField} type="text" placeholder="Votre nom" style={inputStyle} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", padding: "18px 20px" }}>
                  <span style={labelHead}>Email *</span>
                  <input name="email" value={form.email} onChange={onField} type="email" placeholder="vous@email.com" style={inputStyle} />
                </label>
              </div>
              <label style={{ display: "flex", flexDirection: "column", padding: "18px 20px", border: "1px solid var(--line)", borderBottom: "none" }}>
                <span style={labelHead}>Sujet</span>
                <input name="sujet" value={form.sujet} onChange={onField} type="text" placeholder="Projet, mission, collaboration…" style={inputStyle} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", padding: "18px 20px", border: "1px solid var(--line)" }}>
                <span style={labelHead}>Message *</span>
                <textarea name="message" value={form.message} onChange={onField} rows={4} placeholder="Parlez-moi de votre projet…" style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }} />
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 22 }}>
                <button type="submit" className="btn-solid" style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", background: "var(--fg)", color: "var(--bg)", padding: "15px 26px", border: "1px solid var(--fg)", cursor: "pointer" }}>
                  {sending ? "Envoi…" : "Envoyer le message →"}
                </button>
                <span style={{ fontFamily: mono, fontSize: 12, color: "var(--fg-2)" }}>{formMsg}</span>
              </div>
            </form>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: "var(--fg-2)" }}>
              <p style={{ margin: "0 0 24px" }}>Une idée, une mission ou simplement envie d&apos;échanger ? Remplissez le formulaire ou écrivez-moi directement — je réponds sous 24&nbsp;h.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, fontFamily: mono, fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14 }}><span>Email</span><a href="mailto:Abderahmane.adjali@live.fr" className="link-muted" style={{ color: "var(--fg)", textTransform: "none" }}>Abderahmane.adjali@live.fr</a></div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14 }}><span>Téléphone</span><a href="tel:+33612638716" className="link-muted" style={{ color: "var(--fg)" }}>+33 6 12 63 87 16</a></div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14 }}><span>Localisation</span><span style={{ color: "var(--fg)" }}>Paris · FR</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14 }}><span>Statut</span><span style={{ color: "var(--fg)" }}>Disponible</span></div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 40, borderTop: "1px solid var(--line)", paddingTop: 40 }}>
            <a href="mailto:Abderahmane.adjali@live.fr" className="email-big" style={{ fontFamily: serif, fontSize: "clamp(22px,2.6vw,34px)", borderBottom: "1px solid var(--fg)", paddingBottom: 4 }}>Abderahmane.adjali@live.fr</a>
            <div style={{ display: "flex", gap: 28, fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <a href="#" className="contact-link" style={{ color: "var(--fg-2)" }}>GitHub ↗</a>
              <a href="#" className="contact-link" style={{ color: "var(--fg-2)" }}>LinkedIn ↗</a>
              <a href="#" className="contact-link" style={{ color: "var(--fg-2)" }}>CV (PDF) ↗</a>
            </div>
          </div>
        </div>
        <footer style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px", borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 14, fontFamily: mono, fontSize: 11, letterSpacing: "0.05em", color: "var(--fg-2)", textTransform: "uppercase" }}>
          <span>© 2026 Abderahmane Adjali</span>
          <span>Développeur Full Stack · Paris, FR</span>
          <a href="#accueil" className="contact-link">↑ Haut de page</a>
        </footer>
      </section>
    </div>
  );
}
