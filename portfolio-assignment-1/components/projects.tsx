import Link from "next/link"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      id: "project-1",
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with Next.js and Tailwind CSS, featuring product listings, cart functionality, and checkout process.",
      tags: ["Next.js", "Tailwind CSS", "Stripe"],
      image: "/ecommerce.jpg?height=600&width=800",
    },
    {
      id: "project-2",
      title: "Chess Game",
      description:
        "An interactive chess game with AI opponent, move validation, and game history tracking. Features both single-player and online multiplayer modes.",
      tags: ["JavaScript", "React", "Socket.io", "Chess.js"],
      image: "/chess.jpeg?height=600&width=800",
    },
    {
      id: "project-3",
      title: "Dentist App",
      description:
        "A dental appointment scheduling application with patient records management, calendar integration, and automated appointment reminders.",
      tags: ["React", "Firebase", "Calendar API", "Twilio"],
      image: "/dentist.jpg?height=600&width=800",
    },
    {
      id: "project-4",
      title: "Weather Dashboard",
      description:
        "An interactive weather dashboard that displays current conditions and forecasts with beautiful visualizations.",
      tags: ["React", "D3.js", "Weather API"],
      image: "/weather.png?height=600&width=800",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
