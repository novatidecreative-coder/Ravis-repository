"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { SERVICE_OPTIONS } from "@/types";
import { cn } from "@/lib/utils";

const phoneRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
const zipRegex = /^\d{5}(-\d{4})?$/;

const quoteSchema = z.object({
  honeypot: z.string().max(0).optional(),
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(phoneRegex, "Use format (XXX) XXX-XXXX"),
  service: z.string().min(1, "Select a service"),
  propertyType: z.enum(["Residential", "Commercial"]),
  zipCode: z.string().regex(zipRegex, "Valid 5-digit zip required"),
  projectDetails: z.string().optional(),
  preferredContact: z.enum(["Phone", "Email", "Text"]),
  otherService: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface QuoteFormModalProps {
  open: boolean;
  onClose: () => void;
}

export function QuoteFormModal({ open, onClose }: QuoteFormModalProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      propertyType: "Residential",
      preferredContact: "Phone",
      honeypot: "",
    },
  });

  const serviceValue = watch("service");

  const onSubmit = async (data: QuoteFormValues) => {
    if (data.honeypot) return;
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setConfirmationNumber(json.confirmationId || `CSI-${Date.now().toString(36).toUpperCase()}`);
      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitStatus("idle");
      setConfirmationNumber("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-form-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b flex items-center justify-between px-6 py-4 rounded-t-2xl">
              <h2 id="quote-form-title" className="text-xl font-bold text-gray-900">
                Get Your Free Quote
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close form"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitStatus === "success" ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-success">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Received!</h3>
                <p className="text-gray-600 mb-2">
                  We&apos;ll contact you shortly. Your confirmation number:
                </p>
                <p className="font-mono font-bold text-primary-700 text-lg">{confirmationNumber}</p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <input
                  type="text"
                  {...register("honeypot")}
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    {...register("fullName")}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-white",
                      errors.fullName ? "border-danger focus:ring-danger/20" : "border-gray-300 focus:ring-primary-500/20"
                    )}
                    placeholder="John Smith"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-danger">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-white",
                      errors.email ? "border-danger" : "border-gray-300"
                    )}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-danger">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-white",
                      errors.phone ? "border-danger" : "border-gray-300"
                    )}
                    placeholder="(718) 555-1234"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-danger">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    {...register("service")}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-white",
                      errors.service ? "border-danger" : "border-gray-300"
                    )}
                  >
                    <option value="">Select service</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {serviceValue === "Other" && (
                    <input
                      {...register("otherService")}
                      placeholder="Please specify"
                      className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300"
                    />
                  )}
                  {errors.service && (
                    <p className="mt-1 text-sm text-danger">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    id="propertyType"
                    {...register("propertyType")}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code *
                  </label>
                  <input
                    id="zipCode"
                    {...register("zipCode")}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-white",
                      errors.zipCode ? "border-danger" : "border-gray-300"
                    )}
                    placeholder="11416"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-danger">{errors.zipCode.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Details (optional)
                  </label>
                  <textarea
                    id="projectDetails"
                    {...register("projectDetails")}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white"
                    placeholder="Describe your project..."
                  />
                </div>

                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact *
                  </span>
                  <div className="flex gap-4">
                    {(["Phone", "Email", "Text"] as const).map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          {...register("preferredContact")}
                          value={opt}
                          className="text-primary-600"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {submitStatus === "error" && (
                  <p className="text-sm text-danger">
                    Something went wrong. Please call us at (718) 849-8999 or try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full py-3 bg-secondary-500 hover:bg-secondary-700 disabled:opacity-70 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  {submitStatus === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
