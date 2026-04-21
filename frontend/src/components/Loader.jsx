import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench } from "lucide-react";

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "var(--brand-deep)" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-40"
              style={{ background: "var(--brand-bronze)" }}
            />
            <Wrench size={64} strokeWidth={1.8} color="#B87333" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display mt-8 text-sm tracking-[0.3em] uppercase"
            style={{ color: "#FAF7F2" }}
          >
            M &nbsp;&amp;&nbsp; J Auto Services
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
