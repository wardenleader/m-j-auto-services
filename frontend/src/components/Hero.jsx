import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, ArrowRight, Clock } from "lucide-react";
import { getShopStatus } from "../lib/hours";

const HERO_IMG =
  "https://images.pexels.com/photos/8986039/pexels-photo-8986039.jpeg";

export default function Hero() {
  const [status, setStatus] = useState({ isOpen: false, hoursToday: "" });
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 120]);
  const yText = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    setStatus(getShopStatus());
    const t = setInterval(() => setStatus(getShopStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background image */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <div
          className="absolute inset-0 slow-pan bg-center bg-cover"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Deep brown overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(62,39,35,0.92) 0%, rgba(62,39,35,0.72) 45%, rgba(62,39,35,0.55) 100%)",
          }}
        />
        <div className="absolute inset-0 diagonal-stripes opacity-40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-8"
              data-testid="hero-rating-badge"
            >
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="#F59E0B"
                    color="#F59E0B"
                    className="star-shimmer"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                ))}
              </div>
              <span className="text-white font-semibold text-sm">
                5.0 on Google · 7 Reviews
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.02] tracking-tight"
              data-testid="hero-headline"
            >
              San Mateo's
              <br />
              <span className="relative inline-block">
                <span style={{ color: "#B87333" }}>Trusted</span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.1, duration: 1.2, ease: "easeInOut" }}
                  viewBox="0 0 300 12"
                  className="absolute -bottom-1 left-0 w-full h-2"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 8 C 80 2, 150 10, 298 4"
                    stroke="#B87333"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>{" "}
              Auto Repair Shop
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 text-lg md:text-xl text-[#FAF7F2]/90 max-w-xl leading-relaxed"
            >
              Honest work. Fair prices. <span className="font-semibold text-white">5-star service.</span> The neighborhood shop where the job's done right the first time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="tel:+16508346690"
                data-testid="hero-call-now"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-display font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: "var(--brand-bronze)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-bronze-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brand-bronze)")}
              >
                <Phone size={18} /> Call Now
              </a>
              <a
                href="#contact"
                data-testid="hero-get-quote"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-display font-semibold text-white border-2 border-white/70 hover:bg-white hover:text-[#3E2723] transition-all hover:-translate-y-1"
              >
                Get a Free Quote <ArrowRight size={18} />
              </a>
            </motion.div>

            {/* Status + address chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <div
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
                data-testid="hero-open-status"
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`w-2.5 h-2.5 rounded-full ${
                    status.isOpen ? "bg-emerald-400" : "bg-gray-400"
                  }`}
                />
                <span className="text-white text-sm font-semibold">
                  {status.isOpen ? "Open Now" : "Closed"}
                </span>
                <span className="text-white/70 text-sm">· {status.hoursToday}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Clock size={14} className="text-white/80" />
                <span className="text-white/90 text-sm">1037 S Claremont St</span>
              </div>
            </motion.div>
          </div>

          {/* Right rating card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
                style={{ background: "#B87333" }}
              />
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-[#795548]">
                  Google Reviews
                </div>
                <div className="mt-4 flex items-end gap-3">
                  <div className="font-display font-black text-[#3E2723] text-7xl leading-none">
                    5.0
                  </div>
                  <div className="pb-2">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-[#795548] mt-1">
                      Perfect score
                    </div>
                  </div>
                </div>
                <div className="my-6 h-px bg-[#795548]/15" />
                <blockquote className="text-sm text-[#3E2723] italic leading-relaxed">
                  "Quality work at fair prices. Honest, professional, and reliable — a trusted local auto shop."
                </blockquote>
                <div className="mt-4 text-xs font-semibold text-[#795548]">
                  — Verified Google customer
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 z-[5]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--brand-cream))",
        }}
      />
    </section>
  );
}
