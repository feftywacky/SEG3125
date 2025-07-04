"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function SurveyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shoppingExperience: "",
    purchaseToday: "",
    rating: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your feedback!")
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      shoppingExperience: "",
      purchaseToday: "",
      rating: "",
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">Survey</span>
      </nav>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone *"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Shopping Experience Question */}
        <div>
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-red-500 mr-2" />
            <label className="text-gray-900 font-medium">What did you like about shopping with us?</label>
          </div>
          <textarea
            name="shoppingExperience"
            value={formData.shoppingExperience}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white resize-none"
          />
        </div>

        {/* Purchase Question */}
        <div>
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-red-500 mr-2" />
            <label className="text-gray-900 font-medium">What did you buy today?</label>
          </div>
          <textarea
            name="purchaseToday"
            value={formData.purchaseToday}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white resize-none"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-900 font-medium mb-4">Rating 1 - 10</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="10"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-red-500 text-white py-3 px-8 rounded-md hover:bg-red-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
