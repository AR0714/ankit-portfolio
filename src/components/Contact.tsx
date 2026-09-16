"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion, type Variants } from "framer-motion";
import { about } from "@/data/about";

// Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY with values from emailjs.com
// (or set them as NEXT_PUBLIC_EMAILJS_* environment variables instead of editing this file).
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "YOUR_SERVICE_ID";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "YOUR_PUBLIC_KEY";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const emptyForm: Fields = { name: "", email: "", subject: "", message: "" };

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.subject.trim()) errors.subject = "Please enter a subject.";
  if (!fields.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21H9z" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
    </svg>
  );
}

const socialIcons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

const inputClasses =
  "w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 ring-1 ring-white/10 transition-colors outline-none focus:ring-2 focus:ring-indigo-400";

export default function Contact() {
  const [fields, setFields] = useState<Fields>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof Fields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== "sending") setStatus("idle");
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: fields.name,
          from_email: fields.email,
          subject: fields.subject,
          message: fields.message,
          to_email: about.email,
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("sent");
      setFields(emptyForm);
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("error");
    }
  }

  const socialEntries = Object.entries(about.socials) as [string, string][];

  return (
    <section id="contact" className="relative border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300"
          >
            Contact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Get In Touch
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-white/70 sm:text-lg">
            Have a project, collaboration, or research idea? I&apos;d love to hear from you.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
          {/* Form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={fields.name}
                  onChange={(event) => update("name")(event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                  className={`mt-2 ${inputClasses}`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={fields.email}
                  onChange={(event) => update("email")(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@example.com"
                  className={`mt-2 ${inputClasses}`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="block text-sm font-medium text-white/80">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={fields.subject}
                onChange={(event) => update("subject")(event.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                placeholder="What's this about?"
                className={`mt-2 ${inputClasses}`}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1.5 text-sm text-red-400">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="block text-sm font-medium text-white/80">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={fields.message}
                onChange={(event) => update("message")(event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Tell me about it…"
                className={`mt-2 resize-y ${inputClasses}`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status === "sending" ? undefined : { scale: 1.02 }}
              whileTap={status === "sending" ? undefined : { scale: 0.98 }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "sending" && (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path
                    d="M12 2a10 10 0 0110 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {status === "sending" ? "Sending…" : "Send Message"}
            </motion.button>

            {/* Status messages are announced to screen readers as they appear. */}
            <div aria-live="polite">
              {status === "sent" && (
                <p className="mt-4 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/30">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 ring-1 ring-red-400/30">
                  Something went wrong. Please try emailing directly at{" "}
                  <a href={`mailto:${about.email}`} className="underline">
                    {about.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </motion.form>

          {/* Contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-4"
          >
            <motion.a
              variants={fadeUp}
              href={`mailto:${about.email}`}
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-colors hover:ring-indigo-400/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
                <MailIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wider text-white/50">
                  Email
                </span>
                <span className="block truncate text-sm font-medium text-white">{about.email}</span>
              </span>
            </motion.a>

            <motion.a
              variants={fadeUp}
              href={about.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-colors hover:ring-indigo-400/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
                <GitHubIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wider text-white/50">
                  GitHub
                </span>
                <span className="block truncate text-sm font-medium text-white">
                  github.com/AR0714
                </span>
              </span>
            </motion.a>

            <motion.a
              variants={fadeUp}
              href={about.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-colors hover:ring-indigo-400/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
                <LinkedInIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wider text-white/50">
                  LinkedIn
                </span>
                <span className="block truncate text-sm font-medium text-white">
                  linkedin.com/in/ankitraj0714
                </span>
              </span>
            </motion.a>

            {/* Social icon row */}
            <motion.div variants={fadeUp} className="mt-2 flex gap-3">
              {socialEntries.map(([key, url]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${about.name} on ${key}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-indigo-500 hover:text-white"
                  >
                    <Icon />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
