'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface ColorSwatchProps {
  name: string
  hexValue: string
  usage?: string
  variant?: 'light' | 'default' | 'dark'
  className?: string
}

export function ColorSwatch({ 
  name, 
  hexValue, 
  usage, 
  variant = 'default',
  className = '' 
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hexValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className={`group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      {/* Color Preview */}
      <div 
        className="h-24 rounded-t-lg cursor-pointer transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: hexValue }}
        onClick={copyToClipboard}
      />
      
      {/* Color Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
            {variant !== 'default' && (
              <span className="text-xs text-gray-500 capitalize">({variant})</span>
            )}
          </div>
          
          <button
            onClick={copyToClipboard}
            className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors duration-200"
            title="Copy hex value"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-mono">{hexValue}</span>
            {copied && (
              <span className="text-xs text-green-500 font-medium">Copied!</span>
            )}
          </div>
          
          {usage && (
            <p className="text-xs text-gray-600 leading-relaxed">{usage}</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface GradientSwatchProps {
  name: string
  gradient: string
  usage?: string
  className?: string
}

export function GradientSwatch({ name, gradient, usage, className = '' }: GradientSwatchProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gradient)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className={`group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      {/* Gradient Preview */}
      <div 
        className="h-24 rounded-t-lg cursor-pointer transition-transform duration-200 group-hover:scale-105"
        style={{ background: gradient }}
        onClick={copyToClipboard}
      />
      
      {/* Gradient Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 text-sm flex-1">{name}</h3>
          
          <button
            onClick={copyToClipboard}
            className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors duration-200"
            title="Copy gradient value"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-mono truncate">{gradient.length > 40 ? `${gradient.substring(0, 40)}...` : gradient}</span>
            {copied && (
              <span className="text-xs text-green-500 font-medium">Copied!</span>
            )}
          </div>
          
          {usage && (
            <p className="text-xs text-gray-600 leading-relaxed">{usage}</p>
          )}
        </div>
      </div>
    </div>
  )
}