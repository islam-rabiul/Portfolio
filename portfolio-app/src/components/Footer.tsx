import { Link } from "react-router-dom";

const footerLinks = [
  {
    heading: "What I Do",
    links: [
      { label: "Web Development", href: "/services#web-development" },
      { label: "Automation", href: "/services#automation" },
      { label: "AI & ML Systems", href: "/services#ai-integration" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Case Studies", href: "/work" },
      { label: "Projects", href: "/work" },
      { label: "Open Source", href: "https://github.com/islam-rabiul" },
    ],
  },
  {
    heading: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/islam-rabiul",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/islam-rabiul",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-dashed border-[#8b5cf6]/50 bg-[#09090b] text-white transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div className="flex flex-col items-start">
            <h2 className="sketch-underline max-w-xl font-norwester text-5xl uppercase leading-[0.88] tracking-[0.01em] text-white sm:text-7xl md:text-8xl">
              Let&apos;s <span className="text-[#8b5cf6]">talk</span>
            </h2>
            <p className="mt-7 max-w-md font-balgin text-base leading-[1.65] text-white/60 md:text-lg">
              Have a product, process, or idea that needs a better system? Tell me what you are building.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=islamrabiul786%40gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group sketch-rule mt-9 flex max-w-full items-center gap-3 border-b border-white/25 pb-3 font-mono text-sm tracking-[0.03em] text-white transition-colors hover:border-[#8b5cf6] hover:text-[#8b5cf6] md:text-base"
            >
              <span className="truncate">islamrabiul786@gmail.com</span>
              <span className="text-[#8b5cf6] transition-transform group-hover:translate-x-1">-&gt;</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:pt-3">
            {footerLinks.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{col.heading}</p>
                {col.links.map((link) => (
                  link.href.startsWith("http") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit font-balgin text-[15px] leading-tight text-white/70 transition-colors hover:text-[#8b5cf6]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="w-fit font-balgin text-[15px] leading-tight text-white/70 transition-colors hover:text-[#8b5cf6]"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            ))}
            <div className="col-span-2 flex flex-col gap-4 sm:col-span-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Find me online</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:-translate-y-1 hover:border-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sketch-rule mt-20 border-white/15 pt-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-norwester text-3xl tracking-[0.03em] text-white/90 md:text-5xl">RABIUL<span className="text-[#8b5cf6]">.DEV</span></p>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">© {new Date().getFullYear()} / Built with intent</p>
          </div>
        </div>
      </div>

    </footer>
  );
}
