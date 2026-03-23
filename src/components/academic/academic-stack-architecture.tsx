import { useState, useEffect, useRef } from "react";
import { projectData } from "@/data/projectData";
import { ArchGlyph } from "./pixel-glyphs";

const mono = "ui-monospace, monospace";
const pixel = '"Press Start 2P", cursive';

export function AcademicStackArchitecture({
  className = "",
  scrollRoot,
}: {
  className?: string;
  scrollRoot?: React.RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, root: scrollRoot?.current ?? null }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

  const revealStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: "all 800ms ease-out",
    transitionDelay: visible ? `${delay}ms` : "0ms",
  });

  return (
    <section
      ref={sectionRef}
      className={`snap-start w-full min-h-screen flex items-center justify-center px-8 md:px-16 bg-black relative overflow-hidden ${className}`}
    >
      <div
        className="absolute transition-all duration-600 ease-out hidden md:block"
        style={{
          top: 40, right: 40,
          opacity: visible ? 0.35 : 0,
          transform: visible ? "translateY(0)" : "translateY(6px)",
          transitionDelay: visible ? "100ms" : "0ms",
          fontFamily: mono, fontSize: "11px", color: "white",
          letterSpacing: "0.12em", zIndex: 10,
        }}
      >
        FIG 3.3 — ARCHITECTURE
      </div>

      <div style={{ maxWidth: 880, width: "100%" }}>
        <h2 style={{
          ...revealStyle(200),
          fontFamily: pixel,
          fontSize: "clamp(18px, 3.5vw, 28px)",
          lineHeight: 1.4, color: "white", marginBottom: 32,
        }}>
          Technical Architecture
        </h2>

        {/* 2×2 bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={revealStyle(350)}>
          {/* Channels */}
          <div
            className="transition-all duration-300 hover:border-white/20"
            style={{ ...revealStyle(400), border: "1px solid rgba(255,255,255,0.08)", padding: "28px 24px", display: "flex", gap: 24, alignItems: "flex-start" }}
          >
            <div style={{ flexShrink: 0 }}><ArchGlyph theme="messaging" visible={visible} /></div>
            <div>
              <h3 style={{ fontFamily: mono, fontSize: 12, color: "white", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "bold", marginBottom: 10 }}>
                Three Channels
              </h3>
              <p style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                Telegram bot via webhook, installable PWA with NDJSON streaming, and live voice calls via Gemini Live WebSocket. All channels share the same agent and memory.
              </p>
            </div>
          </div>

          {/* Edge Functions */}
          <div
            className="transition-all duration-300 hover:border-white/20"
            style={{ ...revealStyle(550), border: "1px solid rgba(255,255,255,0.08)", padding: "28px 24px", display: "flex", gap: 24, alignItems: "flex-start" }}
          >
            <div style={{ flexShrink: 0 }}><ArchGlyph theme="dashboard" visible={visible} /></div>
            <div>
              <h3 style={{ fontFamily: mono, fontSize: 12, color: "white", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "bold", marginBottom: 10 }}>
                10 Edge Functions
              </h3>
              <p style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                Supabase Edge Functions on Deno. orchid-agent (core AI loop), telegram-bot, pwa-agent, call-session, summarise-call, proactive-agent, demo-agent, api, and more.
              </p>
            </div>
          </div>

          {/* Stack — 3-col sub-grid */}
          <div
            className="transition-all duration-300 hover:border-white/20"
            style={{ ...revealStyle(700), border: "1px solid rgba(255,255,255,0.08)", padding: "28px 24px", display: "flex", gap: 24, alignItems: "flex-start" }}
          >
            <div style={{ flexShrink: 0 }}><ArchGlyph theme="stack" visible={visible} /></div>
            <div>
              <h3 style={{ fontFamily: mono, fontSize: 12, color: "white", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "bold", marginBottom: 10 }}>
                Technology Stack
              </h3>
              <div className="grid grid-cols-3 gap-4" style={{ marginTop: 4 }}>
                {[
                  { cat: "AI", items: ["Gemini 3 Flash & Pro", "Gemini Live (voice)", "Perplexity Sonar"] },
                  { cat: "BACKEND", items: ["Supabase PostgreSQL", "Edge Functions (Deno)", "Auth · Storage · RLS"] },
                  { cat: "FRONTEND", items: ["React + TypeScript", "PixiJS Pixel Canvas", "Tailwind + Framer"] },
                ].map((stack) => (
                  <div key={stack.cat}>
                    <p style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", marginBottom: 6 }}>{stack.cat}</p>
                    {stack.items.map((item) => (
                      <p key={item} style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 3, lineHeight: 1.5 }}>{item}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data & Security */}
          <div
            className="transition-all duration-300 hover:border-white/20"
            style={{ ...revealStyle(850), border: "1px solid rgba(255,255,255,0.08)", padding: "28px 24px", display: "flex", gap: 24, alignItems: "flex-start" }}
          >
            <div style={{ flexShrink: 0 }}><ArchGlyph theme="launch" visible={visible} /></div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: mono, fontSize: 12, color: "white", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "bold", marginBottom: 10 }}>
                Data & Security
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  "PostgreSQL 15 · 19 tables · RLS on all",
                  "5-tier hierarchical memory system",
                  "24 agent tools across 8 categories",
                  "HMAC auth · ephemeral tokens · SHA-256 API keys",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>✓</span>
                    <p style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code highlights */}
        <div className="flex flex-col gap-3" style={{ ...revealStyle(1000), marginTop: 24 }}>
          {projectData.codeHighlights.map((snippet, i) => (
            <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: mono, fontSize: 11, color: "white", fontWeight: "bold" }}>{snippet.title}</p>
                  <p style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{snippet.note}</p>
                </div>
                <span style={{ fontFamily: mono, fontSize: 9, color: "rgba(74,222,128,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>{snippet.language}</span>
              </div>
              <pre style={{
                margin: 0, padding: "16px 20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                fontFamily: mono, fontSize: 10,
                color: "rgba(255,255,255,0.45)", lineHeight: 1.6,
                overflowX: "auto", background: "rgba(255,255,255,0.02)",
              }}>
                <code>{snippet.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
