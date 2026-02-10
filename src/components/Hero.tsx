"use client";

import { motion } from "framer-motion";
import { Phone, FileText, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

const trustBadges = [
  { label: "BBB A+ Rating", short: "BBB A+" },
  { label: "HomeAdvisor Top Rated", short: "HomeAdvisor" },
  { label: "Houzz", short: "Houzz" },
  { label: "Angi Certified", short: "Angi" },
];

export function Hero() {
  const { openQuote } = useQuoteModal();
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 from-0% via-primary-900/85 via-40% to-primary-900/95 to-100% z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1920&q=80"
          alt="Masonry and construction work - placeholder, image will be updated"
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-display font-extrabold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
        >
          Queens&apos; Premier Roofing & Masonry Experts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-lg sm:text-xl text-white font-medium [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]"
        >
          Licensed, Bonded & Insured | 24/7 Emergency Service
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={openQuote}
            className="group flex items-center gap-2 px-8 py-4 bg-secondary-500 hover:bg-secondary-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-float hover:animate-none"
          >
            <FileText className="w-5 h-5" />
            Get Free Quote
          </button>
          <a
            href="tel:7188498999"
            className="group flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-bold text-lg rounded-xl border-2 border-white/40 transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            Call Now: (718) 849-8999
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className="px-4 py-2 bg-black/40 backdrop-blur rounded-lg text-sm font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
              title={badge.label}
            >
              {badge.short}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-1 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]"
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
