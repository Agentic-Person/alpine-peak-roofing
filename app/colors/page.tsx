'use client'

import React from 'react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { useTheme } from '@/components/theme/ThemeProvider'

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

interface ColorSampleProps {
  name: string
  description: string
  cssVar: string
  className?: string
  textClassName?: string
}

function ColorSample({ name, description, cssVar, className = '', textClassName = '' }: ColorSampleProps) {
  return (
    <div className="group">
      <div 
        className={`
          w-full h-20 rounded-lg border border-border-primary
          flex items-center justify-center cursor-pointer
          transition-all duration-200 hover:scale-105 hover:shadow-lg
          ${className}
        `}
        style={{ backgroundColor: `var(${cssVar})` }}
        onClick={() => navigator.clipboard.writeText(cssVar)}
      >
        <span className={`font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity ${textClassName}`}>
          Click to copy
        </span>
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-text-primary">{name}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
        <code className="text-xs text-text-tertiary font-mono">{cssVar}</code>
      </div>
    </div>
  )
}

interface ColorGroupProps {
  title: string
  children: React.ReactNode
}

function ColorGroup({ title, children }: ColorGroupProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b border-border-primary">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  )
}

function GradientSample({ name, description, cssVar }: { name: string; description: string; cssVar: string }) {
  return (
    <div className="group">
      <div 
        className="w-full h-20 rounded-lg border border-border-primary cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
        style={{ background: `var(${cssVar})` }}
        onClick={() => navigator.clipboard.writeText(cssVar)}
      >
        <div className="h-full flex items-center justify-center">
          <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity text-white">
            Click to copy
          </span>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-text-primary">{name}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
        <code className="text-xs text-text-tertiary font-mono">{cssVar}</code>
      </div>
    </div>
  )
}

export default function ColorsPage() {
  const { actualTheme } = useSafeTheme()

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <div className="bg-background-secondary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-text-primary">
                Alpine Peak Color System
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Complete color palette with light and dark mode support
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-tertiary">
                Current mode: <strong className="text-text-primary">{actualTheme}</strong>
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Background Colors */}
        <ColorGroup title="Background Colors">
          <ColorSample
            name="Primary Background"
            description="Main page backgrounds"
            cssVar="--background-primary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Secondary Background"
            description="Section backgrounds"
            cssVar="--background-secondary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Tertiary Background"
            description="Card and container backgrounds"
            cssVar="--background-tertiary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Inverse Background"
            description="High contrast backgrounds"
            cssVar="--background-inverse"
            textClassName="text-text-primary"
          />
        </ColorGroup>

        {/* Text Colors */}
        <ColorGroup title="Text Colors">
          <ColorSample
            name="Primary Text"
            description="Headers and primary content"
            cssVar="--text-primary"
            className="bg-background-secondary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Secondary Text"
            description="Subheadings and important text"
            cssVar="--text-secondary"
            className="bg-background-secondary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Tertiary Text"
            description="Body text and descriptions"
            cssVar="--text-tertiary"
            className="bg-background-secondary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Muted Text"
            description="Labels and less important text"
            cssVar="--text-muted"
            className="bg-background-secondary"
            textClassName="text-text-inverse"
          />
        </ColorGroup>

        {/* Interactive Colors */}
        <ColorGroup title="Interactive Colors">
          <ColorSample
            name="Primary Interactive"
            description="Buttons and primary actions"
            cssVar="--interactive-primary"
            textClassName="text-white"
          />
          <ColorSample
            name="Primary Hover"
            description="Hovered primary interactions"
            cssVar="--interactive-primary-hover"
            textClassName="text-white"
          />
          <ColorSample
            name="Secondary Interactive"
            description="Secondary buttons and actions"
            cssVar="--interactive-secondary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Secondary Hover"
            description="Hovered secondary interactions"
            cssVar="--interactive-secondary-hover"
            textClassName="text-text-inverse"
          />
        </ColorGroup>

        {/* Border Colors */}
        <ColorGroup title="Border Colors">
          <ColorSample
            name="Primary Border"
            description="Default borders and dividers"
            cssVar="--border-primary"
            className="bg-background-secondary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Secondary Border"
            description="Subtle borders"
            cssVar="--border-secondary"
            className="bg-background-secondary"
            textClassName="text-text-inverse"
          />
          <ColorSample
            name="Focus Border"
            description="Focus states and highlights"
            cssVar="--border-focus"
            textClassName="text-white"
          />
        </ColorGroup>

        {/* Alpine Brand Colors */}
        <ColorGroup title="Alpine Brand Colors">
          <ColorSample
            name="Alpine Teal"
            description="Primary brand accent"
            cssVar="--alpine-teal"
            textClassName="text-white"
          />
          <ColorSample
            name="Alpine Purple"
            description="Secondary brand accent"
            cssVar="--alpine-purple"
            textClassName="text-white"
          />
          <ColorSample
            name="Dark Blue 1"
            description="Primary dark blue"
            cssVar="--alpine-dark-blue"
            textClassName="text-white"
          />
          <ColorSample
            name="Dark Blue 3"
            description="Mid-tone dark blue"
            cssVar="--alpine-dark-blue-3"
            textClassName="text-white"
          />
        </ColorGroup>

        {/* Semantic Colors */}
        <ColorGroup title="Semantic Colors">
          <div className="bg-success-500 h-20 rounded-lg flex items-center justify-center text-white font-medium">
            Success
          </div>
          <div className="bg-warning-500 h-20 rounded-lg flex items-center justify-center text-white font-medium">
            Warning
          </div>
          <div className="bg-error-500 h-20 rounded-lg flex items-center justify-center text-white font-medium">
            Error
          </div>
          <div className="bg-info-500 h-20 rounded-lg flex items-center justify-center text-white font-medium">
            Info
          </div>
        </ColorGroup>

        {/* Gradients */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b border-border-primary">
            Brand Gradients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <GradientSample
              name="Alpine Gradient"
              description="Primary brand gradient"
              cssVar="--alpine-gradient"
            />
            <GradientSample
              name="Hero Gradient"
              description="Hero section backgrounds"
              cssVar="--hero-gradient"
            />
            <GradientSample
              name="Teal Gradient"
              description="Accent element gradients"
              cssVar="--teal-gradient"
            />
            <GradientSample
              name="Purple Gradient"
              description="Secondary accent gradients"
              cssVar="--purple-gradient"
            />
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-background-secondary rounded-lg p-8 border border-border-primary">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Background Hierarchy</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• <strong>Primary:</strong> Main page backgrounds</li>
                <li>• <strong>Secondary:</strong> Section backgrounds</li>
                <li>• <strong>Tertiary:</strong> Cards and containers</li>
                <li>• <strong>Inverse:</strong> High contrast elements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Text Hierarchy</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• <strong>Primary:</strong> Headlines and titles</li>
                <li>• <strong>Secondary:</strong> Subheadings</li>
                <li>• <strong>Tertiary:</strong> Body text</li>
                <li>• <strong>Muted:</strong> Labels and metadata</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Interactive Elements</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Use <strong>Primary</strong> for main CTAs</li>
                <li>• Use <strong>Secondary</strong> for supporting actions</li>
                <li>• Always include hover states</li>
                <li>• Ensure sufficient contrast ratios</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Accessibility</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• All colors meet WCAG AA standards</li>
                <li>• Focus states are clearly visible</li>
                <li>• Color is not the only indicator</li>
                <li>• Dark mode provides equal accessibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Implementation Example */}
        <div className="mt-12 bg-background-tertiary rounded-lg p-8 border border-border-primary">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Implementation Example</h2>
          <div className="bg-background-primary p-6 rounded-lg border border-border-primary">
            <h3 className="text-xl font-bold text-text-primary mb-4">Sample Card Component</h3>
            <p className="text-text-secondary mb-4">
              This card demonstrates proper use of the color system with semantic classes.
            </p>
            <div className="flex gap-4 items-center">
              <button className="bg-interactive-primary hover:bg-interactive-primary-hover text-white px-4 py-2 rounded-lg transition-colors">
                Primary Action
              </button>
              <button className="bg-interactive-secondary hover:bg-interactive-secondary-hover text-text-primary px-4 py-2 rounded-lg border border-border-primary transition-colors">
                Secondary Action
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-border-primary">
              <span className="text-text-muted text-sm">Last updated: Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}