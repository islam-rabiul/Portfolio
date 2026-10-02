import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Award, BookOpen, Lightbulb, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AboutTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'certifications' | 'philosophy'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'philosophy', label: 'Engineering Philosophy', icon: Lightbulb },
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Tab Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-['Outfit'] font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xl scale-105'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-secondary)]/80 border border-[var(--border-light)] shadow-2xl backdrop-blur-md">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row items-center gap-10"
            >
              <div className="flex-1 space-y-5">
                <h3 className="font-['Playfair_Display',serif] font-bold text-2xl sm:text-3xl text-[var(--text-primary)]">
                  Engineering Solutions at the Intersection of Full-Stack &amp; Artificial Intelligence
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-['Outfit'] font-light leading-relaxed">
                  I'm Mohammad Rabiul Islam — a developer and AI practitioner with a deep passion for building scalable full-stack web applications and autonomous AI automation pipelines.
                </p>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-['Outfit'] font-light leading-relaxed">
                  Whether crafting high-speed React user interfaces, engineering Node.js REST APIs, or training Random Forest predictive models, I focus on clean architecture, efficiency, and real-world results.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-light)]">
                  <div>
                    <span className="block font-['Playfair_Display',serif] font-bold text-3xl text-[var(--accent-color)]">100%</span>
                    <span className="text-xs font-['Outfit'] uppercase text-[var(--text-tertiary)] tracking-wider">Commitment to Quality</span>
                  </div>
                  <div>
                    <span className="block font-['Playfair_Display',serif] font-bold text-3xl text-[var(--accent-color)]">97%</span>
                    <span className="text-xs font-['Outfit'] uppercase text-[var(--text-tertiary)] tracking-wider">ML Model Accuracy</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-80 h-80 rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-xl relative group">
                <img
                  src="/assets/Profileicon.jpeg"
                  alt="Mohammad Rabiul Islam"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-['Outfit'] font-bold text-white uppercase tracking-wider">Mohammad Rabiul Islam</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 rounded-2xl bg-[var(--bg-tertiary)]/60 border border-[var(--border-light)] space-y-3">
                <ShieldCheck className="w-8 h-8 text-[var(--accent-color)]" />
                <h4 className="font-['Playfair_Display',serif] font-bold text-lg text-[var(--text-primary)]">IIIT Allahabad Certification</h4>
                <p className="text-xs font-['Outfit'] text-[var(--text-secondary)] leading-relaxed">
                  Indian Institute of Information Technology, Allahabad — Advanced computing and machine learning workshops.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--bg-tertiary)]/60 border border-[var(--border-light)] space-y-3">
                <Award className="w-8 h-8 text-[var(--accent-color)]" />
                <h4 className="font-['Playfair_Display',serif] font-bold text-lg text-[var(--text-primary)]">Army Institute of Technology (AIT)</h4>
                <p className="text-xs font-['Outfit'] text-[var(--text-secondary)] leading-relaxed">
                  AIT Technical Program Training — Software engineering fundamentals and practical systems design.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--bg-tertiary)]/60 border border-[var(--border-light)] space-y-3">
                <BookOpen className="w-8 h-8 text-[var(--accent-color)]" />
                <h4 className="font-['Playfair_Display',serif] font-bold text-lg text-[var(--text-primary)]">Udemy Full-Stack Web Dev</h4>
                <p className="text-xs font-['Outfit'] text-[var(--text-secondary)] leading-relaxed">
                  Comprehensive React, Node.js, Express, and MongoDB web development credentials.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'philosophy' && (
            <motion.div
              key="philosophy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-['Playfair_Display',serif] font-bold text-2xl text-[var(--text-primary)]">
                Core Engineering Principles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-tertiary)]/50 border border-[var(--border-light)]">
                  <CheckCircle2 className="w-6 h-6 text-[var(--accent-color)] flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-['Outfit'] font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider mb-1">
                      Simplicity Over Complexity
                    </h5>
                    <p className="text-xs text-[var(--text-secondary)] font-['Outfit'] leading-relaxed">
                      Clean code with clear separation of concerns wins every time over convoluted cleverness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-tertiary)]/50 border border-[var(--border-light)]">
                  <CheckCircle2 className="w-6 h-6 text-[var(--accent-color)] flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-['Outfit'] font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider mb-1">
                      Automation First Mindset
                    </h5>
                    <p className="text-xs text-[var(--text-secondary)] font-['Outfit'] leading-relaxed">
                      If a task can be automated reliably with n8n or AI models, automate it to save hundreds of human hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-tertiary)]/50 border border-[var(--border-light)]">
                  <CheckCircle2 className="w-6 h-6 text-[var(--accent-color)] flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-['Outfit'] font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider mb-1">
                      Pixel-Perfect UX &amp; Accessibility
                    </h5>
                    <p className="text-xs text-[var(--text-secondary)] font-['Outfit'] leading-relaxed">
                      Interfaces should delight users immediately with responsiveness, accessibility, and high performance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-tertiary)]/50 border border-[var(--border-light)]">
                  <CheckCircle2 className="w-6 h-6 text-[var(--accent-color)] flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-['Outfit'] font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider mb-1">
                      Continuous Empirical Testing
                    </h5>
                    <p className="text-xs text-[var(--text-secondary)] font-['Outfit'] leading-relaxed">
                      Validate APIs, ML metrics, and UI flows with thorough testing before deployment.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
