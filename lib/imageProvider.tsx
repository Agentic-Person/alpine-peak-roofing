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
  batchPreloadImages: (ids: string[], priority?: boolean) => Promise<void>
}

// Context
const ImageContext = createContext<ImageContextType | undefined>(undefined)

// Cache for image availability checks
let imageAvailabilityCache: Map<string, { available: boolean; timestamp: number }> = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Provider
export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [preloadQueue, setPreloadQueue] = useState<string[]>([])

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
    
    // Check cache first
    const cachedResult = imageAvailabilityCache.get(id)
    if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
      if (cachedResult.available) {
        setLoadedImages(prev => new Set(prev).add(id))
      } else {
        setFailedImages(prev => new Set(prev).add(id))
      }
      return cachedResult.available
    }
    
    const image = getImage(id)
    if (!image) return false

    try {
      // Use AbortController for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const response = await fetch(image.path, { 
        method: 'HEAD',
        signal: controller.signal,
        cache: 'force-cache'
      })
      
      clearTimeout(timeoutId)
      const available = response.ok
      
      // Cache the result
      imageAvailabilityCache.set(id, {
        available,
        timestamp: Date.now()
      })
      
      if (available) {
        setLoadedImages(prev => new Set(prev).add(id))
      } else {
        setFailedImages(prev => new Set(prev).add(id))
      }
      
      return available
    } catch (error) {
      // Cache failed result
      imageAvailabilityCache.set(id, {
        available: false,
        timestamp: Date.now()
      })
      setFailedImages(prev => new Set(prev).add(id))
      return false
    }
  }

  const preloadImage = async (id: string): Promise<void> => {
    const image = getImage(id)
    if (!image || loadedImages.has(id) || failedImages.has(id)) return

    return new Promise((resolve, reject) => {
      const img = new Image()
      
      // Set up timeout
      const timeoutId = setTimeout(() => {
        setFailedImages(prev => new Set(prev).add(id))
        reject(new Error(`Image preload timeout: ${image.path}`))
      }, 10000)
      
      img.onload = () => {
        clearTimeout(timeoutId)
        setLoadedImages(prev => new Set(prev).add(id))
        // Update cache
        imageAvailabilityCache.set(id, {
          available: true,
          timestamp: Date.now()
        })
        resolve()
      }
      
      img.onerror = () => {
        clearTimeout(timeoutId)
        setFailedImages(prev => new Set(prev).add(id))
        // Update cache
        imageAvailabilityCache.set(id, {
          available: false,
          timestamp: Date.now()
        })
        reject(new Error(`Failed to load image: ${image.path}`))
      }
      
      // Use placeholder if real image fails immediately
      img.src = image.path
    })
  }
  
  const batchPreloadImages = async (ids: string[], priority: boolean = false): Promise<void> => {
    const imagesToLoad = ids.filter(id => 
      !loadedImages.has(id) && 
      !failedImages.has(id) && 
      getImage(id)
    )
    
    if (imagesToLoad.length === 0) return
    
    if (priority) {
      // Load high-priority images in parallel
      await Promise.allSettled(
        imagesToLoad.slice(0, 3).map(id => preloadImage(id))
      )
    } else {
      // Add to queue for background loading
      setPreloadQueue(prev => [...prev, ...imagesToLoad])
    }
  }

  // Process preload queue
  React.useEffect(() => {
    if (preloadQueue.length === 0) return
    
    const processQueue = async () => {
      const id = preloadQueue[0]
      if (id) {
        try {
          await preloadImage(id)
        } catch {
          // Continue with next image even if one fails
        }
        setPreloadQueue(prev => prev.slice(1))
      }
    }
    
    const timeoutId = setTimeout(processQueue, 100)
    return () => clearTimeout(timeoutId)
  }, [preloadQueue])
  
  // Cleanup cache periodically
  React.useEffect(() => {
    const cleanup = () => {
      const now = Date.now()
      for (const [key, value] of imageAvailabilityCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
          imageAvailabilityCache.delete(key)
        }
      }
    }
    
    const intervalId = setInterval(cleanup, 60000) // Cleanup every minute
    return () => clearInterval(intervalId)
  }, [])

  const contextValue: ImageContextType = {
    getImage,
    getImagesByCategory,
    getImagesByUsage,
    isImageAvailable,
    preloadImage,
    batchPreloadImages
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
      preloadImage: async () => {},
      batchPreloadImages: async () => {}
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