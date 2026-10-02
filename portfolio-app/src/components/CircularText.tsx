import React from 'react';

interface CircularTextProps {
  text?: string;
  spinDuration?: number;
  className?: string;
}

export const CircularText: React.FC<CircularTextProps> = ({
  text = "FULL-STACK DEVELOPER • AI & AUTOMATION ENGINEER • ",
  spinDuration = 20,
  className = "",
}) => {
  const letters = Array.from(text);
  const totalLetters = letters.length;

  return (
    <div
      className={`relative flex items-center justify-center rounded-full pointer-events-none select-none ${className}`}
      style={{ width: '160px', height: '160px' }}
    >
      <div
        className="absolute w-full h-full animate-spin"
        style={{ animationDuration: `${spinDuration}s` }}
      >
        {letters.map((letter, i) => {
          const angle = (360 / totalLetters) * i;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-0 origin-[0_80px] font-['Outfit'] font-extrabold text-[10px] uppercase tracking-widest text-[var(--accent-color)]"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <div className="w-10 h-10 rounded-full bg-[var(--text-primary)]/10 backdrop-blur-md border border-[var(--border-light)] flex items-center justify-center text-[var(--accent-color)] font-bold text-xs">
        ⚡
      </div>
    </div>
  );
};
