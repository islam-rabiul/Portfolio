import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Palette,
  RefreshCw,
  Workflow,
  Database,
  Bot,
  CheckCircle2,
  ArrowRight,
  Clock,
  ChevronDown,
  ShieldCheck,
  Zap,
  Smile,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

interface ServiceItem {
  id: string;
  anchor: string;
  badge: string;
  title: string;
  category: "Websites & Apps" | "Automations" | "AI & Chatbots";
  headline: string;
  customerProblem: string;
  customerOutcome: string;
  whatYouGet: string[];
  timeline: string;
  contactServiceKey: string;
  icon: typeof Globe;
}

const serviceList: ServiceItem[] = [
  {
    id: "01",
    anchor: "web-development",
    badge: "Custom Web",
    title: "Custom Web Development",
    category: "Websites & Apps",
    headline: "Fast, reliable web platforms that turn visitors into paying clients.",
    customerProblem: "Your current website looks outdated, runs slowly, or can't handle custom features your business needs to grow.",
    customerOutcome: "A clean, responsive, high-converting digital presence that builds immediate credibility and works flawlessly on every phone and laptop.",
    whatYouGet: [
      "Custom website or web platform tailored specifically to your business goals",
      "Instant loading times that keep prospective buyers from bouncing",
      "Secure payments, member accounts, or custom booking systems",
      "Mobile-friendly design tested across all screen sizes",
      "100% full ownership of your code, site, and domain",
    ],
    timeline: "2 to 4 weeks",
    contactServiceKey: "web",
    icon: Globe,
  },
  {
    id: "02",
    anchor: "ui-enhancement",
    badge: "Interface Polish",
    title: "Website & UI Redesign",
    category: "Websites & Apps",
    headline: "Give your existing product an expensive, modern, trustworthy look.",
    customerProblem: "You already have a product or site, but it looks clunky, feels amateur, or is confusing for new visitors to navigate.",
    customerOutcome: "A polished, world-class aesthetic that increases user trust, boosts retention, and makes your brand look industry-leading.",
    whatYouGet: [
      "Fresh, modern look with clear hierarchy and premium typography",
      "Intuitive navigation so clients find what they need in seconds",
      "Smooth visual interactions that make your app feel snappy and high-end",
      "Consistent colors, fonts, and button styles across every single page",
      "Clear call-to-actions placed where customers actually click",
    ],
    timeline: "1 to 2 weeks",
    contactServiceKey: "web",
    icon: Palette,
  },
  {
    id: "03",
    anchor: "migration",
    badge: "Modernization",
    title: "Website Upgrade & Rebuild",
    category: "Websites & Apps",
    headline: "Upgrade old, broken, or slow platforms without losing your traffic.",
    customerProblem: "Trapped on bloated builders (slow WordPress, plugins constantly breaking, or costly developer fees for tiny edits).",
    customerOutcome: "A future-proof setup with zero plugin bloat, rock-solid security, lightning speed, and no recurring hosting headache.",
    whatYouGet: [
      "Smooth rebuild of your existing site with improved speed and reliability",
      "Zero downtime during transition so you never miss a customer",
      "Preservation of your existing Google rankings and search traffic",
      "Simplified editing so updating your content is effortless",
      "Drastically reduced server and maintenance expenses",
    ],
    timeline: "2 to 3 weeks",
    contactServiceKey: "web",
    icon: RefreshCw,
  },
  {
    id: "04",
    anchor: "automation",
    badge: "Operations",
    title: "Workflow & Business Automation",
    category: "Automations",
    headline: "Stop doing repetitive manual tasks. Put your routine work on autopilot.",
    customerProblem: "You and your team spend hours every day copying data between apps, sending manual follow-ups, and sorting invoices.",
    customerOutcome: "Information flows automatically between your tools behind the scenes via n8n & APIs, saving 10+ hours a week.",
    whatYouGet: [
      "Automated customer lead routing directly to your phone or team chat",
      "Automatic invoice creation, document generation, and receipt delivery",
      "Automated email onboarding sequences triggered whenever someone signs up",
      "Error notifications so you know immediately if an external service goes down",
      "A set-and-forget setup that runs quietly 24/7 in the background",
    ],
    timeline: "1 to 2 weeks",
    contactServiceKey: "automation",
    icon: Workflow,
  },
  {
    id: "05",
    anchor: "ai-integration",
    badge: "Tool Sync",
    title: "Database & CRM Integrations",
    category: "Automations",
    headline: "Connect all your software into one seamless ecosystem.",
    customerProblem: "Leads get lost between your website, your email inbox, your MongoDB database, and your team's spreadsheets.",
    customerOutcome: "Every inquiry, form submission, and customer note syncs automatically with zero manual data entry.",
    whatYouGet: [
      "Direct sync between your website and your database / CRM (MongoDB, Airtable, Notion)",
      "Automated lead tagging so you know who is ready to buy",
      "Automatic client calendar booking and reminder sequences",
      "Centralized customer records with zero duplicate entries",
      "Real-time alerts to your team whenever high-value leads arrive",
    ],
    timeline: "1 to 2 weeks",
    contactServiceKey: "automation",
    icon: Database,
  },
  {
    id: "06",
    anchor: "ai-chatbots",
    badge: "24/7 Assistant",
    title: "Custom AI Agents & ML Systems",
    category: "AI & Chatbots",
    headline: "An intelligent assistant that answers questions and handles tasks 24/7.",
    customerProblem: "Customers visit your site after hours and leave because no one is there to answer their questions or book a call.",
    customerOutcome: "A friendly, custom Gemini AI assistant or trained Machine Learning model that answers inquiries accurately.",
    whatYouGet: [
      "Trained strictly on your business facts, pricing, and FAQs (never makes things up)",
      "Qualifies prospects by asking the right questions before booking a meeting",
      "Works 24 hours a day, 7 days a week, in any language your clients speak",
      "Sends captured contact info and conversation summaries directly to your email",
      "Clean widget that looks natural on your website without annoying popups",
    ],
    timeline: "2 to 3 weeks",
    contactServiceKey: "ai",
    icon: Bot,
  },
];

const packages = [
  {
    name: "Quick Sprint",
    badge: "Fastest Turnaround",
    target: "Targeted Fixes & High-Impact Upgrades",
    description: "Ideal if you have one specific problem to solve fast: launching a landing page, automating a lead pipeline, or refreshing an outdated UI.",
    highlights: [
      "Delivered in 1 to 2 weeks",
      "Fixed scope & zero surprise costs",
      "Direct 1-on-1 communication",
      "14 days of post-launch support",
    ],
    serviceKey: "web",
    highlight: false,
  },
  {
    name: "Complete Project",
    badge: "Most Popular",
    target: "Full Build from Concept to Launch",
    description: "The complete package for founders and businesses who need an end-to-end custom website, complex n8n automation system, or tailored AI agent.",
    highlights: [
      "Delivered in 3 to 5 weeks",
      "Full planning, design, build & launch",
      "Testing across all devices & browsers",
      "30 days of post-launch warranty & training",
    ],
    serviceKey: "web",
    highlight: true,
  },
  {
    name: "Dedicated Partnership",
    badge: "Ongoing Velocity",
    target: "Continuous Improvements & Maintenance",
    description: "For teams who want an experienced engineer on call to continuously improve their product, manage automations, and roll out new features.",
    highlights: [
      "Priority turnaround on new requests",
      "Proactive uptime & automation monitoring",
      "Regular feature shipping every month",
      "Cancel or pause anytime with zero hassle",
    ],
    serviceKey: "other",
    highlight: false,
  },
];

const faqs = [
  {
    q: "How does working together work?",
    a: "It starts with a straightforward conversation about what your business needs. I give you a clear proposal with a fixed price and delivery timeline. Once agreed, I build your solution, keeping you updated. We test together, launch, and you get 100% of the deliverables.",
  },
  {
    q: "Do I own everything when the project is done?",
    a: "Yes, completely. You own the code, design, accounts, and all assets. You'll never be locked into recurring license fees or proprietary platforms.",
  },
  {
    q: "What if I am not technical? Will I be able to manage this?",
    a: "Absolutely. I design everything so you don't need to touch a line of code. Before handover, I provide clear guidance showing you how to manage your content, review leads, and check your automations in plain English.",
  },
  {
    q: "What happens if something breaks after launch?",
    a: "Every project includes a post-launch warranty period (up to 30 days) where any unexpected bugs or questions are resolved immediately at zero charge. I stand behind everything I deliver.",
  },
  {
    q: "How fast can we start?",
    a: "Most projects can kick off within 3 to 5 days after aligning on scope. If you have an urgent deadline, mention it when reaching out and I'll see how quickly we can fit it into the sprint schedule.",
  },
];

export default function Services() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = ["All", "Websites & Apps", "Automations", "AI & Chatbots"];

  const filteredServices =
    activeFilter === "All"
      ? serviceList
      : serviceList.filter((s) => s.category === activeFilter);

  return (
    <div className="page-shell flex flex-col flex-1 items-center bg-background font-sans transition-colors duration-500 overflow-hidden min-h-screen pt-36 md:pt-44 pb-24">
      <main className="flex flex-1 w-full max-w-7xl flex-col px-6 md:px-12 gap-24 md:gap-32">
        
        {/* ── Client-Focused Hero Section ── */}
        <div className="flex flex-col gap-8">
          <motion.div className="flex flex-col gap-3" variants={fadeUp} custom={0} initial="hidden" animate="show">
            <span className="page-kicker">Services &amp; Solutions</span>
            <h1 className="font-norwester text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] leading-[0.92] tracking-tight text-black dark:text-white uppercase">
              Turn your ideas into<br />
              <span className="text-[#8b5cf6] sketch-underline">working reality.</span>
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-2"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
          >
            <p className="font-balgin text-lg md:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-2xl">
              I help businesses solve real operational bottlenecks: whether you need a high-converting web app, automated n8n workflows that save your team hours, or intelligent AI agent systems.
            </p>

            {/* Client Confidence Guarantees */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <span className="sketch-dash inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-black dark:text-white bg-white/40 dark:bg-white/5">
                <ShieldCheck className="w-4 h-4 text-[#8b5cf6]" />
                100% Code &amp; Asset Ownership
              </span>
              <span className="sketch-dash inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-black dark:text-white bg-white/40 dark:bg-white/5">
                <Zap className="w-4 h-4 text-[#8b5cf6]" />
                Fixed Pricing &amp; Milestones
              </span>
              <span className="sketch-dash inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-black dark:text-white bg-white/40 dark:bg-white/5">
                <Smile className="w-4 h-4 text-[#8b5cf6]" />
                Post-Launch Support
              </span>
            </div>
          </motion.div>

          {/* Interactive Category Filter */}
          <motion.div
            className="flex flex-wrap items-center gap-2.5 pt-6 border-t-2 border-dashed border-neutral-300 dark:border-neutral-800"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mr-2">
              Browse by need:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
                  activeFilter === category
                    ? "bg-[#8b5cf6] text-white font-bold shadow-md shadow-[#8b5cf6]/20 border border-[#8b5cf6]"
                    : "bg-white/50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 hover:border-black dark:hover:border-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Service Cards ── */}
        <section className="flex flex-col gap-10">
          <div className="grid gap-8 md:grid-cols-2">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.id}
                  id={service.anchor}
                  className="sketch-panel group relative flex scroll-mt-32 flex-col justify-between overflow-hidden bg-white/80 dark:bg-[#111111]/80 p-8 sm:p-10 transition-all duration-300 border-neutral-300/80 dark:border-neutral-800 hover:border-[#8b5cf6]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] group-hover:border-[#8b5cf6]/40 transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c3aed] dark:text-[#a78bfa] font-bold">
                            {service.badge}
                          </span>
                          <h2 className="font-norwester text-2xl sm:text-3xl uppercase tracking-wide text-black dark:text-white">
                            {service.title}
                          </h2>
                        </div>
                      </div>
                      <span className="font-mono text-sm text-neutral-400 group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors">
                        [{service.id}]
                      </span>
                    </div>

                    {/* Headline */}
                    <p className="mt-6 font-balgin text-base sm:text-lg font-medium text-black dark:text-white leading-snug">
                      {service.headline}
                    </p>

                    {/* Problem vs Result */}
                    <div className="mt-5 grid grid-cols-1 gap-3">
                      <div className="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-white/[0.03] border-l-4 border-neutral-400 dark:border-neutral-700 text-xs font-balgin text-neutral-700 dark:text-neutral-300">
                        <span className="font-norwester uppercase tracking-wider text-black dark:text-white block mb-0.5">
                          The Problem You Might Have:
                        </span>
                        {service.customerProblem}
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#8b5cf6]/10 dark:bg-[#8b5cf6]/10 border-l-4 border-[#8b5cf6] text-xs font-balgin text-neutral-800 dark:text-neutral-200">
                        <span className="font-norwester uppercase tracking-wider text-[#7c3aed] dark:text-[#a78bfa] block mb-0.5">
                          The Result You Get:
                        </span>
                        {service.customerOutcome}
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="mt-6 flex flex-col gap-2.5">
                      <span className="font-norwester text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                        What You Get:
                      </span>
                      <ul className="flex flex-col gap-2">
                        {service.whatYouGet.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-balgin text-neutral-800 dark:text-neutral-200">
                            <CheckCircle2 className="w-4 h-4 text-[#7c3aed] dark:text-[#a78bfa] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                        <Clock className="w-3.5 h-3.5 text-[#7c3aed] dark:text-[#a78bfa]" />
                        <span>Estimated turnaround: <strong className="text-black dark:text-white font-semibold">{service.timeline}</strong></span>
                      </div>
                    </div>

                    <Link
                      to={`/contact?service=${service.contactServiceKey}`}
                      className="sketch-button group/btn flex items-center justify-between w-full bg-neutral-950 dark:bg-white text-white dark:text-black px-6 py-3.5 font-norwester text-sm uppercase tracking-widest hover:bg-[#8b5cf6] hover:text-white dark:hover:bg-[#8b5cf6] dark:hover:text-white transition-colors"
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Engagement Packages */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col justify-between gap-3 border-b-2 border-neutral-950 pb-5 dark:border-white sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa] font-bold">
                [ CLEAR OPTIONS ]
              </span>
              <h2 className="font-norwester text-3xl uppercase tracking-[0.06em] text-neutral-950 dark:text-white md:text-4xl">
                Ways We Can Work Together
              </h2>
            </div>
            <p className="font-balgin text-sm text-neutral-600 dark:text-neutral-400 max-w-sm">
              Transparent, milestone-based delivery with zero guesswork.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, idx) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col justify-between rounded-[2rem] p-8 transition-all duration-300 ${
                  pkg.highlight
                    ? "border-2 border-[#8b5cf6] bg-neutral-950 text-white shadow-xl shadow-[#8b5cf6]/10"
                    : "border border-neutral-300/80 bg-white/70 dark:border-neutral-800 dark:bg-neutral-900/40 text-neutral-950 dark:text-white"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3.5 left-8 bg-[#8b5cf6] text-white px-3.5 py-0.5 font-mono text-[10px] uppercase font-bold tracking-widest rounded-full">
                    Recommended Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full ${
                        pkg.highlight
                          ? "bg-[#8b5cf6]/20 text-[#a78bfa]"
                          : "bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">0{idx + 1}</span>
                  </div>

                  <h3 className="mt-5 font-norwester text-2xl uppercase tracking-wide">
                    {pkg.name}
                  </h3>
                  <p className="font-mono text-xs text-[#7c3aed] dark:text-[#a78bfa] mt-1 font-semibold">
                    {pkg.target}
                  </p>
                  <p
                    className={`mt-4 font-balgin text-sm leading-relaxed ${
                      pkg.highlight ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <span className="font-norwester text-xs uppercase tracking-widest text-neutral-400">
                      Key Benefits:
                    </span>
                    <ul className="flex flex-col gap-2">
                      {pkg.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-balgin">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8b5cf6] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200/40 dark:border-neutral-800 flex flex-col gap-4">
                  <Link
                    to={`/contact?service=${pkg.serviceKey}`}
                    className={`sketch-button text-center py-3.5 font-norwester text-sm uppercase tracking-widest transition-all ${
                      pkg.highlight
                        ? "bg-[#8b5cf6] text-white hover:bg-white hover:text-black"
                        : "bg-black text-white dark:bg-white dark:text-black hover:bg-[#8b5cf6] hover:text-white"
                    }`}
                  >
                    Discuss {pkg.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client FAQ Section */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col justify-between gap-3 border-b-2 border-dashed border-neutral-950 pb-5 dark:border-white sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#7c3aed] dark:text-[#a78bfa] font-bold">
                [ QUESTIONS &amp; ANSWERS ]
              </span>
              <h2 className="font-norwester text-3xl uppercase tracking-[0.06em] text-neutral-950 dark:text-white md:text-4xl">
                Common Questions Clients Ask
              </h2>
            </div>
            <p className="font-balgin text-sm text-neutral-600 dark:text-neutral-400 max-w-sm">
              Clear answers so you can make confident decisions without technical jargon.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/50 dark:bg-white/[0.02] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-norwester text-lg sm:text-xl uppercase tracking-wide text-neutral-950 dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#7c3aed] dark:text-[#a78bfa] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 font-balgin text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 border-t border-neutral-200/50 dark:border-neutral-800/50 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <motion.section
          className="sketch-panel relative overflow-hidden flex flex-col items-start justify-between gap-8 py-12 px-8 md:px-14 bg-[#8b5cf6] text-white"
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/80">
              Ready to take work off your plate?
            </span>
            <h2 className="font-norwester text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-none">
              Tell me what you need, and let&apos;s build it.
            </h2>
            <p className="font-balgin text-base text-white/90">
              Send a quick message about your goals. I&apos;ll get back to you with an honest evaluation, timeline, and proposal within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="sketch-button inline-flex items-center gap-2 bg-black text-white font-norwester text-lg uppercase tracking-widest px-8 py-4 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-300"
            >
              Start a Project &rarr;
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 border-2 border-white font-norwester text-lg uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              See Past Work
            </Link>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
