import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import AddressStep from '../components/AddressStep.jsx'
import PaymentStep from '../components/PaymentStep.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { createOrder } from '../store/actions/orderActions.js'
import { cartTotals, selectedItems } from '../utils/cart.js'

const STEPS = [
  { id: 1, label: 'Adres Bilgileri' },
  { id: 2, label: 'Ödeme Seçenekleri' },
]

export default function CreateOrderPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector((state) => state.shoppingCart.cart)
  const creditCards = useSelector((state) => state.client.creditCards)

  const [step, setStep] = useState(1)
  const [addressId, setAddressId] = useState(null)
  const [cardId, setCardId] = useState(null)
  const [ccv, setCcv] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { grandTotal } = cartTotals(cart)

  const goToPayment = () => {
    if (!addressId) {
      toast.warning('Lütfen bir teslimat adresi seçin.')
      return
    }
    setStep(2)
  }

  const handleCreateOrder = async () => {
    const card = creditCards.find((item) => String(item.id) === String(cardId))
    if (!card) {
      toast.warning('Lütfen bir ödeme kartı seçin.')
      return
    }
    if (!/^\d{3,4}$/.test(ccv)) {
      toast.warning('Lütfen geçerli bir CCV girin.')
      return
    }

    const payload = {
      address_id: addressId,
      order_date: new Date().toISOString().slice(0, 19),
      card_no: Number(card.card_no),
      card_name: card.name_on_card,
      card_expire_month: Number(card.expire_month),
      card_expire_year: Number(card.expire_year),
      card_ccv: Number(ccv),
      price: Number(grandTotal.toFixed(2)),
      products: selectedItems(cart).map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.name,
      })),
    }

    setSubmitting(true)
    try {
      await dispatch(createOrder(payload))
      toast.success('Siparişiniz alındı, teşekkür ederiz!')
      history.push('/orders')
    } catch (error) {
      console.error('Order could not be created:', error)
      toast.error(error.response?.data?.message ?? 'Sipariş oluşturulamadı.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-start md:justify-center">
      <div className="flex flex-1 flex-col gap-6 md:max-w-3xl">
        <nav className="flex items-center gap-4">
          {STEPS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => item.id === 1 && setStep(1)}
              className={`flex-1 rounded border px-4 py-3 text-sm font-bold ${
                step === item.id
                  ? 'border-brand bg-brand text-white'
                  : 'border-gray-200 text-brand-muted'
              }`}
            >
              {item.id}. {item.label}
            </button>
          ))}
        </nav>

        {step === 1 ? (
          <AddressStep selectedId={addressId} onSelect={setAddressId} />
        ) : (
          <PaymentStep
            selectedCardId={cardId}
            onSelectCard={setCardId}
            ccv={ccv}
            onCcvChange={setCcv}
          />
        )}
      </div>

      {step === 1 ? (
        <OrderSummary actionLabel="Kaydet ve Devam Et" onAction={goToPayment} />
      ) : (
        <div className="flex w-full flex-col gap-3 md:w-80">
          <OrderSummary
            actionLabel={submitting ? 'Gönderiliyor...' : 'Ödeme Yap'}
            onAction={handleCreateOrder}
            disabled={submitting}
          />
          {submitting && (
            <p className="flex items-center justify-center gap-2 text-sm text-brand-muted">
              <Loader2 size={16} className="animate-spin" /> Siparişiniz oluşturuluyor
            </p>
          )}
        </div>
      )}
    </section>
  )
}
