import { useState, useEffect, useRef } from "react";

export function useInView(options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<SVGRectElement | null>(null);

  const { threshold, root, rootMargin } = options;

  useEffect(() => {
    const node = ref.current;

    if (!node || isIntersecting) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.unobserve(node);
      }
    }, { threshold, root, rootMargin });

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, isIntersecting]);

  return [ref, isIntersecting] as const;
}