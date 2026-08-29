import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteCard, fetchCards, saveCard, updateCard } from '../store/actions/clientActions.js'

const CARD_NO_PATTERN = /^\d{16}$/
const CCV_PATTERN = /^\d{3,4}$/
const CURRENT_YEAR = new Date().getFullYear()

const EMPTY_FORM = { card_no: '', expire_month: '', expire_year: '', name_on_card: '' }

export default function PaymentStep({ selectedCardId, onSelectCard, ccv, onCcvChange }) {
  const dispatch = useDispatch()
  const creditCards = useSelector((state) => state.client.creditCards)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', defaultValues: EMPTY_FORM })

  useEffect(() => {
    dispatch(fetchCards()).catch((error) => {
      console.error('Cards could not be fetched:', error)
      toast.error('Kartlar yüklenemedi.')
    })
  }, [dispatch])

  const closeForm = () => {
    setFormOpen(false)
    setEditingId(null)
    reset(EMPTY_FORM)
  }

  const startEdit = (card) => {
    setEditingId(card.id)
    setFormOpen(true)
    reset({
      card_no: card.card_no,
      expire_month: card.expire_month,
      expire_year: card.expire_year,
      name_on_card: card.name_on_card,
    })
  }

  const onSubmit = async (formData) => {
    const payload = {
      card_no: formData.card_no,
      expire_month: Number(formData.expire_month),
      expire_year: Number(formData.expire_year),
      name_on_card: formData.name_on_card,
    }

    try {
      if (editingId) {
        await dispatch(updateCard({ id: editingId, ...payload }))
        toast.success('Kart güncellendi.')
      } else {
        await dispatch(saveCard(payload))
        toast.success('Kart eklendi.')
      }
      closeForm()
    } catch (error) {
      console.error('Card could not be saved:', error)
      toast.error('Kart kaydedilemedi.')
    }
  }

  const handleDelete = async (cardId) => {
    try {
      await dispatch(deleteCard(cardId))
      toast.success('Kart silindi.')
    } catch (error) {
      console.error('Card could not be deleted:', error)
      toast.error('Kart silinemedi.')
    }
  }

  const inputClass =
    'rounded border border-gray-300 px-4 py-2 text-sm text-brand-dark outline-none focus:border-brand'
  const errorClass = 'text-xs font-bold text-brand-danger'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-dark">Ödeme Bilgileri</h2>
        <button
          type="button"
          onClick={() => (formOpen ? closeForm() : setFormOpen(true))}
          className="rounded border border-brand px-4 py-2 text-sm font-bold text-brand"
        >
          {formOpen ? 'Vazgeç' : 'Yeni Kart Ekle'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {creditCards.length === 0 && (
          <p className="text-sm text-brand-muted">Kayıtlı kartınız yok, yeni bir kart ekleyin.</p>
        )}

        {creditCards.map((card) => (
          <label
            key={card.id}
            className={`flex cursor-pointer items-center justify-between rounded border p-4 ${
              String(selectedCardId) === String(card.id) ? 'border-brand' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="card"
                checked={String(selectedCardId) === String(card.id)}
                onChange={() => onSelectCard(card.id)}
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-brand-dark">
                  **** **** **** {String(card.card_no).slice(-4)}
                </span>
                <span className="text-sm text-brand-muted">
                  {card.name_on_card} · {card.expire_month}/{card.expire_year}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Kartı düzenle" onClick={() => startEdit(card)}>
                <Pencil size={16} className="text-brand-muted" />
              </button>
              <button type="button" aria-label="Kartı sil" onClick={() => handleDelete(card.id)}>
                <Trash2 size={16} className="text-brand-danger" />
              </button>
            </div>
          </label>
        ))}
      </div>

      {selectedCardId && (
        <div className="flex w-40 flex-col gap-1">
          <label htmlFor="ccv" className="text-sm font-bold text-brand-dark">
            CCV
          </label>
          <input
            id="ccv"
            value={ccv}
            onChange={(event) => onCcvChange(event.target.value)}
            className={inputClass}
            placeholder="123"
          />
          {ccv && !CCV_PATTERN.test(ccv) && (
            <span className={errorClass}>CCV 3 veya 4 rakam olmalıdır</span>
          )}
        </div>
      )}

      {formOpen && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-1">
            <label htmlFor="card_no" className="text-sm font-bold text-brand-dark">
              Kart Numarası
            </label>
            <input
              id="card_no"
              placeholder="1234123412341234"
              className={inputClass}
              {...register('card_no', {
                required: 'Kart numarası zorunludur',
                pattern: { value: CARD_NO_PATTERN, message: 'Kart numarası 16 rakam olmalıdır' },
              })}
            />
            {errors.card_no && <span className={errorClass}>{errors.card_no.message}</span>}
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="expire_month" className="text-sm font-bold text-brand-dark">
                Ay
              </label>
              <select
                id="expire_month"
                className={inputClass}
                {...register('expire_month', { required: 'Ay seçimi zorunludur' })}
              >
                <option value="">Ay</option>
                {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                  <option key={month} value={month}>
                    {String(month).padStart(2, '0')}
                  </option>
                ))}
              </select>
              {errors.expire_month && (
                <span className={errorClass}>{errors.expire_month.message}</span>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="expire_year" className="text-sm font-bold text-brand-dark">
                Yıl
              </label>
              <select
                id="expire_year"
                className={inputClass}
                {...register('expire_year', { required: 'Yıl seçimi zorunludur' })}
              >
                <option value="">Yıl</option>
                {Array.from({ length: 12 }, (_, index) => CURRENT_YEAR + index).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.expire_year && (
                <span className={errorClass}>{errors.expire_year.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name_on_card" className="text-sm font-bold text-brand-dark">
              Kart Üzerindeki İsim
            </label>
            <input
              id="name_on_card"
              className={inputClass}
              {...register('name_on_card', { required: 'Kart üzerindeki isim zorunludur' })}
            />
            {errors.name_on_card && (
              <span className={errorClass}>{errors.name_on_card.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-brand px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {editingId ? 'Kartı Güncelle' : 'Kartı Kaydet'}
          </button>
        </form>
      )}
    </div>
  )
}
