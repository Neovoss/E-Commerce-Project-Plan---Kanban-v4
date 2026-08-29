import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import { loginUser } from '../store/actions/clientActions.js'
import { useTranslation } from '../hooks/useTranslation.js'
import { useLocalizedErrors } from '../hooks/useLocalizedErrors.js'

export default function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const t = useTranslation()

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })

  useLocalizedErrors(trigger, errors)

  const onSubmit = async ({ email, password, rememberMe }) => {
    try {
      await dispatch(loginUser({ email, password }, rememberMe))
      toast.success(t.auth.loginSuccess)
      // Onceki sayfaya don, yoksa anasayfaya
      const from = location.state?.from
      if (from) {
        history.replace(from)
      } else if (history.length > 2) {
        history.goBack()
      } else {
        history.replace('/')
      }
    } catch (error) {
      console.error('Login failed:', error)
      toast.error(error.response?.data?.message ?? t.auth.loginFailed)
    }
  }

  const inputClass =
    'rounded border border-gray-300 px-4 py-3 text-sm text-brand-dark outline-none focus:border-brand'
  const errorClass = 'text-xs font-bold text-brand-danger'

  return (
    <section className="flex flex-col items-center px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <h1 className="text-center text-4xl font-bold text-brand-dark">{t.auth.loginTitle}</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              {...register('password', { required: t.validation.passwordRequired })}
            />
            {errors.password && <span className={errorClass}>{errors.password.message}</span>}
          </div>

          <label htmlFor="rememberMe" className="flex items-center gap-2 text-sm text-brand-dark">
            <input id="rememberMe" type="checkbox" {...register('rememberMe')} />
            {t.auth.rememberMe}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded bg-brand px-10 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            {isSubmitting ? t.auth.loginLoading : t.auth.loginCta}
          </button>

          <p className="text-center text-sm text-brand-muted">
            {t.auth.noAccount}{' '}
            <Link to="/signup" className="font-bold text-brand">
              {t.auth.signupCta}
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
