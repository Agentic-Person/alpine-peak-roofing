'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSafeImage } from '@/lib/imageProvider'

interface SiteImageProps {
  id: string
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  onLoad?: () => void
  onError?: () => void
  style?: React.CSSProperties
}

export default function SiteImage({
  id,
  className = '',
  priority = false,
  loading = 'lazy',
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  onLoad,
  onError,
  style,
  ...props
}: SiteImageProps) {
  const { getImage, isImageAvailable } = useSafeImage()
  const [imageExists, setImageExists] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const imageData = getImage(id)

  useEffect(() => {
    if (!imageData) return

    // Check if real image is available
    isImageAvailable(id).then(exists => {
      setImageExists(exists)
      if (!exists) {
        setIsLoading(false)
      }
    }).catch(() => {
      setImageExists(false)
      setIsLoading(false)
    })
  }, [id, imageData, isImageAvailable])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setImageExists(false)
    setIsLoading(false)
    onError?.()
  }

  if (!imageData) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image not found: {id}</span>
      </div>
    )
  }

  // Determine which image to show
  const imageSrc = imageExists === true ? imageData.path : imageData.placeholder
  const imageAlt = imageData.alt

  // Loading state
  if (imageExists === null) {
    return (
      <div className={`bg-gray-200 animate-pulse ${className}`} style={style}>
        {!fill && (
          <div 
            style={{ 
              width: imageData.dimensions.width, 
              height: imageData.dimensions.height 
            }} 
          />
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {fill ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          {...(!priority && { loading })}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageData.dimensions.width}
          height={imageData.dimensions.height}
          priority={priority}
          {...(!priority && { loading })}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Placeholder indicator for development */}
      {imageExists === false && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
          Placeholder
        </div>
      )}
    </div>
  )
}

// Hero Image component for consistent hero sections
export function HeroImage({ 
  id, 
  className = '',
  overlay = true,
  overlayOpacity = 0.3,
  children,
  ...props 
}: SiteImageProps & { 
  overlay?: boolean
  overlayOpacity?: number 
  children?: React.ReactNode 
}) {
  return (
    <div className={`relative w-full ${className || 'h-96'}`} style={{ minHeight: className ? undefined : '400px' }}>
      <SiteImage
        id={id}
        fill
        priority
        className="object-cover"
        {...props}
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}

// Portfolio Image Pair component for before/after shots
export function PortfolioImagePair({ 
  beforeId, 
  afterId, 
  className = '',
  showLabels = true 
}: { 
  beforeId: string
  afterId: string
  className?: string
  showLabels?: boolean
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <div className="relative">
        <SiteImage
          id={beforeId}
          className="rounded-lg shadow-md"
          loading="lazy"
        />
        {showLabels && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Before
          </div>
        )}
      </div>
      <div className="relative">
        <SiteImage
          id={afterId}
          className="rounded-lg shadow-md"
          loading="lazy"
        />
        {showLabels && (
          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            After
          </div>
        )}
      </div>
    </div>
  )
}

// Team Member component with fallback
export function TeamMemberImage({ 
  id, 
  className = '',
  size = 'medium' 
}: { 
  id: string
  className?: string
  size?: 'small' | 'medium' | 'large'
}) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
      <SiteImage
        id={id}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}