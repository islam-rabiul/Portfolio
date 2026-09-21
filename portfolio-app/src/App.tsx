import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Check, Copy, Sun, Moon, Lock, Unlock } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════════════ */





const PROJECTS = [
  {
    title: 'Customer Support AI Agent',
    desc: 'Automated customer support system using n8n workflows and Gemini AI for sentiment analysis and routing.',
    tech: ['n8n', 'Gemini AI', 'Node.js', 'MongoDB'],
    github: 'https://github.com/islam-rabiul',
    image: '/assets/ai_agent_project.png',
  },
  {
    title: 'Ecommerce Store',
    desc: 'Full-stack platform with React.js frontend, Node.js/Express backend, and Razorpay.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Razorpay'],
    github: 'https://github.com/islam-rabiul',
    image: '/assets/ecommerce_project.png',
  },
  {
    title: 'Lung Cancer Detection',
    desc: 'Machine learning model achieving 97% accuracy using Random Forest.',
    tech: ['Python', 'Scikit-learn', 'Random Forest'],
    github: 'https://github.com/islam-rabiul/Machine-Learning-Projects',
    image: '/assets/lungcancer.jpg',
  }
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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

/* ══════════════════════════════════════════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════════════════════════════════════════ */

const Section = ({ id, children, className = '' }: { id: string, children: React.ReactNode, className?: string }) => (
  <section id={id} className={`section-padding border-b border-[#e5e5e5] overflow-hidden ${className}`}>
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      {children}
    </div>
  </section>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeToc, setActiveToc] = useState(1);
  const [activeValue, setActiveValue] = useState(2);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', details: '' });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardEmail, setDashboardEmail] = useState('');
  const [dashboardPassword, setDashboardPassword] = useState('');
  const [dashboardAuthenticated, setDashboardAuthenticated] = useState(false);
  const [dashboardQueries, setDashboardQueries] = useState<any[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Hidden shortcut to open dashboard (e.g. typing #dashboard in URL or manually setting state)
    const handleHash = () => {
      if (window.location.hash === '#dashboard') setShowDashboard(true);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', service: '', details: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000); 
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDashboardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: dashboardEmail, password: dashboardPassword })
      });
      const result = await response.json();
      if (result.success) {
        setDashboardAuthenticated(true);
        setDashboardQueries(result.queries);
      } else {
        alert("Incorrect password");
      }
    } catch (err) {
      alert("Error connecting to backend");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const ids = ['home', 'about', 'projects', 'contact'];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-['Manrope'] selection:bg-[var(--accent-color)] selection:text-[var(--accent-black)]">
      
      {/* ── HEADER NAVIGATION ── */}
      <header className="fixed top-0 w-full z-50 py-6 transition-all duration-300 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-light)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 text-xl tracking-[0.1em] font-light text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-all hover:rotate-180 duration-1000 ease-in-out">
              <defs>
                <linearGradient id="cube-grad" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="var(--accent-color)" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              {/* Outer Hexagon */}
              <path d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z" stroke="url(#cube-grad)" strokeWidth="6" strokeLinejoin="round" />
              {/* Inner Y (Cube edges) */}
              <path d="M 50 50 L 50 10 M 50 50 L 85 70 M 50 50 L 15 70" stroke="url(#cube-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              {/* Inner Hexagon (Tesseract hyper-edges) */}
              <path d="M 50 30 L 67 40 L 67 60 L 50 70 L 33 60 L 33 40 Z" stroke="url(#cube-grad)" strokeWidth="3" strokeLinejoin="round" opacity="0.6"/>
              {/* Connect outer to inner corners */}
              <path d="M 85 30 L 67 40 M 85 70 L 67 60 M 50 90 L 50 70 M 15 70 L 33 60 M 15 30 L 33 40 M 50 10 L 50 30" stroke="url(#cube-grad)" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
              <circle cx="50" cy="50" r="5" fill="url(#cube-grad)" />
            </svg>
            <strong className="font-bold">Rabiul</strong>
          </a>
          <div className="flex items-center gap-10">
            <nav className="hidden md:flex items-center gap-8 text-[0.8rem] uppercase tracking-widest font-medium">
              <a href="#home" className={`hover:text-[var(--accent-color)] transition-colors ${activeSection === 'home' ? 'text-[var(--accent-color)] font-bold' : 'text-[var(--text-primary)]'}`}>Home</a>
              <a href="#about" className={`hover:text-[var(--accent-color)] transition-colors ${activeSection === 'about' ? 'text-[var(--accent-color)] font-bold' : 'text-[var(--text-primary)]'}`}>About</a>
              <a href="#projects" className={`hover:text-[var(--accent-color)] transition-colors ${activeSection === 'projects' ? 'text-[var(--accent-color)] font-bold' : 'text-[var(--text-primary)]'}`}>Work</a>
              <a href="#contact" className={`hover:text-[var(--accent-color)] transition-colors ${activeSection === 'contact' ? 'text-[var(--accent-color)] font-bold' : 'text-[var(--text-primary)]'}`}>Contact</a>
            </nav>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-0">
        
        {/* ── HERO SECTION ── */}
        <Section id="home" className="min-h-[100vh] flex items-center relative overflow-hidden bg-[var(--bg-primary)]">
          {/* Subtle gradient background blurs - enhanced for modern UI */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--accent-color)] to-purple-600 opacity-[0.08] rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none animate-pulse duration-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-600 to-[var(--accent-color)] opacity-[0.06] rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 w-full pt-4">
            <motion.div 
              className="flex flex-col gap-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[var(--border-light)] bg-[var(--bg-tertiary)]/50 backdrop-blur-md shadow-sm self-start">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-color)]"></span>
                </span>
                <span className="text-[0.65rem] tracking-[0.2em] text-[var(--text-primary)] uppercase font-semibold">Available for new opportunities</span>
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-light leading-[1.05] tracking-tight text-[var(--text-primary)]">
                  Crafting <strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] to-purple-500">digital experiences</strong> that blend logic with elegance.
                </h1>
              </motion.div>
              
              <motion.p variants={fadeUp} className="text-xl text-[var(--text-secondary)] max-w-xl font-light leading-relaxed">
                I engineer scalable web applications, orchestrate intelligent automations, and seamlessly integrate AI into modern workflows.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mt-6 items-center">
                 <a href="#work" className="relative group px-8 py-4 bg-transparent text-[var(--text-primary)] font-medium overflow-hidden rounded-full border border-[var(--border-dark)] hover:border-[var(--accent-color)] shadow-sm hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-500">
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-[var(--accent-color)] to-blue-600 transition-all duration-500 ease-out group-hover:w-full -z-10"></div>
                  <span className="relative group-hover:text-white transition-colors duration-300">Explore My Work</span>
                </a>
                <a href="#contact" className="px-6 py-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-3 group font-medium">
                  <span className="text-sm uppercase tracking-widest">Start a conversation</span>
                  <div className="p-2 rounded-full bg-[var(--bg-tertiary)] group-hover:bg-[var(--accent-color)] group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md mx-auto aspect-[4/5] flex items-center justify-center mt-8 lg:mt-0 group perspective-1000"
            >
              {/* Decorative glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-color)] to-purple-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              {/* Fade out edge overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 pointer-events-none rounded-[2.5rem]"></div>
              
              <img 
                src="/assets/Profileicon.jpeg" 
                alt="Mohammad Rabiul Islam" 
                className="w-full h-full object-cover rounded-[2.5rem] border border-[var(--border-light)] group-hover:scale-[1.02] shadow-2xl transition-transform duration-[1.5s] ease-out filter grayscale hover:grayscale-0 relative z-0"
              />
            </motion.div>
          </div>
        </Section>

        {/* ── TABLE OF CONTENT (PROJECTS SUMMARY) ── */}
        <Section id="about" className="bg-[var(--bg-secondary)] border-[var(--border-light)]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="relative"
            >
              <h2 className="text-[3rem] lg:text-[4rem] font-light leading-[1.1] text-[var(--text-primary)]">
                Table Of<br /><strong className="text-[var(--accent-color)] font-bold">Content</strong>
              </h2>
              <ArrowUpRight className="w-10 h-10 absolute top-0 right-12 text-[var(--accent-color)]" />
              <p className="text-xl text-[var(--text-secondary)] max-w-sm mt-12 font-light">
                A structured overview of the projects and skills I bring to the table.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid sm:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeUp} 
                className={activeToc === 1 ? "bg-[var(--border-light)] border border-[var(--accent-color)] p-8 rounded-2xl cursor-pointer" : "bg-[var(--bg-tertiary)] border border-[var(--border-light)] p-8 rounded-2xl cursor-pointer hover:bg-[var(--border-light)] transition-colors"}
                onClick={() => setActiveToc(1)}
              >
                <p className={`font-bold text-lg mb-4 ${activeToc === 1 ? 'text-[var(--accent-color)]' : 'text-[var(--text-tertiary)]'}`}>01</p>
                <h3 className="text-2xl font-light text-[var(--text-primary)] mb-3">AI / Automation</h3>
                <p className={`text-sm font-light leading-relaxed ${activeToc === 1 ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  Customer Support AI Agent using n8n workflows and Gemini AI.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeUp} 
                className={activeToc === 2 ? "bg-[var(--border-light)] border border-[var(--accent-color)] p-8 rounded-2xl cursor-pointer" : "bg-[var(--bg-tertiary)] border border-[var(--border-light)] p-8 rounded-2xl cursor-pointer hover:bg-[var(--border-light)] transition-colors"}
                onClick={() => setActiveToc(2)}
              >
                <p className={`font-bold text-lg mb-4 ${activeToc === 2 ? 'text-[var(--accent-color)]' : 'text-[var(--text-tertiary)]'}`}>02</p>
                <h3 className="text-2xl font-light text-[var(--text-primary)] mb-3">Full Stack</h3>
                <p className={`text-sm font-light leading-relaxed ${activeToc === 2 ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  E-commerce Platform with React.js, Node.js, and Razorpay.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className={activeToc === 3 ? "bg-[var(--border-light)] border border-[var(--accent-color)] p-8 rounded-2xl cursor-pointer" : "bg-[var(--bg-tertiary)] border border-[var(--border-light)] p-8 rounded-2xl cursor-pointer hover:bg-[var(--border-light)] transition-colors"}
                onClick={() => setActiveToc(3)}
              >
                <p className={`font-bold text-lg mb-4 ${activeToc === 3 ? 'text-[var(--accent-color)]' : 'text-[var(--text-tertiary)]'}`}>03</p>
                <h3 className="text-2xl font-light text-[var(--text-primary)] mb-3">Machine Learning</h3>
                <p className={`text-sm font-light leading-relaxed ${activeToc === 3 ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  Lung Cancer Detection model achieving 97% accuracy.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className={activeToc === 4 ? "bg-[var(--border-light)] border border-[var(--accent-color)] p-8 rounded-2xl cursor-pointer" : "bg-[var(--bg-tertiary)] border border-[var(--border-light)] p-8 rounded-2xl cursor-pointer hover:bg-[var(--border-light)] transition-colors"}
                onClick={() => setActiveToc(4)}
              >
                <p className={`font-bold text-lg mb-4 ${activeToc === 4 ? 'text-[var(--accent-color)]' : 'text-[var(--text-tertiary)]'}`}>04</p>
                <h3 className="text-2xl font-light text-[var(--text-primary)] mb-3">Let's Connect</h3>
                <p className={`text-sm font-light leading-relaxed ${activeToc === 4 ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  How and why we should collaborate on your next project.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* ── ABOUT MY UNIQUE VALUE ── */}
        <Section id="expertise" className="bg-[var(--bg-primary)] border-[var(--border-light)]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              className="order-2 lg:order-1 flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-[3rem] lg:text-[4rem] font-light leading-[1.1] text-[var(--text-primary)] mb-4">
                About My<br /><strong className="text-[var(--accent-color)] font-bold">Unique Value</strong>
              </motion.h2>
              
              <motion.div 
                variants={fadeUp} 
                className={activeValue === 1 ? "bg-[var(--bg-tertiary)] border border-[var(--border-dark)] p-8 rounded-2xl cursor-pointer group" : "bg-transparent p-8 cursor-pointer group hover:bg-[var(--bg-tertiary)] rounded-2xl transition-all"}
                onClick={() => setActiveValue(1)}
              >
                <h3 className={`text-xl font-light mb-2 transition-colors ${activeValue === 1 ? 'text-[var(--accent-color)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent-color)]'}`}>Identify Problem</h3>
                <p className={`font-light ${activeValue === 1 ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                  I start by identifying the core problem — analyzing the requirements and data to build a solid foundation.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className={activeValue === 2 ? "bg-[var(--bg-tertiary)] border border-[var(--border-dark)] p-8 rounded-2xl cursor-pointer group" : "bg-transparent p-8 cursor-pointer group hover:bg-[var(--bg-tertiary)] rounded-2xl transition-all"}
                onClick={() => setActiveValue(2)}
              >
                <h3 className={`text-xl font-light mb-2 transition-colors ${activeValue === 2 ? 'text-[var(--accent-color)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent-color)]'}`}>Clarity & Strategy</h3>
                <p className={`font-light ${activeValue === 2 ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                  Complex logic translated into clear, maintainable code. Every technical decision is grounded in measurable outcomes.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className={activeValue === 3 ? "bg-[var(--bg-tertiary)] border border-[var(--border-dark)] p-8 rounded-2xl cursor-pointer group" : "bg-transparent p-8 cursor-pointer group hover:bg-[var(--bg-tertiary)] rounded-2xl transition-all"}
                onClick={() => setActiveValue(3)}
              >
                <h3 className={`text-xl font-light mb-2 transition-colors ${activeValue === 3 ? 'text-[var(--accent-color)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent-color)]'}`}>Intentional Execution</h3>
                <p className={`font-light ${activeValue === 3 ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                  Every line of code and architectural choice serves a strategic function — no guesswork, just results.
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 h-[700px] bg-[var(--bg-secondary)] rounded-2xl overflow-hidden shadow-xl border border-[var(--border-light)]"
            >
              <img 
                src="/assets/ai_agent_project.png" 
                alt="Workspace" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 opacity-60 hover:opacity-100"
              />
            </motion.div>
          </div>
        </Section>


        {/* ── PROJECTS ── */}
        <Section id="projects" className="bg-[var(--bg-secondary)] border-[var(--border-light)]">
          <motion.div 
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-[3rem] lg:text-[4rem] font-light leading-[1.1] text-[var(--text-primary)]">Selected <strong className="text-[var(--accent-color)] font-bold">Works</strong></h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl font-light mt-4">
              A collection of projects showcasing my technical expertise. Click the images to view the source code on GitHub.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="group"
              >
                <a href={project.github} target="_blank" rel="noreferrer" className="block w-full aspect-video bg-[var(--bg-tertiary)] rounded-2xl overflow-hidden mb-6 relative border border-[var(--border-light)] group-hover:border-[var(--border-dark)] transition-all">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[var(--bg-primary)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                     <span className="bg-[var(--accent-color)] text-[var(--bg-primary)] px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2">View GitHub <ArrowUpRight className="w-4 h-4"/></span>
                  </div>
                </a>
                <h3 className="text-xl font-light text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-color)] transition-colors">{project.title}</h3>
                <p className="text-[var(--text-secondary)] font-light mb-4 text-sm leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-[0.65rem] font-medium tracking-widest uppercase px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-light)] rounded-full text-[var(--text-tertiary)]">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>


        {/* ── CONTACT ── */}
        <Section id="contact" className="border-b-0 py-32 bg-[var(--bg-secondary)] relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--accent-color)] opacity-[0.02] blur-[150px] -z-10 pointer-events-none"></div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
            
            {/* Left Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col h-full"
            >
              <motion.h2 variants={fadeUp} className="text-[4.5rem] lg:text-[6rem] font-light leading-[1] tracking-tight text-[var(--text-primary)] mb-8">
                Let's start a <strong className="font-bold text-[var(--accent-color)]">conversation.</strong>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-xl text-[var(--text-secondary)] max-w-md mb-12 font-light leading-relaxed">
                Have something worth building? Tell me what you're working on. I'll help turn the idea into a clear plan and a working product.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex items-center gap-3 font-medium text-sm text-[var(--text-tertiary)] uppercase tracking-widest mb-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-color)]"></span>
                </span>
                Available for freelance projects
              </motion.div>

              <motion.div variants={fadeUp} className="mt-20">
                <p className="text-[0.65rem] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-4">Direct Email</p>
                <div className="flex items-center gap-6">
                  <a href="mailto:islamrabi93@gmail.com" className="text-xl font-light text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
                    islamrabi93@gmail.com
                  </a>
                  <button 
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 text-[var(--accent-color)] text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full bg-[var(--accent-subtle)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-primary)] transition-all"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-[var(--bg-secondary)] border border-[var(--border-dark)] p-8 lg:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)] to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none"></div>

              <div className="flex items-baseline justify-between mb-12">
                <h3 className="text-2xl font-light tracking-tight text-[var(--text-primary)]">Start a Project</h3>
                <span className="text-[0.65rem] font-bold text-[var(--accent-color)] uppercase tracking-widest">Enquiry</span>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-10">
                <div className="group/input">
                  <label className="block text-[0.65rem] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-2 transition-colors group-focus-within/input:text-[var(--accent-color)]">Your Name *</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-[var(--border-dark)] py-3 px-0 text-lg font-light text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors placeholder:text-[var(--text-tertiary)]"
                  />
                </div>
                
                <div className="group/input">
                  <label className="block text-[0.65rem] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-2 transition-colors group-focus-within/input:text-[var(--accent-color)]">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-[var(--border-dark)] py-3 px-0 text-lg font-light text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors placeholder:text-[var(--text-tertiary)]"
                  />
                </div>

                <div>
                  <label className="block text-[0.65rem] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-4">What can I help with?</label>
                  <div className="flex flex-wrap gap-3">
                    {['Web Dev', 'Automation', 'AI Solutions', 'Other'].map((s) => (
                      <button 
                        key={s} 
                        type="button"
                        onClick={() => setFormData({...formData, service: s})}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${formData.service === s ? 'bg-transparent border border-[var(--accent-color)] text-[var(--accent-color)]' : 'bg-transparent border border-[var(--border-dark)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group/input">
                  <label className="block text-[0.65rem] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-2 transition-colors group-focus-within/input:text-[var(--accent-color)]">Tell me about your project *</label>
                  <textarea 
                    placeholder="Overview, scope, goals, or problems you're looking to solve..."
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full bg-transparent border-b border-[var(--border-dark)] py-3 px-0 text-lg font-light text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors resize-none placeholder:text-[var(--text-tertiary)]"
                  />
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || submitStatus === 'success'}
                    className={`relative group/btn overflow-hidden w-full px-8 py-5 rounded-xl font-medium transition-all duration-300 ${submitStatus === 'success' ? 'bg-green-400 text-[var(--bg-primary)]' : submitStatus === 'error' ? 'bg-red-400 text-[var(--text-primary)]' : 'bg-[var(--accent-black)] text-[var(--accent-white)] hover:scale-[1.02]'}`}
                  >
                    {submitStatus === 'idle' && !isSubmitting && (
                      <>
                        <div className="absolute inset-0 w-0 bg-[var(--accent-color)] transition-all duration-500 ease-out group-hover/btn:w-full -z-10"></div>
                        <span className="relative text-sm uppercase tracking-widest group-hover/btn:font-bold transition-all group-hover/btn:text-[var(--accent-black)]">Submit Enquiry</span>
                      </>
                    )}
                    {isSubmitting && (
                      <span className="relative text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Sending...
                      </span>
                    )}
                    {submitStatus === 'success' && (
                      <span className="relative text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        Message Sent
                      </span>
                    )}
                    {submitStatus === 'error' && (
                      <span className="relative text-sm uppercase tracking-widest font-bold text-[var(--text-primary)]">
                        Failed to send. Try again.
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </Section>

      </main>

      {/* ── DASHBOARD MODAL ── */}
      {showDashboard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--bg-primary)]/80 backdrop-blur-md">
          <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-3xl shadow-2xl relative p-8">
            <button onClick={() => setShowDashboard(false)} className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">✕</button>
            
            <div className="mb-8 flex items-center gap-4">
              {dashboardAuthenticated ? <Unlock className="w-8 h-8 text-[var(--accent-color)]" /> : <Lock className="w-8 h-8 text-red-500" />}
              <h2 className="text-3xl font-light text-[var(--text-primary)]">Admin <strong className="font-bold">Dashboard</strong></h2>
            </div>

            {!dashboardAuthenticated ? (
              <form onSubmit={handleDashboardLogin} className="max-w-sm mx-auto my-20">
                <p className="text-[var(--text-secondary)] mb-4 text-center">Enter email and master password to view queries.</p>
                <input 
                  type="email" 
                  value={dashboardEmail}
                  onChange={(e) => setDashboardEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-lg py-3 px-4 mb-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] placeholder:text-[var(--text-tertiary)]"
                  required
                />
                <input 
                  type="password" 
                  value={dashboardPassword}
                  onChange={(e) => setDashboardPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-lg py-3 px-4 mb-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] placeholder:text-[var(--text-tertiary)]"
                  required
                />
                <button type="submit" className="w-full bg-[var(--accent-color)] text-[var(--accent-black)] font-bold py-3 rounded-lg hover:opacity-90">Login</button>
              </form>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border-light)]">
                      <th className="py-4 px-4 text-[0.7rem] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">Date</th>
                      <th className="py-4 px-4 text-[0.7rem] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">Name & Email</th>
                      <th className="py-4 px-4 text-[0.7rem] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">Service</th>
                      <th className="py-4 px-4 text-[0.7rem] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardQueries.length === 0 ? (
                      <tr><td colSpan={4} className="py-8 text-center text-[var(--text-secondary)]">No queries found.</td></tr>
                    ) : (
                      dashboardQueries.map((q, i) => (
                        <tr key={i} className="border-b border-[var(--border-light)] hover:bg-[var(--bg-tertiary)]">
                          <td className="py-4 px-4 text-sm text-[var(--text-secondary)] whitespace-nowrap">{new Date(q.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-4">
                            <p className="font-medium text-[var(--text-primary)]">{q.name}</p>
                            <a href={`mailto:${q.email}`} className="text-xs text-[var(--accent-color)]">{q.email}</a>
                          </td>
                          <td className="py-4 px-4 text-sm text-[var(--text-secondary)]"><span className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs">{q.service}</span></td>
                          <td className="py-4 px-4 text-sm text-[var(--text-secondary)] max-w-xs truncate">{q.details}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
