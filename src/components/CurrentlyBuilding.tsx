"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { about } from "@/data/about";

export default function CurrentlyBuilding() {
  const { project, description, tag, status } = about.currentlyBuilding;

  return (
    <aside
      aria-label="Currently building"
      className="w-full border-t border-indigo-400/40 bg-zinc-900 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:gap-6"
      >
        {/* Live indicator + label */}
        <div className="flex shrink-0 items-center gap-3">
          <span className="relative flex h-3 w-3" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            <span aria-hidden="true">🔨 </span>Currently Building
          </span>
        </div>

        {/* Project */}
        <div className="min-w-0 flex-1 md:border-l md:border-white/10 md:pl-6">
          <Link
            href="/projects/microgrid-protection"
            className="font-bold text-white underline-offset-4 decoration-white/40 hover:underline focus-visible:underline"
          >
            {project}
          </Link>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{description}</p>
        </div>

        {/* Badges */}
        <div className="flex shrink-0 flex-wrap gap-2">
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-400/30">
            {tag}
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/30">
            {status}
          </span>
        </div>
      </motion.div>
    </aside>
  );
}
