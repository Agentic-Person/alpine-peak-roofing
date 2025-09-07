'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRightIcon, CheckIcon, PhoneIcon, MailIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ContactFormData {
  // Step 1: Project Interest
  projectType: string
  urgency: string
  propertyType: string
  
  // Step 2: Project Details (conditional)
  currentRoofAge?: number
  issues?: string[]
  propertySize?: string
  timeframe?: string
  budgetRange?: string
  
  // Step 3: Contact Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  preferredContact: string
  bestTimeToCall?: string
}

interface ContactFormProps {
  variant?: 'inline' | 'popup' | 'fullpage'
  source?: string
  campaign?: string
  onSubmit?: (data: ContactFormData) => void
  onStepChange?: (step: number) => void
}

const STEP_TITLES = [
  'Project Interest',
  'Project Details', 
  'Contact Information'
]

const PROJECT_TYPES = [
  { value: 'roof-repair', label: 'Roof Repair', description: 'Fix specific issues or damage' },
  { value: 'roof-replacement', label: 'Roof Replacement', description: 'Complete roof replacement' },
  { value: 'storm-damage', label: 'Storm Damage', description: 'Insurance claim assistance' },
  { value: 'inspection', label: 'Roof Inspection', description: 'Professional assessment' },
  { value: 'new-construction', label: 'New Construction', description: 'New building project' },
  { value: 'other', label: 'Other', description: 'Tell us about your needs' }
]

const URGENCY_OPTIONS = [
  { value: 'immediate', label: 'Immediate', description: 'Emergency situation', color: 'text-red-600' },
  { value: 'within-month', label: 'Within a Month', description: 'Soon but not urgent', color: 'text-orange-600' },
  { value: 'within-quarter', label: 'Within 3 Months', description: 'Planning ahead', color: 'text-blue-600' },
  { value: 'planning-ahead', label: 'Just Planning', description: 'Researching options', color: 'text-gray-600' }
]

const BUDGET_RANGES = [
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-plus', label: '$50,000+' },
  { value: 'need-estimate', label: 'Need Professional Estimate' }
]

const ROOF_ISSUES = [
  'Leaking',
  'Missing or damaged shingles',
  'Sagging',
  'Ice dams',
  'Poor ventilation',
  'Age-related wear',
  'Storm damage',
  'Gutter issues'
]

export default function ContactForm({ 
  variant = 'inline', 
  source = 'contact-form',
  campaign = '',
  onSubmit,
  onStepChange 
}: ContactFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ContactFormData>({
    projectType: '',
    urgency: '',
    propertyType: 'residential',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    preferredContact: 'phone'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  // Track form engagement for lead scoring
  const [startTime] = useState(Date.now())
  const [fieldFocusTime, setFieldFocusTime] = useState<Record<string, number>>({})

  useEffect(() => {
    onStepChange?.(currentStep)
  }, [currentStep, onStepChange])

  const handleFieldFocus = (fieldName: string) => {
    setFieldFocusTime(prev => ({
      ...prev,
      [fieldName]: Date.now()
    }))
  }

  const handleFieldBlur = (fieldName: string) => {
    setFieldFocusTime(prev => {
      const focusStart = prev[fieldName]
      if (focusStart) {
        const focusTime = Date.now() - focusStart
        // Track field focus time for lead scoring
        return {
          ...prev,
          [`${fieldName}_duration`]: focusTime
        }
      }
      return prev
    })
    
    setTouchedFields(prev => new Set([...prev, fieldName]))
  }

  const updateFormData = (updates: Partial<ContactFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.projectType) newErrors.projectType = 'Please select a project type'
        if (!formData.urgency) newErrors.urgency = 'Please select urgency level'
        if (!formData.propertyType) newErrors.propertyType = 'Please select property type'
        break
      
      case 2:
        // Step 2 is optional and conditional
        break
        
      case 3:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email'
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        if (!formData.address.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const submitForm = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)
    
    try {
      // Calculate form engagement metrics for lead scoring
      const completionTime = Date.now() - startTime
      const completedFields = Object.values(formData).filter(Boolean).length
      const totalFields = Object.keys(formData).length
      const completionRate = completedFields / totalFields

      // Prepare lead data with scoring information
      const leadData = {
        ...formData,
        source: {
          channel: source,
          campaign,
          referrer: document.referrer || '',
          utmSource: new URLSearchParams(window.location.search).get('utm_source') || '',
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
        },
        formInteractions: {
          completionRate,
          fieldFocusTimeSeconds: completionTime / 1000,
          progressiveSteps: 3
        },
        websiteEngagement: {
          pagesVisited: 1, // Could be enhanced with analytics
          timeOnSiteMinutes: completionTime / (1000 * 60),
          returnVisits: 0 // Could be enhanced with analytics
        }
      }

      // Submit to lead scoring engine
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      
      // Call parent onSubmit handler
      onSubmit?.(formData)
      
      // Show success message or redirect
      setCurrentStep(4) // Success step
      
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: 'Failed to submit form. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What type of roofing project do you need?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateFormData({ projectType: type.value })}
              className={`p-4 text-left border rounded-lg transition-all ${
                formData.projectType === type.value
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium text-gray-900">{type.label}</div>
              <div className="text-sm text-gray-600">{type.description}</div>
            </button>
          ))}
        </div>
        {errors.projectType && (
          <p className="mt-2 text-sm text-red-600">{errors.projectType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How urgent is your project?
        </label>
        <div className="space-y-2">
          {URGENCY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateFormData({ urgency: option.value })}
              className={`w-full p-3 text-left border rounded-lg transition-all ${
                formData.urgency === option.value
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className={`font-medium ${option.color}`}>{option.label}</div>
              <div className="text-sm text-gray-600">{option.description}</div>
            </button>
          ))}
        </div>
        {errors.urgency && (
          <p className="mt-2 text-sm text-red-600">{errors.urgency}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Property Type
        </label>
        <div className="flex space-x-4">
          {[
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' },
            { value: 'multi-family', label: 'Multi-Family' }
          ].map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateFormData({ propertyType: type.value })}
              className={`flex-1 p-3 text-center border rounded-lg transition-all ${
                formData.propertyType === type.value
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current roof age (optional)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="Years"
          value={formData.currentRoofAge || ''}
          onChange={(e) => updateFormData({ currentRoofAge: parseInt(e.target.value) || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What issues are you experiencing? (select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ROOF_ISSUES.map((issue) => (
            <label key={issue} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.issues?.includes(issue) || false}
                onChange={(e) => {
                  const issues = formData.issues || []
                  if (e.target.checked) {
                    updateFormData({ issues: [...issues, issue] })
                  } else {
                    updateFormData({ issues: issues.filter(i => i !== issue) })
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{issue}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Budget Range (optional)
        </label>
        <div className="space-y-2">
          {BUDGET_RANGES.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() => updateFormData({ budgetRange: range.value })}
              className={`w-full p-3 text-left border rounded-lg transition-all ${
                formData.budgetRange === range.value
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            onFocus={() => handleFieldFocus('firstName')}
            onBlur={() => handleFieldBlur('firstName')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            onFocus={() => handleFieldFocus('lastName')}
            onBlur={() => handleFieldBlur('lastName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          onFocus={() => handleFieldFocus('email')}
          onBlur={() => handleFieldBlur('email')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          onFocus={() => handleFieldFocus('phone')}
          onBlur={() => handleFieldBlur('phone')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            value={formData.address.street}
            onChange={(e) => updateFormData({ 
              address: { ...formData.address, street: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={formData.address.city}
            onChange={(e) => updateFormData({ 
              address: { ...formData.address, city: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code *
          </label>
          <input
            type="text"
            required
            value={formData.address.zipCode}
            onChange={(e) => updateFormData({ 
              address: { ...formData.address, zipCode: e.target.value }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Contact Method
        </label>
        <div className="flex space-x-4">
          {[
            { value: 'phone', label: 'Phone Call', icon: PhoneIcon },
            { value: 'email', label: 'Email', icon: MailIcon },
            { value: 'text', label: 'Text Message', icon: ClockIcon }
          ].map((method) => (
            <button
              key={method.value}
              type="button"
              onClick={() => updateFormData({ preferredContact: method.value })}
              className={`flex-1 p-3 flex items-center justify-center space-x-2 border rounded-lg transition-all ${
                formData.preferredContact === method.value
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <method.icon className="h-5 w-5" />
              <span>{method.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const renderSuccessStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <CheckIcon className="h-8 w-8 text-green-600" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">Thank You!</h3>
        <p className="mt-2 text-sm text-gray-600">
          We've received your request and will contact you within{' '}
          {formData.urgency === 'immediate' ? '15 minutes' : 
           formData.urgency === 'within-month' ? '2 hours' : '24 hours'}.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Request ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </p>
      </div>
    </motion.div>
  )

  return (
    <div className={`${variant === 'popup' ? 'max-w-lg' : 'max-w-2xl'} mx-auto`}>
      {currentStep <= 3 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Get Your Free Roofing Quote
            </h2>
            <div className="text-sm text-gray-500">
              Step {currentStep} of 3
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2">
            {STEP_TITLES.map((title, index) => (
              <div 
                key={title}
                className={`text-xs ${
                  index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {title}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <AnimatePresence mode="wait">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderSuccessStep()}
        </AnimatePresence>

        {currentStep <= 3 && (
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 disabled:text-gray-400 hover:text-gray-800 transition-colors"
            >
              {currentStep > 1 ? 'Back' : ''}
            </button>

            <div className="flex space-x-3">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>Continue</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitForm}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Get My Free Quote</span>
                      <CheckIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {errors.submit && (
          <p className="mt-4 text-sm text-red-600 text-center">{errors.submit}</p>
        )}
      </div>

      {/* Trust Signals */}
      {variant !== 'popup' && (
        <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <CheckIcon className="h-4 w-4 text-green-500" />
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckIcon className="h-4 w-4 text-green-500" />
            <span>Free Estimates</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckIcon className="h-4 w-4 text-green-500" />
            <span>25+ Years Experience</span>
          </div>
        </div>
      )}
    </div>
  )
}