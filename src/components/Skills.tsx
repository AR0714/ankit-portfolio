"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { skillCategories } from "@/data/skills";

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" },
  }),
};

const skillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: 0.1 + index * 0.05, ease: "easeOut" },
  }),
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
  "aria-hidden": true,
};

// One icon per category in skills.ts; `fallbackIcon` covers any category added later.
const categoryIcons: Record<string, ReactNode> = {
  "ML & AI": (
    <svg {...iconProps}>
      <rect x="8" y="8" width="8" height="8" rx="1.5" />
      <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" />
      <path d="M9 1.5v3M15 1.5v3M9 19.5v3M15 19.5v3M1.5 9h3M1.5 15h3M19.5 9h3M19.5 15h3" />
    </svg>
  ),
  "GenAI & LLMs": (
    <svg {...iconProps}>
      <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
      <path d="M18 15l.8 2.2 2.2.8-2.2.8L18 21l-.8-2.2-2.2-.8 2.2-.8L18 15z" />
    </svg>
  ),
  Languages: (
    <svg {...iconProps}>
      <path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5M13.5 4.5l-3 15" />
    </svg>
  ),
  "Embedded & IoT": (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2v6.5M12 15.5V22M2 12h6.5M15.5 12H22" />
      <circle cx="12" cy="2.5" r="1.3" />
      <circle cx="12" cy="21.5" r="1.3" />
      <circle cx="2.5" cy="12" r="1.3" />
      <circle cx="21.5" cy="12" r="1.3" />
    </svg>
  ),
  Libraries: (
    <svg {...iconProps}>
      <path d="M12 3L3 7.5l9 4.5 9-4.5L12 3z" />
      <path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5" />
    </svg>
  ),
  "Web & Tools": (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

// "TensorFlow Lite Micro" -> "TL", "Python" -> "Py", "C/C++" -> "C".
function monogram(skill: string) {
  const words = skill.split("/")[0].trim().split(/\s+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return words[0].slice(0, 2);
}

export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300"
          >
            Toolkit
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Skills &amp; Technologies
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-white/70 sm:text-lg">
            The tools I reach for across machine learning, embedded systems, and the web.
          </motion.p>
        </motion.div>

        {/* Category cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group, index) => (
            <motion.article
              key={group.category}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-colors duration-300 hover:ring-indigo-400/40 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
                  {categoryIcons[group.category] ?? fallbackIcon}
                </span>
                <h3 className="text-lg font-bold text-white">{group.category}</h3>
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-2.5">
                {group.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    custom={skillIndex}
                    variants={skillVariants}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5 ring-1 ring-white/10"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500/20 text-[10px] font-bold text-indigo-300"
                    >
                      {monogram(skill)}
                    </span>
                    <span className="text-sm font-medium text-white/80">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
