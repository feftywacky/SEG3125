"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function ConfirmationPage() {
  const { state, dispatch } = useCart()
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order") || "6578"

  useEffect(() => {
    // Clear cart after successful order
    dispatch({ type: "CLEAR_CART" })
  }, [dispatch])

  const subtotal = 1100 // Using example values since cart is cleared
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/cart" className="hover:text-gray-700">
          View Cart
        </Link>
        <span>/</span>
        <span className="text-gray-900">CheckOut</span>
      </nav>

      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{orderNumber} Confirmed: An email has been notified of you order
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Order Item */}
        {/* <div className="flex items-center space-x-4 mb-8">
          <Image
            src="/placeholder.svg?height=60&width=60"
            alt="ASUS Prime Nvidia GeForce RTX 5070"
            width={60}
            height={60}
            className="rounded-md"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">ASUS Prime Nvidia GeForce RTX 5070</h3>
          </div>
        </div> */}

        {/* Order Summary */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium text-lg">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/shop" className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
