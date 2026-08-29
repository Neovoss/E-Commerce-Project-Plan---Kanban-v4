import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteCard, fetchCards, saveCard, updateCard } from '../store/actions/clientActions.js'
import { useTranslation } from '../hooks/useTranslation.js'
import { useLocalizedErrors } from '../hooks/useLocalizedErrors.js'

const CARD_NO_PATTERN = /^\d{16}$/
const CCV_PATTERN = /^\d{3,4}$/
const CURRENT_YEAR = new Date().getFullYear()

const EMPTY_FORM = { card_no: '', expire_month: '', expire_year: '', name_on_card: '' }

export default function PaymentStep({ selectedCardId, onSelectCard, ccv, onCcvChange }) {
  const dispatch = useDispatch()
  const t = useTranslation()
  const creditCards = useSelector((state) => state.client.creditCards)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', defaultValues: EMPTY_FORM })

  useLocalizedErrors(trigger, errors)

  useEffect(() => {
    dispatch(fetchCards()).catch((error) => {
      console.error('Cards could not be fetched:', error)
      toast.error(t.order.cardLoadFailed)
    })
  }, [dispatch, t.order.cardLoadFailed])

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
        toast.success(t.order.cardUpdated)
      } else {
        await dispatch(saveCard(payload))
        toast.success(t.order.cardSaved)
      }
      closeForm()
    } catch (error) {
      console.error('Card could not be saved:', error)
      toast.error(t.order.cardSaveFailed)
    }
  }

  const handleDelete = async (cardId) => {
    try {
      await dispatch(deleteCard(cardId))
      toast.success(t.order.cardDeleted)
    } catch (error) {
      console.error('Card could not be deleted:', error)
      toast.error(t.order.cardDeleteFailed)
    }
  }

  const inputClass =
    'rounded border border-gray-300 px-4 py-2 text-sm text-brand-dark outline-none focus:border-brand'
  const errorClass = 'text-xs font-bold text-brand-danger'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-dark">{t.order.paymentTitle}</h2>
        <button
          type="button"
          onClick={() => (formOpen ? closeForm() : setFormOpen(true))}
          className="rounded border border-brand px-4 py-2 text-sm font-bold text-brand"
        >
          {formOpen ? t.common.cancel : t.order.addCard}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {creditCards.length === 0 && (
          <p className="text-sm text-brand-muted">{t.order.noCard}</p>
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
              <button type="button" aria-label={t.order.editCard} onClick={() => startEdit(card)}>
                <Pencil size={16} className="text-brand-muted" />
              </button>
              <button type="button" aria-label={t.order.deleteCard} onClick={() => handleDelete(card.id)}>
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
            <span className={errorClass}>{t.validation.ccvPattern}</span>
          )}
        </div>
      )}

      {formOpen && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-1">
            <label htmlFor="card_no" className="text-sm font-bold text-brand-dark">
              {t.order.cardNo}
            </label>
            <input
              id="card_no"
              placeholder="1234123412341234"
              className={inputClass}
              {...register('card_no', {
                required: t.validation.cardNoRequired,
                pattern: { value: CARD_NO_PATTERN, message: t.validation.cardNoPattern },
              })}
            />
            {errors.card_no && <span className={errorClass}>{errors.card_no.message}</span>}
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="expire_month" className="text-sm font-bold text-brand-dark">
                {t.order.month}
              </label>
              <select
                id="expire_month"
                className={inputClass}
                {...register('expire_month', { required: t.validation.monthRequired })}
              >
                <option value="">{t.order.month}</option>
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
                {t.order.year}
              </label>
              <select
                id="expire_year"
                className={inputClass}
                {...register('expire_year', { required: t.validation.yearRequired })}
              >
                <option value="">{t.order.year}</option>
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
              {t.order.nameOnCard}
            </label>
            <input
              id="name_on_card"
              className={inputClass}
              {...register('name_on_card', { required: t.validation.nameOnCardRequired })}
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
            {editingId ? t.order.updateCard : t.order.saveCard}
          </button>
        </form>
      )}
    </div>
  )
}
