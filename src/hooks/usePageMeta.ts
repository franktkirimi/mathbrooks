import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  ogType?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

const upsertMetaTag = (selector: string, attributes: Record<string, string>) => {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== "content") {
        tag?.setAttribute(key, value);
      }
    });
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
};

export function usePageMeta({
  title,
  description,
  canonicalPath,
  keywords,
  ogType = "website",
  structuredData,
}: PageMeta) {
  useEffect(() => {
    document.title = title;

    upsertMetaTag('meta[name="description"]', { name: "description", content: description });

    if (keywords?.length) {
      upsertMetaTag('meta[name="keywords"]', {
        name: "keywords",
        content: keywords.join(", "),
      });
    }

    upsertMetaTag('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMetaTag('meta[property="og:type"]', { property: "og:type", content: ogType });
    upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    if (canonicalPath) {
      const canonicalUrl = `https://www.mathbrooks.com${canonicalPath}`;
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute("href", canonicalUrl);
      }
      upsertMetaTag('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    }

    const existingStructuredData = document.getElementById("page-structured-data");
    if (structuredData) {
      const scriptTag =
        existingStructuredData instanceof HTMLScriptElement
          ? existingStructuredData
          : document.createElement("script");

      scriptTag.id = "page-structured-data";
      scriptTag.type = "application/ld+json";
      scriptTag.textContent = JSON.stringify(structuredData);

      if (!existingStructuredData) {
        document.head.appendChild(scriptTag);
      }
    } else if (existingStructuredData) {
      existingStructuredData.remove();
    }
  }, [canonicalPath, description, keywords, ogType, structuredData, title]);
}
