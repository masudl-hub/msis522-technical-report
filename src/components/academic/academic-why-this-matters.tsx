import { useState, useEffect, useRef } from "react";
import { projectData } from "@/data/projectData";
import { ProblemGlyph } from "./pixel-glyphs";

const mono = "ui-monospace, monospace";
const pixel = '"Press Start 2P", cursive';

const PAIN_POINTS: { title: string; desc: string; glyph: 'overload' | 'reactive' | 'fatigue' | 'personal' }[] = [
  {
    title: "INFORMATION OVERLOAD",
    desc: "Generic care guides don't account for individual environments, watering habits, or the specific needs of each plant.",
    glyph: "overload",
  },
  {
    title: "REACTIVE CARE",
    desc: "Users only seek help when problems arise, rather than receiving proactive guidance that prevents issues.",
    glyph: "reactive",
  },
  {
    title: "APP FATIGUE",
    desc: "Existing solutions require downloading yet another standalone app, creating friction. Greg, Planta, Vera — care calendars, not care assistants.",
    glyph: "fatigue",
  },
  {
    title: "LACK OF PERSONALIZATION",
    desc: "Current tools don't learn from user behavior or remember plant-specific history across conversations.",
    glyph: "personal",
  },
];

const STATS = [
  "35% of houseplants die at home",
  '67% of millennials call themselves "plant murderers"',
  "48% worry about keeping plants alive",
  "avg: 7 plants killed per millennial",
];

export function AcademicWhyThisMatters({
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
        FIG 3.1 — PROBLEM
      </div>

      <div style={{ maxWidth: 880, width: "100%" }}>
        {/* Title */}
        <h2
          style={{
            ...revealStyle(200),
            fontFamily: pixel,
            fontSize: "clamp(20px, 4vw, 32px)",
            lineHeight: 1.4,
            color: "white",
            marginBottom: 24,
          }}
        >
          Why This Matters
        </h2>

        {/* Personal story */}
        <p
          style={{
            ...revealStyle(400),
            fontFamily: mono,
            fontSize: 14,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.8,
            maxWidth: 640,
            marginBottom: 32,
          }}
        >
          {projectData.problemStatement}
        </p>

        {/* Pain point cards — 4-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
          style={{ maxWidth: 800 }}
        >
          {PAIN_POINTS.map((issue, i) => (
            <div
              key={issue.title}
              className="flex flex-col items-center text-center transition-all duration-300 hover:border-white/25"
              style={{
                ...revealStyle(600 + i * 150),
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "24px 16px",
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <ProblemGlyph theme={issue.glyph} visible={visible} />
              </div>
              <p
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  color: "white",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  lineHeight: 1.4,
                  marginBottom: 10,
                }}
              >
                {issue.title}
              </p>
              <p
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.6,
                }}
              >
                {issue.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mortality stats */}
        <div
          style={{
            ...revealStyle(1200),
            marginTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 20,
          }}
        >
          {STATS.map((stat, i) => (
            <p
              key={i}
              style={{
                fontFamily: mono,
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 2,
                opacity: visible ? 1 : 0,
                transition: "opacity 600ms ease-out",
                transitionDelay: visible ? `${1300 + i * 120}ms` : "0ms",
              }}
            >
              {stat}
            </p>
          ))}
        </div>

        {/* Closing paragraph */}
        <p
          style={{
            ...revealStyle(1800),
            fontFamily: mono,
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8,
            marginTop: 32,
            maxWidth: 640,
          }}
        >
          Plant ownership improves mental health, air quality, and living
          spaces — but only if the plants survive. 57% of plant deaths are
          from overwatering alone. The barrier isn't ability — it's
          information anxiety.
        </p>
      </div>
    </section>
  );
}
