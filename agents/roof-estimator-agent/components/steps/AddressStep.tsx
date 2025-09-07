'use client';

import { useState, useCallback, useEffect } from 'react';
import { useEstimatorStore } from '../../store/useEstimatorStore';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { analyzeRoof } from '../../lib/api';

interface AddressStepProps {
  onNext: () => void;
}

interface AddressSuggestion {
  description: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
}

export function AddressStep({ onNext }: AddressStepProps) {
  const { 
    address, 
    setAddress, 
    setMeasurements, 
    setLoading, 
    setError, 
    isAnalyzing,
    error 
  } = useEstimatorStore();
  
  const [localAddress, setLocalAddress] = useState(address);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced address suggestions (placeholder - would integrate with Google Places API)
  useEffect(() => {
    if (localAddress.length < 10) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Placeholder suggestions for demo
    const timer = setTimeout(() => {
      if (localAddress.toLowerCase().includes('co') || localAddress.toLowerCase().includes('colorado')) {
        setSuggestions([
          {
            description: `${localAddress.split(',')[0]}, Colorado Springs, CO, USA`,
            placeId: 'demo1',
            mainText: localAddress.split(',')[0],
            secondaryText: 'Colorado Springs, CO, USA'
          },
          {
            description: `${localAddress.split(',')[0]}, Denver, CO, USA`,
            placeId: 'demo2',
            mainText: localAddress.split(',')[0],
            secondaryText: 'Denver, CO, USA'
          }
        ]);
        setShowSuggestions(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localAddress]);

  const handleAddressChange = (value: string) => {
    setLocalAddress(value);
    setError(null);
  };

  const handleAddressSelect = (suggestion: AddressSuggestion) => {
    setLocalAddress(suggestion.description);
    setAddress(suggestion.description);
    setShowSuggestions(false);
  };

  const validateAddress = useCallback(() => {
    if (!localAddress || localAddress.length < 10) {
      setError('Please enter a complete address');
      return false;
    }

    if (!localAddress.toLowerCase().includes('co') && !localAddress.toLowerCase().includes('colorado')) {
      setError('We currently only serve Colorado. Please enter a Colorado address.');
      return false;
    }

    return true;
  }, [localAddress, setError]);

  const handleAnalyzeRoof = async () => {
    if (!validateAddress()) return;

    setLoading('analyzing', true);
    setError(null);

    try {
      // Store the address
      setAddress(localAddress);
      
      // Call the roof analysis API
      const response = await analyzeRoof(localAddress);
      
      if (response.success) {
        setMeasurements(response.measurements);
        onNext();
      } else {
        throw new Error(response.error || 'Failed to analyze roof');
      }
    } catch (err) {
      console.error('Roof analysis failed:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Unable to analyze this address. Please try a different address or contact us for assistance.'
      );
    } finally {
      setLoading('analyzing', false);
    }
  };

  const isValidAddress = localAddress.length >= 10 && 
    (localAddress.toLowerCase().includes('co') || localAddress.toLowerCase().includes('colorado'));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Get Your Free Roof Estimate
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enter your property address and we'll use satellite imagery to analyze your roof structure and provide an instant, accurate estimate.
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-6">
        {/* Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Address
          </label>
          
          <div className="relative">
            <input
              type="text"
              value={localAddress}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Enter your complete address..."
              className={`w-full px-4 py-3 border rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                error ? 'border-red-300' : 'border-gray-300'
              }`}
              autoComplete="street-address"
              disabled={isAnalyzing}
            />
            
            {isLoadingSuggestions && (
              <div className="absolute right-3 top-3">
                <LoadingSpinner size="sm" />
              </div>
            )}
          </div>

          {/* Address Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.placeId}
                  onClick={() => handleAddressSelect(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-blue-50 focus:outline-none border-b last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{suggestion.mainText}</div>
                  <div className="text-sm text-gray-600">{suggestion.secondaryText}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Service Area Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-0.5">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">
                Colorado Service Area
              </h4>
              <p className="text-sm text-blue-700">
                We currently provide roofing services throughout Colorado. Please enter a Colorado address to continue.
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="text-red-600 mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleAnalyzeRoof}
          disabled={!isValidAddress || isAnalyzing}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-3"
        >
          {isAnalyzing ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span>Analyzing Property...</span>
            </>
          ) : (
            <>
              <span>Analyze My Roof</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>

        {/* Technology Features */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4 text-center">
            Our Technology Advantage
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-green-500">🛰️</span>
              <span>Satellite Imagery</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-green-500">📏</span>
              <span>Precise Measurements</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-green-500">⚡</span>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-green-500">💯</span>
              <span>95%+ Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}