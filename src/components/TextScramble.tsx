import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface TextScrambleProps {
  text: string;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const TextScramble = ({ text, className }: TextScrambleProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>({ threshold: 0.3 });
  const [display, setDisplay] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setHasAnimated(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return text[i];
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 0.4;
      if (iteration >= text.length) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isVisible, hasAnimated, text]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default TextScramble;
