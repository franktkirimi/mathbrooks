import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const AnimatedSection = ({ 
  children, 
  className,
  delay = 0,
  direction = "up"
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const directionStyles = {
    up: "translate-y-16",
    down: "-translate-y-16",
    left: "translate-x-16",
    right: "-translate-x-16",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${directionStyles[direction]}`,
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
