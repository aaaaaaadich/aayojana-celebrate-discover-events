
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'blur';
  delay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  const getAnimationClass = () => {
    const baseClass = `scroll-reveal-${direction}`;
    return `${baseClass} ${isVisible ? 'animate' : ''}`;
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
