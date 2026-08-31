import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App";
import { blogPosts, products } from "./content/siteContent";
import { thingsProjects } from "./content/thingsProjects";

export { publicRoutes, redirectRoutes } from "./seo/routes";
export { structuredDataForRoute } from "./seo/structuredData";

export const illustrativeProductCopyByPath = Object.fromEntries(
  products.map((product) => [
    `/products/${product.slug}`,
    [
      ...product.metrics.flatMap((metric) => [
        metric.label,
        ...(/[A-Za-z$%/]/.test(metric.value) ? [metric.value] : []),
      ]),
      ...product.panels.flatMap((panel) => panel.items),
    ],
  ]),
);

export const socialImageEntries = [
  ...products.map((product) => ({
    path: `/products/${product.slug}`,
    output: `products/${product.slug}.png`,
    eyebrow: "Deployable product",
    title: product.name,
  })),
  ...thingsProjects.map((project) => ({
    path: `/research/${project.slug}`,
    output: `research/${project.slug}.png`,
    eyebrow: "Research system",
    title: project.name,
  })),
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    output: `blog/${post.slug}.png`,
    eyebrow: "MathBrooks insight",
    title: post.title,
  })),
  {
    path: "/audit",
    output: "audit.png",
    title: "Free AI Business Efficiency Audit",
  },
];

export const publishedProductPriceByPath = Object.fromEntries(
  products.map((product) => [`/products/${product.slug}`, product.startingPrice]),
);

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>,
  );
