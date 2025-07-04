"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, ChevronLeft } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", productId })
  }

  const subtotal = state.total
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link href="/shop" className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">Cart</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
              </div>
            </div>

            <div className="divide-y">
              {state.items.map((item) => (
                <div key={item.id} className="px-6 py-6">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                      </div>
                    </div>

                    <div className="text-gray-900 font-medium">${item.price}</div>

                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center"
                      />
                      <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link
              href="/shop"
              className="flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Return To Shop
            </Link>
            <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Update Cart
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Cart Total</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors text-center block"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
