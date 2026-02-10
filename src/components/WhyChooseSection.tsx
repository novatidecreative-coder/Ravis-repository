"use client";

import { motion } from "framer-motion";
import { Briefcase, Heart, Award, HeadsetIcon } from "lucide-react";

const reasons = [
  {
    title: "Comprehensive Services",
    description: "One-stop shop for roofing, masonry, waterproofing, and more. One contractor, one point of contact.",
    icon: Briefcase,
  },
  {
    title: "Customer-Centric",
    description: "Clear communication and tailored solutions. We listen and deliver what you need.",
    icon: Heart,
  },
  {
    title: "Right First Time",
    description: "Expert craftsmanship and lasting results. We take pride in doing the job right.",
    icon: Award,
  },
  {
    title: "Reliable Support",
    description: "Available 24/7 for emergencies and follow-up. Your peace of mind matters.",
    icon: HeadsetIcon,
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction Focus" },
];

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-h2 text-gray-900">Why Choose City Suburb Inc.</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by hundreds of homeowners and businesses across the tri-state area.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex p-4 rounded-2xl bg-primary-100 text-primary-700 group-hover:scale-110 transition-transform duration-300">
                <r.icon className="w-10 h-10" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{r.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{r.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-12 py-8 px-6 bg-primary-900 rounded-2xl text-white"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-100">{s.value}</div>
              <div className="text-sm text-primary-200 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
