export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">About Me</span>
        </h2>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
          <p className="text-gray-700 mb-4">
            Hello! I'm a passionate developer with a keen interest in creating beautiful, functional digital
            experiences. I specialize in front-end development with expertise in React, Next.js, and modern CSS
            frameworks like Tailwind.
          </p>
          <p className="text-gray-700 mb-4">
            My approach to design focuses on clean aesthetics with attention to detail, ensuring both visual appeal and
            excellent user experience. I believe in writing clean, maintainable code that scales well with project
            growth.
          </p>
          <p className="text-gray-700">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
            enjoying outdoor activities to maintain a healthy work-life balance.
          </p>
        </div>
      </div>
    </section>
  )
}
