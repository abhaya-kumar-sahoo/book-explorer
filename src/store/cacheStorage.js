const CACHE_PREFIX = 'gutendex_cache_'
const MAX_ENTRIES = 200

export function getPersistentCache(key) {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setPersistentCache(key, data) {
  try {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.startsWith(CACHE_PREFIX)) {
        keys.push(k)
      }
    }

    if (keys.length >= MAX_ENTRIES) {
      for (let i = 0; i < 20 && i < keys.length; i++) {
        localStorage.removeItem(keys[i])
      }
    }

    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data))
  } catch {
    // Quota reached or private mode, fail silently
  }
}

