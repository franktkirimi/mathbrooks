import type { ProductMetric, ProductPanel } from "@/content/siteContent";

type ProductMockupProps = {
  accent: string;
  title: string;
  metrics: ProductMetric[];
  panels: ProductPanel[];
};

const ProductMockup = ({ accent, title, metrics, panels }: ProductMockupProps) => {
  return (
    <div className="rounded-[1.5rem] border border-border/60 bg-card/85 p-3 shadow-[0_24px_90px_rgba(15,23,42,0.18)]">
      <div className="overflow-hidden rounded-[1.2rem] border border-border/60 bg-gradient-to-b from-background/70 to-card/85">
        <div className="flex items-center justify-between border-b border-border/60 bg-background/60 px-4 py-3">
          <div>
            <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-primary/80">
              Product View
            </p>
            <h2 className="mt-1 font-display text-sm tracking-[0.18em] uppercase text-foreground">
              {title}
            </h2>
          </div>
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/12" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/8" />
          </div>
        </div>

        <div className="p-4 md:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border/60 p-4"
                style={{ background: `linear-gradient(180deg, hsl(${accent} / 0.14), hsl(var(--background) / 0.72))` }}
              >
                <p className="text-[0.65rem] font-display tracking-[0.16em] uppercase text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-3 font-display text-xl text-foreground md:text-2xl">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {panels.map((panel) => (
              <div key={panel.title} className="rounded-xl border border-border/60 bg-background/65 p-4">
                <p className="mb-3 text-[0.65rem] font-display tracking-[0.16em] uppercase text-muted-foreground">
                  {panel.title}
                </p>
                <div className="space-y-2">
                  {panel.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/75 px-3 py-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: `hsl(${accent})` }}
                      />
                      <span className="text-sm font-light text-foreground">{item}</span>
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
