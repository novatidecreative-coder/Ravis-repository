"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Hammer,
  Droplets,
  PaintBucket,
  BrickWall,
  Zap,
  ArrowRight,
  Shield,
} from "lucide-react";

const services = [
  {
    title: "Roofing Services",
    description: "Full roof installation, repair, rubber/EPDM, and flat roof solutions. We handle residential and commercial projects with lasting results.",
    icon: Home,
    href: "/services/roofing",
    category: "Roofing",
  },
  {
    title: "Masonry & Concrete",
    description: "Brick pointing, concrete driveways, patios, and structural masonry. Expert craftsmanship for curb appeal and durability.",
    icon: BrickWall,
    href: "/services/masonry",
    category: "Masonry",
  },
  {
    title: "Foundation & Waterproofing",
    description: "Foundation repair and basement waterproofing to protect your property from water damage and structural issues.",
    icon: Droplets,
    href: "/services/waterproofing",
    category: "Waterproofing",
  },
  {
    title: "Stucco & Exterior",
    description: "Stucco application, exterior painting, and pressure washing to restore and protect your home's exterior.",
    icon: PaintBucket,
    href: "/services/exterior",
    category: "Exterior",
  },
  {
    title: "Specialized & Pavers",
    description: "Heated floors, pavers, retaining walls, and gutter replacement. One-stop shop for exterior improvements.",
    icon: Hammer,
    href: "/services/specialized",
    category: "Specialized",
  },
  {
    title: "24/7 Emergency Services",
    description: "Storm damage, leaks, and urgent repairs. We're available around the clock when you need us most.",
    icon: Zap,
    href: "/services/emergency",
    category: "Emergency",
    badge: "24/7",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-h2 text-gray-900">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From roof to foundation, we deliver quality work you can count on.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-primary-100 text-primary-700 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <s.icon className="w-8 h-8" />
                </div>
                {s.badge && (
                  <span className="px-2.5 py-1 bg-secondary-500/20 text-secondary-700 text-xs font-semibold rounded-full">
                    {s.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{s.description}</p>
              <Link
                href={s.href}
                className="mt-4 inline-flex items-center gap-2 text-primary-700 font-medium hover:text-primary-900 group/link"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
