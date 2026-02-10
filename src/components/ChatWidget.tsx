"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Tawk.to placeholder: add script in layout or _document when TAWK_TO_PROPERTY_ID is set */}
      {process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ? (
        <div id="tawk-widget" className="fixed bottom-4 right-4 z-50" />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 flex items-center justify-center transition-transform hover:scale-105"
            aria-label={open ? "Close chat" : "Open chat"}
          >
            {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </button>
          {open && (
            <div
              className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              role="dialog"
              aria-label="Chat"
            >
              <div className="bg-primary-600 text-white p-4">
                <p className="font-semibold">City Suburb Inc.</p>
                <p className="text-sm text-primary-100">
                  Hi! Need help with roofing or masonry? Ask us anything!
                </p>
              </div>
              <div className="p-4 text-center text-gray-500 text-sm">
                <p>Chat is available during business hours.</p>
                <p className="mt-2">
                  <a href="tel:7188498999" className="text-primary-600 font-medium">
                    Call (718) 849-8999
                  </a>{" "}
                  for immediate help.
                </p>
                <a
                  href="mailto:contact@citysuburbinc.com"
                  className="inline-block mt-3 text-primary-600 font-medium"
                >
                  Email us →
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
