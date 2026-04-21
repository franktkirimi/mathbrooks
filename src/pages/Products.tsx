import { useReducer, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import { usePageMeta } from "@/hooks/usePageMeta";
import { NetworkBackground } from "@/components/products/NetworkBackground";
import { ProductPreviewStrip } from "@/components/products/ProductPreviewStrip";
import { SystemHero } from "@/components/products/SystemHero";
import { IntentSelector } from "@/components/products/IntentSelector";
import { ProductReveal } from "@/components/products/ProductReveal";
import { ProductDetailPanel } from "@/components/products/ProductDetailPanel";
import { DecisionCTA } from "@/components/products/DecisionCTA";
import type { ProductEntry } from "@/content/siteContent";
import WhatsAppWidget from "@/components/site/WhatsAppWidget";

// ─── State machine ────────────────────────────────────────────────────────────
type UIMode = "entry" | "selecting" | "revealing" | "detail" | "decision";

interface State {
  mode: UIMode;
  intentId: string | null;
  product: ProductEntry | null;
}

type Action =
  | { type: "BEGIN" }
  | { type: "SELECT_INTENT"; intentId: string }
  | { type: "SELECT_PRODUCT"; product: ProductEntry }
  | { type: "DECIDE" }
  | { type: "BACK_TO_INTENTS" }
  | { type: "BACK_TO_PRODUCTS" }
  | { type: "RESTART" };

const initial: State = { mode: "entry", intentId: null, product: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "BEGIN":           return { ...state, mode: "selecting" };
    case "SELECT_INTENT":   return { mode: "revealing", intentId: action.intentId, product: null };
    case "SELECT_PRODUCT":  return { ...state, mode: "detail", product: action.product };
    case "DECIDE":          return { ...state, mode: "decision" };
    case "BACK_TO_INTENTS": return { mode: "selecting", intentId: null, product: null };
    case "BACK_TO_PRODUCTS":return { ...state, mode: "revealing", product: null };
    case "RESTART":         return initial;
    default:                return state;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const Products = () => {
  usePageMeta({
    title: "Systems | MathBrooks",
    description: "Find and configure the right MathBrooks system for your operational needs.",
    canonicalPath: "/products",
  });

  const [state, dispatch] = useReducer(reducer, initial);
  const stageRef = useRef<HTMLDivElement>(null);

  // Cross-fade between phases
  const transition = useCallback((action: Action) => {
    gsap.to(stageRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        dispatch(action);
        gsap.to(stageRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" });
      },
    });
  }, []);

  // Fade in on mount
  useEffect(() => {
    gsap.fromTo(stageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <WhatsAppWidget />

      {/* Full-viewport stage */}
      <main className="relative min-h-screen flex flex-col">
        {/* Persistent animated background */}
        <NetworkBackground mode={state.mode} />

        {/* Radial vignette keeps content legible over the network */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, hsl(var(--background) / 0.85) 100%)",
          }}
        />

        {/* Phase stage — centered vertically */}
        <div
          ref={stageRef}
          className="relative z-10 flex flex-1 items-center justify-center py-24 md:py-28"
        >
          {state.mode === "entry" && (
            <div className="flex flex-col items-center w-full">
              <ProductPreviewStrip />
              <SystemHero onBegin={() => transition({ type: "BEGIN" })} />
            </div>
          )}

          {state.mode === "selecting" && (
            <IntentSelector
              onSelect={(intentId) => transition({ type: "SELECT_INTENT", intentId })}
            />
          )}

          {state.mode === "revealing" && state.intentId && (
            <ProductReveal
              intentId={state.intentId}
              onSelect={(product) => transition({ type: "SELECT_PRODUCT", product })}
              onBack={() => transition({ type: "BACK_TO_INTENTS" })}
            />
          )}

          {state.mode === "detail" && state.product && (
            <ProductDetailPanel
              product={state.product}
              onBack={() => transition({ type: "BACK_TO_PRODUCTS" })}
              onDecide={() => transition({ type: "DECIDE" })}
            />
          )}

          {state.mode === "decision" && state.product && (
            <DecisionCTA
              product={state.product}
              onRestart={() => transition({ type: "RESTART" })}
            />
          )}
        </div>

        {/* Progress breadcrumb */}
        <ProgressBar mode={state.mode} />
      </main>
    </div>
  );
};

// ─── Progress indicator ───────────────────────────────────────────────────────
const STEPS: { mode: UIMode; label: string }[] = [
  { mode: "entry",     label: "Start"    },
  { mode: "selecting", label: "Intent"   },
  { mode: "revealing", label: "Match"    },
  { mode: "detail",    label: "Explore"  },
  { mode: "decision",  label: "Decide"   },
];

const modeIndex = (m: UIMode) => STEPS.findIndex((s) => s.mode === m);

const ProgressBar = ({ mode }: { mode: UIMode }) => {
  const current = modeIndex(mode);

  return (
    <div className="relative z-10 flex items-center justify-center gap-3 pb-8 px-6">
      {STEPS.map((step, i) => {
        const done    = i <= current;
        const active  = i === current;
        return (
          <div key={step.mode} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`h-1 w-8 rounded-full transition-all duration-500 ${
                  done ? "bg-primary" : "bg-border/40"
                } ${active ? "shadow-[0_0_8px_hsl(202_89%_69%/0.6)]" : ""}`}
              />
              <span className={`font-display text-[0.55rem] tracking-[0.18em] uppercase transition-colors duration-300 ${active ? "text-primary" : done ? "text-muted-foreground/60" : "text-muted-foreground/25"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-4 mb-3 transition-all duration-500 ${i < current ? "bg-primary/40" : "bg-border/20"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Products;
