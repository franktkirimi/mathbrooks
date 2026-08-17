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

const upsertLinkTag = (selector: string, attributes: Record<string, string>) => {
  let tag = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement("link");
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
    upsertMetaTag('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });

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
    upsertMetaTag('meta[property="og:site_name"]', { property: "og:site_name", content: "MathBrooks" });
    upsertMetaTag('meta[property="og:locale"]', { property: "og:locale", content: "en_US" });
    upsertMetaTag('meta[property="og:image"]', {
      property: "og:image",
      content: "https://www.mathbrooks.com/og-image.png",
    });
    upsertMetaTag('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMetaTag('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: "https://www.mathbrooks.com/og-image.png",
    });

    if (canonicalPath) {
      const canonicalUrl = `https://www.mathbrooks.com${canonicalPath}`;
      upsertLinkTag('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
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
