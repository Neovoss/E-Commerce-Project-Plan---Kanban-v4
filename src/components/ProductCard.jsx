import { Link } from 'react-router-dom'

const FALLBACK_IMAGE = 'https://picsum.photos/seed/bandage-product/480/600'

export default function ProductCard({ product }) {
  const image = product.images?.[0]?.url ?? FALLBACK_IMAGE

  return (
    <Link
      to={`/product/${product.id}`}
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
      <div className="flex items-center gap-2 text-base font-bold">
        <span className="text-brand-success">${Number(product.price).toFixed(2)}</span>
      </div>
      <p className="text-sm text-brand-muted">
        {product.sell_count} satış · {Number(product.rating ?? 0).toFixed(2)} puan
      </p>
    </Link>
  )
}
