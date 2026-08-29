import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import { loginUser } from '../store/actions/clientActions.js'

export default function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async ({ email, password, rememberMe }) => {
    try {
      await dispatch(loginUser({ email, password }, rememberMe))
      toast.success('Giriş başarılı!')
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
      toast.error(
        error.response?.data?.message ?? 'Giriş başarısız. E-posta veya şifre hatalı.',
      )
    }
  }

  const inputClass =
    'rounded border border-gray-300 px-4 py-3 text-sm text-brand-dark outline-none focus:border-brand'
  const errorClass = 'text-xs font-bold text-brand-danger'

  return (
    <section className="flex flex-col items-center px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <h1 className="text-center text-4xl font-bold text-brand-dark">Login</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-brand-dark">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              {...register('email', {
                required: 'E-posta zorunludur',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Geçerli bir e-posta adresi girin',
                },
              })}
            />
            {errors.email && <span className={errorClass}>{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold text-brand-dark">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={inputClass}
              {...register('password', { required: 'Şifre zorunludur' })}
            />
            {errors.password && <span className={errorClass}>{errors.password.message}</span>}
          </div>

          <label htmlFor="rememberMe" className="flex items-center gap-2 text-sm text-brand-dark">
            <input id="rememberMe" type="checkbox" {...register('rememberMe')} />
            Remember Me
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded bg-brand px-10 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-brand-muted">
            Hesabın yok mu?{' '}
            <Link to="/signup" className="font-bold text-brand">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
