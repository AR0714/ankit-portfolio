import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProjectDetail from "@/components/ProjectDetail";
import { getProject, projects } from "@/data/projects";

// Pre-render a static page for every project at build time.
export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | Ankit Raj`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="w-full bg-zinc-950 text-white">
        <ProjectDetail project={project} />
      </main>
    </>
  );
}
