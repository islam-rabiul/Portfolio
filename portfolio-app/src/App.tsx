import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, Code, Brain,
  Menu, X, Download, ChevronDown, Award, GraduationCap,
  Globe, Database, Cpu, Wrench, BookOpen, Star, Terminal, Zap,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════════════ */

const ROLES = [
  'AI & ML Engineer',
  'Full Stack Developer',
  'React Developer',
  'Python Developer',
  'Problem Solver',
];

const skills: { category: string; icon: React.ReactNode; color: string; items: string[] }[] = [
  { category: 'Languages',        icon: <Terminal className="w-5 h-5" />, color: 'from-violet-500 to-indigo-500',  items: ['C', 'C++', 'Python'] },
  { category: 'Web & Frameworks', icon: <Globe    className="w-5 h-5" />, color: 'from-cyan-500 to-blue-500',     items: ['React.js', 'Node.js', 'Express.js'] },
  { category: 'Databases',        icon: <Database className="w-5 h-5" />, color: 'from-emerald-500 to-teal-500', items: ['MongoDB', 'MySQL'] },
  { category: 'AI & Automation',  icon: <Brain    className="w-5 h-5" />, color: 'from-pink-500 to-rose-500',    items: ['n8n', 'Gemini API', 'AI Agents', 'Machine Learning'] },
  { category: 'Concepts',         icon: <Cpu      className="w-5 h-5" />, color: 'from-amber-500 to-orange-500', items: ['OOP', 'REST APIs', 'ML Algorithms', 'DSA'] },
  { category: 'Tools',            icon: <Wrench   className="w-5 h-5" />, color: 'from-slate-500 to-gray-400',   items: ['Postman', 'GitHub', 'Git'] },
];

const projects = [
  {
    title: 'Customer Support AI Agent',
    description: 'Automated customer support system using n8n workflows and Gemini AI for sentiment analysis, auto-routing tickets and storing structured feedback in a database.',
    tech: ['n8n', 'Gemini AI', 'Node.js', 'MongoDB', 'REST APIs'],
    github: 'https://github.com/islam-rabiul',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-violet-600 to-indigo-600',
    highlights: ['Gemini AI sentiment analysis', 'Auto-routing workflow', 'Structured feedback DB', 'Webhook integration'],
    image: '/assets/ai_agent_project.png',
    type: 'AI / Automation',
  },
  {
    title: 'Ecommerce Store',
    description: 'Full-stack e-commerce platform with React.js frontend, Node.js/Express backend, JWT-based role-based access control, Razorpay payment gateway and Vercel deployment.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'JWT'],
    github: 'https://github.com/islam-rabiul',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-cyan-600 to-blue-600',
    highlights: ['RBAC with JWT', 'Razorpay payment gateway', 'Full CRUD operations', 'Deployed on Vercel'],
    image: '/assets/ecommerce_project.png',
    type: 'Full Stack',
  },
  {
    title: 'Lung Cancer Detection (ML)',
    description: 'Machine learning model achieving 97% accuracy for detecting level of lung cancer using Random Forest with dimensionality reduction and feature scaling techniques.',
    tech: ['Python', 'Scikit-learn', 'Random Forest', 'NumPy', 'Pandas'],
    github: 'https://github.com/islam-rabiul/Machine-Learning-Projects',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-pink-600 to-rose-600',
    highlights: ['97% accuracy', 'Random Forest classifier', 'PCA dimensionality reduction', 'Feature scaling'],
    image: '/assets/lungcancer.jpg',
    type: 'Machine Learning',
  },
];

const education = [
  { degree: 'B.Tech – Artificial Intelligence & Machine Learning', institution: 'United College of Engineering & Research, Prayagraj (AKTU Lucknow)', duration: '2022 – 2026', score: '73.8%', icon: <GraduationCap className="w-5 h-5" /> },
  { degree: 'Intermediate – CBSE', institution: 'Ewing Christian Public Senior Secondary School, Prayagraj', duration: 'Completed 2021', score: '74.2%', icon: <BookOpen className="w-5 h-5" /> },
  { degree: 'Matriculate – CBSE', institution: 'Ewing Christian Public Senior Secondary School, Prayagraj', duration: 'Completed 2019', score: '75%', icon: <Star className="w-5 h-5" /> },
];

const certificates = [
  { title: 'Innovation Camp', description: 'Hands-on innovation camp focused on emerging AI technologies and international collaboration.', image: '/assets/Ait (1).jpeg', issuer: 'AIT Bangkok', date: 'Sep – Oct 2025', tag: 'AI & Innovation' },
  { title: 'AI & Robotics Program', description: "Advanced training in Artificial Intelligence, robotics and automation at one of India's top institutions.", image: '/assets/IIITA (1).jpeg', issuer: 'IIIT Allahabad', date: 'Aug – Sep 2024', tag: 'AI & Robotics' },
  { title: 'Machine Learning with Python', description: 'Comprehensive machine learning course covering algorithms, model evaluation, and real-world applications.', image: '/assets/udemy_page-0001 (1).jpg', issuer: 'Udemy', date: 'Sep – Oct 2023', tag: 'Machine Learning' },
];

/* ══════════════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ══════════════════════════════════════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
  }),
};

/* ══════════════════════════════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════════════════════════════ */

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length)     timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    else if (!deleting && charIdx === current.length) timeout = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)              timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    else if (deleting && charIdx === 0)            { setDeleting(false); setWordIdx(w => (w + 1) % words.length); }
    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

/* ══════════════════════════════════════════════════════════════════════════════
   CUSTOM CURSOR
   ══════════════════════════════════════════════════════════════════════════════ */

const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafId   = useRef<number>(0);

  useEffect(() => {
    const dot    = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t && t.closest('a, button, [data-cursor]')) {
        ringEl.classList.add('cursor-ring-grow');
      } else {
        ringEl.classList.remove('cursor-ring-grow');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   BOOT LOADER
   ══════════════════════════════════════════════════════════════════════════════ */

const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [lines, setLines] = useState<{ text: string; gold?: boolean; spacer?: boolean }[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const boot = [
      { text: '> INITIALIZING  RABIUL.PORTFOLIO  v2.0 ...' },
      { text: '> LOADING AI & ML ENGINE ............... [OK]' },
      { text: '> LOADING FULLSTACK MODULES ............ [OK]' },
      { text: '> ESTABLISHING GITHUB CONNECTION ....... [OK]' },
      { text: '> RUNNING SYSTEM DIAGNOSTICS ........... [OK]' },
      { text: '> ENCRYPTING CREATIVITY.exe ............ [OK]' },
      { text: '', spacer: true },
      { text: '> ALL SYSTEMS OPERATIONAL.', gold: true },
      { text: '> WELCOME, RECRUITER.', gold: true },
    ];

    boot.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === boot.length - 1) {
          setTimeout(() => setFading(true), 550);
          setTimeout(() => onDone(), 1150);
        }
      }, i * 295 + 250);
    });
  }, [onDone]);

  return (
    <motion.div
      className="loader-screen"
      animate={fading ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="loader-terminal">
        <div className="loader-header">
          <span className="loader-dot red"    />
          <span className="loader-dot yellow" />
          <span className="loader-dot green"  />
          <span className="loader-title">portfolio_boot.sh — zsh</span>
        </div>
        <div className="loader-body">
          {lines.map((line, i) =>
            line.spacer ? (
              <div key={i} className="loader-spacer" />
            ) : (
              <div
                key={i}
                className={line.gold ? 'loader-line loader-line-gold' : 'loader-line'}
              >
                {line.text}
              </div>
            )
          )}
          {!fading && <span className="cursor-blink loader-cursor">█</span>}
        </div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   GLITCH TEXT
   ══════════════════════════════════════════════════════════════════════════════ */

const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <span className={`glitch ${className}`} data-text={text}>{text}</span>
);

/* ══════════════════════════════════════════════════════════════════════════════
   3D TILT CARD
   ══════════════════════════════════════════════════════════════════════════════ */

const TiltCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({
  children, className = '', onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -10;
    const rotY = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  10;
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    el.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      ref.current.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease';
    }
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   STAT COUNTER
   ══════════════════════════════════════════════════════════════════════════════ */

const StatCounter: React.FC<{
  value: number; suffix?: string; label: string; icon: React.ReactNode;
}> = ({ value, suffix = '', label, icon }) => {
  const [count, setCount] = useState(0);
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 55;
        const inc   = value / steps;
        let cur     = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= value) { setCount(value); clearInterval(t); }
          else               setCount(Math.floor(cur));
        }, 28);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   TERMINAL WINDOW  (About section)
   ══════════════════════════════════════════════════════════════════════════════ */

type TLine =
  | { t: 'cmd';    text: string }
  | { t: 'out';    text: string }
  | { t: 'log';    hash: string; msg: string }
  | { t: 'status'; text: string }
  | { t: 'spacer' };

const TERM_LINES: TLine[] = [
  { t: 'cmd',    text: 'whoami' },
  { t: 'out',    text: 'Mohammad Rabiul Islam' },
  { t: 'out',    text: 'B.Tech AI & ML  ·  Prayagraj, India' },
  { t: 'spacer' },
  { t: 'cmd',    text: 'cat passions.txt' },
  { t: 'out',    text: '→  Building ML models with real-world impact' },
  { t: 'out',    text: '→  Crafting full-stack apps end-to-end' },
  { t: 'out',    text: '→  Exploring AI automation with n8n & Gemini' },
  { t: 'spacer' },
  { t: 'cmd',    text: 'git log --oneline' },
  { t: 'log',    hash: 'a7f2c1d', msg: 'Customer Support AI Agent (n8n + Gemini)' },
  { t: 'log',    hash: '3e9f2a8', msg: 'E-commerce Platform (React + Razorpay)' },
  { t: 'log',    hash: '9b2c4d1', msg: 'Lung Cancer ML — 97% accuracy' },
  { t: 'spacer' },
  { t: 'cmd',    text: 'echo $STATUS' },
  { t: 'status', text: '🟢  OPEN TO OPPORTUNITIES' },
];

const TerminalWindow: React.FC = () => {
  const [visible, setVisible] = useState(0);
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        TERM_LINES.forEach((_, i) =>
          setTimeout(() => setVisible(i + 1), i * 115 + 350)
        );
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const renderLine = (line: TLine, i: number) => {
    switch (line.t) {
      case 'spacer':
        return <div key={i} style={{ height: '10px' }} />;
      case 'cmd':
        return (
          <div key={i} className="t-cmd">
            <span className="t-prompt">rabiul@portfolio</span>
            <span className="t-colon">:</span>
            <span className="t-tilde">~</span>
            <span className="t-dollar" style={{ marginLeft: 4 }}>$ </span>
            <span style={{ color: '#fde68a' }}>{line.text}</span>
          </div>
        );
      case 'out':
        return <div key={i} className="t-output">{line.text}</div>;
      case 'log':
        return (
          <div key={i} className="t-output" style={{ display: 'flex' }}>
            <span className="t-hash">{line.hash}</span>
            <span>{line.msg}</span>
          </div>
        );
      case 'status':
        return (
          <div key={i} className="t-output" style={{ color: '#4ade80', fontWeight: 700, marginTop: 4 }}>
            {line.text}
          </div>
        );
    }
  };

  return (
    <div ref={ref} className="terminal-window">
      <div className="terminal-header-bar">
        <span className="t-dot red"    />
        <span className="t-dot yellow" />
        <span className="t-dot green"  />
        <span className="terminal-title">rabiul@portfolio — ~</span>
      </div>
      <div className="terminal-body">
        {TERM_LINES.slice(0, visible).map((line, i) => renderLine(line, i))}
        <span className="cursor-blink" style={{ color: '#f4c430', fontSize: '0.85rem' }}>█</span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   SECTION WRAPPER / TITLE
   ══════════════════════════════════════════════════════════════════════════════ */

const Section: React.FC<{
  id: string; children: React.ReactNode; className?: string; style?: React.CSSProperties;
}> = ({ id, children, className = '', style }) => (
  <section id={id} className={`py-24 px-4 sm:px-6 lg:px-8 ${className}`} style={style}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl sm:text-5xl font-bold inline-block section-title">
      <span className="gradient-text">{children}</span>
    </h2>
  </motion.div>
);

/* ══════════════════════════════════════════════════════════════════════════════
   PROJECT DETAIL MODAL
   ══════════════════════════════════════════════════════════════════════════════ */

const ProjectModal: React.FC<{
  project: (typeof projects)[0] | null; onClose: () => void;
}> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else         document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 modal-backdrop" />
          <motion.div
            className="relative glass-card max-w-lg w-full overflow-hidden z-10"
            style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.6)' }}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-r ${project.color} p-6 relative`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <X className="w-4 h-4 force-white" style={{ color: 'white' }} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center" style={{ color: 'white' }}>
                  {project.icon}
                </div>
                <span className="text-sm font-medium px-3 py-1 bg-white/15 rounded-full" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {project.type}
                </span>
              </div>
              <h3 className="text-xl font-bold mt-1" style={{ color: 'white' }}>{project.title}</h3>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-slate-300 leading-relaxed">{project.description}</p>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#92650a' }}>
                  Key Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(180,132,11,0.1)', border: '1px solid rgba(180,132,11,0.32)' }}>
                        <Zap className="w-3 h-3" style={{ color: '#92650a' }} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#92650a' }}>
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => <span key={i} className="skill-badge">{t}</span>)}
                </div>
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 text-sm w-full justify-center"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   CERTIFICATE MODAL
   ══════════════════════════════════════════════════════════════════════════════ */

const CertModal: React.FC<{
  cert: (typeof certificates)[0] | null; onClose: () => void;
}> = ({ cert, onClose }) => {
  useEffect(() => {
    if (cert) document.body.style.overflow = 'hidden';
    else      document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [cert]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 modal-backdrop" />
          <motion.div
            className="relative z-10 max-w-2xl w-full"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="glass-card overflow-hidden">
              <div className="relative">
                <img src={cert.image} alt={cert.title} className="w-full object-contain max-h-[70vh]" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur"
                >
                  <X className="w-5 h-5" style={{ color: 'white' }} />
                </button>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{cert.title}</p>
                  <p className="text-slate-400 text-sm">{cert.issuer} · {cert.date}</p>
                </div>
                <a href={cert.image} target="_blank" rel="noopener noreferrer" className="social-icon">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════════════════════ */

const App: React.FC = () => {
  const [isMenuOpen,      setIsMenuOpen]      = useState(false);
  const [scrolled,        setScrolled]        = useState(false);
  const [activeSection,   setActiveSection]   = useState('home');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [selectedCert,    setSelectedCert]    = useState<(typeof certificates)[0] | null>(null);
  const [loaded,          setLoaded]          = useState(false);

  const role = useTypewriter(ROLES);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handle = () => {
      setScrolled(window.scrollY > 40);
      const ids = ['home', 'about', 'projects', 'skills', 'certificates', 'contact'];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const navLinks = [
    { href: '#home',         label: 'Home' },
    { href: '#about',        label: 'About' },
    { href: '#projects',     label: 'Projects' },
    { href: '#skills',       label: 'Skills' },
    { href: '#certificates', label: 'Certs' },
    { href: '#contact',      label: 'Contact' },
  ];

  return (
    <>
      {/* ── Custom cursor (desktop only) ── */}
      <CustomCursor />

      {/* ── Boot loader ── */}
      <AnimatePresence>
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* ── Main portfolio ── */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ background: 'var(--color-bg)', color: '#111827' }}
          className="min-h-screen light-mode"
        >
          {/* Scroll progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
            style={{
              scaleX,
              background: 'linear-gradient(90deg, #f4c430, #e8a020, #7c3aed, #0dddd4)',
              boxShadow: '0 0 12px rgba(244,196,48,0.7)',
            }}
          />

          {/* ─────────────────────────────────────────────────────────────────
              NAVIGATION
          ───────────────────────────────────────────────────────────────────── */}
          <motion.nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="text-xl font-bold font-['Space_Grotesk'] gradient-text tracking-tight select-none"
                >
                  RI.
                </motion.div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center space-x-6">
                  {navLinks.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`nav-link ${activeSection === link.href.slice(1) ? '!text-amber-700' : ''}`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="/assets/Resume.pdf"
                    download="Rabiul_Islam_Resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow text-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </a>
                </div>

                {/* Mobile toggle */}
                <button
                  id="mobile-menu-toggle"
                  className="md:hidden social-icon"
                  onClick={() => setIsMenuOpen(v => !v)}
                  aria-label="Toggle navigation menu"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden nav-glass border-t border-yellow-400/10"
                >
                  <div className="px-4 py-4 flex flex-col gap-3">
                    {navLinks.map(link => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="nav-link py-2 text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                    <a
                      href="/assets/Resume.pdf"
                      download="Rabiul_Islam_Resume"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow text-sm flex items-center justify-center gap-2 mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Download className="w-4 h-4" />
                      Download Resume
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* ═══════════════════════════════════════════════════════════════════
              HERO — SPLIT LAYOUT
          ══════════════════════════════════════════════════════════════════════ */}
          <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20"
          >
            {/* Background elements */}
            <div className="star-bg" />
            <div className="orb w-[600px] h-[600px] -top-32 -left-64"
              style={{ background: 'rgba(196,144,16,0.12)', animationDelay: '0s' }} />
            <div className="orb w-[700px] h-[700px] -bottom-20 -right-80"
              style={{ background: 'rgba(109,40,217,0.08)', animationDelay: '4s' }} />
            <div className="orb w-72 h-72 top-1/2 left-1/3"
              style={{ background: 'rgba(8,145,178,0.07)', animationDelay: '2s' }} />

            {/* Subtle gold grid */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(180,132,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(180,132,11,1) 1px, transparent 1px)',
                backgroundSize: '68px 68px',
              }}
            />

            <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-12 xl:gap-20 items-center min-h-screen py-32">

              {/* ── Left column ── */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
              >
                {/* Available badge */}
                <motion.div variants={fadeUp} custom={0}>
                  <span className="available-badge">
                    <span className="available-pulse" />
                    Available for opportunities
                  </span>
                </motion.div>

                {/* Name — glitch effect */}
                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-[0.95]"
                >
                  <GlitchText text="RABIUL" className="gradient-text block" />
                  <GlitchText text="ISLAM"  className="gradient-text block" />
                </motion.h1>

                {/* Typewriter role */}
                <motion.div variants={fadeUp} custom={2}>
                  <p className="text-xl sm:text-2xl text-slate-300 font-medium h-9 flex items-center gap-1">
                    <span style={{ color: '#f4c430', fontSize: '1.1em', opacity: 0.9 }}>{'>'}</span>
                    <span className="ml-1">{role}</span>
                    <span className="cursor-blink ml-0.5" style={{ color: '#f4c430' }}>|</span>
                  </p>
                </motion.div>

                {/* Tagline */}
                <motion.p
                  variants={fadeUp}
                  custom={3}
                  className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg"
                  style={{ lineHeight: '1.8' }}
                >
                  Building intelligent systems and beautiful web experiences —{' '}
                  <span style={{ color: '#7a5200', fontWeight: 600 }}>from AI agents to full-stack applications.</span>
                </motion.p>

                {/* CTA buttons */}
                <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4">
                  <a href="#projects" className="btn-glow inline-flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    View My Work
                  </a>
                  <a
                    href="/assets/Resume.pdf"
                    download="Rabiul_Islam_Resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </motion.div>

                {/* Social icons */}
                <motion.div variants={fadeUp} custom={5} className="flex gap-3">
                  {[
                    { href: 'https://github.com/islam-rabiul',                      icon: <Github   className="w-5 h-5" />, label: 'GitHub'   },
                    { href: 'https://www.linkedin.com/in/mohammad-rabiul-islam/',   icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                    { href: 'mailto:islamrabi93@gmail.com',                          icon: <Mail     className="w-5 h-5" />, label: 'Email'    },
                  ].map(s => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="social-icon"
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* ── Right column — Photo + floating chips ── */}
              <motion.div
                variants={fadeUp}
                custom={2}
                initial="hidden"
                animate="visible"
                className="hidden lg:flex items-center justify-center"
              >
                <div className="relative w-[380px] h-[420px]">

                  {/* Floating skill chips */}
                  <div className="float-chip float-chip-1" style={{ top: '6%', right: '-16px' }}>
                    <Brain className="w-3.5 h-3.5" style={{ color: '#b8860b' }} />
                    AI &amp; ML
                  </div>
                  <div className="float-chip float-chip-2" style={{ top: '42%', left: '-38px' }}>
                    <Globe className="w-3.5 h-3.5" style={{ color: '#0891b2' }} />
                    Full Stack
                  </div>
                  <div className="float-chip float-chip-3" style={{ bottom: '24%', right: '-28px' }}>
                    <Terminal className="w-3.5 h-3.5" style={{ color: '#7c3aed' }} />
                    Python
                  </div>
                  <div className="float-chip float-chip-4" style={{ bottom: '4%', left: '-8px' }}>
                    <Zap className="w-3.5 h-3.5" style={{ color: '#b8860b' }} />
                    97% ML Accuracy
                  </div>

                  {/* Decorative orbit rings */}
                  <div
                    className="orbit-ring border border-yellow-400/10"
                    style={{ width: '290px', height: '290px', animation: 'floatOrb 14s ease-in-out infinite' }}
                  />
                  <div
                    className="orbit-ring border border-violet-600/20"
                    style={{ width: '356px', height: '356px', animation: 'floatOrb 18s ease-in-out infinite reverse' }}
                  />

                  {/* Profile photo */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="profile-ring-light float-anim" style={{ padding: '3px' }}>
                      <div className="rounded-full overflow-hidden w-52 h-52">
                        <img
                          src="/assets/rabiprofile.jpeg"
                          alt="Mohammad Rabiul Islam"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <span>Scroll</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              STAT COUNTERS
          ══════════════════════════════════════════════════════════════════════ */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {[
                  { value: 3,    suffix: '',  label: 'Projects Built',  icon: <Code          className="w-5 h-5" /> },
                  { value: 97,   suffix: '%', label: 'ML Accuracy',     icon: <Brain         className="w-5 h-5" /> },
                  { value: 5,    suffix: '+', label: 'Technologies',    icon: <Cpu           className="w-5 h-5" /> },
                  { value: 2026, suffix: '',  label: 'Graduating',      icon: <GraduationCap className="w-5 h-5" /> },
                ].map((s, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i}>
                    <StatCounter value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              ABOUT — TERMINAL + EDUCATION
          ══════════════════════════════════════════════════════════════════════ */}
          <Section id="about">
            <SectionTitle>About Me</SectionTitle>
            <div className="grid lg:grid-cols-2 gap-10 items-start">

              {/* Terminal window */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <TerminalWindow />
              </motion.div>

              {/* Education timeline */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="space-y-4"
              >
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: '#92650a' }}>
                  Education
                </h3>
                {education.map((edu, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="glass-card p-6 flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(244,196,48,0.1)', border: '1px solid rgba(244,196,48,0.2)', color: '#f4c430' }}
                      >
                        {edu.icon}
                      </div>
                      {i < education.length - 1 && (
                        <div
                          className="w-px flex-1 mt-3"
                          style={{ background: 'linear-gradient(to bottom, rgba(244,196,48,0.3), transparent)' }}
                        />
                      )}
                    </div>
                    <div className="pb-2">
                      <h4 className="font-bold text-white leading-snug mb-1">{edu.degree}</h4>
                      <p className="text-slate-400 text-sm mb-2">{edu.institution}</p>
                      <div className="flex gap-3 text-xs">
                        <span className="px-2 py-1 rounded-md text-slate-300" style={{ background: 'rgba(255,255,255,0.07)' }}>
                          {edu.duration}
                        </span>
                        <span className="px-2 py-1 rounded-md font-semibold" style={{ background: 'rgba(244,196,48,0.15)', color: '#f4c430' }}>
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Languages */}
                <motion.div variants={fadeUp} custom={3} className="glass-card p-6">
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: '#92650a' }}>
                    Languages
                  </h4>
                  <div className="flex gap-3">
                    {['English', 'Hindi'].map(lang => (
                      <span key={lang} className="skill-badge">{lang}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════════════════════════
              PROJECTS — 3D TILT CARDS
          ══════════════════════════════════════════════════════════════════════ */}
          <Section
            id="projects"
            style={{ background: 'linear-gradient(180deg, rgba(243,240,234,0) 0%, rgba(243,240,234,0.7) 100%)' }}
          >
            <SectionTitle>Projects</SectionTitle>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, i) => (
                <motion.div key={i} variants={scaleIn} custom={i} className="h-full">
                  <TiltCard onClick={() => setSelectedProject(project)} className="group h-full">

                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 project-overlay" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur border border-white/10 force-white" style={{ color: 'white' }}>
                          {project.type}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                          <ExternalLink className="w-4 h-4" style={{ color: 'white' }} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center text-white`}
                          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
                        >
                          {project.icon}
                        </div>
                        <h3 className="text-base font-bold leading-snug" style={{ color: '#111827' }}>{project.title}</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="skill-badge text-xs px-2 py-1">{t}</span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="skill-badge text-xs px-2 py-1">+{project.tech.length - 4}</span>
                        )}
                      </div>
                      <div className="text-sm font-semibold flex items-center gap-1.5 transition-colors" style={{ color: '#92650a' }}>
                        View Details
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* ═══════════════════════════════════════════════════════════════════
              SKILLS
          ══════════════════════════════════════════════════════════════════════ */}
          <Section
            id="skills"
            style={{ background: 'linear-gradient(180deg, rgba(243,240,234,0.7) 0%, rgba(243,240,234,0) 100%)' }}
          >
            <SectionTitle>Skills</SectionTitle>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {skills.map((group, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${group.color} flex items-center justify-center text-white`}
                      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
                    >
                      {group.icon}
                    </div>
                    <h3 className="font-bold text-sm tracking-wide" style={{ color: '#111827' }}>{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, j) => (
                      <motion.span
                        key={j}
                        className="skill-badge"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + j * 0.04, duration: 0.35 }}
                        whileHover={{ scale: 1.08 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* ═══════════════════════════════════════════════════════════════════
              CERTIFICATES — POLAROID STYLE
          ══════════════════════════════════════════════════════════════════════ */}
          <Section id="certificates">
            <SectionTitle>Certifications</SectionTitle>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {certificates.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  custom={i}
                  className="polaroid group"
                  onClick={() => setSelectedCert(cert)}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 project-overlay" />
                    <span
                      className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: 'rgba(180,132,11,0.12)', border: '1px solid rgba(180,132,11,0.28)', color: '#7a5200' }}
                    >
                      {cert.tag}
                    </span>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                        <ExternalLink className="w-4 h-4" style={{ color: 'white' }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold mb-1" style={{ color: '#111827' }}>{cert.title}</h3>
                    <p className="text-slate-400 text-sm mb-3 leading-relaxed">{cert.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold flex items-center gap-1.5" style={{ color: '#92650a' }}>
                        <Award className="w-3.5 h-3.5" />
                        {cert.issuer}
                      </span>
                      <span className="text-slate-500">{cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* ═══════════════════════════════════════════════════════════════════
              CONTACT
          ══════════════════════════════════════════════════════════════════════ */}
          <Section
            id="contact"
            style={{ background: 'linear-gradient(180deg, rgba(243,240,234,0) 0%, rgba(235,232,224,0.85) 100%)' }}
          >
            <div className="max-w-2xl mx-auto">
              <SectionTitle>Get In Touch</SectionTitle>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-10 text-center space-y-6 relative overflow-hidden"
              >
                {/* Decorative orbs */}
                <div
                  className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-30 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(244,196,48,0.6), transparent)', filter: 'blur(30px)' }}
                />
                <div
                  className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-25 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.6), transparent)', filter: 'blur(30px)' }}
                />

                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{
                      background: 'rgba(244,196,48,0.12)',
                      border: '1px solid rgba(244,196,48,0.25)',
                      boxShadow: '0 0 30px rgba(244,196,48,0.2)',
                    }}
                  >
                    <Mail className="w-8 h-8" style={{ color: '#92650a' }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#111827' }}>Let's Work Together</h3>
                  <p className="text-slate-400 leading-relaxed max-w-md mx-auto">
                    I'm actively seeking new opportunities in AI, ML, or full-stack development. Whether it's a project, internship, or job — I'd love to hear from you!
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <a href="mailto:islamrabi93@gmail.com" className="btn-glow inline-flex items-center gap-2 justify-center">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </a>
                  <a
                    href="/assets/Resume.pdf"
                    download="Rabiul_Islam_Resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex items-center gap-2 justify-center"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>

                <div className="relative z-10 flex justify-center gap-4 pt-2">
                  {[
                    { href: 'https://github.com/islam-rabiul',                    icon: <Github   className="w-5 h-5" />, label: 'GitHub'   },
                    { href: 'https://www.linkedin.com/in/mohammad-rabiul-islam/', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                  ].map(s => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="social-icon"
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </Section>

          {/* ── Footer ── */}
          <footer className="py-8 px-4 border-t" style={{ borderColor: 'rgba(180,132,11,0.14)' }}>
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-sm">
              <p>
                © 2026{' '}
                <span className="gradient-text font-semibold">Mohammad Rabiul Islam</span>
                . All rights reserved.
              </p>
              <p className="flex items-center gap-1.5">
                Built with <span style={{ color: '#b8860b' }}>♥</span> using React &amp; Framer Motion
              </p>
            </div>
          </footer>

          {/* ── Modals ── */}
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          <CertModal    cert={selectedCert}       onClose={() => setSelectedCert(null)}    />
        </motion.div>
      )}
    </>
  );
};

export default App;
