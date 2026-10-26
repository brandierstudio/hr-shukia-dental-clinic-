import React, { useEffect, useRef, useState } from 'react';

interface ScrollReveal3DProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  tiltDirection?: 'up' | 'left' | 'right';
}

/**
 * Interactive 3D Scroll-Driven Reveal Container
 * Uses IntersectionObserver to smoothly transition elements in 3D perspective space
 * (rotateX, rotateY, translateZ, scale) as the user scrolls down the page.
 */
export const ScrollReveal3D: React.FC<ScrollReveal3DProps> = ({
  children,
  className = '',
  delayMs = 0,
  tiltDirection = 'up',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    tiltDirection === 'left'
      ? 'perspective(1200px) translateY(22px) rotateX(3deg) rotateY(2deg) scale(0.97)'
      : tiltDirection === 'right'
        ? 'perspective(1200px) translateY(22px) rotateX(3deg) rotateY(-2deg) scale(0.97)'
        : 'perspective(1200px) translateY(24px) rotateX(3.5deg) scale(0.97)';

  const visibleTransform =
    'perspective(1200px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)';

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible ? visibleTransform : hiddenTransform,
        transformOrigin: 'top center',
        opacity: isVisible ? 1 : 0.15,
        transition: `transform 780ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 680ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        willChange: 'transform, opacity',
      }}
      className={`max-w-full ${className}`}
    >
      {children}
    </div>
  );
};
