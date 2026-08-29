import { Link } from 'react-router-dom'
import { ChevronRight, LayoutGrid, List } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { categories, products } from '../data/mockData.js'

export default function ShopPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-4 bg-brand-light px-6 py-8 md:flex-row md:justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Shop</h1>
        <nav className="flex items-center gap-2 text-sm font-bold">
          <Link to="/" className="text-brand-dark">
            Home
          </Link>
          <ChevronRight size={16} className="text-brand-muted" />
          <span className="text-brand-muted">Shop</span>
        </nav>
      </div>

      <section className="flex flex-col gap-4 bg-brand-light px-6 pb-10 md:flex-row md:flex-wrap md:justify-center">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop/kadin/${category.title.toLowerCase()}/${category.id}`}
            className="relative flex h-[220px] w-full items-center justify-center md:w-[220px]"
          >
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0 h-full w-full object-cover brightness-50"
            />
            <span className="relative flex flex-col items-center gap-1 text-white">
              <span className="text-base font-bold">{category.title}</span>
              <span className="text-sm">{category.subtitle}</span>
            </span>
          </Link>
        ))}
      </section>

      <section className="flex flex-col items-center gap-6 px-6 py-10">
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm font-bold text-brand-muted">
            Showing all {products.length} results
          </p>
          <div className="flex items-center gap-3 text-brand-muted">
            <span className="text-sm font-bold">Views:</span>
            <button type="button" aria-label="Grid view" className="border p-2">
              <LayoutGrid size={16} />
            </button>
            <button type="button" aria-label="List view" className="border p-2">
              <List size={16} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <select
              className="rounded border border-gray-200 bg-brand-light px-4 py-2 text-sm text-brand-muted"
              defaultValue=""
            >
              <option value="">Popularity</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
            <button
              type="button"
              className="rounded bg-brand px-6 py-2 text-sm font-bold text-white"
            >
              Filter
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex items-center">
          <button
            type="button"
            className="rounded-l border border-gray-200 bg-brand-light px-5 py-4 text-sm font-bold text-gray-400"
          >
            First
          </button>
          <button
            type="button"
            className="border border-gray-200 bg-brand px-5 py-4 text-sm font-bold text-white"
          >
            1
          </button>
          <button
            type="button"
            className="border border-gray-200 px-5 py-4 text-sm font-bold text-brand"
          >
            2
          </button>
          <button
            type="button"
            className="rounded-r border border-gray-200 px-5 py-4 text-sm font-bold text-brand"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  )
}
