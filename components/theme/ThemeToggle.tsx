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

interface ThemeToggleProps {
  variant?: 'button' | 'select'
  className?: string
}

export function ThemeToggle({ variant = 'button', className = '' }: ThemeToggleProps) {
  const { theme, setTheme, actualTheme } = useSafeTheme()

  if (variant === 'select') {
    return (
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
        className={`
          bg-background-secondary border border-border-primary rounded-lg px-3 py-2
          text-text-primary focus:outline-none focus:ring-2 focus:ring-interactive-primary
          ${className}
        `}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    )
  }

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
      return <Monitor className="h-4 w-4" />
    }
    return actualTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
  }

  const getLabel = () => {
    if (theme === 'system') return 'System'
    return actualTheme === 'dark' ? 'Dark' : 'Light'
  }

  return (
    <button
      onClick={cycleTheme}
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
        bg-interactive-primary hover:bg-interactive-primary-hover
        text-white border-0
        transition-all duration-200 hover:scale-105 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:ring-offset-2
        font-medium text-sm
        ${className}
      `}
      title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
      aria-label={`Current theme: ${getLabel()}. Click to cycle themes.`}
    >
      {getIcon()}
      <span className="hidden sm:inline">
        {getLabel()}
      </span>
    </button>
  )
}