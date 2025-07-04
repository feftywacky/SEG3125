"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { products } from "../data/products"
import ProductCard from "../components/ProductCard"

export default function ShopPage() {
  const [sortBy, setSortBy] = useState("low-high")
  const [priceRange, setPriceRange] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [ratings, setRatings] = useState<string[]>([])

  const handleCheckboxChange = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Price filter
      const priceInRange =
        priceRange.length === 0 ||
        priceRange.some((range) => {
          if (range === "$0.00 - $150.00") return product.price <= 150
          if (range === "$150.00 - $350.00") return product.price > 150 && product.price <= 350
          if (range === "$150.00 - $504.00") return product.price > 150 && product.price <= 504
          if (range === "$450.00 +") return product.price > 450
          return true
        })

      // Category filter
      const categoryMatch = categories.length === 0 || categories.includes(product.category)

      // Brand filter
      const brandMatch = brands.length === 0 || brands.includes(product.brand)

      // Rating filter
      const ratingMatch =
        ratings.length === 0 ||
        ratings.some((rating) => {
          const stars = Number.parseInt(rating)
          return product.rating >= stars
        })

      return priceInRange && categoryMatch && brandMatch && ratingMatch
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "low-high":
          return a.price - b.price
        case "high-low":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return filtered
  }, [sortBy, priceRange, categories, brands, ratings])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className="w-64 flex-shrink-0">
          <div className="space-y-6">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By:</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white appearance-none"
                >
                  <option value="low-high">Low-High</option>
                  <option value="high-low">High-Low</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Price Filter</h3>
              <div className="space-y-2">
                {["$0.00 - $150.00", "$150.00 - $350.00", "$150.00 - $504.00", "$450.00 +"].map((range) => (
                  <label key={range} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={priceRange.includes(range)}
                      onChange={() => handleCheckboxChange(range, setPriceRange)}
                      className="mr-2"
                    />
                    <span className="text-sm">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {["CPU", "RAM", "GPU", "Case", "Motherboard", "Accessories"].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={categories.includes(category)}
                      onChange={() => handleCheckboxChange(category, setCategories)}
                      className="mr-2"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {["AMD", "Intel", "Nvidia", "Other"].map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={brands.includes(brand)}
                      onChange={() => handleCheckboxChange(brand, setBrands)}
                      className="mr-2"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Item</h3>
              <div className="space-y-2">
                {["5", "4", "3", "2"].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={ratings.includes(rating)}
                      onChange={() => handleCheckboxChange(rating, setRatings)}
                      className="mr-2"
                    />
                    <span className="text-sm">{rating} stars & up</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
