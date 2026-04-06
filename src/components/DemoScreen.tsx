import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, BarChart3, Boxes, CreditCard, FolderKanban, Sparkles, Workflow, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoFeature } from "./DemoFeatureMenu";

type DemoScreenProps = {
  feature: DemoFeature;
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

const screenContent: Record<
  DemoFeature["screen"],
  {
    title: string;
    description: string;
    panels: { label: string; value: string; detail?: string }[];
    rows: { left: string; right: string; tone?: "default" | "positive" | "warning" }[];
  }
> = {
  crm: {
    title: "Customer Management",
    description: "Keep leads, accounts, and follow-ups in one workspace.",
    panels: [
      { label: "Pipeline", value: "$124k" },
      { label: "Follow-ups due", value: "18" },
      { label: "Renewals", value: "07" },
    ],
    rows: [
      { left: "Harare Distributors", right: "Proposal sent", tone: "positive" },
      { left: "BlueStone Services", right: "Follow up today", tone: "warning" },
      { left: "Nora Health", right: "Discovery booked" },
    ],
  },
  hr: {
    title: "Employee & Payroll",
    description: "Organize staff records, leave, and payroll checks without spreadsheet drift.",
    panels: [
      { label: "Employees", value: "312" },
      { label: "Leave requests", value: "09" },
      { label: "Payroll", value: "Ready" },
    ],
    rows: [
      { left: "Payroll review", right: "2 exceptions", tone: "warning" },
      { left: "NSSA file", right: "Prepared", tone: "positive" },
      { left: "Bank export", right: "Queued" },
    ],
  },
  finance: {
    title: "Finance & Invoices",
    description: "See revenue, overdue invoices, and collections without rebuilding reports manually.",
    panels: [
      { label: "Revenue", value: "$48.2k" },
      { label: "Overdue", value: "$6.4k" },
      { label: "Margin", value: "29%" },
    ],
    rows: [
      { left: "Northgate Trading", right: "Paid today", tone: "positive" },
      { left: "Harare Office", right: "Overdue 12 days", tone: "warning" },
      { left: "Collections", right: "Improving" },
    ],
  },
  inventory: {
    title: "Inventory",
    description: "Track stock, reorders, and purchase signals before shortages slow the business down.",
    panels: [
      { label: "Items tracked", value: "468" },
      { label: "Low stock", value: "11" },
      { label: "Reorders", value: "05" },
    ],
    rows: [
      { left: "Paper stock", right: "Low", tone: "warning" },
      { left: "Toners", right: "Reorder queued", tone: "positive" },
      { left: "Hardware", right: "In stock" },
    ],
  },
  projects: {
    title: "Projects & Tasks",
    description: "Turn plans into accountable work with owners, milestones, and status visibility.",
    panels: [
      { label: "Projects", value: "24" },
      { label: "Blocked", value: "07" },
      { label: "Due this week", value: "31" },
    ],
    rows: [
      { left: "Implementation", right: "At risk", tone: "warning" },
      { left: "Training rollout", right: "On track", tone: "positive" },
      { left: "Client handoff", right: "Awaiting sign-off" },
    ],
  },
  automation: {
    title: "Automation",
    description: "Route approvals, reminders, and reporting actions through dependable workflow logic.",
    panels: [
      { label: "Automations", value: "12" },
      { label: "Hours saved", value: "14/wk" },
      { label: "Success rate", value: "99.2%" },
    ],
    rows: [
      { left: "Approval routes", right: "Live", tone: "positive" },
      { left: "Escalations", right: "2 pending", tone: "warning" },
      { left: "Daily summary", right: "Delivered" },
    ],
  },
  analytics: {
    title: "Analytics",
    description: "Turn business data into simple dashboards and signals managers can actually use.",
    panels: [
      { label: "Revenue trend", value: "+18%" },
      { label: "Cash alerts", value: "02" },
      { label: "Ops score", value: "91/100" },
    ],
    rows: [
      { left: "Low margin warning", right: "Active", tone: "warning" },
      { left: "Sales summary", right: "Published", tone: "positive" },
      { left: "Executive digest", right: "8am tomorrow" },
    ],
  },
  ai: {
    title: "AI Assistant",
    description: "Ask questions about the business and get structured answers with evidence.",
    panels: [
      { label: "Queries", value: "3 examples" },
      { label: "Sources", value: "Connected" },
      { label: "Confidence", value: "High" },
    ],
    rows: [
      { left: "What were our best selling products last month?", right: "Shown below", tone: "positive" },
      { left: "Which invoices are overdue?", right: "8 found", tone: "warning" },
      { left: "Which customers generated the most revenue?", right: "Ranked list" },
    ],
  },
};

const DemoScreen = ({ feature }: DemoScreenProps) => {
  const content = screenContent[feature.screen];
  const Icon = iconMap[feature.screen];

  return (
    <div className="rounded-[1.75rem] border border-border/40 bg-slate-950/90 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.38)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.screen}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[1.3rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-primary/70">
                Live Preview
              </p>
              <h3 className="mt-1 font-display text-sm tracking-[0.18em] uppercase text-white">
                {content.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Icon className="h-4 w-4 text-white/80" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div className="space-y-4">
              <motion.div
                layout
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-[0.65rem] font-display tracking-[0.2em] uppercase text-white/55">
                  Summary
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/78">
                  {content.description}
                </p>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                {content.panels.map((panel, index) => (
                  <motion.div
                    key={panel.label}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: index * 0.04 }}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                  >
                    <p className="text-[0.6rem] font-display tracking-[0.18em] uppercase text-white/55">
                      {panel.label}
                    </p>
                    <p className="mt-2 text-2xl font-display text-white">
                      {panel.value}
                    </p>
                    {panel.detail ? (
                      <p className="mt-1 text-xs font-light text-white/55">{panel.detail}</p>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div layout className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[0.6rem] font-display tracking-[0.2em] uppercase text-white/55">
                  Workspace
                </p>
                <span className="text-[0.6rem] font-display tracking-[0.18em] uppercase text-primary/70">
                  Active
                </span>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[0.6rem] font-display tracking-[0.2em] uppercase text-white/55">
                      Activity table
                    </p>
                    <span className="text-xs font-light text-white/45">Today</span>
                  </div>
                  <div className="space-y-3">
                    {content.rows.map((row, index) => (
                      <motion.div
                        key={row.left}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.04 }}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3"
                      >
                        <span className="text-sm font-light text-white/78">{row.left}</span>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            row.tone === "positive"
                              ? "text-emerald-300"
                              : row.tone === "warning"
                                ? "text-amber-300"
                                : "text-white/85"
                          )}
                        >
                          {row.right}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[0.6rem] font-display tracking-[0.2em] uppercase text-white/55">
                    Response
                  </p>
                  <div className="mt-4 space-y-3">
                    {feature.screen === "ai" ? (
                      <>
                        {[
                          "What were our best selling products last month?",
                          "Which invoices are overdue?",
                          "Which customers generated the most revenue?",
                        ].map((query, index) => (
                          <motion.div
                            key={query}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.06 }}
                            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-light leading-relaxed text-white/72"
                          >
                            {query}
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.24, delay: 0.16 }}
                          className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-4"
                        >
                          <p className="text-[0.6rem] font-display tracking-[0.2em] uppercase text-primary/70">
                            Simulated answer
                          </p>
                          <p className="mt-2 text-sm font-light leading-relaxed text-white/82">
                            Last month, the highest revenue came from three repeat clients. Two invoice batches are overdue, and the top account is 14 percent ahead of the next tier.
                          </p>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm font-light leading-relaxed text-white/72"
                        >
                          {content.title} is now showing the current operational view.
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.24, delay: 0.08 }}
                          className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-4"
                        >
                          <p className="text-[0.6rem] font-display tracking-[0.2em] uppercase text-primary/70">
                            Status
                          </p>
                          <p className="mt-2 text-sm font-light leading-relaxed text-white/82">
                            The selected module is updating with a calm transition and a stable card layout.
                          </p>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(DemoScreen);
