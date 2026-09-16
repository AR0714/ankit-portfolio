"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

type Filter = "All" | ProjectCategory;

// Only show a category button once at least one project uses that category.
const usedCategories = projectCategories.filter((category) =>
  projects.some((project) => project.category === category),
);

const filters: Filter[] = ["All", ...usedCategories];

// Shown in place of a screenshot until one is added.
const fallbackGradients: Record<ProjectCategory, string> = {
  Web: "from-indigo-600 via-indigo-900 to-zinc-900",
  Mobile: "from-emerald-500 via-teal-900 to-zinc-900",
  AI: "from-fuchsia-600 via-purple-900 to-zinc-900",
  Design: "from-amber-500 via-rose-900 to-zinc-900",
};

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
    // Stagger by column position so each row cascades in without long waits further down.
    transition: { duration: 0.5, delay: (index % 3) * 0.12, ease: "easeOut" },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:ring-indigo-400/40"
    >
      {/* Screenshot */}
      <div
        className={`relative aspect-video overflow-hidden bg-gradient-to-br ${fallbackGradients[project.category]}`}
      >
        {imageFailed ? (
          <div
            role="img"
            aria-label={`${project.title} (screenshot coming soon)`}
            className="flex h-full w-full items-center justify-center px-6 text-center text-2xl font-bold text-white/90"
          >
            {project.title}
          </div>
        ) : (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-400/20"
            >
              {tag}
            </li>
          ))}
        </ul>

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-6 flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-zinc-900"
              >
                <GitHubIcon />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
              >
                <ExternalLinkIcon />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
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
            My Work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Featured Projects
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-white/70 sm:text-lg">
            A selection of things I&apos;ve designed and built.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          role="group"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {filters.map((filter) => {
            const active = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={active}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                  active ? "text-white" : "text-white/60 ring-1 ring-white/15 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="active-project-filter"
                    className="absolute inset-0 rounded-full bg-indigo-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{filter}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleProjects.length === 0 && (
          <p className="mt-10 text-center text-white/60">
            No {activeFilter} projects yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
