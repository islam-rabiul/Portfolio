import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════════════ */

const STATS = [
  { value: '3+', label: 'Projects Built' },
  { value: '97%', label: 'ML Accuracy' },
  { value: '5+', label: 'Core Technologies' },
];

const EXPERTISE = [
  {
    title: 'AI / Automation',
    desc: 'Automated customer support system using n8n workflows and Gemini AI for sentiment analysis and routing.'
  },
  {
    title: 'Full Stack Development',
    desc: 'End-to-end web applications with React.js frontend, Node.js/Express backend, and secure database management.'
  },
  {
    title: 'Machine Learning',
    desc: 'Predictive models achieving high accuracy, applying techniques like Random Forest and dimensionality reduction.'
  }
];

const EXPERIENCE = [
  {
    year: '2022',
    role: 'B.Tech AI & ML',
    desc: 'Started degree at United College of Engineering & Research (AKTU Lucknow).'
  },
  {
    year: '2023',
    role: 'Machine Learning',
    desc: 'Mastered ML with Python. Built high-accuracy prediction models (e.g., Lung Cancer Detection).'
  },
  {
    year: '2024',
    role: 'Full Stack & Automation',
    desc: 'Built full-stack e-commerce platforms and intelligent n8n automation agents.'
  },
  {
    year: '2026',
    role: 'Graduating',
    desc: 'Actively seeking opportunities to build intelligent systems and beautiful web experiences.'
  }
];

/* ══════════════════════════════════════════════════════════════════════════════
   ANIMATIONS
   ══════════════════════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
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
  const [activeExperience, setActiveExperience] = useState(EXPERIENCE.length - 1);

  useEffect(() => {
    const handleScroll = () => {
      const ids = ['home', 'about', 'experience'];
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
    <div className="min-h-screen bg-white text-[#111111] font-['Manrope'] selection:bg-[#2563eb] selection:text-white">
      
      {/* ── HEADER NAVIGATION ── */}
      <header className="fixed top-0 w-full z-50 nav-header">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold tracking-tight hover:text-[#2563eb] transition-colors">
            Rabiul<span className="text-[#2563eb]">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-12">
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a>
            <a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        
        {/* ── HERO SECTION ── */}
        <Section id="home" className="min-h-[85vh] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              className="flex flex-col gap-10"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <p className="text-2xl text-[#555] mb-2 font-medium">Hi, I'm</p>
                <h1 className="heading-hero">
                  Mohammad<br /><span className="text-[#2563eb]">Rabiul</span> Islam
                </h1>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex items-center justify-between border-b border-[#e5e5e5] pb-8 relative group">
                <p className="text-xl text-[#555] font-medium group-hover:text-[#2563eb] transition-colors">
                  AI & ML Engineer · Full Stack Developer
                </p>
                <ArrowUpRight className="w-8 h-8 absolute right-0 -top-4 text-[#2563eb] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
              </motion.div>

              <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-8">
                {STATS.map((stat, i) => (
                  <motion.div key={i} variants={fadeUp} className="hover:-translate-y-1 transition-transform">
                    <p className="stat-number">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex gap-4">
                 <a href="mailto:islamrabi93@gmail.com" className="btn-primary">
                  Get In Touch <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-md mx-auto aspect-[4/5] object-cover bg-[#f0f0f0] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="/assets/Profileicon.jpeg" 
                alt="Mohammad Rabiul Islam" 
                className="w-full h-full object-cover object-center hover:scale-105 transition-all duration-700 cursor-pointer"
              />
            </motion.div>
          </div>
        </Section>

        {/* ── TABLE OF CONTENT (PROJECTS SUMMARY) ── */}
        <Section id="about">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="relative"
            >
              <h2 className="heading-section leading-[0.9]">
                Table Of<br /><span className="text-[#2563eb]">Content</span>
              </h2>
              <ArrowUpRight className="w-10 h-10 absolute top-0 right-12 text-[#2563eb]" />
              <p className="text-xl text-[#555] max-w-sm mt-12 font-medium">
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
                className={activeToc === 1 ? "box-dark cursor-pointer" : "box-light cursor-pointer"}
                onClick={() => setActiveToc(1)}
              >
                <p className={`font-bold text-lg mb-4 ${activeToc === 1 ? 'text-[#2563eb]' : 'text-[#888] group-hover:text-[#2563eb]'}`}>01</p>
                <h3 className="text-2xl font-bold mb-3">AI / Automation</h3>
                <p className={`text-sm leading-relaxed ${activeToc === 1 ? '' : 'text-[#555]'}`}>
                  Customer Support AI Agent using n8n workflows and Gemini AI.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeUp} 
                className={activeToc === 2 ? "box-dark cursor-pointer" : "box-light cursor-pointer"}
                onClick={() => setActiveToc(2)}
              >
                <p className={`font-bold text-lg mb-4 ${activeToc === 2 ? 'text-[#2563eb]' : 'text-[#888] group-hover:text-[#2563eb]'}`}>02</p>
                <h3 className="text-2xl font-bold mb-3">Full Stack</h3>
                <p className={`text-sm leading-relaxed ${activeToc === 2 ? '' : 'text-[#555]'}`}>
                  E-commerce Platform with React.js, Node.js, and Razorpay.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className={activeToc === 3 ? "box-dark cursor-pointer" : "box-light cursor-pointer"}
                onClick={() => setActiveToc(3)}
              >
                <p className={`font-bold text-lg mb-4 ${activeToc === 3 ? 'text-[#2563eb]' : 'text-[#888] group-hover:text-[#2563eb]'}`}>03</p>
                <h3 className="text-2xl font-bold mb-3">Machine Learning</h3>
                <p className={`text-sm leading-relaxed ${activeToc === 3 ? '' : 'text-[#555]'}`}>
                  Lung Cancer Detection model achieving 97% accuracy.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className={activeToc === 4 ? "box-dark cursor-pointer" : "box-light cursor-pointer"}
                onClick={() => setActiveToc(4)}
              >
                <p className={`font-bold text-lg mb-4 ${activeToc === 4 ? 'text-[#2563eb]' : 'text-[#888] group-hover:text-[#2563eb]'}`}>04</p>
                <h3 className="text-2xl font-bold mb-3">Let's Connect</h3>
                <p className={`text-sm leading-relaxed ${activeToc === 4 ? '' : 'text-[#555]'}`}>
                  How and why we should collaborate on your next project.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* ── ABOUT MY UNIQUE VALUE ── */}
        <Section id="expertise">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              className="order-2 lg:order-1 flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="heading-section leading-[0.9] mb-4">
                About My<br /><span className="text-[#2563eb]">Unique Value</span>
              </motion.h2>
              
              <motion.div 
                variants={fadeUp} 
                className={activeValue === 1 ? "box-dark py-8 cursor-pointer group" : "box-light py-8 cursor-pointer group"}
                onClick={() => setActiveValue(1)}
              >
                <h3 className={`text-xl font-bold mb-2 transition-colors ${activeValue === 1 ? 'text-white' : 'group-hover:text-[#2563eb]'} ${activeValue !== 1 && activeValue === 1 ? 'text-[#2563eb]' : ''}`}>Identify Problem</h3>
                <p className={activeValue === 1 ? "text-white/80" : "text-[#555]"}>
                  I start by identifying the core problem — analyzing the requirements and data to build a solid foundation.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className={activeValue === 2 ? "box-dark py-8 cursor-pointer group" : "box-light py-8 cursor-pointer group"}
                onClick={() => setActiveValue(2)}
              >
                <h3 className={`text-xl font-bold mb-2 transition-colors ${activeValue === 2 ? 'text-white' : 'group-hover:text-[#2563eb]'}`}>Clarity & Strategy</h3>
                <p className={activeValue === 2 ? "text-white/80" : "text-[#555]"}>
                  Complex logic translated into clear, maintainable code. Every technical decision is grounded in measurable outcomes.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className={activeValue === 3 ? "box-dark py-8 cursor-pointer group" : "box-light py-8 cursor-pointer group"}
                onClick={() => setActiveValue(3)}
              >
                <h3 className={`text-xl font-bold mb-2 transition-colors ${activeValue === 3 ? 'text-white' : 'group-hover:text-[#2563eb]'}`}>Intentional Execution</h3>
                <p className={activeValue === 3 ? "text-white/80" : "text-[#555]"}>
                  Every line of code and architectural choice serves a strategic function — no guesswork, just results.
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 h-[700px] bg-[#f0f0f0] rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src="/assets/ai_agent_project.png" 
                alt="Workspace" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
              />
            </motion.div>
          </div>
        </Section>

        {/* ── CAREER PATH / EXPERIENCE ── */}
        <Section id="experience">
          <motion.div 
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="heading-section">My <span className="text-[#2563eb]">Career Path</span></h2>
            <p className="text-xl text-[#555] max-w-2xl font-medium">
              Building, learning, and evolving across AI, machine learning, and full-stack development.
            </p>
          </motion.div>

          <motion.div 
            className="timeline-container grid grid-cols-1 md:grid-cols-4 gap-8 relative mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="timeline-line hidden md:block"></div>
            
            {EXPERIENCE.map((exp, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className={`relative pt-8 md:pt-12 group cursor-pointer ${activeExperience === i ? 'box-dark p-8 md:-mt-12 md:z-10' : ''}`}
                onClick={() => setActiveExperience(i)}
              >
                <div className={`timeline-dot hidden md:block transition-colors duration-300 group-hover:border-[#2563eb] ${activeExperience === i ? 'active bg-[#111] border-[#2563eb]' : ''}`}></div>
                <div className="mb-6">
                  <p className={`text-sm mb-4 font-bold ${activeExperience === i ? 'text-[#60a5fa]' : 'text-[#2563eb]'}`}>
                    {exp.year}
                  </p>
                  <h3 className={`text-xl font-bold ${activeExperience === i ? 'text-white' : ''}`}>{exp.role}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${activeExperience === i ? 'text-white/80' : 'text-[#555]'}`}>
                  {exp.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ── CONTACT ── */}
        <Section id="contact" className="border-b-0 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="heading-hero leading-[0.9] mb-8">
                Let's<br /><span className="text-[#2563eb]">Connect.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-xl text-[#555] max-w-md mb-12 font-medium">
                Whether you're looking for a developer, an AI engineer, or simply want to exchange ideas — I'd love to hear from you.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a href="mailto:islamrabi93@gmail.com" className="btn-primary">
                  Get In Touch <ArrowRight className="w-5 h-5" />
                </a>
                <a href="https://github.com/islam-rabiul" target="_blank" rel="noreferrer" className="btn-secondary">
                  View GitHub <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="border border-[#e5e5e5] p-8 md:p-12 text-center bg-[#fafafa] rounded-2xl shadow-lg hover:shadow-xl hover:border-[#2563eb] transition-all duration-300 group"
            >
              <div className="w-full aspect-[4/3] bg-[#f0f0f0] mb-8 overflow-hidden rounded-xl">
                <img 
                  src="/assets/mainphoto.jpg" 
                  alt="Mohammad Rabiul Islam" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-1">Mohammad Rabiul Islam</h3>
              <p className="text-[#2563eb] font-semibold mb-8">AI & ML Engineer</p>
              
              <div className="w-full h-[1px] bg-[#e5e5e5] mb-8 group-hover:bg-[#bfdbfe] transition-colors"></div>
              
              <div className="space-y-3 text-[#555] font-medium">
                <p className="hover:text-[#2563eb] transition-colors cursor-pointer">islamrabi93@gmail.com</p>
                <p className="hover:text-[#2563eb] transition-colors cursor-pointer">github.com/islam-rabiul</p>
                <p className="hover:text-[#2563eb] transition-colors cursor-pointer">linkedin.com/in/mohammad-rabiul-islam</p>
              </div>
            </motion.div>
          </div>
        </Section>

      </main>
    </div>
  );
};

export default App;
