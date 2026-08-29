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
  const addressList = useSelector((state) => state.client.addressList)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', defaultValues: EMPTY_FORM })

  useEffect(() => {
    dispatch(fetchAddresses()).catch((error) => {
      console.error('Addresses could not be fetched:', error)
      toast.error('Adresler yüklenemedi.')
    })
  }, [dispatch])

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
        toast.success('Adres güncellendi.')
      } else {
        await dispatch(saveAddress(formData))
        toast.success('Adres eklendi.')
      }
      closeForm()
    } catch (error) {
      console.error('Address could not be saved:', error)
      toast.error('Adres kaydedilemedi.')
    }
  }

  const handleDelete = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId))
      toast.success('Adres silindi.')
    } catch (error) {
      console.error('Address could not be deleted:', error)
      toast.error('Adres silinemedi.')
    }
  }

  const inputClass =
    'rounded border border-gray-300 px-4 py-2 text-sm text-brand-dark outline-none focus:border-brand'
  const errorClass = 'text-xs font-bold text-brand-danger'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-dark">Teslimat Adresi</h2>
        <button
          type="button"
          onClick={() => (formOpen ? closeForm() : setFormOpen(true))}
          className="rounded border border-brand px-4 py-2 text-sm font-bold text-brand"
        >
          {formOpen ? 'Vazgeç' : 'Adres Ekle'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {addressList.length === 0 && (
          <p className="text-sm text-brand-muted">Kayıtlı adresiniz yok, yeni bir adres ekleyin.</p>
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
                <button type="button" aria-label="Adresi düzenle" onClick={() => startEdit(address)}>
                  <Pencil size={16} className="text-brand-muted" />
                </button>
                <button
                  type="button"
                  aria-label="Adresi sil"
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
              Adres Başlığı
            </label>
            <input
              id="title"
              className={inputClass}
              {...register('title', { required: 'Adres başlığı zorunludur' })}
            />
            {errors.title && <span className={errorClass}>{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="name" className="text-sm font-bold text-brand-dark">
                Ad
              </label>
              <input
                id="name"
                className={inputClass}
                {...register('name', { required: 'Ad zorunludur' })}
              />
              {errors.name && <span className={errorClass}>{errors.name.message}</span>}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="surname" className="text-sm font-bold text-brand-dark">
                Soyad
              </label>
              <input
                id="surname"
                className={inputClass}
                {...register('surname', { required: 'Soyad zorunludur' })}
              />
              {errors.surname && <span className={errorClass}>{errors.surname.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm font-bold text-brand-dark">
              Telefon
            </label>
            <input
              id="phone"
              placeholder="05XXXXXXXXX"
              className={inputClass}
              {...register('phone', {
                required: 'Telefon zorunludur',
                pattern: { value: TR_PHONE_PATTERN, message: 'Geçerli bir telefon numarası girin' },
              })}
            />
            {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="city" className="text-sm font-bold text-brand-dark">
                İl
              </label>
              <select
                id="city"
                className={inputClass}
                {...register('city', { required: 'İl seçimi zorunludur' })}
              >
                <option value="">Seçiniz</option>
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
                İlçe
              </label>
              <input
                id="district"
                className={inputClass}
                {...register('district', { required: 'İlçe zorunludur' })}
              />
              {errors.district && <span className={errorClass}>{errors.district.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="neighborhood" className="text-sm font-bold text-brand-dark">
              Mahalle ve adres detayı
            </label>
            <textarea
              id="neighborhood"
              rows={3}
              className={inputClass}
              {...register('neighborhood', { required: 'Adres detayı zorunludur' })}
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
            {editingId ? 'Adresi Güncelle' : 'Adresi Kaydet'}
          </button>
        </form>
      )}
    </div>
  )
}
