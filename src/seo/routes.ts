import { blogPosts, products } from "@/content/siteContent";
import { thingsProjects } from "@/content/thingsProjects";

export const SITE_ORIGIN = "https://www.mathbrooks.com";
export const RELEASE_DATE = "2026-08-22";

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  lastmod: string;
  indexable: boolean;
  ogType: "website" | "article";
  ogImage: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
};

type RouteInput = Omit<RouteMeta, "canonical" | "lastmod" | "indexable" | "ogType" | "ogImage" | "changefreq" | "priority"> &
  Partial<Pick<RouteMeta, "lastmod" | "indexable" | "ogType" | "ogImage" | "changefreq" | "priority">>;

const normalisePath = (path: string) => {
  const clean = path.split("?")[0].split("#")[0] || "/";
  return clean !== "/" ? clean.replace(/\/+$/, "") : clean;
};

export const canonicalUrl = (path: string) =>
  `${SITE_ORIGIN}${normalisePath(path) === "/" ? "/" : normalisePath(path)}`;

const route = ({
  path,
  title,
  description,
  lastmod = RELEASE_DATE,
  indexable = true,
  ogType = "website",
  ogImage = "/og-image.png",
  changefreq = "monthly",
  priority = 0.7,
}: RouteInput): RouteMeta => ({
  path: normalisePath(path),
  title,
  description,
  canonical: canonicalUrl(path),
  lastmod,
  indexable,
  ogType,
  ogImage,
  changefreq,
  priority,
});

const productTitles: Record<string, string> = {
  crm: "CRM Software for Sales Operations | MathBrooks Zimbabwe",
  hr: "HR & Payroll Software for Zimbabwean Teams | MathBrooks",
  accounting: "Accounting Software for Business Operations | MathBrooks",
  projects: "Project Management Software for Operations | MathBrooks",
  inventory: "Inventory Management Software for Teams | MathBrooks",
  analytics: "Business Analytics Software & Dashboards | MathBrooks",
  automation: "Workflow Automation Software for Operations | MathBrooks",
  "ai-assistant": "AI Assistant Software for Business Operations | MathBrooks",
};

const productDescriptions: Record<string, string> = {
  crm: "Deploy MathBrooks CRM to manage leads, customer history, quotations, follow-ups, and sales visibility in one production-ready operating system.",
  hr: "Deploy Zimbabwe-ready HR and payroll software for employee records, payroll runs, leave, approvals, audit trails, and statutory reporting workflows.",
  accounting: "Deploy accounting software that connects invoicing, expenses, cash flow, approvals, reporting, and financial controls across daily operations.",
  projects: "Deploy project management software for planning, delivery, ownership, budgets, milestones, risks, and operational reporting across connected teams.",
  inventory: "Deploy inventory management software for stock visibility, movements, purchasing, locations, reorder controls, fulfilment, and connected operations.",
  analytics: "Deploy governed business analytics and dashboards that connect operational data, performance indicators, reporting, and decision-ready intelligence.",
  automation: "Deploy workflow automation for approvals, recurring administration, system handoffs, alerts, reporting, and mission-critical operational controls.",
  "ai-assistant": "Deploy a governed AI assistant for research, summaries, classification, drafting, internal knowledge, and bounded support inside real workflows.",
};

const thingTitles: Record<string, string> = {
  "soko-a01": "SOKO A01 Embodied Intelligence Research | MathBrooks",
  tessera: "Tessera Resilient Network Intelligence | MathBrooks",
  "zimbabwe-language-intelligence": "Ilwimi Zimbabwean Language Intelligence | MathBrooks",
  "zimbabwe-earth-intelligence": "neFI Environmental Data Infrastructure | MathBrooks",
  eklezo: "Eklezo End-to-End Energy Intelligence | MathBrooks",
};

const thingDescriptions: Record<string, string> = {
  "soko-a01": "Explore SOKO A01, MathBrooks research into embodied intelligence for dangerous, demanding, and difficult-to-automate physical work environments.",
  tessera: "Explore Tessera, a resilient network intelligence layer designed to restore useful communications as devices move, weaken, fail, or disconnect.",
  "zimbabwe-language-intelligence": "Explore Ilwimi, Zimbabwean language intelligence for Shona, Ndebele, English, code-switching, speech, translation, and locally fluent AI services.",
  "zimbabwe-earth-intelligence": "Explore neFI, Zimbabwe's environmental data infrastructure for fused satellite, weather, water, ground, terrain, and catchment observations.",
  eklezo: "Explore Eklezo energy intelligence spanning resilient hybrid power, Eklezo OS orchestration, local battery capability, reuse, and recycling research.",
};

const blogTitles: Record<string, string> = {
  "how-zimbabwean-businesses-can-tighten-payroll-operations": "Tighter Payroll Operations for Zimbabwean Teams | MathBrooks",
  "simple-crm-for-owner-led-sales-teams": "Simple CRM for Owner-Led Sales Teams in Africa | MathBrooks",
  "where-automation-actually-saves-admin-time": "Where Workflow Automation Saves Admin Time | MathBrooks",
  "ai-tools-african-businesses-can-actually-use": "Practical AI Tools for African Businesses | MathBrooks",
};

const blogDescriptions: Record<string, string> = {
  "how-zimbabwean-businesses-can-tighten-payroll-operations": "A guide to stronger payroll controls, leave workflows, approvals, audit trails, and statutory readiness for growing organisations operating in Zimbabwe.",
  "simple-crm-for-owner-led-sales-teams": "Learn how owner-led sales teams can move leads, customer context, quotations, and follow-ups from scattered messages into one disciplined CRM workflow.",
  "where-automation-actually-saves-admin-time": "See which recurring approvals, handoffs, reminders, reports, and administrative workflows are worth automating first—and which create process debt.",
  "ai-tools-african-businesses-can-actually-use": "A grounded guide to copilots, classification, voice workflows, and governed agentic systems that can create measurable value for African organisations.",
};

const staticRoutes: RouteMeta[] = [
  route({
    path: "/",
    title: "MathBrooks | Intelligent Systems & Digital Infrastructure",
    description: "MathBrooks architects operational software, AI, connected systems, and digital infrastructure for organisations, institutions, and nations from Zimbabwe.",
    changefreq: "weekly",
    priority: 1,
  }),
  route({
    path: "/systems-architecture",
    title: "Systems Architecture & Custom Infrastructure | MathBrooks",
    description: "Explore how MathBrooks deploys production-ready products and architects custom software, AI, connected systems, and resilient digital infrastructure.",
    priority: 0.9,
  }),
  route({
    path: "/products",
    title: "Deployable Business Software Products | MathBrooks",
    description: "Compare production-ready MathBrooks software for CRM, people, finance, delivery, inventory, automation, analytics, and governed AI operations.",
    changefreq: "weekly",
    priority: 0.9,
  }),
  route({
    path: "/services",
    title: "Custom Software & Intelligent Systems | MathBrooks",
    description: "Commission custom software, automation, AI, connected systems, and digital infrastructure for missions too consequential for standard products.",
    priority: 0.9,
  }),
  route({
    path: "/audit",
    title: "Free AI Business Efficiency Audit | MathBrooks Zimbabwe",
    description: "Run a free, structured AI business audit to find inefficient processes, manual work, and technology gaps — then see which MathBrooks systems could help.",
    priority: 0.7,
  }),
  route({
    path: "/research",
    title: "MathBrooks Things | Advanced Technology Research Portfolio",
    description: "Explore MathBrooks research in embodied intelligence, environmental infrastructure, Zimbabwean language AI, resilient networks, and energy systems.",
    priority: 0.8,
  }),
  route({
    path: "/work",
    title: "Software & Systems Engineering Case Studies | MathBrooks",
    description: "Review MathBrooks systems work across software platforms, automation, applied AI, public infrastructure, connected operations, and digital delivery.",
  }),
  route({
    path: "/ai-labs",
    title: "Applied AI Research & Intelligent Systems | MathBrooks",
    description: "Explore MathBrooks applied AI work in governed copilots, classification, voice, decision support, automation, agents, and locally relevant intelligence.",
  }),
  route({
    path: "/pricing",
    title: "Business Software Pricing & Plans in Zimbabwe | MathBrooks",
    description: "Compare MathBrooks software pricing for CRM, HR and payroll, accounting, projects, inventory, analytics, automation, and AI-assisted operations.",
    changefreq: "weekly",
    priority: 0.8,
  }),
  route({
    path: "/about",
    title: "About MathBrooks | Intelligent Systems Company Zimbabwe",
    description: "Meet the Zimbabwe-based engineering company building production-grade software, AI, connected systems, research platforms, and digital infrastructure.",
  }),
  route({
    path: "/blog",
    title: "Software, AI & Digital Infrastructure Insights | MathBrooks",
    description: "Read practical MathBrooks guidance on business software, payroll, CRM, workflow automation, applied AI, operational systems, and digital infrastructure.",
    changefreq: "weekly",
  }),
  route({
    path: "/contact",
    title: "Request a Systems Architecture Brief Now | MathBrooks",
    description: "Bring MathBrooks your mission, constraints, and existing systems. Request an architecture brief for a product deployment or custom intelligent system.",
    priority: 0.8,
  }),
  route({
    path: "/privacy",
    title: "MathBrooks Privacy Policy & Data Handling Practices",
    description: "Read how MathBrooks handles personal information, enquiries, analytics, service delivery data, retention, security, and privacy rights on this website.",
    changefreq: "yearly",
    priority: 0.3,
  }),
  route({
    path: "/zifa",
    title: "ZIFA Football Management System Requirements | MathBrooks",
    description: "Submit structured operational requirements for the ZIFA football management system, including governance, competitions, clubs, players, and reporting.",
    indexable: false,
    priority: 0.2,
  }),
  route({
    path: "/book-demo",
    title: "Book a MathBrooks Business Software Demonstration Now",
    description: "Book a guided demonstration of MathBrooks software products for CRM, people, finance, delivery, inventory, analytics, automation, and AI operations.",
    indexable: false,
    priority: 0.2,
  }),
  route({
    path: "/start-trial",
    title: "Start a Guided MathBrooks Software Product Trial Today",
    description: "Request guided trial access to a MathBrooks software product and validate the workflow, operating fit, controls, and rollout path before deployment.",
    indexable: false,
    priority: 0.2,
  }),
];

const productRoutes = products.map((product) =>
  route({
    path: `/products/${product.slug}`,
    title: productTitles[product.slug],
    description: productDescriptions[product.slug],
    changefreq: "weekly",
    priority: 0.8,
    ogImage: `/og/products/${product.slug}.png`,
  }),
);

const thingRoutes = thingsProjects.map((project) =>
  route({
    path: `/research/${project.slug}`,
    title: thingTitles[project.slug],
    description: thingDescriptions[project.slug],
    priority: 0.8,
    ogImage: `/og/research/${project.slug}.png`,
  }),
);

const blogRoutes = blogPosts.map((post) =>
  route({
    path: `/blog/${post.slug}`,
    title: blogTitles[post.slug],
    description: blogDescriptions[post.slug],
    lastmod: post.publishedOn,
    ogType: "article",
    ogImage: `/og/blog/${post.slug}.png`,
    changefreq: "yearly",
    priority: 0.6,
  }),
);

export const publicRoutes: RouteMeta[] = [
  ...staticRoutes,
  ...productRoutes,
  ...thingRoutes,
  ...blogRoutes,
];

export const getRouteMeta = (path: string) => {
  const normalised = normalisePath(path);
  return publicRoutes.find((entry) => entry.path === normalised);
};

export const redirectRoutes = [
  { source: "/solutions", destination: "/systems-architecture" },
  { source: "/solutions/available", destination: "/products" },
  { source: "/solutions/available/:slug", destination: "/products/:slug" },
  { source: "/things", destination: "/research" },
  { source: "/things/resilient-energy-intelligence", destination: "/research/eklezo" },
  { source: "/things/:slug", destination: "/research/:slug" },
  { source: "/case-studies", destination: "/work" },
  { source: "/resources", destination: "/blog" },
  { source: "/clients", destination: "/contact" },
  { source: "/research/resilient-energy-intelligence", destination: "/research/eklezo" },
];
