import React, { useEffect, useRef } from "react";

const PennyPenguin = () => {
  const penguinRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const penguin = penguinRef.current;
    if (!penguin) return;

    // Gentle floating animation
    const floatAnimation = () => {
      let y = 0;
      let direction = 1;
      const animate = () => {
        if (y > 8) direction = -1;
        if (y < 0) direction = 1;
        y += 0.15 * direction;
        if (penguin) {
          penguin.style.transform = `translateY(${y}px) rotateY(${Math.sin(y/4) * 3}deg)`;
        }
        return requestAnimationFrame(animate);
      };
      return animate;
    };

    // Blinking animation
    const blinkAnimation = () => {
      const leftEye = penguin.querySelector("#left-eye");
      const rightEye = penguin.querySelector("#right-eye");
      
      const blink = () => {
        if (leftEye && rightEye) {
          leftEye.setAttribute("ry", "0.5");
          rightEye.setAttribute("ry", "0.5");
          
          setTimeout(() => {
            leftEye.setAttribute("ry", "7");
            rightEye.setAttribute("ry", "7");
          }, 200);
        }
      };
      
      // Initial blink
      setTimeout(blink, 1000);
      
      // Set up interval for blinking
      return setInterval(() => {
        blink();
      }, Math.random() * 3000 + 2000);
    };

    // Flipper wave animation
    const flipperAnimation = () => {
      const leftFlipper = penguin.querySelector("#left-flipper");
      const rightFlipper = penguin.querySelector("#right-flipper");
      
      let angle = 0;
      const animate = () => {
        angle += 0.05;
        if (leftFlipper && rightFlipper) {
          const leftAngle = Math.sin(angle) * 10 - 20;
          const rightAngle = Math.cos(angle) * 10 + 20;
          leftFlipper.setAttribute("transform", `rotate(${leftAngle} 29 155)`);
          rightFlipper.setAttribute("transform", `rotate(${rightAngle} 151 155)`);
        }
        return requestAnimationFrame(animate);
      };
      return animate;
    };

    // Start animations
    const floatAnimationFunc = floatAnimation();
    const floatAnimationFrame = floatAnimationFunc();
    const blinkInterval = blinkAnimation();
    const flipperAnimationFunc = flipperAnimation();
    const flipperAnimationFrame = flipperAnimationFunc();

    // Clean up animations
    return () => {
      cancelAnimationFrame(floatAnimationFrame);
      clearInterval(blinkInterval);
      cancelAnimationFrame(flipperAnimationFrame);
    };
  }, []);

  return (
    <div className="relative flex justify-center perspective-800 py-4">
      <div className="absolute -inset-14 bg-gradient-radial from-saffron-100/40 to-transparent rounded-full animate-pulse-slow"></div>
      
      {/* 3D shadow effect */}
      <div className="absolute bottom-0 w-32 h-6 bg-black/10 rounded-full blur-md transform translate-y-2"></div>
      
      <svg
        ref={penguinRef}
        viewBox="0 0 180 220"
        width="240"
        height="280"
        className="drop-shadow-xl animate-fade-in relative z-10 transition-transform duration-500"
        aria-label="Penny the Calendar Penguin"
        role="img"
        style={{ filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))" }}
      >
        {/* 3D Body with gradient */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A4365" />
            <stop offset="100%" stopColor="#1D3557" />
          </linearGradient>
          <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
          </filter>
        </defs>
        
        {/* Body with 3D effect */}
        <ellipse cx="90" cy="140" rx="60" ry="75" fill="url(#bodyGradient)" />
        
        {/* Calendar (belly) with 3D effect */}
        <rect
          x="45"
          y="110"
          width="90"
          height="78"
          rx="18"
          fill="url(#calendarGradient)"
          stroke="#E76F51"
          strokeWidth="3"
          filter="url(#shadow)"
        />
        
        {/* Calendar grid with improved styling */}
        {Array.from({ length: 5 }).map((_, row) => (
          <line
            key={row}
            x1="55"
            y1={130 + row * 15}
            x2="125"
            y2={130 + row * 15}
            stroke="#E9C46A"
            strokeWidth="1"
            strokeDasharray={row === 0 ? "0" : "2,1"}
          />
        ))}
        {Array.from({ length: 6 }).map((_, col) => (
          <line
            key={col}
            x1={55 + col * 12}
            y1={130}
            x2={55 + col * 12}
            y2={190}
            stroke="#E9C46A"
            strokeWidth="1"
            strokeDasharray={col === 0 ? "0" : "2,1"}
          />
        ))}
        
        {/* Calendar date markers */}
        <circle cx="61" cy="137" r="3" fill="#E76F51" />
        <circle cx="85" cy="152" r="3" fill="#E76F51" />
        <circle cx="109" cy="167" r="3" fill="#E76F51" />
        
        {/* Penguin face with more 3D */}
        <ellipse cx="90" cy="95" rx="44" ry="40" fill="#ffffff" filter="url(#shadow)" />
        <ellipse cx="86" cy="112" rx="14" ry="10" fill="#fffefb" />
        
        {/* Eyes with animation capability */}
        <ellipse id="left-eye" cx="75" cy="95" rx="7" ry="7" fill="#222" />
        <ellipse id="right-eye" cx="108" cy="95" rx="7" ry="7" fill="#222" />
        <ellipse cx="73" cy="92" rx="2" ry="2" fill="#fff" />
        <ellipse cx="106" cy="92" rx="2" ry="2" fill="#fff" />
        
        {/* Glasses with shine */}
        <ellipse cx="75" cy="95" rx="10" ry="8" fill="none" stroke="#6096C6" strokeWidth="2" />
        <ellipse cx="108" cy="95" rx="10" ry="8" fill="none" stroke="#6096C6" strokeWidth="2" />
        <rect x="84" y="92" width="15" height="2" rx="1" fill="#6096C6" />
        <line x1="70" y1="87" x2="74" y2="89" stroke="#fff" strokeWidth="1" opacity="0.6" />
        <line x1="103" y1="87" x2="107" y2="89" stroke="#fff" strokeWidth="1" opacity="0.6" />
        
        {/* Beak with more dimension */}
        <polygon
          points="91,106 97,102 91,102"
          fill="#E9C46A"
          filter="url(#shadow)"
        />
        <ellipse
          cx="94" cy="107" rx="4" ry="1.5"
          fill="#F4A261"
          opacity="0.5"
        />
        
        {/* Cheek blush */}
        <ellipse cx="68" cy="104" rx="3" ry="2" fill="#F4A261" opacity="0.5" />
        <ellipse cx="115" cy="104" rx="3" ry="2" fill="#F4A261" opacity="0.5" />
        
        {/* Flippers with animation capability */}
        <ellipse
          id="left-flipper"
          cx="29" cy="155" rx="18" ry="8"
          fill="#21406A"
          transform="rotate(-20 29 155)"
        />
        <ellipse
          id="right-flipper"
          cx="151" cy="155" rx="18" ry="8"
          fill="#21406A"
          transform="rotate(20 151 155)"
        />
        
        {/* Feet with gradient */}
        <ellipse cx="65" cy="210" rx="13" ry="5" fill="#E9C46A" />
        <ellipse cx="115" cy="210" rx="13" ry="5" fill="#E9C46A" />
        
        {/* Party hat with sparkles */}
        <polygon
          points="90,50 82,75 98,75"
          fill="#F08A30"
          filter="url(#shadow)"
        />
        <circle cx="90" cy="48" r="5" fill="#E76F51" />
        <ellipse cx="90" cy="73" rx="4" ry="2" fill="#fff" opacity="0.7" />
        
        {/* Sparkles on hat */}
        <circle cx="85" cy="60" r="1" fill="#fff" className="animate-pulse-slow" />
        <circle cx="92" cy="55" r="1" fill="#fff" className="animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
        <circle cx="95" cy="65" r="1" fill="#fff" className="animate-pulse-slow" style={{ animationDelay: "1s" }} />
        
        {/* Subtle shadow below */}
        <ellipse cx="90" cy="218" rx="40" ry="8" fill="#aaa" opacity="0.18" />
      </svg>
    </div>
  );
};

export default PennyPenguin;
