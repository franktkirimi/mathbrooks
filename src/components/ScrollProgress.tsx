import { useEffect, useRef, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
      frameRef.current = 0;
    };
    const requestUpdate = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[2px] bg-primary"
      style={{ width: `${progress}%`, transition: "width 0.08s linear" }}
    />
  );
};

export default ScrollProgress;
