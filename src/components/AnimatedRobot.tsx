
import React, { useEffect, useRef } from 'react';

const AnimatedRobot = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const robot = robotRef.current;
    const container = containerRef.current;
    if (!robot || !container) return;

    // Initialize animation state
    let animationFrame: number;
    let waveAngle = 0;
    let eyeBlinkTimeout: NodeJS.Timeout;

    // Wave animation
    const animateWave = () => {
      waveAngle += 0.05;
      const armAngle = Math.sin(waveAngle) * 15;
      
      if (robot) {
        const arm = robot.querySelector('.robot-arm') as HTMLElement;
        if (arm) {
          arm.style.transform = `rotate(${armAngle}deg)`;
        }
      }
      
      animationFrame = requestAnimationFrame(animateWave);
    };

    // Eye blinking animation
    const blinkEyes = () => {
      const leftEye = robot.querySelector('.robot-eye-left') as HTMLElement;
      const rightEye = robot.querySelector('.robot-eye-right') as HTMLElement;
      
      if (leftEye && rightEye) {
        leftEye.classList.add('blink');
        rightEye.classList.add('blink');
        
        setTimeout(() => {
          leftEye.classList.remove('blink');
          rightEye.classList.remove('blink');
        }, 200);
      }
      
      // Random blink interval between 2-6 seconds
      const nextBlinkTime = 2000 + Math.random() * 4000;
      eyeBlinkTimeout = setTimeout(blinkEyes, nextBlinkTime);
    };

    // Floating animation
    const floatAnimation = () => {
      robot.style.animation = 'float 3s ease-in-out infinite';
    };

    // Initialize animations
    animateWave();
    blinkEyes();
    floatAnimation();

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(eyeBlinkTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="robot-container relative w-64 h-64 mx-auto">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-nepali-50/20 to-saffron-50/20 rounded-full opacity-50 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-nepali-100/10 to-saffron-100/10 rounded-full scale-90 opacity-30 animate-rotate-slow"></div>
      
      {/* Motion lines */}
      <div className="absolute -z-10 inset-0 scale-125">
        <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-saffron-300/30 to-transparent"
              style={{ 
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) scale(${0.7 + i * 0.05})`,
                opacity: 0.5 - i * 0.08,
                animation: `pulse-ring ${2 + i * 0.5}s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Robot body */}
      <div 
        ref={robotRef} 
        className="robot relative w-40 h-40 mx-auto mt-12"
      >
        {/* Robot head */}
        <div className="robot-head absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center overflow-hidden">
          {/* Head gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>
          
          {/* Robot face */}
          <div className="robot-face relative z-10 w-full h-full flex flex-col justify-center items-center">
            {/* Eyes */}
            <div className="robot-eyes flex justify-center items-center space-x-6 mb-2">
              <div className="robot-eye-left w-4 h-4 rounded-full bg-nepali-500 transition-all duration-100"></div>
              <div className="robot-eye-right w-4 h-4 rounded-full bg-nepali-500 transition-all duration-100"></div>
            </div>
            
            {/* Mouth */}
            <div className="robot-mouth w-12 h-1.5 bg-gray-300 rounded-full mt-4"></div>
            
            {/* Antenna */}
            <div className="robot-antenna absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gray-300">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-saffron-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Robot body */}
        <div className="robot-body absolute top-28 left-1/2 -translate-x-1/2 w-24 h-16 bg-gray-100 rounded-lg shadow-md">
          {/* Body details */}
          <div className="absolute top-2 left-2 right-2 h-3 bg-gray-200 rounded-full"></div>
          <div className="absolute bottom-2 left-2 right-2 h-3 bg-gray-200 rounded-full"></div>
          
          {/* Glowing chest light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-saffron-500 animate-pulse-slow">
            <div className="absolute inset-0 rounded-full bg-saffron-400 opacity-40 animate-ping"></div>
          </div>
        </div>
        
        {/* Robot arms */}
        <div className="robot-arm absolute top-28 -right-8 w-12 h-3 bg-gray-300 rounded-full origin-left transform rotate-0 transition-transform">
          {/* Hand */}
          <div className="absolute right-0 -top-1 w-5 h-5 bg-white rounded-full border-2 border-gray-300"></div>
        </div>
        
        <div className="robot-arm-left absolute top-28 -left-8 w-12 h-3 bg-gray-300 rounded-full"></div>
      </div>
      
      {/* Message bubble */}
      <div className="message-bubble absolute -top-12 right-0 bg-white px-4 py-2 rounded-xl shadow-md opacity-0 transform translate-y-2 transition-all duration-500 animate-bubble">
        <p className="text-sm font-medium text-nepali-500">Hi there! 👋</p>
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45"></div>
      </div>
    </div>
  );
};

export default AnimatedRobot;
