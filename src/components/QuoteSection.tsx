"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Phone } from "lucide-react";
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

export function QuoteSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      // Simple success handling: reset and alert. You can replace with inline thank-you UI.
      reset();
      alert("Thank you! Your quote request has been received.");
    } catch {
      alert("Something went wrong. Please call (718) 849-8999 or try again.");
    }
  };

  return (
    <section id="quote" className="py-16 bg-primary-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl border-2 border-primary-700 p-6 sm:p-8"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Get Your Free Quote
            </h2>
            <p className="mt-2 text-gray-600">
              Fill out the form below and we&apos;ll get back to you with a no-obligation estimate.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <input
              type="text"
              {...register("honeypot")}
              className="absolute opacity-0 pointer-events-none h-0 w-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="md:col-span-1">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Full Name *
              </label>
              <input
                id="fullName"
                {...register("fullName")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                  errors.fullName ? "border-danger" : "border-gray-300"
                )}
                placeholder="John Smith"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm font-medium text-danger">{errors.fullName.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Email *
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                  errors.email ? "border-danger" : "border-gray-300"
                )}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm font-medium text-danger">{errors.email.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                  errors.phone ? "border-danger" : "border-gray-300"
                )}
                placeholder="(718) 555-1234"
              />
              {errors.phone && (
                <p className="mt-1 text-sm font-medium text-danger">{errors.phone.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Zip Code *
              </label>
              <input
                id="zipCode"
                {...register("zipCode")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                  errors.zipCode ? "border-danger" : "border-gray-300"
                )}
                placeholder="11416"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm font-medium text-danger">{errors.zipCode.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Service Needed *
              </label>
              <select
                id="service"
                {...register("service")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
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
                  className="mt-2 w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:bg-white"
                />
              )}
              {errors.service && (
                <p className="mt-1 text-sm font-medium text-danger">{errors.service.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label htmlFor="propertyType" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Property Type *
              </label>
              <select
                id="propertyType"
                {...register("propertyType")}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="projectDetails" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Project Details (optional)
              </label>
              <textarea
                id="projectDetails"
                {...register("projectDetails")}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Briefly describe your project, timing, and any concerns..."
              />
            </div>

            <div className="md:col-span-2">
              <span className="block text-sm font-semibold text-gray-900 mb-2">
                Preferred Contact *
              </span>
              <div className="flex flex-wrap gap-4">
                {(["Phone", "Email", "Text"] as const).map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      {...register("preferredContact")}
                      value={opt}
                      className="text-primary-600 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-900">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-secondary-500 hover:bg-secondary-700 disabled:opacity-70 text-white font-bold rounded-lg text-base border-2 border-secondary-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Submit Quote Request"
                )}
              </button>
              <a
                href="tel:7188498999"
                className="inline-flex items-center gap-2 text-sm text-primary-900 font-semibold"
              >
                <Phone className="w-4 h-4" />
                Prefer to talk? Call (718) 849-8999
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

