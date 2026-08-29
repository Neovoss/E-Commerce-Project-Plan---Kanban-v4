import { Link } from 'react-router-dom'
import SocialIcon from '../components/SocialIcons.jsx'
import { useTranslation } from '../hooks/useTranslation.js'

export default function Footer() {
  const t = useTranslation()

  const columns = [
    {
      title: t.footer.companyInfo,
      links: [
        { label: t.footer.aboutUs, to: '/about' },
        { label: t.footer.career, to: '/about' },
        { label: t.footer.hiring, to: '/team' },
        { label: t.footer.blog, to: '/about' },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { label: t.footer.aboutUs, to: '/about' },
        { label: t.footer.career, to: '/about' },
        { label: t.footer.hiring, to: '/team' },
        { label: t.footer.blog, to: '/about' },
      ],
    },
    {
      title: t.footer.features,
      links: [
        { label: t.footer.businessMarketing, to: '/shop' },
        { label: t.footer.userAnalytic, to: '/shop' },
        { label: t.footer.liveChat, to: '/contact' },
        { label: t.footer.unlimitedSupport, to: '/contact' },
      ],
    },
    {
      title: t.footer.resources,
      links: [
        { label: t.footer.mobileApps, to: '/shop' },
        { label: t.footer.watchDemo, to: '/shop' },
        { label: t.footer.customers, to: '/team' },
        { label: t.footer.api, to: '/about' },
      ],
    },
  ]

  return (
    <footer className="flex flex-col">
      <div className="flex flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-dark">
          Bandage
        </Link>
        <div className="flex items-center gap-5 text-brand">
          <SocialIcon name="instagram" size={24} />
          <SocialIcon name="youtube" size={24} />
          <SocialIcon name="facebook" size={24} />
          <SocialIcon name="twitter" size={24} />
        </div>
      </div>

      <div className="flex flex-col gap-8 bg-brand-light px-6 py-10 md:flex-row md:flex-wrap md:justify-between">
        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-brand-dark">{column.title}</h3>
            {column.links.map((link) => (
              <Link
                key={`${column.title}-${link.label}`}
                to={link.to}
                className="text-sm font-bold text-brand-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-brand-dark">{t.footer.getInTouch}</h3>
          <div className="flex">
            <input
              type="email"
              placeholder={t.footer.emailPlaceholder}
              className="flex-1 rounded-l border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-muted"
            />
            <button type="button" className="rounded-r bg-brand px-5 py-3 text-sm text-white">
              {t.footer.subscribe}
            </button>
          </div>
          <p className="text-xs text-brand-muted">{t.footer.subscribeNote}</p>
        </div>
      </div>

      <div className="bg-brand-light px-6 py-6">
        <p className="text-sm font-bold text-brand-muted">Bandage &copy; 2026 · {t.footer.rights}</p>
      </div>
    </footer>
  )
}
