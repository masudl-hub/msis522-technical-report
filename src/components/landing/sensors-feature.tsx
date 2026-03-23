import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * SensorsFeature — Orchid Environmental Sensors
 * Four cards in a row (mirroring Visual Guides layout).
 * Each card: metric name, why it matters (stat from /proposal),
 * a canvas-drawn B&W trend line, current reading, and ideal range.
 */

const mono = "ui-monospace, monospace";
const DENSITY_STEPS = ["█", "▓", "▒", "░", ""];

function decryptChar(cycleCount: number, targetChar: string): string {
  if (targetChar === " ") return " ";
  if (cycleCount >= DENSITY_STEPS.length) return targetChar;
  return DENSITY_STEPS[Math.min(cycleCount, DENSITY_STEPS.length - 1)];
}

const DecryptText: React.FC<{ text: string; visible: boolean; delay?: number }> = ({
  text,
  visible,
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!visible) {
      setDisplayText(text);
      return;
    }
    const chars = text.split("");
    const animate = () => {
      frameRef.current++;
      const frame = frameRef.current;
      let allDone = true;
      const newText = chars
        .map((char, i) => {
          if (char === " ") return " ";
          const charDelay = i * 1.5 + delay;
          const charFrames = frame - charDelay;
          if (charFrames < 0) { allDone = false; return DENSITY_STEPS[0]; }
          const cycles = Math.floor(charFrames / 3);
          if (cycles >= DENSITY_STEPS.length) return char;
          allDone = false;
          return DENSITY_STEPS[Math.min(cycles, DENSITY_STEPS.length - 1)];
        })
        .join("");
      setDisplayText(newText);
      if (!allDone) requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [visible, text, delay]);

  return <span>{displayText}</span>;
};

// ─── Trend line data ────────────────────────────────────────────

interface SensorCard {
  label: string;
  stat: string;
  source: string;
  reading: string;
  ideal: string;
  color: string; // accent for the current-value dot only
  // Generate a realistic 48-point trend (24h, 30min intervals)
  generateTrend: () => number[];
}

const SENSOR_CARDS: SensorCard[] = [
  {
    label: "Soil Moisture",
    stat: "57% of plant deaths are from overwatering",
    source: "— a solvable problem with real-time data.",
    reading: "52%",
    ideal: "Monstera: 40–60%",
    color: "#4ade80",
    generateTrend: () => {
      const pts: number[] = [];
      let v = 0.6;
      for (let i = 0; i < 48; i++) {
        // Simulate a watering event around point 20
        if (i === 20) v = 0.85;
        v += (Math.random() - 0.52) * 0.03;
        v = Math.max(0.15, Math.min(0.95, v));
        // Slow dry-down after watering
        if (i > 20) v -= 0.008;
        pts.push(v);
      }
      return pts;
    },
  },
  {
    label: "Temperature",
    stat: "48% of owners worry about keeping plants alive",
    source: "— cold drafts and heat spikes are invisible killers.",
    reading: "23.1°C",
    ideal: "Monstera: 18–29°C",
    color: "#fb923c",
    generateTrend: () => {
      const pts: number[] = [];
      let v = 0.55;
      for (let i = 0; i < 48; i++) {
        // Day/night cycle
        const dayPhase = Math.sin((i / 48) * Math.PI * 2 - Math.PI / 2) * 0.15;
        v = 0.5 + dayPhase + (Math.random() - 0.5) * 0.04;
        v = Math.max(0.1, Math.min(0.9, v));
        pts.push(v);
      }
      return pts;
    },
  },
  {
    label: "Humidity",
    stat: "60% of plant owners report care anxiety",
    source: "— humidity is the metric they never think to check.",
    reading: "64%",
    ideal: "Monstera: 60–70%",
    color: "#60a5fa",
    generateTrend: () => {
      const pts: number[] = [];
      let v = 0.65;
      for (let i = 0; i < 48; i++) {
        v += (Math.random() - 0.48) * 0.04;
        // Gradual drop in dry indoor air
        v -= 0.003;
        v = Math.max(0.2, Math.min(0.9, v));
        pts.push(v);
      }
      return pts;
    },
  },
  {
    label: "Ambient Light",
    stat: "18% of plant deaths are from poor light",
    source: "— the second biggest killer after overwatering.",
    reading: "6,200 lx",
    ideal: "Monstera: 4,000–10,000 lx",
    color: "#fbbf24",
    generateTrend: () => {
      const pts: number[] = [];
      for (let i = 0; i < 48; i++) {
        // Bell curve for daylight hours
        const daylight = Math.max(0, Math.sin((i / 48) * Math.PI) * 0.8);
        const noise = (Math.random() - 0.5) * 0.08;
        pts.push(Math.max(0.02, Math.min(0.95, daylight + noise + 0.05)));
      }
      return pts;
    },
  },
];

// ─── Canvas trend line ──────────────────────────────────────────

function TrendCanvas({ dataRef, color, visible }: { dataRef: React.MutableRefObject<number[]>; color: string; visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const data = dataRef.current;
      const now = performance.now();
      if (!startRef.current) startRef.current = now;
      const t = (now - startRef.current) / 1000;
      const revealCount = Math.min(data.length, Math.floor(t * 24));

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const pad = 4;
      const plotW = w - pad * 2;
      const plotH = h - pad * 2;

      // Faint grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const gy = pad + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad, gy);
        ctx.lineTo(pad + plotW, gy);
        ctx.stroke();
      }

      const count = Math.min(data.length, revealCount);
      if (count < 2) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Area fill
      ctx.beginPath();
      ctx.moveTo(pad, pad + plotH);
      for (let i = 0; i < count; i++) {
        const x = pad + (i / (data.length - 1)) * plotW;
        const y = pad + (1 - data[i]) * plotH;
        ctx.lineTo(x, y);
      }
      const lastX = pad + ((count - 1) / (data.length - 1)) * plotW;
      ctx.lineTo(lastX, pad + plotH);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fill();

      // Line
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const x = pad + (i / (data.length - 1)) * plotW;
        const y = pad + (1 - data[i]) * plotH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Current value indicator (square pixel, on-brand)
      const lastVal = data[count - 1];
      const lastY = pad + (1 - lastVal) * plotH;
      const dotX = pad + ((count - 1) / (data.length - 1)) * plotW;
      const dotSize = 5;
      ctx.fillStyle = color;
      ctx.fillRect(dotX - dotSize / 2, lastY - dotSize / 2, dotSize, dotSize);
      // Glow (square)
      ctx.fillStyle = color + "20";
      ctx.fillRect(dotX - 8, lastY - 8, 16, 16);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, dataRef, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ─── Sensor card ────────────────────────────────────────────────

function SensorMetricCard({
  card,
  index,
  visible,
}: {
  card: SensorCard;
  index: number;
  visible: boolean;
}) {
  const trendRef = useRef(card.generateTrend());
  const [currentReading, setCurrentReading] = useState(card.reading);

  // Tick new data points every 800ms once visible
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      const data = trendRef.current;
      const last = data[data.length - 1];
      // Random walk
      let next = last + (Math.random() - 0.48) * 0.03;
      next = Math.max(0.05, Math.min(0.95, next));
      data.push(next);
      if (data.length > 48) data.shift();

      // Update displayed reading based on the card's range
      if (card.label === "Temperature") {
        const temp = 10 + next * 30;
        setCurrentReading(temp.toFixed(1) + "°C");
      } else if (card.label === "Ambient Light") {
        const lx = Math.round(next * 2000);
        setCurrentReading(lx + " lx");
      } else {
        const pct = Math.round(next * 100);
        setCurrentReading(pct + "%");
      }
    }, 800);
    return () => clearInterval(id);
  }, [visible, card.label]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
      style={{
        backgroundColor: "#000",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          opacity: 0.06,
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />

      {/* Trend line canvas */}
      <div style={{ position: "relative", marginBottom: "16px", height: 180 }}>
        <TrendCanvas dataRef={trendRef} color={card.color} visible={visible} />
      </div>

      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div
          style={{
            width: 6,
            height: 6,
            backgroundColor: card.color,
            boxShadow: `0 0 6px ${card.color}40`,
            flexShrink: 0,
          }}
        />
        <p
          style={{
            fontFamily: mono,
            fontWeight: "bold",
            fontSize: "11px",
            textTransform: "uppercase",
            color: "#fff",
            letterSpacing: "0.05em",
          }}
        >
          <DecryptText text={card.label} visible={visible} delay={index * 5} />
        </p>
      </div>

      {/* Stat */}
      <p
        style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.45)",
          fontFamily: mono,
          lineHeight: 1.6,
          marginBottom: "16px",
          flexGrow: 1,
        }}
      >
        {card.stat}
        <span style={{ color: "rgba(255,255,255,0.3)" }}> {card.source}</span>
      </p>

      {/* Reading + ideal range */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 8,
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 16,
            fontWeight: 700,
            color: card.color,
          }}
        >
          {currentReading}
        </span>
        <span
          style={{
            fontFamily: mono,
            fontSize: 9,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
          }}
        >
          ideal: {card.ideal}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main section ───────────────────────────────────────────────

export function SensorsFeature({
  className = "",
  scrollRoot,
}: {
  className?: string;
  scrollRoot?: React.RefObject<HTMLElement | null>;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15, root: scrollRoot?.current ?? null }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

  const revealStyle = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(12px)",
    transition: "all 600ms ease-out",
    transitionDelay: isVisible ? `${delay}ms` : "0ms",
  });

  return (
    <section
      ref={sectionRef}
      className={`snap-start w-full min-h-screen flex items-center justify-center bg-black relative overflow-hidden ${className}`}
    >
      {/* Figure annotation */}
      <div
        className="absolute transition-all duration-600 ease-out hidden md:block"
        style={{
          top: 40,
          right: 40,
          opacity: isVisible ? 0.35 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(6px)",
          transitionDelay: isVisible ? "100ms" : "0ms",
          fontFamily: mono,
          fontSize: "11px",
          color: "white",
          letterSpacing: "0.12em",
          zIndex: 10,
        }}
      >
        FIG 2.9 — ENVIRONMENTAL SENSORS
      </div>

      <div className="w-full px-4 md:px-16 lg:px-24 z-10 relative">
        <div className="max-w-[1400px] mx-auto">
          {/* Description */}
          <div className="text-center mb-16">
            <h2
              className="text-[22px] md:text-[32px]"
              style={{
                ...revealStyle(0),
                fontFamily: '"Press Start 2P", cursive',
                lineHeight: 1.4,
                color: "white",
              }}
            >
              Orchid Environmental Sensors
            </h2>

            <p
              style={{
                ...revealStyle(150),
                fontFamily: mono,
                fontSize: "15px",
                color: "rgba(255,255,255,0.5)",
                marginTop: 28,
                fontStyle: "italic",
              }}
            >
              Hardware I designed and built.
            </p>

            <p
              style={{
                ...revealStyle(300),
                fontFamily: mono,
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.8,
                marginTop: 24,
                maxWidth: 640,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              ESP32 · DHT11 · BH1750 · Capacitive v2 — reading every 30 seconds,
              uploading on interval or immediately when a significant change is
              detected. Orchid sets ideal ranges per species and fires alerts
              when thresholds are crossed.
            </p>
          </div>

          {/* Four metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {SENSOR_CARDS.map((card, i) => (
              <SensorMetricCard key={card.label} card={card} index={i} visible={isVisible} />
            ))}
          </div>

          {/* Specs row */}
          <div
            className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16"
            style={revealStyle(900)}
          >
            {[
              { label: "HARDWARE", value: "ESP32 · DHT11 · BH1750 · Cap v2" },
              { label: "READ INTERVAL", value: "30s local" },
              { label: "UPLOAD", value: "10 min / delta" },
              { label: "METRICS", value: "Moisture · Temp · Humidity · Light" },
            ].map((spec) => (
              <div key={spec.label} className="text-center">
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.15em",
                    marginBottom: "4px",
                  }}
                >
                  {spec.label}
                </p>
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
