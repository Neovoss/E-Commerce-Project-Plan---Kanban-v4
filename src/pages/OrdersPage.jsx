import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Spinner from '../components/Spinner.jsx'
import { fetchOrders } from '../store/actions/orderActions.js'

export default function OrdersPage() {
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    let cancelled = false
    dispatch(fetchOrders())
      .then((data) => {
        if (!cancelled) {
          setOrders(Array.isArray(data) ? data : [])
          setLoading(false)
        }
      })
      .catch((requestError) => {
        console.error('Orders could not be fetched:', requestError)
        if (!cancelled) {
          setError('Siparişler yüklenemedi.')
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [dispatch])

  if (loading) {
    return <Spinner label="Siparişler yükleniyor..." />
  }

  return (
    <section className="flex flex-col items-center gap-6 px-6 py-10">
      <div className="flex w-full max-w-4xl flex-col gap-4">
        <h1 className="text-2xl font-bold text-brand-dark">Siparişlerim</h1>

        {error && <p className="text-sm font-bold text-brand-danger">{error}</p>}

        {!error && orders.length === 0 && (
          <p className="text-sm text-brand-muted">Henüz bir siparişiniz yok.</p>
        )}

        <div className="flex flex-col overflow-x-auto">
          {orders.length > 0 && (
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-gray-200 text-sm font-bold text-brand-muted">
                  <th className="py-3">Sipariş No</th>
                  <th className="py-3">Tarih</th>
                  <th className="py-3">Ürün Adedi</th>
                  <th className="py-3">Tutar</th>
                  <th className="py-3">Detay</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <Fragment key={order.id}>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 text-sm font-bold text-brand-dark">#{order.id}</td>
                      <td className="py-4 text-sm text-brand-muted">
                        {new Date(order.order_date).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="py-4 text-sm text-brand-muted">
                        {order.products?.length ?? 0}
                      </td>
                      <td className="py-4 text-sm font-bold text-brand-dark">
                        ${Number(order.price).toFixed(2)}
                      </td>
                      <td className="py-4">
                        <button
                          type="button"
                          aria-label={`${order.id} numaralı sipariş detayı`}
                          aria-expanded={openId === order.id}
                          onClick={() => setOpenId(openId === order.id ? null : order.id)}
                          className="flex items-center gap-1 text-sm font-bold text-brand"
                        >
                          {openId === order.id ? (
                            <Fragment key={order.id}>
                              Gizle <ChevronUp size={16} />
                            </Fragment>
                          ) : (
                            <Fragment key={order.id}>
                              Göster <ChevronDown size={16} />
                            </Fragment>
                          )}
                        </button>
                      </td>
                    </tr>

                    {openId === order.id && (
                      <tr className="border-b border-gray-100">
                        <td colSpan={5} className="bg-brand-light px-4 py-4">
                          <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold text-brand-dark">
                              Kart: **** **** **** {String(order.card_no).slice(-4)} ·{' '}
                              {order.card_name}
                            </p>
                            {(order.products ?? []).map((item) => (
                              <div
                                key={`${order.id}-${item.product_id}`}
                                className="flex items-center justify-between text-sm text-brand-muted"
                              >
                                <span>{item.detail ?? `Ürün #${item.product_id}`}</span>
                                <span>{item.count} adet</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  )
}
