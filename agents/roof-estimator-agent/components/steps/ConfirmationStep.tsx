'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import type { RoofMeasurements } from '../../store/useEstimatorStore';

interface ConfirmationStepProps {
  address: string;
  measurements: RoofMeasurements | null;
  onNext: () => void;
  onBack: () => void;
}

export function ConfirmationStep({ address, measurements, onNext, onBack }: ConfirmationStepProps) {
  const [satelliteImageUrl, setSatelliteImageUrl] = useState<string>('');
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    // Generate satellite image URL (placeholder for demo)
    if (measurements?.coordinates) {
      const { lat, lng } = measurements.coordinates;
      // This would typically use Google Static Maps API
      const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=19&size=800x600&maptype=satellite&key=DEMO_KEY`;
      
      // For demo, use a placeholder
      setSatelliteImageUrl('/api/placeholder-satellite-image');
      
      // Simulate image loading
      setTimeout(() => {
        setIsLoadingImage(false);
      }, 1000);
    }
  }, [measurements?.coordinates]);

  if (!measurements) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center py-12">
          <p className="text-gray-600">No measurement data available. Please go back and re-analyze your address.</p>
          <button
            onClick={onBack}
            className="mt-4 px-6 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Address
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Property Analysis Complete
        </h2>
        <p className="text-lg text-gray-600">
          We've successfully analyzed your roof using satellite imagery. Please review the measurements below.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Satellite Image with Roof Outline */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Property View</h3>
          
          <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-100">
            {isLoadingImage ? (
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-gray-600">Loading satellite imagery...</p>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">Satellite Image Placeholder</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Coordinates: {measurements.coordinates.lat.toFixed(6)}, {measurements.coordinates.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            )}
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
              <h4 className="text-sm font-medium text-yellow-800 mb-2">⚠️ Important Notes</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {measurements.validation.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Professional Verification Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">📋 Professional Verification</h4>
            <p className="text-sm text-gray-600">
              While our satellite analysis is highly accurate, final measurements will be verified during our professional site inspection before installation begins.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Address</span>
        </button>
        
        <button
          onClick={onNext}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>Choose Materials</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
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