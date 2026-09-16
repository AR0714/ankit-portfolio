import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import GitHubGraph from "@/components/GitHubGraph";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-zinc-950 text-white">
        <Hero />
        <About />
        <Projects />
        <GitHubGraph />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
