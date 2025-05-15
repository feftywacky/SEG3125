export default function Hero() {
  return (
    <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Hello, I'm Feiyu
        </span>
      </h1>
      <h2 className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
        A passionate developer creating beautiful, functional digital experiences
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="#projects"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          View My Experience
        </a>
        <a
          href="#about"
          className="px-6 py-3 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          About Me
        </a>
      </div>
    </section>
  )
}
