import type { ReactNode } from "react";
import { BarChart3, Brain, TrendingUp, Workflow, Zap } from "lucide-react";

export interface Intent {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
}

export const INTENTS: Intent[] = [
  {
    id: "reduce-manual-work",
    label: "Reduce manual work",
    description: "Eliminate repetitive tasks and reclaim your team's time.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "improve-visibility",
    label: "Improve visibility",
    description: "Get real-time insight into sales, people, and operations.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: "scale-operations",
    label: "Scale operations",
    description: "Build the infrastructure to grow without operational chaos.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "automate-workflows",
    label: "Automate workflows",
    description: "Turn manual processes into reliable automated pipelines.",
    icon: <Workflow className="w-6 h-6" />,
  },
  {
    id: "enhance-decisions",
    label: "Enhance decision-making",
    description: "Give leadership the data and AI tools to act with confidence.",
    icon: <Brain className="w-6 h-6" />,
  },
];
