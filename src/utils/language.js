export const LANGUAGE_KEY = 'language'
export const SUPPORTED_LANGUAGES = ['tr', 'en']
export const DEFAULT_LANGUAGE = 'tr'

export function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY)
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored
    }
    const browserLanguage = navigator.language?.slice(0, 2)
    return SUPPORTED_LANGUAGES.includes(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function storeLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_KEY, language)
  } catch {
    // localStorage kullanilamiyorsa sessizce gec
  }
}
