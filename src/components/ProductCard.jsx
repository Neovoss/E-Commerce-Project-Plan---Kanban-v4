import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'
import { addToCart } from '../store/actions/shoppingCartActions.js'
import { productPath } from '../utils/category.js'
import { useTranslation } from '../hooks/useTranslation.js'

const FALLBACK_IMAGE = 'https://picsum.photos/seed/bandage-product/480/600'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const t = useTranslation()
  const categories = useSelector((state) => state.product.categories)
  const image = product.images?.[0]?.url ?? FALLBACK_IMAGE

  const handleAddToCart = (event) => {
    event.preventDefault()
    dispatch(addToCart(product))
    toast.success(`${product.name} ${t.product.addedToCart}`)
  }

  return (
    <Link
      to={productPath(product, categories)}
      className="flex cursor-pointer flex-col items-center gap-3 pb-6 transition hover:-translate-y-1"
    >
      <img
        src={image}
        alt={product.name}
        className="h-[430px] w-full max-w-[240px] object-cover"
        loading="lazy"
      />
      <h3 className="text-center text-base font-bold text-brand-dark">{product.name}</h3>
      <p className="line-clamp-2 max-w-[240px] text-center text-sm font-bold text-brand-muted">
        {product.description}
      </p>
      <span className="text-base font-bold text-brand-success">
        ${Number(product.price).toFixed(2)}
      </span>
      <p className="text-sm text-brand-muted">
        {product.sell_count} {t.common.sales} · {Number(product.rating ?? 0).toFixed(2)}{' '}
        {t.common.rating}
      </p>
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex items-center gap-2 rounded bg-brand px-5 py-2 text-sm font-bold text-white"
      >
        <ShoppingCart size={16} /> {t.common.addToCart}
      </button>
    </Link>
  )
}
