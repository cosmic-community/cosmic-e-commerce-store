import Link from 'next/link'
import { Category } from '@/types'

interface CategoryGridProps {
  categories: Category[]
  title?: string
}

export default function CategoryGrid({ categories, title }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No categories found.</p>
      </div>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      {title && (
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">{title}</h2>
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden">
                {category.thumbnail ? (
                  <img
                    src={`${category.thumbnail}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={category.metadata.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="600"
                    height="400"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {category.metadata.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.metadata.name}</h3>
                    {category.metadata.description && (
                      <p className="text-sm opacity-90 max-w-xs">
                        {category.metadata.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                    Shop {category.metadata.name}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}