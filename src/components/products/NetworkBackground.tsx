import { useEffect, useRef } from "react";

type Mode = "entry" | "selecting" | "revealing" | "detail" | "decision";

interface Props {
  mode: Mode;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number; // 0–1, decays over time
}

const BASE_SPEED = 0.22;
const PULSE_SPEED = 1.4;
const CONNECT_DIST = 130;
const NODE_COUNT = 42;

export const NetworkBackground = ({ mode }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
    // Pulse all nodes on mode change
    nodesRef.current.forEach((n) => { n.pulse = 1; });
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      if (nodesRef.current.length === 0) init();
    };

    const init = () => {
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * BASE_SPEED,
        vy: (Math.random() - 0.5) * BASE_SPEED,
        r: Math.random() * 1.5 + 0.8,
        pulse: 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const activeColor = "202, 89%, 69%";
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const speed = BASE_SPEED + n.pulse * (PULSE_SPEED - BASE_SPEED);

        // Nudge velocity toward speed magnitude
        const mag = Math.sqrt(n.vx ** 2 + n.vy ** 2);
        if (mag > 0) {
          n.vx = (n.vx / mag) * speed;
          n.vy = (n.vy / mag) * speed;
        }

        n.x += n.vx;
        n.y += n.vy;
        n.pulse = Math.max(0, n.pulse - 0.012);

        // Wrap at edges
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;

        // Draw node dot
        const alpha = 0.15 + n.pulse * 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${activeColor}, ${alpha})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx ** 2 + dy ** 2);
          if (dist < CONNECT_DIST) {
            const lineAlpha = (1 - dist / CONNECT_DIST) * (0.06 + Math.max(n.pulse, m.pulse) * 0.18);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `hsla(${activeColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
