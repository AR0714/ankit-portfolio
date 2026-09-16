"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Only devices with a real mouse: excludes phones, tablets, and touch-only laptops.
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  // Raw mouse position; the springs below trail behind it.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // The dot tracks closely, the ring lags further behind.
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 30, mass: 0.4 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 30, mass: 0.4 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.6 });

  // Decide on the client whether this device has a fine pointer (and re-check if it changes,
  // e.g. a tablet docking a mouse).
  useEffect(() => {
    const media = window.matchMedia(FINE_POINTER_QUERY);
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  // With reduced motion, follow the mouse directly instead of trailing on a spring.
  const x = reduceMotion ? mouseX : dotX;
  const y = reduceMotion ? mouseY : dotY;
  const outerX = reduceMotion ? mouseX : ringX;
  const outerY = reduceMotion ? mouseY : ringY;

  return (
    // pointer-events-none on everything so clicks always reach the page underneath.
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Outer ring (40px) */}
      <motion.div
        style={{
          x: outerX,
          y: outerY,
          boxShadow: "0 0 18px 2px rgba(99, 102, 241, 0.25)",
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute top-0 left-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6366f1]/40"
      />
      {/* Inner glowing dot (20px) */}
      <motion.div
        style={{
          x,
          y,
          boxShadow: "0 0 12px 4px rgba(99, 102, 241, 0.7), 0 0 28px 10px rgba(99, 102, 241, 0.35)",
        }}
        animate={{ opacity: visible ? 0.85 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute top-0 left-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6366f1]"
      />
    </div>
  );
}
