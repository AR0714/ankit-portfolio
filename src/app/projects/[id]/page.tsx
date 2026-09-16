import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProjectDetail from "@/components/ProjectDetail";
import { getProject, projects } from "@/data/projects";
import { OG_IMAGE, SITE_URL } from "@/data/site";

// Pre-render a static page for every project at build time.
export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  // Keep unknown ids out of search results.
  if (!project) return { title: "Project not found", robots: { index: false, follow: true } };

  // Metadata merges shallowly, so each of these objects must be complete here — otherwise a
  // project page would inherit the homepage's canonical URL and tell search engines it's a
  // duplicate of the homepage.
  const title = `${project.title} | Ankit Raj`;
  const url = `${SITE_URL}/projects/${project.id}`;
  // Prefer the project's own screenshot for link previews.
  const image = project.image ? { url: `${SITE_URL}${project.image}`, alt: project.title } : OG_IMAGE;

  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.description,
      type: "website",
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [image.url],
    },
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
