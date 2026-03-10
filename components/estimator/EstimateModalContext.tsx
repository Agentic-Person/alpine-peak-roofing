'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface EstimateModalCtx {
  isOpen: boolean
  open: () => void
  close: () => void
}

const EstimateModalContext = createContext<EstimateModalCtx>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function EstimateModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <EstimateModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </EstimateModalContext.Provider>
  )
}

export function useEstimateModal() {
  return useContext(EstimateModalContext)
}
