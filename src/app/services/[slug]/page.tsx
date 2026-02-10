import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const SERVICES: Record<string, { title: string; description: string }> = {
  roofing: {
    title: "Roofing Services",
    description:
      "From full roof installation to repairs, rubber/EPDM and flat roof systems, we deliver durable, weather-resistant solutions for residential and commercial properties. All work is completed by licensed professionals with quality materials.",
  },
  masonry: {
    title: "Masonry & Concrete",
    description:
      "Brick pointing, concrete driveways, patios, steps, and structural masonry. We restore and build with precision for lasting curb appeal and structural integrity.",
  },
  waterproofing: {
    title: "Foundation & Waterproofing",
    description:
      "Foundation repair and basement waterproofing to protect your property from water damage. We use proven systems and stand behind our work with warranties.",
  },
  exterior: {
    title: "Stucco & Exterior",
    description:
      "Stucco application, exterior painting, and pressure washing. Restore and protect your home's exterior with expert craftsmanship.",
  },
  specialized: {
    title: "Specialized Services",
    description:
      "Heated floors, pavers, retaining walls, gutter replacement, and more. One-stop shop for exterior and specialty improvements.",
  },
  emergency: {
    title: "24/7 Emergency Services",
    description:
      "Storm damage, leaks, and urgent repairs. We're available around the clock when you need us most. Call (718) 849-8999 anytime.",
  },
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>
        <h1 className="text-h2 text-gray-900">{service.title}</h1>
        <p className="mt-6 text-gray-600 leading-relaxed">{service.description}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="tel:7188498999"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700"
          >
            Call (718) 849-8999
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center px-6 py-3 bg-secondary-500 text-white font-semibold rounded-lg hover:bg-secondary-700"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
