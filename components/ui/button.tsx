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
  children,
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)
  
  if (asChild) {
    // When asChild is true, clone the child element and apply button styles
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...children.props,
        className: cn(combinedClassName, children.props.className),
        ...(disabled && { 'aria-disabled': true }),
        ...props
      })
    }
    // Fallback to span if children is not a valid React element
    return (
      <span className={combinedClassName} {...props}>
        {children}
      </span>
    )
  }

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  )
}