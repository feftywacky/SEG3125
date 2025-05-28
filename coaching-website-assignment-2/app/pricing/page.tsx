import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"

const pricingPlans = [
  {
    name: "Bronze Package",
    price: "$29",
    period: "per session",
    description: "Perfect for beginners looking to improve their fundamentals",
    features: [
      "1-hour coaching session",
      "Basic gameplay review",
      "Champion recommendations",
      "Fundamental skill training",
      "Post-session summary",
    ],
    popular: false,
  },
  {
    name: "Gold Package",
    price: "$49",
    period: "per session",
    description: "Ideal for intermediate players wanting to climb ranks",
    features: [
      "1.5-hour coaching session",
      "In-depth VOD review",
      "Advanced strategy training",
      "Role-specific coaching",
      "Custom practice drills",
      "Discord support for 1 week",
    ],
    popular: true,
  },
  {
    name: "Challenger Package",
    price: "$79",
    period: "per session",
    description: "Premium coaching for serious competitive players",
    features: [
      "2-hour intensive session",
      "Professional VOD analysis",
      "Team coordination training",
      "Meta analysis & adaptation",
      "Personalized training plan",
      "24/7 Discord support",
      "Monthly progress review",
    ],
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header currentPage="pricing" />

      {/* Hero Section */}
      <section className="px-6 py-12 lg:px-12 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6">Choose Your Path to Victory</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Select the coaching package that fits your goals and budget. All packages include personalized coaching from
          our elite team of professional players.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-12 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-gray-900 border-gray-800 ${plan.popular ? "border-green-600 scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-green-400">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/book-now">
                  <Button
                    className={`w-full rounded-full ${
                      plan.popular
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-transparent border border-white text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-12 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">How do sessions work?</h3>
              <p className="text-gray-300">
                Sessions are conducted via Discord screen share where our coaches will review your gameplay, provide
                real-time feedback, and teach you advanced strategies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">Can I choose my coach?</h3>
              <p className="text-gray-300">
                Yes! You can browse our coaches page and select the coach that specializes in your role and preferred
                playstyle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">What if I&apos;m not satisfied?</h3>
              <p className="text-gray-300">
                We offer a 100% satisfaction guarantee. If you&apos;re not happy with your session, we&apos;ll provide a full
                refund or reschedule with a different coach.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">How quickly will I improve?</h3>
              <p className="text-gray-300">
                Most students see improvement within 1-2 sessions, with significant rank increases typically occurring
                within 2-4 weeks of consistent coaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
