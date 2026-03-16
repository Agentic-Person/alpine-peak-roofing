import Link from 'next/link'

export default function EstimateNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-[#1a3a5c]/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🏠</span>
        </div>
        <h1 className="text-2xl font-bold text-[#1a3a5c] font-serif mb-3">
          Estimate Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          This estimate link may have expired or is invalid. Get a fresh estimate in about 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/estimator"
            className="inline-flex items-center justify-center gap-2 bg-[#1a3a5c] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#243d5c] transition-colors text-sm"
          >
            Get a New Estimate
          </Link>
          <a
            href="tel:9704561176"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:border-gray-400 transition-colors text-sm"
          >
            Call (970) 456-1176
          </a>
        </div>
      </div>
    </div>
  )
}
