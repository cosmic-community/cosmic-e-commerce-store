import { Review, getStarRatingNumber } from '@/types'

interface ReviewsSectionProps {
  reviews: Review[]
  title?: string
  productId?: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, productId }: { review: Review; productId?: string }) {
  const rating = getStarRatingNumber(review.metadata.star_rating)
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-gray-900">{review.metadata.reviewer_name}</h4>
          <div className="flex items-center space-x-2 mt-1">
            <StarRating rating={rating} />
            <span className="text-sm text-gray-600">{review.metadata.star_rating?.value || 'N/A'}</span>
          </div>
        </div>
        {review.metadata.review_date && (
          <span className="text-sm text-gray-500">
            {new Date(review.metadata.review_date).toLocaleDateString()}
          </span>
        )}
      </div>
      
      {review.metadata.review_title && (
        <h5 className="font-medium text-gray-900 mb-2">{review.metadata.review_title}</h5>
      )}
      
      {review.metadata.review_comment && (
        <p className="text-gray-700 leading-relaxed">{review.metadata.review_comment}</p>
      )}
      
      {review.metadata.product && !productId && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Review for:{' '}
            <span className="font-medium text-gray-900">
              {review.metadata.product?.metadata?.name || review.metadata.product?.title || 'Unknown Product'}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default function ReviewsSection({ reviews, title = "Customer Reviews", productId }: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
          <div className="text-center py-8">
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        </div>
      </section>
    )
  }

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => 
    sum + getStarRatingNumber(review.metadata.star_rating), 0
  )
  const averageRating = totalRating / reviews.length

  // Count ratings by star
  const ratingCounts = [1, 2, 3, 4, 5].map(star => 
    reviews.filter(review => getStarRatingNumber(review.metadata.star_rating) === star).length
  )

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
        
        {/* Rating Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={Math.round(averageRating)} />
                  <p className="text-sm text-gray-600 mt-1">
                    Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-2 text-sm">
                  <span className="w-8">{star} star</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                    />
                  </div>
                  <span className="w-8 text-gray-600">{ratingCounts[star - 1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} productId={productId} />
          ))}
        </div>
      </div>
    </section>
  )
}