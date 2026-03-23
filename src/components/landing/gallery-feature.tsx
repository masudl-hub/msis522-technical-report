import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectData } from "@/data/projectData";

const mono = "ui-monospace, monospace";

export function GalleryFeature({
  className = "",
  scrollRoot,
}: {
  className?: string;
  scrollRoot?: React.RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, root: scrollRoot?.current ?? null }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

  const revealStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: "all 600ms ease-out",
    transitionDelay: visible ? `${delay}ms` : "0ms",
  });

  const gallery = projectData.gallery;
  const selected = selectedIndex !== null ? gallery[selectedIndex] : null;

  return (
    <section
      ref={sectionRef}
      className={`snap-start w-full min-h-screen flex flex-col items-center justify-start bg-black relative overflow-hidden py-20 ${className}`}
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
        FIG 3.0 — GALLERY
      </div>

      <div className="w-full max-w-[1400px] px-4 md:px-16 lg:px-24">
        {/* Heading */}
        <h2
          className="text-[22px] md:text-[32px] text-center"
          style={{
            ...revealStyle(200),
            fontFamily: '"Press Start 2P", cursive',
            lineHeight: 1.3,
            color: "white",
            marginBottom: "48px",
          }}
        >
          Gallery
        </h2>

        {/* Bento grid */}
        <div
          style={{
            ...revealStyle(400),
            columns: "3 240px",
            columnGap: "8px",
          }}
        >
          {gallery.map((item, i) =>
            item.assetPath ? (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                style={{
                  breakInside: "avoid",
                  marginBottom: 8,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  position: "relative",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: "all 500ms ease-out",
                  transitionDelay: visible ? `${400 + i * 60}ms` : "0ms",
                }}
              >
                <img
                  src={item.assetPath}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transition: "filter 300ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.filter = "brightness(1.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.filter = "brightness(1)";
                  }}
                />
                {/* Title overlay on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                    padding: "20px 10px 8px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: "9px",
                      color: "rgba(255,255,255,0.6)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              backgroundColor: "rgba(0,0,0,0.92)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              cursor: "pointer",
            }}
          >
            {/* Close hint */}
            <div
              style={{
                position: "absolute",
                top: 24,
                right: 32,
                fontFamily: mono,
                fontSize: "12px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              click to close
            </div>

            {/* Nav arrows */}
            {selectedIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex - 1); }}
                style={{
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  fontFamily: mono,
                  fontSize: 24,
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  padding: 12,
                }}
              >
                ←
              </button>
            )}
            {selectedIndex < gallery.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex + 1); }}
                style={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  fontFamily: mono,
                  fontSize: 24,
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  padding: 12,
                }}
              >
                →
              </button>
            )}

            <motion.img
              key={selected.assetPath}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={selected.assetPath}
              alt={selected.title}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "75vh",
                objectFit: "contain",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "default",
              }}
            />

            <div style={{ marginTop: 16, textAlign: "center", maxWidth: 600 }}>
              <p
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: "10px",
                  color: "white",
                  marginBottom: 6,
                }}
              >
                {selected.title}
              </p>
              <p
                style={{
                  fontFamily: mono,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                }}
              >
                {selected.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
