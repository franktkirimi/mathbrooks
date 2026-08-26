import { z } from "zod";
import { runAudit } from "../src/lib/audit/engine";
import { buildAiAnalysisContext, buildNoFindingsReport } from "../src/lib/audit/aiReport";
import { requestAiReport } from "./_lib/aiProvider";
import { isRateLimited } from "./_lib/rateLimit";

/**
 * Phase 1.5 AI Intelligence Layer — server-side analysis endpoint.
 *
 * POST /api/audit-analysis  { answers: Record<string, string> }
 * -> 200 { ok: true, report: AIReport }
 * -> 200 { ok: false, reason: string }   (AI unavailable/failed — client falls back to the deterministic report; §12)
 * -> 4xx  malformed request / rate limited
 *
 * Deliberately recomputes the deterministic audit (score, friction band,
 * opportunities, severity) from the raw answers itself, via the same
 * engine.ts the rest of the product uses, rather than trusting any
 * score/finding data the client might send. This is what makes "the AI
 * cannot change deterministic facts" a structural guarantee rather than a
 * prompt instruction: the model is never even given a channel to submit a
 * score, and the opportunity ids it's allowed to reference are exactly the
 * set this function computed itself (§5, §6, §22).
 *
 * Runtime: default Vercel Node.js serverless function (this project's /api
 * convention isn't Next.js App Router, so maxDuration is set via
 * vercel.json's `functions` entry for this path, not an exported const —
 * see vercel.json). Phase 1.5 used the Edge runtime because Claude Haiku
 * calls were consistently fast; gpt-5.6-luna runs at reasoning effort
 * "max", which can take meaningfully longer, and Node's default duration
 * ceiling (300s on every plan, per Vercel's current docs) comfortably
 * covers that with room to spare — the safer choice given that uncertainty
 * (GPT-5.6 Luna production integration brief §2, §14: measure and revisit
 * once real latency data exists).
 *
 * Handler signature: a named `POST` export (Vercel's documented Web Handler
 * convention for non-framework /api routes) rather than a single default
 * export — Vercel's router itself returns 405 for any other method before
 * this file's code ever runs, so no manual method check is needed here.
 */
const MAX_ANSWER_VALUE_LENGTH = 400;
const MAX_ANSWERS_COUNT = 40;
/**
 * Calibrated against real measurements (§12/§14 of the deliverable report):
 * a 6-finding audit at reasoning effort "max" took ~97s and ~9.5k output
 * tokens end to end. 150s leaves real headroom above the worst case
 * observed during live testing, well inside the 300s default Vercel
 * duration ceiling.
 */
const AI_TIMEOUT_MS = 150000;

const requestSchema = z.object({
  answers: z
    .record(z.string(), z.string().max(MAX_ANSWER_VALUE_LENGTH))
    .refine((a) => Object.keys(a).length <= MAX_ANSWERS_COUNT, { message: "Too many answers" }),
});

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const clientKey = (request: Request): string =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";

export async function POST(request: Request): Promise<Response> {
  const startedAt = Date.now();

  if (isRateLimited(clientKey(request))) {
    return jsonResponse({ ok: false, reason: "rate_limited" }, 429);
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return jsonResponse({ ok: false, reason: "invalid_json" }, 400);
  }

  const parsed = requestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return jsonResponse({ ok: false, reason: "invalid_answers" }, 400);
  }

  const { answers } = parsed.data;
  const result = runAudit(answers);
  const context = buildAiAnalysisContext(answers, result);
  const allowedIds = result.opportunities.map((o) => o.id);

  if (allowedIds.length === 0) {
    // No provider call needed — see buildNoFindingsReport for why (§19).
    return jsonResponse({ ok: true, report: buildNoFindingsReport(context) });
  }

  const providerResult = await requestAiReport(context, allowedIds, AI_TIMEOUT_MS);
  const latencyMs = Date.now() - startedAt;

  if (!providerResult.ok || !providerResult.report) {
    // Non-PII observability only — industry code and finding count, never answers content.
    console.error(
      JSON.stringify({
        event: "ai_analysis_failed",
        reason: providerResult.reason ?? "unknown",
        latencyMs,
        findingCount: allowedIds.length,
        // A rejected/failed call can still have consumed real, billable
        // tokens (especially at reasoning effort "max") — captured here so
        // cost tracking isn't blind to failed attempts.
        inputTokens: providerResult.usage?.inputTokens ?? null,
        outputTokens: providerResult.usage?.outputTokens ?? null,
        reasoningTokens: providerResult.usage?.reasoningTokens ?? null,
      }),
    );
    return jsonResponse({ ok: false, reason: providerResult.reason ?? "unknown" });
  }

  console.log(
    JSON.stringify({
      event: "ai_analysis_succeeded",
      latencyMs,
      findingCount: allowedIds.length,
      inputTokens: providerResult.usage?.inputTokens ?? null,
      outputTokens: providerResult.usage?.outputTokens ?? null,
      reasoningTokens: providerResult.usage?.reasoningTokens ?? null,
    }),
  );

  return jsonResponse({ ok: true, report: providerResult.report });
}
