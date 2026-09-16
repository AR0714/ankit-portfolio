"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Project } from "@/data/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const gradients: Record<Project["category"], string> = {
  Web: "from-indigo-600 via-indigo-900 to-zinc-900",
  Mobile: "from-emerald-500 via-teal-900 to-zinc-900",
  AI: "from-fuchsia-600 via-purple-900 to-zinc-900",
  Design: "from-amber-500 via-rose-900 to-zinc-900",
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/** Next/Image that falls back to a gradient panel when the file isn't there yet. */
function GalleryImage({
  src,
  alt,
  label,
  gradient,
  sizes,
  className = "",
  labelClassName = "text-sm",
  fit = "cover",
}: {
  src: string;
  alt: string;
  label: string;
  gradient: string;
  sizes: string;
  className?: string;
  labelClassName?: string;
  /** "contain" shows the whole image (screenshots stay readable); "cover" fills the frame. */
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${label} (image coming soon)`}
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br px-4 text-center font-semibold text-white/80 ${labelClassName} ${gradient}`}
      >
        {label}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

function Lightbox({
  project,
  index,
  onClose,
  onStep,
}: {
  project: Project;
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);

    // Stop the page behind the lightbox from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} image ${index + 1} of ${project.gallery.length}`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {project.gallery.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onStep(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onStep(1);
            }}
            aria-label="Next image"
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-4xl"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/40">
          <GalleryImage
            src={project.gallery[index]}
            alt={`${project.title} — image ${index + 1}`}
            label={`${project.title} — image ${index + 1}`}
            gradient={gradients[project.category]}
            sizes="(min-width: 1024px) 896px, 100vw"
            fit="contain"
          />
        </div>
        <figcaption className="mt-3 text-center text-sm text-white/60">
          {index + 1} / {project.gallery.length}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gradient = gradients[project.category];
  const paragraphs = project.longDescription.split("\n\n").filter(Boolean);

  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const count = project.gallery.length;
        return (current + delta + count) % count;
      });
    },
    [project.gallery.length],
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <article className="mx-auto max-w-4xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        {/* Back link */}
        <motion.div variants={fadeUp}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span> Back to Projects
          </Link>
        </motion.div>

        {/* Title + meta */}
        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-400/30">
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60 ring-1 ring-white/10">
              Featured
            </span>
          )}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {project.title}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-4 text-lg text-white/70">
          {project.description}
        </motion.p>

        <motion.ul variants={fadeUp} className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-400/20"
            >
              {tag}
            </li>
          ))}
        </motion.ul>

        {/* Banner */}
        <motion.div
          variants={fadeUp}
          className={`relative mt-10 w-full overflow-hidden rounded-2xl ring-1 ring-white/10 ${
            project.image ? "aspect-video" : "aspect-[4/3] sm:aspect-[21/9]"
          }`}
        >
          <GalleryImage
            src={project.image}
            alt={`${project.title} banner`}
            label={project.title}
            gradient={gradient}
            sizes="(min-width: 1024px) 896px, 100vw"
            labelClassName="text-xl sm:text-3xl"
          />
        </motion.div>
      </motion.div>

      {/* Long description */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-12"
      >
        <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white">
          Overview
        </motion.h2>
        {paragraphs.map((paragraph) => (
          <motion.p
            key={paragraph.slice(0, 40)}
            variants={fadeUp}
            className="mt-4 leading-relaxed text-white/70"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white">
            Key Highlights
          </motion.h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <motion.li
                key={highlight}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-300"
                >
                  ✓
                </span>
                <span className="text-sm text-white/80">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white">
            Gallery
          </motion.h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((src, index) => (
              <motion.button
                key={src}
                type="button"
                variants={fadeUp}
                whileHover={{ y: -4 }}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open image ${index + 1} of ${project.gallery.length} full screen`}
                className="group relative aspect-video overflow-hidden rounded-xl ring-1 ring-white/10 transition-shadow hover:ring-indigo-400/40"
              >
                <GalleryImage
                  src={src}
                  alt={`${project.title} — image ${index + 1}`}
                  label={`Image ${index + 1}`}
                  gradient={gradient}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </motion.button>
            ))}
          </div>
        </motion.section>
      )}

      {/* Actions */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap"
      >
        {project.report && (
          <motion.a
            variants={fadeUp}
            href={project.report}
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download Report
          </motion.a>
        )}

        {project.githubUrl && (
          <motion.a
            variants={fadeUp}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-zinc-900"
          >
            <GitHubIcon />
            View on GitHub
          </motion.a>
        )}

        {project.liveUrl && (
          <motion.a
            variants={fadeUp}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-colors hover:bg-indigo-400"
          >
            Live Demo
          </motion.a>
        )}
      </motion.div>

      {/* AnimatePresence tracks its direct children by key. */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            key="lightbox"
            project={project}
            index={lightboxIndex}
            onClose={closeLightbox}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </article>
  );
}
