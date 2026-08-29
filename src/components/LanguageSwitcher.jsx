import { useDispatch, useSelector } from 'react-redux'
import { Globe } from 'lucide-react'
import { setLanguage } from '../store/actions/clientActions.js'
import { LANGUAGES } from '../data/translations.js'
import { useTranslation } from '../hooks/useTranslation.js'

export default function LanguageSwitcher() {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.client.language)
  const t = useTranslation()

  return (
    <div className="flex items-center gap-1" aria-label={t.common.languageLabel}>
      <Globe size={16} />
      {LANGUAGES.map((item, index) => (
        <span key={item.code} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true">|</span>}
          <button
            type="button"
            onClick={() => dispatch(setLanguage(item.code))}
            aria-pressed={language === item.code}
            className={`text-sm font-bold ${
              language === item.code ? 'text-brand' : 'text-brand-muted'
            }`}
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  )
}
