import type { Answers } from "./questions";

/**
 * Product fix: question prompts and report copy previously hardcoded
 * "business" and "customers" everywhere, which reads wrong for an NGO or
 * other non-commercial organisation — confirmed by a real user hitting this
 * on an actual audit. Copy that needs to adapt embeds {{org}}/{{audience}}
 * tokens (and capitalised {{Org}}/{{Audience}} for sentence starts) and runs
 * through applyTerminology(), resolved once from the industry answer.
 */
export interface Terminology {
  org: string;
  Org: string;
  audience: string;
  Audience: string;
}

const NONPROFIT_INDUSTRIES = new Set(["ngo_nonprofit"]);
const GOVERNMENT_INDUSTRIES = new Set(["government_public_sector"]);

const COMMERCIAL: Terminology = { org: "business", Org: "Business", audience: "customers", Audience: "Customers" };
const NONPROFIT: Terminology = {
  org: "organisation",
  Org: "Organisation",
  audience: "the people you serve",
  Audience: "The people you serve",
};
const GOVERNMENT: Terminology = {
  org: "organisation",
  Org: "Organisation",
  audience: "the public",
  Audience: "The public",
};

export const resolveTerminology = (answers: Answers): Terminology => {
  if (NONPROFIT_INDUSTRIES.has(answers.industry ?? "")) return NONPROFIT;
  if (GOVERNMENT_INDUSTRIES.has(answers.industry ?? "")) return GOVERNMENT;
  return COMMERCIAL;
};

const replaceToken = (text: string, token: string, value: string): string => text.split(token).join(value);

export const applyTerminology = (text: string, answers: Answers): string => {
  const t = resolveTerminology(answers);
  let result = text;
  result = replaceToken(result, "{{org}}", t.org);
  result = replaceToken(result, "{{Org}}", t.Org);
  result = replaceToken(result, "{{audience}}", t.audience);
  result = replaceToken(result, "{{Audience}}", t.Audience);
  return result;
};
