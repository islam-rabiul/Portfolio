import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Server, Brain, Database } from 'lucide-react';

export interface SkillItem {
  name: string;
  level: number; // percentage
  category: 'frontend' | 'backend' | 'aiml' | 'devops';
  years: number;
  note?: string;
}

const SKILL_DATA: SkillItem[] = [
  { name: 'React.js', level: 90, category: 'frontend', years: 3, note: 'Hooks, Context, Modern UI, Custom Components' },
  { name: 'TypeScript', level: 85, category: 'frontend', years: 2, note: 'Strict typing, Generics, Interfaces' },
  { name: 'JavaScript (ES6+)', level: 92, category: 'frontend', years: 4, note: 'Async/Await, DOM, Event loop' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', years: 3, note: 'Design systems, Glassmorphism, Responsive UIs' },
  { name: 'HTML5 & CSS3', level: 95, category: 'frontend', years: 4, note: 'Semantic HTML, Accessibility, Keyframes' },
  
  { name: 'Node.js', level: 88, category: 'backend', years: 3, note: 'Event-driven server architecture, Async I/O' },
  { name: 'Express.js', level: 88, category: 'backend', years: 3, note: 'REST APIs, Middleware, JWT Security' },
  { name: 'Python', level: 90, category: 'backend', years: 3, note: 'Data structures, Automation, Machine Learning' },
  { name: 'RESTful APIs', level: 92, category: 'backend', years: 3, note: 'API Design, Swagger/Postman, Auth' },

  { name: 'Machine Learning', level: 85, category: 'aiml', years: 2, note: 'Classification, Scikit-learn, Random Forest' },
  { name: 'n8n Automations', level: 92, category: 'aiml', years: 2, note: 'AI workflows, Webhooks, Sentiment routing' },
  { name: 'Gemini AI API', level: 90, category: 'aiml', years: 2, note: 'Prompt engineering, Function calling, LLMs' },
  { name: 'OpenCV', level: 80, category: 'aiml', years: 2, note: 'Image processing, Computer vision filters' },

  { name: 'MongoDB & Mongoose', level: 86, category: 'devops', years: 3, note: 'Document modeling, Aggregations, Atlas' },
  { name: 'Git & GitHub', level: 92, category: 'devops', years: 4, note: 'Version control, Branching, Pull requests' },
  { name: 'Postman & API Testing', level: 90, category: 'devops', years: 3, note: 'End-to-end endpoint verification' },
  { name: 'Vercel & Cloud Deploy', level: 88, category: 'devops', years: 3, note: 'Production builds, Serverless functions' },
];

export const SkillsMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'aiml' | 'devops'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Stack', icon: Code2 },
    { id: 'frontend', label: 'Frontend', icon: Code2 },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'aiml', label: 'AI & ML', icon: Brain },
    { id: 'devops', label: 'Databases & Tools', icon: Database },
  ];

  const filteredSkills = SKILL_DATA.filter((skill) => {
    const matchesCategory = activeTab === 'all' || skill.category === activeTab;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (skill.note && skill.note.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Category Tabs + Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-['Outfit'] font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--accent-color)] text-[var(--bg-primary)] shadow-lg scale-105'
                    : 'bg-[var(--bg-tertiary)]/60 text-[var(--text-secondary)] border border-[var(--border-light)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl pl-10 pr-4 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors"
          />
        </div>
      </div>

      {/* Skills Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="p-5 rounded-2xl bg-[var(--bg-secondary)]/80 border border-[var(--border-light)] hover:border-[var(--accent-color)]/50 transition-all duration-300 shadow-md group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <span className="font-['Playfair_Display',serif] font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors">
                  {skill.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[10px] font-['Outfit'] text-[var(--text-tertiary)] uppercase font-semibold">
                  {skill.years} {skill.years === 1 ? 'Year' : 'Years'} Exp
                </span>
              </div>
              <span className="font-['Outfit'] font-extrabold text-sm text-[var(--accent-color)]">
                {skill.level}%
              </span>
            </div>

            {/* Progress meter bar */}
            <div className="w-full h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent-color)] to-indigo-500"
              />
            </div>

            {skill.note && (
              <p className="text-xs text-[var(--text-secondary)] font-['Outfit'] font-light">
                {skill.note}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
