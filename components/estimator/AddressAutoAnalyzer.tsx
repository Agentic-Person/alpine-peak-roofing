'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useEstimatorStore } from '@/agents/roof-estimator-agent/store/useEstimatorStore'
import { analyzeRoof } from '@/agents/roof-estimator-agent/lib/api'

/**
 * Reads ?address= from the URL (set by the modal) and auto-triggers
 * roof analysis so the user lands directly on the confirmation step
 * where they can see their roof before providing contact info.
 */
export function AddressAutoAnalyzer() {
  const searchParams = useSearchParams()
  const ran = useRef(false)
  const {
    setAddress,
    setMeasurements,
    setLoading,
    setError,
    setStep,
    currentStep,
  } = useEstimatorStore()

  useEffect(() => {
    const addressParam = searchParams.get('address')
    if (!addressParam || ran.current) return
    // Only auto-analyze when we're on the initial address step
    if (currentStep !== 'address') return

    ran.current = true

    const run = async () => {
      setAddress(addressParam)
      setLoading('analyzing', true)
      setError(null)

      try {
        const response = await analyzeRoof(addressParam)
        if (response.success && response.measurements) {
          setMeasurements(response.measurements)
          setStep('confirmation')
        } else {
          setError(response.error || 'Failed to analyze roof. Please try entering the address manually.')
        }
      } catch {
        setError('Unable to analyze this address. Please try entering the address manually.')
      } finally {
        setLoading('analyzing', false)
      }
    }

    run()
  }, [searchParams, setAddress, setMeasurements, setLoading, setError, setStep, currentStep])

  return null
}
