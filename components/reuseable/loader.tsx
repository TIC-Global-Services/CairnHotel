"use client";

import React, { useEffect, useState } from "react";

const LETTERS = ["C", "A", "I", "R", "N", "H", "O", "T", "E", "L"];

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Skip loader if already shown in a previous session
    if (localStorage.getItem('preloader_shown')) {
      setVisible(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          localStorage.setItem('preloader_shown', 'true');
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return prev + 1;
      });
    }, 22);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#FFF7E0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        transition: "opacity 0.4s ease",
        opacity: progress === 100 ? 0 : 1,
      }}
    >
      {/* Animated diamond mark */}
      {/* <div style={{ position: "relative", width: 64, height: 64 }}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "100%",
            height: "100%",
            animation: "spin-slow 4s linear infinite",
          }}
        >
          <rect
            x="8"
            y="8"
            width="48"
            height="48"
            rx="4"
            stroke="#000"
            strokeWidth="1.5"
            transform="rotate(45 32 32)"
          />
          <rect
            x="16"
            y="16"
            width="32"
            height="32"
            rx="2"
            stroke="#000"
            strokeWidth="1"
            transform="rotate(45 32 32)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#000",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div> */}

      {/* Staggered letter reveal */}
      <div
        style={{
          display: "flex",
          gap: "0.35rem",
          letterSpacing: "0.55em",
        }}
      >
        {LETTERS.map((letter, i) => (
          <span
            key={letter}
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 300,
              color: "#000",
              animation: `letter-in 0.7s ease forwards`,
              animationDelay: `${i * 0.12}s`,
              opacity: 0,
              transform: "translateY(12px)",
            }}
          >
            {letter}
          </span>
        ))}
      </div>


      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(140px, 20vw, 220px)",
        }}
      >
        <div
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.15)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#000",
              borderRadius: 2,
              transition: "width 0.02s linear",
              position: "relative",
            }}
          >
            {/* shimmer effect */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,247,224,0.6) 50%, transparent 100%)",
                animation: "shimmer 1.2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
        <p
        className="mt-2 text-center font-sans md:text-[1.5rem] text-[1rem] tracking-tight"
        >
          {progress}%
        </p>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&display=swap');

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.5; }
        }
        @keyframes letter-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          to { opacity: 0.5; }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
