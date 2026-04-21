import React from "react";
import { Wrench, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-10"
      style={{ background: "var(--brand-deep)" }}
      data-testid="site-footer"
    >
      <div className="absolute inset-0 diagonal-stripes opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "var(--brand-bronze)" }}
              >
                <Wrench size={18} color="#3E2723" strokeWidth={2.2} />
              </div>
              <div className="font-display font-extrabold text-white text-xl">
                M &amp; J Auto Services
              </div>
            </div>
            <p className="mt-5 text-[#FAF7F2]/70 max-w-sm leading-relaxed">
              Proudly serving San Mateo and the Peninsula with honest work,
              fair pricing, and five-star service — one car at a time.
            </p>
            <div className="mt-6 flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="text-[#F59E0B] text-lg leading-none"
                  aria-hidden
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm font-semibold text-white">
                5.0 on Google
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B87333] mb-4">
              Quick Links
            </div>
            <ul className="space-y-2.5">
              {[
                ["About", "#about"],
                ["Services", "#services"],
                ["Why Choose Us", "#why"],
                ["Reviews", "#reviews"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[#FAF7F2]/75 hover:text-[#B87333] transition-colors text-sm font-semibold"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B87333] mb-4">
              Visit
            </div>
            <a
              href="tel:+16508346690"
              className="flex items-center gap-3 text-[#FAF7F2] hover:text-[#B87333] transition-colors"
            >
              <Phone size={16} className="text-[#B87333]" />
              <span className="font-semibold">(650) 834-6690</span>
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1037+S+Claremont+St+San+Mateo+CA+94402"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-[#FAF7F2]/90 hover:text-[#B87333] transition-colors"
            >
              <MapPin size={16} className="text-[#B87333] mt-0.5 shrink-0" />
              <span>
                1037 S Claremont St <br />
                San Mateo, CA 94402
              </span>
            </a>
            <div className="flex items-start gap-3 text-[#FAF7F2]/80">
              <Clock size={16} className="text-[#B87333] mt-0.5 shrink-0" />
              <div className="text-sm">
                Mon–Fri: 8 AM – 6 PM
                <br />
                Sat: 8 AM – 12 PM · Sun: Closed
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#FAF7F2]/50">
            © {new Date().getFullYear()} M &amp; J Auto Services. All rights
            reserved.
          </div>
          <div className="text-xs text-[#FAF7F2]/50">
            Proudly serving San Mateo and the Peninsula.
          </div>
        </div>
      </div>
    </footer>
  );
}
