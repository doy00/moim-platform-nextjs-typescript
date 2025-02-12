import React, { useEffect, useRef } from 'react';

type IntersectionObserverProps = {
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
};

const IntersectionObserver = ({
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}: IntersectionObserverProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect, threshold, rootMargin]);

  return <div ref={observerRef} style={{ height: '5px' }} />;
};

export default IntersectionObserver;
