"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

const faqs = [
  {
    id: "1",
    question: "Do you offer free estimates?",
    answer: "Yes. We provide free, no-obligation estimates for all roofing and masonry projects. Contact us by phone or through our quote form.",
    category: "Pricing",
  },
  {
    id: "2",
    question: "What areas do you serve?",
    answer: "We serve Queens, Brooklyn, Manhattan, Bronx, and Long Island areas including Garden City, Great Neck, and surrounding communities.",
    category: "Services",
  },
  {
    id: "3",
    question: "Are you licensed and insured?",
    answer: "Yes. We are fully licensed, bonded, and insured. Our NYC DOB Contractor ID is 2104737DCA and we carry full liability and workers' compensation insurance.",
    category: "Trust",
  },
  {
    id: "4",
    question: "How long does a typical roof installation take?",
    answer: "Most residential roof replacements are completed in 1–3 days depending on size and weather. We'll give you a clear timeline during the estimate.",
    category: "Timeline",
  },
  {
    id: "5",
    question: "Do you offer financing options?",
    answer: "Yes. We offer financing options for qualified customers so you can spread the cost of your project over time. Ask us for details.",
    category: "Pricing",
  },
  {
    id: "6",
    question: "What types of roofing materials do you install?",
    answer: "We install asphalt shingles, rubber/EPDM, flat roof systems, metal roofing, and more. We'll recommend the best option for your property and budget.",
    category: "Services",
  },
  {
    id: "7",
    question: "Can you handle emergency repairs?",
    answer: "Yes. We offer 24/7 emergency service for storm damage, leaks, and urgent repairs. Call (718) 849-8999 anytime.",
    category: "Emergency",
  },
  {
    id: "8",
    question: "Do you provide warranties on your work?",
    answer: "Yes. We stand behind our work with warranties on labor and use quality materials with manufacturer warranties. Details are provided with your estimate.",
    category: "Warranties",
  },
  {
    id: "9",
    question: "How do I prepare for my project?",
    answer: "We'll give you a clear checklist before we start. Generally: clear the work area, secure pets, and ensure access to power and water if needed.",
    category: "Timeline",
  },
  {
    id: "10",
    question: "What payment methods do you accept?",
    answer: "We accept check, cash, and major credit cards. Payment terms are discussed at the time of contract. A deposit is typically required to schedule.",
    category: "Pricing",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);
  const [search, setSearch] = useState("");
  const { openQuote } = useQuoteModal();

  const filtered = search.trim()
    ? faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(search.toLowerCase()) ||
          f.answer.toLowerCase().includes(search.toLowerCase())
      )
    : faqs;

  return (
    <section id="faq" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-h2 text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600">
            Can&apos;t find your answer?{" "}
            <button
              type="button"
              onClick={openQuote}
              className="text-primary-600 font-semibold hover:underline"
            >
              Chat with us
            </button>{" "}
            or request a quote.
          </p>
        </div>

        <input
          type="search"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-6 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          aria-label="Search FAQs"
        />

        <div className="space-y-2">
          {filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  {isOpen ? (
                    <Minus className="w-5 h-5 shrink-0 text-primary-600" />
                  ) : (
                    <Plus className="w-5 h-5 shrink-0 text-primary-600" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-2">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-8">No FAQs match your search.</p>
        )}
      </div>
    </section>
  );
}
