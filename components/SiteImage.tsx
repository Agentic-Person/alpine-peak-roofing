'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import imageManifest from '@/docs/images/imageManifest.json'

type ImageEntry = {
  id: string
  path: string
  placeholder: string
  alt: string
  dimensions: { width: number; height: number }
}

const images = imageManifest.images as Record<string, ImageEntry>

interface SiteImageProps {
  id: string
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  fill?: boolean
  sizes?: string
  quality?: number
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
  style,
}: SiteImageProps) {
  const imageData = images[id]
  const [src, setSrc] = useState(imageData?.path ?? imageData?.placeholder ?? '')

  if (!imageData) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={style}>
        <span className="text-gray-500 text-sm">Image not found: {id}</span>
      </div>
    )
  }

  const handleError = () => {
    if (src !== imageData.placeholder) {
      setSrc(imageData.placeholder)
    }
  }

  // priority and loading are mutually exclusive in Next.js
  const loadingProp = priority ? undefined : loading

  if (fill) {
    return (
      <Image
        src={src}
        alt={imageData.alt}
        fill
        priority={priority}
        loading={loadingProp}
        sizes={sizes ?? '100vw'}
        quality={quality}
        className={className}
        style={style}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={imageData.alt}
      width={imageData.dimensions.width}
      height={imageData.dimensions.height}
      priority={priority}
      loading={loadingProp}
      sizes={sizes}
      quality={quality}
      className={className}
      style={style}
      onError={handleError}
    />
  )
}

// Hero Image: full-bleed background image with optional overlay and children
export function HeroImage({
  id,
  className = '',
  overlay = true,
  overlayOpacity = 0.3,
  children,
}: {
  id: string
  className?: string
  overlay?: boolean
  overlayOpacity?: number
  children?: React.ReactNode
}) {
  return (
    <div className={`relative ${className}`}>
      <SiteImage id={id} fill priority className="object-cover" />
      {overlay && (
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}

// Portfolio before/after pair
export function PortfolioImagePair({
  beforeId,
  afterId,
  className = '',
  showLabels = true,
}: {
  beforeId: string
  afterId: string
  className?: string
  showLabels?: boolean
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
        <SiteImage id={beforeId} fill className="object-cover" />
        {showLabels && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Before
          </div>
        )}
      </div>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
        <SiteImage id={afterId} fill className="object-cover" />
        {showLabels && (
          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            After
          </div>
        )}
      </div>
    </div>
  )
}

// Team member portrait
export function TeamMemberImage({
  id,
  className = '',
  size = 'medium',
}: {
  id: string
  className?: string
  size?: 'small' | 'medium' | 'large'
}) {
  const sizePx = { small: 64, medium: 96, large: 128 }[size]

  return (
    <div
      className={`rounded-full overflow-hidden ${className}`}
      style={{ width: sizePx, height: sizePx, position: 'relative' }}
    >
      <SiteImage id={id} fill className="object-cover" />
    </div>
  )
}
