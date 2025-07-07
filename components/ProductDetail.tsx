import { Product, getDisplayPrice, hasDiscount } from '@/types'
import { useState } from 'react'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const images = product.metadata.product_images || []
  const displayPrice = getDisplayPrice(product)
  const isOnSale = hasDiscount(product)
  const isInStock = product.metadata.in_stock
  const stockQuantity = product.metadata.stock_quantity || 0

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            {images.length > 0 ? (
              <img
                src={`${images[selectedImageIndex].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={product.metadata.name}
                className="w-full h-full object-cover"
                width="800"
                height="800"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-lg">No image available</span>
              </div>
            )}
            
            {isOnSale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded">
                Sale
              </div>
            )}
            
            {!isInStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={`${product.metadata.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    width="80"
                    height="80"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.metadata.name}
            </h1>
            
            {product.metadata.category && (
              <p className="text-sm text-gray-600 mb-4">
                Category:{' '}
                <span className="font-medium">
                  {product.metadata.category.metadata?.name || product.metadata.category.title}
                </span>
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">
              ${displayPrice.toFixed(2)}
            </span>
            {isOnSale && (
              <span className="text-xl text-gray-500 line-through">
                ${product.metadata.price.toFixed(2)}
              </span>
            )}
            {isOnSale && (
              <span className="bg-red-100 text-red-800 px-2 py-1 text-sm font-semibold rounded">
                Save ${(product.metadata.price - displayPrice).toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isInStock ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className={`font-medium ${
              isInStock ? 'text-green-700' : 'text-red-700'
            }`}>
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </span>
            {isInStock && stockQuantity <= 5 && (
              <span className="text-orange-600 text-sm">
                (Only {stockQuantity} left)
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          {isInStock && (
            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= stockQuantity}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            type="button"
            disabled={!isInStock}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
              isInStock
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isInStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Product Description */}
          {product.metadata.description && (
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.metadata.description }}
              />
            </div>
          )}

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-600">SKU:</dt>
                <dd className="font-medium">{product.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Stock:</dt>
                <dd className="font-medium">
                  {isInStock ? `${stockQuantity} available` : 'Out of stock'}
                </dd>
              </div>
              {product.metadata.category && (
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="font-medium">
                    {product.metadata.category.metadata?.name || product.metadata.category.title}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}