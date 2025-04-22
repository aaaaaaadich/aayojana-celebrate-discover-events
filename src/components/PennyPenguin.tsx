import React, { useEffect, useRef } from "react";

const PennyPenguin = () => {
  const penguinRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const penguin = penguinRef.current;
    if (!penguin) return;

    // Gentle floating animation
    let floatFrameId: number;
    let y = 0;
    let direction = 1;
    const floatAnimate = () => {
      if (y > 8) direction = -1;
      if (y < 0) direction = 1;
      y += 0.15 * direction;
      if (penguin) {
        penguin.style.transform = `translateY(${y}px) rotateY(${Math.sin(y/4) * 3}deg)`;
      }
      floatFrameId = requestAnimationFrame(floatAnimate);
    };
    floatFrameId = requestAnimationFrame(floatAnimate);

    // Blinking animation (unchanged)
    const leftEye = penguin.querySelector("#left-eye");
    const rightEye = penguin.querySelector("#right-eye");
    let blinkInterval: number;
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
    setTimeout(blink, 1000);
    blinkInterval = window.setInterval(() => {
      blink();
    }, Math.random() * 2400 + 1600);

    // Flipper wave animation fix
    const leftFlipper = penguin.querySelector("#left-flipper");
    const rightFlipper = penguin.querySelector("#right-flipper");
    let flipperFrameId: number;
    let angle = 0;
    const flipperAnimate = () => {
      angle += 0.05;
      if (leftFlipper && rightFlipper) {
        const leftAngle = Math.sin(angle) * 10 - 20;
        const rightAngle = Math.cos(angle) * 10 + 20;
        leftFlipper.setAttribute(
          "transform",
          `rotate(${leftAngle} 32 158)`
        );
        rightFlipper.setAttribute(
          "transform",
          `rotate(${rightAngle} 148 158)`
        );
      }
      flipperFrameId = requestAnimationFrame(flipperAnimate);
    };
    flipperFrameId = requestAnimationFrame(flipperAnimate);

    // Clean up
    return () => {
      cancelAnimationFrame(floatFrameId);
      clearInterval(blinkInterval);
      cancelAnimationFrame(flipperFrameId);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center perspective-800 py-4">
      {/* Nepali blue blur oval (background frame) */}
      <div className="absolute bg-[#2490DF] blur-2xl opacity-30 -inset-x-6 top-8 mx-auto w-72 h-44 rounded-full z-0" />
      
      <div className="absolute bottom-0 w-32 h-6 bg-black/10 rounded-full blur-md translate-y-2 z-0"></div>

      <svg
        ref={penguinRef}
        viewBox="0 0 180 225"
        width="240"
        height="285"
        className="drop-shadow-xl animate-fade-in relative z-10"
        aria-label="Penny the Calendar Penguin"
        role="img"
        style={{ filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.29))" }}
      >
        {/* 3D Body with blue gradient, Nepali flag accent */}
        <defs>
          <linearGradient id="bodyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1EAEDB" />
            <stop offset="55%" stopColor="#213D77" />
            <stop offset="100%" stopColor="#0F1B2E" />
          </linearGradient>
          <linearGradient id="calendarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#e0eaff" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
          </filter>
        </defs>
        
        {/* Body with 3D effect, deeper blue accent */}
        <ellipse cx="90" cy="140" rx="59" ry="73" fill="url(#bodyBlue)" />
        {/* Calendar (belly) */}
        <rect
          x="48"
          y="109"
          width="85"
          height="78"
          rx="18"
          fill="url(#calendarGrad)"
          stroke="#EA384C"
          strokeWidth="3"
          filter="url(#shadow)"
        />
        {/* Calendar grid with gold lines */}
        {Array.from({ length: 5 }).map((_, row) => (
          <line
            key={row}
            x1="60"
            y1={130 + row * 14}
            x2="120"
            y2={130 + row * 14}
            stroke="#FFD700"
            strokeWidth="1"
            strokeDasharray={row === 0 ? "0" : "2,1"}
          />
        ))}
        {Array.from({ length: 6 }).map((_, col) => (
          <line
            key={col}
            x1={60 + col * 10}
            y1={130}
            x2={60 + col * 10}
            y2={186}
            stroke="#FFD700"
            strokeWidth="1"
            strokeDasharray={col === 0 ? "0" : "2,1"}
          />
        ))}
        {/* Calendar feature date dots */}
        <circle cx="67" cy="137" r="3" fill="#EA384C" />
        <circle cx="88" cy="152" r="3" fill="#EA384C" />
        <circle cx="110" cy="167" r="3" fill="#EA384C" />
        
        {/* Face and chest */}
        <ellipse cx="90" cy="95" rx="42" ry="39" fill="#fff" filter="url(#shadow)" />
        <ellipse cx="88" cy="115" rx="12" ry="10" fill="#F1F0FB" />
        {/* Eyes */}
        <ellipse id="left-eye" cx="80" cy="97" rx="7" ry="7" fill="#222" />
        <ellipse id="right-eye" cx="105" cy="97" rx="7" ry="7" fill="#222" />
        <ellipse cx="83" cy="94" rx="2" ry="2" fill="#fff" />
        <ellipse cx="102" cy="94" rx="2" ry="2" fill="#fff" />
        {/* Glasses accent */}
        <ellipse cx="80" cy="97" rx="11" ry="8" fill="none" stroke="#1EAEDB" strokeWidth="2.5" />
        <ellipse cx="105" cy="97" rx="11" ry="8" fill="none" stroke="#1EAEDB" strokeWidth="2.5" />
        <rect x="90" y="94" width="14" height="2" rx="1" fill="#1EAEDB" />
        <line x1="75" y1="89" x2="79" y2="91" stroke="#fff" strokeWidth="1" opacity="0.5" />
        <line x1="107" y1="89" x2="111" y2="91" stroke="#fff" strokeWidth="1" opacity="0.5" />
        {/* Beak */}
        <polygon
          points="92,112 100,108 92,108"
          fill="#FFD700"
          filter="url(#shadow)"
        />
        <ellipse
          cx="95" cy="113" rx="4" ry="1.5"
          fill="#EA384C"
          opacity="0.4"
        />
        {/* Cheeks */}
        <ellipse cx="73" cy="106" rx="4" ry="2" fill="#EA384C" opacity="0.4" />
        <ellipse cx="112" cy="106" rx="4" ry="2" fill="#EA384C" opacity="0.4" />
        {/* Flippers */}
        <ellipse
          id="left-flipper"
          cx="32" cy="158" rx="17" ry="7"
          fill="#1A1F2C"
          transform="rotate(-20 32 158)"
        />
        <ellipse
          id="right-flipper"
          cx="148" cy="158" rx="17" ry="7"
          fill="#1A1F2C"
          transform="rotate(20 148 158)"
        />
        {/* Feet */}
        <ellipse cx="72" cy="214" rx="12" ry="5" fill="#FFD700" />
        <ellipse cx="108" cy="214" rx="12" ry="5" fill="#FFD700" />
        {/* Party hat with Nepali flag blue and red border */}
        <polygon
          points="90,56 84,78 97,78"
          fill="#2490DF"
          stroke="#EA384C"
          strokeWidth="2"
          filter="url(#shadow)"
        />
        <circle cx="90" cy="54" r="5" fill="#EA384C" />
        <ellipse cx="90" cy="75" rx="4" ry="2" fill="#fff" opacity="0.7" />
        {/* Sparkles */}
        <circle cx="86" cy="67" r="1.1" fill="#fff" className="animate-pulse-slow" />
        <circle cx="93" cy="64" r="1.1" fill="#fff" className="animate-pulse-slow" style={{ animationDelay: "0.9s" }} />
        <circle cx="97" cy="72" r="1.1" fill="#fff" className="animate-pulse-slow" style={{ animationDelay: "0.72s" }} />
        {/* Deep blue shadow below */}
        <ellipse cx="90" cy="222" rx="40" ry="8" fill="#2490DF" opacity="0.18" />
      </svg>
    </div>
  );
};

export default PennyPenguin;
