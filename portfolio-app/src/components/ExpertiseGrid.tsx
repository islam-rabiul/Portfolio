import React from 'react';
import { motion } from 'framer-motion';
import { Code, Bot, BrainCircuit, Server } from 'lucide-react';

interface DomainCard {
  title: string;
  icon: any;
  desc: string;
  tags: string[];
  metric?: string;
  metricLabel?: string;
}

const DOMAINS: DomainCard[] = [
  {
    title: 'Full-Stack Web Engineering',
    icon: Code,
    desc: 'Crafting responsive, performant web applications with React.js, Express, and MongoDB. From pixel-perfect frontends to secure REST APIs and payment gateways.',
    tags: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'Tailwind'],
    metric: '< 50ms',
    metricLabel: 'Average API Latency',
  },
  {
    title: 'AI & n8n Workflow Automations',
    icon: Bot,
    desc: 'Designing intelligent self-running automation pipelines using n8n and Gemini AI. I convert complex customer support and data processes into automated workflows.',
    tags: ['n8n', 'Gemini AI API', 'Webhooks', 'Sentiment Analysis', 'JSON Routing'],
    metric: '85%',
    metricLabel: 'Manual Workload Reduction',
  },
  {
    title: 'Machine Learning & Computer Vision',
    icon: BrainCircuit,
    desc: 'Building and evaluating predictive data models with Python and Scikit-learn, alongside image processing and spatial manipulation algorithms via OpenCV.',
    tags: ['Python', 'Scikit-learn', 'Random Forest', 'OpenCV', 'Predictive Modeling'],
    metric: '97%',
    metricLabel: 'Lung Cancer Model Accuracy',
  },
  {
    title: 'Scalable Backend & Cloud Deployment',
    icon: Server,
    desc: 'Architecting modular backends with JWT authentication, custom middleware, MongoDB schemas, and reliable Vercel/Render production deployments.',
    tags: ['REST APIs', 'Node.js', 'Mongoose', 'Vercel', 'Postman', 'Git/GitHub'],
    metric: '99.9%',
    metricLabel: 'Production Uptime',
  },
];

export const ExpertiseGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {DOMAINS.map((domain, index) => {
        const Icon = domain.icon;
        return (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 rounded-3xl bg-[var(--bg-secondary)]/80 border border-[var(--border-light)] hover:border-[var(--accent-color)] transition-all duration-500 shadow-xl group flex flex-col justify-between"
          >
            <div>
              {/* Header Icon + Metric Pill */}
              <div className="flex items-center justify-between mb-6">
                <span className="p-3.5 rounded-2xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] group-hover:bg-[var(--accent-color)] group-hover:text-[var(--bg-primary)] transition-all duration-300 shadow-md">
                  <Icon className="w-6 h-6" />
                </span>

                {domain.metric && (
                  <div className="text-right">
                    <span className="font-['Playfair_Display',serif] font-extrabold text-2xl text-[var(--accent-color)] block leading-none">
                      {domain.metric}
                    </span>
                    <span className="text-[10px] font-['Outfit'] uppercase text-[var(--text-tertiary)] tracking-wider">
                      {domain.metricLabel}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-['Playfair_Display',serif] font-bold text-2xl text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                {domain.title}
              </h3>

              <p className="text-sm font-['Outfit'] font-light text-[var(--text-secondary)] leading-relaxed mb-6">
                {domain.desc}
              </p>
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-light)]">
              {domain.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-light)] font-['Outfit'] text-xs font-semibold uppercase text-[var(--text-secondary)] tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
