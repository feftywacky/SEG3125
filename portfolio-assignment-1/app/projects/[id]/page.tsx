import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import GradientBackground from "@/components/gradient-background"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="relative min-h-screen">
      <GradientBackground />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <Link
          href="/#projects"
          className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>
            <p className="text-gray-700 text-center mb-8">
              This project page is currently under development. Check back later for more details about{" "}
              {params.id.replace(/-/g, " ")}.
            </p>
            <div className="flex justify-center">
              <Link
                href="/#projects"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Explore Other Projects
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
