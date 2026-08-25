import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface AuditActiveContextValue {
  /** True while the audit's own diagnostic states are on screen — used to suppress the floating WhatsApp widget. */
  active: boolean;
  setActive: (active: boolean) => void;
}

const AuditActiveContext = createContext<AuditActiveContextValue>({
  active: false,
  setActive: () => {},
});

/**
 * Wraps the whole app so both SiteLayout (which decides whether to render
 * the floating WhatsApp widget) and AuditFlow (deep inside a single page,
 * the only place that ever sets this) share one flag — approved plan §4/§11.
 */
export const AuditActiveProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActiveState] = useState(false);
  const setActive = useCallback((value: boolean) => setActiveState(value), []);
  const value = useMemo(() => ({ active, setActive }), [active, setActive]);
  return <AuditActiveContext.Provider value={value}>{children}</AuditActiveContext.Provider>;
};

export const useAuditActive = () => useContext(AuditActiveContext);
