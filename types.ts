export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug?: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

export interface Product extends CosmicObject {
  type_slug: 'products';
  metadata: {
    name: string;
    description?: string;
    price: number;
    sale_price?: number;
    product_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    category?: Category;
    in_stock?: boolean;
    stock_quantity?: number;
  };
}

export interface Category extends CosmicObject {
  type_slug: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

export interface Review extends CosmicObject {
  type_slug: 'reviews';
  metadata: {
    product?: Product;
    reviewer_name: string;
    star_rating: {
      key: string;
      value: string;
    };
    review_title?: string;
    review_comment?: string;
    review_date?: string;
  };
}

export type StarRating = '1' | '2' | '3' | '4' | '5';

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type_slug === 'products';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type_slug === 'categories';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type_slug === 'reviews';
}

// Utility functions
export function getDisplayPrice(product: Product): number {
  return product.metadata.sale_price || product.metadata.price;
}

export function hasDiscount(product: Product): boolean {
  return product.metadata.sale_price !== null && product.metadata.sale_price !== undefined;
}

export function getStarRatingNumber(rating: { key: string; value: string }): number {
  return parseInt(rating.key, 10);
}