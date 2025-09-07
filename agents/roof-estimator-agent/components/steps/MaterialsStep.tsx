'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEstimatorStore } from '../../store/useEstimatorStore';
import { getMaterialPricing, formatCurrency, type MaterialOption } from '../../lib/api';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import type { RoofMeasurements } from '../../store/useEstimatorStore';

interface MaterialsStepProps {
  measurements: RoofMeasurements | null;
  selectedMaterial: string;
  onNext: () => void;
  onBack: () => void;
}

export function MaterialsStep({ measurements, selectedMaterial, onNext, onBack }: MaterialsStepProps) {
  const { setSelectedMaterial, setError } = useEstimatorStore();
  
  const [materials, setMaterials] = useState<MaterialOption[]>([]);
  const [estimates, setEstimates] = useState<Record<string, number>>({});
  const [isLoadingPricing, setIsLoadingPricing] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'shingles' | 'metal'>('shingles');

  // Load material pricing on component mount
  useEffect(() => {
    if (measurements?.roofAreaSqFt) {
      loadMaterialPricing();
    }
  }, [measurements?.roofAreaSqFt]);

  const loadMaterialPricing = async () => {
    if (!measurements?.roofAreaSqFt) return;

    setIsLoadingPricing(true);
    try {
      const response = await getMaterialPricing(measurements.roofAreaSqFt);
      
      if (response.success && response.materials) {
        setMaterials(response.materials);
        setEstimates(response.estimates || {});
      } else {
        throw new Error(response.error || 'Failed to load material pricing');
      }
    } catch (error) {
      console.error('Failed to load materials:', error);
      setError('Unable to load material pricing. Please try again.');
    } finally {
      setIsLoadingPricing(false);
    }
  };

  const handleMaterialSelect = useCallback((materialId: string) => {
    setSelectedMaterial(materialId);
  }, [setSelectedMaterial]);

  const handleNext = useCallback(() => {
    if (!selectedMaterial) {
      setError('Please select a roofing material to continue');
      return;
    }
    onNext();
  }, [selectedMaterial, onNext, setError]);

  if (!measurements) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center py-12">
          <p className="text-gray-600">No measurement data available. Please go back and re-analyze your address.</p>
        </div>
      </div>
    );
  }

  const shingleMaterials = materials.filter(m => m.category === 'shingles');
  const metalMaterials = materials.filter(m => m.category === 'metal');
  const selectedMaterialData = materials.find(m => m.id === selectedMaterial);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Roofing Material
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the material that best fits your needs, budget, and style preferences. All prices include materials, installation, and warranty.
        </p>
      </div>

      {/* Roof Summary */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-blue-800 font-medium">Roof Area:</span>
              <span className="text-blue-900 font-bold ml-2">{measurements.roofAreaSqFt.toLocaleString()} sq ft</span>
            </div>
            <div>
              <span className="text-blue-800 font-medium">Pitch:</span>
              <span className="text-blue-900 font-bold ml-2">{measurements.slope.pitchRatio}</span>
            </div>
            <div>
              <span className="text-blue-800 font-medium">Complexity:</span>
              <span className="text-blue-900 font-bold ml-2">{measurements.features.complexityMultiplier.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {isLoadingPricing ? (
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading material pricing...</p>
        </div>
      ) : (
        <>
          {/* Material Category Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveCategory('shingles')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                activeCategory === 'shingles'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🏠</span>
                <span>Asphalt Shingles</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveCategory('metal')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                activeCategory === 'metal'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>⚡</span>
                <span>Metal Roofing</span>
              </div>
            </button>
          </div>

          {/* Material Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {(activeCategory === 'shingles' ? shingleMaterials : metalMaterials).map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                isSelected={selectedMaterial === material.id}
                onSelect={handleMaterialSelect}
                estimatedCost={estimates[material.id]}
                roofArea={measurements.roofAreaSqFt}
              />
            ))}
          </div>

          {/* Category Description */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {activeCategory === 'shingles' ? '🏠 About Asphalt Shingles' : '⚡ About Metal Roofing'}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {activeCategory === 'shingles' ? (
                'Asphalt shingles are the most popular roofing material in America, offering excellent value, durability, and a wide variety of colors and styles. They\'re cost-effective, relatively easy to install, and provide reliable weather protection for decades.'
              ) : (
                'Metal roofing offers superior longevity, energy efficiency, and weather resistance. While the initial investment is higher, metal roofs can last 40+ years, reflect heat to reduce cooling costs, and often qualify for insurance discounts in hail-prone areas.'
              )}
            </p>
          </div>

          {/* Selected Material Preview */}
          {selectedMaterialData && (
            <EstimatePreview
              material={selectedMaterialData}
              estimatedCost={estimates[selectedMaterialData.id] || 0}
              roofArea={measurements.roofAreaSqFt}
            />
          )}
        </>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Confirmation</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedMaterial}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>Get My Estimate</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface MaterialCardProps {
  material: MaterialOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  estimatedCost: number | undefined;
  roofArea: number;
}

function MaterialCard({ material, isSelected, onSelect, estimatedCost, roofArea }: MaterialCardProps) {
  const costPerSqft = estimatedCost ? (estimatedCost / roofArea).toFixed(2) : '0.00';

  return (
    <div
      onClick={() => onSelect(material.id)}
      className={`relative cursor-pointer border-2 rounded-xl p-6 transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {material.popular && (
        <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          POPULAR
        </div>
      )}

      {/* Material Image Placeholder */}
      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium">{material.name}</span>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-2 text-gray-900">{material.name}</h3>
      
      {estimatedCost && (
        <div className="mb-4">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {formatCurrency(estimatedCost)}
          </div>
          <div className="text-sm text-gray-500">
            ${costPerSqft}/sq ft • {material.warranty} warranty
          </div>
        </div>
      )}

      <p className="text-sm text-gray-600 mb-4">{material.description}</p>

      <ul className="space-y-2 mb-4">
        {material.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className={`w-full py-3 px-4 rounded-lg text-center font-semibold transition-colors ${
        isSelected
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}>
        {isSelected ? '✓ Selected' : 'Select This Material'}
      </div>
    </div>
  );
}

interface EstimatePreviewProps {
  material: MaterialOption;
  estimatedCost: number;
  roofArea: number;
}

function EstimatePreview({ material, estimatedCost, roofArea }: EstimatePreviewProps) {
  const costPerSqft = (estimatedCost / roofArea).toFixed(2);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white mb-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Your Selected Material</h3>
        <div className="text-3xl font-bold mb-2">{material.name}</div>
        <div className="text-4xl font-bold mb-4">{formatCurrency(estimatedCost)}</div>
        <div className="text-blue-100 text-sm">
          ${costPerSqft} per sq ft • {material.warranty} warranty
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-500">
        <div className="text-center">
          <div className="text-2xl font-bold">{roofArea.toLocaleString()}</div>
          <div className="text-blue-200 text-sm">Square Feet</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{material.warranty}</div>
          <div className="text-blue-200 text-sm">Warranty</div>
        </div>
      </div>
    </div>
  );
}