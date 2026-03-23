import { useState, useEffect, useRef } from "react";

const orchidPixelBW = "/botanical-pixels/115bb6b0b253fffe4442e446bcfb3e03619f32d4.png";

// ─── iMessage-style chat mock in botanical pixels ───────────────────────────

const MONSTERA_PHOTO =
  "https://images.unsplash.com/photo-1739288633830-a5173a18718b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMGRlbGljaW9zYSUyMHBsYW50JTIwaW5kb29yJTIwcG90dGVkfGVufDF8fHx8MTc3MTExOTEwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const mono = "ui-monospace, monospace";

// ─── Bubble components ──────────────────────────────────────────────────────

function ChatBubbleUser({
  children,
  time,
  visible,
  delay,
}: {
  children: React.ReactNode;
  time?: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className="flex flex-col items-end transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
      {time && (
        <span
          className="mt-1 opacity-30"
          style={{ fontFamily: mono, fontSize: "10px", color: "white" }}
        >
          {time}
        </span>
      )}
    </div>
  );
}

function ChatBubbleOrchid({
  children,
  time,
  visible,
  delay,
}: {
  children: React.ReactNode;
  time?: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className="flex flex-col items-start transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
      {time && (
        <span
          className="mt-1 opacity-30"
          style={{ fontFamily: mono, fontSize: "10px", color: "white" }}
        >
          {time}
        </span>
      )}
    </div>
  );
}

// ─── Identification card ────────────────────────────────────────────────────

function IdentificationCard({
  name,
  common,
  confidence,
  tags,
  body,
  alert,
  followUp,
}: {
  name: string;
  common: string;
  confidence: string;
  tags: string[];
  body: string;
  alert: string;
  followUp: string;
}) {
  return (
    <div
      className="flex flex-col gap-3 w-full"
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "16px",
        maxWidth: 400,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: mono,
            fontSize: "14px",
            color: "white",
            letterSpacing: "0.02em",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: "11px",
            color: "rgba(255,255,255,0.45)",
            marginTop: 2,
          }}
        >
          {common}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <span
          style={{
            fontFamily: mono,
            fontSize: "10px",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "3px 8px",
            letterSpacing: "0.06em",
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          {confidence}
        </span>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: mono,
              fontSize: "10px",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "3px 8px",
              letterSpacing: "0.06em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          fontFamily: mono,
          fontSize: "12px",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.6,
        }}
      >
        {body}
      </div>

      <div
        style={{
          fontFamily: mono,
          fontSize: "12px",
          color: "rgba(255,255,255,0.8)",
          lineHeight: 1.6,
          borderLeft: "2px solid rgba(255,255,255,0.3)",
          paddingLeft: 12,
          marginTop: 2,
        }}
      >
        {alert}
      </div>

      <div
        style={{
          fontFamily: mono,
          fontSize: "12px",
          color: "rgba(255,255,255,0.5)",
          marginTop: 4,
        }}
      >
        {followUp}
      </div>
    </div>
  );
}

// ─── Mock chat (scripted demo only) ─────────────────────────────────────────

function MockChat({ visible }: { visible: boolean }) {
  return (
    <div
      className="relative flex flex-col transition-all duration-500"
      style={{
        width: "100%",
        maxWidth: 400,
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* Chat header */}
      <div
        className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        >
          <img
            src={orchidPixelBW}
            alt=""
            style={{ width: 18, imageRendering: "pixelated", opacity: 0.8 }}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: mono,
              fontSize: "13px",
              color: "white",
              letterSpacing: "0.08em",
            }}
          >
            ORCHID
          </div>
          <div
            style={{
              fontFamily: mono,
              fontSize: "10px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            iMessage
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-4 px-5 py-5">
        {/* Demo: User photo + text (single group, one timestamp) */}
        <ChatBubbleUser time="10:32 AM" visible={visible} delay={0}>
          <div className="flex flex-col items-end gap-2">
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                overflow: "hidden",
                width: 160,
                height: 160,
              }}
            >
              <img
                src={MONSTERA_PHOTO}
                alt="Monstera photo"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05)" }}
              />
            </div>
            <div
              style={{
                padding: "10px 14px",
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontFamily: mono,
                fontSize: "13px",
                color: "white",
              }}
            >
              What plant is this?
            </div>
          </div>
        </ChatBubbleUser>

        {/* Demo: Orchid identification response */}
        <ChatBubbleOrchid visible={visible} delay={400} time="10:33 AM">
          <IdentificationCard
            name="MONSTERA DELICIOSA"
            common="Swiss Cheese Plant"
            confidence="98% MATCH"
            tags={["TROPICAL"]}
            body="Since Monsteras are drought-tolerant, they're actually a solid pick for you since you tend to underwater (no shade)."
            alert="Heads up: toxic to cats. I've got placement ideas to keep Ellie safe."
            followUp="Want me to add this to your collection?"
          />
        </ChatBubbleOrchid>
      </div>

      {/* Typing dot animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Feature description panel ──────────────────────────────────────────────

function FeatureDescription({ visible }: { visible: boolean }) {
  const revealStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: "all 600ms ease-out",
    transitionDelay: visible ? `${delay}ms` : "0ms",
  });

  return (
    <div
      className="flex flex-col transition-opacity duration-500"
      style={{ maxWidth: 440 }}
    >
      {/* Heading */}
      <h2
        className="text-[22px] md:text-[32px]"
        style={{
          ...revealStyle(200),
          fontFamily: '"Press Start 2P", cursive',
          lineHeight: 1.4,
          color: "white",
        }}
      >
        Instant
        <br />
        Identification
      </h2>

      {/* Tagline */}
      <p
        style={{
          ...revealStyle(350),
          fontFamily: mono,
          fontSize: "15px",
          color: "rgba(255,255,255,0.5)",
          marginTop: 20,
          fontStyle: "italic",
        }}
      >
        Snap a photo. Know your plant.
      </p>

      {/* Body */}
      <p
        style={{
          ...revealStyle(500),
          fontFamily: mono,
          fontSize: "14px",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.7,
          marginTop: 16,
          letterSpacing: "0.01em",
        }}
      >
        Send a photo or a video via iMessage and receive instant species
        identification with personalized context — care tips based on your
        habits, pet safety alerts, and more.
      </p>
    </div>
  );
}

// ─── Main feature spread ────────────────────────────────────────────────────

interface IdentifyFeatureProps {
  className?: string;
  scrollRoot?: React.RefObject<HTMLElement | null>;
}

export function IdentifyFeature({
  className = "",
  scrollRoot,
}: IdentifyFeatureProps) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15, root: scrollRoot?.current ?? null }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen w-full flex flex-col justify-center ${className}`}
      style={{ backgroundColor: "black" }}
    >
      {/* Figure annotation label */}
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
        }}
      >
        FIG 2.1 — SPECIES IDENTIFICATION
      </div>

      {/* Content grid */}
      <div className="w-full px-4 md:px-16 lg:px-24 py-10 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 max-w-[1100px] mx-auto">
          {/* Left — Chat mock (second on mobile) */}
          <div className="flex-shrink-0 w-full md:flex-1 md:min-w-0 md:max-w-[400px] order-2 md:order-1">
            <MockChat visible={visible} />
          </div>

          {/* Right — Feature description (first on mobile) */}
          <div className="flex items-center w-full md:flex-1 md:min-w-0 order-1 md:order-2">
            <FeatureDescription visible={visible} />
          </div>
        </div>
      </div>
    </section>
  );
}
