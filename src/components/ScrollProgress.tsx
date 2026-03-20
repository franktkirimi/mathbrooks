import { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
