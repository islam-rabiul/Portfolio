import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

interface CLIResumeModalProps {
  open: boolean;
  onClose: () => void;
}

type HistoryItem = { kind: 'cmd' | 'out'; text: string };

export const CLIResumeModal: React.FC<CLIResumeModalProps> = ({ open, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { kind: 'out', text: '⚡ Interactive Terminal Resume v2.4.0 [Mohammad Rabiul Islam]' },
    { kind: 'out', text: 'Type "help" for a list of available commands.\n' },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  if (!open) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { kind: 'cmd', text: `$ ${trimmed}` }]);
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdIdx(null);
    setInput('');

    const lower = trimmed.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    }

    if (lower === 'help') {
      setHistory((prev) => [
        ...prev,
        {
          kind: 'out',
          text: `Available Commands:
  • help           - Display this list of commands
  • bio / about    - Overview of Mohammad Rabiul Islam
  • skills         - Technical expertise & tech stack
  • projects       - Showcase of key projects
  • contact        - Get email & social links
  • experience     - Career & project highlights
  • education      - Academic background & certifications
  • download       - Download official PDF resume
  • clear          - Clear terminal screen
  • exit           - Close CLI modal`,
        },
      ]);
      return;
    }

    if (lower === 'bio' || lower === 'about') {
      setHistory((prev) => [
        ...prev,
        {
          kind: 'out',
          text: `Mohammad Rabiul Islam
Role: Full-Stack Developer & AI/ML Engineer
Location: Prayagraj, UP, India (Remote / Worldwide)
Bio: Problem-solver specializing in React.js, Express/Node.js, Python, and Machine Learning. Passionate about automating workflows using n8n and building high-performance AI agents.`,
        },
      ]);
      return;
    }

    if (lower === 'skills') {
      setHistory((prev) => [
        ...prev,
        {
          kind: 'out',
          text: `Technical Skill Matrix:
  [Frontend]  React.js, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3
  [Backend]   Node.js, Express.js, REST APIs, Python, FastAPI, Microservices
  [AI / ML]   Scikit-Learn, Random Forest, Gemini AI, n8n Automations, OpenCV
  [Databases] MongoDB, PostgreSQL, Mongoose
  [DevOps]    Git, GitHub, Vercel, Render, Postman, CI/CD`,
        },
      ]);
      return;
    }

    if (lower === 'projects') {
      setHistory((prev) => [
        ...prev,
        {
          kind: 'out',
          text: `Featured Works:
  1. Customer Support AI Agent
     - Automated ticket routing & sentiment analysis via n8n & Gemini AI.
  2. Full-Stack Ecommerce Platform
     - Modern React frontend, Node/Express backend, Razorpay payments.
  3. Lung Cancer Detection ML Model
     - 97% classification accuracy using Python & Random Forest classifier.
  4. Computer Vision Suite
     - Real-time image blending and spatial transformations with OpenCV.`,
        },
      ]);
      return;
    }

    if (lower === 'contact') {
      setHistory((prev) => [
        ...prev,
        {
          kind: 'out',
          text: `Contact & Social Links:
  • Email:    islamrabi93@gmail.com
  • GitHub:   https://github.com/islam-rabiul
  • LinkedIn: https://www.linkedin.com/in/mohammad-rabiul-islam/`,
        },
      ]);
      return;
    }

    if (lower === 'experience') {
      setHistory((prev) => [
        ...prev,
        {
          kind: 'out',
          text: `Experience Highlights:
  • Full-Stack & AI Solutions Freelancer (2023 - Present)
    Architected custom web applications, AI support agents, and predictive ML systems.
  • Open Source Contributor (2022 - Present)
    Developed OpenCV utilities and Machine Learning prediction repositories on GitHub.`,
        },
      ]);
      return;
    }

    if (lower === 'education') {
      setHistory((prev) => [
        ...prev,
        {
          kind: 'out',
          text: `Education & Certifications:
  • IIIT Allahabad Certification & Workshops
  • Army Institute of Technology (AIT) Technical Training
  • Full-Stack Web Development & AI Engineering - Udemy Certified`,
        },
      ]);
      return;
    }

    if (lower === 'download' || lower === 'cat resume.pdf') {
      setHistory((prev) => [
        ...prev,
        { kind: 'out', text: 'Initiating download for Resume.pdf...' },
      ]);
      window.open('/assets/Resume.pdf', '_blank');
      return;
    }

    if (lower === 'exit') {
      onClose();
      return;
    }

    if (lower === 'sudo' || lower.startsWith('sudo ')) {
      setHistory((prev) => [
        ...prev,
        { kind: 'out', text: 'Permission granted: You are now running in GOD MODE 🚀' },
      ]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      {
        kind: 'out',
        text: `zsh: command not found: ${trimmed}. Type "help" for a list of valid commands.`,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length === 0) return;
      const nextIdx = cmdIdx === null ? cmdHistory.length - 1 : Math.max(0, cmdIdx - 1);
      setCmdIdx(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      if (cmdIdx === null) return;
      const nextIdx = cmdIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setCmdIdx(null);
        setInput('');
      } else {
        setCmdIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-3xl h-[520px]'
        }`}
      >
        {/* Terminal Header */}
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block cursor-pointer" onClick={() => setIsFullscreen(!isFullscreen)} />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block cursor-pointer" onClick={() => setIsFullscreen(!isFullscreen)} />
            <span className="ml-3 font-mono text-xs text-gray-400 flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              rabiul@portfolio:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hover:text-white transition-colors p-1"
              title={isFullscreen ? 'Restore' : 'Maximize'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button onClick={onClose} className="hover:text-white transition-colors p-1" title="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-5 font-mono text-xs sm:text-sm overflow-y-auto bg-[#0d1117] text-gray-200 space-y-2 cursor-text selection:bg-cyan-500 selection:text-black"
        >
          {history.map((item, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">
              {item.kind === 'cmd' ? (
                <span className="text-cyan-400 font-bold">{item.text}</span>
              ) : (
                <span className="text-gray-300">{item.text}</span>
              )}
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold">rabiul@portfolio</span>
            <span className="text-gray-400">:~#</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono text-xs sm:text-sm caret-cyan-400 focus:ring-0"
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>

        {/* Quick Command Suggestions Footer */}
        <div className="bg-[#161b22] px-4 py-2 border-t border-[#30363d] flex flex-wrap gap-2 text-[11px] font-mono">
          <span className="text-gray-500">Quick run:</span>
          {['help', 'bio', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-[#21262d] text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
