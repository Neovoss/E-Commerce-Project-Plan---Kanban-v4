import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation.js'

export default function AboutUsPage() {
  const t = useTranslation()

  const stats = [
    { id: 1, value: '15K', label: t.about.happyCustomers },
    { id: 2, value: '150K', label: t.about.monthlyVisitors },
    { id: 3, value: '15', label: t.about.countries },
    { id: 4, value: '100+', label: t.about.partners },
  ]

  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-center md:gap-20">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <p className="text-sm font-bold text-brand-dark">{t.about.eyebrow}</p>
          <h1 className="text-4xl font-bold text-brand-dark md:text-6xl">{t.about.title}</h1>
          <p className="max-w-md text-xl text-brand-muted">{t.about.description}</p>
          <Link to="/shop" className="rounded bg-brand px-10 py-4 text-sm font-bold text-white">
            {t.about.cta}
          </Link>
        </div>
        <img
          src="https://picsum.photos/seed/about-hero/600/600"
          alt={t.about.title}
          className="h-[350px] w-full object-cover md:h-[500px] md:w-[450px]"
        />
      </section>

      <section className="flex flex-col gap-8 px-6 py-10 md:flex-row md:justify-center">
        <div className="flex flex-col gap-4 md:max-w-xs">
          <p className="text-sm font-bold text-brand-muted">{t.about.problemsEyebrow}</p>
          <h2 className="text-2xl font-bold text-brand-dark">{t.about.problemsTitle}</h2>
        </div>
        <p className="text-sm text-brand-muted md:max-w-md">{t.about.problemsText}</p>
      </section>

      <section className="flex flex-col items-center gap-10 px-6 py-16 md:flex-row md:justify-center">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center gap-2">
            <p className="text-5xl font-bold text-brand-dark">{stat.value}</p>
            <p className="text-base font-bold text-brand-muted">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
