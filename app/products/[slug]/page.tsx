// app/products/[slug]/page.tsx
import { getProductBySlug, getReviewsForProduct } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductDetail'
import ReviewsSection from '@/components/ReviewsSection'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsForProduct(product.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
      
      {reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gradient mb-8">
            Customer Reviews
          </h2>
          <ReviewsSection reviews={reviews} />
        </section>
      )}
    </div>
  )
}