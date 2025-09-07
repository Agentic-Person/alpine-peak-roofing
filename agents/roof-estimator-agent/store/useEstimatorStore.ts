import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Type definitions
export interface Coordinate {
  lat: number;
  lng: number;
}

export interface SlopeData {
  averagePitchDegrees: number;
  averageAzimuthDegrees: number;
  category: 'low' | 'standard' | 'steep';
  pitchRatio: string;
}

export interface RoofFeatures {
  segmentCount: number;
  ridgeLengthFt: number;
  valleyLengthFt: number;
  eaveLength: number;
  rakeLength: number;
  complexityMultiplier: number;
}

export interface RoofMeasurements {
  address: string;
  coordinates: Coordinate;
  boundingBox: any;
  roofAreaSqFt: number;
  roofAreaSqMeters: number;
  slope: SlopeData;
  features: RoofFeatures;
  imageryQuality: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceScore: number;
  sunshineQuantiles: number[];
  roofSegments: any[];
  processedAt: string;
  validation?: {
    isValid: boolean;
    warnings: string[];
    errors: string[];
  };
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectTimeline: 'urgent' | 'soon' | 'planning' | 'comparing';
}

export interface MaterialInfo {
  id: string;
  name: string;
  category: string;
  warranty: string;
}

export interface CostBreakdown {
  primary: number;
  underlayment: number;
  flashing: number;
  ridgeVent: number;
  accessories: number;
  total: number;
}

export interface EstimateResult {
  estimateId: string;
  measurementId: string;
  roofArea: number;
  selectedMaterial: MaterialInfo;
  materialCosts: CostBreakdown;
  laborCosts: CostBreakdown;
  additionalCosts: CostBreakdown;
  subtotal: number;
  salesTax: number;
  urgencyAdjustment: number;
  totalCost: number;
  costPerSqft: number;
  region: string;
  municipality: string;
  urgency: string;
  contactInfo: ContactInfo;
  validUntil: string;
  createdAt: string;
  validation?: {
    isValid: boolean;
    warnings: string[];
    errors: string[];
    qualityScore: number;
  };
}

// Estimator state interface
interface EstimatorState {
  // Current step
  currentStep: 'address' | 'confirmation' | 'materials' | 'contact' | 'results';
  
  // Step data
  address: string;
  measurements: RoofMeasurements | null;
  selectedMaterial: string;
  contactInfo: ContactInfo;
  estimate: EstimateResult | null;
  
  // Loading states
  isAnalyzing: boolean;
  isCalculating: boolean;
  isGeneratingPdf: boolean;
  
  // Error handling
  error: string | null;
  
  // Actions
  setStep: (step: EstimatorState['currentStep']) => void;
  setAddress: (address: string) => void;
  setMeasurements: (measurements: RoofMeasurements) => void;
  setSelectedMaterial: (materialId: string) => void;
  setContactInfo: (info: ContactInfo) => void;
  setEstimate: (estimate: EstimateResult) => void;
  setLoading: (type: 'analyzing' | 'calculating' | 'generating', loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

// Initial state
const initialState: Omit<EstimatorState, 'setStep' | 'setAddress' | 'setMeasurements' | 'setSelectedMaterial' | 'setContactInfo' | 'setEstimate' | 'setLoading' | 'setError' | 'reset'> = {
  currentStep: 'address',
  address: '',
  measurements: null,
  selectedMaterial: '',
  contactInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectTimeline: 'planning'
  },
  estimate: null,
  isAnalyzing: false,
  isCalculating: false,
  isGeneratingPdf: false,
  error: null,
};

export const useEstimatorStore = create<EstimatorState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      setStep: (step) => 
        set({ currentStep: step, error: null }, false, 'setStep'),
      
      setAddress: (address) => 
        set({ address, error: null }, false, 'setAddress'),
      
      setMeasurements: (measurements) => 
        set({ measurements, error: null }, false, 'setMeasurements'),
      
      setSelectedMaterial: (materialId) => 
        set({ selectedMaterial: materialId, error: null }, false, 'setSelectedMaterial'),
      
      setContactInfo: (info) => 
        set({ contactInfo: info, error: null }, false, 'setContactInfo'),
      
      setEstimate: (estimate) => 
        set({ estimate, error: null }, false, 'setEstimate'),
      
      setLoading: (type, loading) => {
        switch (type) {
          case 'analyzing':
            set({ isAnalyzing: loading }, false, 'setAnalyzing');
            break;
          case 'calculating':
            set({ isCalculating: loading }, false, 'setCalculating');
            break;
          case 'generating':
            set({ isGeneratingPdf: loading }, false, 'setGenerating');
            break;
        }
      },
      
      setError: (error) => 
        set({ error }, false, 'setError'),
      
      reset: () => 
        set(initialState, false, 'reset'),
    }),
    {
      name: 'estimator-store',
      // Don't persist sensitive data in localStorage
      partialize: (state) => ({
        currentStep: state.currentStep,
        address: state.address,
        selectedMaterial: state.selectedMaterial,
      }),
    }
  )
);

// Helper functions for store
export const useEstimatorActions = () => {
  const store = useEstimatorStore();
  return {
    setStep: store.setStep,
    setAddress: store.setAddress,
    setMeasurements: store.setMeasurements,
    setSelectedMaterial: store.setSelectedMaterial,
    setContactInfo: store.setContactInfo,
    setEstimate: store.setEstimate,
    setLoading: store.setLoading,
    setError: store.setError,
    reset: store.reset,
  };
};

export const useEstimatorData = () => {
  const store = useEstimatorStore();
  return {
    currentStep: store.currentStep,
    address: store.address,
    measurements: store.measurements,
    selectedMaterial: store.selectedMaterial,
    contactInfo: store.contactInfo,
    estimate: store.estimate,
    isAnalyzing: store.isAnalyzing,
    isCalculating: store.isCalculating,
    isGeneratingPdf: store.isGeneratingPdf,
    error: store.error,
  };
};