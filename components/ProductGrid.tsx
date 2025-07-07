import Link from 'next/link'
import { Product, getDisplayPrice, hasDiscount } from '@/types'

interface ProductGridProps {
  products: Product[]
  title?: string
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found.</p>
      </div>
    )
  }

  return (
    <section className="py-12">
      {title && (
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                {product.metadata.product_images && product.metadata.product_images.length > 0 ? (
                  <img
                    src={`${product.metadata.product_images[0].imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={product.metadata.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="400"
                    height="400"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                
                {hasDiscount(product) && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
                    Sale
                  </div>
                )}
                
                {!product.metadata.in_stock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.metadata.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${getDisplayPrice(product).toFixed(2)}
                    </span>
                    {hasDiscount(product) && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.metadata.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {product.metadata.stock_quantity && product.metadata.stock_quantity <= 5 && product.metadata.in_stock && (
                    <span className="text-xs text-orange-600 font-medium">
                      Only {product.metadata.stock_quantity} left
                    </span>
                  )}
                </div>
                
                {product.metadata.category && (
                  <div className="mt-2">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {product.metadata.category.metadata?.name || product.metadata.category.title}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}