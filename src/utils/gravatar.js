// Gravatar artik SHA-256 hash destekliyor, bu yuzden ekstra bir md5 bagimligi gerekmiyor
export async function gravatarUrl(email, size = 40) {
  const normalized = String(email ?? '').trim().toLowerCase()
  const bytes = new TextEncoder().encode(normalized)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  const hash = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`
}
