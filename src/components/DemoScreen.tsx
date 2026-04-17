import { memo } from "react";
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

type DemoContent = {
  title: string;
  description: string;
  navLabel: string;
  panels: { label: string; value: string; detail?: string }[];
  rows: DemoRow[];
  insight: {
    title: string;
    body: string;
  };
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
      { label: "Open pipeline", value: "$124k", detail: "Current qualified opportunities" },
      { label: "Follow-ups due", value: "18", detail: "Calls, quotes, and renewals" },
      { label: "Renewals", value: "07", detail: "Accounts needing attention" },
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
    insight: {
      title: "The team can see what needs attention next.",
      body:
        "The CRM view makes ownership, next action, and deal risk obvious without someone rebuilding the picture by hand.",
    },
  },
  hr: {
    title: "HR & Payroll",
    description: "Keep staff records, leave, and payroll workflows clean and auditable.",
    navLabel: "People operations",
    panels: [
      { label: "Employees", value: "312", detail: "Active staff records" },
      { label: "Leave requests", value: "09", detail: "Pending approval today" },
      { label: "Payroll status", value: "Ready", detail: "Final checks still visible" },
    ],
    rows: [
      {
        title: "Payroll review",
        detail: "Two allowance changes still need finance sign-off.",
        status: "2 exceptions",
        tone: "warning",
      },
      {
        title: "NSSA file",
        detail: "Prepared and waiting for submission this cycle.",
        status: "Prepared",
        tone: "positive",
      },
      {
        title: "Bank export",
        detail: "Payroll batch is queued once approvals clear.",
        status: "Queued",
      },
    ],
    insight: {
      title: "Payroll becomes a workflow, not a monthly scramble.",
      body:
        "Records, approvals, and statutory prep stay visible early enough to resolve issues before payroll errors appear.",
    },
  },
  finance: {
    title: "Finance & Invoices",
    description: "Track revenue, invoice health, and collections in one financial view.",
    navLabel: "Finance workspace",
    panels: [
      { label: "Revenue", value: "$48.2k", detail: "Current month recognised revenue" },
      { label: "Overdue", value: "$6.4k", detail: "Invoices needing collection work" },
      { label: "Margin", value: "29%", detail: "Operating margin this month" },
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
        detail: "Aging buckets and account priorities are ready for review.",
        status: "Improving",
      },
    ],
    insight: {
      title: "Cash movement is easier to manage when the risk is visible.",
      body:
        "Overdue exposure, revenue movement, and collection priorities stay in one place instead of being spread across disconnected sheets.",
    },
  },
  inventory: {
    title: "Inventory",
    description: "Track stock, reorder pressure, and purchasing signals before shortages hit.",
    navLabel: "Inventory workspace",
    panels: [
      { label: "Items tracked", value: "468", detail: "Products and consumables in system" },
      { label: "Low stock", value: "11", detail: "Below target thresholds" },
      { label: "Reorders", value: "05", detail: "Purchase actions ready" },
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
    insight: {
      title: "The team sees shortages before they disrupt delivery.",
      body:
        "Low-stock pressure, reorder actions, and product coverage stay readable enough to influence purchasing decisions early.",
    },
  },
  projects: {
    title: "Projects & Tasks",
    description: "Turn plans into accountable work with owners, milestones, and status visibility.",
    navLabel: "Delivery workspace",
    panels: [
      { label: "Projects", value: "24", detail: "Active delivery initiatives" },
      { label: "Blocked", value: "07", detail: "Waiting on decisions or approvals" },
      { label: "Due this week", value: "31", detail: "Tasks on the near horizon" },
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
    insight: {
      title: "Execution risk becomes visible much faster.",
      body:
        "The workspace shows where approvals are stuck, what is at risk, and which owner needs to move next.",
    },
  },
  automation: {
    title: "Automation",
    description: "Route approvals, reminders, and reporting actions through dependable workflow logic.",
    navLabel: "Workflow automation",
    panels: [
      { label: "Automations", value: "12", detail: "Active flows running" },
      { label: "Hours saved", value: "14/wk", detail: "Recovered from repetitive work" },
      { label: "Success rate", value: "99.2%", detail: "Execution quality across workflows" },
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
    insight: {
      title: "Automation stays governed, visible, and operationally safe.",
      body:
        "Workflow movement stays clear enough to save time without turning failures or approvals into hidden behavior.",
    },
  },
  analytics: {
    title: "Analytics",
    description: "Turn operational data into simple dashboards and decision signals.",
    navLabel: "Analytics workspace",
    panels: [
      { label: "Revenue trend", value: "+18%", detail: "Against the prior period" },
      { label: "Cash alerts", value: "02", detail: "Require immediate review" },
      { label: "Ops score", value: "91/100", detail: "Operational health indicator" },
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
    insight: {
      title: "Managers should see the story, not just raw charts.",
      body:
        "The analytics layer connects reporting to operational questions that matter now, so dashboards become decision tools rather than passive displays.",
    },
  },
  ai: {
    title: "AI Assistant",
    description: "Ask questions about the business and get structured answers with evidence.",
    navLabel: "AI workspace",
    panels: [
      { label: "Queries", value: "3", detail: "Example questions in the current view" },
      { label: "Sources", value: "Connected", detail: "Data layer linked to assistant" },
      { label: "Confidence", value: "High", detail: "Based on current source coverage" },
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
    insight: {
      title: "The AI layer answers business questions inside a governed workflow.",
      body:
        "The assistant is useful when it is connected to real data, bounded by approvals, and clear about what it knows.",
    },
  },
};

const statusToneClass: Record<NonNullable<DemoRow["tone"]>, string> = {
  default: "text-foreground/80",
  positive: "text-emerald-500",
  warning: "text-amber-500",
};

const DemoScreen = ({ feature }: DemoScreenProps) => {
  const content = screenContent[feature.screen];
  const Icon = iconMap[feature.screen];
  const visibleRows = content.rows.slice(0, 2);

  return (
    <div className="overflow-hidden rounded-[1.3rem] border border-border/60 bg-gradient-to-b from-background/65 to-card/80 shadow-[0_28px_100px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-4 md:px-5">
        <div>
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-primary/70">
            Preview
          </p>
          <h3 className="mt-1 text-xl font-medium tracking-[0.01em] text-foreground md:text-[1.6rem]">
            {content.title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-sm font-light text-muted-foreground sm:block">
            {content.navLabel}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70">
            <Icon className="h-4 w-4 text-foreground/80" />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <p className="max-w-2xl text-sm font-light leading-7 text-muted-foreground md:text-base">
          {content.description}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {content.panels.map((panel) => (
            <div
              key={panel.label}
              className="rounded-2xl border border-border/60 bg-background/62 px-4 py-4"
            >
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                {panel.label}
              </p>
              <p className="mt-3 text-[2rem] font-light tracking-[-0.04em] text-foreground">
                {panel.value}
              </p>
              {panel.detail ? (
                <p className="mt-1.5 text-sm font-light leading-6 text-muted-foreground">
                  {panel.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]">
          <div className="rounded-2xl border border-border/60 bg-secondary/28 p-5">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-primary/72">
              Why it stays clear
            </p>
            <h4 className="mt-3 text-lg font-medium leading-tight text-foreground">
              {content.insight.title}
            </h4>
            <p className="mt-3 text-sm font-light leading-7 text-muted-foreground">
              {content.insight.body}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/62 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                Recent activity
              </p>
              <p className="text-xs font-light text-muted-foreground/70">2 items</p>
            </div>

            <div className="mt-4 space-y-3">
              {visibleRows.map((row) => (
                <div
                  key={row.title}
                  className="rounded-2xl border border-border/60 bg-background/70 p-4"
                >
                  <div className="min-w-0">
                    <p className="text-base font-medium text-foreground">{row.title}</p>
                    <p className="mt-1.5 text-sm font-light leading-6 text-muted-foreground">
                      {row.detail}
                    </p>
                    <p className="mt-3 text-sm font-light text-muted-foreground">
                      Status:{" "}
                      <span className={cn("font-medium", statusToneClass[row.tone ?? "default"])}>
                        {row.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DemoScreen);
