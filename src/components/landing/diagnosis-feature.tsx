import { useState, useEffect, useRef } from "react";

const SICK_PLANT_PHOTO = "/mites_palm.png";

const mono = "ui-monospace, monospace";

const orchidPixelBW = "/botanical-pixels/115bb6b0b253fffe4442e446bcfb3e03619f32d4.png";

// ─── Fake bot responses ─────────────────────────────────────────────────────

const diagnosisResponse = {
  issue: "SPIDER MITES",
  confidence: "98% MATCH",
  symptoms: ["Webbing", "Speckled Leaves"],
  body: "These tiny pests suck sap, causing stippling. They thrive in dry air.",
  treatment: [
    "Isolate immediately.",
    "Wipe leaves with cloth.",
    "Apply neem oil weekly — I can remind you.",
  ],
};

// ─── Bubble components (Duplicated from identify-feature for isolation) ─────

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

// ─── Diagnosis Card ─────────────────────────────────────────────────────────

function DiagnosisCard({ data }: { data: typeof diagnosisResponse }) {
  return (
    <div
      className="flex flex-col gap-3 w-full"
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "16px",
        maxWidth: 400,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: mono,
              fontSize: "10px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "1px",
              marginBottom: 4,
            }}
          >
            DIAGNOSIS
          </span>
          <span
            style={{
              fontFamily: mono,
              fontWeight: "bold",
              fontSize: "14px",
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            {data.issue}
          </span>
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: "10px",
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "2px 6px",
          }}
        >
          {data.confidence}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {data.symptoms.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: mono,
              fontSize: "10px",
              color: "black",
              backgroundColor: "white",
              padding: "2px 6px",
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
        {data.body}
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
        <div style={{ opacity: 0.5, marginBottom: 4, fontSize: "10px" }}>TREATMENT PLAN:</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {data.treatment.map((step, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{i + 1}. {step}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}


// ─── Mock Diagnosis Chat ────────────────────────────────────────────────────

function MockDiagnosisChat({ visible }: { visible: boolean }) {
  const [demoStep, setDemoStep] = useState(0);

  // Demo sequence
  useEffect(() => {
    if (visible) {
      if (demoStep === 0) setTimeout(() => setDemoStep(1), 500);
    }
  }, [visible, demoStep]);

  useEffect(() => {
    if (demoStep >= 1 && demoStep < 2) {
      const timer = setTimeout(() => {
        setDemoStep(2);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [demoStep]);

  return (
    <div
      className="relative flex flex-col transition-all duration-500"
      style={{
        width: "100%",
        maxWidth: 400,
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* Header */}
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
              transition: "color 300ms",
            }}
          >
            iMessage
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex flex-col gap-4 px-5 py-5"
        style={{
            overflowY: "visible",
            flex: "none",
            minHeight: 0,
        }}
      >
        <ChatBubbleUser visible={demoStep >= 1} delay={0} time="10:42 AM">
          <div className="flex flex-col items-end gap-2">
            <div
                className="overflow-hidden"
                style={{
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "0",
                width: 160,
                height: 160,
                }}
            >
                <img
                src={SICK_PLANT_PHOTO}
                alt="Sick Plant"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "contrast(1.05)",
                }}
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
                My palm looks sad. Are these webs??
            </div>
          </div>
        </ChatBubbleUser>

        <ChatBubbleOrchid visible={demoStep >= 2} delay={0} time="10:43 AM">
            <DiagnosisCard data={diagnosisResponse} />
        </ChatBubbleOrchid>
      </div>
    </div>
  );
}

// ─── Feature Description ────────────────────────────────────────────────────

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
      style={{
        maxWidth: 440,
      }}
    >
      {/* Heading */}
      <h2
        className="text-[22px] md:text-[32px]"
        style={{
          ...revealStyle(0),
          fontFamily: '"Press Start 2P", cursive',
          lineHeight: 1.4,
          color: "white",
        }}
      >
        Diagnosis &<br />
        Treatment
      </h2>

      {/* Tagline */}
      <p
        style={{
          ...revealStyle(150),
          fontFamily: mono,
          fontSize: "15px",
          color: "rgba(255,255,255,0.5)",
          marginTop: 20,
          fontStyle: "italic",
        }}
      >
        Something wrong? We'll figure it out.
      </p>

      {/* Body */}
      <p
        style={{
          ...revealStyle(300),
          fontFamily: mono,
          fontSize: "13px",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.8,
          marginTop: 24,
          maxWidth: 400,
        }}
      >
        Text a photo of spots, webbing, or pests. Orchid analyzes visual symptoms to provide an instant diagnosis and a step-by-step treatment plan.
      </p>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

interface DiagnosisFeatureProps {
  className?: string;
  scrollRoot?: React.RefObject<HTMLElement | null>;
}

export function DiagnosisFeature({
  className = "",
  scrollRoot,
}: DiagnosisFeatureProps) {
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
      { threshold: 0.2, root: scrollRoot?.current ?? null }
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
        FIG 2.2 — DIAGNOSTIC PROTOCOL
      </div>

      {/* Content grid */}
      <div className="w-full px-4 md:px-16 lg:px-24 py-10 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 max-w-[1100px] mx-auto">

           {/* Left: Description — first on mobile */}
           <div className="flex items-center w-full md:flex-1 md:min-w-0 order-1 md:order-1">
             <FeatureDescription visible={visible} />
          </div>

          {/* Right: Interface — second on mobile */}
          <div className="w-full md:flex-shrink-0 md:flex-1 md:min-w-0 md:max-w-[400px] order-2 md:order-2 self-center">
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 800ms ease-out",
                transitionDelay: "200ms",
                width: "100%",
              }}
            >
              <MockDiagnosisChat visible={visible} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
