
import { useState, useEffect, useRef } from 'react';

interface StatsCardProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const StatsCard = ({
  value,
  label,
  prefix = '',
  suffix = '',
  duration = 2000,
}: StatsCardProps) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = Math.min(value, 9999);
    const increment = end / 50;
    const stepTime = Math.abs(Math.floor(duration / (end / increment)));
    
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.floor(start), end));
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [isInView, value, duration]);

  return (
    <div 
      ref={cardRef} 
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="text-4xl font-bold mb-2">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
};

export default StatsCard;
