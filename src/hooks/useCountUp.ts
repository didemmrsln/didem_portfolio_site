import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  duration?: number; // duration in ms (default ~1000ms, range 900-1200ms)
  start?: number; // initial count before animation triggers (default 0)
  threshold?: number; // IntersectionObserver threshold (default 0.15)
}

export function useCountUp(
  end: number,
  options: UseCountUpOptions = {}
) {
  const { duration = 1000, start = 0, threshold = 0.15 } = options;
  const [count, setCount] = useState<number>(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const domRef = useRef<any>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    const currentElement = domRef.current;
    if (!currentElement || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.unobserve(entry.target);

            // Animate from start to end with cubic ease-out curve (~1000ms)
            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease-out cubic: 1 - (1 - progress)^3
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.round(start + (end - start) * easeOut);
              setCount(currentVal);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(end);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [end, start, duration, threshold, hasAnimated]);

  return {
    count,
    formatted: count.toLocaleString(),
    ref: domRef,
  };
}
