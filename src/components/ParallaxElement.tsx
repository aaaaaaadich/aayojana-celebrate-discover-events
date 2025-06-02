
import React from 'react';
import { useParallaxScroll } from '@/hooks/useScrollAnimation';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const offset = useParallaxScroll(speed);

  return (
    <div
      className={`parallax-element ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;
