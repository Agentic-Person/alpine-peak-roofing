'use client';

import { useState, useCallback } from 'react';
import { useEstimatorStore, type ContactInfo } from '../../store/useEstimatorStore';

interface ContactStepProps {
  contactInfo: ContactInfo;
  onNext: () => void;
  onBack: () => void;
}

export function ContactStep({ contactInfo, onNext, onBack }: ContactStepProps) {
  const { setContactInfo, setError } = useEstimatorStore();
  
  const [formData, setFormData] = useState<ContactInfo>(contactInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<ContactInfo>>({});

  const updateField = (field: keyof ContactInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = useCallback((): boolean => {
    const errors: Partial<ContactInfo> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\(?[\d\s\-\(\)\+]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return digits;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    updateField('phone', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Store contact information
      setContactInfo(formData);
      
      // Proceed to results
      onNext();
    } catch (error) {
      console.error('Error saving contact info:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timelineOptions = [
    { value: 'urgent', label: 'ASAP - Urgent repairs needed', icon: '🚨' },
    { value: 'soon', label: 'Within 3 months', icon: '📅' },
    { value: 'planning', label: '6+ months - Just planning ahead', icon: '📋' },
    { value: 'comparing', label: 'Getting multiple quotes to compare', icon: '🔍' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Almost There!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Just a few details and we'll send your professional estimate right to your inbox. 
          No spam, no surprise calls – just your detailed roofing estimate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                validationErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="John"
              disabled={isSubmitting}
            />
            {validationErrors.firstName && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.firstName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                validationErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Smith"
              disabled={isSubmitting}
            />
            {validationErrors.lastName && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
          {validationErrors.email && (
            <p className="text-red-600 text-sm mt-1">{validationErrors.email}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            We'll send your detailed PDF estimate to this email address
          </p>
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              validationErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="(719) 555-0123"
            disabled={isSubmitting}
          />
          {validationErrors.phone && (
            <p className="text-red-600 text-sm mt-1">{validationErrors.phone}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Optional: for follow-up questions about your project
          </p>
        </div>

        {/* Project Timeline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Project Timeline
          </label>
          <div className="space-y-3">
            {timelineOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.projectTimeline === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={option.value}
                  checked={formData.projectTimeline === option.value}
                  onChange={(e) => updateField('projectTimeline', e.target.value as ContactInfo['projectTimeline'])}
                  className="sr-only"
                  disabled={isSubmitting}
                />
                <span className="text-2xl mr-3">{option.icon}</span>
                <span className={`font-medium ${
                  formData.projectTimeline === option.value ? 'text-blue-900' : 'text-gray-700'
                }`}>
                  {option.label}
                </span>
                {formData.projectTimeline === option.value && (
                  <svg className="w-5 h-5 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">
                Your Privacy Matters
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your information is secure and encrypted</li>
                <li>• We'll only contact you about your roofing project</li>
                <li>• No spam, no third-party sharing</li>
                <li>• Unsubscribe anytime</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-3"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Generating Your Estimate...</span>
            </>
          ) : (
            <>
              <span>Get My Professional Estimate</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500">
          By continuing, you agree to receive your estimate and occasional updates about Alpine Peak Roofing services.
        </p>
      </form>

      {/* Back Button */}
      <div className="flex justify-center mt-8 pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center space-x-2 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Materials</span>
        </button>
      </div>
    </div>
  );
}