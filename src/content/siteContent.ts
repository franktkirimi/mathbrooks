import {
  BarChart3,
  Bot,
  Boxes,
  Brain,
  CreditCard,
  Cpu,
  FolderKanban,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ProductMetric = {
  label: string;
  value: string;
};

export type ProductSlug =
  | "crm"
  | "hr"
  | "accounting"
  | "projects"
  | "inventory"
  | "analytics"
  | "automation"
  | "ai-assistant";

export type ProductPanel = {
  title: string;
  items: string[];
};

export type ProductFeature = {
  title: string;
  detail: string;
};

export type ProductUseCase = {
  title: string;
  detail: string;
};

export type ProductEntry = {
  slug: ProductSlug;
  name: string;
  shortName: string;
  category: string;
  family: string;
  tagline: string;
  audience: string;
  summary: string;
  overview: string;
  problem: string;
  localFit: string;
  startingPrice: string;
  trialAvailable: boolean;
  accent: string;
  icon: LucideIcon;
  metrics: ProductMetric[];
  panels: ProductPanel[];
  features: ProductFeature[];
  useCases: ProductUseCase[];
  proofPoints: string[];
};

export type ProductFamily = {
  title: string;
  description: string;
  slugs: ProductSlug[];
};

export type ServiceEntry = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export type CaseStudyEntry = {
  slug: string;
  title: string;
  sector: string;
  image: string;
  summary: string;
  businessProblem: string;
  solution: string;
  technology: string[];
  result: string;
  metrics: string[];
};

export type PricingPlan = {
  name: string;
  audience: string;
  monthly: string;
  annual: string;
  note: string;
  includes: string[];
  featured?: boolean;
};

export type ResourceEntry = {
  title: string;
  category: string;
  description: string;
  bullets: string[];
};

export type LeadershipProfile = {
  name: string;
  role: string;
  qualification: string;
  roleFocus: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  description: string;
  excerpt: string;
  publishedOn: string;
  readTime: string;
  keywords: string[];
  sections: BlogSection[];
};

export const businessPillars = [
  "Custom Software Development",
  "Business Platforms",
  "Applied AI Systems",
];

export const products: ProductEntry[] = [
  {
    slug: "crm",
    name: "MathBrooks CRM",
    shortName: "CRM",
    category: "Business Platforms",
    family: "Sales & Customer Operations",
    tagline: "Pipeline visibility, follow-up discipline, and customer history in one place.",
    audience: "Service businesses, distributors, and teams managing leads by phone, WhatsApp, and email.",
    summary:
      "A practical CRM for businesses that need better follow-up, cleaner customer records, and a clearer sales pipeline without enterprise software overhead.",
    overview: "Manage leads, customers, and deals in one place.",
    problem:
      "Many growing teams lose context between first contact, quotation, delivery, and repeat business. Leads sit in inboxes, follow-ups depend on memory, and nobody has one trusted view of the account.",
    localFit:
      "Designed for teams that sell through relationships, referrals, phone calls, and WhatsApp, not only through web forms.",
    startingPrice: "$65 / month",
    trialAvailable: true,
    accent: "217 91% 60%",
    icon: Users,
    metrics: [
      { label: "Open Pipeline", value: "$124k" },
      { label: "Follow-Ups Due", value: "18" },
      { label: "Quoted This Month", value: "43" },
    ],
    panels: [
      {
        title: "Pipeline",
        items: ["New lead", "Qualified", "Proposal sent", "Awaiting decision"],
      },
      {
        title: "Customer Timeline",
        items: ["Call logged", "Quote shared", "Site visit booked", "Renewal reminder"],
      },
    ],
    features: [
      {
        title: "Lead capture and follow-up discipline",
        detail: "Track every prospect, owner, next step, and due date in one sales workflow.",
      },
      {
        title: "Customer history that survives handovers",
        detail: "Keep notes, quotations, tasks, and account status connected to the client record.",
      },
      {
        title: "Sales visibility for owners and managers",
        detail: "See pipeline by stage, conversion risk, and activity gaps without waiting for manual updates.",
      },
      {
        title: "Connected workflows",
        detail: "Integrate CRM activity into delivery, support, finance, or custom internal systems when needed.",
      },
    ],
    useCases: [
      {
        title: "Service businesses",
        detail: "Track prospects, quotations, follow-up reminders, and post-sale account management.",
      },
      {
        title: "Distribution teams",
        detail: "Coordinate field reps, customer visits, repeat orders, and account coverage.",
      },
      {
        title: "Owner-led sales teams",
        detail: "Create visibility before the founder becomes the reporting bottleneck.",
      },
    ],
    proofPoints: ["Lead pipeline by stage", "Customer timelines", "Task reminders", "Quote follow-up workflow"],
  },
  {
    slug: "hr",
    name: "MathBrooks HR & Payroll",
    shortName: "HR & Payroll",
    category: "Business Platforms",
    family: "People & Payroll",
    tagline: "Payroll, leave, and compliance workflows built for Zimbabwean operations.",
    audience: "Businesses that need fewer payroll errors, clearer staff records, and better compliance readiness.",
    summary:
      "An HR and payroll platform that keeps employee records, payroll runs, approvals, and statutory reporting aligned in one operating system.",
    overview: "Manage employees, payroll, and compliance workflows.",
    problem:
      "Payroll and HR administration often live across spreadsheets, email threads, and ad hoc approvals. That makes errors more likely, slows reporting, and creates compliance exposure when the business grows.",
    localFit:
      "Built with practical Zimbabwean payroll realities in mind, including ZIMRA, NSSA, leave administration, and auditable staff records.",
    startingPrice: "$85 / month",
    trialAvailable: true,
    accent: "151 73% 45%",
    icon: FolderKanban,
    metrics: [
      { label: "Payroll Run", value: "312 staff" },
      { label: "Leave Requests", value: "09 pending" },
      { label: "Compliance Tasks", value: "03 due" },
    ],
    panels: [
      {
        title: "Payroll Workspace",
        items: ["Gross to net review", "Approval queue", "Exception checks", "Bank export ready"],
      },
      {
        title: "People Operations",
        items: ["Employee records", "Leave calendar", "Onboarding checklist", "Policy acknowledgements"],
      },
    ],
    features: [
      {
        title: "Payroll runs with audit trails",
        detail: "Review payroll inputs, approvals, exceptions, and finalized outputs in one place.",
      },
      {
        title: "Leave and staff records",
        detail: "Manage employee profiles, contracts, leave balances, and HR requests without spreadsheet drift.",
      },
      {
        title: "Compliance-ready workflows",
        detail: "Keep statutory tasks, reporting preparation, and approvals visible before deadlines become problems.",
      },
      {
        title: "Management visibility",
        detail: "Give leadership a clean view of headcount, payroll movement, and unresolved admin work.",
      },
    ],
    useCases: [
      {
        title: "SMEs moving off manual payroll",
        detail: "Standardize payroll, employee records, and approvals as headcount increases.",
      },
      {
        title: "Multi-branch operations",
        detail: "Handle HR processes consistently across offices, departments, and teams.",
      },
      {
        title: "Compliance-focused finance teams",
        detail: "Prepare cleaner records for audits, statutory submissions, and internal reviews.",
      },
    ],
    proofPoints: ["ZIMRA and NSSA workflow support", "Leave approvals", "Payroll exceptions", "Employee record history"],
  },
  {
    slug: "accounting",
    name: "MathBrooks Accounting",
    shortName: "Accounting",
    category: "Business Platforms",
    family: "Finance & Cash Control",
    tagline: "Revenue, invoicing, and cash visibility in one finance workspace.",
    audience: "Finance teams and business owners who need cleaner invoice control, collections visibility, and simpler management reporting.",
    summary:
      "An accounting and finance operations module for businesses that need better invoice tracking, clearer cash visibility, and cleaner reporting without a bloated ERP rollout.",
    overview: "Track revenue, invoices, and cash movement with clarity.",
    problem:
      "Revenue, invoicing, expenses, and collections often live across spreadsheets, inboxes, and isolated tools. That slows decision-making and makes overdue exposure harder to control.",
    localFit:
      "Built for businesses balancing practical finance operations, collections follow-up, and management reporting in Zimbabwean and regional operating contexts.",
    startingPrice: "$45 / month",
    trialAvailable: false,
    accent: "22 90% 58%",
    icon: CreditCard,
    metrics: [
      { label: "Revenue This Month", value: "$48.2k" },
      { label: "Overdue Invoices", value: "$6.4k" },
      { label: "Gross Margin", value: "29%" },
    ],
    panels: [
      {
        title: "Invoicing Workspace",
        items: ["Draft invoice", "Sent", "Overdue", "Paid and reconciled"],
      },
      {
        title: "Cash and Collections",
        items: ["Aging summary", "Follow-up queue", "Receipts log", "Weekly finance view"],
      },
    ],
    features: [
      {
        title: "Invoice lifecycle visibility",
        detail: "Track each invoice from creation to payment with cleaner ownership and status visibility.",
      },
      {
        title: "Collections that can be prioritised",
        detail: "See overdue accounts, aging exposure, and the next collection actions without rebuilding reports manually.",
      },
      {
        title: "Cash and performance signals",
        detail: "Give management a simple view of revenue movement, overdue exposure, and margin direction.",
      },
      {
        title: "Connected finance operations",
        detail: "Connect invoicing and collections into CRM, analytics, or broader business workflows where needed.",
      },
    ],
    useCases: [
      {
        title: "Service businesses",
        detail: "Manage quotations, invoices, collections, and account follow-up more cleanly.",
      },
      {
        title: "Growing finance teams",
        detail: "Move core finance operations out of fragmented spreadsheets and inbox threads.",
      },
      {
        title: "Owner-led businesses",
        detail: "Create finance visibility before the founder becomes the reporting bottleneck.",
      },
    ],
    proofPoints: ["Invoice tracking", "Collections queues", "Cash visibility", "Finance dashboards"],
  },
  {
    slug: "projects",
    name: "MathBrooks Projects",
    shortName: "Projects",
    category: "Business Platforms",
    family: "Delivery & Execution",
    tagline: "One operating view for delivery, approvals, and project health.",
    audience: "Teams running client work, internal delivery, field operations, or multi-step approvals.",
    summary:
      "A project operations platform for teams that need task visibility, delivery discipline, and a cleaner handoff between planning and execution.",
    overview: "Organize initiatives, delivery work, and task ownership.",
    problem:
      "Projects slip when responsibilities are unclear, approvals stall in chat threads, and management has no simple view of what is blocked, late, or at risk.",
    localFit:
      "Useful for agencies, professional services, implementation teams, and operational departments that coordinate work across chat, phone, and in-person decisions.",
    startingPrice: "$60 / month",
    trialAvailable: false,
    accent: "28 89% 60%",
    icon: BarChart3,
    metrics: [
      { label: "Projects Active", value: "24" },
      { label: "Blocked Tasks", value: "07" },
      { label: "Due This Week", value: "31" },
    ],
    panels: [
      {
        title: "Delivery Overview",
        items: ["On track", "At risk", "Awaiting approval", "Overdue"],
      },
      {
        title: "Execution Workspace",
        items: ["Task boards", "Owner assignments", "Client milestones", "Status reports"],
      },
    ],
    features: [
      {
        title: "Project visibility that management can trust",
        detail: "Track work status, approvals, blockers, and delivery health in one view.",
      },
      {
        title: "Task ownership and accountability",
        detail: "Assign work clearly, highlight bottlenecks, and avoid status updates by memory.",
      },
      {
        title: "Approvals and stage gates",
        detail: "Move work through review paths without losing context between teams.",
      },
      {
        title: "Client and internal reporting",
        detail: "Generate cleaner updates for stakeholders without rebuilding project status from scratch.",
      },
    ],
    useCases: [
      {
        title: "Client delivery teams",
        detail: "Coordinate timelines, work allocation, and stakeholder updates across projects.",
      },
      {
        title: "Implementation and rollout teams",
        detail: "Track onboarding, field execution, training, and operational handover in one workflow.",
      },
      {
        title: "Internal operations",
        detail: "Manage recurring improvement projects, approvals, and department initiatives.",
      },
    ],
    proofPoints: ["Portfolio dashboards", "Blocked-task alerts", "Approval queues", "Status reporting"],
  },
  {
    slug: "inventory",
    name: "MathBrooks Inventory",
    shortName: "Inventory",
    category: "Business Platforms",
    family: "Operations & Inventory",
    tagline: "Stock, purchasing, and reorder visibility for businesses that cannot afford blind spots.",
    audience: "Retail, distribution, and operations teams that need clearer stock control and purchasing visibility.",
    summary:
      "An inventory and procurement module for businesses that need better stock visibility, cleaner reorder discipline, and faster operational awareness around purchasing risk.",
    overview: "Keep stock, purchasing, and reorder visibility in one layer.",
    problem:
      "Inventory problems usually appear late. Teams discover shortages after delivery has already slowed down, purchasing decisions are reactive, and management lacks a clean view of stock pressure.",
    localFit:
      "Useful for businesses handling mixed product movement, practical purchasing workflows, and supplier coordination across local operating realities.",
    startingPrice: "$55 / month",
    trialAvailable: false,
    accent: "197 81% 55%",
    icon: Boxes,
    metrics: [
      { label: "Items Tracked", value: "468" },
      { label: "Low Stock Alerts", value: "11" },
      { label: "Reorders Pending", value: "05" },
    ],
    panels: [
      {
        title: "Stock Overview",
        items: ["In stock", "Low stock", "Awaiting reorder", "Reserved"],
      },
      {
        title: "Procurement Workspace",
        items: ["Supplier queue", "Purchase requests", "Receipts log", "Restock priorities"],
      },
    ],
    features: [
      {
        title: "Stock visibility before shortages hurt delivery",
        detail: "Track quantities, movement, and reorder pressure early enough to act with confidence.",
      },
      {
        title: "Procurement tied to operational need",
        detail: "Give purchasing teams a clear queue of what needs to be ordered and why.",
      },
      {
        title: "Alerts for low stock and replenishment risk",
        detail: "Surface products that need action before teams are forced into reactive buying.",
      },
      {
        title: "Management visibility on stock health",
        detail: "Make inventory exposure clear in day-to-day operations and review meetings.",
      },
    ],
    useCases: [
      {
        title: "Retail and distribution teams",
        detail: "Maintain stock visibility across moving products, reorder points, and supplier coordination.",
      },
      {
        title: "Operations-heavy businesses",
        detail: "Monitor consumables, inputs, and replenishment workflows that affect delivery quality.",
      },
      {
        title: "Procurement teams",
        detail: "Prioritise purchasing actions based on actual operational pressure rather than guesswork.",
      },
    ],
    proofPoints: ["Low-stock alerts", "Purchase queues", "Supplier workflows", "Stock dashboards"],
  },
  {
    slug: "analytics",
    name: "MathBrooks Analytics",
    shortName: "Analytics",
    category: "Business Platforms",
    family: "Visibility & Reporting",
    tagline: "Dashboards, alerts, and reporting shaped around real operating questions.",
    audience: "Leaders who need one place to understand sales, operations, workforce, or project performance.",
    summary:
      "A practical analytics layer that turns scattered operational data into dashboards, alerts, and management reporting that teams actually use.",
    overview: "Turn operational data into dashboards, alerts, and reports.",
    problem:
      "Important numbers usually exist, but they live across different tools and manual reports. That means decisions are slower, meetings are less productive, and issues are discovered too late.",
    localFit:
      "Built for managers who need fast visibility across real operations, not a generic BI setup that requires a specialist to interpret every chart.",
    startingPrice: "$50 / month",
    trialAvailable: false,
    accent: "262 83% 68%",
    icon: TrendingUp,
    metrics: [
      { label: "Revenue Trend", value: "+18%" },
      { label: "Cash Alerts", value: "02" },
      { label: "Ops Score", value: "91/100" },
    ],
    panels: [
      {
        title: "Executive Dashboard",
        items: ["Sales trend", "Collections", "Ops throughput", "Payroll movement"],
      },
      {
        title: "Alerts and Drilldowns",
        items: ["Low margin", "Missed SLA", "Dormant accounts", "Delayed approvals"],
      },
    ],
    features: [
      {
        title: "Dashboards around business decisions",
        detail: "Build reporting views around the exact questions managers need answered every week.",
      },
      {
        title: "Cross-system visibility",
        detail: "Bring together data from finance, operations, CRM, HR, and project tools where useful.",
      },
      {
        title: "Alerts before issues become expensive",
        detail: "Flag exceptions, delays, or drops in performance early enough to act.",
      },
      {
        title: "Reporting that fits how the team works",
        detail: "Make dashboards available in-office, in review meetings, or through automated summaries.",
      },
    ],
    useCases: [
      {
        title: "Executive reporting",
        detail: "Create a single operating picture across departments without manual spreadsheet consolidation.",
      },
      {
        title: "Sales and finance visibility",
        detail: "Track revenue, collections, pipeline quality, and account movement together.",
      },
      {
        title: "Operations management",
        detail: "Monitor service levels, turnaround time, and recurring bottlenecks in real time.",
      },
    ],
    proofPoints: ["Executive dashboards", "Automated reporting", "Operational alerts", "Cross-system analytics"],
  },
  {
    slug: "automation",
    name: "MathBrooks Automation",
    shortName: "Automation",
    category: "Business Platforms",
    family: "Workflow Automation",
    tagline: "Workflow routing, reminders, and operational handoffs that keep work moving.",
    audience: "Teams dealing with repeated approvals, admin workflows, and status handoffs that create avoidable drag.",
    summary:
      "An automation module for businesses that need repeated workflows to move faster, more reliably, and with better visibility than email chains and chat reminders can provide.",
    overview: "Route approvals, reminders, and handoffs automatically.",
    problem:
      "Repeated business processes often depend on manual chasing. Requests sit in inboxes, approvals are delayed, and no one has a clean view of where work is stalled.",
    localFit:
      "Built for practical operational workflows where approvals, reminders, and handoffs still depend on human teams, not fully autonomous systems.",
    startingPrice: "$35 / month",
    trialAvailable: false,
    accent: "39 96% 60%",
    icon: Sparkles,
    metrics: [
      { label: "Active Workflows", value: "12" },
      { label: "Hours Saved", value: "14/wk" },
      { label: "Success Rate", value: "99.2%" },
    ],
    panels: [
      {
        title: "Automation Console",
        items: ["Approval routes", "Escalations", "Scheduled summaries", "Fallback actions"],
      },
      {
        title: "Workflow Signals",
        items: ["Pending review", "Completed today", "Exceptions", "Next scheduled run"],
      },
    ],
    features: [
      {
        title: "Approvals that move through the right path",
        detail: "Route recurring requests through owners, escalation rules, and fallback paths that teams can trust.",
      },
      {
        title: "Reminders and handoffs that do not depend on memory",
        detail: "Automate status movement, reminders, and repetitive notifications in operational workflows.",
      },
      {
        title: "Visibility over what automation is doing",
        detail: "Keep workflows observable so the business can see what succeeded, what failed, and what still needs review.",
      },
      {
        title: "Governed automation by design",
        detail: "Use rule-based automation where it saves time without hiding risk or removing accountability.",
      },
    ],
    useCases: [
      {
        title: "Approval-heavy teams",
        detail: "Reduce delays in finance, HR, operations, or procurement requests.",
      },
      {
        title: "Operations management",
        detail: "Automate routine handoffs and reporting steps that slow day-to-day execution.",
      },
      {
        title: "Growing businesses",
        detail: "Standardise repetitive workflows before manual coordination becomes expensive.",
      },
    ],
    proofPoints: ["Approval routing", "Escalation rules", "Workflow observability", "Automated summaries"],
  },
  {
    slug: "ai-assistant",
    name: "MathBrooks AI Assistant",
    shortName: "AI Assistant",
    category: "Applied AI Systems",
    family: "Applied Intelligence",
    tagline: "A governed business intelligence layer for asking questions across your operations.",
    audience: "Leaders and operating teams that need quicker answers across CRM, finance, HR, inventory, or project data.",
    summary:
      "An AI assistant module that lets teams ask business questions in plain language and get structured answers grounded in connected business data.",
    overview: "Ask questions about your business data and get answers fast.",
    problem:
      "Teams often know the answer exists somewhere, but finding it takes too long because the data is spread across tools, reports, and operational systems.",
    localFit:
      "Designed for practical business use where teams need fast answers, clear source context, and human oversight where decisions carry operational risk.",
    startingPrice: "$15 / month",
    trialAvailable: false,
    accent: "273 78% 69%",
    icon: Bot,
    metrics: [
      { label: "Query Templates", value: "24" },
      { label: "Connected Sources", value: "06" },
      { label: "Review Queue", value: "03" },
    ],
    panels: [
      {
        title: "Assistant Workspace",
        items: ["Business questions", "Suggested prompts", "Saved views", "Review history"],
      },
      {
        title: "Evidence and Governance",
        items: ["Source references", "Confidence flags", "Approval path", "Escalation queue"],
      },
    ],
    features: [
      {
        title: "Plain-language business questions",
        detail: "Ask about sales, invoices, stock, staffing, or operations without building a custom report first.",
      },
      {
        title: "Structured answers tied to source context",
        detail: "Return usable summaries while keeping the underlying business signal visible to the team.",
      },
      {
        title: "Governed assistant behavior",
        detail: "Keep the AI layer inside review paths where actions or answers affect customers, payroll, finance, or compliance.",
      },
      {
        title: "Connected intelligence across the platform",
        detail: "Use the assistant as a layer on top of CRM, finance, projects, inventory, or analytics workflows.",
      },
    ],
    useCases: [
      {
        title: "Management reporting",
        detail: "Answer recurring operating questions without waiting for a manually rebuilt report.",
      },
      {
        title: "Operations support",
        detail: "Give teams faster access to the information they need to act during the day.",
      },
      {
        title: "Executive visibility",
        detail: "Use the assistant to summarise business signals before reviews and decision meetings.",
      },
    ],
    proofPoints: ["Natural-language queries", "Source-aware answers", "Review workflows", "Cross-platform intelligence"],
  },
];

export const services: ServiceEntry[] = [
  {
    title: "Custom Software",
    href: "/services",
    icon: Cpu,
    description: "Internal tools, client platforms, and operating systems shaped around the workflow you actually run.",
  },
  {
    title: "Automation",
    href: "/services",
    icon: Workflow,
    description: "Workflow design and automation for repetitive approvals, admin steps, and operational handovers.",
  },
  {
    title: "Applied AI",
    href: "/services",
    icon: Brain,
    description: "Practical AI for classification, copilots, analytics, and task support where it earns its place.",
  },
  {
    title: "Agentic Systems",
    href: "/services",
    icon: Bot,
    description: "Tool-connected agents with approval paths, task boundaries, and operational fit built in.",
  },
  {
    title: "Voice & Phone Automation",
    href: "/services",
    icon: PhoneCall,
    description: "Voice and phone flows for intake, routing, support, and time-sensitive operational interactions.",
  },
];

export const trustSignals = [
  {
    title: "Built in Harare",
    detail: "African operating realities shape the product and delivery decisions.",
  },
  {
    title: "Engineer-led delivery",
    detail: "Clients work close to the people designing the system, not layers of account management.",
  },
  {
    title: "Local compliance awareness",
    detail: "Product thinking includes payroll, workflow, and reporting realities relevant to Zimbabwean businesses.",
  },
  {
    title: "Transparent stage",
    detail: "MathBrooks is growing deliberately, staying selective so the work stays close to implementation.",
  },
];

export const productFamilies: ProductFamily[] = [
  {
    title: "Sales & Customer Operations",
    description: "For businesses that need cleaner lead handling, follow-up discipline, and better customer context.",
    slugs: ["crm"],
  },
  {
    title: "People & Payroll",
    description: "For teams that need staff records, approvals, and payroll administration to stay clean and auditable.",
    slugs: ["hr"],
  },
  {
    title: "Finance & Operational Control",
    description: "For teams that need better visibility over money, stock, and the operational pressure around them.",
    slugs: ["accounting", "inventory"],
  },
  {
    title: "Delivery & Workflow Execution",
    description: "For organizations that need work to move through tasks, approvals, and handoffs without drift.",
    slugs: ["projects", "automation"],
  },
  {
    title: "Visibility & Intelligence",
    description: "For leadership teams that need clearer reporting and faster answers across the business.",
    slugs: ["analytics", "ai-assistant"],
  },
];

export const caseStudies: CaseStudyEntry[] = [
  {
    slug: "orderfile",
    title: "OrderFile",
    sector: "Workflow Automation",
    image: "/projects/Project1.png",
    summary: "Automated file organisation for teams working in high-volume shared folders.",
    businessProblem:
      "Large document volumes became difficult to manage when teams relied on manual naming, filing, and folder discipline.",
    solution:
      "MathBrooks built a rule-based desktop workflow that watches files, applies filing logic automatically, and keeps directory structures usable over time.",
    technology: ["Desktop automation", "Rules engine", "Operational workflow design"],
    result:
      "The client moved from manual sorting to a repeatable filing process that protected folder structure and freed staff time for higher-value work.",
    metrics: ["10,000+ files organized", "95% time saved", "Built in 6 weeks"],
  },
  {
    slug: "educentia",
    title: "Educentia",
    sector: "Education Technology",
    image: "/projects/project2.png",
    summary: "A connected learning platform for lessons, assessments, and learner progress.",
    businessProblem:
      "Tutors and students needed one place to run live classes, assessments, and progress review without fragmented tools.",
    solution:
      "MathBrooks delivered a platform that combines live learning, quizzes, tests, and progress tracking in a single educational workflow.",
    technology: ["Web platform", "Live lesson workflows", "Assessment systems"],
    result:
      "The business gained a clearer learner journey and an operational system that supports delivery, engagement, and performance visibility.",
    metrics: ["500+ students", "Live video lessons", "Built in 10 weeks"],
  },
  {
    slug: "coachhub",
    title: "CoachHub",
    sector: "Operational Analytics",
    image: "/projects/Project3.png",
    summary: "A coaching operations platform for planning, performance, and progress visibility.",
    businessProblem:
      "Coaches needed a simpler way to manage training plans, player performance, and development tracking across teams.",
    solution:
      "MathBrooks created a coaching management system that supports planning, performance tracking, and longitudinal player review.",
    technology: ["Performance dashboards", "Team workflows", "Operational analytics"],
    result:
      "Coaching staff gained a more structured operating environment and better insight into player progress and team activity.",
    metrics: ["50+ teams managed", "Real-time analytics", "Built in 8 weeks"],
  },
];

export const productPricing: Record<ProductSlug, PricingPlan[]> = {
  crm: [
    {
      name: "Starter",
      audience: "Up to 5 users",
      monthly: "$65 / month",
      annual: "$660 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Lead and client database",
        "Pipeline tracking",
        "Task reminders and follow-ups",
        "Email support",
      ],
    },
    {
      name: "Growth",
      audience: "Up to 15 users",
      monthly: "$165 / month",
      annual: "$1,680 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Everything in Starter",
        "Team pipelines and role permissions",
        "Reporting dashboards",
        "Onboarding support",
      ],
      featured: true,
    },
    {
      name: "Scale",
      audience: "15+ users or multi-team",
      monthly: "$320 / month",
      annual: "$3,264 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Advanced workflow setup",
        "Custom fields and process tailoring",
        "Priority support",
        "Integration planning",
      ],
    },
  ],
  hr: [
    {
      name: "Core",
      audience: "Up to 25 employees",
      monthly: "$85 / month",
      annual: "$864 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Employee records",
        "Leave management",
        "Basic payroll run workspace",
        "Email support",
      ],
    },
    {
      name: "Business",
      audience: "Up to 100 employees",
      monthly: "$190 / month",
      annual: "$1,932 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Everything in Core",
        "Payroll approvals and audit trail",
        "Statutory workflow support",
        "Onboarding assistance",
      ],
      featured: true,
    },
    {
      name: "Operations+",
      audience: "100+ employees or multi-entity",
      monthly: "$360 / month",
      annual: "$3,672 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Advanced payroll workflows",
        "Multi-team administration",
        "Custom reporting",
        "Priority support and integration planning",
      ],
    },
  ],
  accounting: [
    {
      name: "Starter",
      audience: "Up to 3 finance users",
      monthly: "$45 / month",
      annual: "$456 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Invoice tracking",
        "Basic collections visibility",
        "Cash movement dashboard",
        "Email support",
      ],
    },
    {
      name: "Operations",
      audience: "Up to 8 finance or ops users",
      monthly: "$120 / month",
      annual: "$1,224 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Everything in Starter",
        "Collections queues and aging views",
        "Team workflow ownership",
        "Onboarding support",
      ],
      featured: true,
    },
    {
      name: "Control+",
      audience: "Multi-team finance operations",
      monthly: "$260 / month",
      annual: "$2,652 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Advanced finance workflow tailoring",
        "Management reporting views",
        "Priority support",
        "Integration planning",
      ],
    },
  ],
  projects: [
    {
      name: "Starter",
      audience: "Up to 10 active projects",
      monthly: "$60 / month",
      annual: "$612 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Task boards and ownership",
        "Project status views",
        "Basic milestone tracking",
        "Email support",
      ],
    },
    {
      name: "Delivery",
      audience: "Client or internal delivery teams",
      monthly: "$145 / month",
      annual: "$1,476 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Everything in Starter",
        "Approval workflows",
        "Portfolio reporting",
        "Onboarding assistance",
      ],
      featured: true,
    },
    {
      name: "Portfolio+",
      audience: "Multi-team delivery environments",
      monthly: "$290 / month",
      annual: "$2,958 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Advanced delivery workflows",
        "Custom status models",
        "Priority support",
        "Integration planning",
      ],
    },
  ],
  inventory: [
    {
      name: "Starter",
      audience: "Single-site stock control",
      monthly: "$55 / month",
      annual: "$564 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Inventory records",
        "Low-stock alerts",
        "Basic procurement queue",
        "Email support",
      ],
    },
    {
      name: "Operations",
      audience: "Retail or distribution teams",
      monthly: "$135 / month",
      annual: "$1,380 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Everything in Starter",
        "Supplier workflows",
        "Reorder prioritisation",
        "Onboarding support",
      ],
      featured: true,
    },
    {
      name: "Multi-Site",
      audience: "Multi-branch or higher-volume operations",
      monthly: "$285 / month",
      annual: "$2,904 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Advanced stock movement views",
        "Broader procurement controls",
        "Priority support",
        "Integration planning",
      ],
    },
  ],
  analytics: [
    {
      name: "Starter",
      audience: "One management dashboard",
      monthly: "$50 / month",
      annual: "$504 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Core dashboard setup",
        "Weekly reporting views",
        "Basic alerts",
        "Email support",
      ],
    },
    {
      name: "Management",
      audience: "Cross-functional reporting teams",
      monthly: "$125 / month",
      annual: "$1,272 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Everything in Starter",
        "Cross-system dashboards",
        "Operational alerting",
        "Onboarding assistance",
      ],
      featured: true,
    },
    {
      name: "Executive+",
      audience: "Leadership reporting across teams",
      monthly: "$260 / month",
      annual: "$2,652 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Advanced reporting design",
        "Priority support",
        "Expanded analytics planning",
        "Integration support",
      ],
    },
  ],
  automation: [
    {
      name: "Starter",
      audience: "1 to 3 recurring workflows",
      monthly: "$35 / month",
      annual: "$360 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Workflow routing",
        "Basic reminders and escalations",
        "Execution logs",
        "Email support",
      ],
    },
    {
      name: "Workflow",
      audience: "Operational teams standardising approvals",
      monthly: "$95 / month",
      annual: "$972 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Everything in Starter",
        "Escalation rules",
        "Approval path design",
        "Onboarding assistance",
      ],
      featured: true,
    },
    {
      name: "Operations+",
      audience: "Higher-volume workflow environments",
      monthly: "$220 / month",
      annual: "$2,244 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Advanced workflow orchestration",
        "Priority support",
        "Fallback design support",
        "Integration planning",
      ],
    },
  ],
  "ai-assistant": [
    {
      name: "Starter",
      audience: "Up to 3 internal users",
      monthly: "$15 / month",
      annual: "$156 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Saved business queries",
        "Prompt templates",
        "Basic source references",
        "Email support",
      ],
    },
    {
      name: "Team",
      audience: "Cross-functional operating teams",
      monthly: "$55 / month",
      annual: "$564 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Everything in Starter",
        "Shared query workspace",
        "Governance controls",
        "Onboarding assistance",
      ],
      featured: true,
    },
    {
      name: "Governed",
      audience: "Businesses with higher-risk workflows",
      monthly: "$145 / month",
      annual: "$1,476 / year",
      note: "Save about 15% with annual billing.",
      includes: [
        "Approval paths for answers and actions",
        "Priority support",
        "Expanded source coverage planning",
        "Implementation guidance",
      ],
    },
  ],
};

export const pricingNotes = [
  "Implementation, data migration, and custom integrations are scoped separately so product pricing stays clear.",
  "Billing can be monthly or annual in USD. Local bank transfer support can be arranged for Zimbabwean clients.",
  "Guided trial access is available for CRM and HR & Payroll. Other modules start with a demo and onboarding-led rollout path.",
  "Annual plans are best for teams standardising operations and reducing admin churn across the year.",
];

export const resourceTopics: ResourceEntry[] = [
  {
    title: "How Zimbabwean businesses can tighten payroll operations without overbuying software",
    category: "HR & Payroll",
    description:
      "A practical guide to payroll controls, leave workflows, and statutory readiness for growing teams.",
    bullets: ["Common payroll bottlenecks", "Where audit trails matter", "What to standardise first"],
  },
  {
    title: "A simple CRM setup for owner-led sales teams",
    category: "CRM",
    description:
      "How to move customer follow-up out of scattered chat threads and into one disciplined process.",
    bullets: ["Pipeline basics", "Follow-up habits", "Avoiding CRM complexity"],
  },
  {
    title: "Where automation actually saves admin time",
    category: "Operations",
    description:
      "The workflows most worth automating first, and the traps that create brittle process debt.",
    bullets: ["Approval bottlenecks", "Handover delays", "Reporting shortcuts"],
  },
  {
    title: "AI tools African businesses can actually use",
    category: "Applied AI",
    description:
      "A grounded look at copilots, classification, voice workflows, and agents with business value.",
    bullets: ["Where AI fits", "What needs oversight", "How to avoid demo-only use cases"],
  },
];

export const deliveryPrinciples = [
  {
    title: "Products where the workflow repeats",
    detail: "CRM, HR, projects, and analytics cover repeatable business needs that many teams share.",
  },
  {
    title: "Custom builds where operations are unique",
    detail: "When the workflow is your differentiator, MathBrooks scopes and builds around that reality.",
  },
  {
    title: "AI where it improves the actual process",
    detail: "Automation, copilots, agents, and voice flows are used where they improve speed, quality, or visibility.",
  },
];

export const operatingModel = [
  {
    title: "Discovery before build",
    detail: "We start with the workflow, risk, and business outcome before choosing product, custom build, or AI layer.",
  },
  {
    title: "Practical rollout",
    detail: "Delivery includes onboarding, process fit, and what the team needs to adopt the system with confidence.",
  },
  {
    title: "Governed automation",
    detail: "Where AI or automation touches operational risk, approvals, observability, and fallback paths are part of the design.",
  },
  {
    title: "Built to extend",
    detail: "Products can stand alone, integrate with your stack, or become part of a larger custom platform over time.",
  },
];

export const aiLabFocus = [
  {
    title: "Agriculture",
    detail: "Operational decision support, field workflows, and crop intelligence for practical agricultural use cases.",
  },
  {
    title: "Mining",
    detail: "Monitoring, reporting, and operating visibility for resource-intensive environments.",
  },
  {
    title: "Operational agents",
    detail: "Agentic systems that help teams coordinate tasks, approvals, and information across tools.",
  },
];

export const complianceSignals = [
  "ZIMRA-aware payroll workflows",
  "NSSA process support",
  "Audit-friendly records and approvals",
  "Payment and onboarding realities for local teams",
];

export const serviceAssurance = [
  {
    title: "Human approvals where risk matters",
    icon: ShieldCheck,
    detail: "AI and automation stay inside approval paths when actions affect customers, payroll, finance, or compliance.",
  },
  {
    title: "Operational fit before rollout",
    icon: Workflow,
    detail: "We validate how software fits current teams, constraints, and reporting expectations before scaling use.",
  },
  {
    title: "Direct access to builders",
    icon: Cpu,
    detail: "You work close to the people designing the system, which speeds decisions and avoids translation loss.",
  },
];

export const leadershipProfiles: LeadershipProfile[] = [
  {
    name: "Dr. Eng. D. Simango",
    role: "Chief Engineer",
    qualification: "PhD in Machine Learning and Robotics",
    roleFocus:
      "Leads architecture and AI engineering standards, making sure platforms stay robust, scalable, and production-ready.",
  },
  {
    name: "Eytan Kirimi",
    role: "Product Development Lead",
    qualification: "Honors Degree in IT",
    roleFocus:
      "Owns product planning and execution, aligning user needs, business priorities, and delivery milestones across projects.",
  },
];

export const proofHighlights = [
  {
    label: "Representative delivery outcomes",
    value: "10,000+ files organized",
  },
  {
    label: "Education product scale",
    value: "500+ students supported",
  },
  {
    label: "Operational visibility",
    value: "50+ teams managed",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-zimbabwean-businesses-can-tighten-payroll-operations",
    title: "How Zimbabwean businesses can tighten payroll operations without overbuying software",
    category: "HR & Payroll",
    description:
      "A practical guide to payroll controls, leave workflows, and statutory readiness for growing teams in Zimbabwe.",
    excerpt:
      "Payroll usually becomes painful before it becomes strategic. This guide covers the controls Zimbabwean businesses should tighten first so payroll stays predictable as headcount grows.",
    publishedOn: "2026-04-06",
    readTime: "6 min read",
    keywords: [
      "Zimbabwe payroll software",
      "ZIMRA payroll workflow",
      "NSSA compliance systems",
      "HR software Zimbabwe",
    ],
    sections: [
      {
        heading: "Why payroll starts breaking before leaders notice",
        paragraphs: [
          "Most payroll problems do not begin with tax calculations. They begin with weak process discipline. Leave updates arrive late, allowance changes live in chat threads, approvals are verbal, and one person ends up carrying the entire monthly run in their head.",
          "That works while the team is small. It fails once headcount increases, more managers get involved, or finance needs cleaner records for review. The result is avoidable corrections, delayed payslips, and a compliance process that always feels one step behind.",
        ],
      },
      {
        heading: "The controls worth fixing first",
        paragraphs: [
          "Start with the inputs that create downstream errors: employee records, salary changes, allowances, deductions, leave, and exit dates. If those move through informal channels, payroll will stay fragile no matter how good the spreadsheet or software looks on the surface.",
          "The next layer is approval discipline. A business needs to know who can request a change, who approves it, when it becomes effective, and where that decision is recorded. That single improvement often removes more payroll risk than chasing new formulas or reporting layouts.",
        ],
      },
      {
        heading: "What software should handle",
        paragraphs: [
          "Software should not just calculate. It should create a clean operating path: maintain employee records, capture leave, route changes for approval, flag exceptions, and preserve an audit trail when something changes after the cut-off.",
          "For Zimbabwean teams, that also means supporting the statutory workflow around ZIMRA and NSSA readiness. The exact tax logic matters, but the operating model around it matters just as much. A business needs confidence that payroll inputs are complete before the run starts.",
        ],
      },
      {
        heading: "What growing businesses should avoid",
        paragraphs: [
          "Do not buy an oversized HR suite just because payroll has become inconvenient. Many teams need better operating discipline and a clearer payroll workspace, not a giant platform that introduces extra complexity before the basics are under control.",
          "A strong first step is software that makes the monthly run cleaner, keeps employee records current, and reduces exception handling. Once that foundation is stable, the business can extend into broader HR workflows, analytics, and management reporting.",
        ],
      },
    ],
  },
  {
    slug: "simple-crm-for-owner-led-sales-teams",
    title: "A simple CRM setup for owner-led sales teams",
    category: "CRM",
    description:
      "How to move customer follow-up out of scattered chat threads and into one disciplined process.",
    excerpt:
      "If the founder still knows the pipeline better than the system does, the business has a sales visibility problem. This guide explains the simplest CRM setup that fixes that without adding unnecessary process debt.",
    publishedOn: "2026-04-06",
    readTime: "5 min read",
    keywords: [
      "CRM for small business Africa",
      "sales pipeline software Zimbabwe",
      "owner led CRM process",
      "WhatsApp CRM workflow",
    ],
    sections: [
      {
        heading: "The real issue is not missing software",
        paragraphs: [
          "Owner-led sales teams often assume they need a CRM when the real issue is follow-up discipline. Leads arrive through WhatsApp, referrals, email, and calls. Quotations get sent, but nobody consistently records the next step, expected decision date, or account status.",
          "That means the founder becomes the reporting layer. They remember which lead is serious, which customer needs a follow-up, and which proposal is stuck. The business then looks busier than it is because activity is high but visibility is low.",
        ],
      },
      {
        heading: "The minimum CRM structure that works",
        paragraphs: [
          "A useful CRM for this kind of team does four things well: stores clean customer records, tracks pipeline stage, assigns an owner, and forces a next action. Without those four, the business still relies on memory.",
          "Everything else is secondary at the start. Fancy automations and deep dashboards can come later. The first win is simple: nobody should finish a customer interaction without the system showing what happens next and who owns it.",
        ],
      },
      {
        heading: "Why WhatsApp and phone habits matter",
        paragraphs: [
          "In Zimbabwe and across much of the region, customer relationships do not live in web forms alone. Sales activity often happens in voice notes, calls, and WhatsApp conversations. A CRM that ignores that operating reality will be underused immediately.",
          "The right setup respects the channel mix. Teams should be able to log calls, record customer context, and create follow-up tasks quickly enough that the system supports the habit instead of slowing it down.",
        ],
      },
      {
        heading: "When to add reporting and automation",
        paragraphs: [
          "Once the pipeline is being updated consistently, reporting becomes useful. Leaders can see stage conversion, dormant accounts, late follow-ups, and which deals have gone quiet without being chased manually.",
          "Automation only becomes valuable once the team is already using the workflow. At that point, reminders, quote follow-up prompts, and reporting summaries start saving time instead of automating confusion.",
        ],
      },
    ],
  },
  {
    slug: "where-automation-actually-saves-admin-time",
    title: "Where automation actually saves admin time",
    category: "Operations",
    description:
      "The workflows most worth automating first, and the traps that create brittle process debt.",
    excerpt:
      "Automation is most valuable when it removes repeated friction from an already understood workflow. This guide explains where to start and where businesses usually waste effort.",
    publishedOn: "2026-04-06",
    readTime: "6 min read",
    keywords: [
      "workflow automation Africa",
      "business automation Zimbabwe",
      "admin process automation",
      "operations automation systems",
    ],
    sections: [
      {
        heading: "Automation works best on repeated friction",
        paragraphs: [
          "The best automation targets are usually not dramatic. They are repeated administrative steps that slow people down every week: routing approvals, moving information between systems, sending reminders, assembling routine reports, or updating status after a trigger event.",
          "When those steps are clear, automation saves time quickly. When the workflow is still ambiguous, automation just hard-codes the confusion and makes future changes harder.",
        ],
      },
      {
        heading: "Three workflows that usually pay back first",
        paragraphs: [
          "Approval routing is often the fastest win. If requests arrive through chat or email and nobody is sure whose turn it is, software can create immediate visibility and remove a large amount of back-and-forth.",
          "The next strong candidates are data handoffs and recurring reporting. If staff repeatedly copy the same information between systems or rebuild the same status view every week, that is the kind of work automation should take over.",
        ],
      },
      {
        heading: "What creates brittle process debt",
        paragraphs: [
          "The biggest mistake is automating before the business agrees on the rule. If the team still debates who approves what, what counts as complete, or which exceptions are allowed, the automation will keep breaking because the process itself is unsettled.",
          "Another common mistake is building silent automation with no reporting. If an automated step fails and nobody can see it, the business ends up with more operational risk than before. Visibility and fallback paths are part of the solution, not optional extras.",
        ],
      },
      {
        heading: "How to choose the first automation project",
        paragraphs: [
          "Choose the workflow that is both frequent and already understood. It should involve enough repetition to matter, enough structure to automate, and enough pain that the team will notice the improvement quickly.",
          "That usually means starting small, proving the value, and then extending into adjacent steps. Businesses get far better returns from one well-designed operational workflow than from ten scattered automations nobody fully owns.",
        ],
      },
    ],
  },
  {
    slug: "ai-tools-african-businesses-can-actually-use",
    title: "AI tools African businesses can actually use",
    category: "Applied AI",
    description:
      "A grounded look at copilots, classification, voice workflows, and agentic systems with business value.",
    excerpt:
      "Most businesses do not need AI for everything. They need it where it improves speed, quality, or visibility inside a real workflow. This article explains where AI tends to earn its place.",
    publishedOn: "2026-04-06",
    readTime: "7 min read",
    keywords: [
      "AI tools for African business",
      "applied AI Zimbabwe",
      "agentic systems operations",
      "voice automation business",
    ],
    sections: [
      {
        heading: "The useful question is not whether to use AI",
        paragraphs: [
          "The useful question is where AI improves a workflow enough to justify the complexity. For most businesses, the best applications are narrow and practical: summarising information, classifying records, drafting structured outputs, supporting decisions, or handling first-line intake before a human steps in.",
          "That is very different from buying into a vague story about transformation. AI has to earn its place by reducing friction or improving response quality in work that already matters.",
        ],
      },
      {
        heading: "Copilots, classification, and guided support",
        paragraphs: [
          "A strong starting point is internal support. Teams often lose time searching for policies, summarising notes, or turning raw information into a usable answer. A well-scoped copilot can make that faster without pretending to replace decision-makers.",
          "Classification is another practical use case. If the business handles large volumes of documents, requests, or incoming messages, AI can help sort and route work before staff take over. That kind of support is usually easier to govern than fully autonomous actions.",
        ],
      },
      {
        heading: "Where voice and agents start to matter",
        paragraphs: [
          "Voice workflows become valuable when speed matters at the first point of contact. Intake, routing, support triage, and scheduling are all strong candidates if the business already understands the handoff between automated and human handling.",
          "Agentic systems become useful when software needs to work across tools, approvals, and bounded tasks. The important word is bounded. Agents should operate inside clear task definitions, approval rules, and reporting paths, especially where customers, payroll, finance, or compliance are involved.",
        ],
      },
      {
        heading: "What responsible rollout looks like",
        paragraphs: [
          "The businesses getting value from AI do not treat governance as optional. They define where AI can act, where humans must approve, how quality is evaluated, and what happens when the system is uncertain or fails.",
          "That is why the best AI work today still looks like disciplined systems design. It is not about adding a model everywhere. It is about placing intelligence where the business already has a defined workflow and a measurable reason to improve it.",
        ],
      },
    ],
  },
];
