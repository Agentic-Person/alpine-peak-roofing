'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import imageManifest from '../docs/images/imageManifest.json'

// Types
interface ImageData {
  id: string
  name: string
  path: string
  placeholder: string
  alt: string
  dimensions: { width: number; height: number }
  category: string
  usage: string[]
  priority: string
  format?: string
  [key: string]: any // For additional metadata
}

interface ImageContextType {
  getImage: (id: string) => ImageData | null
  getImagesByCategory: (category: string) => ImageData[]
  getImagesByUsage: (usage: string) => ImageData[]
  isImageAvailable: (id: string) => Promise<boolean>
  preloadImage: (id: string) => Promise<void>
}

// Context
const ImageContext = createContext<ImageContextType | undefined>(undefined)

// Provider
export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const getImage = (id: string): ImageData | null => {
    const image = imageManifest.images[id as keyof typeof imageManifest.images]
    if (!image) {
      console.warn(`Image with id "${id}" not found in manifest`)
      return null
    }
    return image as ImageData
  }

  const getImagesByCategory = (category: string): ImageData[] => {
    return Object.values(imageManifest.images)
      .filter((img: any) => img.category === category) as ImageData[]
  }

  const getImagesByUsage = (usage: string): ImageData[] => {
    return Object.values(imageManifest.images)
      .filter((img: any) => img.usage.includes(usage)) as ImageData[]
  }

  const isImageAvailable = async (id: string): Promise<boolean> => {
    if (loadedImages.has(id)) return true
    if (failedImages.has(id)) return false
    
    const image = getImage(id)
    if (!image) return false

    try {
      const response = await fetch(image.path, { method: 'HEAD' })
      const available = response.ok
      
      if (available) {
        setLoadedImages(prev => new Set(prev).add(id))
      } else {
        setFailedImages(prev => new Set(prev).add(id))
      }
      
      return available
    } catch (error) {
      setFailedImages(prev => new Set(prev).add(id))
      return false
    }
  }

  const preloadImage = async (id: string): Promise<void> => {
    const image = getImage(id)
    if (!image || loadedImages.has(id) || failedImages.has(id)) return

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(id))
        resolve()
      }
      img.onerror = () => {
        setFailedImages(prev => new Set(prev).add(id))
        reject(new Error(`Failed to load image: ${image.path}`))
      }
      img.src = image.path
    })
  }

  const contextValue: ImageContextType = {
    getImage,
    getImagesByCategory,
    getImagesByUsage,
    isImageAvailable,
    preloadImage
  }

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  )
}

// Hook
export function useImage() {
  const context = useContext(ImageContext)
  if (context === undefined) {
    throw new Error('useImage must be used within an ImageProvider')
  }
  return context
}

// Safe hook for components that might not have provider
export function useSafeImage() {
  try {
    return useImage()
  } catch {
    // Fallback implementation when provider is not available
    return {
      getImage: (id: string) => {
        const image = imageManifest.images[id as keyof typeof imageManifest.images]
        return image ? (image as ImageData) : null
      },
      getImagesByCategory: (category: string) => {
        return Object.values(imageManifest.images)
          .filter((img: any) => img.category === category) as ImageData[]
      },
      getImagesByUsage: (usage: string) => {
        return Object.values(imageManifest.images)
          .filter((img: any) => img.usage.includes(usage)) as ImageData[]
      },
      isImageAvailable: async () => false,
      preloadImage: async () => {}
    }
  }
}

// Utility functions
export function getImagePath(id: string): string {
  const manifest = imageManifest.images[id as keyof typeof imageManifest.images]
  return manifest ? manifest.path : ''
}

export function getImagePlaceholder(id: string): string {
  const manifest = imageManifest.images[id as keyof typeof imageManifest.images]
  return manifest ? manifest.placeholder : '/images/placeholders/default-placeholder.svg'
}

export function getImageAlt(id: string): string {
  const manifest = imageManifest.images[id as keyof typeof imageManifest.images]
  return manifest ? manifest.alt : 'Alpine Peak Roofing'
}