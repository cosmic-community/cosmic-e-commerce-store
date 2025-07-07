# Cosmic E-commerce Store

A dark, mysterious e-commerce store built with Next.js and powered by Cosmic CMS. Features a spooky aesthetic with product browsing, category filtering, and customer reviews - perfect for those who prefer the darker side of shopping.

![Cosmic E-commerce Store](https://imgix.cosmicjs.com/f405ce30-a455-11ed-81f2-f50e185dd248-UCd78vfC8vU.jpg?w=1200&h=600&fit=crop&auto=format,compress)

## ✨ Features

- 🌙 Dark, atmospheric theme designed to be easy on the eyes
- 🛍️ Product catalog with categories (Electronics, Clothing, Home & Garden)
- ⭐ Customer reviews and star ratings system
- 🎠 Horizontal carousel with hover zoom effects
- 📱 Fully responsive design
- 🖼️ Optimized image handling with imgix
- ⚡ Built with Next.js 15 and TypeScript
- 🎨 Styled with Tailwind CSS
- 📊 Real-time product data from Cosmic CMS

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=ecommerce-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products with star ratings"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Use the image context ive shared to create a horizontal grid carousel which zooms each image on hover. Keep the website theme dark and scary, something that is easy on eyes but also keeps me awake. set apiEnvironment: staging in the cosmic config.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **React** - UI library
- **Bun** - Fast package manager and runtime

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd cosmic-ecommerce-store
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews
```typescript
const reviews = await cosmic.objects
  .find({ type: 'reviews' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Filtering by Category
```typescript
const electronicsProducts = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.category': categoryId 
  })
  .depth(1)
```

## 🌌 Cosmic CMS Integration

This application integrates with [Cosmic](https://www.cosmicjs.com) to manage:

- **Products** - E-commerce items with images, prices, and categories
- **Categories** - Product categorization (Electronics, Clothing, Home & Garden)
- **Reviews** - Customer feedback with star ratings and comments

For more information about the Cosmic SDK, visit the [Cosmic docs](https://www.cosmicjs.com/docs).

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

### Environment Variables for Production
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->