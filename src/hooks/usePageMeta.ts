import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
};

export function usePageMeta({ title, description, canonicalPath }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", description);
    }

    if (canonicalPath) {
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute("href", `https://www.mathbrooks.com${canonicalPath}`);
      }
    }
  }, [canonicalPath, description, title]);
}
