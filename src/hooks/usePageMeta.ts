import { useEffect } from "react";
import { getRouteMeta } from "@/seo/routes";

type PageMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  ogType?: string;
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
}: PageMeta) {
  useEffect(() => {
    const registeredMeta = getRouteMeta(window.location.pathname);
    const resolvedTitle = registeredMeta?.title ?? title;
    const resolvedDescription = registeredMeta?.description ?? description;
    const resolvedOgType = registeredMeta?.ogType ?? ogType;
    const resolvedOgImage = `https://www.mathbrooks.com${registeredMeta?.ogImage ?? "/og-image.png"}`;
    const canonicalUrl = registeredMeta?.canonical ??
      (canonicalPath ? `https://www.mathbrooks.com${canonicalPath}` : undefined);

    document.title = resolvedTitle;

    upsertMetaTag('meta[name="description"]', { name: "description", content: resolvedDescription });
    upsertMetaTag('meta[name="robots"]', {
      name: "robots",
      content: registeredMeta?.indexable === false
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });

    if (keywords?.length) {
      upsertMetaTag('meta[name="keywords"]', {
        name: "keywords",
        content: keywords.join(", "),
      });
    }

    upsertMetaTag('meta[property="og:title"]', { property: "og:title", content: resolvedTitle });
    upsertMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: resolvedDescription,
    });
    upsertMetaTag('meta[property="og:type"]', { property: "og:type", content: resolvedOgType });
    upsertMetaTag('meta[property="og:site_name"]', { property: "og:site_name", content: "MathBrooks" });
    upsertMetaTag('meta[property="og:locale"]', { property: "og:locale", content: "en_US" });
    upsertMetaTag('meta[property="og:image"]', {
      property: "og:image",
      content: resolvedOgImage,
    });
    upsertMetaTag('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: resolvedTitle });
    upsertMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: resolvedDescription,
    });
    upsertMetaTag('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: resolvedOgImage,
    });

    if (canonicalUrl) {
      upsertLinkTag('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
      upsertMetaTag('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    }

  }, [canonicalPath, description, keywords, ogType, title]);
}
