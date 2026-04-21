import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, DollarSign, Wrench, Users, ClipboardCheck } from "lucide-react";

function Counter({ to, duration = 1600, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const FEATURES = [
  { Icon: Star, title: "5.0 Star Rating", body: "Every single Google review — five stars." },
  { Icon: DollarSign, title: "100% Honest Pricing", body: "No upsells, no surprises. Ever." },
  { Icon: Wrench, title: "Experienced Technicians", body: "Decades of hands-on expertise." },
  { Icon: Users, title: "Customer-First Service", body: "We treat your car like our own." },
  { Icon: ClipboardCheck, title: "Transparent Estimates", body: "You approve before we start." },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--brand-deep)" }}
      data-testid="why-section"
    >
      {/* Decorative blurs */}
      <div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "#B87333" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: "#795548" }}
      />
      <div className="absolute inset-0 diagonal-stripes opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#B87333] mb-5"
            >
              <span className="w-8 h-px bg-[#B87333]" /> Why choose us
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
            >
              Five stars. <br />
              <span style={{ color: "#B87333" }}>Every time.</span>
            </motion.h2>
            <p className="mt-6 text-[#FAF7F2]/75 text-lg leading-relaxed">
              The numbers tell the story — but it's the handshake, the honest
              quote, and the call-back to make sure you're happy that keep
              San Mateo coming back.
            </p>

            {/* Counters */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5">
                <div className="font-display font-black text-[#B87333] text-4xl md:text-5xl">
                  <Counter to={5.0} duration={1600} decimals={1} />
                </div>
                <div className="text-xs text-[#FAF7F2]/70 font-semibold uppercase tracking-wider mt-2">
                  Google Rating
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5">
                <div className="font-display font-black text-[#B87333] text-4xl md:text-5xl">
                  <Counter to={7} duration={1400} />
                </div>
                <div className="text-xs text-[#FAF7F2]/70 font-semibold uppercase tracking-wider mt-2">
                  5-Star Reviews
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5">
                <div className="font-display font-black text-[#B87333] text-4xl md:text-5xl">
                  <Counter to={100} duration={1600} suffix="%" />
                </div>
                <div className="text-xs text-[#FAF7F2]/70 font-semibold uppercase tracking-wider mt-2">
                  Honest Pricing
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#B87333]/50 transition-colors"
                  data-testid="why-feature-card"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: "rgba(184,115,51,0.15)" }}
                  >
                    <f.Icon size={20} color="#B87333" />
                  </div>
                  <div className="font-display font-bold text-white text-lg">
                    {f.title}
                  </div>
                  <div className="text-[#FAF7F2]/70 text-sm mt-1.5">
                    {f.body}
                  </div>
                </motion.div>
              ))}
              {/* Last feature or CTA tile */}
              <div
                className="relative rounded-2xl p-6 flex flex-col justify-between overflow-hidden"
                style={{ background: "var(--brand-bronze)" }}
              >
                <div className="font-display font-black text-white text-xl leading-tight">
                  Ready to experience <br /> five-star service?
                </div>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-display font-semibold text-[#3E2723] bg-white hover:-translate-y-0.5 transition-transform text-sm"
                  data-testid="why-cta"
                >
                  Schedule a visit →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
