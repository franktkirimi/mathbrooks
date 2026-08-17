import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const positionRef = useRef({ x: -600, y: -600 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const render = () => {
      const glow = glowRef.current;
      if (glow) {
        const { x, y } = positionRef.current;
        glow.style.transform = `translate3d(${x - 230}px, ${y - 230}px, 0)`;
      }
      frameRef.current = 0;
    };

    const update = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      if (!frameRef.current) frameRef.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", update, { passive: true });
    return () => {
      window.removeEventListener("mousemove", update);
      cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden hidden md:block"
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: 460,
          height: 460,
          borderRadius: "50%",
          left: 0,
          top: 0,
          transform: "translate3d(-600px, -600px, 0)",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.032) 0%, transparent 70%)",
          transition: "transform 0.35s ease-out",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default CursorGlow;
