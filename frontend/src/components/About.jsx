import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Heart, Award } from "lucide-react";

const ABOUT_IMG = "https://images.unsplash.com/photo-1649769069590-268b0b994462";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#3E2723]/20">
              <img
                src={ABOUT_IMG}
                alt="Experienced mechanic holding tools"
                loading="lazy"
                className="w-full h-[420px] md:h-[560px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(62,39,35,0.05) 0%, rgba(62,39,35,0.25) 100%)",
                }}
              />
            </div>
            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 md:right-8 bg-white rounded-2xl p-5 shadow-xl border border-[#795548]/10 max-w-[260px]"
            >
              <div className="flex items-center gap-2 mb-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <div className="font-display font-black text-[#3E2723] text-2xl leading-none">
                100% Satisfied
              </div>
              <div className="text-xs text-[#795548] mt-1 font-semibold">
                Every review, five stars.
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#B87333] mb-5">
              <span className="w-8 h-px bg-[#B87333]" /> About the shop
            </div>
            <h2 className="font-display font-black text-[#3E2723] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Your neighborhood auto shop in{" "}
              <span style={{ color: "#B87333" }}>San Mateo.</span>
            </h2>
            <p className="mt-6 text-[#3E2723]/75 text-lg leading-relaxed">
              At M &amp; J Auto Services, we believe a great mechanic should feel like a
              trusted friend — someone who explains the problem, gives you a fair price,
              and gets the job done right the first time. No upsells. No runaround. Just
              honest, experienced hands on your vehicle.
            </p>
            <p className="mt-4 text-[#3E2723]/75 text-lg leading-relaxed">
              That's why every single one of our Google reviews is{" "}
              <span className="font-bold text-[#3E2723]">five stars</span> — because
              San Mateo drivers keep coming back, and so do their families.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[
                { Icon: ShieldCheck, title: "Honest Pricing", body: "Transparent estimates, no surprises." },
                { Icon: Award, title: "Experienced Techs", body: "Decades of combined expertise." },
                { Icon: Heart, title: "Customer-First", body: "Treated like family, every visit." },
                { Icon: Star, title: "5.0 Google Rating", body: "Backed by happy neighbors." },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex gap-3 items-start"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(184,115,51,0.12)" }}
                  >
                    <f.Icon size={18} color="#B87333" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[#3E2723]">
                      {f.title}
                    </div>
                    <div className="text-sm text-[#795548]">{f.body}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
