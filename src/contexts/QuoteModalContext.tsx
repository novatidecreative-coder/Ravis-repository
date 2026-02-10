"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type QuoteModalContextType = {
  open: boolean;
  openQuote: () => void;
  closeQuote: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextType | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openQuote = useCallback(() => setOpen(true), []);
  const closeQuote = useCallback(() => setOpen(false), []);
  return (
    <QuoteModalContext.Provider value={{ open, openQuote, closeQuote }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider");
  return ctx;
}
