import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import api from '../api/axiosInstance.js'
import { fetchRoles } from '../store/actions/clientActions.js'
import { useTranslation } from '../hooks/useTranslation.js'
import { useLocalizedErrors } from '../hooks/useLocalizedErrors.js'

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
const TR_PHONE_PATTERN = /^(\+90|0)?5\d{9}$/
const TAX_NO_PATTERN = /^T\d{4}V\d{6}$/
const IBAN_PATTERN = /^TR\d{24}$/

export default function SignUpPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const t = useTranslation()
  const roles = useSelector((state) => state.client.roles)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })

  useLocalizedErrors(trigger, errors)

  const selectedRoleId = watch('role_id')
  const selectedRole = roles.find((role) => String(role.id) === String(selectedRoleId))
  const isStoreSelected = selectedRole?.code === 'store'

  useEffect(() => {
    // Roller yalnizca bu sayfada ihtiyac oldugunda cekiliyor (T09)
    dispatch(fetchRoles())
      .then((data) => {
        // Customer varsayılan olarak seçili gelmeli
        const customer = data.find((role) => role.code === 'customer')
        if (customer) {
          setValue('role_id', String(customer.id))
        }
      })
      .catch((error) => {
        console.error('Roles could not be fetched:', error)
        toast.error(t.auth.rolesFailed)
      })
  }, [dispatch, setValue, t.auth.rolesFailed])

  const onSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: Number(formData.role_id),
    }

    if (isStoreSelected) {
      payload.store = {
        name: formData.storeName,
        phone: formData.storePhone,
        tax_no: formData.storeTaxNo,
        bank_account: formData.storeBankAccount,
      }
    }

    try {
      await api.post('/signup', payload)
      toast.warning(t.auth.signupSuccess)
      history.goBack()
    } catch (error) {
      console.error('Signup failed:', error)
      toast.error(
        error.response?.data?.message ?? t.auth.signupFailed,
      )
    }
  }

  const inputClass =
    'rounded border border-gray-300 px-4 py-3 text-sm text-brand-dark outline-none focus:border-brand'
  const errorClass = 'text-xs font-bold text-brand-danger'

  return (
    <section className="flex flex-col items-center px-6 py-12">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <h1 className="text-center text-4xl font-bold text-brand-dark">{t.auth.signupTitle}</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-bold text-brand-dark">
              {t.auth.name}
            </label>
            <input
              id="name"
              type="text"
              className={inputClass}
              {...register('name', {
                required: t.validation.nameRequired,
                minLength: { value: 3, message: t.validation.nameMin },
              })}
            />
            {errors.name && <span className={errorClass}>{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-brand-dark">
              {t.auth.email}
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              {...register('email', {
                required: t.validation.emailRequired,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t.validation.emailInvalid,
                },
              })}
            />
            {errors.email && <span className={errorClass}>{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold text-brand-dark">
              {t.auth.password}
            </label>
            <input
              id="password"
              type="password"
              className={inputClass}
              {...register('password', {
                required: t.validation.passwordRequired,
                pattern: {
                  value: PASSWORD_PATTERN,
                  message:
                    t.validation.passwordPattern,
                },
              })}
            />
            {errors.password && <span className={errorClass}>{errors.password.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="passwordConfirm" className="text-sm font-bold text-brand-dark">
              {t.auth.passwordConfirm}
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className={inputClass}
              {...register('passwordConfirm', {
                required: t.validation.passwordConfirmRequired,
                validate: (value) => value === getValues('password') || t.validation.passwordMismatch,
              })}
            />
            {errors.passwordConfirm && (
              <span className={errorClass}>{errors.passwordConfirm.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="role_id" className="text-sm font-bold text-brand-dark">
              {t.auth.role}
            </label>
            <select
              id="role_id"
              className={inputClass}
              {...register('role_id', { required: t.validation.roleRequired })}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && <span className={errorClass}>{errors.role_id.message}</span>}
          </div>

          {isStoreSelected && (
            <div className="flex flex-col gap-5 border-t border-gray-200 pt-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="storeName" className="text-sm font-bold text-brand-dark">
                  {t.auth.storeName}
                </label>
                <input
                  id="storeName"
                  type="text"
                  className={inputClass}
                  {...register('storeName', {
                    required: t.validation.storeNameRequired,
                    minLength: { value: 3, message: t.validation.storeNameMin },
                  })}
                />
                {errors.storeName && <span className={errorClass}>{errors.storeName.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="storePhone" className="text-sm font-bold text-brand-dark">
                  {t.auth.storePhone}
                </label>
                <input
                  id="storePhone"
                  type="tel"
                  placeholder="05XXXXXXXXX"
                  className={inputClass}
                  {...register('storePhone', {
                    required: t.validation.phoneRequired,
                    pattern: {
                      value: TR_PHONE_PATTERN,
                      message: t.validation.phoneInvalid,
                    },
                  })}
                />
                {errors.storePhone && (
                  <span className={errorClass}>{errors.storePhone.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="storeTaxNo" className="text-sm font-bold text-brand-dark">
                  {t.auth.storeTaxNo}
                </label>
                <input
                  id="storeTaxNo"
                  type="text"
                  placeholder="TXXXXVXXXXXX"
                  className={inputClass}
                  {...register('storeTaxNo', {
                    required: t.validation.taxNoRequired,
                    pattern: {
                      value: TAX_NO_PATTERN,
                      message: t.validation.taxNoPattern,
                    },
                  })}
                />
                {errors.storeTaxNo && (
                  <span className={errorClass}>{errors.storeTaxNo.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="storeBankAccount" className="text-sm font-bold text-brand-dark">
                  {t.auth.storeBankAccount}
                </label>
                <input
                  id="storeBankAccount"
                  type="text"
                  placeholder="TR000000000000000000000000"
                  className={inputClass}
                  {...register('storeBankAccount', {
                    required: t.validation.ibanRequired,
                    pattern: {
                      value: IBAN_PATTERN,
                      message: t.validation.ibanInvalid,
                    },
                  })}
                />
                {errors.storeBankAccount && (
                  <span className={errorClass}>{errors.storeBankAccount.message}</span>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded bg-brand px-10 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            {isSubmitting ? t.auth.signupLoading : t.auth.signupCta}
          </button>
        </form>
      </div>
    </section>
  )
}
