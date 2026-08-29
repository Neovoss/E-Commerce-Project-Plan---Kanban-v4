import { Link } from 'react-router-dom'
import SocialIcon from '../components/SocialIcons.jsx'

const FOOTER_COLUMNS = [
  {
    title: 'Company Info',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Carrier', to: '/about' },
      { label: 'We are hiring', to: '/team' },
      { label: 'Blog', to: '/about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Carrier', to: '/about' },
      { label: 'We are hiring', to: '/team' },
      { label: 'Blog', to: '/about' },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Business Marketing', to: '/shop' },
      { label: 'User Analytic', to: '/shop' },
      { label: 'Live Chat', to: '/contact' },
      { label: 'Unlimited Support', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'IOS & Android', to: '/shop' },
      { label: 'Watch a Demo', to: '/shop' },
      { label: 'Customers', to: '/team' },
      { label: 'API', to: '/about' },
    ],
  },
]

export default function Footer() {
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
        {FOOTER_COLUMNS.map((column) => (
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
          <h3 className="text-base font-bold text-brand-dark">Get In Touch</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 rounded-l border border-gray-200 bg-brand-light px-4 py-3 text-sm text-brand-muted"
            />
            <button
              type="button"
              className="rounded-r bg-brand px-5 py-3 text-sm text-white"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-brand-muted">Lore imp sum dolor Amit</p>
        </div>
      </div>

      <div className="bg-brand-light px-6 py-6">
        <p className="text-sm font-bold text-brand-muted">
          Made With Love By Finland All Right Reserved
        </p>
      </div>
    </footer>
  )
}
