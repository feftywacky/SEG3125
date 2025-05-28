"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { coachesData } from "@/lib/images"

export default function BookNowPage() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discord: "",
    rank: "",
    role: "",
    coach: "",
    package: "",
    goals: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-800 max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-400">Booking Confirmed!</h2>
            <p className="text-gray-300 mb-6">
              Thank you for booking with LOLCoachUp! We'll contact you within 24 hours to schedule your session.
            </p>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8">Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header currentPage="book-now" />

      {/* Booking Form */}
      <section className="px-6 py-12 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Book Your Coaching Session</h1>
            <p className="text-xl text-gray-300">
              Fill out the form below and we'll match you with the perfect coach for your needs.
            </p>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Session Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="discord" className="text-white">
                    Discord Username
                  </Label>
                  <Input
                    id="discord"
                    value={formData.discord}
                    onChange={(e) => handleInputChange("discord", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="YourUsername#1234"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rank" className="text-white">
                      Current Rank
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("rank", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select your rank" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="iron">Iron</SelectItem>
                        <SelectItem value="bronze">Bronze</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="diamond">Diamond</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                        <SelectItem value="grandmaster">Grandmaster</SelectItem>
                        <SelectItem value="challenger">Challenger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-white">
                      Main Role
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="top">Top Lane</SelectItem>
                        <SelectItem value="jungle">Jungle</SelectItem>
                        <SelectItem value="mid">Mid Lane</SelectItem>
                        <SelectItem value="adc">ADC</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="coach" className="text-white">
                      Preferred Coach (Optional)
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("coach", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Any coach" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {coachesData.map((coach) => (
                          <SelectItem key={coach.id} value={coach.name.toLowerCase()}>
                            {coach.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="package" className="text-white">
                      Package
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("package", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="bronze">Bronze Package - $29</SelectItem>
                        <SelectItem value="gold">Gold Package - $49</SelectItem>
                        <SelectItem value="challenger">Challenger Package - $79</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="goals" className="text-white">
                    What are your goals?
                  </Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Tell us what you want to improve (e.g., climbing to Gold, better team fighting, champion mastery, etc.)"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 text-lg font-semibold"
                >
                  Book Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
