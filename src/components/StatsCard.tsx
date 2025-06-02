
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
      className="flex flex-col items-center justify-center p-4 animate-3d-hover animate-morph group transition-all duration-500 hover:scale-105 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-saffron-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
      
      {/* Floating Particles */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 animate-float transition-opacity duration-500"></div>
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-saffron-500/20 rounded-full opacity-0 group-hover:opacity-100 animate-float transition-opacity duration-500" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="text-4xl font-bold mb-2 transition-all duration-500 group-hover:text-saffron-500 text-blue-600 dark:text-blue-400 relative z-10">
        {prefix}
        <span className="animate-magnetic">{count.toLocaleString()}</span>
        {suffix}
      </div>
      
      <div className="text-muted-foreground font-medium transition-all duration-500 group-hover:text-foreground/80 relative z-10">
        {label}
      </div>
      
      {/* Bottom Decoration */}
      <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-saffron-500 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-liquid"></div>
    </div>
  );
};

export default StatsCard;
