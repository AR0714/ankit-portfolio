import Groq from "groq-sdk";
import { projects, type Project } from "@/data/projects";

// llama-3.1-8b-instant was the original choice but is no longer available on Groq.
// Groq retires models regularly — see console.groq.com/docs/models for current IDs.
const MODEL = "qwen/qwen3.8-27b";

const PERSONA =
  "You are Ankit Raj — a final-year Electrical Engineering student at KIIT University specializing in edge AI and TinyML. You built a patent-pending on-device motor fault classifier on ESP32 with 85% accuracy. You interned at DRDO in 2026. You have research papers under review at ICIDeA 2026 and PEDES 2026. Your skills include Python, TensorFlow, PyTorch, TinyML, Edge Impulse, ESP32, React, TypeScript, Node.js, Flask, and MATLAB. Answer questions about your background, skills and projects in a friendly first-person voice in 2-4 sentences. If asked anything unrelated to Ankit, say you can only answer questions about Ankit.";

// Built from projects.ts so the bot always matches what the site shows.
function describeProject(project: Project) {
  return [
    `## ${project.title} (${project.category})`,
    `Summary: ${project.description}`,
    `Details: ${project.longDescription}`,
    `Tech stack: ${project.tags.join(", ")}`,
    `Key results and highlights:\n${project.highlights.map((item) => `- ${item}`).join("\n")}`,
    `Source code: ${project.githubUrl ?? "not publicly available"}`,
    `Live demo: ${project.liveUrl ?? "none"}`,
  ].join("\n");
}

const SYSTEM_PROMPT = `${PERSONA}

Below are full details of all ${projects.length} of your projects. Every one of them is your own work, so questions about any of them are about you. Answer project questions using only these facts. If someone asks for a detail that isn't listed here, say you don't have that detail to hand rather than guessing.

${projects.map(describeProject).join("\n\n")}`;

// Limits that keep a public endpoint from being used to run up the Groq quota.
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes, per IP

type ChatMessage = { role: "user" | "assistant"; content: string };

// Best-effort, in-memory rate limit. It resets when the server restarts and isn't shared
// across serverless instances, but it stops casual abuse from a single client.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

// Accept only user/assistant turns with string content, so a client can't inject its own
// system message and override the persona above.
function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null || !("messages" in body)) return null;
  const { messages } = body as { messages: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const cleaned: ChatMessage[] = [];
  for (const message of messages) {
    if (typeof message !== "object" || message === null) return null;
    const { role, content } = message as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) continue;
    cleaned.push({ role, content: trimmed.slice(0, MAX_MESSAGE_LENGTH) });
  }

  const recent = cleaned.slice(-MAX_MESSAGES);
  if (recent.length === 0 || recent[recent.length - 1].role !== "user") return null;
  return recent;
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is not set.");
    return Response.json({ error: "The chat assistant isn't configured yet." }, { status: 500 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "You're sending messages too quickly. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return Response.json(
      { error: "Expected a non-empty messages array ending with a user message." },
      { status: 400 },
    );
  }

  try {
    // Created per request so a missing key never breaks the build.
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
      temperature: 0.6,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return Response.json({ error: "No response from the assistant." }, { status: 502 });
    }
    return Response.json({ reply });
  } catch (error) {
    console.error("Groq request failed:", error);
    return Response.json(
      { error: "The assistant is unavailable right now. Please try again shortly." },
      { status: 502 },
    );
  }
}
