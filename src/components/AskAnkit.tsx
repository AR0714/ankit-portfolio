"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Message = { id: number; role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  id: 0,
  role: "assistant",
  content:
    "Hi! I am Ankit's AI assistant. Ask me anything about his projects, skills, or background 👋",
};

function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-label="Assistant is typing" role="status">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-zinc-800 px-4 py-3">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-2 w-2 rounded-full bg-white/60"
            animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AskAnkit() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, loading]);

  // Focus the input when the panel opens; close on Escape and return focus to the button.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const addMessage = (role: Message["role"], content: string) => {
    const message = { id: nextId.current++, role, content };
    setMessages((current) => [...current, message]);
    return message;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = addMessage("user", text);
    setInput("");
    setLoading(true);

    // The welcome line is UI only; the API gets the real conversation.
    const history = [...messages, userMessage]
      .filter((message) => message.id !== WELCOME.id)
      .map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data: { reply?: string; error?: string } = await response.json().catch(() => ({}));

      if (!response.ok || !data.reply) {
        addMessage("assistant", data.error ?? "Sorry, something went wrong. Please try again.");
      } else {
        addMessage("assistant", data.reply);
      }
    } catch {
      addMessage("assistant", "I couldn't reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="ask-ankit-panel"
            id="ask-ankit-panel"
            role="dialog"
            aria-label="Ask Ankit chat"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex h-[min(480px,calc(100svh-7rem))] w-[min(350px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl shadow-black/50 ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950 px-4 py-3">
              <p className="font-semibold text-white">Ask Ankit 🤖</p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              aria-live="polite"
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === "user"
                        ? "rounded-br-sm bg-indigo-500 text-white"
                        : "rounded-bl-sm bg-zinc-800 text-white/90"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}
              {loading && <TypingIndicator />}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-zinc-950 p-3"
            >
              <label htmlFor="ask-ankit-input" className="sr-only">
                Your question
              </label>
              <input
                ref={inputRef}
                id="ask-ankit-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, skills…"
                maxLength={1000}
                autoComplete="off"
                className="min-w-0 flex-1 rounded-full bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close Ask Ankit chat" : "Open Ask Ankit chat"}
        aria-expanded={open}
        aria-controls="ask-ankit-panel"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-2xl shadow-lg shadow-indigo-500/40 transition-colors hover:bg-indigo-400"
      >
        {/* Glow pulse; hidden for reduced motion. */}
        {!open && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-indigo-500/60 motion-safe:animate-ping"
          />
        )}
        <span aria-hidden="true" className="relative">
          🤖
        </span>
      </button>
    </div>
  );
}
