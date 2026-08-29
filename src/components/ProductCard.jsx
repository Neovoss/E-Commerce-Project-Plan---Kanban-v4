import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex cursor-pointer flex-col items-center gap-3 pb-6 transition hover:-translate-y-1"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-[430px] w-full max-w-[240px] object-cover"
        loading="lazy"
      />
      <h3 className="text-base font-bold text-brand-dark">{product.name}</h3>
      <p className="text-sm font-bold text-brand-muted">{product.department}</p>
      <div className="flex items-center gap-2 text-base font-bold">
        <span className="text-gray-400 line-through">${product.oldPrice}</span>
        <span className="text-brand-success">${product.price}</span>
      </div>
      <div className="flex items-center gap-2">
        {product.colors.map((color) => (
          <span
            key={color}
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </Link>
  )
}
