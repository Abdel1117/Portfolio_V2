"use client";

import { useState } from "react";
import { useFadeFromBottom } from "@/app/hooks/useFadeIn";
import { useSendContactEmail } from "../hooks/useSendContactEmail";

export default function ContactSection() {
  const titleRef = useFadeFromBottom();
  const bodyRef = useFadeFromBottom();

  const { reset, send, status } = useSendContactEmail();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [formMsg, setFormMsg] = useState<string>("");
  const [errorFormMsg, setErrorFormMSg] = useState<string>("");
  const sending = status === "loading";

  const onField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setFormMsg("");
    setErrorFormMSg("");
    reset();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg("");
    setErrorFormMSg("");
    if (!form.nom.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorFormMSg("⚠ Merci de remplir les champs requis.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorFormMSg("⚠ Adresse email invalide.");
      return;
    }
    setFormMsg("Envoi…");
    const ok = await send({
      name: form.nom.trim(),
      email: form.email.trim(),
      message:
        (form.sujet.trim() ? `[${form.sujet.trim()}] ` : "") +
        form.message.trim(),
    });
    if (ok) {
      setFormMsg("✓ Message envoyé — je vous réponds sous 24 h.");
      setForm({ nom: "", email: "", sujet: "", message: "" });
    } else {
      setErrorFormMSg(
        "⚠ Échec de l'envoi, réessayez ou écrivez-moi directement.",
      );
      setFormMsg("");
    }
  };

  const inputCls =
    "bg-transparent border-none outline-none text-(--fg) font-sans text-base p-0 w-full";
  const labelHeadCls =
    "font-mono text-[10px] tracking-[0.1em] uppercase text-(--fg-2) mb-2";

  return (
    <section
      id="contact"
      className="scroll-mt-[72px] bg-(--bg-2) border-t border-(--line)"
      style={{ transition: "background .45s ease" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:pt-[110px] md:pb-[90px]">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="font-mono text-xs text-(--accent) tracking-[0.1em]">
            ( 07 )
          </span>
          <span className="font-mono text-[11px] text-(--fg-2) tracking-[0.08em]">
            CONTACT
          </span>
        </div>

        <h2
          ref={titleRef}
          className="font-sans font-semibold text-[clamp(44px,8vw,120px)] leading-[0.9] tracking-[-0.04em] m-0 mb-12"
        >
          Travaillons
          <br />
          ensemble<span className="text-(--accent)">.</span>
        </h2>

        <div
          ref={bodyRef}
          className="grid grid-cols-1 gap-10 items-start border-t border-(--line) pt-12 mb-14 md:grid-cols-[1.1fr_0.9fr] md:gap-14"
        >
          <form onSubmit={onSubmit} className="flex flex-col">
            {/* Name + Email */}
            <div className="grid grid-cols-1 border border-(--line) border-b-0 md:grid-cols-2">
              <label className="flex flex-col px-5 py-4.5 border-b border-(--line) md:border-b-0 md:border-r md:border-(--line)">
                <span className={labelHeadCls}>Nom *</span>
                <input
                  name="nom"
                  value={form.nom}
                  onChange={onField}
                  type="text"
                  placeholder="Votre nom"
                  className={inputCls}
                />
              </label>
              <label className="flex flex-col px-5 py-4.5">
                <span className={labelHeadCls}>Email *</span>
                <input
                  name="email"
                  value={form.email}
                  onChange={onField}
                  type="email"
                  placeholder="vous@email.com"
                  className={inputCls}
                />
              </label>
            </div>
            <label className="flex flex-col px-5 py-4.5 border border-(--line) border-b-0">
              <span className={labelHeadCls}>Sujet</span>
              <input
                name="sujet"
                value={form.sujet}
                onChange={onField}
                type="text"
                placeholder="Projet, mission, collaboration…"
                className={inputCls}
              />
            </label>
            <label className="flex flex-col px-5 py-4.5 border border-(--line)">
              <span className={labelHeadCls}>Message *</span>
              <textarea
                name="message"
                value={form.message}
                onChange={onField}
                rows={4}
                placeholder="Parlez-moi de votre projet…"
                className={`${inputCls} resize-y leading-[1.5]`}
              />
            </label>
            <div className="flex items-center gap-[18px] mt-[22px]">
              <button
                type="submit"
                disabled={sending ? true : false}
                className={`btn-solid font-mono text-xs tracking-[0.06em] uppercase bg-(--fg) text-(--bg) px-[26px] py-[15px] border border-(--fg) ${sending ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {sending ? "Envoi…" : "Envoyer le message →"}
              </button>
              <span className="font-mono text-xs text-green-600">
                {formMsg}
              </span>
              <span className="font-mono text-xs text-red-600">
                {errorFormMsg}
              </span>
            </div>
          </form>

          <div className="text-base leading-[1.7] text-(--fg-2)">
            <p className="m-0 mb-6">
              Une idée, une mission ou simplement envie d&apos;échanger ?
              Remplissez le formulaire ou écrivez-moi directement — je réponds
              sous 24&nbsp;h.
            </p>
            <div className="flex flex-col gap-3.5 font-mono text-xs tracking-[0.05em] uppercase">
              <div className="flex justify-between border-t border-(--line) pt-3.5">
                <span>Email</span>
                <a
                  href="mailto:Abderahmane.adjali@live.fr"
                  className="link-muted text-(--fg) normal-case"
                >
                  Abderahmane.adjali@live.fr
                </a>
              </div>
              <div className="flex justify-between border-t border-(--line) pt-3.5">
                <span>Téléphone</span>
                <a href="tel:+33612638716" className="link-muted text-(--fg)">
                  +33 6 12 63 87 16
                </a>
              </div>
              <div className="flex justify-between border-t border-(--line) pt-3.5">
                <span>Localisation</span>
                <span className="text-(--fg)">Paris · FR</span>
              </div>
              <div className="flex justify-between border-t border-(--line) pt-3.5">
                <span>Statut</span>
                <span className="text-(--fg)">Disponible</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-end gap-10 border-t border-(--line) pt-10">
          <a
            href="mailto:Abderahmane.adjali@live.fr"
            className="email-big font-serif text-[clamp(22px,2.6vw,34px)] border-b border-(--fg) pb-1"
          >
            Abderahmane.adjali@live.fr
          </a>
          <div className="flex gap-7 font-mono text-xs tracking-[0.06em] uppercase">
            <a
              href="https://github.com/Abdel1117"
              target="_blank"
              className="contact-link text-(--fg-2)"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/abderahmane-adjali-bb2972212/"
              target="_blank"
              className="contact-link text-(--fg-2)"
            >
              LinkedIn ↗
            </a>
            <a
              href="/images/cv/CV__Abderahmane_Adjali_Developpeur_Full_Stack.pdf"
              target="_blank"
              className="contact-link text-(--fg-2)"
              rel="noopener noreferrer"
            >
              CV (PDF) ↗
            </a>
          </div>
        </div>
      </div>

      <footer className="max-w-[1280px] mx-auto px-5 md:px-8 py-7 border-t border-(--line) flex flex-wrap justify-between gap-3.5 font-mono text-[11px] tracking-wider text-(--fg-2) uppercase">
        <span>© 2026 Abderahmane Adjali</span>
        <span>Développeur Full Stack · Paris, FR</span>
        <a href="#accueil" className="contact-link">
          ↑ Haut de page
        </a>
      </footer>
    </section>
  );
}
