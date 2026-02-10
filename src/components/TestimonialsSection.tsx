"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: "1",
    customerName: "David C.",
    rating: 5,
    review: "City Suburb did an outstanding job on our roof replacement. Professional from start to finish, and the crew was respectful of our property. Highly recommend!",
    service: "Roof Installation",
    date: "January 2024",
    verified: true,
  },
  {
    id: "2",
    customerName: "Nick P.",
    rating: 5,
    review: "We had masonry work and brick pointing done. The quality is excellent and the team was on time and communicative. Will use again for future projects.",
    service: "Masonry & Brick Pointing",
    date: "December 2023",
    verified: true,
  },
  {
    id: "3",
    customerName: "Kim R.",
    rating: 5,
    review: "Needed emergency roof repair after a storm. They came out same day and fixed the issue. Fair pricing and great work. Very grateful!",
    service: "Roof Repair",
    date: "November 2023",
    verified: true,
  },
  {
    id: "4",
    customerName: "Maria S.",
    rating: 5,
    review: "Basement waterproofing project completed on schedule. No more water issues. Professional and knowledgeable crew.",
    service: "Basement Waterproofing",
    date: "October 2023",
    verified: true,
  },
  {
    id: "5",
    customerName: "James L.",
    rating: 5,
    review: "Flat roof coating and repair. They explained everything clearly and left the site clean. Very satisfied with the result.",
    service: "Flat Roof Services",
    date: "September 2023",
    verified: true,
  },
];

const AUTO_ROTATE_MS = 5000;

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const visible = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-h2 text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Real reviews from homeowners and businesses we&apos;ve served.
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {visible.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex gap-1 text-warning mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary-200 mb-2" />
                  <p className="text-gray-700 leading-relaxed">&ldquo;{t.review}&rdquo;</p>
                  <p className="mt-4 font-semibold text-gray-900">{t.customerName}</p>
                  <p className="text-sm text-gray-500">{t.service}</p>
                  <p className="text-xs text-gray-400 mt-1">{t.date}</p>
                  {t.verified && (
                    <span className="inline-block mt-2 text-xs text-success font-medium">
                      ✓ Verified
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-primary-600 w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-center mt-6">
          <a
            href="https://www.google.com/search?q=City+Suburb+Inc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 font-medium hover:underline"
          >
            Read all reviews on Google →
          </a>
        </p>
      </div>
    </section>
  );
}
