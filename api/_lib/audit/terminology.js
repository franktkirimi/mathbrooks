// GENERATED FILE — do not edit directly.
// Source of truth: src/lib/audit/terminology.ts
// Regenerate with: npm run sync:api-lib

const NONPROFIT_INDUSTRIES = /* @__PURE__ */ new Set(["ngo_nonprofit"]);
const GOVERNMENT_INDUSTRIES = /* @__PURE__ */ new Set(["government_public_sector"]);
const COMMERCIAL = { org: "business", Org: "Business", audience: "customers", Audience: "Customers" };
const NONPROFIT = {
  org: "organisation",
  Org: "Organisation",
  audience: "the people you serve",
  Audience: "The people you serve"
};
const GOVERNMENT = {
  org: "organisation",
  Org: "Organisation",
  audience: "the public",
  Audience: "The public"
};
const resolveTerminology = (answers) => {
  if (NONPROFIT_INDUSTRIES.has(answers.industry ?? "")) return NONPROFIT;
  if (GOVERNMENT_INDUSTRIES.has(answers.industry ?? "")) return GOVERNMENT;
  return COMMERCIAL;
};
const replaceToken = (text, token, value) => text.split(token).join(value);
const applyTerminology = (text, answers) => {
  const t = resolveTerminology(answers);
  let result = text;
  result = replaceToken(result, "{{org}}", t.org);
  result = replaceToken(result, "{{Org}}", t.Org);
  result = replaceToken(result, "{{audience}}", t.audience);
  result = replaceToken(result, "{{Audience}}", t.Audience);
  return result;
};
export {
  applyTerminology,
  resolveTerminology
};
