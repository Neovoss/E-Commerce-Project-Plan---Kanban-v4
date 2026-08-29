// API kategori objesi: { id, code: "k:ayakkabi", title, img, rating, gender: "k" | "e" }
export const GENDER_LABELS = { k: 'Kadın', e: 'Erkek' }

export function genderSlug(gender) {
  return gender === 'k' ? 'kadin' : 'erkek'
}

export function categorySlug(category) {
  const code = category.code ?? ''
  return code.includes(':') ? code.split(':')[1] : String(category.title ?? '').toLowerCase()
}

export function categoryPath(category) {
  return `/shop/${genderSlug(category.gender)}/${categorySlug(category)}/${category.id}`
}

export function topCategories(categories, count = 5) {
  return [...categories].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, count)
}
