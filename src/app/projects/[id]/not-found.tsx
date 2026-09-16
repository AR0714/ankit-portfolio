import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ProjectNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-svh w-full flex-col items-center justify-center bg-zinc-950 px-4 text-center text-white">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">404</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Project not found</h1>
        <p className="mt-4 max-w-md text-white/70">
          That project doesn&apos;t exist — it may have been renamed or removed.
        </p>
        <Link
          href="/#projects"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-colors hover:bg-indigo-400"
        >
          <span aria-hidden="true">←</span> Back to Projects
        </Link>
      </main>
    </>
  );
}
