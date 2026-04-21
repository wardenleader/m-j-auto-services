import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Darryl S.",
    initial: "D",
    body: "Great service! Honest, professional, and reliable. I won't take my car anywhere else.",
    tag: "Google Review",
  },
  {
    name: "Sarah",
    initial: "S",
    body: "Had them do an A/C recharge and an oil change — done in one visit at a fair price. Friendly team.",
    tag: "A/C & Oil Service",
  },
  {
    name: "Elizabeth E.",
    initial: "E",
    body: "Great price and quality work. They explained everything clearly before starting.",
    tag: "Google Review",
  },
  {
    name: "Local Driver",
    initial: "M",
    body: "Quality work at fair prices. A trusted local auto shop — exactly what you want in a neighborhood mechanic.",
    tag: "Regular Customer",
  },
  {
    name: "Happy Neighbor",
    initial: "J",
    body: "Honest, professional, and reliable. Fixed the check-engine issue my dealer couldn't diagnose.",
    tag: "Check Engine",
  },
];

export default function Reviews() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % REVIEWS.length);
  const prev = () => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section
      id="reviews"
      className="relative py-24 md:py-32"
      style={{ background: "var(--brand-cream)" }}
      data-testid="reviews-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#B87333] mb-5">
              <span className="w-8 h-px bg-[#B87333]" /> Customer love
            </div>
            <h2 className="font-display font-black text-[#3E2723] text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Five stars,{" "}
              <span style={{ color: "#B87333" }}>every single time.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-display font-black text-[#3E2723] text-3xl">
                5.0 ★
              </div>
              <div className="text-xs font-semibold text-[#795548] uppercase tracking-wider">
                7 Google Reviews
              </div>
            </div>
            <a
              href="https://www.google.com/search?q=M+%26+J+Auto+Services+San+Mateo"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="reviews-google-link"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-[#3E2723] font-display font-semibold text-sm text-[#3E2723] hover:bg-[#3E2723] hover:text-white transition-colors"
            >
              See all on Google
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="relative bg-white rounded-3xl p-8 md:p-14 shadow-xl shadow-[#3E2723]/5 border border-[#795548]/10 min-h-[320px] overflow-hidden">
            <Quote
              size={80}
              className="absolute -top-4 -left-2 opacity-[0.08]"
              color="#3E2723"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="relative"
                data-testid="review-slide"
              >
                <div className="flex items-center gap-1.5 mb-6">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <blockquote className="font-display font-semibold text-[#3E2723] text-2xl md:text-4xl leading-tight tracking-tight">
                  "{REVIEWS[idx].body}"
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-white text-lg"
                    style={{ background: "var(--brand-bronze)" }}
                  >
                    {REVIEWS[idx].initial}
                  </div>
                  <div>
                    <div className="font-display font-bold text-[#3E2723]">
                      {REVIEWS[idx].name}
                    </div>
                    <div className="text-xs font-semibold text-[#795548] uppercase tracking-wider">
                      {REVIEWS[idx].tag}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to review ${i + 1}`}
                  data-testid={`review-dot-${i}`}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? "w-8 bg-[#B87333]" : "w-2 bg-[#795548]/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Previous review"
                data-testid="review-prev"
                className="w-11 h-11 rounded-full bg-white border border-[#795548]/20 flex items-center justify-center hover:bg-[#3E2723] hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next review"
                data-testid="review-next"
                className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-0.5"
                style={{ background: "var(--brand-deep)" }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
