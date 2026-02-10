import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="text-primary-600 hover:underline font-medium mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-h2 text-gray-900">Terms of Service</h1>
        <p className="mt-4 text-gray-600">
          Terms of service for City Suburb Inc. This page is a placeholder. Add your full terms
          here.
        </p>
      </div>
    </div>
  );
}
