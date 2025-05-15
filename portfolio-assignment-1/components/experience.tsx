export default function Experience() {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "HubSpot",
      period: "May 2025 - August 2025",
      description:
        "Developed features for HubSpot's CRM platform using React and TypeScript. Enhanced customer management modules and sales pipeline visualization tools. Collaborated with product teams to implement user-requested features and improve data analytics dashboards.",
    },
    {
      title: "Software Engineer Intern",
      company: "Dayforce",
      period: "January 2025 - April 2025",
      description:
        "Contributed to Dayforce's payroll processing system development. Implemented tax calculation algorithms and automated payment reporting features. Improved the UI/UX of employee time tracking interfaces and helped integrate third-party benefits systems.",
    },
    {
      title: "Software Engineer Intern",
      company: "Lim Geomatics",
      period: "May 2024 - Augest 2024",
      description:
        "Developed geospatial visualization tools and mapping applications for forestry and land management clients. Implemented GIS data processing algorithms and worked with satellite imagery analysis. Created interactive web-based mapping solutions using Leaflet and OpenLayers.",
    },
  ]

  const education = {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Ottawa",
    period: "2022 - 2027",
    description:
      "Focused on software engineering, web development, and artificial intelligence. Participated in hackathons and coding competitions",
  }

  return (
    <section id="experience" className="py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Experience</span>
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border-l-4 border-gradient-to-r from-purple-600 to-pink-600"
            >
              <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
              <div className="flex justify-between items-center mt-1 mb-3">
                <span className="text-purple-600 font-medium">{exp.company}</span>
                <span className="text-gray-500 text-sm">{exp.period}</span>
              </div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border-l-4 border-gradient-to-r from-blue-500 to-teal-400">
              <h3 className="text-xl font-semibold text-gray-800">{education.degree}</h3>
              <div className="flex justify-between items-center mt-1 mb-3">
                <span className="text-blue-600 font-medium">{education.institution}</span>
                <span className="text-gray-500 text-sm">{education.period}</span>
              </div>
              <p className="text-gray-700">{education.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
