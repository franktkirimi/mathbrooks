import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type FeatureBandProps = {
  title: ReactNode;
  description: string;
  bullets: string[];
  visual: ReactNode;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  reverse?: boolean;
  surface?: "light" | "dark";
  className?: string;
  id?: string;
};

const FeatureBand = ({
  title,
  description,
  bullets,
  visual,
  primaryAction,
  secondaryAction,
  reverse = false,
  surface = "light",
  className,
  id,
}: FeatureBandProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden px-5 py-24 sm:px-6 md:py-32 lg:py-40",
        surface === "light" ? "editorial-light" : "bg-background",
        className
      )}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div
        className={cn(
          "relative mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-28",
          reverse && "lg:[&>*:first-child]:order-2"
        )}
      >
        <div className="max-w-[610px]">
          <h2 className="editorial-heading">{title}</h2>
          <p className="editorial-copy mt-7 max-w-[590px]">{description}</p>

          <ul className="mt-8 space-y-4">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-[1rem] font-medium leading-7 text-foreground/85">
                <span className="mt-1 grid h-6 w-6 flex-none place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to={primaryAction.href} className="button-primary">
              {primaryAction.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {secondaryAction ? (
              <Link to={secondaryAction.href} className="button-secondary">
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative min-w-0">{visual}</div>
      </div>
    </section>
  );
};

export default FeatureBand;
