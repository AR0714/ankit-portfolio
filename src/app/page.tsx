import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResearchPublication from "@/components/ResearchPublication";
import About from "@/components/About";
import Projects from "@/components/Projects";
import GitHubGraph from "@/components/GitHubGraph";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-zinc-950 text-white">
        <Hero />
        <ResearchPublication />
        <About />
        <Projects />
        <GitHubGraph />
        <Skills />
        <Contact />
      </main>
      <CurrentlyBuilding />
      <Footer />
    </>
  );
}
