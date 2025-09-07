'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEstimatorStore } from '../store/useEstimatorStore';
import { ProgressIndicator } from './shared/ProgressIndicator';
import { AddressStep } from './steps/AddressStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { MaterialsStep } from './steps/MaterialsStep';
import { ContactStep } from './steps/ContactStep';
import { ResultsStep } from './steps/ResultsStep';

const STEPS = [
  'address',
  'confirmation', 
  'materials',
  'contact',
  'results'
] as const;

type StepType = typeof STEPS[number];

export function EstimatorWizard() {
  const { 
    currentStep, 
    setStep, 
    address,
    measurements,
    selectedMaterial,
    contactInfo,
    estimate,
    reset
  } = useEstimatorStore();

  const handleStepChange = useCallback((step: StepType) => {
    setStep(step);
  }, [setStep]);

  const handleNext = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setStep(STEPS[currentIndex + 1]);
    }
  }, [currentStep, setStep]);

  const handleBack = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1]);
    }
  }, [currentStep, setStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'address':
        return <AddressStep onNext={handleNext} />;
      
      case 'confirmation':
        return (
          <ConfirmationStep 
            address={address}
            measurements={measurements}
            onNext={handleNext} 
            onBack={handleBack}
          />
        );
      
      case 'materials':
        return (
          <MaterialsStep 
            measurements={measurements}
            selectedMaterial={selectedMaterial}
            onNext={handleNext} 
            onBack={handleBack}
          />
        );
      
      case 'contact':
        return (
          <ContactStep 
            contactInfo={contactInfo}
            onNext={handleNext} 
            onBack={handleBack}
          />
        );
      
      case 'results':
        return (
          <ResultsStep 
            estimate={estimate}
            onStartOver={() => {
              reset();
              setStep('address');
            }}
          />
        );
      
      default:
        return <AddressStep onNext={handleNext} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <ProgressIndicator 
        steps={STEPS} 
        currentStep={currentStep} 
      />
      
      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="mt-8"
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}