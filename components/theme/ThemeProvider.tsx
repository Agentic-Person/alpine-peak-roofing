'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark' // The resolved theme (no 'system')
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Get the actual resolved theme
  const getActualTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('alpine-theme') as Theme | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    const initialTheme = savedTheme || defaultTheme
    setTheme(initialTheme)
    
    const resolvedTheme = initialTheme === 'system' ? systemTheme : initialTheme
    setActualTheme(resolvedTheme)
    
    setMounted(true)
  }, [defaultTheme])

  // Update actualTheme when theme changes
  useEffect(() => {
    if (!mounted) return
    
    const resolvedTheme = getActualTheme()
    setActualTheme(resolvedTheme)
    
    // Apply theme to document
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
    
    // Save to localStorage
    localStorage.setItem('alpine-theme', theme)
  }, [theme, mounted])

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setActualTheme(e.matches ? 'dark' : 'light')
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, mounted])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="animate-pulse">
        {children}
      </div>
    )
  }

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    actualTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}