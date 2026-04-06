import type { ProductMetric, ProductPanel } from "@/content/siteContent";

type ProductMockupProps = {
  accent: string;
  title: string;
  metrics: ProductMetric[];
  panels: ProductPanel[];
};

const ProductMockup = ({ accent, title, metrics, panels }: ProductMockupProps) => {
  return (
    <div className="rounded-[1.5rem] border border-border/40 bg-background/80 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
      <div className="rounded-[1.2rem] border border-white/5 overflow-hidden bg-slate-950/80">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <div>
            <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-primary/80">
              Product View
            </p>
            <h2 className="font-display text-sm tracking-[0.18em] uppercase text-white mt-1">
              {title}
            </h2>
          </div>
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="p-4 md:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/10 p-4"
                style={{ background: `linear-gradient(180deg, hsl(${accent} / 0.18), rgba(255,255,255,0.03))` }}
              >
                <p className="text-[0.65rem] font-display tracking-[0.16em] uppercase text-white/70">
                  {metric.label}
                </p>
                <p className="text-xl md:text-2xl font-display text-white mt-3">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {panels.map((panel) => (
              <div key={panel.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[0.65rem] font-display tracking-[0.16em] uppercase text-white/65 mb-3">
                  {panel.title}
                </p>
                <div className="space-y-2">
                  {panel.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-lg border border-white/6 bg-black/20 px-3 py-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: `hsl(${accent})` }}
                      />
                      <span className="text-sm font-light text-white/85">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMockup;
