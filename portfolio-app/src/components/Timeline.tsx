import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

interface TimelineEntry {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: 'work' | 'education' | 'certification';
  details: string[];
  skills: string[];
}

const TIMELINE_DATA: TimelineEntry[] = [
  {
    period: '2023 - Present',
    role: 'Full-Stack & AI Solutions Developer',
    organization: 'Independent Engineering & Consulting',
    location: 'Remote / Worldwide',
    type: 'work',
    details: [
      'Engineered automated customer service agents combining n8n workflows with Gemini AI for sentiment routing and multi-channel ticket resolution.',
      'Developed full-stack web applications featuring React frontend, Express/Node backend, MongoDB, and secure payment gateway integration.',
      'Trained and deployed machine learning classification models with 97%+ accuracy using Python and Scikit-learn.',
    ],
    skills: ['React.js', 'Node.js', 'n8n', 'Gemini AI', 'Python', 'MongoDB'],
  },
  {
    period: '2023 - 2024',
    role: 'AI & Machine Learning Research Projects',
    organization: 'Open Source & AI Innovations',
    location: 'Prayagraj, UP, India',
    type: 'work',
    details: [
      'Built predictive medical diagnosis pipeline for lung cancer detection utilizing Random Forest algorithms.',
      'Created computer vision image processing algorithms and spatial transformation pipelines with OpenCV.',
    ],
    skills: ['Python', 'Scikit-learn', 'Random Forest', 'OpenCV'],
  },
  {
    period: '2023',
    role: 'Advanced Engineering Workshop & Certification',
    organization: 'Indian Institute of Information Technology (IIIT) Allahabad',
    location: 'Allahabad, UP',
    type: 'education',
    details: [
      'Specialized hands-on coursework and practical training in advanced computing, machine learning algorithms, and system design principles.',
    ],
    skills: ['Machine Learning', 'Data Structures', 'Algorithms'],
  },
  {
    period: '2022',
    role: 'Technical Program Training & Certification',
    organization: 'Army Institute of Technology (AIT)',
    location: 'India',
    type: 'education',
    details: [
      'Completed rigorous engineering problem-solving modules and technical execution standards.',
    ],
    skills: ['Software Engineering', 'System Design'],
  },
  {
    period: '2022 - 2023',
    role: 'Full-Stack Web Development Certification',
    organization: 'Udemy Professional Credentials',
    location: 'Online',
    type: 'certification',
    details: [
      'Mastered end-to-end web architecture, RESTful microservices, state management, and modern UI performance optimization.',
    ],
    skills: ['React', 'Express', 'MongoDB', 'Node.js'],
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="w-full relative pl-6 sm:pl-8 border-l-2 border-[var(--border-light)] space-y-12">
      {TIMELINE_DATA.map((entry, index) => {
        const Icon = entry.type === 'work' ? Briefcase : entry.type === 'education' ? GraduationCap : Award;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-10 h-10 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-color)] text-[var(--accent-color)] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[var(--accent-color)] group-hover:text-[var(--bg-primary)] transition-all duration-300">
              <Icon className="w-4 h-4" />
            </div>

            {/* Content Card */}
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)]/80 border border-[var(--border-light)] hover:border-[var(--accent-color)]/50 transition-all duration-300 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-xs font-['Outfit'] font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.period}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-tertiary)] font-['Outfit']">
                  <MapPin className="w-3.5 h-3.5" />
                  {entry.location}
                </span>
              </div>

              <h3 className="font-['Playfair_Display',serif] font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-1">
                {entry.role}
              </h3>
              <p className="text-sm font-['Outfit'] font-semibold text-[var(--accent-color)] mb-4">
                {entry.organization}
              </p>

              <ul className="space-y-2 mb-4">
                {entry.details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-sm text-[var(--text-secondary)] font-['Outfit'] font-light leading-relaxed flex items-start gap-2">
                    <span className="text-[var(--accent-color)] font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-light)]">
                {entry.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded bg-[var(--bg-tertiary)] text-[11px] font-['Outfit'] font-semibold text-[var(--text-secondary)] uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
