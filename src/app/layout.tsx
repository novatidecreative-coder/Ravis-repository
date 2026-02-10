import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { QuoteModalProvider } from "@/contexts/QuoteModalContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { FloatingQuoteButton } from "@/components/FloatingQuoteButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Queens Roofing & Masonry Contractor | City Suburb Inc.",
  description:
    "Licensed roofing & masonry contractor in Queens, Brooklyn, Manhattan. Expert roof installation, repair, waterproofing & more. A+ BBB rated. Free quotes!",
  openGraph: {
    title: "Queens Roofing & Masonry Contractor | City Suburb Inc.",
    description:
      "Licensed roofing & masonry contractor. Expert roof installation, repair, waterproofing. A+ BBB rated. Free quotes!",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "City Suburb Inc.",
  image: "https://citysuburbinc.com/og-image.jpg",
  telephone: "+1-718-849-8999",
  email: "contact@citysuburbinc.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9708 101st Ave",
    addressLocality: "Ozone Park",
    addressRegion: "NY",
    postalCode: "11416",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:00",
    closes: "20:00",
  },
  priceRange: "$$",
  areaServed: ["Queens", "Brooklyn", "Manhattan", "Bronx", "Long Island"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <QuoteModalProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ChatWidget />
          <FloatingQuoteButton />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
