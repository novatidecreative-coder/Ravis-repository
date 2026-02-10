"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70"
        aria-label="Email for newsletter"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-70 text-white font-medium rounded-lg transition-colors"
      >
        {status === "loading" ? "..." : status === "success" ? "Subscribed!" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400 sm:col-span-2">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
