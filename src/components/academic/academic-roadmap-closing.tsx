import { useState, useEffect, useRef } from "react";
import { projectData } from "@/data/projectData";

const mono = "ui-monospace, monospace";
const pixel = '"Press Start 2P", cursive';

const DENSITY_STEPS = ["█", "▓", "▒", "░", ""];

const DecryptText = ({ text, visible, delay = 0 }: { text: string; visible: boolean; delay?: number }) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  useEffect(() => {
    if (!visible) { setDisplay(text); return; }
    const chars = text.split("");
    let id: number;
    const animate = () => {
      frameRef.current++;
      const f = frameRef.current;
      let done = true;
      setDisplay(chars.map((ch, i) => {
        if (ch === " ") return " ";
        const p = f - (i * 1.5 + delay);
        if (p < 0) { done = false; return DENSITY_STEPS[0]; }
        const c = Math.floor(p / 3);
        if (c >= DENSITY_STEPS.length) return ch;
        done = false;
        return DENSITY_STEPS[Math.min(c, DENSITY_STEPS.length - 1)];
      }).join(""));
      if (!done) id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [visible, text, delay]);
  return <span>{display}</span>;
};

export function AcademicRoadmapClosing({
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
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, root: scrollRoot?.current ?? null }
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

  const phases = projectData.roadmap;
  const isShipped = (phase: string) => phase.toLowerCase().includes("shipped") || phase.toLowerCase().includes("live");

  return (
    <section
      ref={sectionRef}
      className={`snap-start w-full min-h-screen flex items-center justify-center px-4 md:px-16 bg-black relative overflow-hidden ${className}`}
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
        FIG 3.4 — ROADMAP
      </div>

      <div style={{ maxWidth: 960, width: "100%" }}>
        <h2 style={{
          ...revealStyle(200),
          fontFamily: pixel,
          fontSize: "clamp(18px, 3.5vw, 28px)",
          lineHeight: 1.4, color: "white", marginBottom: 48,
        }}>
          What's Next
        </h2>

        {/* ─── Horizontal timeline ─── */}
        <div style={revealStyle(400)}>

          {/* Rail — horizontal pixel line */}
          <div style={{ position: "relative", height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 0 }}>
            {/* Phase nodes on the rail */}
            {phases.map((phase, pi) => {
              const shipped = isShipped(phase.phase);
              const pct = pi / (phases.length - 1) * 100;
              const nodeSize = shipped ? 10 : 8;
              return (
                <div
                  key={phase.phase}
                  style={{
                    position: "absolute",
                    left: `${pct}%`,
                    top: -(nodeSize / 2),
                    width: nodeSize,
                    height: nodeSize,
                    transform: "translateX(-50%)",
                    backgroundColor: shipped ? "#4ade80" : "transparent",
                    border: shipped ? "none" : "2px solid rgba(255,255,255,0.25)",
                    boxShadow: shipped ? "0 0 10px rgba(74,222,128,0.4)" : "none",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 600ms ease-out",
                    transitionDelay: visible ? `${500 + pi * 200}ms` : "0ms",
                  }}
                />
              );
            })}
            {/* Filled portion of rail (shipped progress) */}
            <div style={{
              position: "absolute",
              left: 0, top: 0, height: "100%",
              width: `${(1 / (phases.length - 1)) * 100}%`,
              backgroundColor: "rgba(74,222,128,0.4)",
              opacity: visible ? 1 : 0,
              transition: "opacity 800ms ease-out",
              transitionDelay: visible ? "600ms" : "0ms",
            }} />
          </div>

          {/* Phase columns */}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${phases.length}, 1fr)`,
              marginTop: 24,
            }}
          >
            {phases.map((phase, pi) => {
              const shipped = isShipped(phase.phase);
              const baseDelay = 500 + pi * 200;

              return (
                <div key={phase.phase}>
                  {/* Phase label */}
                  <p style={{
                    ...revealStyle(baseDelay),
                    fontFamily: pixel,
                    fontSize: 7,
                    color: shipped ? "#4ade80" : "rgba(255,255,255,0.35)",
                    letterSpacing: "0.1em",
                    marginBottom: 16,
                  }}>
                    <DecryptText text={phase.phase.toUpperCase()} visible={visible} delay={pi * 10} />
                  </p>

                  {/* Items */}
                  <div className="flex flex-col gap-2">
                    {phase.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="flex items-start gap-2"
                        style={revealStyle(baseDelay + 80 + ii * 50)}
                      >
                        <span style={{
                          fontFamily: mono, fontSize: 8, marginTop: 2, flexShrink: 0,
                          color: shipped ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.15)",
                        }}>
                          {shipped ? "■" : "□"}
                        </span>
                        <span style={{
                          fontFamily: mono, fontSize: 11,
                          color: shipped ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
                          lineHeight: 1.5,
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Constraints ─── */}
        <div style={{ ...revealStyle(1200), marginTop: 56, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28 }}>
          <p style={{
            fontFamily: pixel, fontSize: 7,
            color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em",
            marginBottom: 16,
          }}>
            CONSTRAINTS
          </p>

          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${Math.min(projectData.risks.length, 3)}, 1fr)` }}
          >
            {projectData.risks.slice(0, 3).map((risk, ri) => (
              <div
                key={risk.title}
                style={{
                  ...revealStyle(1300 + ri * 100),
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: 16,
                }}
              >
                <p style={{
                  fontFamily: pixel, fontSize: 6,
                  color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em",
                  marginBottom: 8,
                }}>
                  <DecryptText text={risk.title.toUpperCase()} visible={visible} delay={ri * 6 + 40} />
                </p>
                <p style={{
                  fontFamily: mono, fontSize: 10,
                  color: "rgba(255,255,255,0.3)", lineHeight: 1.6,
                }}>
                  {risk.mitigation}
                </p>
              </div>
            ))}
          </div>

          {projectData.risks.slice(3).map((risk, ri) => (
            <div
              key={risk.title}
              className="flex items-baseline gap-2"
              style={{ ...revealStyle(1600 + ri * 60), marginTop: 10 }}
            >
              <span style={{ fontFamily: mono, fontSize: 8, color: "rgba(255,255,255,0.15)" }}>□</span>
              <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                <strong style={{ color: "rgba(255,255,255,0.4)" }}>{risk.title}</strong> — {risk.mitigation}
              </span>
            </div>
          ))}
        </div>

        {/* ─── Links ─── */}
        <div
          className="flex flex-wrap gap-3"
          style={{ ...revealStyle(1800), marginTop: 36, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {projectData.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:bg-white hover:text-black"
              style={{
                fontFamily: mono, fontSize: 12,
                padding: "10px 20px", textDecoration: "none",
                letterSpacing: "0.06em",
                ...(link.primary
                  ? { backgroundColor: "white", color: "black", border: "1px solid white", fontWeight: 600 }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)" }),
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
