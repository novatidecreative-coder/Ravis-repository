import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { SERVICE_OPTIONS } from "@/types";
import { NewsletterForm } from "./NewsletterForm";

const quickLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#before-after", label: "Before & After" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQs" },
  { href: "/#areas", label: "Areas We Serve" },
  { href: "/#quote", label: "Get Quote" },
  { href: "/#contact", label: "Contact Us" },
];

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link href="/" className="text-xl font-bold text-white hover:text-primary-100">
              City Suburb Inc.
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Queens&apos; Premier Roofing & Masonry Experts. Licensed, Bonded & Insured.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary-400" />
                <span>9708 101st Ave, Ozone Park, NY 11416</span>
              </li>
              <li>
                <a
                  href="tel:7188498999"
                  className="flex items-center gap-2 text-sm hover:text-primary-300 transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-primary-400" />
                  (718) 849-8999
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@citysuburbinc.com"
                  className="flex items-center gap-2 text-sm hover:text-primary-300 transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-primary-400" />
                  contact@citysuburbinc.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary-400" />
                <span>Mon–Sun 7:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Directory */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICE_OPTIONS.slice(0, 10).map((service) => (
                <li key={service}>
                  <Link
                    href={`/#services`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Pro Tips & Special Offers
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              Get seasonal maintenance tips and exclusive offers.
            </p>
            <NewsletterForm />
            <p className="mt-2 text-xs text-gray-500">
              We respect your privacy. Unsubscribe anytime.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} City Suburb Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="text-gray-500 hover:text-gray-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
