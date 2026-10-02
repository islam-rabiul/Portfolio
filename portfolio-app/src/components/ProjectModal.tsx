import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Award } from 'lucide-react';

export interface ProjectItem {
  title: string;
  client: string;
  category: string;
  desc: string;
  fullDesc?: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  highlights?: string[];
  github: string;
  demo?: string;
  image: string;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl my-8 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Banner Image */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)]/40 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-6 left-6 bg-[var(--accent-color)] text-[var(--bg-primary)] px-4 py-1.5 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-widest shadow-lg">
              {project.category}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-[var(--bg-primary)]/80 text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 backdrop-blur-md shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-10 flex flex-col gap-6">
            <div>
              <span className="text-xs font-['Outfit'] font-semibold uppercase tracking-widest text-[var(--accent-color)] block mb-1">
                {project.client}
              </span>
              <h2 className="font-['Playfair_Display',serif] font-bold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
                {project.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-[var(--text-secondary)] font-['Outfit'] font-light leading-relaxed text-sm sm:text-base">
              {project.fullDesc || project.desc}
            </p>

            {/* Key Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2 border-y border-[var(--border-light)]">
                {project.metrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[var(--bg-tertiary)]/60 border border-[var(--border-light)] text-center">
                    <span className="block font-['Playfair_Display',serif] font-bold text-2xl text-[var(--accent-color)]">
                      {m.value}
                    </span>
                    <span className="text-xs font-['Outfit'] text-[var(--text-tertiary)] uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="font-['Outfit'] font-bold text-xs uppercase tracking-widest text-[var(--text-tertiary)] mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[var(--accent-color)]" />
                  Key Achievements &amp; Architecture
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] font-['Outfit']">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-color)] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-xs uppercase tracking-widest text-[var(--text-tertiary)] mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[var(--accent-color)]" />
                Technologies Employed
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-light)] text-[var(--text-primary)] font-['Outfit'] font-semibold text-xs uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--border-light)]">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-['Outfit'] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg"
              >
                <Github className="w-4 h-4" /> View Source Code
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--text-primary)] text-[var(--text-primary)] font-['Outfit'] font-bold text-xs uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" /> Live Preview
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
