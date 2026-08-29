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

const TR_MAP = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' }

export function slugify(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[çğıöşü]/g, (char) => TR_MAP[char] ?? char)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// T16: shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
export function productPath(product, categories = []) {
  const category = categories.find((item) => String(item.id) === String(product.category_id))
  if (!category) {
    return `/product/${product.id}`
  }
  return `${categoryPath(category)}/${slugify(product.name)}/${product.id}`
}
