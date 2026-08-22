import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const distDir = join(projectRoot, "dist");
const template = await readFile(join(distDir, "index.html"), "utf8");
const serverEntry = await import(pathToFileURL(join(projectRoot, ".prerender", "entry-server.js")).href);
const { illustrativeProductCopyByPath, publicRoutes, render } = serverEntry;

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`Could not find metadata tag matching ${pattern}`);
  return html.replace(pattern, replacement);
};

const validateMetadata = () => {
  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const seenCanonicals = new Map();

  for (const page of publicRoutes) {
    if (page.title.length < 50 || page.title.length > 60) {
      throw new Error(`${page.path}: title must be 50-60 characters; received ${page.title.length}: ${page.title}`);
    }
    if (page.description.length < 140 || page.description.length > 160) {
      throw new Error(`${page.path}: description must be 140-160 characters; received ${page.description.length}: ${page.description}`);
    }
    const expectedCanonical = `https://www.mathbrooks.com${page.path === "/" ? "/" : page.path}`;
    if (page.canonical !== expectedCanonical) {
      throw new Error(`${page.path}: canonical ${page.canonical} does not self-reference ${expectedCanonical}`);
    }
    for (const [value, seen, label] of [
      [page.title, seenTitles, "title"],
      [page.description, seenDescriptions, "description"],
      [page.canonical, seenCanonicals, "canonical"],
    ]) {
      if (seen.has(value)) throw new Error(`${page.path}: duplicate ${label} also used by ${seen.get(value)}`);
      seen.set(value, page.path);
    }
  }
};

const buildPage = (page, renderedBody) => {
  let html = template.replace(
    /<!--app-start-->[\s\S]*?<!--app-end-->/,
    `<!--app-start--><div id="root">${renderedBody}</div><!--app-end-->`,
  );
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const robots = page.indexable
    ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "noindex, follow";

  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`);
  html = replaceTag(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${robots}" />`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${page.canonical}" />`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`);
  html = replaceTag(html, /<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${page.ogType}" />`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${page.canonical}" />`);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`);

  const webPageData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": page.ogType === "article" ? "Article" : "WebPage",
    "@id": `${page.canonical}#webpage`,
    url: page.canonical,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": "https://www.mathbrooks.com/#website" },
    inLanguage: "en",
  }).replaceAll("<", "\\u003c");
  html = html.replace("</head>", `    <script id="route-structured-data" type="application/ld+json">${webPageData}</script>\n  </head>`);
  return html;
};

const assertRenderedContent = (page, html) => {
  if (!/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/.test(html)) {
    throw new Error(`${page.path}: prerendered document has no h1`);
  }
  if (!page.indexable) return;
  const requiredLinks = ["/solutions/available", "/services", "/things", "/about"];
  for (const href of requiredLinks) {
    if (!html.includes(`href="${href}"`)) {
      throw new Error(`${page.path}: prerendered navigation is missing href=${href}`);
    }
  }

  const illustrativeCopy = illustrativeProductCopyByPath[page.path] || [];
  for (const sampleText of illustrativeCopy) {
    if (html.includes(sampleText)) {
      throw new Error(`${page.path}: illustrative product copy leaked into prerendered HTML: ${sampleText}`);
    }
  }
};

validateMetadata();

for (const page of publicRoutes) {
  const renderedBody = render(page.path);
  const html = buildPage(page, renderedBody);
  assertRenderedContent(page, html);
  const outputFile = page.path === "/"
    ? join(distDir, "index.html")
    : join(distDir, page.path.slice(1), "index.html");
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, html);
  if (page.path !== "/") {
    await writeFile(join(distDir, `${page.path.slice(1)}.html`), html);
  }
}

const indexableRoutes = publicRoutes.filter((page) => page.indexable);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes.map((page) => `  <url>
    <loc>${page.canonical}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /zifa
Disallow: /book-demo
Disallow: /start-trial

Sitemap: https://www.mathbrooks.com/sitemap.xml
`;

await writeFile(join(distDir, "sitemap.xml"), sitemap);
await writeFile(join(distDir, "robots.txt"), robots);

console.log(`Prerendered ${publicRoutes.length} routes (${indexableRoutes.length} indexable).`);
