import { useSelector } from 'react-redux'
import { FREE_SHIPPING_LIMIT } from '../utils/cart.js'
import { cartTotals } from '../utils/cart.js'

// T19: urun toplami + kargo - indirim = genel toplam
export default function OrderSummary({ actionLabel, onAction, disabled = false }) {
  const cart = useSelector((state) => state.shoppingCart.cart)
  const { productsTotal, shipping, discount, grandTotal } = cartTotals(cart)

  return (
    <aside className="flex h-fit w-full flex-col gap-4 rounded border border-gray-200 p-6 md:w-80">
      <h2 className="text-xl font-bold text-brand-dark">Sipariş Özeti</h2>

      <div className="flex items-center justify-between text-sm text-brand-dark">
        <span>Ürünlerin Toplamı</span>
        <span className="font-bold">${productsTotal.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between text-sm text-brand-dark">
        <span>Kargo Toplam</span>
        <span className="font-bold">${shipping.toFixed(2)}</span>
      </div>

      {shipping === 0 && productsTotal > 0 && (
        <p className="text-xs text-brand-success">
          ${FREE_SHIPPING_LIMIT} ve üzeri kargo bedava
        </p>
      )}

      {discount > 0 && (
        <div className="flex items-center justify-between text-sm text-brand-success">
          <span>İndirim</span>
          <span className="font-bold">-${discount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-bold text-brand-dark">
        <span>Toplam</span>
        <span className="text-brand-danger">${grandTotal.toFixed(2)}</span>
      </div>

      <button
        type="button"
        onClick={onAction}
        disabled={disabled || productsTotal === 0}
        className="rounded bg-brand px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        {actionLabel}
      </button>
    </aside>
  )
}
