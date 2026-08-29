import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-6xl font-bold text-brand-dark">404</h1>
      <p className="text-xl text-brand-muted">Aradığınız sayfa bulunamadı.</p>
      <Link to="/" className="rounded bg-brand px-8 py-3 text-sm font-bold text-white">
        Anasayfaya dön
      </Link>
    </section>
  )
}
