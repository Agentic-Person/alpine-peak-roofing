import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: boolean
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  asChild = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  // Remove asChild from props to prevent it from being passed to DOM
  const { asChild: _, ...domProps } = props as any;
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-interactive-primary hover:bg-interactive-primary-hover text-white hover:scale-105 shadow-sm hover:shadow',
    secondary: 'bg-interactive-secondary hover:bg-interactive-secondary-hover text-text-primary border border-border-primary hover:scale-105',
    outline: 'border-2 border-interactive-primary text-interactive-primary hover:bg-background-secondary hover:scale-105',
    ghost: 'text-interactive-primary hover:bg-background-secondary hover:scale-105'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      className: combinedClassName,
      ...domProps
    })
  }

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...domProps}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}