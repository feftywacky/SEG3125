import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { images, testimonialsData } from "@/lib/images"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              LOLCoachUp: The Best League of Legends Coaching Service
            </h1>
            <p className="text-xl text-gray-300">Struggling in Ranked? Get Coached by Challenger Players</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg">
              Book Trial Session
            </Button>
          </div>

          <div className="relative">
            <Image
              src={images.hero.lolCharacters || "/placeholder.svg"}
              alt="League of Legends Characters"
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 text-black">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">80%</span>
                </div>
                <div>
                  <p className="font-semibold">Rank</p>
                  <p className="text-sm text-gray-600">Increased</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src={images.hero.coachingSession || "/placeholder.svg"}
              alt="Professional Coach"
              width={400}
              height={400}
              className="rounded-full w-full max-w-md mx-auto"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">We offer the best League of Legends coaching</h2>
            <p className="text-gray-300 leading-relaxed">
              Our professional coaches will help you climb the ranked ladder with personalized training sessions,
              advanced strategies, and expert gameplay analysis.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>1-on-1 Coaching</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Group Sessions</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>VOD Review</span>
              </div>
            </div>

            <Link href="/book-now">
              <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-3">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="px-6 py-12 lg:px-12 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">The Perfect Solution to your Ranked Struggles</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Whether you&apos;re stuck in low ELO or trying to break into high ranks, our coaching services are designed to
            help you improve quickly and efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "1-on-1 Coaching",
              description:
                "Personalized coaching sessions with professional players. Get real-time feedback, learn advanced strategies, and improve your gameplay with dedicated one-on-one training.",
            },
            {
              title: "Group Sessions",
              description:
                "Learn with other players in small group settings. Practice team coordination, communication, and advanced strategies with players at your skill level.",
            },
            {
              title: "VOD Review",
              description:
                "Detailed analysis of your gameplay recordings. Our coaches will break down your matches, identify mistakes, and provide actionable feedback to improve your performance.",
            },
          ].map((service, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-12 lg:px-12 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">What our customers say about us</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} className="bg-white text-black">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.testimonial}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
