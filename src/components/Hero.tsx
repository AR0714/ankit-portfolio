"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { about } from "@/data/about";

const TYPE_SPEED = 100;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 400;

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let delay = deleting ? DELETE_SPEED : TYPE_SPEED;

    if (!deleting && text === word) delay = PAUSE_AFTER_TYPE;
    if (deleting && text === "") delay = PAUSE_AFTER_DELETE;

    const timeout = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

export default function Hero() {
  const typed = useTypewriter(about.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-900"
    >
      {/* Video background (falls back to the gradient above if the file is missing) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300 sm:text-base"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {about.name}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mt-4 h-10 text-2xl font-semibold text-white/90 sm:mt-6 sm:h-12 sm:text-3xl md:text-4xl"
          aria-label={`I'm a ${about.roles.join(", ")}`}
        >
          <span aria-hidden="true">
            I&apos;m a <span className="text-indigo-400">{typed}</span>
            <span className="ml-1 inline-block w-[3px] animate-pulse bg-indigo-400 align-middle">
              &nbsp;
            </span>
          </span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-6 max-w-xl text-base text-white/70 sm:text-lg"
        >
          {about.tagline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-indigo-500 px-8 py-3.5 text-center font-semibold text-white shadow-lg shadow-indigo-500/30 transition-colors hover:bg-indigo-400"
          >
            See My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border-2 border-white/80 px-8 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white hover:text-zinc-900"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll-down arrow */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.6 },
          y: { delay: 1.4, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white sm:bottom-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </motion.a>
    </section>
  );
}
