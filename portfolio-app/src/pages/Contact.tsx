import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { socialLinks } from "../components/Footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
};

type SelectOption = { value: string; label: string };

function SketchSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={`sketch-select-trigger ${open ? "sketch-select-trigger-open" : ""}`}
      >
        <span className={selectedOption ? "text-black dark:text-white" : "text-neutral-400"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span className={`sketch-select-arrow ${open ? "rotate-180" : ""}`}>↓</span>
      </button>

      {open && (
        <div className="sketch-select-menu" role="listbox">
          <button
            type="button"
            role="option"
            aria-selected={!value}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`sketch-select-option ${!value ? "sketch-select-option-active" : ""}`}
          >
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option.value}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`sketch-select-option ${value === option.value ? "sketch-select-option-active" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (serviceParam && ["web", "automation", "ai", "other"].includes(serviceParam)) {
      setSelectedService(serviceParam);
    }
  }, [serviceParam]);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const services = [
    { id: "web", label: "WEB DEV" },
    { id: "automation", label: "AUTOMATION" },
    { id: "ai", label: "AI SOLUTIONS" },
    { id: "other", label: "OTHER" },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("islamrabiul786@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!name.trim()) {
      setStatusMessage({ type: "error", text: "Please enter your name." });
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setStatusMessage({ type: "error", text: "Please provide a valid email address." });
      return;
    }
    if (!message.trim()) {
      setStatusMessage({ type: "error", text: "Please include a short message describing your project." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service: selectedService,
          details: message.trim(),
          budget,
          deadline: timeline,
        }),
      });

      let data: any = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        throw new Error(data?.error || `Failed to send message (HTTP ${response.status}). Please try again or email directly.`);
      }

      setStatusMessage({
        type: "success",
        text: data?.message || "Thank you! Your message has been sent successfully. I'll get back to you shortly.",
      });

      // Clear form inputs
      setName("");
      setEmail("");
      setMessage("");
      setSelectedService(null);
      setBudget("");
      setTimeline("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again or email directly.";
      setStatusMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell flex flex-col flex-1 items-center bg-background font-sans transition-colors duration-500 overflow-hidden min-h-screen pt-36 md:pt-44 pb-24">
      <main className="flex flex-1 w-full max-w-7xl flex-col px-6 md:px-12 transition-colors duration-500 gap-24 md:gap-32">
        
        {/* Split Editorial Layout: Left Anchor & Right Form */}
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          
          {/* Left Column — Visual Anchor */}
          <div className="flex flex-col items-start gap-8 lg:sticky lg:top-36">

            <motion.span
              className="page-kicker"
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="show"
            >
              Start a conversation
            </motion.span>
            
            <motion.h1
              className="font-norwester text-[3.5rem] uppercase leading-[0.88] tracking-tight text-black dark:text-white sm:text-[5rem] md:text-[6rem] lg:text-[6.4rem]"
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
            >
              Let’s{" "}
              <span className="text-[#8b5cf6] underline decoration-[#8b5cf6] decoration-[4px] md:decoration-[8px] underline-offset-[8px] md:underline-offset-[14px]">
                Talk.
              </span>
            </motion.h1>

            <motion.p
              className="font-balgin text-lg sm:text-xl md:text-[1.35rem] leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-lg mt-2"
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
            >
              Have something worth building? Tell me what you&apos;re working on. I&apos;ll help turn the idea into a clear plan and a working product.
            </motion.p>

            {/* Availability indicator */}
            <motion.div
              className="sketch-dash flex items-center gap-3 px-4 py-2 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-black dark:text-white mt-1"
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
            >
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b5cf6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8b5cf6]"></span>
              </span>
              <span>Available for freelance projects</span>
            </motion.div>

            {/* Direct Contact & Elsewhere Links */}
            <motion.div
              className="flex flex-col gap-8 pt-8 mt-4 border-t border-neutral-200 dark:border-neutral-800 w-full"
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
            >
              {/* Email */}
              <div className="flex flex-col gap-2">
                <span className="font-norwester text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                  Direct Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="group flex items-center gap-3 w-fit text-left focus:outline-none"
                  title="Click to copy email"
                >
                  <span className="text-base sm:text-lg font-mono text-neutral-900 dark:text-neutral-100 group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors duration-200">
                    islamrabiul786@gmail.com
                  </span>
                  <span className="text-[0.65rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#8b5cf6]/15 text-[#7c3aed] dark:text-[#a78bfa] group-hover:bg-[#8b5cf6]/25 transition-all">
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>

              {/* Socials / Elsewhere */}
              <div className="flex flex-col gap-3">
                <span className="font-norwester text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                  Elsewhere
                </span>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#7c3aed] dark:hover:text-[#a78bfa] transition-colors duration-200"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Editorial Line-Based Form */}
          <motion.div
            className="sketch-form-panel flex w-full flex-col p-6 sm:p-9"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
          >
            <div className="mb-10 flex items-end justify-between border-b-2 border-dashed border-black pb-4 dark:border-white">
              <h2 className="font-norwester text-2xl md:text-3xl tracking-wider text-black dark:text-white uppercase">
                Start a Project
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c3aed] dark:text-[#a78bfa]">
                01 / Enquiry
              </span>
            </div>

            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              {/* Status feedback message */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl font-mono text-sm border transition-all ${
                    statusMessage.type === "success"
                      ? "bg-[#8b5cf6]/15 border-[#8b5cf6] text-[#7c3aed] dark:text-[#a78bfa]"
                      : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* Your Name */}
              <div className="flex flex-col gap-2 group">
                <label className="font-norwester text-xs sm:text-sm tracking-widest uppercase text-neutral-500 dark:text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full pb-3 pt-1 bg-transparent border-b-2 border-dashed border-neutral-300 dark:border-neutral-800 text-black dark:text-white placeholder:text-neutral-400/50 font-mono text-base sm:text-lg focus:outline-none focus:border-[#8b5cf6] transition-colors rounded-none"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2 group">
                <label className="font-norwester text-xs sm:text-sm tracking-widest uppercase text-neutral-500 dark:text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full pb-3 pt-1 bg-transparent border-b-2 border-dashed border-neutral-300 dark:border-neutral-800 text-black dark:text-white placeholder:text-neutral-400/50 font-mono text-base sm:text-lg focus:outline-none focus:border-[#8b5cf6] transition-colors rounded-none"
                />
              </div>

              {/* Project Type */}
              <div className="flex flex-col gap-3">
                <label className="font-norwester text-xs sm:text-sm tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                  What Can I Help With?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {services.map((s) => {
                    const isSelected = selectedService === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(isSelected ? null : s.id)}
                        className={`py-3 px-3 text-center border-2 border-dashed font-mono text-xs tracking-wider uppercase transition-all duration-200 rounded-lg cursor-pointer ${
                          isSelected
                            ? "border-[#8b5cf6] bg-[#8b5cf6] text-white font-bold shadow-md shadow-[#8b5cf6]/25"
                            : "border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white bg-transparent"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 group">
                <label className="font-norwester text-xs sm:text-sm tracking-widest uppercase text-neutral-500 dark:text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">
                  Tell Me About Your Project *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Overview, scope, goals, or problems you're looking to solve..."
                  className="w-full pb-3 pt-1 bg-transparent border-b-2 border-dashed border-neutral-300 dark:border-neutral-800 text-black dark:text-white placeholder:text-neutral-400/50 font-mono text-base sm:text-lg focus:outline-none focus:border-[#8b5cf6] transition-colors resize-none rounded-none"
                />
              </div>

              {/* Budget & Timeline Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-norwester text-xs sm:text-sm tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                    Budget Range
                  </label>
                  <div className="relative">
                    <SketchSelect
                      value={budget}
                      onChange={setBudget}
                      placeholder="Select budget (Optional)"
                      options={[
                        { value: "under-10k", label: "Under ₹10k" },
                        { value: "10k-25k", label: "₹10k – ₹25k" },
                        { value: "25k-50k", label: "₹25k – ₹50k" },
                        { value: "50k-1L", label: "₹50k – ₹1L" },
                        { value: "1L-plus", label: "₹1L+" },
                        { value: "not-sure", label: "Not sure yet" },
                      ]}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-norwester text-xs sm:text-sm tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                    Timeline
                  </label>
                  <div className="relative">
                    <SketchSelect
                      value={timeline}
                      onChange={setTimeline}
                      placeholder="Select timeline (Optional)"
                      options={[
                        { value: "asap", label: "ASAP" },
                        { value: "1-2-months", label: "1–2 months" },
                        { value: "3-plus-months", label: "3+ months" },
                        { value: "flexible", label: "Flexible" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex justify-start sm:justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sketch-button w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#8b5cf6] disabled:opacity-60 text-white font-norwester text-lg uppercase tracking-widest px-10 py-4 hover:-translate-y-1 hover:bg-[#7c3aed] hover:shadow-lg hover:shadow-[#8b5cf6]/30 active:translate-y-0 disabled:hover:translate-y-0 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Enquiry →"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Bottom Horizontal Process Strip */}
        <motion.div
          className="sketch-rule pt-16 border-neutral-200 dark:border-neutral-800 flex flex-col gap-10"
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="font-norwester text-xs sm:text-sm tracking-widest uppercase text-[#7c3aed] dark:text-[#a78bfa]">
              Workflow
            </span>
            <span className="font-norwester text-lg sm:text-xl tracking-wider text-black dark:text-white uppercase">
              From Idea → To Something Real.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-norwester text-sm text-[#8b5cf6]">01</span>
                <span className="font-norwester text-base uppercase tracking-wider text-black dark:text-white">
                  Discuss
                </span>
              </div>
              <p className="font-balgin text-sm text-neutral-600 dark:text-neutral-400 pl-7 leading-relaxed">
                You tell me about the project. A few details and constraints are plenty to begin with.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-norwester text-sm text-[#8b5cf6]">02</span>
                <span className="font-norwester text-base uppercase tracking-wider text-black dark:text-white">
                  Plan
                </span>
              </div>
              <p className="font-balgin text-sm text-neutral-600 dark:text-neutral-400 pl-7 leading-relaxed">
                We clarify the scope, technical approach, timeline, and exact deliverables.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-norwester text-sm text-[#8b5cf6]">03</span>
                <span className="font-norwester text-base uppercase tracking-wider text-black dark:text-white">
                  Build
                </span>
              </div>
              <p className="font-balgin text-sm text-neutral-600 dark:text-neutral-400 pl-7 leading-relaxed">
                Execution, clean codebase, automation pipelines, and delivery into production.
              </p>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
