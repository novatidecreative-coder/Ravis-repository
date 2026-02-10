import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const AREAS: Record<string, string> = {
  queens: "Queens",
  brooklyn: "Brooklyn",
  manhattan: "Manhattan",
  bronx: "Bronx",
  "garden-city": "Garden City",
  "great-neck": "Great Neck",
  "long-island": "Long Island",
};

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = AREAS[slug];
  if (!name) notFound();

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/#areas"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Areas
        </Link>
        <h1 className="text-h2 text-gray-900">We Serve {name}</h1>
        <p className="mt-6 text-gray-600 leading-relaxed">
          City Suburb Inc. provides roofing, masonry, waterproofing, and more throughout {name} and
          surrounding communities. Contact us for a free estimate.
        </p>
        <div className="mt-10">
          <a
            href="tel:7188498999"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700"
          >
            Call (718) 849-8999
          </a>
        </div>
      </div>
    </div>
  );
}
