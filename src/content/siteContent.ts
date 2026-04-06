import {
  BarChart3,
  Bot,
  Brain,
  Cpu,
  FolderKanban,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ProductMetric = {
  label: string;
  value: string;
};

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
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  audience: string;
  summary: string;
  problem: string;
  localFit: string;
  accent: string;
  icon: LucideIcon;
  metrics: ProductMetric[];
  panels: ProductPanel[];
  features: ProductFeature[];
  useCases: ProductUseCase[];
  proofPoints: string[];
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
    tagline: "Pipeline visibility, follow-up discipline, and customer history in one place.",
    audience: "Service businesses, distributors, and teams managing leads by phone, WhatsApp, and email.",
    summary:
      "A practical CRM for businesses that need better follow-up, cleaner customer records, and a clearer sales pipeline without enterprise software overhead.",
    problem:
      "Many growing teams lose context between first contact, quotation, delivery, and repeat business. Leads sit in inboxes, follow-ups depend on memory, and nobody has one trusted view of the account.",
    localFit:
      "Designed for teams that sell through relationships, referrals, phone calls, and WhatsApp, not only through web forms.",
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
    tagline: "Payroll, leave, and compliance workflows built for Zimbabwean operations.",
    audience: "Businesses that need fewer payroll errors, clearer staff records, and better compliance readiness.",
    summary:
      "An HR and payroll platform that keeps employee records, payroll runs, approvals, and statutory reporting aligned in one operating system.",
    problem:
      "Payroll and HR administration often live across spreadsheets, email threads, and ad hoc approvals. That makes errors more likely, slows reporting, and creates compliance exposure when the business grows.",
    localFit:
      "Built with practical Zimbabwean payroll realities in mind, including ZIMRA, NSSA, leave administration, and auditable staff records.",
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
    slug: "projects",
    name: "MathBrooks Projects",
    shortName: "Projects",
    category: "Business Platforms",
    tagline: "One operating view for delivery, approvals, and project health.",
    audience: "Teams running client work, internal delivery, field operations, or multi-step approvals.",
    summary:
      "A project operations platform for teams that need task visibility, delivery discipline, and a cleaner handoff between planning and execution.",
    problem:
      "Projects slip when responsibilities are unclear, approvals stall in chat threads, and management has no simple view of what is blocked, late, or at risk.",
    localFit:
      "Useful for agencies, professional services, implementation teams, and operational departments that coordinate work across chat, phone, and in-person decisions.",
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
    slug: "analytics",
    name: "MathBrooks Analytics",
    shortName: "Analytics",
    category: "Business Platforms",
    tagline: "Dashboards, alerts, and reporting shaped around real operating questions.",
    audience: "Leaders who need one place to understand sales, operations, workforce, or project performance.",
    summary:
      "A practical analytics layer that turns scattered operational data into dashboards, alerts, and management reporting that teams actually use.",
    problem:
      "Important numbers usually exist, but they live across different tools and manual reports. That means decisions are slower, meetings are less productive, and issues are discovered too late.",
    localFit:
      "Built for managers who need fast visibility across real operations, not a generic BI setup that requires a specialist to interpret every chart.",
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

export const productPricing = {
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
  ] satisfies PricingPlan[],
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
  ] satisfies PricingPlan[],
};

export const pricingNotes = [
  "Implementation, data migration, and custom integrations are scoped separately so product pricing stays clear.",
  "Billing can be monthly or annual in USD. Local bank transfer support can be arranged for Zimbabwean clients.",
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
