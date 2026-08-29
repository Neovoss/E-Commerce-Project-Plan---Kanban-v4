import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import OrderSummary from '../components/OrderSummary.jsx'
import {
  removeFromCart,
  toggleCartItem,
  updateCartCount,
} from '../store/actions/shoppingCartActions.js'

const FALLBACK_IMAGE = 'https://picsum.photos/seed/bandage-product/100/100'

export default function CartPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector((state) => state.shoppingCart.cart)

  if (cart.length === 0) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-brand-dark">Sepetiniz boş</h1>
        <Link to="/shop" className="rounded bg-brand px-8 py-3 text-sm font-bold text-white">
          Alışverişe başla
        </Link>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-start md:justify-center">
      <div className="flex flex-1 flex-col gap-4 md:max-w-3xl">
        <h1 className="text-2xl font-bold text-brand-dark">Sepetim ({cart.length} ürün)</h1>

        <div className="flex flex-col overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-gray-200 text-sm font-bold text-brand-muted">
                <th className="py-3">Seç</th>
                <th className="py-3">Ürün</th>
                <th className="py-3">Adet</th>
                <th className="py-3">Fiyat</th>
                <th className="py-3">Tutar</th>
                <th className="py-3">Sil</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product.id} className="border-b border-gray-100">
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      aria-label={`${item.product.name} ürününü seç`}
                      onChange={() => dispatch(toggleCartItem(item.product.id))}
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images?.[0]?.url ?? FALLBACK_IMAGE}
                        alt={item.product.name}
                        className="h-16 w-16 object-cover"
                      />
                      <span className="text-sm font-bold text-brand-dark">
                        {item.product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`${item.product.name} adetini azalt`}
                        onClick={() => dispatch(updateCartCount(item.product.id, item.count - 1))}
                        className="rounded border border-gray-200 p-1"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.count}</span>
                      <button
                        type="button"
                        aria-label={`${item.product.name} adetini artir`}
                        onClick={() => dispatch(updateCartCount(item.product.id, item.count + 1))}
                        className="rounded border border-gray-200 p-1"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-brand-muted">
                    ${Number(item.product.price).toFixed(2)}
                  </td>
                  <td className="py-4 text-sm font-bold text-brand-dark">
                    ${(item.product.price * item.count).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button
                      type="button"
                      aria-label={`${item.product.name} ürününü sil`}
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                    >
                      <Trash2 size={18} className="text-brand-danger" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OrderSummary actionLabel="Siparişi Oluştur" onAction={() => history.push('/order')} />
    </section>
  )
}
