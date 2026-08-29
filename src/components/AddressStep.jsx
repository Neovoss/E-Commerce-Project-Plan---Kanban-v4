import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Pencil, Trash2 } from 'lucide-react'
import {
  deleteAddress,
  fetchAddresses,
  saveAddress,
  updateAddress,
} from '../store/actions/clientActions.js'
import { CITIES } from '../data/cities.js'
import { useTranslation } from '../hooks/useTranslation.js'
import { useLocalizedErrors } from '../hooks/useLocalizedErrors.js'

const TR_PHONE_PATTERN = /^(\+90|0)?5\d{9}$/

const EMPTY_FORM = {
  title: '',
  name: '',
  surname: '',
  phone: '',
  city: '',
  district: '',
  neighborhood: '',
}

export default function AddressStep({ selectedId, onSelect }) {
  const dispatch = useDispatch()
  const t = useTranslation()
  const addressList = useSelector((state) => state.client.addressList)
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
    dispatch(fetchAddresses()).catch((error) => {
      console.error('Addresses could not be fetched:', error)
      toast.error(t.order.addressLoadFailed)
    })
  }, [dispatch, t.order.addressLoadFailed])

  const closeForm = () => {
    setFormOpen(false)
    setEditingId(null)
    reset(EMPTY_FORM)
  }

  const startEdit = (address) => {
    setEditingId(address.id)
    setFormOpen(true)
    reset({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
    })
  }

  const onSubmit = async (formData) => {
    try {
      if (editingId) {
        await dispatch(updateAddress({ id: editingId, ...formData }))
        toast.success(t.order.addressUpdated)
      } else {
        await dispatch(saveAddress(formData))
        toast.success(t.order.addressSaved)
      }
      closeForm()
    } catch (error) {
      console.error('Address could not be saved:', error)
      toast.error(t.order.addressSaveFailed)
    }
  }

  const handleDelete = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId))
      toast.success(t.order.addressDeleted)
    } catch (error) {
      console.error('Address could not be deleted:', error)
      toast.error(t.order.addressDeleteFailed)
    }
  }

  const inputClass =
    'rounded border border-gray-300 px-4 py-2 text-sm text-brand-dark outline-none focus:border-brand'
  const errorClass = 'text-xs font-bold text-brand-danger'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-dark">{t.order.addressTitle}</h2>
        <button
          type="button"
          onClick={() => (formOpen ? closeForm() : setFormOpen(true))}
          className="rounded border border-brand px-4 py-2 text-sm font-bold text-brand"
        >
          {formOpen ? t.common.cancel : t.order.addAddress}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {addressList.length === 0 && (
          <p className="text-sm text-brand-muted">{t.order.noAddress}</p>
        )}

        {addressList.map((address) => (
          <label
            key={address.id}
            className={`flex cursor-pointer flex-col gap-1 rounded border p-4 ${
              String(selectedId) === String(address.id) ? 'border-brand' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="address"
                  checked={String(selectedId) === String(address.id)}
                  onChange={() => onSelect(address.id)}
                />
                <span className="text-sm font-bold text-brand-dark">{address.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" aria-label={t.order.editAddress} onClick={() => startEdit(address)}>
                  <Pencil size={16} className="text-brand-muted" />
                </button>
                <button
                  type="button"
                  aria-label={t.order.deleteAddress}
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 size={16} className="text-brand-danger" />
                </button>
              </div>
            </div>
            <span className="text-sm text-brand-dark">
              {address.name} {address.surname} · {address.phone}
            </span>
            <span className="text-sm text-brand-muted">
              {address.neighborhood} / {address.district} / {address.city}
            </span>
          </label>
        ))}
      </div>

      {formOpen && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-bold text-brand-dark">
              {t.order.addressLabel}
            </label>
            <input
              id="title"
              className={inputClass}
              {...register('title', { required: t.validation.addressTitleRequired })}
            />
            {errors.title && <span className={errorClass}>{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="name" className="text-sm font-bold text-brand-dark">
                {t.order.firstName}
              </label>
              <input
                id="name"
                className={inputClass}
                {...register('name', { required: t.validation.firstNameRequired })}
              />
              {errors.name && <span className={errorClass}>{errors.name.message}</span>}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="surname" className="text-sm font-bold text-brand-dark">
                {t.order.lastName}
              </label>
              <input
                id="surname"
                className={inputClass}
                {...register('surname', { required: t.validation.lastNameRequired })}
              />
              {errors.surname && <span className={errorClass}>{errors.surname.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm font-bold text-brand-dark">
              {t.order.phone}
            </label>
            <input
              id="phone"
              placeholder="05XXXXXXXXX"
              className={inputClass}
              {...register('phone', {
                required: t.validation.phoneRequired,
                pattern: { value: TR_PHONE_PATTERN, message: t.validation.phoneInvalid },
              })}
            />
            {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="city" className="text-sm font-bold text-brand-dark">
                {t.order.city}
              </label>
              <select
                id="city"
                className={inputClass}
                {...register('city', { required: t.validation.cityRequired })}
              >
                <option value="">{t.common.select}</option>
                {CITIES.map((city) => (
                  <option key={city} value={city.toLowerCase()}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <span className={errorClass}>{errors.city.message}</span>}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="district" className="text-sm font-bold text-brand-dark">
                {t.order.district}
              </label>
              <input
                id="district"
                className={inputClass}
                {...register('district', { required: t.validation.districtRequired })}
              />
              {errors.district && <span className={errorClass}>{errors.district.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="neighborhood" className="text-sm font-bold text-brand-dark">
              {t.order.neighborhood}
            </label>
            <textarea
              id="neighborhood"
              rows={3}
              className={inputClass}
              {...register('neighborhood', { required: t.validation.neighborhoodRequired })}
            />
            {errors.neighborhood && (
              <span className={errorClass}>{errors.neighborhood.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-brand px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {editingId ? t.order.updateAddress : t.order.saveAddress}
          </button>
        </form>
      )}
    </div>
  )
}
