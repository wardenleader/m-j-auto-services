import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Menu, X, Wrench } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about", id: "nav-about" },
  { label: "Services", href: "#services", id: "nav-services" },
  { label: "Why Us", href: "#why", id: "nav-why" },
  { label: "Reviews", href: "#reviews", id: "nav-reviews" },
  { label: "Contact", href: "#contact", id: "nav-contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#FAF7F2]/85 border-b border-[#795548]/15 shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2.5 group"
          data-testid="logo-link"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12"
            style={{ background: "var(--brand-deep)" }}
          >
            <Wrench size={18} color="#B87333" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-[#3E2723] text-base md:text-lg tracking-tight">
              M &amp; J Auto Services
            </div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#795548] font-semibold">
              San Mateo · CA
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={l.id}
              className="text-sm font-semibold text-[#3E2723] hover:text-[#B87333] transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#B87333] hover:after:w-full after:transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+16508346690"
          data-testid="navbar-call-btn"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-semibold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: "var(--brand-bronze)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-bronze-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brand-bronze)")}
        >
          <Phone size={14} /> (650) 834-6690
        </a>

        <button
          className="md:hidden p-2 text-[#3E2723]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#FAF7F2] border-t border-[#795548]/15"
          data-testid="mobile-menu"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-lg font-semibold text-[#3E2723] hover:bg-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+16508346690"
              className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-full font-display font-semibold text-sm text-white"
              style={{ background: "var(--brand-bronze)" }}
            >
              <Phone size={14} /> Call (650) 834-6690
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
