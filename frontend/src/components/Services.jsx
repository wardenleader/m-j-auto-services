import React from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  Droplets,
  Snowflake,
  Disc3,
  CircleDot,
  Cog,
  BatteryCharging,
  AlertTriangle,
  Wrench,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  { Icon: Gauge, title: "Engine Diagnostics & Repair", body: "Precise diagnostics and reliable repairs for every make and model." },
  { Icon: Droplets, title: "Oil Changes & Fluid Services", body: "Full-synthetic and conventional options, done right, done fast." },
  { Icon: Snowflake, title: "A/C Service & Repair", body: "Beat the summer — recharges, leak checks, compressor repair." },
  { Icon: Disc3, title: "Brake Inspection & Repair", body: "Pads, rotors, fluid — stop safely with expert brake service." },
  { Icon: CircleDot, title: "Tire Rotation & Alignment", body: "Extend tire life with balanced rotations and precision alignment." },
  { Icon: Cog, title: "Transmission Service", body: "Fluid changes, diagnostics, and repair for smoother shifts." },
  { Icon: BatteryCharging, title: "Battery Testing & Replacement", body: "Free battery check and fast replacement when you need it." },
  { Icon: AlertTriangle, title: "Check Engine Light Diagnostics", body: "We decode the code and explain what's actually wrong." },
  { Icon: Wrench, title: "General Maintenance & Tune-Ups", body: "Keep your car running strong with scheduled maintenance." },
  { Icon: ClipboardCheck, title: "Pre-Purchase Inspections", body: "Buying used? Bring it in — drive away with confidence." },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32"
      style={{ background: "var(--brand-white)" }}
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#B87333] mb-5"
          >
            <span className="w-8 h-px bg-[#B87333]" /> Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-[#3E2723] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
          >
            Everything your car needs, <br className="hidden md:block" />
            <span style={{ color: "#795548" }}>under one roof.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-[#3E2723]/70 text-lg max-w-2xl"
          >
            From a quick oil change to full engine diagnostics — our experienced
            team handles it all with care, precision, and transparent pricing.
          </motion.p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              data-testid="service-card"
              className="tilt-card group relative bg-white rounded-2xl p-7 border border-[#795548]/15 overflow-hidden"
            >
              {/* Corner accent */}
              <div
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "rgba(184,115,51,0.10)" }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-6"
                style={{ background: "var(--brand-deep)" }}
              >
                <s.Icon size={22} color="#B87333" strokeWidth={2} />
              </div>
              <h3 className="font-display font-extrabold text-[#3E2723] text-lg leading-snug">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-[#795548] leading-relaxed">
                {s.body}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B87333] opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0">
                Book this service <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl p-8 md:p-10 grain-bg"
          style={{ background: "var(--brand-deep)" }}
        >
          <div>
            <div className="font-display font-black text-white text-2xl md:text-3xl">
              Don't see your service? Just ask.
            </div>
            <div className="text-[#FAF7F2]/70 mt-1">
              We handle most repairs — give us a call for a fast, honest estimate.
            </div>
          </div>
          <a
            href="tel:+16508346690"
            data-testid="services-call-cta"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "var(--brand-bronze)" }}
          >
            Call (650) 834-6690
          </a>
        </motion.div>
      </div>
    </section>
  );
}
