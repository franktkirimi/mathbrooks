# Vercel Admin Checklist

Internal note for MathBrooks platform/admin work.

## Immediate checks

- Review the Vercel AI model training and data-sharing setting for the project/team.
- Vercel's March 2026 update stated that `Hobby` and `Trial Pro` plans are opted in by default for optional AI model training unless the setting is changed.
- The stated deadline in that notice was `March 31, 2026 11:59:59 PM PDT`, which is `April 1, 2026 8:59:59 AM` in Harare.
- Source: <https://vercel.com/changelog/updates-to-terms-of-service-march-2026>

## Ongoing checks

- Review whether AI Gateway is needed before adding multi-model AI features.
- Set cost limits, usage monitoring, and fallback rules if multiple model providers are introduced.
- Recheck privacy-policy language whenever lead forms, analytics, or AI features change.
- Re-test direct-route access after routing or rewrite changes.
