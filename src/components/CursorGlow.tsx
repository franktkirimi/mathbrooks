import { useState, useEffect } from "react";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -600, y: -600 });

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
          width: 700,
          height: 700,
          borderRadius: "50%",
          left: pos.x - 350,
          top: pos.y - 350,
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 65%)",
          transition: "left 0.25s ease-out, top 0.25s ease-out",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default CursorGlow;
