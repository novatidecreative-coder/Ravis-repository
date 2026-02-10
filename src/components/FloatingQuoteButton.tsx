"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function FloatingQuoteButton() {
  const [visible, setVisible] = useState(false);
  const { openQuote } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={openQuote}
      className="fixed bottom-24 right-6 z-40 lg:bottom-8 lg:right-8 flex items-center gap-2 px-4 py-3 bg-secondary-500 hover:bg-secondary-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
      aria-label="Get free quote"
    >
      <FileText className="w-5 h-5" />
      <span className="hidden sm:inline">Get Quote</span>
    </button>
  );
}
