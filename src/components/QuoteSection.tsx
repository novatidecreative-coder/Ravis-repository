"use client";

import { motion } from "framer-motion";
import { FileText, Phone } from "lucide-react";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function QuoteSection() {
  const { openQuote } = useQuoteModal();

  return (
    <section id="quote" className="py-16 bg-primary-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl border-2 border-primary-700 p-8 sm:p-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Get Your Free Quote
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Describe your project and we&apos;ll get back with a no-obligation estimate. Licensed, bonded & insured.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={openQuote}
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary-500 hover:bg-secondary-700 text-white font-bold text-lg rounded-xl shadow-lg border-2 border-secondary-700 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Request Free Quote
            </button>
            <a
              href="tel:7188498999"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-100 hover:bg-primary-200 text-primary-900 font-bold text-lg rounded-xl border-2 border-primary-300 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (718) 849-8999
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Or scroll up and click &ldquo;Get Free Quote&rdquo; in the header anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
