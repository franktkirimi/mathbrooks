import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ILLUSTRATIVE_DATA_DISCLOSURE =
  "Illustrative product interface. Figures shown are sample data, not client results.";

type IllustrativeProductDataProps = {
  children: ReactNode;
  className?: string;
  placeholderClassName?: string;
};

const IllustrativeProductData = ({
  children,
  className,
  placeholderClassName,
}: IllustrativeProductDataProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <figure className={className}>
      <figcaption
        aria-hidden="true"
        className="mb-3 font-display text-[0.6rem] font-medium uppercase tracking-[0.16em] text-muted-foreground"
      >
        {ILLUSTRATIVE_DATA_DISCLOSURE}
      </figcaption>
      <span className="sr-only">{ILLUSTRATIVE_DATA_DISCLOSURE}</span>
      <div aria-hidden="true">
        {mounted ? (
          children
        ) : (
          <div
            className={cn(
              "min-h-24 rounded-xl border border-border/60 bg-secondary/25",
              placeholderClassName,
            )}
          />
        )}
      </div>
    </figure>
  );
};

export default IllustrativeProductData;
