import { useSelector } from 'react-redux'
import { translations } from '../data/translations.js'

// Aktif dile gore arayuz metinlerini dondurur
export function useTranslation() {
  const language = useSelector((state) => state.client.language)
  return translations[language] ?? translations.tr
}
