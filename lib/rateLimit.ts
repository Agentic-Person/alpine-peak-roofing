/**
 * Simple in-memory rate limiter.
 *
 * Works fine on a single VPS/server. If you scale to multiple instances
 * or move to Vercel serverless, replace with Upstash Redis:
 *   https://github.com/upstash/ratelimit
 *
 * Usage:
 *   const allowed = rateLimit(ip, { windowMs: 60_000, max: 20 })
 *   if (!allowed) return 429
 */

interface Window {
  count: number
  resetAt: number
}

const store = new Map<string, Window>()

// Clean up expired entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now()
  for (const [key, window] of store.entries()) {
    if (window.resetAt < now) store.delete(key)
  }
}, 5 * 60 * 1000)

export function rateLimit(
  key: string,
  options: { windowMs: number; max: number }
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const existing = store.get(key)

  if (!existing || existing.resetAt < now) {
    // New window
    const entry: Window = { count: 1, resetAt: now + options.windowMs }
    store.set(key, entry)
    return { allowed: true, remaining: options.max - 1, resetAt: entry.resetAt }
  }

  existing.count++
  const remaining = Math.max(0, options.max - existing.count)
  return {
    allowed: existing.count <= options.max,
    remaining,
    resetAt: existing.resetAt,
  }
}

/** Extract real IP from Next.js request, respecting proxies */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}
