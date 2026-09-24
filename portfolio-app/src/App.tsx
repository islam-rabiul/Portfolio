import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Sun, Moon, Lock, ChevronDown, Github, Linkedin, Terminal, Plus, Trash2, Edit3, Search, CheckCircle, Clock, AlertCircle, X, RefreshCw } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    title: 'Customer Support AI Agent',
    client: 'AI Automation',
    category: 'AI / n8n',
    desc: 'Automated customer support system using n8n workflows and Gemini AI for sentiment analysis and routing.',
    tech: ['n8n', 'Gemini AI', 'Node.js', 'MongoDB'],
    github: 'https://github.com/islam-rabiul',
    image: '/assets/ai_agent_project.png',
  },
  {
    title: 'Ecommerce Store',
    client: 'Full Stack',
    category: 'Web Dev',
    desc: 'Full-stack platform with React.js frontend, Node.js/Express backend, and Razorpay.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Razorpay'],
    github: 'https://github.com/islam-rabiul',
    image: '/assets/ecommerce_project.png',
  },
  {
    title: 'Lung Cancer Detection',
    client: 'Machine Learning',
    category: 'ML / Python',
    desc: 'Machine learning model achieving 97% accuracy using Random Forest.',
    tech: ['Python', 'Scikit-learn', 'Random Forest'],
    github: 'https://github.com/islam-rabiul/Machine-Learning-Projects',
    image: '/assets/lungcancer.jpg',
  },
];

const SERVICES = [
  { title: 'Full-Stack Web Development', text: 'End-to-end web applications with React, Node.js, and MongoDB. From pixel-perfect UIs to robust REST APIs — built to scale.' },
  { title: 'AI & Automation', text: 'Intelligent workflow automations using n8n, Gemini AI, and custom LLM integrations. I turn repetitive processes into smart, self-running systems.' },
  { title: 'Machine Learning Solutions', text: 'Predictive models and data pipelines built with Python and Scikit-learn. Proven accuracy, production-ready deliverables.' },
  { title: 'API & Backend Engineering', text: 'Scalable backends with Express, MongoDB, and secure authentication. Clean architecture, optimized for performance.' },
];

const FAQ = [
  { title: "What's your typical project timeline?", text: "Most projects run 2–6 weeks depending on scope. AI automation setups can move faster; full-stack builds take longer. I'll give you a clear timeline upfront." },
  { title: "How do you structure your pricing?", text: "Project-based fixed pricing for most work. I take a 50% deposit to begin, with the remainder on delivery. Hourly rates are available for ongoing work." },
  { title: "Do you work remotely?", text: "Absolutely — I work with clients worldwide. We'll use video calls for key discussions and async tools for feedback and reviews." },
  { title: "What makes you different?", text: "I sit at the intersection of engineering and AI. I don't just build — I automate, integrate intelligent systems, and optimize for real outcomes." },
];

/* ══════════════════════════════════════════════════════════════════════════════
   ANIMATIONS
   ══════════════════════════════════════════════════════════════════════════════ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

/* ══════════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════════════════════ */

// Stylish display heading — Playfair Display serif font
const GrungeHeading = ({ children, className = '', size = 'h2' }: { children: React.ReactNode; className?: string; size?: 'h1' | 'h2' | 'h3' | 'h4' }) => {
  const sizes = {
    h1: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl',
    h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    h3: 'text-2xl sm:text-3xl md:text-4xl',
    h4: 'text-lg sm:text-xl md:text-2xl',
  };
  const Tag = size as any;
  return (
    <Tag
      className={`font-['Playfair_Display',serif] font-bold uppercase tracking-tight leading-[1.05] text-[var(--text-primary)] ${sizes[size]} ${className}`}
    >
      {children}
    </Tag>
  );
};

// Grunge button with smooth start-to-end hover transition (color swipe fill)
const GrungeButton = ({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) => {
  const cls = "group relative inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[var(--text-primary)] text-[var(--text-primary)] font-['Outfit',sans-serif] text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-500 overflow-hidden shadow-sm hover:shadow-lg active:scale-95 rounded-lg";
  const content = (
    <>
      {/* Start-to-end color fill transition background */}
      <span className="absolute inset-0 bg-[var(--text-primary)] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
      <span className="relative z-10 flex items-center gap-2 group-hover:text-[var(--bg-primary)] transition-colors duration-500">{children}</span>
    </>
  );
  if (href) return <a href={href} className={cls}>{content}</a>;
  return <button onClick={onClick} className={cls}>{content}</button>;
};

// Accordion Dropdown
const Dropdown = ({ title, text }: { title: string; text: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-light)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full py-4 sm:py-5 text-left cursor-pointer group"
      >
        <span className="font-['Playfair_Display',serif] font-bold uppercase text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] tracking-wide group-hover:text-[var(--accent-color)] transition-colors duration-300">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--text-primary)] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--text-secondary)] font-normal leading-relaxed text-sm sm:text-base font-['Outfit',sans-serif]">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Project card — grunge vinyl style with strict overflow clipping
const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="group w-full overflow-hidden"
  >
    <a href={project.github} target="_blank" rel="noreferrer" className="block w-full">
      {/* Image frame with vinyl disk */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-5 border border-[var(--border-light)]">
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-40 bg-[var(--text-primary)] px-3 py-1 flex items-center gap-2 rounded-sm shadow-md">
          <span className="text-[var(--bg-primary)] font-['Plus_Jakarta_Sans'] font-bold uppercase tracking-wider text-xs">{project.category}</span>
          {/* Symbol SVG inline */}
          <svg width="20" height="12" viewBox="0 0 36 20" fill="none" className="opacity-70">
            <path d="M18 1C22.3218 1 26 4.92772 26 10C26 15.0723 22.3218 19 18 19C13.6782 19 10 15.0723 10 10C10 4.92772 13.6782 1 18 1Z" stroke="currentColor" strokeWidth="2" className="text-[var(--bg-primary)]"/>
            <path d="M18 1C21.6815 1 24.973 2.06701 27.3184 3.74219C29.6656 5.4188 31 7.64535 31 10C31 12.3547 29.6656 14.5812 27.3184 16.2578C24.973 17.933 21.6815 19 18 19C14.3185 19 11.027 17.933 8.68164 16.2578C6.33438 14.5812 5 12.3547 5 10C5 7.64535 6.33438 5.4188 8.68164 3.74219C11.027 2.06701 14.3185 1 18 1Z" stroke="currentColor" strokeWidth="2" className="text-[var(--bg-primary)]"/>
            <path d="M1 10L35 10" stroke="currentColor" strokeWidth="2" className="text-[var(--bg-primary)]"/>
            <line x1="18" y1="1" x2="18" y2="19" stroke="currentColor" strokeWidth="2" className="text-[var(--bg-primary)]"/>
          </svg>
        </div>

        {/* Main image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover relative z-20 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Vinyl disk spinning inside clipping frame */}
        <div className="absolute top-0 -right-12 z-10 w-full h-full group-hover:-right-4 transition-all duration-700 ease-in-out animate-[spin_8s_linear_infinite] opacity-40 group-hover:opacity-80">
          <div className="w-full h-full rounded-full border-4 border-[var(--border-dark)] bg-[var(--bg-tertiary)] flex items-center justify-center">
            <div className="w-1/4 h-1/4 rounded-full bg-[var(--accent-color)]" />
          </div>
        </div>
      </div>

      {/* Card info */}
      <GrungeHeading size="h4" className="group-hover:text-[var(--accent-color)] transition-colors mb-1">{project.title}</GrungeHeading>
      <p className="text-[var(--text-secondary)] text-sm font-light font-['Inter']">{project.client}</p>
    </a>
  </motion.div>
);

/* ══════════════════════════════════════════════════════════════════════════════
   FULL PAGE ADMIN DASHBOARD (CRUD)
   ══════════════════════════════════════════════════════════════════════════════ */
const FullPageDashboard = ({
  queries,
  onClose,
  onUpdateQuery,
  onDeleteQuery,
  onCreateQuery,
  onRefresh,
}: {
  queries: any[];
  onClose: () => void;
  onUpdateQuery: (id: string, updatedData: any) => Promise<void>;
  onDeleteQuery: (id: string) => Promise<void>;
  onCreateQuery: (newQuery: any) => Promise<void>;
  onRefresh: () => Promise<void>;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newFormData, setNewFormData] = useState({ name: '', email: '', service: 'Web Dev', budget: 'Under ₹5k', deadline: 'Within 7 Days', details: '', status: 'Pending' });

  // Filter queries
  const filteredQueries = queries.filter((q) => {
    const matchesSearch =
      (q.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.service || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.budget || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.deadline || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.details || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (q.status || 'Pending') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalQueries = queries.length;
  const pendingQueries = queries.filter((q) => (q.status || 'Pending') === 'Pending').length;
  const inProgressQueries = queries.filter((q) => q.status === 'In Progress').length;
  const completedQueries = queries.filter((q) => q.status === 'Completed').length;

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateQuery(newFormData);
    setIsAdding(false);
    setNewFormData({ name: '', email: '', service: 'Web Dev', budget: 'Under ₹5k', deadline: 'Within 7 Days', details: '', status: 'Pending' });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      await onUpdateQuery(editingItem._id || editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[var(--bg-primary)] text-[var(--text-primary)] font-['Outfit'] overflow-y-auto min-h-screen">
      {/* Background ambient blur */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[var(--accent-color)] opacity-[0.05] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--accent-color)] shadow-lg">
              <Terminal className="w-6 h-6" />
            </span>
            <div>
              <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold uppercase tracking-wider">
                Admin Control Center
              </h1>
              <p className="text-xs text-[var(--text-secondary)] font-light">
                Manage contact inquiries &amp; client requests (Full CRUD)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-xl border border-[var(--border-light)] bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
            >
              <X className="w-4 h-4" />
              <span>Exit Dashboard</span>
            </button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[var(--bg-secondary)]/70 backdrop-blur-md border border-[var(--border-light)] shadow-sm">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-semibold block mb-1">Total Enquiries</span>
            <span className="font-['Playfair_Display',serif] text-3xl font-bold text-[var(--text-primary)]">{totalQueries}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[var(--bg-secondary)]/70 backdrop-blur-md border border-[var(--border-light)] shadow-sm">
            <span className="text-xs text-amber-400 uppercase tracking-wider font-semibold block mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Pending</span>
            <span className="font-['Playfair_Display',serif] text-3xl font-bold text-amber-400">{pendingQueries}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[var(--bg-secondary)]/70 backdrop-blur-md border border-[var(--border-light)] shadow-sm">
            <span className="text-xs text-blue-400 uppercase tracking-wider font-semibold block mb-1 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> In Progress</span>
            <span className="font-['Playfair_Display',serif] text-3xl font-bold text-blue-400">{inProgressQueries}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[var(--bg-secondary)]/70 backdrop-blur-md border border-[var(--border-light)] shadow-sm">
            <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold block mb-1 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Completed</span>
            <span className="font-['Playfair_Display',serif] text-3xl font-bold text-emerald-400">{completedQueries}</span>
          </div>
        </div>

        {/* Toolbar: Search, Filter & Add Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="Search by name, email, service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] placeholder:text-[var(--text-tertiary)]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[var(--bg-secondary)] p-1 rounded-xl border border-[var(--border-light)] w-full sm:w-auto justify-center">
              {['All', 'Pending', 'In Progress', 'Completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === st
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Add Entry Button (Create) */}
          <button
            onClick={() => setIsAdding(true)}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Entry</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/50 backdrop-blur-md overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-light)] bg-[var(--bg-tertiary)]/50">
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Date</th>
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Client &amp; Email</th>
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Service</th>
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Budget</th>
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Timeline</th>
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Details</th>
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Status</th>
                  <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[var(--text-secondary)] text-sm font-light">
                      No matching inquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredQueries.map((q) => {
                    const id = q._id || q.id;
                    const status = q.status || 'Pending';
                    return (
                      <tr key={id} className="border-b border-[var(--border-light)] hover:bg-[var(--bg-tertiary)]/40 transition-colors">
                        <td className="py-4 px-5 text-xs text-[var(--text-secondary)] whitespace-nowrap">
                          {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'Today'}
                        </td>
                        <td className="py-4 px-5">
                          <p className="font-semibold text-sm text-[var(--text-primary)]">{q.name || 'Anonymous'}</p>
                          <a href={`mailto:${q.email}`} className="text-xs text-[var(--accent-color)] hover:underline">
                            {q.email}
                          </a>
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-3 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-light)] text-xs font-semibold text-[var(--text-primary)]">
                            {q.service || 'General'}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-xs font-semibold text-[var(--accent-color)] whitespace-nowrap">
                          {q.budget || 'N/A'}
                        </td>
                        <td className="py-4 px-5 text-xs text-[var(--text-secondary)] whitespace-nowrap">
                          {q.deadline || 'N/A'}
                        </td>
                        <td className="py-4 px-5 text-xs text-[var(--text-secondary)] max-w-xs truncate" title={q.details}>
                          {q.details || 'No details provided.'}
                        </td>
                        <td className="py-4 px-5">
                          {/* Interactive Status Selector */}
                          <select
                            value={status}
                            onChange={(e) => onUpdateQuery(id, { status: e.target.value })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold focus:outline-none cursor-pointer border ${
                              status === 'Completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : status === 'In Progress'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            }`}
                          >
                            <option value="Pending" className="bg-slate-900 text-amber-400">Pending</option>
                            <option value="In Progress" className="bg-slate-900 text-blue-400">In Progress</option>
                            <option value="Completed" className="bg-slate-900 text-emerald-400">Completed</option>
                          </select>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingItem(q)}
                              className="p-2 rounded-lg border border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all"
                              title="Edit Entry"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete query from ${q.name || 'this client'}?`)) {
                                  onDeleteQuery(id);
                                }
                              }}
                              className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
                              title="Delete Entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CREATE MODAL */}
      {isAdding && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setIsAdding(false)} className="absolute top-5 right-5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold uppercase tracking-wider mb-6">Add New Entry</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Client Name</label>
                <input
                  type="text" required
                  value={newFormData.name}
                  onChange={(e) => setNewFormData({ ...newFormData, name: e.target.value })}
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Email Address</label>
                <input
                  type="email" required
                  value={newFormData.email}
                  onChange={(e) => setNewFormData({ ...newFormData, email: e.target.value })}
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Service</label>
                  <select
                    value={newFormData.service}
                    onChange={(e) => setNewFormData({ ...newFormData, service: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="Automation">Automation</option>
                    <option value="AI Solutions">AI Solutions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Status</label>
                  <select
                    value={newFormData.status}
                    onChange={(e) => setNewFormData({ ...newFormData, status: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Budget</label>
                  <select
                    value={newFormData.budget}
                    onChange={(e) => setNewFormData({ ...newFormData, budget: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Under ₹5k">Under ₹5k</option>
                    <option value="₹5k - ₹10k">₹5k - ₹10k</option>
                    <option value="₹10k - ₹20k">₹10k - ₹20k</option>
                    <option value="₹30k - ₹50k">₹30k - ₹50k</option>
                    <option value="Above ₹50k">Above ₹50k</option>
                  </select>
                </div>
                <div>
                  <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Timeline</label>
                  <select
                    value={newFormData.deadline}
                    onChange={(e) => setNewFormData({ ...newFormData, deadline: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Within 7 Days">Within 7 Days</option>
                    <option value="7 - 10 Days">7 - 10 Days</option>
                    <option value="15 Days">15 Days</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="More than 3 Months">More than 3 Months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Project Details</label>
                <textarea
                  rows={3} required
                  value={newFormData.details}
                  onChange={(e) => setNewFormData({ ...newFormData, details: e.target.value })}
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                  placeholder="Scope & requirements..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-[var(--text-secondary)]">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold uppercase tracking-wider">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setEditingItem(null)} className="absolute top-5 right-5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold uppercase tracking-wider mb-6">Edit Entry</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Client Name</label>
                <input
                  type="text" required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div>
                <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Email Address</label>
                <input
                  type="email" required
                  value={editingItem.email || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Service</label>
                  <select
                    value={editingItem.service || 'Web Dev'}
                    onChange={(e) => setEditingItem({ ...editingItem, service: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="Automation">Automation</option>
                    <option value="AI Solutions">AI Solutions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Status</label>
                  <select
                    value={editingItem.status || 'Pending'}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Budget</label>
                  <select
                    value={editingItem.budget || 'Under $5k'}
                    onChange={(e) => setEditingItem({ ...editingItem, budget: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Under ₹5k">Under ₹5k</option>
                    <option value="₹5k - ₹10k">₹5k - ₹10k</option>
                    <option value="₹10k - ₹20k">₹10k - ₹20k</option>
                    <option value="₹30k - ₹50k">₹30k - ₹50k</option>
                    <option value="Above ₹50k">Above ₹50k</option>
                  </select>
                </div>
                <div>
                  <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Timeline</label>
                  <select
                    value={editingItem.deadline || 'Within 7 Days'}
                    onChange={(e) => setEditingItem({ ...editingItem, deadline: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="Within 7 Days">Within 7 Days</option>
                    <option value="7 - 10 Days">7 - 10 Days</option>
                    <option value="15 Days">15 Days</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="More than 3 Months">More than 3 Months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[var(--text-tertiary)] uppercase font-semibold block mb-1">Project Details</label>
                <textarea
                  rows={3} required
                  value={editingItem.details || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 text-[var(--text-secondary)]">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold uppercase tracking-wider">Update Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════════════════════ */

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', service: '', budget: '', deadline: '', details: '' });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardEmail, setDashboardEmail] = useState('');
  const [dashboardPassword, setDashboardPassword] = useState('');
  const [dashboardAuthenticated, setDashboardAuthenticated] = useState(false);
  const [dashboardQueries, setDashboardQueries] = useState<any[]>([]);
  const [scrollPct, setScrollPct] = useState(0);
  const [typedText, setTypedText] = useState('');
  const heroSubtitle = 'I specialize in building scalable web applications, intelligent automations, and AI-powered digital products.';
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let i = 0;
    const type = () => {
      setTypedText(heroSubtitle.slice(0, i));
      i++;
      if (i <= heroSubtitle.length) typingRef.current = setTimeout(type, 20);
    };
    const d = setTimeout(type, 600);
    return () => { clearTimeout(d); if (typingRef.current) clearTimeout(typingRef.current); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = doc.scrollHeight - doc.clientHeight;
      setScrollPct(pct > 0 ? (window.scrollY / pct) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleHash = () => { if (window.location.hash === '#dashboard') setShowDashboard(true); };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const ids = ['home', 'about', 'services', 'projects', 'contact'];
    const onScroll = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('islamrabi93@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', service: '', budget: '', deadline: '', details: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else setSubmitStatus('error');
    } catch { setSubmitStatus('error'); }
    finally { setIsSubmitting(false); }
  };

  const handleDashboardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: dashboardEmail, password: dashboardPassword }),
      });
      const result = await res.json();
      if (result.success) { setDashboardAuthenticated(true); setDashboardQueries(result.queries); }
      else alert('Incorrect password');
    } catch { alert('Error connecting to backend'); }
  };

  const handleUpdateQuery = async (id: string, updatedData: any) => {
    try {
      await fetch(`http://localhost:5000/api/queries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    } catch {}
    setDashboardQueries((prev) =>
      prev.map((q) => ((q._id || q.id) === id ? { ...q, ...updatedData } : q))
    );
  };

  const handleDeleteQuery = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/queries/${id}`, {
        method: 'DELETE',
      });
    } catch {}
    setDashboardQueries((prev) => prev.filter((q) => (q._id || q.id) !== id));
  };

  const handleCreateQuery = async (newQuery: any) => {
    const tempId = Date.now().toString();
    const entry = { ...newQuery, _id: tempId, createdAt: new Date().toISOString() };
    try {
      const res = await fetch('http://localhost:5000/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuery),
      });
      const data = await res.json();
      if (data.success && data.query) {
        setDashboardQueries((prev) => [data.query, ...prev]);
        return;
      }
    } catch {}
    setDashboardQueries((prev) => [entry, ...prev]);
  };

  const handleRefreshQueries = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/queries');
      const data = await res.json();
      if (data.success && data.queries) {
        setDashboardQueries(data.queries);
      }
    } catch {}
  };

  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Work', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen font-['Outfit'] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] overflow-x-hidden relative">

      {/* Dynamic Cursor Spotlight Tracker */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-subtle), transparent 80%)`,
        }}
      />

      {/* Ambient Animated Floating Spheres */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[var(--accent-color)] opacity-[0.07] rounded-full blur-[120px] animate-[floatSlow1_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-500 opacity-[0.05] rounded-full blur-[140px] animate-[floatSlow2_20s_ease-in-out_infinite]" />
      </div>

      {/* Full-Screen Dynamic Theme-Aware Architectural Design Background Overlay (Crystal Clear Visibility) */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
        {/* Dark Mode Design Background Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            theme === 'dark' ? 'opacity-80' : 'opacity-0'
          }`}
          style={{ backgroundImage: "url('/assets/dark_tech_mesh_bg.jpg')" }}
        />
        {/* Light Mode Design Background Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 mix-blend-multiply ${
            theme === 'dark' ? 'opacity-0' : 'opacity-40'
          }`}
          style={{ backgroundImage: "url('/assets/light_tech_mesh_bg.jpg')" }}
        />
        {/* Subtle Blend Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/20 via-transparent to-[var(--bg-primary)]/20" />
      </div>

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* ── NAVIGATION (Fixed at top screen) ── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] w-full py-4 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-light)] shadow-md"
      >
        <div className="max-w-[90%] mx-auto flex items-center justify-between">
          {/* Brand Logo with Terminal Icon + Name */}
          <a href="#home" className="flex items-center gap-2.5 font-['Playfair_Display',serif] text-xl font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors duration-300 group">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-[var(--text-primary)] to-[var(--text-secondary)] text-[var(--bg-primary)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <Terminal className="w-5 h-5" />
            </span>
            <span>Rabiul.</span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`font-['Outfit',sans-serif] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-[var(--accent-color)] font-bold border-b-2 border-[var(--accent-color)] pb-1'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.85, rotate: 15 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full border border-[var(--border-light)] text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
        </div>
      </motion.header>

      <main className="pt-24 relative z-10">

        {/* ── HERO ── */}
        <section id="home" className="relative min-h-[85vh] flex flex-col justify-between pt-4 pb-12 max-w-[90%] mx-auto">

          {/* Top intro text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg font-light max-w-lg leading-relaxed typing-cursor min-h-[3.5rem] mb-4"
          >
            {typedText}
          </motion.p>

          {/* Hero body — name left, photo right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex md:flex-row flex-col gap-8 items-end justify-between my-auto"
          >
            {/* Left — CTA + name */}
            <div className="md:flex-[1.4] flex flex-col items-start gap-5 w-full">
              <GrungeButton href="#contact">Available for work</GrungeButton>
              <GrungeHeading size="h1" className="text-[var(--text-primary)]">
                Mohammad<br />Rabiul<br />Islam
              </GrungeHeading>
            </div>

            {/* Right — photo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="md:flex-1 w-full max-w-md md:h-[420px] h-72 rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-light)] group relative"
            >
              <div className="relative w-full h-full group overflow-hidden">
                <img
                  src="/assets/Profileicon.jpeg"
                  alt="Mohammad Rabiul Islam"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">Mohammad Rabiul Islam</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-between border-t border-[var(--border-dark)] pt-6 mt-8"
          >
            <p className="font-['Outfit'] font-semibold uppercase tracking-widest text-xs text-[var(--text-tertiary)]">Full-Stack Developer &amp; AI Engineer</p>
            <a href="#projects" className="flex items-center gap-2 font-['Outfit'] font-semibold uppercase tracking-wider text-xs text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors">
              View Work <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>

        {/* ── DYNAMIC TECH MARQUEE TICKER ── */}
        <div className="py-6 bg-[var(--bg-secondary)]/50 border-y border-[var(--border-light)] overflow-hidden relative backdrop-blur-md my-8">
          <div className="flex w-[200%] animate-[marqueeScroll_30s_linear_infinite] gap-12 whitespace-nowrap">
            {[...['React.js', 'Node.js', 'Python', 'Machine Learning', 'n8n Automations', 'Gemini AI', 'MongoDB', 'Express.js', 'TypeScript', 'REST APIs', 'Scikit-Learn', 'Razorpay'],
              ...['React.js', 'Node.js', 'Python', 'Machine Learning', 'n8n Automations', 'Gemini AI', 'MongoDB', 'Express.js', 'TypeScript', 'REST APIs', 'Scikit-Learn', 'Razorpay']
            ].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 text-[var(--text-secondary)] font-['Outfit'] font-semibold text-xs sm:text-sm uppercase tracking-widest hover:text-[var(--accent-color)] transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ABOUT ── */}
        <section id="about" className="py-20 overflow-hidden">
          <div className="max-w-[90%] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <GrungeHeading size="h2" className="text-center mb-16">About</GrungeHeading>
              </motion.div>

              <div className="flex lg:flex-row flex-col gap-12 lg:items-center">
                {/* Text left */}
                <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-5 items-start">
                  <p className="text-lg sm:text-xl text-[var(--text-primary)] font-light leading-relaxed">
                    I'm a creative problem-solver who thrives at the intersection of engineering, AI, and human-centered design.
                  </p>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                    With hands-on experience in full-stack development, machine learning, and intelligent automation, I help businesses translate complex challenges into elegant digital solutions that create real impact.
                  </p>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                    When I'm not building, you'll find me exploring new AI tools, contributing to open-source, or diving into system design. I believe the best engineering comes from truly understanding people and their problems.
                  </p>
                  <div className="mt-2">
                    <GrungeButton href="#contact">Work with me</GrungeButton>
                  </div>
                </motion.div>

                {/* Photo right */}
                <motion.div
                  variants={fadeUp}
                  className="w-full lg:flex-1 lg:h-[460px] h-72 rounded-2xl overflow-hidden shadow-xl border border-[var(--border-light)] group"
                >
                  <img
                    src="/assets/ai_agent_project.png"
                    alt="Workspace"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-20 border-t border-[var(--border-light)] overflow-hidden">
          <div className="max-w-[90%] mx-auto lg:max-w-[65%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <GrungeHeading size="h2" className="text-center mb-16">Services</GrungeHeading>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="flex flex-col gap-4">
                  {/* Bordered accordion box */}
                  <div className="border-2 border-[var(--text-primary)] p-6 sm:p-8 flex flex-col rounded-xl bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
                    {SERVICES.map((s, i) => (
                      <Dropdown key={i} title={`0${i + 1}. ${s.title}`} text={s.text} />
                    ))}
                  </div>

                  {/* Bottom accent bar — barcode + symbol */}
                  <div className="flex justify-between items-center px-2 py-1">
                    <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className="text-[var(--text-tertiary)]">
                      <path d="M18 1C22.3218 1 26 4.92772 26 10C26 15.0723 22.3218 19 18 19C13.6782 19 10 15.0723 10 10C10 4.92772 13.6782 1 18 1Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M18 1C21.6815 1 24.973 2.06701 27.3184 3.74219C29.6656 5.4188 31 7.64535 31 10C31 12.3547 29.6656 14.5812 27.3184 16.2578C24.973 17.933 21.6815 19 18 19C14.3185 19 11.027 17.933 8.68164 16.2578C6.33438 14.5812 5 12.3547 5 10C5 7.76665 2.64133 5.53411 5.75781 3.80273C8.84041 2.09025 13.1668 1 18 1Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M1 10L35 10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="18" y1="1" x2="18" y2="19" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SELECTED WORKS ── */}
        <section id="projects" className="py-20 border-t border-[var(--border-light)] overflow-hidden">
          <div className="max-w-[90%] mx-auto lg:max-w-[75%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <GrungeHeading size="h2" className="text-center mb-16">Selected Works</GrungeHeading>
            </motion.div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 sm:gap-16">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mt-16"
            >
              <GrungeButton href="https://github.com/islam-rabiul">All Works</GrungeButton>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 border-t border-[var(--border-light)] overflow-hidden">
          <div className="max-w-[90%] mx-auto lg:max-w-[65%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <GrungeHeading size="h2" className="text-center mb-16">FAQ</GrungeHeading>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-[var(--text-primary)] p-6 sm:p-8 flex flex-col rounded-xl bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
                    {FAQ.map((q, i) => (
                      <Dropdown key={i} title={`0${i + 1}. ${q.title}`} text={q.text} />
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-2 py-1">
                    <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className="text-[var(--text-tertiary)]">
                      <path d="M18 1C22.3218 1 26 4.92772 26 10C26 15.0723 22.3218 19 18 19C13.6782 19 10 15.0723 10 10C10 4.92772 13.6782 1 18 1Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M18 1C21.6815 1 24.973 2.06701 27.3184 3.74219C29.6656 5.4188 31 7.64535 31 10C31 12.3547 29.6656 14.5812 27.3184 16.2578C24.973 17.933 21.6815 19 18 19C14.3185 19 11.027 17.933 8.68164 16.2578C6.33438 14.5812 5 12.3547 5 10C5 7.76665 2.64133 5.53411 5.75781 3.80273C8.84041 2.09025 13.1668 1 18 1Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M1 10L35 10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="18" y1="1" x2="18" y2="19" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-20 border-t border-[var(--border-light)] overflow-hidden">
          <div className="max-w-[90%] mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <GrungeHeading size="h2" className="text-center mb-4">Let's Work Together</GrungeHeading>
                <p className="text-center text-[var(--text-secondary)] mb-16 font-light text-base sm:text-lg">
                  Have something worth building? Tell me about it.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left — info */}
                <motion.div variants={fadeUp} className="flex flex-col gap-8">
                  <div>
                    <p className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-widest text-xs text-[var(--text-tertiary)] mb-3">Direct Email</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <a href="mailto:islamrabi93@gmail.com" className="text-lg sm:text-xl font-light text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
                        islamrabi93@gmail.com
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1.5 text-[var(--accent-color)] text-xs font-['Plus_Jakarta_Sans'] font-bold uppercase tracking-wider px-3 py-1.5 border border-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-primary)] transition-all duration-300 rounded-sm"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Social Logos (GitHub & LinkedIn logos instead of text) */}
                  <div className="flex items-center gap-4 mt-2">
                    <a
                      href="https://github.com/islam-rabiul"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="group p-3 border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 rounded-xl flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-sm font-bold uppercase tracking-wider"
                    >
                      <Github className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mohammad-rabiul-islam/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="group p-3 border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 rounded-xl flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-sm font-bold uppercase tracking-wider"
                    >
                      <Linkedin className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  </div>
                </motion.div>

                {/* Right — form */}
                <motion.div variants={fadeUp}>
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    <div className="border-b border-[var(--border-dark)] pb-3">
                      <label className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-widest text-xs text-[var(--text-tertiary)] block mb-1.5">Your Name *</label>
                      <input
                        type="text" required placeholder="Jane Doe"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent text-base font-light text-[var(--text-primary)] focus:outline-none placeholder:text-[var(--text-tertiary)]"
                      />
                    </div>
                    <div className="border-b border-[var(--border-dark)] pb-3">
                      <label className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-widest text-xs text-[var(--text-tertiary)] block mb-1.5">Email Address *</label>
                      <input
                        type="email" required placeholder="jane@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent text-base font-light text-[var(--text-primary)] focus:outline-none placeholder:text-[var(--text-tertiary)]"
                      />
                    </div>

                    <div>
                      <label className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-widest text-xs text-[var(--text-tertiary)] block mb-2.5">What can I help with?</label>
                      <div className="flex flex-wrap gap-2.5">
                        {['Web Dev', 'Automation', 'AI Solutions', 'Other'].map(s => (
                          <button
                            key={s} type="button"
                            onClick={() => setFormData({ ...formData, service: s })}
                            className={`px-4 py-2 font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-wider text-xs border transition-all duration-300 rounded-sm ${formData.service === s
                              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                              : 'border-[var(--border-dark)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'}`}
                          >{s}</button>
                        ))}
                      </div>
                    </div>

                    {/* Project Budget Field (Dropdown List) */}
                    <div className="border-b border-[var(--border-dark)] pb-3">
                      <label className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-widest text-xs text-[var(--text-tertiary)] block mb-1.5">Project Budget *</label>
                      <select
                        required
                        value={formData.budget}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-transparent text-base font-light text-[var(--text-primary)] focus:outline-none border-0 cursor-pointer"
                      >
                        <option value="" disabled className="bg-[var(--bg-secondary)] text-[var(--text-tertiary)]">Select Project Budget</option>
                        <option value="Under ₹5k" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">Under ₹5k</option>
                        <option value="₹5k - ₹10k" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">₹5k - ₹10k</option>
                        <option value="₹10k - ₹20k" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">₹10k - ₹20k</option>
                        <option value="₹30k - ₹50k" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">₹30k - ₹50k</option>
                        <option value="Above ₹50k" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">Above ₹50k</option>
                      </select>
                    </div>

                    {/* Project Timeline Field (Dropdown List) */}
                    <div className="border-b border-[var(--border-dark)] pb-3">
                      <label className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-widest text-xs text-[var(--text-tertiary)] block mb-1.5">Project Timeline *</label>
                      <select
                        required
                        value={formData.deadline}
                        onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full bg-transparent text-base font-light text-[var(--text-primary)] focus:outline-none border-0 cursor-pointer"
                      >
                        <option value="" disabled className="bg-[var(--bg-secondary)] text-[var(--text-tertiary)]">Select Project Timeline</option>
                        <option value="Within 7 Days" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">Within 7 Days</option>
                        <option value="7 - 10 Days" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">7 - 10 Days</option>
                        <option value="15 Days" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">15 Days</option>
                        <option value="1 Month" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">1 Month</option>
                        <option value="3 Months" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">3 Months</option>
                        <option value="More than 3 Months" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">More than 3 Months</option>
                      </select>
                    </div>

                    <div className="border-b border-[var(--border-dark)] pb-3">
                      <label className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-widest text-xs text-[var(--text-tertiary)] block mb-1.5">Tell me about your project *</label>
                      <textarea
                        required rows={3} placeholder="Scope, goals, problems..."
                        value={formData.details}
                        onChange={e => setFormData({ ...formData, details: e.target.value })}
                        className="w-full bg-transparent text-base font-light text-[var(--text-primary)] focus:outline-none resize-none placeholder:text-[var(--text-tertiary)]"
                      />
                    </div>

                    <GrungeButton onClick={() => {}}>
                      {isSubmitting ? 'Sending...' : submitStatus === 'success' ? '✓ Message Sent' : submitStatus === 'error' ? 'Failed — Try Again' : 'Send Enquiry'}
                    </GrungeButton>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── MODERN UI FOOTER ── */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 pb-12 relative z-10 max-w-[90%] mx-auto"
      >
        {/* Main Glassmorphic Container */}
        <div className="rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/60 backdrop-blur-xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow inside footer */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--accent-color)] opacity-[0.06] rounded-full blur-[100px] pointer-events-none" />

          {/* CTA Banner Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[var(--border-light)] pb-10 mb-10">
            <div>
              <p className="font-['Outfit'] font-semibold uppercase tracking-widest text-xs text-[var(--accent-color)] mb-2">Have a project in mind?</p>
              <h3 className="font-['Playfair_Display',serif] font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[var(--text-primary)]">
                Let's Build Something<br className="hidden sm:block" /> Extraordinary Together
              </h3>
            </div>
            <GrungeButton href="#contact">Get In Touch →</GrungeButton>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-[var(--border-light)]">
            {/* Col 1: Brand & Status */}
            <div className="flex flex-col items-start gap-4">
              <a href="#home" className="flex items-center gap-2.5 font-['Playfair_Display',serif] text-2xl font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors duration-300">
                <span className="p-2.5 rounded-xl bg-gradient-to-tr from-[var(--text-primary)] to-[var(--text-secondary)] text-[var(--bg-primary)] flex items-center justify-center shadow-lg">
                  <Terminal className="w-5 h-5" />
                </span>
                <span>Rabiul.</span>
              </a>
              <p className="text-xs sm:text-sm font-['Outfit'] font-light text-[var(--text-secondary)] leading-relaxed">
                Full-Stack Developer &amp; AI Engineer crafting scalable digital products and intelligent automations.
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <p className="font-['Outfit'] font-bold text-xs uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Navigation</p>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map(l => (
                  <li key={l.id}>
                    <a
                      href={l.href}
                      className="font-['Outfit'] text-sm text-[var(--text-secondary)] hover:text-[var(--accent-color)] hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Specialties */}
            <div>
              <p className="font-['Outfit'] font-bold text-xs uppercase tracking-widest text-[var(--text-tertiary)] mb-4">Specialties</p>
              <ul className="flex flex-col gap-2.5 text-sm text-[var(--text-secondary)] font-['Outfit'] font-light">
                <li className="hover:text-[var(--text-primary)] transition-colors">Full-Stack Web Apps</li>
                <li className="hover:text-[var(--text-primary)] transition-colors">n8n &amp; AI Automations</li>
                <li className="hover:text-[var(--text-primary)] transition-colors">Machine Learning Models</li>
                <li className="hover:text-[var(--text-primary)] transition-colors">RESTful APIs &amp; Databases</li>
              </ul>
            </div>

            {/* Col 4: Connect */}
            <div className="flex flex-col gap-4">
              <p className="font-['Outfit'] font-bold text-xs uppercase tracking-widest text-[var(--text-tertiary)] mb-1">Connect</p>
              <a href="mailto:islamrabi93@gmail.com" className="text-sm text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors font-['Outfit'] font-medium truncate">
                islamrabi93@gmail.com
              </a>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href="https://github.com/islam-rabiul"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl border border-[var(--border-light)] bg-[var(--bg-tertiary)]/50 text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-md hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammad-rabiul-islam/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl border border-[var(--border-light)] bg-[var(--bg-tertiary)]/50 text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-md hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Location & Theme */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-xs text-[var(--text-tertiary)] font-['Outfit'] font-light">
                Mohammad Rabiul Islam © {new Date().getFullYear()}
              </p>
              <span className="hidden sm:inline text-[var(--text-tertiary)]">•</span>
              <p className="text-xs text-[var(--text-tertiary)] font-['Outfit'] font-light">
                📍 Remote / Worldwide
              </p>
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-4 py-2 rounded-full border border-[var(--border-light)] bg-[var(--bg-tertiary)]/50 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-all duration-300 font-['Outfit'] font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </motion.footer>

      {/* ── FULL PAGE DASHBOARD VIEW ── */}
      {showDashboard && (
        !dashboardAuthenticated ? (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[var(--bg-primary)]/95 backdrop-blur-lg">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-light)] w-full max-w-md shadow-2xl relative p-8 rounded-2xl">
              <button onClick={() => setShowDashboard(false)} className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">✕</button>
              <div className="mb-6 flex flex-col items-center text-center gap-2">
                <span className="p-3 rounded-2xl bg-[var(--bg-tertiary)] text-red-400 border border-red-500/20 mb-2">
                  <Lock className="w-6 h-6" />
                </span>
                <GrungeHeading size="h4">Admin Login</GrungeHeading>
                <p className="text-[var(--text-secondary)] text-xs">Enter credentials to unlock control center</p>
              </div>

              <form onSubmit={handleDashboardLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] block mb-1">Email</label>
                  <input type="email" value={dashboardEmail} onChange={e => setDashboardEmail(e.target.value)} placeholder="admin@example.com"
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] py-3 px-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] placeholder:text-[var(--text-tertiary)] text-xs rounded-xl" required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] block mb-1">Password</label>
                  <input type="password" value={dashboardPassword} onChange={e => setDashboardPassword(e.target.value)} placeholder="••••••••"
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-light)] py-3 px-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] placeholder:text-[var(--text-tertiary)] text-xs rounded-xl" required />
                </div>
                <GrungeButton onClick={() => {}}>Authenticate</GrungeButton>
              </form>
            </div>
          </div>
        ) : (
          <FullPageDashboard
            queries={dashboardQueries}
            onClose={() => setShowDashboard(false)}
            onUpdateQuery={handleUpdateQuery}
            onDeleteQuery={handleDeleteQuery}
            onCreateQuery={handleCreateQuery}
            onRefresh={handleRefreshQueries}
          />
        )
      )}
    </div>
  );
};

export default App;
