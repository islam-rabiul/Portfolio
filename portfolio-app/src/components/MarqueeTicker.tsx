import React from 'react';

const TECH_ITEMS = [
  'React.js',
  'Node.js',
  'Express.js',
  'Python',
  'n8n Workflows',
  'Gemini AI API',
  'Machine Learning',
  'Random Forest',
  'Scikit-Learn',
  'MongoDB',
  'TypeScript',
  'OpenCV',
  'REST APIs',
  'Razorpay',
  'Tailwind CSS',
  'Vercel',
];

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="py-6 bg-[var(--bg-secondary)]/60 border-y border-[var(--border-light)] overflow-hidden relative backdrop-blur-md my-12">
      <div className="flex w-[200%] animate-[marqueeScroll_35s_linear_infinite] gap-12 whitespace-nowrap">
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-[var(--text-secondary)] font-['Outfit'] font-bold text-xs sm:text-sm uppercase tracking-widest hover:text-[var(--accent-color)] transition-colors cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_10px_var(--accent-color)]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
