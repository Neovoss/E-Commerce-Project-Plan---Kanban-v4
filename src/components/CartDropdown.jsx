import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { removeFromCart } from '../store/actions/shoppingCartActions.js'
import { cartTotals } from '../utils/cart.js'

const FALLBACK_IMAGE = 'https://picsum.photos/seed/bandage-product/80/80'

export default function CartDropdown() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)
  const [open, setOpen] = useState(false)

  const totalCount = cart.reduce((sum, item) => sum + item.count, 0)
  const { productsTotal } = cartTotals(cart)

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        aria-label="Shopping cart"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1"
      >
        <ShoppingCart size={20} />
        <span className="text-sm font-bold">{totalCount}</span>
      </button>

      {open && (
        <div className="flex w-full flex-col gap-4 py-4 md:absolute md:right-0 md:top-8 md:z-30 md:w-80 md:rounded md:bg-white md:p-4 md:shadow-lg">
          <h3 className="text-base font-bold text-brand-dark">Sepetim ({totalCount} ürün)</h3>

          {cart.length === 0 ? (
            <p className="text-sm text-brand-muted">Sepetiniz boş.</p>
          ) : (
            <>
              <div className="flex max-h-72 flex-col gap-3 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images?.[0]?.url ?? FALLBACK_IMAGE}
                      alt={item.product.name}
                      className="h-14 w-14 object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-bold text-brand-dark">
                        {item.product.name}
                      </span>
                      <span className="text-sm text-brand-muted">
                        {item.count} x ${Number(item.product.price).toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label={`${item.product.name} ürününü sil`}
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                    >
                      <Trash2 size={16} className="text-brand-danger" />
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-sm font-bold text-brand-dark">
                Toplam: ${productsTotal.toFixed(2)}
              </p>
              <div className="flex gap-2">
                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded border border-brand px-4 py-2 text-center text-sm font-bold text-brand"
                >
                  Sepete Git
                </Link>
                <Link
                  to="/order"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded bg-brand px-4 py-2 text-center text-sm font-bold text-white"
                >
                  Siparişi Tamamla
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
