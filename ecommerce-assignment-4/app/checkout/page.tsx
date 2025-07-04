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
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    
    // Format expiry date with slash
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }
    
    // Only allow numbers for CVV
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '');
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value,
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
  const shipping = 0 as number
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

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Cardholder Name*</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm text-gray-600 mb-2">Card Number*</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Expiry Date*</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">CVV*</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength={4}
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>
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
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
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
