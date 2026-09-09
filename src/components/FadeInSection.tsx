import React, { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in milliseconds
  threshold?: number;
  direction?: 'up' | 'down' | 'none';
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.12,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
            // Once revealed, unobserve to keep the gallery state stable
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  const getTransformClasses = () => {
    if (direction === 'none') {
      return isVisible ? 'opacity-100' : 'opacity-0';
    }
    if (direction === 'down') {
      return isVisible
        ? 'translate-y-0 opacity-100'
        : '-translate-y-12 opacity-0';
    }
    return isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-12 opacity-0';
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
