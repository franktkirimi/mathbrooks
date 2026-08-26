/**
 * Best-effort in-memory rate limit for the AI analysis endpoint. This is
 * deliberately not backed by shared storage (Redis/KV) — V1.5 explicitly
 * avoids overengineering caching/rate-limit infrastructure (§19), and a
 * single free audit already only triggers one call (client-side caching in
 * session state prevents repeats on rerender/refresh). This limiter's real
 * job is stopping a single warm serverless instance from being hammered in a
 * short burst; it is not a hard multi-instance guarantee, since a new cold
 * instance starts with an empty map. Documented as a known limitation.
 *
 * Plain JavaScript, not TypeScript: Vercel's Node function build for this
 * project does not transpile local .ts files it imports via a relative
 * path (confirmed by direct production testing — see scripts/sync-api-lib.mjs
 * for the full writeup), so this file must already be executable JS.
 *
 * @param {string} key
 * @returns {boolean}
 */
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;

const buckets = new Map();

export const isRateLimited = (key) => {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  existing.count += 1;
  return existing.count > MAX_REQUESTS_PER_WINDOW;
};
