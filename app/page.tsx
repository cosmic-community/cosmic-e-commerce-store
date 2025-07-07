import { getAllProducts, getAllCategories, getAllReviews } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ProductCarousel from '@/components/ProductCarousel'
import CategoryGrid from '@/components/CategoryGrid'
import ReviewsSection from '@/components/ReviewsSection'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllReviews()
  ])

  return (
    <div className="space-y-16">
      <Hero />
      
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>
        <ProductCarousel products={products} />
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our carefully curated categories
          </p>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Customer Reviews
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our customers are saying
          </p>
        </div>
        <ReviewsSection reviews={reviews.slice(0, 6)} />
      </section>
    </div>
  )
}