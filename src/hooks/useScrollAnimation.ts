import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.05, rootMargin = "0px 0px 120px 0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => {
      setIsVisible(true);
      observer.disconnect();
      clearTimeout(fallback);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    // Safety fallback: if the element is already in/near the viewport on mount,
    // or the observer never fires (e.g. smooth-scroll libs), reveal after 1.8s max.
    const fallback = setTimeout(() => {
      const rect = element.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight + 400;
      if (inViewport) reveal();
    }, 1800);

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
