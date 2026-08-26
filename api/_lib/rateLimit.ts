/**
 * Best-effort in-memory rate limit for the AI analysis endpoint. This is
 * deliberately not backed by shared storage (Redis/KV) — V1.5 explicitly
 * avoids overengineering caching/rate-limit infrastructure (§19), and a
 * single free audit already only triggers one call (client-side caching in
 * session state prevents repeats on rerender/refresh). This limiter's real
 * job is stopping a single warm serverless instance from being hammered in a
 * short burst; it is not a hard multi-instance guarantee, since a new cold
 * instance starts with an empty map. Documented as a known limitation.
 */

const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

export const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  existing.count += 1;
  return existing.count > MAX_REQUESTS_PER_WINDOW;
};
