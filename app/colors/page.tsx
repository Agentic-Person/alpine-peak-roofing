import React from 'react'
import { ColorSwatch, GradientSwatch } from '@/components/ColorSwatch'
import { Palette, Eye, Zap, Target, CheckCircle, Star } from 'lucide-react'

export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Palette className="h-16 w-16 text-blue-200" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Color Scheme Reference
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Complete color palette for the Alpine Peak Roofing website. Click any color to copy its hex value.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Brand Colors */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Brand Colors</h2>
            <p className="text-gray-600 text-lg">Five core brand colors defining the Alpine Peak identity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <ColorSwatch 
              name="Brand Navy" 
              hexValue="#003399" 
              usage="Very dark blue for deep backgrounds and strong contrast"
            />
            <ColorSwatch 
              name="Brand Primary" 
              hexValue="#0033CC" 
              usage="Primary brand blue for main elements and active states"
            />
            <ColorSwatch 
              name="Brand Blue" 
              hexValue="#0066CC" 
              usage="Medium brand blue for secondary elements and variations"
            />
            <ColorSwatch 
              name="Brand Sky" 
              hexValue="#33CCFF" 
              usage="Sky blue for highlights and secondary CTAs"
            />
            <ColorSwatch 
              name="Brand Gold" 
              hexValue="#FFCC00" 
              usage="Golden yellow accent for special highlights and XP"
            />
          </div>
        </section>

        {/* Interactive Colors */}
        <section>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Interactive Colors</h2>
            </div>
            <p className="text-gray-600 text-lg">Colors for buttons, links, and interactive components with proper state variations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColorSwatch 
              name="Interactive Default"
              hexValue="#36B0D9" 
              usage="Default state for buttons, links, and interactive elements"
            />
            <ColorSwatch 
              name="Interactive Hover"
              hexValue="#33CCFF" 
              usage="Hover state for interactive elements"
            />
            <ColorSwatch 
              name="Interactive Active"
              hexValue="#2A8CB0" 
              usage="Active/pressed state for interactive elements"
            />
          </div>
        </section>

        {/* Text Colors */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Text Colors</h2>
            <p className="text-gray-600 text-lg">Typography color hierarchy for optimal readability</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <ColorSwatch 
              name="Text Primary" 
              hexValue="#FFFFFF" 
              usage="Headers, titles, and primary text on dark backgrounds"
            />
            <ColorSwatch 
              name="Text Off-White" 
              hexValue="#C7E1FC" 
              usage="Premium off-white text for enhanced readability on navy backgrounds"
            />
            <ColorSwatch 
              name="Text Body" 
              hexValue="#DDDDDD" 
              usage="Main body text on dark backgrounds"
            />
            <ColorSwatch 
              name="Text Secondary" 
              hexValue="#9AB6E0" 
              usage="Secondary text, labels, and captions"
            />
            <ColorSwatch 
              name="Text Muted" 
              hexValue="#596D8C" 
              usage="Muted text, descriptions, and less important content"
            />
          </div>
        </section>

        {/* Status Colors */}
        <section>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Status Colors</h2>
            </div>
            <p className="text-gray-600 text-lg">Green color system for success states and positive feedback</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColorSwatch 
              name="Success Light"
              hexValue="#34D399" 
              usage="Light success state and hover effects"
            />
            <ColorSwatch 
              name="Success Default"
              hexValue="#00CC00" 
              usage="Default success color for confirmations and BLOX tokens"
            />
            <ColorSwatch 
              name="Success Dark"
              hexValue="#059669" 
              usage="Active success state and pressed buttons"
            />
          </div>
        </section>

        {/* Accent Colors */}
        <section>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Star className="h-8 w-8 text-yellow-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Accent Colors</h2>
            </div>
            <p className="text-gray-600 text-lg">Specialized colors for metrics, rewards, and special elements</p>
          </div>
          
          {/* Gold Accents */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Accent Gold (XP & Rewards)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ColorSwatch 
                name="Accent Gold Light"
                hexValue="#FCD34D" 
                usage="Light gold for hover states on XP elements"
              />
              <ColorSwatch 
                name="Accent Gold Default"
                hexValue="#FFCC00" 
                usage="Default gold for XP displays and achievements"
              />
              <ColorSwatch 
                name="Accent Gold Dark"
                hexValue="#D97706" 
                usage="Dark gold for active states and pressed elements"
              />
            </div>
          </div>

          {/* Orange Accents */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Accent Orange (Streaks & Energy)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ColorSwatch 
                name="Accent Orange Light"
                hexValue="#FB923C" 
                usage="Light orange for hover states on streak elements"
              />
              <ColorSwatch 
                name="Accent Orange Default"
                hexValue="#FF9900" 
                usage="Default orange for day streaks and energy displays"
              />
              <ColorSwatch 
                name="Accent Orange Dark"
                hexValue="#EA580C" 
                usage="Dark orange for active states and emphasis"
              />
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Gradients</h2>
            </div>
            <p className="text-gray-600 text-lg">Background gradients for headers, hero sections, and CTAs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GradientSwatch 
              name="Brand Header Gradient" 
              gradient="linear-gradient(to right, #0066CC, #003399)" 
              usage="Horizontal header gradient - brand blue to brand navy"
            />
            <GradientSwatch 
              name="Brand Navy to Sky Gradient" 
              gradient="linear-gradient(to right, #003399, #33CCFF)" 
              usage="Brand gradient from Brand Navy to Brand Sky"
            />
            <GradientSwatch 
              name="Brand Vertical Gradient" 
              gradient="linear-gradient(to bottom, #0066CC, #003399)" 
              usage="Vertical gradient from Brand Blue to Brand Navy"
            />
            <GradientSwatch 
              name="Brand Vertical Invert Gradient" 
              gradient="linear-gradient(to bottom, #003399, #0066CC)" 
              usage="Inverted vertical gradient - darker navy to brighter blue"
            />
            <GradientSwatch 
              name="Brand Header Invert Gradient" 
              gradient="linear-gradient(to right, #003399, #0066CC)" 
              usage="Horizontal header gradient - brand navy to brand blue"
            />
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="bg-white rounded-lg p-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <Target className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Usage Guidelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Design Hierarchy</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Brand Navy (#003399):</strong> Primary background color</li>
                <li>• <strong>Brand Blue (#0066CC):</strong> Cards and elements on navy background</li>
                <li>• <strong>Brand Sky (#33CCFF):</strong> Accents within cards and elements</li>
                <li>• <strong>Brand Gold (#FFCC00):</strong> Highlights and jump-out effects</li>
                <li>• <strong>Text Off-White (#C7E1FC):</strong> Premium text on navy backgrounds</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Interactive States</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Default:</strong> Normal button and link state</li>
                <li>• <strong>Hover:</strong> Mouse hover interactions</li>
                <li>• <strong>Active:</strong> Clicked/pressed state</li>
                <li>• Always maintain consistent state progression</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Text Hierarchy</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Primary:</strong> Main headings and titles</li>
                <li>• <strong>Body:</strong> Regular paragraph text</li>
                <li>• <strong>Secondary:</strong> Labels and captions</li>
                <li>• <strong>Muted:</strong> Less important content</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Status & Feedback</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Success:</strong> Confirmations and achievements</li>
                <li>• Use consistent success colors for positive feedback</li>
                <li>• Apply state variations for interactive success elements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Accent Usage</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Gold:</strong> XP, achievements, premium features</li>
                <li>• <strong>Orange:</strong> Streaks, energy, urgency</li>
                <li>• Use sparingly to maintain visual hierarchy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Gradients</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Header:</strong> Standard page headers</li>
                <li>• <strong>Hero Dark:</strong> Landing page heroes</li>
                <li>• <strong>CTA:</strong> Important action buttons</li>
                <li>• <strong>Background Dark:</strong> Content containers</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}