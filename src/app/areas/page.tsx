import Link from "next/link";

const AREAS = [
  { slug: "queens", name: "Queens" },
  { slug: "brooklyn", name: "Brooklyn" },
  { slug: "manhattan", name: "Manhattan" },
  { slug: "bronx", name: "Bronx" },
  { slug: "garden-city", name: "Garden City" },
  { slug: "great-neck", name: "Great Neck" },
  { slug: "long-island", name: "Long Island" },
];

export default function AreasPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-h2 text-gray-900">Areas We Serve</h1>
        <p className="mt-4 text-lg text-gray-600">
          Proudly serving Queens, Brooklyn, Manhattan, Bronx, and Long Island.
        </p>
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AREAS.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/areas/${a.slug}`}
                className="block p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 font-medium text-gray-900"
              >
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
