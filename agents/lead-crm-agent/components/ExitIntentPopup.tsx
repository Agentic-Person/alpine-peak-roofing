'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
  onSubmit: (data: QuickLeadData) => void
  variant?: 'weather-alert' | 'discount-offer' | 'guide-download' | 'consultation'
  weatherCondition?: 'storm-warning' | 'hail-damage' | 'wind-damage' | null
}

interface QuickLeadData {
  email: string
  firstName?: string
  phone?: string
  interest: string
  urgency: string
  zipCode?: string
}

const POPUP_VARIANTS = {
  'weather-alert': {
    title: 'Storm Damage Alert!',
    subtitle: 'Free Emergency Inspection Available',
    urgency: 'high',
    backgroundColor: 'bg-red-50',
    borderColor: 'border-red-200',
    accentColor: 'bg-red-600',
    icon: ExclamationTriangleIcon,
    iconColor: 'text-red-600',
    offers: [
      'Free storm damage inspection',
      'Insurance claim assistance',
      'Emergency repairs available',
      '24/7 emergency service'
    ],
    cta: 'Get Free Inspection',
    message: 'Weather reports show potential damage in your area. Get a professional assessment before issues worsen.'
  },
  'discount-offer': {
    title: 'Wait! Don\'t Leave Empty Handed',
    subtitle: 'Get 15% Off Your Roofing Project',
    urgency: 'medium',
    backgroundColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    accentColor: 'bg-blue-600',
    icon: ClockIcon,
    iconColor: 'text-blue-600',
    offers: [
      '15% discount on labor costs',
      'Free detailed estimate',
      'No obligation consultation',
      'Licensed & insured contractors'
    ],
    cta: 'Claim Your Discount',
    message: 'Limited time offer for new customers. Save hundreds on your roofing project.'
  },
  'guide-download': {
    title: 'Free Roofing Guide',
    subtitle: 'Complete Homeowner\'s Guide to Roof Replacement',
    urgency: 'low',
    backgroundColor: 'bg-green-50',
    borderColor: 'border-green-200',
    accentColor: 'bg-green-600',
    icon: ClockIcon,
    iconColor: 'text-green-600',
    offers: [
      'Step-by-step replacement process',
      'Material comparison guide',
      'Cost estimation worksheet',
      'Contractor selection checklist'
    ],
    cta: 'Download Free Guide',
    message: 'Get the complete guide trusted by thousands of homeowners.'
  },
  'consultation': {
    title: 'Get Expert Advice',
    subtitle: 'Free 30-Minute Roofing Consultation',
    urgency: 'medium',
    backgroundColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    accentColor: 'bg-purple-600',
    icon: ClockIcon,
    iconColor: 'text-purple-600',
    offers: [
      'Professional assessment',
      'Custom recommendations',
      'Budget planning assistance',
      'No sales pressure'
    ],
    cta: 'Schedule Consultation',
    message: 'Get personalized advice from our roofing experts.'
  }
}

const WEATHER_MESSAGES = {
  'storm-warning': 'Severe weather warning in your area. Protect your home with a free inspection.',
  'hail-damage': 'Recent hail reported in your area. Check for roof damage before it\'s too late.',
  'wind-damage': 'High winds detected. Ensure your roof is secure with a professional inspection.'
}

export default function ExitIntentPopup({ 
  isVisible, 
  onClose, 
  onSubmit,
  variant = 'discount-offer',
  weatherCondition = null
}: ExitIntentPopupProps) {
  const [formData, setFormData] = useState<QuickLeadData>({
    email: '',
    firstName: '',
    phone: '',
    interest: variant,
    urgency: POPUP_VARIANTS[variant].urgency,
    zipCode: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes for limited offers

  const config = POPUP_VARIANTS[variant]

  // Countdown timer for urgency
  useEffect(() => {
    if (!isVisible || config.urgency !== 'high') return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible, config.urgency])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (variant === 'weather-alert' && !formData.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required for weather alerts'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Prepare lead data with popup-specific information
      const leadData = {
        ...formData,
        source: {
          channel: 'exit-intent-popup',
          campaign: variant,
          weatherCondition,
          urgency: config.urgency,
          offer: config.subtitle
        },
        popupData: {
          variant,
          weatherCondition,
          timeToSubmit: 300 - timeRemaining,
          exitIntentTrigger: true
        },
        websiteEngagement: {
          exitIntent: true,
          timeOnPage: 300 - timeRemaining,
          popupInteraction: true
        }
      }

      // Submit to lead capture API
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      const result = await response.json()
      
      onSubmit(formData)
      
      // Show success state briefly before closing
      setTimeout(() => {
        onClose()
      }, 2000)

    } catch (error) {
      console.error('Popup form submission error:', error)
      setErrors({ submit: 'Failed to submit. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleBackgroundClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-md ${config.backgroundColor} ${config.borderColor} border-2 rounded-lg shadow-2xl overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`${config.accentColor} px-6 py-4 text-white relative`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              
              <div className="flex items-start space-x-3 pr-8">
                <config.icon className={`h-8 w-8 mt-1 ${config.iconColor} bg-white rounded-full p-1.5`} />
                <div>
                  <h2 className="text-xl font-bold">{config.title}</h2>
                  <p className="text-white/90 text-sm mt-1">{config.subtitle}</p>
                </div>
              </div>

              {/* Countdown Timer for High Urgency */}
              {config.urgency === 'high' && timeRemaining > 0 && (
                <div className="mt-3 text-center">
                  <div className="text-xs text-white/80">This offer expires in:</div>
                  <div className="text-2xl font-mono font-bold">
                    {formatTime(timeRemaining)}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {/* Weather Alert Message */}
              {variant === 'weather-alert' && weatherCondition && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <ExclamationTriangleIcon className="h-4 w-4 inline mr-1" />
                    {WEATHER_MESSAGES[weatherCondition]}
                  </p>
                </div>
              )}

              {/* Main Message */}
              <p className="text-gray-700 text-sm mb-4">{config.message}</p>

              {/* Benefits List */}
              <ul className="space-y-2 mb-6">
                {config.offers.map((offer, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className={`h-2 w-2 ${config.accentColor} rounded-full`} />
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {variant === 'weather-alert' && (
                  <div>
                    <input
                      type="text"
                      placeholder="ZIP code for weather check"
                      value={formData.zipCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-xs text-red-600">{errors.zipCode}</p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || (config.urgency === 'high' && timeRemaining === 0)}
                  className={`w-full ${config.accentColor} text-white py-3 px-4 rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : timeRemaining === 0 && config.urgency === 'high' ? (
                    'Offer Expired'
                  ) : (
                    config.cta
                  )}
                </button>

                {errors.submit && (
                  <p className="text-xs text-red-600 text-center">{errors.submit}</p>
                )}
              </form>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>🔒 100% Secure</span>
                  <span>📞 No Spam Calls</span>
                  <span>✅ Licensed & Insured</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}