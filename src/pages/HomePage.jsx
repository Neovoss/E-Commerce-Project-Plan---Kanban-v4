import { Link } from 'react-router-dom'
import Slider from '../components/Slider.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { heroSlides, categories, products } from '../data/mockData.js'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Slider slides={heroSlides} />

      <section className="flex flex-col items-center gap-8 px-6 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-bold text-brand-dark">EDITOR'S PICK</h2>
          <p className="text-sm text-brand-muted">Problems trying to resolve the conflict between</p>
        </div>
        <div className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/shop"
              className="relative flex h-[300px] w-full flex-col justify-end md:h-[500px] md:w-[240px]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="relative m-6 flex items-center justify-center bg-white px-10 py-4 text-base font-bold text-brand-dark">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 bg-brand-light px-6 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xl text-brand-muted">Featured Products</p>
          <h2 className="text-2xl font-bold text-brand-dark">BESTSELLER PRODUCTS</h2>
          <p className="text-sm text-brand-muted">Problems trying to resolve the conflict between</p>
        </div>
        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link
          to="/shop"
          className="rounded border border-brand px-10 py-4 text-sm font-bold text-brand"
        >
          LOAD MORE PRODUCTS
        </Link>
      </section>

      <section className="flex flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-center md:gap-16">
        <img
          src="https://picsum.photos/seed/bandage-feature/700/700"
          alt="Featured collection"
          className="h-[400px] w-full object-cover md:h-[600px] md:w-[500px]"
        />
        <div className="flex flex-col gap-6 md:max-w-md">
          <p className="text-base font-bold text-brand-muted">SUMMER 2020</p>
          <h2 className="text-4xl font-bold text-brand-dark">Part of the Neural Universe</h2>
          <p className="text-xl text-brand-muted">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex flex-col gap-3 md:flex-row">
            <Link
              to="/shop"
              className="rounded bg-brand px-8 py-4 text-center text-sm font-bold text-white"
            >
              BUY NOW
            </Link>
            <Link
              to="/about"
              className="rounded border border-brand px-8 py-4 text-center text-sm font-bold text-brand"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
