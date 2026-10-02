import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

export default function About() {
  return (
    <div className="page-shell flex flex-col flex-1 items-center bg-background font-sans transition-colors duration-500 overflow-hidden min-h-screen pt-36 md:pt-44 pb-24">
      <main className="flex flex-1 w-full max-w-7xl flex-col px-6 md:px-12 gap-24 md:gap-32">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col gap-10 lg:col-span-7">
            <motion.div className="flex flex-col gap-5" variants={fadeUp} custom={0} initial="hidden" animate="show">
              <span className="page-kicker">ABOUT THE BUILDER</span>
              <h1 className="font-norwester text-[3.5rem] uppercase leading-[0.88] tracking-tight text-black dark:text-white sm:text-[5rem] md:text-[6.5rem]">
                MD RABIUL<br /><span className="text-[#8b5cf6]">ISLAM.</span>
              </h1>
              <p className="max-w-xl border-l-2 border-[#8b5cf6] pl-5 font-balgin text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-2xl">
                I turn complex ideas and repetitive manual work into modern digital experiences, intelligent automations, and scalable web systems.
              </p>
            </motion.div>

            <motion.div className="sketch-rule flex flex-col gap-5 border-neutral-300 pt-8 dark:border-neutral-800" variants={fadeUp} custom={1} initial="hidden" animate="show">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7c3aed] dark:text-[#a78bfa]">A LITTLE MORE ABOUT ME</span>
              <div className="flex flex-col gap-4 font-balgin text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-xl">
                <p>I specialize in full-stack web engineering, workflow automations (n8n & AI agents), and machine learning applications. I enjoy finding the confusing, manual parts of a process and making them feel simple.</p>
                <p>My goal is not to add more unnecessary code or bloated plugins. It is to build high-performance, maintainable software and self-running systems that solve actual business challenges.</p>
              </div>
            </motion.div>

            <motion.div className="flex flex-wrap items-center gap-4 pt-2" variants={fadeUp} custom={2} initial="hidden" animate="show">
              <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8b5cf6] shadow-[0_0_0_4px_rgba(139,92,246,0.2)]" />
                Available for freelance and contract projects
              </div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="sketch-dash inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white bg-white/50 dark:bg-white/5 hover:border-[#8b5cf6] transition-colors"
              >
                <Download className="w-4 h-4 text-[#8b5cf6]" />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </div>

          <motion.div className="relative flex flex-col gap-6 lg:col-span-5 lg:pt-10" variants={fadeUp} custom={2} initial="hidden" animate="show">
            <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[50%] border-2 border-dashed border-[#8b5cf6]/40 rotate-[-4deg]" />
            <div className="relative p-2.5 bg-white dark:bg-[#121215] border-2 border-neutral-900/10 dark:border-neutral-800 rounded-[2.2rem] shadow-[0_20px_50px_rgba(139,92,246,0.25)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(139,92,246,0.35)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] border-2 border-neutral-900 dark:border-neutral-700 shadow-inner">
                <img src="/profile.jpg" alt="MD Rabiul Islam" className="w-full h-full object-cover object-[center_14%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <span className="font-norwester text-xl uppercase tracking-wide">MD Rabiul Islam</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#a78bfa]">Web · Automations · AI</span>
                </div>
              </div>
            </div>
            <span className="rotate-[-3deg] self-end font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">That&apos;s me →</span>
          </motion.div>
        </div>

        <motion.section className="flex flex-col gap-8" variants={fadeUp} custom={3} initial="hidden" animate="show">
          <div className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-neutral-900 pb-5 dark:border-white sm:flex-row sm:items-end">
            <div>
              <span className="page-kicker">WHAT I PROVIDE</span>
              <h2 className="mt-3 font-norwester text-3xl uppercase tracking-wide text-black dark:text-white md:text-5xl">Useful things, built well.</h2>
            </div>
            <p className="max-w-sm font-balgin text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">Choose the problem. I&apos;ll help shape the right digital solution.</p>
          </div>

          <div className="grid gap-x-10 md:grid-cols-3">
            {[
              ["01", "Web Development", "Websites and digital products that feel clear, fast, and dependable."],
              ["02", "Automation Systems", "Workflows with n8n & webhooks that remove repetitive effort and keep work moving."],
              ["03", "AI & ML Experiences", "Practical AI features, Gemini agent loops, and predictive ML models."],
            ].map(([number, title, description]) => (
              <div key={number} className="group flex flex-col gap-5 border-b-2 border-dashed border-neutral-300 py-7 dark:border-neutral-800 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#7c3aed] dark:text-[#a78bfa]">[{number}]</span>
                <h3 className="font-norwester text-2xl uppercase tracking-wide text-black transition-colors group-hover:text-[#7c3aed] dark:text-white dark:group-hover:text-[#a78bfa]">{title}</h3>
                <p className="font-balgin leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>
              </div>
            ))}
          </div>

          <Link to="/contact" className="sketch-button group inline-flex w-fit items-center gap-3 bg-neutral-950 px-7 py-4 font-norwester text-base uppercase tracking-widest text-white dark:bg-white dark:text-black hover:bg-[#8b5cf6] hover:text-white transition-colors">
            Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </motion.section>
      </main>
    </div>
  );
}
