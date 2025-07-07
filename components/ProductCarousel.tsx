'use client'

import { useState } from 'react'
import { Product, getDisplayPrice, hasDiscount } from '@/types'
import Link from 'next/link'

interface ProductCarouselProps {
  products: Product[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No products available</p>
      </div>
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => {
            const firstImage = product.metadata.product_images?.[0]
            const displayPrice = getDisplayPrice(product)
            const discount = hasDiscount(product)

            return (
              <div key={product.id} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
                  <div className="relative group">
                    {firstImage && (
                      <div className="relative overflow-hidden rounded-lg glow">
                        <img
                          src={`${firstImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                          alt={product.metadata.name}
                          width={800}
                          height={600}
                          className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      {product.metadata.category && (
                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                          {product.metadata.category.metadata.name}
                        </span>
                      )}
                      
                      <h3 className="text-4xl font-bold text-gradient mb-4">
                        {product.metadata.name}
                      </h3>
                      
                      {product.metadata.description && (
                        <div 
                          className="text-muted-foreground text-lg leading-relaxed mb-6"
                          dangerouslySetInnerHTML={{ __html: product.metadata.description }}
                        />
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold text-foreground">
                        ${displayPrice.toFixed(2)}
                      </span>
                      {discount && (
                        <span className="text-xl text-muted-foreground line-through">
                          ${product.metadata.price.toFixed(2)}
                        </span>
                      )}
                      {discount && (
                        <span className="px-2 py-1 bg-accent text-accent-foreground rounded text-sm font-bold">
                          SALE
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <Link 
                        href={`/products/${product.slug}`}
                        className="btn-primary text-lg px-8 py-4"
                      >
                        View Details
                      </Link>
                      <button className="btn-secondary text-lg px-8 py-4">
                        Add to Cart
                      </button>
                    </div>

                    {product.metadata.in_stock && product.metadata.stock_quantity && (
                      <p className="text-sm text-muted-foreground">
                        {product.metadata.stock_quantity} items in stock
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="flex justify-center mt-8 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}