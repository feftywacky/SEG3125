"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "../context/CartContext"

export default function CheckoutPage() {
  const { state } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    streetAddress: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate random order number
    const orderNumber = Math.floor(Math.random() * 10000) + 1000
    router.push(`/confirmation?order=${orderNumber}`)
  }

  const handleBack = () => {
    router.back()
  }

  const subtotal = state.total
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/cart" className="hover:text-gray-700">
          View Cart
        </Link>
        <span>/</span>
        <span className="text-gray-900">CheckOut</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Billing Details Form */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Billing Details</h1>

          <form onSubmit={handleNext} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Street Address*</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Town/City*</label>
              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email Address*</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
              />
            </div>

            <div className="flex flex-col space-y-4 pt-6">
              <button
                type="submit"
                className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-colors"
              >
                Next
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-colors"
              >
                Back
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="space-y-6">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                </div>
                <div className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}

            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between font-medium text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
