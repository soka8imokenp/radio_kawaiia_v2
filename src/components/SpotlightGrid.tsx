"use client";

import { useEffect, useState } from "react";

export default function SpotlightGrid() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none bg-[var(--color-page-bg)] transition-colors duration-300">
      {/* ☀️/🌙 1. Umumiy orqa fon to'ri (.grid-bg klassi) */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* 💡 2. Sichqoncha atrofidagi yumshoq yorug'lik (Radial gradient) */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 opacity-60 dark:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(138, 96, 194, 0.12), transparent 80%)`
        }}
      />
    
      {/* ✨ 3. Sichqoncha ostidagi yorqinroq to'r chiziqlari (.grid-bg-bright) */}
      <div 
        className="absolute inset-0 grid-bg-bright" 
        style={{
          WebkitMaskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`, 
          maskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
        }}
      />
    </div>
  );
}
