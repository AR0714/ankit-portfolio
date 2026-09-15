"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { about } from "@/data/about";

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (reduceMotion) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    // Update the DOM directly so the count-up doesn't re-render React every frame.
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        el.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, suffix]);

  return (
    <span ref={ref} aria-hidden="true">
      0{suffix}
    </span>
  );
}

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[2fr_3fr] md:gap-16">
        {/* Photo */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm"
        >
          {/* Decorative offset frame */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-indigo-400/60" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-900 to-zinc-900 shadow-2xl shadow-indigo-950/50">
            {photoFailed ? (
              <div
                role="img"
                aria-label={`${about.name} (photo coming soon)`}
                className="flex h-full w-full items-center justify-center text-8xl font-extrabold text-white/90"
              >
                {about.name.charAt(0)}
              </div>
            ) : (
              <Image
                src={about.photo}
                alt={`Portrait of ${about.name}`}
                fill
                sizes="(min-width: 640px) 384px, 320px"
                className="object-cover"
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center md:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300"
          >
            About Me
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            {about.title} based in {about.location}
          </motion.h2>

          {about.bio.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div variants={fadeUp} className="mt-8">
            <motion.a
              href={about.resumeUrl}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-colors hover:bg-indigo-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={staggerContainer}
            className="mt-12 grid grid-cols-3 gap-x-3 border-t border-white/10 pt-8 sm:gap-x-6"
          >
            {about.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                // Subgrid shares the value and label rows across cards, so both stay aligned
                // even when a value ("DRDO Intern") or label ("Research Papers") wraps.
                className="row-span-2 grid grid-rows-subgrid justify-items-center gap-y-1 rounded-xl bg-white/5 px-2 py-5 text-center ring-1 ring-white/10 md:justify-items-start md:px-5 md:text-left"
              >
                <dt className="text-xs font-medium text-white/60 sm:text-sm">{stat.label}</dt>
                {/* Value shows first visually; the label stays first for screen readers. */}
                {"text" in stat ? (
                  <dd className="order-first self-center text-lg leading-tight font-extrabold text-indigo-400 sm:text-2xl">
                    {stat.text}
                  </dd>
                ) : (
                  <dd className="order-first self-center text-3xl font-extrabold text-indigo-400 sm:text-4xl">
                    <span className="sr-only">
                      {stat.value}
                      {stat.suffix}
                    </span>
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                )}
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
