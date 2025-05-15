import About from "@/components/about"
import Experience from "@/components/experience"
import Footer from "@/components/footer"
import GradientBackground from "@/components/gradient-background"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Projects from "@/components/projects"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <GradientBackground />
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
