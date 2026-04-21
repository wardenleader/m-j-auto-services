import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Phone, MapPin, Navigation, Mail, Send, CheckCircle2 } from "lucide-react";
import { SHOP_HOURS, getShopStatus, getTodayName } from "../lib/hours";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MAP_IFRAME_SRC =
  "https://maps.google.com/maps?q=1037%20S%20Claremont%20St%2C%20San%20Mateo%2C%20CA%2094402&t=&z=15&ie=UTF8&iwloc=&output=embed";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=1037+S+Claremont+St+San+Mateo+CA+94402";

const SERVICES_LIST = [
  "General Maintenance",
  "Oil Change",
  "Brake Service",
  "A/C Repair",
  "Engine Diagnostics",
  "Transmission Service",
  "Battery Replacement",
  "Pre-Purchase Inspection",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    service_needed: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ isOpen: false, hoursToday: "" });
  const [today, setToday] = useState("Monday");

  useEffect(() => {
    setStatus(getShopStatus());
    setToday(getTodayName());
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thanks! We'll get back to you shortly.");
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        vehicle_make: "",
        vehicle_model: "",
        vehicle_year: "",
        service_needed: "",
        message: "",
      });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string"
          ? detail
          : "Something went wrong. Please call us at (650) 834-6690."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-white border border-[#795548]/20 rounded-lg px-4 py-3 text-[#3E2723] placeholder:text-[#795548]/60 focus:outline-none focus:border-[#B87333] focus:ring-2 focus:ring-[#B87333]/20 transition-all font-sans text-sm";

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32"
      style={{ background: "var(--brand-white)" }}
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#B87333] mb-5">
            <span className="w-8 h-px bg-[#B87333]" /> Visit us
          </div>
          <h2 className="font-display font-black text-[#3E2723] text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Drop by, or send us <br />
            <span style={{ color: "#B87333" }}>a quick message.</span>
          </h2>
          <p className="mt-6 text-[#3E2723]/70 text-lg">
            We'll get back to you the same day — and if it's urgent, just give
            us a call.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={submit}
              className="bg-[#FAF7F2] rounded-3xl p-7 md:p-10 border border-[#795548]/10"
              data-testid="contact-form"
            >
              {submitted && (
                <div
                  className="mb-6 flex items-start gap-3 rounded-lg p-4 border border-emerald-200 bg-emerald-50"
                  data-testid="contact-success-banner"
                >
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-emerald-900">
                    <div className="font-semibold">Message received</div>
                    We'll be in touch as soon as possible. For urgent help, call{" "}
                    <a href="tel:+16508346690" className="underline font-semibold">
                      (650) 834-6690
                    </a>
                    .
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#795548] mb-2">
                    Full Name *
                  </label>
                  <input
                    data-testid="form-name"
                    required
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className={inputCls}
                    placeholder="Jane Driver"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#795548] mb-2">
                    Email *
                  </label>
                  <input
                    data-testid="form-email"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className={inputCls}
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#795548] mb-2">
                    Phone *
                  </label>
                  <input
                    data-testid="form-phone"
                    required
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={inputCls}
                    placeholder="(650) 555-0100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#795548] mb-2">
                    Service Needed
                  </label>
                  <select
                    data-testid="form-service"
                    name="service_needed"
                    value={form.service_needed}
                    onChange={onChange}
                    className={inputCls}
                  >
                    <option value="">Select a service</option>
                    {SERVICES_LIST.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#795548] mb-2">
                    Make
                  </label>
                  <input
                    data-testid="form-make"
                    name="vehicle_make"
                    value={form.vehicle_make}
                    onChange={onChange}
                    className={inputCls}
                    placeholder="Toyota"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#795548] mb-2">
                    Model
                  </label>
                  <input
                    data-testid="form-model"
                    name="vehicle_model"
                    value={form.vehicle_model}
                    onChange={onChange}
                    className={inputCls}
                    placeholder="Camry"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#795548] mb-2">
                    Year
                  </label>
                  <input
                    data-testid="form-year"
                    name="vehicle_year"
                    value={form.vehicle_year}
                    onChange={onChange}
                    className={inputCls}
                    placeholder="2018"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#795548] mb-2">
                  Message *
                </label>
                <textarea
                  data-testid="form-message"
                  required
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  className={inputCls + " resize-none"}
                  placeholder="Tell us what's going on with your vehicle..."
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <p className="text-xs text-[#795548]">
                  By submitting, you agree to be contacted about your request.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-display font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "var(--brand-bronze)" }}
                >
                  {submitting ? "Sending…" : (<>Send Message <Send size={15} /></>)}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg shadow-[#3E2723]/10 border border-[#795548]/10">
              <iframe
                title="M & J Auto Services — San Mateo Location"
                src={MAP_IFRAME_SRC}
                width="100%"
                height="280"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="contact-map"
              />
            </div>

            {/* Quick contact */}
            <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#795548]/10 space-y-4">
              <a
                href="tel:+16508346690"
                data-testid="contact-phone-link"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: "var(--brand-deep)" }}
                >
                  <Phone size={18} color="#B87333" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#795548]">
                    Call us
                  </div>
                  <div className="font-display font-extrabold text-[#3E2723] text-lg group-hover:text-[#B87333] transition-colors">
                    (650) 834-6690
                  </div>
                </div>
              </a>

              <div className="h-px bg-[#795548]/15" />

              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-directions"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: "var(--brand-deep)" }}
                >
                  <MapPin size={18} color="#B87333" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#795548]">
                    Visit
                  </div>
                  <div className="font-display font-extrabold text-[#3E2723] text-base leading-tight">
                    1037 S Claremont St
                    <br />
                    San Mateo, CA 94402
                  </div>
                </div>
                <Navigation size={16} className="text-[#B87333] shrink-0" />
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 border border-[#795548]/15 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="font-display font-extrabold text-[#3E2723] text-lg">
                  Hours of Operation
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                    status.isOpen
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  data-testid="hours-status-badge"
                >
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen ? "bg-emerald-500" : "bg-gray-400"
                    }`}
                  />
                  {status.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>
              <ul className="divide-y divide-[#795548]/10">
                {SHOP_HOURS.map((h) => {
                  const active = h.day === today;
                  return (
                    <li
                      key={h.day}
                      data-testid={`hours-row-${h.day.toLowerCase()}`}
                      className={`flex items-center justify-between py-2.5 px-3 -mx-3 rounded-lg transition-colors ${
                        active ? "bg-[#3E2723] text-white" : "text-[#3E2723]"
                      }`}
                    >
                      <span
                        className={`font-display font-semibold ${
                          active ? "text-white" : ""
                        }`}
                      >
                        {h.day}
                        {active && (
                          <span
                            className="ml-2 text-[10px] uppercase tracking-wider font-bold"
                            style={{ color: "#B87333" }}
                          >
                            Today
                          </span>
                        )}
                      </span>
                      <span
                        className={`font-sans text-sm ${
                          active ? "text-white/90" : "text-[#795548]"
                        }`}
                      >
                        {h.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
