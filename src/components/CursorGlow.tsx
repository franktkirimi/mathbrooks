import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -600, y: -600 });
  const { isDark } = useTheme();

  useEffect(() => {
    const update = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden hidden md:block"
    >
      <div
        style={{
          position: "absolute",
          width: isDark ? 520 : 460,
          height: isDark ? 520 : 460,
          borderRadius: "50%",
          left: pos.x - (isDark ? 260 : 230),
          top: pos.y - (isDark ? 260 : 230),
          background:
            isDark
              ? "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 68%)"
              : "radial-gradient(circle, hsl(var(--primary) / 0.032) 0%, transparent 70%)",
          transition: "left 0.35s ease-out, top 0.35s ease-out",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default CursorGlow;
