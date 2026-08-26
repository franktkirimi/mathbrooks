import { beforeEach, describe, expect, it } from "vitest";
import { getOrCaptureAttribution } from "./attribution";

const setUrl = (url: string, referrer = "") => {
  Object.defineProperty(window, "location", {
    value: new URL(url),
    writable: true,
  });
  Object.defineProperty(document, "referrer", { value: referrer, configurable: true });
};

describe("getOrCaptureAttribution", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("captures UTM parameters, referrer, and landing page from the current URL", () => {
    setUrl(
      "https://www.mathbrooks.com/audit?utm_source=google&utm_medium=cpc&utm_campaign=launch&utm_content=ad1&utm_term=business+audit",
      "https://www.google.com/",
    );
    const attribution = getOrCaptureAttribution();
    expect(attribution.utmSource).toBe("google");
    expect(attribution.utmMedium).toBe("cpc");
    expect(attribution.utmCampaign).toBe("launch");
    expect(attribution.utmContent).toBe("ad1");
    expect(attribution.utmTerm).toBe("business audit");
    expect(attribution.referrer).toBe("https://www.google.com/");
    expect(attribution.landingPage).toContain("/audit");
  });

  it("is first-touch: a later call with different UTM params does not overwrite the original", () => {
    setUrl("https://www.mathbrooks.com/audit?utm_source=google&utm_campaign=launch");
    const first = getOrCaptureAttribution();
    expect(first.utmSource).toBe("google");

    setUrl("https://www.mathbrooks.com/audit?utm_source=facebook&utm_campaign=retarget");
    const second = getOrCaptureAttribution();
    expect(second.utmSource).toBe("google");
    expect(second.utmCampaign).toBe("launch");
  });

  it("returns null fields (not crash) when no UTM params or referrer are present", () => {
    setUrl("https://www.mathbrooks.com/audit");
    const attribution = getOrCaptureAttribution();
    expect(attribution.utmSource).toBeNull();
    expect(attribution.utmCampaign).toBeNull();
  });
});
