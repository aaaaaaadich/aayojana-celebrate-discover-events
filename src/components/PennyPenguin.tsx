
import React from "react";

const PennyPenguin = () => (
  <div className="flex justify-center">
    <svg
      viewBox="0 0 180 220"
      width="200"
      height="240"
      className="drop-shadow-xl animate-fade-in"
      aria-label="Penny the Calendar Penguin"
      role="img"
    >
      {/* Body */}
      <ellipse cx="90" cy="140" rx="60" ry="75" fill="#1D3557" />
      {/* Calendar (belly) */}
      <rect
        x="45"
        y="110"
        width="90"
        height="78"
        rx="18"
        fill="#fff"
        stroke="#E76F51"
        strokeWidth="3"
      />
      {/* Calendar grid */}
      {Array.from({ length: 5 }).map((_, row) => (
        <line
          key={row}
          x1="55"
          y1={130 + row * 15}
          x2="125"
          y2={130 + row * 15}
          stroke="#E9C46A"
          strokeWidth="1"
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
        />
      ))}
      {/* Penguin face */}
      <ellipse cx="90" cy="95" rx="44" ry="40" fill="#fff"/>
      <ellipse cx="86" cy="112" rx="14" ry="10" fill="#fffefb"/>
      {/* Eyes */}
      <ellipse cx="75" cy="95" rx="7" ry="7" fill="#222" />
      <ellipse cx="108" cy="95" rx="7" ry="7" fill="#222" />
      {/* Glasses */}
      <ellipse cx="75" cy="95" rx="10" ry="8" fill="none" stroke="#6096C6" strokeWidth="2"/>
      <ellipse cx="108" cy="95" rx="10" ry="8" fill="none" stroke="#6096C6" strokeWidth="2"/>
      <rect x="84" y="92" width="15" height="2" rx="1" fill="#6096C6"/>
      {/* Beak */}
      <polygon
        points="91,106 97,102 91,102"
        fill="#E9C46A"
      />
      <ellipse
        cx="94" cy="107" rx="4" ry="1.5"
        fill="#F4A261"
        opacity="0.5"
      />
      {/* Cheek blush */}
      <ellipse cx="68" cy="104" rx="3" ry="2" fill="#F4A261" opacity="0.5" />
      <ellipse cx="115" cy="104" rx="3" ry="2" fill="#F4A261" opacity="0.5" />
      {/* Flippers */}
      <ellipse
        cx="29" cy="155" rx="18" ry="8"
        fill="#21406A"
        transform="rotate(-20 29 155)"
      />
      <ellipse
        cx="151" cy="155" rx="18" ry="8"
        fill="#21406A"
        transform="rotate(20 151 155)"
      />
      {/* Feet */}
      <ellipse cx="65" cy="210" rx="13" ry="5" fill="#E9C46A" />
      <ellipse cx="115" cy="210" rx="13" ry="5" fill="#E9C46A" />
      {/* Party hat */}
      <polygon
        points="90,50 82,75 98,75"
        fill="#F08A30"
      />
      <circle cx="90" cy="48" r="5" fill="#E76F51" />
      <ellipse cx="90" cy="73" rx="4" ry="2" fill="#fff" opacity="0.7"/>
      {/* Subtle shadow below */}
      <ellipse cx="90" cy="218" rx="40" ry="8" fill="#aaa" opacity="0.18"/>
    </svg>
  </div>
);

export default PennyPenguin;
