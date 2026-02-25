"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Hammer,
  Home,
  Image,
  FileText,
  MessageCircle,
  MapPin,
  HelpCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/contexts/QuoteModalContext";
import { QuoteFormModal } from "./QuoteFormModal";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#before-after", label: "Before & After" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#areas", label: "Areas We Serve" },
  { href: "/#faq", label: "FAQs" },
  { href: "/#quote", label: "Get Quote" },
  { href: "/#contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/roofing", label: "Roofing", icon: Home },
  { href: "/services/masonry", label: "Masonry & Concrete", icon: Hammer },
  { href: "/services/waterproofing", label: "Foundation & Waterproofing", icon: Home },
  { href: "/services/exterior", label: "Stucco & Exterior", icon: Home },
  { href: "/services/emergency", label: "Emergency Services", icon: MessageCircle },
];

export function Header() {
  const { open: quoteOpen, openQuote, closeQuote } = useQuoteModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-black/50 backdrop-blur-md py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between max-w-7xl">
          <Link
            href="/"
            className={cn(
              "text-xl font-bold transition-colors",
              scrolled
                ? "text-primary-900 hover:text-primary-700"
                : "text-white hover:text-primary-200"
            )}
            aria-label="City Suburb Inc. Home"
          >
            City Suburb Inc.
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-colors",
                  scrolled
                    ? "text-gray-700 hover:text-primary-600"
                    : "text-white hover:text-primary-200"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 font-medium transition-colors",
                  scrolled
                    ? "text-gray-700 hover:text-primary-600"
                    : "text-white hover:text-primary-200"
                )}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                      >
                        <s.icon className="w-4 h-4" />
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:7188498999"
              className={cn(
                "flex items-center gap-2 font-semibold transition-colors",
                scrolled
                  ? "text-primary-700 hover:text-primary-900"
                  : "text-white hover:text-primary-200"
              )}
              aria-label="Call (718) 849-8999"
            >
              <Phone className="w-4 h-4" />
              (718) 849-8999
            </a>
            <button
              type="button"
              onClick={openQuote}
              className="bg-secondary-500 hover:bg-secondary-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Get Free Quote
            </button>
          </div>

          <button
            type="button"
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/20"
            )}
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
            aria-modal="true"
            role="dialog"
            aria-label="Mobile menu"
          >
            <div
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-primary-900">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-3 px-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium"
                  >
                    {link.label === "Services" && <Hammer className="w-4 h-4" />}
                    {link.label === "Gallery" && <Image className="w-4 h-4" />}
                    {link.label === "Reviews" && <MessageCircle className="w-4 h-4" />}
                    {link.label === "Areas We Serve" && <MapPin className="w-4 h-4" />}
                    {link.label === "FAQs" && <HelpCircle className="w-4 h-4" />}
                    {link.label === "Contact" && <Mail className="w-4 h-4" />}
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t mt-2">
                  <p className="text-xs text-gray-500 px-3 mb-2">Services</p>
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="p-4 border-t space-y-2">
                <a
                  href="tel:7188498999"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary-100 text-primary-700 font-semibold rounded-lg"
                >
                  <Phone className="w-5 h-5" /> Call (718) 849-8999
                </a>
                <button
                  type="button"
                  onClick={() => {
                    openQuote();
                    setMobileOpen(false);
                  }}
                  className="w-full py-3 bg-secondary-500 text-white font-semibold rounded-lg"
                >
                  Get Free Quote
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteFormModal open={quoteOpen} onClose={closeQuote} />
    </>
  );
}
