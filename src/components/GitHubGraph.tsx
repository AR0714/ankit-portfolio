"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { about } from "@/data/about";

const GITHUB_USERNAME = "AR0714";
// Live contribution graph as an SVG; the path segment sets the cell color.
const CHART_URL = `https://ghchart.rshah.org/6366f1/${GITHUB_USERNAME}`;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function GitHubGraph() {
  const [failed, setFailed] = useState(false);

  return (
    <section id="github" className="relative border-t border-white/5 py-20 sm:py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-4xl px-4 sm:px-6"
      >
        <motion.p
          variants={fadeInUp}
          className="text-center text-sm font-medium uppercase tracking-[0.3em] text-indigo-300"
        >
          Code Activity
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="mt-3 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          My GitHub contributions — updated automatically
        </motion.h2>

        <motion.div
          variants={fadeInUp}
          className="mt-10 rounded-2xl bg-zinc-900/80 p-4 ring-1 ring-indigo-400/25 sm:p-6"
        >
          {failed ? (
            <p className="py-6 text-center text-sm text-white/60">
              The contribution graph couldn&apos;t load right now.{" "}
              <a
                href={about.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-300 underline hover:text-indigo-200"
              >
                View my activity on GitHub
              </a>
              .
            </p>
          ) : (
            // A plain <img>: the chart is a remote SVG, which next/image won't optimize.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={CHART_URL}
              alt={`${about.name}'s GitHub contribution graph for the past year`}
              width={663}
              height={104}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              // The chart is drawn for light backgrounds (near-white empty cells). Inverting it
              // and rotating the hue back keeps the indigo while making empty cells dark.
              className="block h-auto w-full max-w-full rounded-lg [filter:invert(1)_hue-rotate(180deg)]"
            />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
