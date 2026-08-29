import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation.js'

export default function NotFoundPage() {
  const t = useTranslation()

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-6xl font-bold text-brand-dark">404</h1>
      <p className="text-xl text-brand-muted">{t.notFound.message}</p>
      <Link to="/" className="rounded bg-brand px-8 py-3 text-sm font-bold text-white">
        {t.notFound.cta}
      </Link>
    </section>
  )
}
