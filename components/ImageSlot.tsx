"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drag-and-drop / click image placeholder that persists to localStorage.
 * Replaces the <image-slot> web component from the original.
 */
export default function ImageSlot({
  id,
  placeholder = "Déposez une image",
  style,
}: {
  id: string;
  placeholder?: string;
  style?: React.CSSProperties;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const storageKey = "img-slot-" + id;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setSrc(saved);
    } catch {}
  }, [storageKey]);

  const handleFile = (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = String(reader.result);
      setSrc(data);
      try {
        localStorage.setItem(storageKey, data);
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
      style={{
        position: "relative",
        cursor: "pointer",
        background: src ? "transparent" : "rgba(255,255,255,0.04)",
        outline: over ? "2px dashed rgba(255,255,255,0.5)" : "none",
        outlineOffset: -2,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Visuel du portfolio"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span
          style={{
            fontFamily: "'IBM Plex Mono',monospace",
            fontSize: 12,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          {placeholder}
        </span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
        style={{ display: "none" }}
      />
    </div>
  );
}
