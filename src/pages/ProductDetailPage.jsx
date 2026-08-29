import { useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const history = useHistory()
  const productList = useSelector((state) => state.product.productList)
  // T16'da urun dogrudan /products/:id ucundan cekilecek; su an listeden okunuyor
  const product = productList.find((item) => String(item.id) === String(productId))

  if (!product) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <p className="text-xl text-brand-muted">Ürün bulunamadı.</p>
        <Link to="/shop" className="rounded bg-brand px-8 py-3 text-sm font-bold text-white">
          Mağazaya dön
        </Link>
      </section>
    )
  }

  const image = product.images?.[0]?.url ?? 'https://picsum.photos/seed/bandage-product/500/450'

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-4 bg-brand-light px-6 py-8 md:flex-row md:justify-between">
        <button
          type="button"
          onClick={() => history.goBack()}
          className="flex items-center gap-2 text-sm font-bold text-brand-dark"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <nav className="flex items-center gap-2 text-sm font-bold">
          <Link to="/" className="text-brand-dark">
            Home
          </Link>
          <ChevronRight size={16} className="text-brand-muted" />
          <Link to="/shop" className="text-brand-muted">
            Shop
          </Link>
        </nav>
      </div>

      <section className="flex flex-col gap-8 px-6 py-10 md:flex-row md:justify-center">
        <div className="flex flex-col gap-4">
          <img
            src={image}
            alt={product.name}
            className="h-[450px] w-full object-cover md:w-[500px]"
          />
          <div className="flex gap-4">
            {(product.images ?? []).map((item) => (
              <img key={item.url} src={item.url} alt="" className="h-24 w-24 object-cover" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:max-w-md">
          <h1 className="text-xl text-brand-dark">{product.name}</h1>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} size={20} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm font-bold text-brand-muted">
              {product.sell_count} satış
            </span>
          </div>
          <p className="text-2xl font-bold text-brand-dark">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-sm font-bold text-brand-muted">
            Availability :{' '}
            <span className="text-brand">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </p>
          <p className="text-sm text-brand-muted">{product.description}</p>
          <div className="border-t border-gray-200 pt-6" />
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded bg-brand px-8 py-3 text-sm font-bold text-white"
            >
              Select Options
            </button>
            <button type="button" aria-label="Add to favorites" className="rounded-full border p-3">
              <Heart size={20} className="text-brand-muted" />
            </button>
            <button type="button" aria-label="Add to cart" className="rounded-full border p-3">
              <ShoppingCart size={20} className="text-brand-muted" />
            </button>
            <button type="button" aria-label="Quick view" className="rounded-full border p-3">
              <Eye size={20} className="text-brand-muted" />
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 bg-brand-light px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-dark">BESTSELLER PRODUCTS</h2>
        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center">
          {productList.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
