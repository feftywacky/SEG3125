"use client"

import Image from "next/image"
import { Star, Heart, Eye, ShoppingCart } from "lucide-react"
import { type Product, useCart } from "../context/CartContext"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", product })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium z-10">
          -{product.discount}%
        </div>
      )}

      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <Heart className="h-4 w-4" />
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="aspect-square bg-gray-100 relative">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500 font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add To Cart
        </button>
      </div>
    </div>
  )
}
