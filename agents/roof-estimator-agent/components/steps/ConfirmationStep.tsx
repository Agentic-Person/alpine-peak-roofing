'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { useEstimatorStore } from '../../store/useEstimatorStore';
import type { RoofMeasurements } from '../../store/useEstimatorStore';

interface ConfirmationStepProps {
  address: string;
  measurements: RoofMeasurements | null;
  onNext: () => void;
  onBack: () => void;
}

export function ConfirmationStep({ address, measurements, onNext, onBack }: ConfirmationStepProps) {
  const { contactInfo, setContactInfo } = useEstimatorStore();
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [email, setEmail] = useState(contactInfo.email || '');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (measurements?.coordinates) {
      // Brief delay to let the map iframe load
      const timer = setTimeout(() => setIsLoadingImage(false), 800);
      return () => clearTimeout(timer);
    }
  }, [measurements?.coordinates]);

  const handleContinue = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError('Email is required to continue');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Store email in contactInfo so it's pre-filled in the ContactStep
    setContactInfo({ ...contactInfo, email: trimmed });

    // Fire lead capture with email (non-blocking)
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: trimmed,
        source: 'estimate_confirmation',
        type: 'email_gate',
        metadata: {
          address,
          roofAreaSqFt: measurements?.roofAreaSqFt,
        },
      }),
    }).catch(() => {});

    // Fire GA4 event
    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.gtag) {
        // @ts-ignore
        window.gtag('event', 'estimate_email_collected', {
          event_category: 'lead',
          event_label: 'roof_estimate_confirmation',
        });
      }
    } catch {}

    onNext();
  };

  if (!measurements) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center py-12">
          <p className="text-gray-600">No measurement data available. Please go back and re-analyze your address.</p>
          <button
            onClick={onBack}
            className="mt-4 px-6 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            &larr; Back to Address
          </button>
        </div>
      </div>
    );
  }

  const { lat, lng } = measurements.coordinates;
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          We Found Your Roof
        </h2>
        <p className="text-lg text-gray-600">
          Confirm this is the right property, then enter your email to get your personalized estimate.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map / Satellite View */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Your Property</h3>

          <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-100">
            {isLoadingImage && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-gray-600">Loading satellite view...</p>
                </div>
              </div>
            )}
            <div className="aspect-square">
              {googleMapsKey ? (
                <iframe
                  title="Property location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsKey}&q=${encodeURIComponent(address)}&zoom=19&maptype=satellite`}
                  onLoad={() => setIsLoadingImage(false)}
                />
              ) : (
                <iframe
                  title="Property location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.002},${lat - 0.002},${lng + 0.002},${lat + 0.002}&layer=mapnik&marker=${lat},${lng}`}
                  onLoad={() => setIsLoadingImage(false)}
                />
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500 text-center">
            <p className="font-medium">{address}</p>
            <p>Imagery Quality: <span className="text-green-600 font-semibold">{measurements.imageryQuality}</span></p>
          </div>
        </div>

        {/* Measurements Summary */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Roof Measurements</h3>

          {/* Confidence Score */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Measurement Confidence</span>
              <span className="text-lg font-bold text-blue-600">
                {Math.round(measurements.confidenceScore * 100)}%
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${measurements.confidenceScore * 100}%` }}
              />
            </div>
            <p className="text-xs text-blue-700 mt-2">
              {measurements.confidenceScore >= 0.9 ? 'Excellent accuracy expected' :
               measurements.confidenceScore >= 0.8 ? 'Good accuracy expected' :
               'Fair accuracy - may need manual verification'}
            </p>
          </div>

          {/* Key Measurements */}
          <div className="space-y-4">
            <MeasurementCard
              icon="📐"
              label="Total Roof Area"
              value={`${measurements.roofAreaSqFt.toLocaleString()} sq ft`}
              subtitle={`${measurements.roofAreaSqMeters.toFixed(0)} sq meters`}
            />

            <MeasurementCard
              icon="📏"
              label="Roof Pitch"
              value={measurements.slope.pitchRatio}
              subtitle={`${measurements.slope.averagePitchDegrees.toFixed(1)}° (${measurements.slope.category})`}
            />

            <MeasurementCard
              icon="🏔️"
              label="Ridge Lines"
              value={`${measurements.features.ridgeLengthFt} ft`}
              subtitle={`${measurements.features.segmentCount} roof segments detected`}
            />

            {measurements.features.valleyLengthFt > 0 && (
              <MeasurementCard
                icon="⛰️"
                label="Valley Lines"
                value={`${measurements.features.valleyLengthFt} ft`}
                subtitle="Complex roof structure"
              />
            )}

            <MeasurementCard
              icon="🔧"
              label="Complexity Factor"
              value={measurements.features.complexityMultiplier.toFixed(2)}
              subtitle={
                measurements.features.complexityMultiplier > 1.3 ? 'Complex installation' :
                measurements.features.complexityMultiplier > 1.1 ? 'Moderate complexity' :
                'Standard installation'
              }
            />
          </div>

          {/* Validation Warnings */}
          {measurements.validation && measurements.validation.warnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">Important Notes</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {measurements.validation.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">&bull;</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── Email Gate ── */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready for your personalized estimate?
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            Enter your email to continue — we&apos;ll send your detailed proposal there when it&apos;s ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError(''); }}
              placeholder="your@email.com"
              className={`flex-1 px-4 py-3.5 border rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            <button
              onClick={handleContinue}
              className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              <span>Continue to Estimate</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {emailError && (
            <p className="text-red-600 text-sm mt-2">{emailError}</p>
          )}
          <p className="text-xs text-gray-400 mt-3">
            No spam. Your info is safe. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-start mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Address</span>
        </button>
      </div>
    </div>
  );
}

interface MeasurementCardProps {
  icon: string;
  label: string;
  value: string;
  subtitle: string;
}

function MeasurementCard({ icon, label, value, subtitle }: MeasurementCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <span className="text-lg font-bold text-gray-900">{value}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
