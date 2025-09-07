# UI Implementation Guide - Roof Estimator

## 🎨 Overview
This document outlines the user interface components and user experience flow for the Alpine Peak Roofing roof estimator. The UI will provide an intuitive, mobile-first experience that guides users through the estimation process.

## 🎯 User Experience Flow

### 1. Entry Point Flow
```
Landing Page → "Get Free Estimate" CTA
     ↓
Estimator Page (/estimator)
     ↓
Address Input & Validation
     ↓
Property Confirmation (Satellite Image)
     ↓
Material Selection
     ↓
Contact Information
     ↓
Instant Estimate Generation
     ↓
PDF Delivery & Lead Capture
```

### 2. Mobile-First Design Principles
- Touch-friendly interface with 44px minimum tap targets
- Progressive disclosure to avoid overwhelming users
- Clear progress indicators throughout the flow
- Optimized for one-handed operation
- Fast loading with skeleton screens

## 🏗️ Component Architecture

### 1. Main Estimator Layout
```typescript
// app/estimator/page.tsx
export default function EstimatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <EstimatorHeader />
      <main className="container mx-auto px-4 py-8">
        <EstimatorWizard />
      </main>
      <EstimatorFooter />
    </div>
  );
}
```

### 2. Wizard Component Structure
```typescript
// components/estimator/EstimatorWizard.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  'address',
  'confirmation', 
  'materials',
  'contact',
  'results'
] as const;

export function EstimatorWizard() {
  const [currentStep, setCurrentStep] = useState<typeof STEPS[number]>('address');
  const [estimateData, setEstimateData] = useState<EstimateData>({});

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressIndicator steps={STEPS} currentStep={currentStep} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

### 3. Step Components

#### Step 1: Address Input
```typescript
// components/estimator/steps/AddressStep.tsx
export function AddressStep({ onNext, onDataChange }: StepProps) {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Get Your Free Roof Estimate
        </h1>
        <p className="text-lg text-gray-600">
          Enter your address to get an instant, accurate roofing estimate using satellite imagery
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Address
        </label>
        
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your full address..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            autoComplete="street-address"
          />
          
          {isLoading && (
            <div className="absolute right-3 top-3">
              <LoadingSpinner size="sm" />
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <AddressSuggestions
            suggestions={suggestions}
            onSelect={handleAddressSelect}
          />
        )}

        <button
          onClick={handleNext}
          disabled={!isValidAddress}
          className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Continue to Property Confirmation
        </button>
      </div>
    </div>
  );
}
```

#### Step 2: Property Confirmation
```typescript
// components/estimator/steps/ConfirmationStep.tsx
export function ConfirmationStep({ address, onNext, onBack }: StepProps) {
  const [satelliteImage, setSatelliteImage] = useState<string>('');
  const [roofOutline, setRoofOutline] = useState<Coordinate[]>([]);
  const [measurements, setMeasurements] = useState<RoofMeasurements | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    analyzeProperty();
  }, [address]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Confirm Your Property
        </h2>
        <p className="text-gray-600">
          Please verify this is the correct property and roof area
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Satellite Image with Roof Outline */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
            {isAnalyzing ? (
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-gray-600">Analyzing roof structure...</p>
                </div>
              </div>
            ) : (
              <img
                src={satelliteImage}
                alt="Property satellite view"
                className="w-full h-auto"
              />
            )}
            
            {roofOutline.length > 0 && (
              <RoofOverlay coordinates={roofOutline} />
            )}
          </div>

          <div className="text-sm text-gray-500 text-center">
            Satellite imagery with detected roof area highlighted
          </div>
        </div>

        {/* Measurements Summary */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detected Measurements
            </h3>
            
            {measurements ? (
              <div className="space-y-3">
                <MeasurementRow
                  label="Roof Area"
                  value={`${measurements.area.toLocaleString()} sq ft`}
                  icon={<SquareIcon />}
                />
                <MeasurementRow
                  label="Roof Pitch"
                  value={measurements.slope.pitchRatio}
                  icon={<TriangleIcon />}
                />
                <MeasurementRow
                  label="Ridge Length"
                  value={`${Math.round(measurements.features.ridgeLength)} ft`}
                  icon={<LineIcon />}
                />
                <MeasurementRow
                  label="Complexity"
                  value={measurements.features.complexity > 1.5 ? 'Complex' : 'Standard'}
                  icon={<LayersIcon />}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center text-sm text-gray-500">
            Don't see your roof correctly outlined?{' '}
            <button className="text-blue-600 hover:underline">
              Report an issue
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Address
        </button>
        
        <button
          onClick={onNext}
          disabled={!measurements}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Continue to Material Selection →
        </button>
      </div>
    </div>
  );
}
```

#### Step 3: Material Selection
```typescript
// components/estimator/steps/MaterialsStep.tsx
export function MaterialsStep({ measurements, onNext, onBack, onDataChange }: StepProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [estimates, setEstimates] = useState<Record<string, number>>({});

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Your Roofing Material
        </h2>
        <p className="text-gray-600">
          Select the material that best fits your needs and budget
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Shingle Options */}
        <MaterialCategory
          title="Asphalt Shingles"
          description="Most popular and cost-effective option"
          materials={[
            {
              id: 'architectural-25',
              name: '25-Year Architectural',
              price: estimates['architectural-25'],
              features: ['25-year warranty', 'Wind resistant', 'Multiple colors'],
              image: '/images/shingles-25yr.jpg'
            },
            {
              id: 'architectural-30',
              name: '30-Year Architectural', 
              price: estimates['architectural-30'],
              features: ['30-year warranty', 'Enhanced durability', 'Premium appearance'],
              image: '/images/shingles-30yr.jpg',
              popular: true
            },
            {
              id: 'lifetime-premium',
              name: 'Lifetime Premium',
              price: estimates['lifetime-premium'], 
              features: ['Lifetime warranty', 'Maximum protection', 'Designer colors'],
              image: '/images/shingles-lifetime.jpg'
            }
          ]}
          selectedId={selectedMaterial}
          onSelect={setSelectedMaterial}
        />

        {/* Metal Options */}
        <MaterialCategory
          title="Metal Roofing"
          description="Long-lasting and energy efficient"
          materials={[
            {
              id: 'corrugated-metal',
              name: 'Corrugated Steel',
              price: estimates['corrugated-metal'],
              features: ['25-year warranty', 'Energy efficient', 'Low maintenance'],
              image: '/images/metal-corrugated.jpg'
            },
            {
              id: 'standing-seam-steel',
              name: 'Standing Seam Steel',
              price: estimates['standing-seam-steel'],
              features: ['40-year warranty', 'Concealed fasteners', 'Premium appearance'],
              image: '/images/metal-standing-seam.jpg'
            }
          ]}
          selectedId={selectedMaterial}
          onSelect={setSelectedMaterial}
        />
      </div>

      {/* Selected Material Summary */}
      {selectedMaterial && (
        <EstimatePreview
          material={selectedMaterial}
          area={measurements.area}
          totalCost={estimates[selectedMaterial]}
          costPerSqft={estimates[selectedMaterial] / measurements.area}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Confirmation
        </button>
        
        <button
          onClick={onNext}
          disabled={!selectedMaterial}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Get My Estimate →
        </button>
      </div>
    </div>
  );
}
```

#### Step 4: Contact Information
```typescript
// components/estimator/steps/ContactStep.tsx
export function ContactStep({ onNext, onBack, onDataChange }: StepProps) {
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectTimeline: 'planning'
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Almost There!
        </h2>
        <p className="text-gray-600">
          Enter your contact information to receive your detailed estimate
        </p>
      </div>

      <form className="max-w-md mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={contactInfo.firstName}
              onChange={(e) => updateContactInfo('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={contactInfo.lastName}
              onChange={(e) => updateContactInfo('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => updateContactInfo('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => updateContactInfo('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Timeline
          </label>
          <select
            value={contactInfo.projectTimeline}
            onChange={(e) => updateContactInfo('projectTimeline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="urgent">ASAP - Urgent repairs needed</option>
            <option value="soon">Within 3 months</option>
            <option value="planning">6+ months - Just planning</option>
            <option value="comparing">Getting multiple quotes</option>
          </select>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p className="mb-2">
          ✓ Your information is secure and will only be used to provide your estimate
        </p>
        <p>
          ✓ No spam - we'll only contact you about your roofing project
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Materials
        </button>
        
        <button
          onClick={onNext}
          disabled={!isValidContactInfo(contactInfo)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Generate My Estimate →
        </button>
      </div>
    </div>
  );
}
```

#### Step 5: Results & PDF Generation
```typescript
// components/estimator/steps/ResultsStep.tsx
export function ResultsStep({ estimateData }: StepProps) {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    generateEstimate();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {isGenerating ? (
        <EstimateGenerating />
      ) : (
        <EstimateComplete
          estimateData={estimateData}
          pdfUrl={pdfUrl}
          emailSent={emailSent}
        />
      )}
    </div>
  );
}

function EstimateGenerating() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    'Analyzing satellite imagery...',
    'Calculating material requirements...',
    'Generating detailed estimate...',
    'Preparing PDF document...',
    'Sending to your email...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-12">
      <div className="mb-8">
        <LoadingSpinner size="xl" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Generating Your Estimate
      </h2>
      
      <p className="text-lg text-gray-600 mb-8">
        This should take less than 30 seconds...
      </p>

      <div className="max-w-md mx-auto">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex items-center mb-3 ${
              index === currentStep ? 'text-blue-600' : 
              index < currentStep ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            {index < currentStep ? (
              <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
            ) : index === currentStep ? (
              <LoadingSpinner size="sm" className="mr-3" />
            ) : (
              <div className="w-5 h-5 mr-3 rounded-full border-2 border-gray-300 flex-shrink-0" />
            )}
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4. Shared UI Components

#### Progress Indicator
```typescript
// components/estimator/ProgressIndicator.tsx
interface ProgressIndicatorProps {
  steps: readonly string[];
  currentStep: string;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between text-sm">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`text-center ${
              index <= currentIndex ? 'text-blue-600 font-medium' : 'text-gray-400'
            }`}
          >
            <div className="capitalize">{step.replace(/([A-Z])/g, ' $1').trim()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Material Card
```typescript
// components/estimator/MaterialCard.tsx
interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onSelect: (id: string) => void;
  estimatedCost?: number;
}

export function MaterialCard({ material, isSelected, onSelect, estimatedCost }: MaterialCardProps) {
  return (
    <div
      onClick={() => onSelect(material.id)}
      className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {material.popular && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          POPULAR
        </div>
      )}

      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-semibold text-lg mb-2">{material.name}</h3>
      
      {estimatedCost && (
        <div className="text-2xl font-bold text-blue-600 mb-3">
          ${estimatedCost.toLocaleString()}
        </div>
      )}

      <ul className="space-y-1 mb-4">
        {material.features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-gray-600">
            <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <div className={`w-full py-2 px-4 rounded-lg text-center font-medium transition-colors ${
        isSelected
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}>
        {isSelected ? 'Selected' : 'Select This Option'}
      </div>
    </div>
  );
}
```

## 📱 Responsive Design Considerations

### 1. Mobile Layout Adjustments
```css
/* globals.css - Mobile optimizations */
@media (max-width: 768px) {
  .estimator-step {
    padding: 1rem;
    margin: 0 -1rem;
  }
  
  .material-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .measurement-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
```

### 2. Touch Interactions
- Minimum 44px tap targets
- Swipe gestures for step navigation
- Pull-to-refresh on results page
- Haptic feedback for form validation

### 3. Performance Optimizations
```typescript
// Lazy load heavy components
const MaterialsStep = lazy(() => import('./steps/MaterialsStep'));
const ConfirmationStep = lazy(() => import('./steps/ConfirmationStep'));

// Preload critical images
const preloadImages = [
  '/images/shingles-30yr.jpg',
  '/images/metal-standing-seam.jpg'
];
```

## 🚀 Integration Points

### 1. API Connections
```typescript
// lib/api/estimator.ts
export class EstimatorAPI {
  static async validateAddress(address: string): Promise<AddressValidation> {
    // Call Google Places API via n8n workflow
  }
  
  static async analyzeRoof(coordinates: Coordinates): Promise<RoofAnalysis> {
    // Trigger roof measurement workflow
  }
  
  static async calculateEstimate(data: EstimateRequest): Promise<EstimateResult> {
    // Call estimate calculation workflow
  }
  
  static async generatePDF(estimateId: string): Promise<{ pdfUrl: string }> {
    // Trigger PDF generation workflow
  }
}
```

### 2. State Management
```typescript
// store/estimator.ts - Zustand store
interface EstimatorState {
  currentStep: string;
  address: string;
  measurements: RoofMeasurements | null;
  selectedMaterial: string;
  contactInfo: ContactInfo;
  estimate: EstimateResult | null;
  
  // Actions
  setStep: (step: string) => void;
  setAddress: (address: string) => void;
  setMeasurements: (measurements: RoofMeasurements) => void;
  setSelectedMaterial: (materialId: string) => void;
  setContactInfo: (info: ContactInfo) => void;
  setEstimate: (estimate: EstimateResult) => void;
  reset: () => void;
}
```

---

**Document Version:** 1.0  
**Last Updated:** September 7, 2025  
**Next Review:** Before UI development begins