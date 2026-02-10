"use client";

const SERVICE_AREAS = [
  { name: "Queens", slug: "queens" },
  { name: "Brooklyn", slug: "brooklyn" },
  { name: "Manhattan", slug: "manhattan" },
  { name: "Bronx", slug: "bronx" },
  { name: "Garden City", slug: "garden-city" },
  { name: "Great Neck", slug: "great-neck" },
  { name: "Long Island", slug: "long-island" },
];

export function MapSection() {
  return (
    <section id="areas" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-h2 text-gray-900">Areas We Serve</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Proudly serving Queens, Brooklyn, Manhattan, Bronx, and Long Island.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[400px] rounded-2xl overflow-hidden bg-gray-200 border border-gray-300">
            <iframe
              title="City Suburb Inc. service area - Queens NY"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.158308943!2d-73.9442!3d40.6782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sQueens%2C%20NY!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Coverage Areas</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <a
                    href={`/areas/${area.slug}`}
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/areas"
              className="inline-block mt-6 text-primary-600 font-semibold hover:underline"
            >
              See full coverage area →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
