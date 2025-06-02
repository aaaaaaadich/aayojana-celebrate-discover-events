
import React from 'react';
import { useCascadeAnimation } from '@/hooks/useScrollAnimation';

interface CascadeAnimationProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export const CascadeAnimation: React.FC<CascadeAnimationProps> = ({
  children,
  delay = 100,
  className = '',
}) => {
  const { elementRef, visibleItems } = useCascadeAnimation(children.length, delay);

  return (
    <div ref={elementRef} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`cascade-animation ${visibleItems[index] ? 'animate' : ''}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default CascadeAnimation;
