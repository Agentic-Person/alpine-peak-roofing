'use client'

import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'

// Safe hook that won't throw if provider is not available
function useSafeTheme() {
  try {
    return useTheme()
  } catch {
    return {
      theme: 'light' as const,
      setTheme: () => {},
      actualTheme: 'light' as const
    }
  }
}

export function FloatingThemeToggle() {
  const { theme, setTheme, actualTheme } = useSafeTheme()

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-5 w-5" />
    }
    return actualTheme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
  }

  const getTooltip = () => {
    const nextMode = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    return `Switch to ${nextMode} mode`
  }

  return (
    <button
      onClick={cycleTheme}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full shadow-lg
        bg-interactive-primary hover:bg-interactive-primary-hover 
        text-white
        flex items-center justify-center
        transition-all duration-300 hover:scale-110
        border-2 border-white/20
        backdrop-blur-sm
        group
        animate-bounce-gentle
      `}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
      
      {/* Tooltip */}
      <div className={`
        absolute bottom-full right-0 mb-2
        bg-background-inverse text-text-inverse
        px-3 py-2 rounded-lg text-sm font-medium
        whitespace-nowrap
        opacity-0 group-hover:opacity-100
        transform translate-y-2 group-hover:translate-y-0
        transition-all duration-200
        pointer-events-none
        border border-border-primary
        shadow-lg
      `}>
        {getTooltip()}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background-inverse"></div>
      </div>
    </button>
  )
}