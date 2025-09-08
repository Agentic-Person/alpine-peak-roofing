'use client'

import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { ImageProvider } from '@/lib/imageProvider'
import { FloatingThemeToggle } from '@/components/theme/FloatingThemeToggle'
import Navigation from './Navigation'
import Footer from './Footer'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <ImageProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingThemeToggle />
        </div>
      </ImageProvider>
    </ThemeProvider>
  )
}