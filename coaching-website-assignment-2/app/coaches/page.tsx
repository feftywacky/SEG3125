import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { coachesData } from "@/lib/images"

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header currentPage="coaches" />

      {/* Hero Section */}
      <section className="px-6 py-12 lg:px-12 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6">Meet Our Elite Coaches</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Learn from the best players in the game. Our coaches are all high-ranking players from professional teams who
          will help you climb the ladder and improve your gameplay.
        </p>
      </section>

      {/* Coaches Grid */}
      <section className="px-6 py-12 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coachesData.map((coach) => (
            <Card key={coach.id} className="bg-gray-900 border-gray-800 hover:border-green-600 transition-colors">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Image
                    src={coach.image || "/placeholder.svg"}
                    alt={coach.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-white mb-1">{coach.name}</h3>
                  <p className="text-green-400 font-semibold">{coach.team}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Role:</span>
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      {coach.role}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rank:</span>
                    <span className="text-yellow-400 font-semibold">{coach.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rate:</span>
                    <span className="text-green-400 font-semibold">{coach.price}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {coach.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="border-green-600 text-green-400">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href="/book-now">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full">
                    Book Session
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
