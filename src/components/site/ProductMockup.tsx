import type { ProductMetric, ProductPanel } from "@/content/siteContent";
import IllustrativeProductData from "@/components/site/IllustrativeProductData";

type ProductMockupProps = {
  accent: string;
  title: string;
  metrics: ProductMetric[];
  panels: ProductPanel[];
};

const ProductMockup = ({ accent, title, metrics, panels }: ProductMockupProps) => {
  return (
    <IllustrativeProductData placeholderClassName="min-h-[26rem] rounded-[1.5rem]">
      <div className="elevated-panel rounded-[1.5rem] p-3">
        <div className="overflow-hidden rounded-[1.2rem] border border-border/80 bg-secondary/35">
          <div className="border-b border-border/60 bg-background/60 px-4 py-3">
            <div>
              <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-primary/80">
                Product View
              </p>
              <h2 className="mt-1 font-display text-sm tracking-[0.18em] uppercase text-foreground">
                {title}
              </h2>
            </div>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="surface-card rounded-xl p-4"
                  style={{ background: `linear-gradient(180deg, hsl(${accent} / 0.1), hsl(var(--card)))` }}
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
                <div key={panel.title} className="surface-card rounded-xl p-4">
                  <p className="mb-3 text-[0.65rem] font-display tracking-[0.16em] uppercase text-muted-foreground">
                    {panel.title}
                  </p>
                  <div className="space-y-2">
                    {panel.items.map((item) => (
                      <div key={item} className="rounded-lg border border-border/70 bg-secondary/45 px-3 py-2.5">
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </IllustrativeProductData>
  );
};

export default ProductMockup;
