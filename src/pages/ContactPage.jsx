import { Phone, Mail, MapPin } from 'lucide-react'
import SocialIcon from '../components/SocialIcons.jsx'
import { useTranslation } from '../hooks/useTranslation.js'

const CONTACT_CARDS = [
  { id: 1, Icon: Phone, lines: ['georgia.young@example.com', 'georgia.young@ple.com'] },
  { id: 2, Icon: Mail, lines: ['georgia.young@example.com', 'georgia.young@ple.com'] },
  { id: 3, Icon: MapPin, lines: ['georgia.young@example.com', 'georgia.young@ple.com'] },
]

export default function ContactPage() {
  const t = useTranslation()

  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-center md:gap-20">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <p className="text-base font-bold text-brand-dark">{t.contact.eyebrow}</p>
          <h1 className="text-4xl font-bold text-brand-dark">{t.contact.title}</h1>
          <p className="max-w-md text-xl text-brand-muted">{t.contact.description}</p>
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold text-brand-dark">{t.contact.phone} : +451 215 215</p>
            <p className="text-2xl font-bold text-brand-dark">{t.contact.fax} : +451 215 215</p>
          </div>
          <div className="flex items-center gap-5 text-brand-dark">
            <SocialIcon name="instagram" size={24} />
            <SocialIcon name="youtube" size={24} />
            <SocialIcon name="facebook" size={24} />
            <SocialIcon name="twitter" size={24} />
          </div>
        </div>
        <img
          src="https://picsum.photos/seed/contact-hero/600/700"
          alt={t.contact.title}
          className="h-[350px] w-full object-cover md:h-[550px] md:w-[450px]"
        />
      </section>

      <section className="flex flex-col items-center gap-10 px-6 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-base font-bold text-brand-dark">{t.contact.officeEyebrow}</p>
          <h2 className="text-4xl font-bold text-brand-dark">{t.contact.officeTitle}</h2>
        </div>
        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:justify-center">
          {CONTACT_CARDS.map(({ id, Icon, lines }) => (
            <div
              key={id}
              className="flex w-full max-w-sm flex-col items-center gap-4 px-8 py-12 text-center"
            >
              <Icon size={40} className="text-brand" />
              {lines.map((line) => (
                <p key={line} className="text-sm font-bold text-brand-dark">
                  {line}
                </p>
              ))}
              <p className="text-base font-bold text-brand-dark">{t.contact.getSupport}</p>
              <button
                type="button"
                className="rounded-full border border-brand px-8 py-3 text-sm font-bold text-brand"
              >
                {t.contact.submitRequest}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
