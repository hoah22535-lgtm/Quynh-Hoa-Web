import React, { useMemo } from 'react';

interface BlossomPetal {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

const CherryBlossoms: React.FC = () => {
  // Generate petal positions once to prevent animation jumps and garbage collection pressure
  const blossoms = useMemo<BlossomPetal[]>(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.round((i * 7.1 + Math.random() * 5) % 100),
      top: Math.round(Math.random() * 90),
      size: Math.round(Math.random() * 8 + 11),
      duration: Number((Math.random() * 3 + 4).toFixed(1)),
      delay: Number((Math.random() * 4).toFixed(1)),
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {blossoms.map((b) => (
        <div
          key={b.id}
          className="absolute text-pink-200/60 blossom-element"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            fontSize: `${b.size}px`,
            animation: `blossom-float ${b.duration}s infinite linear, blossom-blink ${b.duration * 0.6}s infinite alternate`,
            animationDelay: `${b.delay}s`,
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          🌸
        </div>
      ))}
      <style>{`
        @keyframes blossom-float {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(25px, 50vh, 0) rotate(180deg);
          }
          100% {
            transform: translate3d(50px, 100vh, 0) rotate(360deg);
          }
        }
        @keyframes blossom-blink {
          0% {
            opacity: 0.25;
            filter: brightness(1);
          }
          50% {
            opacity: 0.75;
            filter: brightness(1.3);
          }
          100% {
            opacity: 0.25;
            filter: brightness(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .blossom-element {
            animation: none !important;
            opacity: 0.3 !important;
            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(CherryBlossoms);
