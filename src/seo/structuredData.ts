import { blogPosts, products } from "@/content/siteContent";
import { thingsProjects } from "@/content/thingsProjects";
import { SITE_ORIGIN, type RouteMeta } from "@/seo/routes";

type JsonLdNode = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const organization: JsonLdNode = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "MathBrooks",
  url: SITE_ORIGIN,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_ORIGIN}/mathbrooks-mark.svg`,
  },
  description:
    "MathBrooks architects operational software, AI, connected systems, and digital infrastructure for organisations, institutions, and nations from Zimbabwe.",
  foundingLocation: {
    "@type": "Place",
    name: "Harare, Zimbabwe",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Harare",
      addressCountry: "ZW",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Harare",
    addressCountry: "ZW",
  },
  areaServed: [
    { "@type": "Country", name: "Zimbabwe" },
    { "@type": "Place", name: "Africa" },
  ],
  email: "cto@mathbrooks.com",
  telephone: "+263719592326",
  contactPoint: {
    "@type": "ContactPoint",
    email: "cto@mathbrooks.com",
    telephone: "+263719592326",
    contactType: "sales",
    availableLanguage: ["English"],
  },
  sameAs: ["https://x.com/MathBrooks"],
};

const website: JsonLdNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_ORIGIN}/`,
  name: "MathBrooks",
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
};

const staticLabels: Record<string, string> = {
  "/systems-architecture": "Systems Architecture",
  "/products": "Products",
  "/services": "Custom Systems",
  "/research": "Research",
  "/work": "Work",
  "/ai-labs": "AI Labs",
  "/pricing": "Pricing",
  "/about": "About",
  "/blog": "Blog",
  "/contact": "Contact",
  "/privacy": "Privacy",
  "/book-demo": "Book a Demo",
  "/start-trial": "Start a Trial",
  "/zifa": "ZIFA Requirements",
};

const breadcrumbItems = (page: RouteMeta) => {
  const items = [{ name: "Home", url: `${SITE_ORIGIN}/` }];
  const product = products.find((entry) => page.path === `/products/${entry.slug}`);
  const project = thingsProjects.find((entry) => page.path === `/research/${entry.slug}`);
  const article = blogPosts.find((entry) => page.path === `/blog/${entry.slug}`);

  if (product) {
    items.push({ name: "Products", url: `${SITE_ORIGIN}/products` });
    items.push({ name: product.shortName, url: page.canonical });
  } else if (project) {
    items.push({ name: "Research", url: `${SITE_ORIGIN}/research` });
    items.push({ name: project.shortName, url: page.canonical });
  } else if (article) {
    items.push({ name: "Blog", url: `${SITE_ORIGIN}/blog` });
    items.push({ name: article.title, url: page.canonical });
  } else {
    items.push({ name: staticLabels[page.path] ?? page.title.split("|")[0].trim(), url: page.canonical });
  }

  return items;
};

const breadcrumbList = (page: RouteMeta): JsonLdNode => ({
  "@type": "BreadcrumbList",
  "@id": `${page.canonical}#breadcrumb`,
  itemListElement: breadcrumbItems(page).map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const webPage = (page: RouteMeta): JsonLdNode => ({
  "@type": "WebPage",
  "@id": `${page.canonical}#webpage`,
  url: page.canonical,
  name: page.title,
  description: page.description,
  isPartOf: { "@id": WEBSITE_ID },
  ...(page.path === "/" ? {} : { breadcrumb: { "@id": `${page.canonical}#breadcrumb` } }),
  inLanguage: "en",
});

const productApplication = (page: RouteMeta): JsonLdNode | undefined => {
  const product = products.find((entry) => page.path === `/products/${entry.slug}`);
  if (!product) return undefined;
  const price = product.startingPrice.match(/\$([\d.]+)/)?.[1];

  return {
    "@type": "SoftwareApplication",
    "@id": `${page.canonical}#software`,
    name: product.name,
    description: page.description,
    url: page.canonical,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "Country", name: "Zimbabwe" },
      { "@type": "Place", name: "Africa" },
    ],
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "USD",
            url: page.canonical,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
};

const article = (page: RouteMeta): JsonLdNode | undefined => {
  const post = blogPosts.find((entry) => page.path === `/blog/${entry.slug}`);
  if (!post) return undefined;

  return {
    "@type": "Article",
    "@id": `${page.canonical}#article`,
    mainEntityOfPage: { "@id": `${page.canonical}#webpage` },
    headline: post.title,
    description: page.description,
    url: page.canonical,
    image: `${SITE_ORIGIN}${page.ogImage}`,
    datePublished: `${post.publishedOn}T00:00:00+02:00`,
    dateModified: `${page.lastmod}T00:00:00+02:00`,
    author: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "MathBrooks",
      url: SITE_ORIGIN,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "MathBrooks",
      url: SITE_ORIGIN,
    },
    inLanguage: "en",
  };
};

export const structuredDataForRoute = (page: RouteMeta) => {
  const graph: JsonLdNode[] = [];

  if (page.path === "/") {
    graph.push(organization, website, webPage(page));
  } else {
    graph.push(webPage(page), breadcrumbList(page));
    const application = productApplication(page);
    const articleNode = article(page);
    if (application) graph.push(application);
    if (articleNode) graph.push(articleNode);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};
