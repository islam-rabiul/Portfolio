import React from 'react';
import { motion } from 'framer-motion';

export interface BackgroundBeamsProps {
  className?: string;
}

const pathData = [
  "M-336 -237C-336 -237 -268 168 196 295C660 422 728 827 728 827",
  "M-325 -249C-325 -249 -257 156 207 283C671 410 739 815 739 815",
  "M-314 -261C-314 -261 -246 144 218 271C682 398 750 803 750 803",
  "M-303 -273C-303 -273 -235 132 229 259C693 386 761 791 761 791",
  "M-292 -285C-292 -285 -224 120 240 247C704 374 772 779 772 779",
  "M-281 -297C-281 -297 -213 108 251 235C715 362 783 767 783 767",
  "M-270 -309C-270 -309 -202 96 262 223C726 350 794 755 794 755",
  "M-259 -321C-259 -321 -191 84 273 211C737 338 805 743 805 743",
  "M-248 -333C-248 -333 -180 72 284 199C748 326 816 731 816 731",
  "M-237 -345C-237 -345 -169 60 295 187C759 314 827 719 827 719",
  "M-226 -357C-226 -357 -158 48 306 175C770 302 838 707 838 707",
  "M-215 -369C-215 -369 -147 36 317 163C781 290 849 695 849 695",
  "M-204 -381C-204 -381 -136 24 328 151C792 278 860 683 860 683",
  "M-193 -393C-193 -393 -125 12 339 139C803 266 871 671 871 671",
  "M-182 -405C-182 -405 -114 0 350 127C814 254 882 659 882 659",
  "M-171 -417C-171 -417 -103 -12 361 115C825 242 893 647 893 647",
  "M-160 -429C-160 -429 -92 -24 372 103C836 230 904 635 904 635",
  "M-149 -441C-149 -441 -81 -36 383 91C847 218 915 623 915 623",
  "M-138 -453C-138 -453 -70 -48 394 79C858 206 926 611 926 611",
  "M-127 -465C-127 -465 -59 -60 405 67C869 194 937 599 937 599",
  "M-116 -477C-116 -477 -48 -72 416 55C880 182 948 587 948 587",
  "M-105 -489C-105 -489 -37 -84 427 43C891 170 959 575 959 575",
  "M-94 -501C-94 -501 -26 -96 438 31C902 158 970 563 970 563",
  "M-83 -513C-83 -513 -15 -108 449 19C913 146 981 551 981 551",
  "M-72 -525C-72 -525 -4 -120 460 7C924 134 992 539 992 539",
  "M-61 -537C-61 -537 7 -132 471 -5C935 122 1003 527 1003 527",
  "M-50 -549C-50 -549 18 -144 482 -17C946 110 1014 515 1014 515",
  "M-39 -561C-39 -561 29 -156 493 -29C957 98 1025 503 1025 503",
];

const animations = pathData.map((_, i) => ({
  duration: 3.5 + (i % 5) * 0.6,
  delay: i * 0.04,
}));

export const BackgroundBeams: React.FC<BackgroundBeamsProps> = React.memo(
  ({ className = "" }) => {
    return (
      <div
        className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden opacity-40 md:opacity-60 ${className}`}
      >
        <svg
          className="absolute h-full w-full"
          fill="none"
          viewBox="0 0 696 316"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <g opacity="0.04">
            {pathData.map((d, i) => (
              <path key={`static-${i}`} d={d} stroke="currentColor" strokeWidth="0.5" className="text-[var(--text-primary)]" />
            ))}
          </g>
          {pathData.map((d, i) => (
            <motion.path
              key={`beam-${i}`}
              d={d}
              stroke={`url(#gradient-${i})`}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: animations[i].duration,
                delay: animations[i].delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
          <defs>
            {pathData.map((_, i) => (
              <linearGradient
                key={`gradient-${i}`}
                id={`gradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>
    );
  }
);
