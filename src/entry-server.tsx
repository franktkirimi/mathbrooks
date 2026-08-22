import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App";
import { products } from "./content/siteContent";

export { publicRoutes } from "./seo/routes";

export const illustrativeProductCopyByPath = Object.fromEntries(
  products.map((product) => [
    `/solutions/available/${product.slug}`,
    [
      ...product.metrics.flatMap((metric) => [
        metric.label,
        ...(/[A-Za-z$%/]/.test(metric.value) ? [metric.value] : []),
      ]),
      ...product.panels.flatMap((panel) => panel.items),
    ],
  ]),
);

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>,
  );
