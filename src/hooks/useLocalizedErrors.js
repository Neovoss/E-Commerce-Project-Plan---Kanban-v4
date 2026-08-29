import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// Dil degistiginde ekranda duran hata mesajlarini yeni dilde yeniden uretir
export function useLocalizedErrors(trigger, errors) {
  const language = useSelector((state) => state.client.language)
  const previousLanguage = useRef(language)

  useEffect(() => {
    if (previousLanguage.current === language) {
      return
    }
    previousLanguage.current = language
    const invalidFields = Object.keys(errors)
    if (invalidFields.length > 0) {
      trigger(invalidFields)
    }
  }, [language, errors, trigger])
}
