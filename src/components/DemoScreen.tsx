import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Boxes,
  CreditCard,
  FolderKanban,
  Sparkles,
  Workflow,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoFeature } from "./DemoFeatureMenu";

type DemoScreenProps = {
  feature: DemoFeature;
};

type DemoRow = {
  title: string;
  detail: string;
  status: string;
  tone?: "default" | "positive" | "warning";
};

type DemoSignal = {
  label: string;
  value: string;
  strength: number;
};

type DemoInsight = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
};

type DemoContent = {
  title: string;
  description: string;
  navLabel: string;
  panels: { label: string; value: string; detail?: string }[];
  rows: DemoRow[];
  signals: DemoSignal[];
  insight: DemoInsight;
};

const iconMap: Record<DemoFeature["screen"], typeof Bot> = {
  crm: Users,
  hr: FolderKanban,
  finance: CreditCard,
  inventory: Boxes,
  projects: Workflow,
  automation: Sparkles,
  analytics: BarChart3,
  ai: Bot,
};

const screenContent: Record<DemoFeature["screen"], DemoContent> = {
  crm: {
    title: "Customer Management",
    description: "Keep leads, customers, and follow-ups in one operating view.",
    navLabel: "Sales workspace",
    panels: [
      { label: "Open pipeline", value: "$124k", detail: "Across current qualified opportunities" },
      { label: "Follow-ups due", value: "18", detail: "Calls, quotes, and renewal reminders" },
      { label: "Renewals", value: "07", detail: "Accounts needing attention this week" },
    ],
    rows: [
      {
        title: "Harare Distributors",
        detail: "Proposal submitted and commercial review booked for Thursday.",
        status: "Proposal sent",
        tone: "positive",
      },
      {
        title: "BlueStone Services",
        detail: "Waiting on updated pricing before the next follow-up call.",
        status: "Follow up today",
        tone: "warning",
      },
      {
        title: "Nora Health",
        detail: "Decision makers confirmed for the discovery session next week.",
        status: "Discovery booked",
      },
    ],
    signals: [
      { label: "Deal velocity", value: "+12%", strength: 82 },
      { label: "Response time", value: "2.1 hrs", strength: 68 },
      { label: "Coverage", value: "91%", strength: 91 },
    ],
    insight: {
      eyebrow: "Sales signal",
      title: "The team can see what needs attention next.",
      body:
        "The CRM surface is designed to make ownership, next action, and deal risk obvious without a sales manager rebuilding the picture by hand.",
      bullets: [
        "Pipeline stage and next step stay connected",
        "Customer context survives team handoffs",
        "Dormant accounts are easy to spot early",
      ],
    },
  },
  hr: {
    title: "HR & Payroll",
    description: "Keep staff records, leave, and payroll workflows clean and auditable.",
    navLabel: "People operations",
    panels: [
      { label: "Employees", value: "312", detail: "Active staff records across the team" },
      { label: "Leave requests", value: "09", detail: "Pending manager approval today" },
      { label: "Payroll status", value: "Ready", detail: "Final checks still visible before export" },
    ],
    rows: [
      {
        title: "Payroll review",
        detail: "Two allowance changes still need finance sign-off before cutoff.",
        status: "2 exceptions",
        tone: "warning",
      },
      {
        title: "NSSA file",
        detail: "Prepared and waiting for submission in the current cycle.",
        status: "Prepared",
        tone: "positive",
      },
      {
        title: "Bank export",
        detail: "Payroll batch is queued once final approvals are cleared.",
        status: "Queued",
      },
    ],
    signals: [
      { label: "Leave balance sync", value: "98%", strength: 88 },
      { label: "Payroll confidence", value: "High", strength: 92 },
      { label: "Approval lag", value: "1.3 days", strength: 61 },
    ],
    insight: {
      eyebrow: "Operations note",
      title: "Payroll becomes a workflow, not a monthly scramble.",
      body:
        "The platform keeps records, approvals, and statutory prep visible early enough for the team to fix issues before they become payroll errors.",
      bullets: [
        "Audit trail on changes and approvals",
        "Local payroll realities remain visible",
        "Management gets a clean operating picture",
      ],
    },
  },
  finance: {
    title: "Finance & Invoices",
    description: "Track revenue, invoice health, and collections in one financial view.",
    navLabel: "Finance workspace",
    panels: [
      { label: "Revenue", value: "$48.2k", detail: "Current month recognised revenue" },
      { label: "Overdue", value: "$6.4k", detail: "Invoices needing collection work" },
      { label: "Margin", value: "29%", detail: "Blended operating margin this month" },
    ],
    rows: [
      {
        title: "Northgate Trading",
        detail: "Latest invoice batch cleared and reconciled this morning.",
        status: "Paid today",
        tone: "positive",
      },
      {
        title: "Harare Office",
        detail: "Collections call is overdue and payment terms need review.",
        status: "Overdue 12 days",
        tone: "warning",
      },
      {
        title: "Collections view",
        detail: "Aging buckets and account priorities are ready for finance review.",
        status: "Improving",
      },
    ],
    signals: [
      { label: "Collection rate", value: "86%", strength: 86 },
      { label: "Invoice accuracy", value: "99%", strength: 95 },
      { label: "Cash visibility", value: "Strong", strength: 84 },
    ],
    insight: {
      eyebrow: "Finance signal",
      title: "Cash movement is easier to manage when the risk is visible.",
      body:
        "Instead of finance information living in disconnected sheets, the platform surfaces overdue exposure, revenue movement, and collection priorities in one place.",
      bullets: [
        "Invoice status is visible without manual chasing",
        "Collections can be prioritised by risk",
        "Financial reporting stays grounded in current operations",
      ],
    },
  },
  inventory: {
    title: "Inventory",
    description: "Track stock, reorder pressure, and purchasing signals before shortages hit.",
    navLabel: "Inventory workspace",
    panels: [
      { label: "Items tracked", value: "468", detail: "Products and consumables in the system" },
      { label: "Low stock", value: "11", detail: "Items now below target thresholds" },
      { label: "Reorders", value: "05", detail: "Purchase actions ready for review" },
    ],
    rows: [
      {
        title: "Paper stock",
        detail: "Central warehouse quantity has dropped under the reorder threshold.",
        status: "Low",
        tone: "warning",
      },
      {
        title: "Toners",
        detail: "Replenishment has been queued with the preferred supplier.",
        status: "Reorder queued",
        tone: "positive",
      },
      {
        title: "Hardware",
        detail: "Current stock levels are healthy across the next two weeks.",
        status: "In stock",
      },
    ],
    signals: [
      { label: "Stock accuracy", value: "94%", strength: 90 },
      { label: "Days cover", value: "23 days", strength: 72 },
      { label: "Supplier pace", value: "Stable", strength: 79 },
    ],
    insight: {
      eyebrow: "Supply signal",
      title: "The team sees shortages before they disrupt delivery.",
      body:
        "Inventory visibility matters most when it influences purchasing decisions early. The workspace shows low-stock pressure, reorder actions, and product coverage clearly.",
      bullets: [
        "Low stock is highlighted before it becomes urgent",
        "Purchasing actions stay connected to stock levels",
        "Managers get a clean view of operational risk",
      ],
    },
  },
  projects: {
    title: "Projects & Tasks",
    description: "Turn plans into accountable work with owners, milestones, and status visibility.",
    navLabel: "Delivery workspace",
    panels: [
      { label: "Projects", value: "24", detail: "Active delivery and internal initiatives" },
      { label: "Blocked", value: "07", detail: "Items waiting on decisions or approvals" },
      { label: "Due this week", value: "31", detail: "Tasks and milestones on the near horizon" },
    ],
    rows: [
      {
        title: "Implementation rollout",
        detail: "Vendor approval is still pending before the next execution step.",
        status: "At risk",
        tone: "warning",
      },
      {
        title: "Training rollout",
        detail: "Session scheduling and owner assignments are in good shape.",
        status: "On track",
        tone: "positive",
      },
      {
        title: "Client handoff",
        detail: "Final sign-off and documentation review are queued for tomorrow.",
        status: "Awaiting sign-off",
      },
    ],
    signals: [
      { label: "Milestone health", value: "84%", strength: 84 },
      { label: "Task ownership", value: "96%", strength: 93 },
      { label: "Blocker age", value: "2.4 days", strength: 58 },
    ],
    insight: {
      eyebrow: "Delivery signal",
      title: "The workspace makes execution risk visible quickly.",
      body:
        "Project surfaces should not feel like static task lists. They should show where approvals are stuck, what is at risk, and which owner needs to move next.",
      bullets: [
        "Blockers surface clearly without manual reporting",
        "Teams know what is waiting and who owns it",
        "Status reviews become faster and more accurate",
      ],
    },
  },
  automation: {
    title: "Automation",
    description: "Route approvals, reminders, and reporting actions through dependable workflow logic.",
    navLabel: "Workflow automation",
    panels: [
      { label: "Automations", value: "12", detail: "Active flows running inside the business" },
      { label: "Hours saved", value: "14/wk", detail: "Recovered from repetitive admin work" },
      { label: "Success rate", value: "99.2%", detail: "Current execution quality across workflows" },
    ],
    rows: [
      {
        title: "Approval routes",
        detail: "Operational approvals are moving through defined owners and fallback logic.",
        status: "Live",
        tone: "positive",
      },
      {
        title: "Escalations",
        detail: "Two exceptions still require human review to close safely.",
        status: "2 pending",
        tone: "warning",
      },
      {
        title: "Daily summary",
        detail: "Reporting digest delivered successfully to the operating team.",
        status: "Delivered",
      },
    ],
    signals: [
      { label: "Automation uptime", value: "99.7%", strength: 97 },
      { label: "Fallback coverage", value: "Strong", strength: 89 },
      { label: "Manual handoffs", value: "Low", strength: 81 },
    ],
    insight: {
      eyebrow: "Automation note",
      title: "Automation stays governed, visible, and operationally safe.",
      body:
        "The point is not hidden automation for its own sake. The point is dependable workflow movement with clear reporting, approvals, and fallback when risk matters.",
      bullets: [
        "Approvals and rules remain explicit",
        "Failures are visible instead of silent",
        "Teams save time without losing control",
      ],
    },
  },
  analytics: {
    title: "Analytics",
    description: "Turn operational data into simple dashboards and decision signals.",
    navLabel: "Analytics workspace",
    panels: [
      { label: "Revenue trend", value: "+18%", detail: "Current performance against the prior period" },
      { label: "Cash alerts", value: "02", detail: "Signals requiring immediate review" },
      { label: "Ops score", value: "91/100", detail: "Composite operational health indicator" },
    ],
    rows: [
      {
        title: "Low margin warning",
        detail: "One delivery line is now trending below the planned threshold.",
        status: "Active",
        tone: "warning",
      },
      {
        title: "Sales summary",
        detail: "Management digest published and ready for morning review.",
        status: "Published",
        tone: "positive",
      },
      {
        title: "Executive digest",
        detail: "Next automated reporting cycle is scheduled for tomorrow morning.",
        status: "8am tomorrow",
      },
    ],
    signals: [
      { label: "Decision speed", value: "+23%", strength: 88 },
      { label: "Report freshness", value: "Daily", strength: 85 },
      { label: "Signal quality", value: "High", strength: 92 },
    ],
    insight: {
      eyebrow: "Analytics note",
      title: "Managers should see the story, not just raw charts.",
      body:
        "The analytics layer connects reporting to operational questions that matter now, so dashboards become decision tools rather than passive displays.",
      bullets: [
        "Signals can be reviewed quickly in leadership meetings",
        "Alerts surface risk before it becomes expensive",
        "Reporting stays tied to business action",
      ],
    },
  },
  ai: {
    title: "AI Assistant",
    description: "Ask questions about the business and get structured answers with evidence.",
    navLabel: "AI workspace",
    panels: [
      { label: "Queries", value: "3", detail: "Example questions available in the current view" },
      { label: "Sources", value: "Connected", detail: "Data layer linked to the assistant surface" },
      { label: "Confidence", value: "High", detail: "Based on the current source coverage" },
    ],
    rows: [
      {
        title: "Best selling products",
        detail: "Assistant can rank product performance against the prior period.",
        status: "Ready",
        tone: "positive",
      },
      {
        title: "Overdue invoices",
        detail: "Collections exposure is available for instant review.",
        status: "8 found",
        tone: "warning",
      },
      {
        title: "Top customers",
        detail: "Revenue ranking can be surfaced across the current month.",
        status: "Ranked list",
      },
    ],
    signals: [
      { label: "Source coverage", value: "87%", strength: 87 },
      { label: "Answer quality", value: "Strong", strength: 90 },
      { label: "Escalation path", value: "Defined", strength: 84 },
    ],
    insight: {
      eyebrow: "Assistant response",
      title: "The AI layer answers business questions inside a governed workflow.",
      body:
        "The assistant is useful when it is connected to real data, bounded by approvals, and clear about what it knows versus what still needs human review.",
      bullets: [
        "Query business data in plain language",
        "Keep source context visible to the team",
        "Escalate uncertain actions instead of guessing",
      ],
    },
  },
};

const statusToneClass: Record<NonNullable<DemoRow["tone"]>, string> = {
  default: "border-white/10 bg-white/[0.04] text-white/80",
  positive: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/20 bg-amber-400/10 text-amber-200",
};

const shellTabs = ["Overview", "Activity", "Signals"];

const DemoScreen = ({ feature }: DemoScreenProps) => {
  const content = screenContent[feature.screen];
  const Icon = iconMap[feature.screen];

  return (
    <div className="rounded-[1.75rem] border border-border/40 bg-slate-950/90 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.38)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.screen}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[1.3rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-primary/70">
                Live Preview
              </p>
              <h3 className="mt-1 text-base font-medium tracking-[0.04em] text-white">
                {content.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/55 sm:block">
                {content.navLabel}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Icon className="h-4.5 w-4.5 text-white/80" />
              </div>
            </div>
          </div>

          <div className="p-4 md:p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              {shellTabs.map((tab, index) => (
                <div
                  key={tab}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em]",
                    index === 0
                      ? "border-primary/20 bg-primary/10 text-primary/80"
                      : "border-white/10 bg-white/[0.03] text-white/45"
                  )}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)]">
              <aside className="space-y-4">
                <motion.div
                  layout
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/45">
                    Summary
                  </p>
                  <p className="mt-3 text-[0.95rem] font-light leading-7 text-white/78">
                    {content.description}
                  </p>
                </motion.div>

                <div className="space-y-3">
                  {content.panels.map((panel, index) => (
                    <motion.div
                      key={panel.label}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: index * 0.05 }}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                    >
                      <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/45">
                        {panel.label}
                      </p>
                      <p className="mt-3 text-4xl font-light tracking-[-0.03em] text-white">
                        {panel.value}
                      </p>
                      {panel.detail ? (
                        <p className="mt-2 text-xs font-light leading-5 text-white/45">
                          {panel.detail}
                        </p>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </aside>

              <div className="space-y-4">
                <motion.div
                  layout
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/45">
                        Workspace
                      </p>
                      <p className="mt-1 text-sm font-light text-white/45">
                        Current operational view
                      </p>
                    </div>
                    <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-primary/80">
                      Active
                    </span>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_minmax(250px,0.88fr)]">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/45">
                          Activity board
                        </p>
                        <span className="text-xs font-light text-white/35">Updated today</span>
                      </div>

                      <div className="space-y-3">
                        {content.rows.map((row, index) => (
                          <motion.div
                            key={row.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.05 }}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0">
                                <p className="text-base font-medium text-white">{row.title}</p>
                                <p className="mt-1 text-sm font-light leading-6 text-white/55">
                                  {row.detail}
                                </p>
                              </div>
                              <span
                                className={cn(
                                  "inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.14em]",
                                  statusToneClass[row.tone ?? "default"]
                                )}
                              >
                                {row.status}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {feature.screen === "ai" ? (
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/45">
                            Example queries
                          </p>
                          <div className="mt-4 space-y-3">
                            {[
                              "What were our best selling products last month?",
                              "Which invoices are overdue?",
                              "Which customers generated the most revenue?",
                            ].map((query, index) => (
                              <motion.div
                                key={query}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.06 }}
                                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm font-light leading-6 text-white/72"
                              >
                                {query}
                              </motion.div>
                            ))}
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.24, delay: 0.18 }}
                              className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-4"
                            >
                              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/75">
                                Simulated answer
                              </p>
                              <p className="mt-2 text-sm font-light leading-6 text-white/82">
                                Last month, three repeat clients generated the highest revenue. Two invoice batches are overdue, and the leading account is 14% ahead of the next tier.
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22 }}
                          className="rounded-2xl border border-white/10 bg-black/20 p-4"
                        >
                          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/45">
                            {content.insight.eyebrow}
                          </p>
                          <h4 className="mt-2 text-lg font-medium leading-tight text-white">
                            {content.insight.title}
                          </h4>
                          <p className="mt-3 text-sm font-light leading-6 text-white/62">
                            {content.insight.body}
                          </p>
                          <div className="mt-4 space-y-2">
                            {content.insight.bullets.map((item) => (
                              <div
                                key={item}
                                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm font-light leading-6 text-white/70"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/45">
                          Signals
                        </p>
                        <div className="mt-4 space-y-3">
                          {content.signals.map((signal, index) => (
                            <motion.div
                              key={signal.label}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.22, delay: index * 0.04 }}
                            >
                              <div className="mb-2 flex items-center justify-between gap-3">
                                <span className="text-sm font-light text-white/62">
                                  {signal.label}
                                </span>
                                <span className="text-sm font-medium text-white/88">
                                  {signal.value}
                                </span>
                              </div>
                              <div className="h-2 rounded-full bg-white/[0.05]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${signal.strength}%` }}
                                  transition={{ duration: 0.45, delay: 0.06 + index * 0.05 }}
                                  className="h-full rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/55"
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(DemoScreen);
