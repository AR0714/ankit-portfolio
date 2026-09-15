import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";

// Temporary placeholder sections so the nav links have targets.
// Replace each with a real component (Skills, Contact) as you build them.
const placeholderSections = [
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-zinc-950 text-white">
        <Hero />
        <About />
        <Projects />
        {placeholderSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-[60vh] items-center justify-center border-t border-white/5 px-4"
          >
            <h2 className="text-3xl font-bold text-white/40 sm:text-4xl">
              {section.title} — coming soon
            </h2>
          </section>
        ))}
      </main>
    </>
  );
}
