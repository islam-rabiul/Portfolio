import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, X } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  desc: string;
  details: string;
  tech: string[];
  github: string;
  live?: string;
  badge: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Customer Support AI Agent",
    client: "AI Automation",
    category: "AI & Automation",
    desc: "Automated customer support system using n8n workflows and Gemini AI for sentiment analysis and query routing.",
    details:
      "Engineered an autonomous support workflow that listens for client inquiries, routes them to Gemini AI for sentiment and intent classification, extracts key entities, and updates CRM ticket status in real time without human intervention.",
    tech: ["n8n Workflows", "Gemini AI", "Node.js", "MongoDB", "Webhooks"],
    github: "https://github.com/islam-rabiul",
    badge: "n8n + Gemini AI",
  },
  {
    id: "02",
    title: "Full-Stack Ecommerce Store",
    client: "E-Commerce",
    category: "Web Development",
    desc: "Full-stack shopping platform with React.js frontend, Node.js/Express backend, and Razorpay payments.",
    details:
      "Built a scalable online store complete with dynamic catalog filtering, shopping cart state management, user authentication, inventory tracking, and seamless Razorpay payment gateway integration.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Razorpay"],
    github: "https://github.com/islam-rabiul",
    badge: "Full-Stack MERN",
  },
  {
    id: "03",
    title: "Lung Cancer Detection ML Model",
    client: "Healthcare ML",
    category: "Machine Learning",
    desc: "Machine learning model achieving 97% accuracy using Random Forest algorithm.",
    details:
      "Trained and evaluated a supervised Machine Learning pipeline on medical feature sets. Implemented feature scaling, cross-validation, hyperparameter tuning, and Random Forest classification to deliver 97% diagnostic prediction precision.",
    tech: ["Python", "Scikit-Learn", "Random Forest", "Pandas", "NumPy"],
    github: "https://github.com/islam-rabiul/Machine-Learning-Projects",
    badge: "97% Accuracy ML",
  },
  {
    id: "04",
    title: "Password Strength & Security Validator",
    client: "Cyber Security",
    category: "Cyber Security",
    desc: "Interactive password strength evaluation & security validation tool checking entropy, regex rules, and pattern matching.",
    details:
      "Developed an interactive security evaluation tool that measures password entropy, checks for common dictionary patterns, validates complexity compliance, and provides actionable user feedback for secure credential management.",
    tech: ["Python", "Cryptography", "Regex", "Security Auditing"],
    github: "https://github.com/islam-rabiul/Password-Validator",
    badge: "Security Audit Tool",
  },
];

export default function Work() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterCategories = ["All", "Web Development", "AI & Automation", "Machine Learning", "Cyber Security"];

  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  return (
    <div className="page-shell flex flex-col flex-1 items-center bg-background font-sans transition-colors duration-500 overflow-hidden min-h-screen pt-36 md:pt-44 pb-24">
      <main className="flex flex-1 w-full max-w-7xl flex-col px-6 md:px-12 gap-20 md:gap-28">

        {/* Hero */}
        <div className="flex flex-col gap-8">
          <motion.div className="flex flex-col gap-2" variants={fadeUp} custom={0} initial="hidden" animate="show">
            <span className="page-kicker">Work / Selected Builds</span>
            <h1 className="font-norwester text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] leading-[0.92] tracking-tight text-black dark:text-white uppercase">
              Selected <span className="text-[#8b5cf6]">Projects.</span>
            </h1>
          </motion.div>

          <motion.p className="font-balgin text-lg md:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-2xl mt-2" variants={fadeUp} custom={1} initial="hidden" animate="show">
            A curated portfolio of web applications, AI automations, machine learning models, and security tools engineered with focus and precision.
          </motion.p>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap items-center gap-2.5 pt-4 border-t-2 border-dashed border-neutral-300 dark:border-neutral-800"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mr-2">
              Filter:
            </span>
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-[#8b5cf6] text-white font-bold shadow-md shadow-[#8b5cf6]/25 border border-[#8b5cf6]"
                    : "bg-white/50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 hover:border-black dark:hover:border-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="sketch-panel group relative flex flex-col justify-between bg-white/80 dark:bg-[#111111]/80 p-8 sm:p-10 border-neutral-300/80 dark:border-neutral-800 hover:border-[#8b5cf6] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#7c3aed] dark:text-[#a78bfa] font-bold">
                    [{project.badge}]
                  </span>
                  <span className="font-mono text-sm text-neutral-400">
                    [{project.id}]
                  </span>
                </div>

                <h3 className="mt-4 font-norwester text-2xl sm:text-3xl uppercase tracking-wide text-black dark:text-white group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors">
                  {project.title}
                </h3>

                <p className="mt-3 font-balgin text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {project.desc}
                </p>

                {/* Tech Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-neutral-100 px-2.5 py-1 font-mono text-[10px] uppercase font-semibold text-neutral-700 dark:bg-white/5 dark:text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action bar */}
              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="font-norwester text-xs uppercase tracking-widest text-[#7c3aed] dark:text-[#a78bfa] hover:underline cursor-pointer flex items-center gap-1"
                >
                  View Details &rarr;
                </button>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sketch-button flex items-center gap-2 bg-neutral-950 dark:bg-white text-white dark:text-black px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-[#8b5cf6] hover:text-white dark:hover:bg-[#8b5cf6] dark:hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Project Detail */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="sketch-panel relative w-full max-w-2xl bg-white dark:bg-[#111111] p-8 sm:p-10 text-black dark:text-white border-2 border-[#8b5cf6] shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="font-mono text-xs uppercase tracking-widest text-[#7c3aed] dark:text-[#a78bfa] font-bold">
                  Project Case Study
                </span>

                <h2 className="mt-2 font-norwester text-3xl sm:text-4xl uppercase tracking-wide">
                  {selectedProject.title}
                </h2>

                <div className="mt-4 p-4 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 font-balgin text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {selectedProject.details}
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <span className="font-norwester text-xs uppercase tracking-widest text-neutral-400">
                    Technologies &amp; Architecture:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-[#8b5cf6]/15 text-[#7c3aed] dark:text-[#a78bfa] font-mono text-xs rounded-md font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sketch-button flex items-center gap-2 bg-[#8b5cf6] text-white px-6 py-3 font-norwester text-sm uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Strip */}
        <motion.section className="sketch-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 py-12 px-10 md:px-14 bg-[#8b5cf6] text-white" variants={fadeUp} custom={3} initial="hidden" animate="show">
          <div className="flex flex-col gap-2">
            <h2 className="font-norwester text-2xl md:text-3xl uppercase tracking-wide text-white">Need something similar?</h2>
            <p className="font-balgin text-base text-white/80">Let me know what you are building.</p>
          </div>
          <Link to="/contact" className="sketch-button shrink-0 inline-flex items-center gap-2 bg-black text-white font-norwester text-lg uppercase tracking-widest px-8 py-4 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-300">
            Start a Project &rarr;
          </Link>
        </motion.section>

      </main>
    </div>
  );
}
