import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-6">
            <a
              href="https://github.com/feftywacky"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/feiyu-lin-uo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-purple-600 transition-colors">
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Feiyu Lin. All rights reserved.</p>
            <p className="text-gray-500 text-xs mt-1">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
