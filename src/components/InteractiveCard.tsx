import { useRef, useState, ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
}

const InteractiveCard = ({ children, className = "" }: InteractiveCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0 });
  const { isDark } = useTheme();

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    }
    setHovering(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      className={`card-glass relative overflow-hidden ${className}`}
      style={{
        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(450px circle at ${spot.x}px ${spot.y}px, hsl(var(--primary) / ${isDark ? "0.1" : "0.055"}), transparent 60%)`,
        }}
      />
      {/* Edge glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: hovering ? 1 : 0,
          boxShadow:
            isDark
              ? "inset 0 0 0 1px hsl(var(--primary) / 0.15), 0 0 50px hsl(var(--primary) / 0.12)"
              : "inset 0 0 0 1px hsl(var(--primary) / 0.12), 0 0 36px hsl(var(--primary) / 0.07)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default InteractiveCard;
