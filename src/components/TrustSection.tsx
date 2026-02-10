"use client";

import { motion } from "framer-motion";
import { Shield, Award } from "lucide-react";

const badges = [
  { name: "BBB A+ Accredited Business", href: "https://www.bbb.org" },
  { name: "HomeAdvisor Top Rated", href: "https://www.homeadvisor.com" },
  { name: "Angi Certified", href: "https://www.angi.com" },
  { name: "Houzz", href: "https://www.houzz.com" },
];

const licenses = [
  { label: "NYC DOB Contractor ID", value: "2104737DCA" },
  { label: "NYC Home Improvement License", value: "1368990" },
  { label: "Special Rigger License", value: "6525" },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 text-gray-900">Licensed & Trusted</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Fully insured, licensed, and bonded. Your project is in qualified hands.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {badges.map((b) => (
            <motion.a
              key={b.name}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 grayscale hover:grayscale-0 hover:border-primary-200 transition-all"
            >
              <Award className="w-12 h-12 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">{b.name}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 py-6 px-8 bg-gray-100 rounded-2xl"
        >
          <div className="flex items-center gap-2 text-gray-700">
            <Shield className="w-6 h-6 text-primary-600" />
            <span className="font-semibold">Fully Insured, Licensed & Bonded</span>
          </div>
          {licenses.map((l) => (
            <div key={l.label} className="text-center">
              <p className="text-xs text-gray-500">{l.label}</p>
              <p className="font-mono font-semibold text-gray-900">{l.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
