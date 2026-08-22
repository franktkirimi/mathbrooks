import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const projectRoot = process.cwd();
const distDir = join(projectRoot, "dist");
const serverEntry = await import(pathToFileURL(join(projectRoot, ".prerender", "entry-server.js")).href);
const {
  publicRoutes,
  publishedProductPriceByPath,
  redirectRoutes,
  socialImageEntries,
} = serverEntry;

const routeFile = (path) => path === "/"
  ? join(distDir, "index.html")
  : join(distDir, path.slice(1), "index.html");

const redirectPattern = (source) => new RegExp(`^${source.replace(/:[^/]+/g, "[^/]+")}$`);
const redirectSources = redirectRoutes.map((redirect) => ({
  ...redirect,
  pattern: redirectPattern(redirect.source),
}));

for (const redirect of redirectRoutes) {
  if (redirect.source === redirect.destination) {
    throw new Error(`Self redirect: ${redirect.source}`);
  }
  const sampleDestination = redirect.destination.replace(/:[^/]+/g, "crm");
  const next = redirectSources.find((candidate) => candidate.pattern.test(sampleDestination));
  if (next) {
    throw new Error(`Redirect chain: ${redirect.source} -> ${redirect.destination} -> ${next.destination}`);
  }
}

const publicPaths = new Set(publicRoutes.map((page) => page.path));
const linkedRedirects = [];
const unknownInternalLinks = [];
let internalLinkCount = 0;

for (const page of publicRoutes) {
  const html = await readFile(routeFile(page.path), "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== page.canonical) throw new Error(`${page.path}: canonical mismatch ${canonical}`);
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  if (ogUrl !== page.canonical) throw new Error(`${page.path}: og:url mismatch ${ogUrl}`);
  const expectedImage = `https://www.mathbrooks.com${page.ogImage}`;
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  const twitterImage = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1];
  if (ogImage !== expectedImage || twitterImage !== expectedImage) {
    throw new Error(`${page.path}: social image metadata mismatch`);
  }

  const jsonLdMatches = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (jsonLdMatches.length !== 1) throw new Error(`${page.path}: expected one JSON-LD block, found ${jsonLdMatches.length}`);
  const schema = JSON.parse(jsonLdMatches[0][1]);
  const graph = schema["@graph"];
  if (schema["@context"] !== "https://schema.org" || !Array.isArray(graph)) {
    throw new Error(`${page.path}: invalid JSON-LD graph`);
  }
  const types = graph.map((node) => node["@type"]);
  if (page.path === "/") {
    for (const type of ["Organization", "WebSite", "WebPage"]) {
      if (!types.includes(type)) throw new Error(`Homepage schema missing ${type}`);
    }
  } else if (!types.includes("BreadcrumbList")) {
    throw new Error(`${page.path}: schema missing BreadcrumbList`);
  }

  if (page.path in publishedProductPriceByPath) {
    const application = graph.find((node) => node["@type"] === "SoftwareApplication");
    if (!application) throw new Error(`${page.path}: schema missing SoftwareApplication`);
    const visiblePrice = publishedProductPriceByPath[page.path];
    const numericPrice = visiblePrice.match(/\$([\d.]+)/)?.[1];
    if (application.offers?.price !== numericPrice || application.offers?.priceCurrency !== "USD") {
      throw new Error(`${page.path}: schema price does not match ${visiblePrice}`);
    }
    if (!html.includes(visiblePrice)) throw new Error(`${page.path}: published price is missing from visible HTML`);
  }

  if (page.ogType === "article") {
    const article = graph.find((node) => node["@type"] === "Article");
    if (!article) throw new Error(`${page.path}: schema missing Article`);
    if (article.dateModified !== page.lastmod || article.datePublished !== page.lastmod) {
      throw new Error(`${page.path}: article dates do not match sitemap lastmod ${page.lastmod}`);
    }
  }

  for (const match of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = match[1];
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    const url = new URL(href, "https://www.mathbrooks.com");
    if (url.origin !== "https://www.mathbrooks.com") continue;
    internalLinkCount += 1;
    const pathname = url.pathname !== "/" ? url.pathname.replace(/\/+$/, "") : "/";
    const redirect = redirectSources.find((candidate) => candidate.pattern.test(pathname));
    if (redirect) linkedRedirects.push(`${page.path} -> ${href}`);
    if (!publicPaths.has(pathname)) unknownInternalLinks.push(`${page.path} -> ${href}`);
  }
}

if (linkedRedirects.length) throw new Error(`Internal links fire redirects:\n${linkedRedirects.join("\n")}`);
if (unknownInternalLinks.length) throw new Error(`Unknown internal links:\n${unknownInternalLinks.join("\n")}`);

const sitemap = await readFile(join(distDir, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapUrls = publicRoutes.filter((page) => page.indexable).map((page) => page.canonical);
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedSitemapUrls)) {
  throw new Error("Sitemap URLs do not exactly match the indexable route registry");
}
for (const oldPath of ["/solutions/available", "/things", "/solutions"]) {
  if (sitemap.includes(`www.mathbrooks.com${oldPath}`)) throw new Error(`Old path leaked into sitemap: ${oldPath}`);
}

const hashes = new Set();
for (const entry of socialImageEntries) {
  const imagePath = join(distDir, "og", entry.output);
  const buffer = await readFile(imagePath);
  const metadata = await sharp(buffer).metadata();
  if (metadata.width !== 1200 || metadata.height !== 630 || metadata.format !== "png") {
    throw new Error(`${entry.path}: invalid OG image ${metadata.width}x${metadata.height} ${metadata.format}`);
  }
  const hash = createHash("sha256").update(buffer).digest("hex");
  if (hashes.has(hash)) throw new Error(`${entry.path}: OG image duplicates another route`);
  hashes.add(hash);
}

for (const path of ["/book-demo", "/start-trial"]) {
  const page = publicRoutes.find((entry) => entry.path === path);
  if (!page || page.indexable) throw new Error(`${path}: transactional route must exist and remain noindex`);
  await readFile(routeFile(path), "utf8");
}

console.log(`Verified ${publicRoutes.length} prerendered routes, ${internalLinkCount} internal links, ${redirectRoutes.length} one-hop redirects, and ${socialImageEntries.length} unique OG images.`);
