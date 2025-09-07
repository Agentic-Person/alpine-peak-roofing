'use client';

import { useState, useEffect } from 'react';
import { useEstimatorStore, type EstimateResult } from '../../store/useEstimatorStore';
import { calculateEstimate, generatePDF, formatCurrency } from '../../lib/api';
import { LoadingSpinnerWithText } from '../shared/LoadingSpinner';

interface ResultsStepProps {
  estimate: EstimateResult | null;
  onStartOver: () => void;
}

const GENERATION_STEPS = [
  'Analyzing roof measurements...',
  'Calculating material requirements...',
  'Applying regional pricing...',
  'Generating detailed breakdown...',
  'Creating professional PDF...',
  'Sending to your email...'
];

export function ResultsStep({ estimate: propEstimate, onStartOver }: ResultsStepProps) {
  const {
    measurements,
    selectedMaterial,
    contactInfo,
    setEstimate,
    setLoading,
    setError,
    isCalculating,
    isGeneratingPdf
  } = useEstimatorStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [estimate, setLocalEstimate] = useState<EstimateResult | null>(propEstimate);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!estimate && measurements && selectedMaterial && contactInfo.email) {
      generateEstimate();
    }
  }, [estimate, measurements, selectedMaterial, contactInfo.email]);

  useEffect(() => {
    if (estimate && !pdfUrl && !isGeneratingPdf) {
      generateEstimatePDF();
    }
  }, [estimate, pdfUrl, isGeneratingPdf]);

  // Animate through the generation steps
  useEffect(() => {
    if ((isCalculating || isGeneratingPdf) && !isComplete) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % GENERATION_STEPS.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isCalculating, isGeneratingPdf, isComplete]);

  const generateEstimate = async () => {
    if (!measurements || !contactInfo.email) return;

    setLoading('calculating', true);
    setError(null);

    try {
      const response = await calculateEstimate({
        measurementId: `MEAS-${Date.now()}`,
        measurements,
        selectedMaterial,
        contactInfo,
        municipality: 'Colorado Springs', // Default, could be extracted from address
        urgency: contactInfo.projectTimeline
      });

      if (response.success && response.estimate) {
        setLocalEstimate(response.estimate);
        setEstimate(response.estimate);
      } else {
        throw new Error(response.error || 'Failed to calculate estimate');
      }
    } catch (error) {
      console.error('Estimate calculation failed:', error);
      setError('Unable to generate estimate. Please try again.');
    } finally {
      setLoading('calculating', false);
    }
  };

  const generateEstimatePDF = async () => {
    if (!estimate) return;

    setLoading('generating', true);

    try {
      const response = await generatePDF({
        estimateId: estimate.estimateId,
        estimateData: estimate
      });

      if (response.success) {
        setPdfUrl(response.pdfUrl || '');
        setEmailSent(response.emailSent || false);
        setIsComplete(true);
      } else {
        throw new Error(response.error || 'Failed to generate PDF');
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      setError('Unable to generate PDF. Your estimate details are still available below.');
    } finally {
      setLoading('generating', false);
    }
  };

  // Show loading state while generating
  if (!estimate || !isComplete) {
    return <EstimateGenerating currentStep={currentStep} />;
  }

  return <EstimateComplete estimate={estimate} pdfUrl={pdfUrl} emailSent={emailSent} onStartOver={onStartOver} />;
}

interface EstimateGeneratingProps {
  currentStep: number;
}

function EstimateGenerating({ currentStep }: EstimateGeneratingProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center py-12">
        <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Creating Your Professional Estimate
        </h2>
        
        <p className="text-lg text-gray-600 mb-12 max-w-md mx-auto">
          Our advanced algorithms are analyzing your roof and calculating precise costs. This should take less than 30 seconds.
        </p>

        {/* Progress Steps */}
        <div className="max-w-md mx-auto space-y-4">
          {GENERATION_STEPS.map((step, index) => (
            <div
              key={step}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                index === currentStep
                  ? 'bg-blue-50 border border-blue-200'
                  : index < currentStep
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50'
              }`}
            >
              <div className={`flex-shrink-0 ${
                index < currentStep ? 'text-green-600' :
                index === currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {index < currentStep ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : index === currentStep ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-current"></div>
                )}
              </div>
              <span className={`text-sm font-medium ${
                index === currentStep ? 'text-blue-900' :
                index < currentStep ? 'text-green-900' : 'text-gray-600'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Fun Facts */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Did You Know?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">🛰️</div>
              <div className="font-medium">Satellite Precision</div>
              <div>Our measurements are accurate within 5% of manual calculations</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">⚡</div>
              <div className="font-medium">Instant Analysis</div>
              <div>What used to take days now happens in seconds</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">🏆</div>
              <div className="font-medium">Professional Quality</div>
              <div>Every estimate meets industry standards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface EstimateCompleteProps {
  estimate: EstimateResult;
  pdfUrl: string;
  emailSent: boolean;
  onStartOver: () => void;
}

function EstimateComplete({ estimate, pdfUrl, emailSent, onStartOver }: EstimateCompleteProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Estimate Is Ready! 🎉
        </h2>
        
        <p className="text-lg text-gray-600 mb-6">
          We've sent a detailed PDF estimate to <strong>{estimate.contactInfo.email}</strong>
        </p>
        
        {emailSent && (
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Email delivered successfully</span>
          </div>
        )}
      </div>

      {/* Estimate Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">
            {formatCurrency(estimate.totalCost)}
          </div>
          <div className="text-blue-100 text-lg mb-4">
            Total Project Cost • {formatCurrency(estimate.costPerSqft)}/sq ft
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-blue-500">
            <div>
              <div className="text-2xl font-bold">{estimate.roofArea.toLocaleString()}</div>
              <div className="text-blue-200 text-sm">Square Feet</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{estimate.selectedMaterial.warranty}</div>
              <div className="text-blue-200 text-sm">Warranty</div>
            </div>
            <div>
              <div className="text-2xl font-bold">30 Days</div>
              <div className="text-blue-200 text-sm">Valid Until</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
          <div className="space-y-3">
            <CostRow label="Materials" amount={estimate.materialCosts.total} />
            <CostRow label="Labor & Installation" amount={estimate.laborCosts.total} />
            <CostRow label="Additional Services" amount={estimate.additionalCosts.total} />
            <div className="border-t border-gray-200 pt-3">
              <CostRow label="Subtotal" amount={estimate.subtotal} />
              <CostRow label="Sales Tax" amount={estimate.salesTax} />
              {estimate.urgencyAdjustment > 0 && (
                <CostRow label="Urgency Premium" amount={estimate.urgencyAdjustment} />
              )}
            </div>
            <div className="border-t-2 border-gray-300 pt-3">
              <CostRow 
                label="Total Cost" 
                amount={estimate.totalCost} 
                isTotal={true}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Selected Material</h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              {estimate.selectedMaterial.name}
            </h4>
            <p className="text-gray-600 mb-4">
              Category: {estimate.selectedMaterial.category}
            </p>
            <div className="bg-green-100 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800 font-medium">
                  {estimate.selectedMaterial.warranty} Warranty Included
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">What Happens Next?</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
            <div>
              <div className="font-medium text-blue-900">Review Your Estimate</div>
              <div className="text-blue-700">Check the detailed PDF we sent to your email</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
            <div>
              <div className="font-medium text-blue-900">Schedule Consultation</div>
              <div className="text-blue-700">Call us for a free in-person site visit</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
            <div>
              <div className="font-medium text-blue-900">Begin Your Project</div>
              <div className="text-blue-700">Professional installation by licensed experts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="tel:+17195550123"
          className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>Call Now: (719) 555-0123</span>
        </a>
        
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            <span>Download PDF</span>
          </a>
        )}
        
        <button
          onClick={onStartOver}
          className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>New Estimate</span>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          This estimate is valid for 30 days. Final pricing may vary based on actual site conditions and material availability.
          <br />
          Alpine Peak Roofing is licensed, bonded, and insured. License #12345.
        </p>
      </div>
    </div>
  );
}

interface CostRowProps {
  label: string;
  amount: number;
  isTotal?: boolean;
}

function CostRow({ label, amount, isTotal = false }: CostRowProps) {
  return (
    <div className={`flex justify-between items-center ${
      isTotal ? 'text-lg font-bold text-gray-900' : 'text-gray-700'
    }`}>
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </div>
  );
}