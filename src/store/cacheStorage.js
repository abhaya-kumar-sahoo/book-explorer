const CACHE_PREFIX = 'gutendex_cache_'
const MAX_ENTRIES = 200
const TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export function getPersistentCache(key) {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`)
    if (!raw) return null

    const record = JSON.parse(raw)
    // Check if cache has expired (older than 24 hours)
    if (!record?.timestamp || Date.now() - record.timestamp > TTL_MS) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`)
      return null
    }

    return record.data
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

    const record = {
      timestamp: Date.now(),
      data,
    }

    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(record))
  } catch {
    // Quota reached or private mode, fail silently
  }
}

