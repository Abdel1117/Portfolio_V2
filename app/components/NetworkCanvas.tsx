"use client";

import { useEffect, useRef } from "react";

/**
 * Animated constellation network for the hero background.
 * Faithful port of the original canvas logic.
 */
export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const LINK = 150;
    const LINK2 = LINK * LINK;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const buildNodes = () => {
      const count = w < 768 ? 200 : 600;
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.6 + 0.8,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = Math.max(1, w * dpr);
      cv.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999, active: false };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (!reduce) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          n.x = Math.max(0, Math.min(w, n.x));
          n.y = Math.max(0, Math.min(h, n.y));
          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 40000 && d2 > 1) {
              const f = 0.6 / Math.sqrt(d2);
              n.vx += dx * f * 0.012;
              n.vy += dy * f * 0.012;
            }
          }
          n.vx = Math.max(-0.8, Math.min(0.8, n.vx));
          n.vy = Math.max(-0.8, Math.min(0.8, n.vy));
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const al = (1 - d2 / LINK2) * 0.22;
            ctx.strokeStyle = "rgba(33, 172, 195, " + al.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2 * 1.6) {
            const al = (1 - d2 / (LINK2 * 1.6)) * 0.4;
            ctx.strokeStyle = "rgba(33, 172, 195, " + al.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(174, 198, 199, 0.7)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
