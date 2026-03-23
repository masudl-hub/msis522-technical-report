import { useState, useEffect, useRef } from "react";
import { projectData } from "@/data/projectData";
import { TechGlyph } from "./pixel-glyphs";

const mono = "ui-monospace, monospace";
const pixel = '"Press Start 2P", cursive';

const FEATURES: { title: string; desc: string; fig: string; span: number; glyph: 'eye' | 'chat' | 'brain' | 'bell' }[] = [
  {
    title: "Multi-Modal AI",
    desc: "Gemini 3 & Perplexity Sonar process photos, text, and voice. 98%+ species identification accuracy. Real-time health diagnosis from a single image sent via Telegram or the web.",
    fig: "",
    span: 2,
    glyph: "eye",
  },
  {
    title: "Conversational Interface",
    desc: "No app to download, no learning curve. Natural language via Telegram, PWA, or live voice call. Send a photo, ask a question, get expert advice. Supports text, images, voice, and video.",
    fig: "",
    span: 2,
    glyph: "chat",
  },
  {
    title: "Hierarchical Memory",
    desc: "Every conversation compresses into persistent context. Learns your habits, environment, light conditions, and pet safety concerns. Advice evolves with each interaction — no two users are treated the same.",
    fig: "",
    span: 2,
    glyph: "brain",
  },
  {
    title: "Proactive Intelligence",
    desc: "Frost warnings, seasonal tips, fertilization reminders — before you even think to ask. Weather-aware notifications with granular permission controls prevent problems before they start.",
    fig: "",
    span: 2,
    glyph: "bell",
  },
];

export function AcademicWhatWeBuilt({
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
      {/* Figure annotation */}
      <div
        className="absolute transition-all duration-600 ease-out hidden md:block"
        style={{
          top: 40,
          right: 40,
          opacity: visible ? 0.35 : 0,
          transform: visible ? "translateY(0)" : "translateY(6px)",
          transitionDelay: visible ? "100ms" : "0ms",
          fontFamily: mono,
          fontSize: "11px",
          color: "white",
          letterSpacing: "0.12em",
          zIndex: 10,
        }}
      >
        FIG 3.2 — THE BUILD
      </div>

      <div style={{ maxWidth: 880, width: "100%" }}>
        {/* Title */}
        <h2
          style={{
            ...revealStyle(200),
            fontFamily: pixel,
            fontSize: "clamp(18px, 3.5vw, 28px)",
            lineHeight: 1.4,
            color: "white",
            marginBottom: 32,
          }}
        >
          What I Built
        </h2>

        {/* Solution summary */}
        <p
          style={{
            ...revealStyle(350),
            fontFamily: mono,
            fontSize: 14,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.8,
            maxWidth: 640,
            marginBottom: 28,
          }}
        >
          {projectData.solutionSummary}
        </p>

        {/* Team */}
        <div style={{ ...revealStyle(450), marginBottom: 40 }}>
          {projectData.members.map((member) => (
            <div
              key={member.name}
              className="flex items-start gap-3"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: 16,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontFamily: mono,
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#4ade80",
                  flexShrink: 0,
                }}
              >
                {member.name.split(" ").map((p) => p[0]).join("")}
              </div>
              <div>
                <p style={{ fontFamily: mono, fontSize: 12, color: "white", fontWeight: "bold" }}>
                  {member.name}
                </p>
                <p style={{ fontFamily: mono, fontSize: 10, color: "#4ade80", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>
                  {member.role}
                </p>
                <p style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginTop: 6 }}>
                  {member.focus}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2×2 feature bento grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
          style={revealStyle(500)}
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="transition-all duration-300 hover:border-white/20"
              style={{
                ...revealStyle(500 + i * 150),
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "28px 24px",
              }}
            >
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0 }}>
                  <TechGlyph theme={feature.glyph} visible={visible} />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: 12,
                      color: "white",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {feature.title}
                  </p>
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.7,
                      marginBottom: 8,
                    }}
                  >
                    {feature.desc}
                  </p>
                  {feature.fig && (
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: 10,
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {feature.fig}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Methods row */}
        <div
          className="flex flex-wrap gap-2 mt-8"
          style={revealStyle(1100)}
        >
          {projectData.methods.map((method) => (
            <span
              key={method}
              style={{
                fontFamily: mono,
                fontSize: 10,
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "4px 10px",
                letterSpacing: "0.04em",
              }}
            >
              {method}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
