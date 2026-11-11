"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { about } from "@/data/about";

const pub = about.ieeePublication;

type LightboxItem = { src: string; caption: string };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/** "4.7 ms" -> { prefix: "", number: 4.7, decimals: 1, suffix: " ms" }; "~15%" keeps the "~". */
function parseStat(value: string) {
  const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    number: Number(digits),
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    suffix,
  };
}

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const parsed = parseStat(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || !inView) return;

    if (reduceMotion) {
      el.textContent = value;
      return;
    }

    // Write straight to the DOM so the count-up doesn't re-render React every frame.
    const controls = animate(0, parsed.number, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        el.textContent = `${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, parsed]);

  // Values without digits (if any are added later) just render as-is.
  if (!parsed) return <span>{value}</span>;

  return (
    <span ref={ref} aria-hidden="true">
      {`${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`}
    </span>
  );
}

/** Image that falls back to a captioned placeholder until the file exists. */
function Shot({
  item,
  sizes,
  className = "",
}: {
  item: LightboxItem;
  sizes: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!item.src || failed) {
    return (
      <div
        role="img"
        aria-label={`${item.caption} (photo coming soon)`}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-indigo-900/60 via-zinc-900 to-zinc-900 px-3 text-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-6 w-6 text-indigo-300/70"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 17l4.5-4 3 2.5 3.5-3 4 4.5"
          />
        </svg>
        <span className="text-[11px] leading-tight font-medium text-white/60">
          {item.caption}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.caption}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: LightboxItem[];
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onStep]);

  const item = items[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
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

      {items.length > 1 &&
        ([-1, 1] as const).map((delta) => (
          <button
            key={delta}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onStep(delta);
            }}
            aria-label={delta === -1 ? "Previous image" : "Next image"}
            className={`absolute flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 ${
              delta === -1 ? "left-2 sm:left-6" : "right-2 sm:right-6"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={delta === -1 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
              />
            </svg>
          </button>
        ))}

      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-black/40">
          <Shot
            item={item}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="!object-contain"
          />
        </div>
        <figcaption className="mt-3 text-center text-sm text-white/70">
          {item.caption}
          {items.length > 1 && (
            <span className="text-white/40">
              {" "}
              · {index + 1} / {items.length}
            </span>
          )}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default function ResearchPublication() {
  const [lightbox, setLightbox] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const certificateItem: LightboxItem = {
    src: pub.certificate,
    caption: `IEEE ICIDeA 2026 certificate of participation — Paper ID ${pub.paperId}`,
  };

  const step = useCallback((delta: number) => {
    setLightbox((current) => {
      if (!current) return current;
      const count = current.items.length;
      return { ...current, index: (current.index + delta + count) % count };
    });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative overflow-hidden border-y border-indigo-400/30 bg-gradient-to-b from-indigo-950/60 via-zinc-950 to-zinc-950 py-6 sm:py-8"
    >
      {/* Glow behind the section, purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60rem] max-w-[120%] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/15 px-3 py-1 ring-1 ring-indigo-400/40">
            <span className="rounded-sm bg-[#00629B] px-1.5 py-0.5 text-[10px] font-extrabold tracking-[0.15em] text-white">
              IEEE
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Published Research
            </span>
          </span>
          <span className="text-xs text-white/50">
            Paper ID {pub.paperId} · {pub.session}
          </span>
        </motion.div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div>
            {/* Title + meta */}
            <motion.h2
              variants={fadeUp}
              id="research-heading"
              className="text-base leading-snug font-bold tracking-tight text-white sm:text-lg lg:text-xl"
            >
              {pub.title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-2 text-xs text-indigo-200/90 sm:text-sm"
            >
              {pub.conference}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-1 text-xs text-white/50">
              {pub.venue} · {pub.date}
            </motion.p>

            {/* Story */}
            <motion.p
              variants={fadeUp}
              className="mt-3 text-[13px] leading-relaxed text-white/70"
            >
              {pub.story}
            </motion.p>
            {/* Tags */}
            <motion.ul variants={fadeUp} className="mt-3 flex flex-wrap gap-2">
              {pub.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-indigo-400/25"
                >
                  {tag}
                </li>
              ))}
            </motion.ul>

            {/* Authors */}
            <motion.div variants={fadeUp} className="mt-3 space-y-0.5 text-xs">
              <p className="text-white/50">
                <span className="font-semibold text-white/70">Co-authors:</span>{" "}
                {pub.coAuthors.join(", ")}
              </p>
              <p className="text-white/50">
                <span className="font-semibold text-white/70">Guided by:</span>{" "}
                <span className="font-medium text-indigo-200">{pub.guide}</span>
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-3">
              {pub.certificate && (
                <button
                  type="button"
                  onClick={() =>
                    setLightbox({ items: [certificateItem], index: 0 })
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-colors hover:bg-indigo-400"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="9" r="5" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.5 13.5L7 22l5-2.5L17 22l-1.5-8.5"
                    />
                  </svg>
                  View Certificate
                </button>
              )}
              {pub.paperLink && (
                <a
                  href={pub.paperLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-zinc-900"
                >
                  View Paper
                </a>
              )}
            </motion.div>
          </div>

          {/* Stats + conference gallery */}
          <div>
            <motion.dl
              variants={staggerContainer}
              className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4"
            >
              {pub.stats.map((stat) => (
                <motion.div
                  key={stat.key}
                  variants={fadeUp}
                  className="row-span-2 grid grid-rows-subgrid gap-y-0.5"
                >
                  <dd className="text-lg font-extrabold text-indigo-300 sm:text-xl">
                    <span className="sr-only">{stat.value}</span>
                    <StatValue value={stat.value} />
                  </dd>
                  <dt className="text-[11px] leading-tight text-white/50">
                    {stat.label}
                  </dt>
                </motion.div>
              ))}
            </motion.dl>

            <motion.div variants={fadeUp} className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Conference Gallery
              </p>
              {/* One photo gets a full-width card; more than one falls back to a grid. */}
              <ul
                className={`mt-2 grid gap-2 ${
                  pub.gallery.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"
                }`}
              >
                {pub.gallery.map((item, index) => (
                  <li key={item.src}>
                    <button
                      type="button"
                      onClick={() => setLightbox({ items: pub.gallery, index })}
                      aria-label={`Open photo: ${item.caption}`}
                      className="group block w-full overflow-hidden rounded-lg ring-1 ring-white/10 transition-shadow hover:ring-indigo-400/50"
                    >
                      <span className="relative block aspect-video w-full overflow-hidden">
                        <Shot
                          item={item}
                          sizes={
                            pub.gallery.length === 1
                              ? "(min-width: 1024px) 560px, 100vw"
                              : "(min-width: 1024px) 200px, 33vw"
                          }
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                      {pub.gallery.length === 1 && (
                        <span className="block bg-white/5 px-3 py-2 text-left text-xs text-white/60">
                          {item.caption}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key="research-lightbox"
            items={lightbox.items}
            index={lightbox.index}
            onClose={closeLightbox}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
