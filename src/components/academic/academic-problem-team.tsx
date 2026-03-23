import { useState, useEffect, useRef } from "react";
import { projectData } from "@/data/projectData";

const mono = "ui-monospace, monospace";
const pixel = '"Press Start 2P", cursive';

export function AcademicProblemTeam({
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
      className={`snap-start w-full min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden ${className}`}
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
        FIG 3.1 — PROBLEM & TEAM
      </div>

      <div className="max-w-[1100px] w-full px-4 md:px-16 lg:px-24 py-10 md:py-20">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* Left column — Problem */}
          <div className="flex flex-col">
            <h2
              className="text-[18px] md:text-[28px]"
              style={{
                ...revealStyle(200),
                fontFamily: pixel,
                lineHeight: 1.3,
                color: "white",
                marginBottom: "20px",
              }}
            >
              Why This Matters
            </h2>
            <p
              style={{
                ...revealStyle(350),
                fontFamily: mono,
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}
            >
              {projectData.problemStatement}
            </p>

            {/* Mini-panels row */}
            <div
              className="grid grid-cols-3 gap-3"
              style={revealStyle(500)}
            >
              {[
                { label: "AUDIENCE", value: projectData.audience },
                { label: "IMPACT GOAL", value: projectData.impactGoal },
                { label: "STATUS", value: projectData.status },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: "9px",
                      color: "#4ade80",
                      letterSpacing: "0.12em",
                      marginBottom: "6px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — Solution */}
          <div className="flex flex-col">
            <h2
              className="text-[18px] md:text-[28px]"
              style={{
                ...revealStyle(250),
                fontFamily: pixel,
                lineHeight: 1.3,
                color: "white",
                marginBottom: "20px",
              }}
            >
              What We Built
            </h2>
            <p
              style={{
                ...revealStyle(400),
                fontFamily: mono,
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}
            >
              {projectData.solutionSummary}
            </p>

            {/* Method chips */}
            <div
              className="flex flex-wrap gap-2"
              style={revealStyle(550)}
            >
              {projectData.methods.map((method) => (
                <span
                  key={method}
                  style={{
                    fontFamily: mono,
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "6px 10px",
                    lineHeight: 1.4,
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Team section */}
        <div
          style={{
            ...revealStyle(700),
            marginTop: "48px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "32px",
          }}
        >
          <p
            style={{
              fontFamily: mono,
              fontSize: "9px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.15em",
              marginBottom: "16px",
            }}
          >
            TEAM
          </p>
          <div className="flex flex-col gap-4">
            {projectData.members.map((member) => {
              const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();
              return (
                <div
                  key={member.name}
                  className="flex items-start gap-4"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "16px",
                  }}
                >
                  {/* Avatar initials */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      border: "1px solid rgba(255,255,255,0.2)",
                      backgroundColor: "rgba(74,222,128,0.08)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: pixel,
                        fontSize: "12px",
                        color: "#4ade80",
                      }}
                    >
                      {initials}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <p
                      style={{
                        fontFamily: mono,
                        fontSize: "14px",
                        color: "white",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {member.name}
                    </p>
                    <p
                      style={{
                        fontFamily: mono,
                        fontSize: "11px",
                        color: "#4ade80",
                      }}
                    >
                      {member.role}
                    </p>
                    <p
                      style={{
                        fontFamily: mono,
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.5,
                        marginTop: "2px",
                      }}
                    >
                      {member.focus}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
