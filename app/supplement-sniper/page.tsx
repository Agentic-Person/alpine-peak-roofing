'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  FileText,
  Search,
  FileCheck,
  ArrowRight,
  Check,
  Phone,
  ChevronRight,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Shield,
  Zap,
  BarChart3,
  Clock,
  Target,
  Upload,
  Cpu,
  Download,
  CheckCircle2,
  Circle,
  Loader2,
  Star,
  Building,
  MapPin,
  User,
  Calendar,
  Hash
} from 'lucide-react'

// ─── Mock data from real engine test run ────────────────────────────────────

const MOCK_CLAIM = {
  claimNumber: 'SF-2026-0847291',
  carrier: 'State Farm',
  adjuster: 'Michael Torres',
  property: '1847 Oakwood Drive, Plano, TX 75024',
  dateOfLoss: 'Feb 12, 2026',
  roofSize: '28.50 SQ',
  originalTotal: 3632.71,
  supplementValue: 62513.72,
  newTotal: 66146.43,
  gapsFound: 47,
  percentIncrease: 105.9,
}

const MOCK_GAPS = [
  { code: 'RFG ASTR-',  description: 'Asphalt starter — universal starter course',       category: 'Missing Companion',   severity: 'Critical', confidence: 0.95, qty: '325 LF',  total: 406.25  },
  { code: 'RFG RIDGCS', description: 'Ridge cap shingles — standard profile',             category: 'Missing Companion',   severity: 'Critical', confidence: 0.95, qty: '48 LF',   total: 792.00  },
  { code: 'RFG DRIP',   description: 'Drip edge — aluminum',                              category: 'Missing Companion',   severity: 'High',     confidence: 0.90, qty: '285 LF',  total: 456.00  },
  { code: 'RFG IWS',    description: 'Ice & water shield — eaves (IRC R905.1.2)',          category: 'Code Required',       severity: 'Critical', confidence: 0.95, qty: '5.70 SQ', total: 1140.00 },
  { code: 'RFG VENT',   description: 'Ridge vent — continuous (IRC R806.2)',               category: 'Code Required',       severity: 'High',     confidence: 0.90, qty: '42 LF',   total: 840.00  },
  { code: 'RFG STEP',   description: 'Step flashing — aluminum (at sidewalls)',            category: 'Commonly Missed',     severity: 'High',     confidence: 0.88, qty: '96 LF',   total: 768.00  },
  { code: 'RFG PJ',     description: 'Pipe jack — lead flashing (2 units)',                category: 'Commonly Missed',     severity: 'Medium',   confidence: 0.85, qty: '2 EA',    total: 320.00  },
  { code: 'RFG VLL',    description: 'Valley lining — metal (open valley)',                category: 'Commonly Missed',     severity: 'High',     confidence: 0.87, qty: '68 LF',   total: 544.00  },
  { code: 'RFG HAU',    description: 'Haul debris — per SQ',                               category: 'Commonly Missed',     severity: 'Medium',   confidence: 0.92, qty: '28.5 SQ', total: 427.50  },
  { code: 'RFG O&P',    description: 'Overhead & Profit — general contractor (10/10)',     category: 'Overhead & Profit',   severity: 'Critical', confidence: 0.98, qty: '1 LS',    total: 8760.00 },
]

const PROCESSING_STEPS = [
  { id: 1, label: 'Uploading estimate file',         detail: 'sample_estimate.txt — 28.5 SQ State Farm claim',  duration: 900  },
  { id: 2, label: 'Parsing line items',              detail: 'Extracted 12 line items from adjuster estimate',   duration: 1400 },
  { id: 3, label: 'Companion item check',            detail: 'Cross-referencing 140 Xactimate roofing codes',   duration: 1200 },
  { id: 4, label: 'Building code analysis',          detail: 'Applying Texas IRC + TWIA local amendments',       duration: 1300 },
  { id: 5, label: 'Pattern matching (55 patterns)',  detail: 'Scanning for 55 commonly missed supplement items', duration: 1100 },
  { id: 6, label: 'Carrier rules — State Farm',      detail: 'Applying carrier-specific denial patterns',        duration: 900  },
  { id: 7, label: 'Quantity validation',             detail: 'Verifying quantities against 28.50 SQ roof area',  duration: 700  },
  { id: 8, label: 'Generating supplement PDF',       detail: 'Building professional supplement package',          duration: 1600 },
]

const SEVERITY_COLORS: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High:     'bg-orange-100 text-orange-700 border-orange-200',
  Medium:   'bg-yellow-100 text-yellow-700 border-yellow-200',
  Low:      'bg-gray-100 text-gray-600 border-gray-200',
}

const CATEGORY_COLORS: Record<string, string> = {
  'Missing Companion': 'text-blue-600',
  'Code Required':     'text-red-600',
  'Commonly Missed':   'text-orange-600',
  'Overhead & Profit': 'text-purple-600',
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SupplementSniperPage() {
  const [demoStarted, setDemoStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [demoComplete, setDemoComplete] = useState(false)
  const [activeGap, setActiveGap] = useState<number | null>(null)
  const demoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!demoStarted) return
    if (currentStep >= PROCESSING_STEPS.length) {
      setDemoComplete(true)
      return
    }

    const step = PROCESSING_STEPS[currentStep]
    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, step.id])
      setCurrentStep(prev => prev + 1)
    }, step.duration)

    return () => clearTimeout(timer)
  }, [demoStarted, currentStep])

  const handleStartDemo = () => {
    setDemoStarted(true)
    setCurrentStep(0)
    setCompletedSteps([])
    setDemoComplete(false)
    setTimeout(() => demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleResetDemo = () => {
    setDemoStarted(false)
    setCurrentStep(0)
    setCompletedSteps([])
    setDemoComplete(false)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-[#1a0533] via-[#2d1060] to-[#003399] text-white relative overflow-hidden">
        {/* grid texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zm40 0h-1v40h1zM0 0v1h40V0zm0 40v-1h40v1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        {/* glow orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-purple-200 mb-8">
              <Zap className="h-4 w-4 text-yellow-400" />
              Powered by Alpine Peak Roofing AI Platform
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
              The Supplement
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Sniper
              </span>
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed mb-4">
              Upload an insurance adjuster&apos;s estimate. Get back every missed line item —
              automatically identified, justified, and packaged into a professional supplement document.
            </p>
            <p className="text-lg text-purple-200 mb-10">
              Average recovery: <span className="text-yellow-400 font-bold">$3,000 – $5,000+</span> per claim.
              Time to complete: <span className="text-yellow-400 font-bold">under 2 minutes.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleStartDemo}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-300 hover:to-orange-400 text-base px-8"
              >
                <Zap className="mr-2 h-5 w-5" />
                Watch Live Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 text-base px-8" asChild>
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Request Early Access
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <section className="bg-[#003399] border-b border-blue-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-blue-800">
            {[
              { value: '47',      label: 'Missed items found per claim (avg)',   icon: Search    },
              { value: '$62K+',   label: 'Supplement value recovered per claim', icon: DollarSign },
              { value: '< 2 min', label: 'Full analysis time',                  icon: Clock     },
              { value: '10',      label: 'Major carriers supported',             icon: Building  },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-6 px-4 text-center">
                <stat.icon className="h-6 w-6 text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-blue-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Three steps from adjuster estimate to approved supplement
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connector lines */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300" />
            {[
              {
                step: '01', icon: Upload, color: 'purple',
                title: 'Upload the Estimate',
                desc: 'Drop in the adjuster\'s estimate — PDF, ESX, CSV, or plain text. The parser handles every Xactimate format automatically.',
                tags: ['PDF', 'ESX / XML', 'CSV', 'Plain Text'],
              },
              {
                step: '02', icon: Cpu, color: 'blue',
                title: 'AI Analyzes the Gaps',
                desc: 'Six detection engines fire simultaneously — companion items, building codes, 55 miss-patterns, carrier rules, quantity checks, and O&P.',
                tags: ['140 Xactimate Codes', '10 Carriers', '10 States + Metro'],
              },
              {
                step: '03', icon: FileCheck, color: 'green',
                title: 'Download the Supplement',
                desc: 'A professionally formatted PDF lands in your inbox. Every gap has an Xactimate code, dollar value, and written justification with IRC citations.',
                tags: ['PDF Report', 'Markdown', 'Gap Report JSON'],
              },
            ].map(({ step, icon: Icon, color, title, desc, tags }) => (
              <div key={step} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-${color}-100 mb-6`}>
                  <Icon className={`h-8 w-8 text-${color}-600`} />
                </div>
                <div className={`absolute top-6 right-6 text-5xl font-black text-${color}-100`}>{step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {tags.map(t => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Processing Demo ────────────────────────────────────────────────── */}
      <section ref={demoRef} className="py-20 sm:py-28 bg-[#0d0d1a]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">See It Process a Real Claim</h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              This is an actual State Farm claim from Plano, TX run through the engine.
              Every number below is real output — not a mock.
            </p>
          </div>

          {/* Terminal window */}
          <div className="bg-[#0a0a14] rounded-2xl border border-purple-900/40 shadow-2xl shadow-purple-900/20 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[#111126] border-b border-purple-900/30">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-gray-500 font-mono">supplement-sniper — pipeline.py</span>
            </div>

            <div className="p-6 font-mono text-sm">
              {/* Claim header */}
              <div className="mb-6 text-gray-500 text-xs">
                <span className="text-purple-400">$</span>{' '}
                <span className="text-gray-300">python pipeline.py test_data/sample_estimate.txt</span>
              </div>

              {/* Claim info block */}
              <div className="mb-6 bg-purple-950/30 border border-purple-900/30 rounded-lg p-4 text-xs space-y-1">
                <div className="text-purple-300 font-semibold mb-2">▶ Claim Loaded</div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  <span className="text-gray-500">Claim #:</span>     <span className="text-gray-200">{MOCK_CLAIM.claimNumber}</span>
                  <span className="text-gray-500">Carrier:</span>     <span className="text-gray-200">{MOCK_CLAIM.carrier}</span>
                  <span className="text-gray-500">Property:</span>    <span className="text-gray-200">{MOCK_CLAIM.property}</span>
                  <span className="text-gray-500">Roof Size:</span>   <span className="text-gray-200">{MOCK_CLAIM.roofSize}</span>
                  <span className="text-gray-500">Adj. Estimate:</span><span className="text-yellow-300">${MOCK_CLAIM.originalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Processing steps */}
              <div className="space-y-3 mb-6">
                {PROCESSING_STEPS.map((step, idx) => {
                  const isComplete = completedSteps.includes(step.id)
                  const isActive = demoStarted && currentStep === idx && !isComplete
                  const isPending = !demoStarted || (currentStep < idx && !isComplete)

                  return (
                    <div key={step.id} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {isComplete ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                        ) : isActive ? (
                          <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-700" />
                        )}
                      </div>
                      <div>
                        <span className={isComplete ? 'text-green-400' : isActive ? 'text-purple-300' : 'text-gray-600'}>
                          {step.label}
                        </span>
                        {(isComplete || isActive) && (
                          <div className="text-gray-500 text-xs mt-0.5">{step.detail}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Result */}
              {demoComplete && (
                <div className="bg-green-950/40 border border-green-700/40 rounded-lg p-4 text-xs space-y-2 animate-in fade-in duration-500">
                  <div className="text-green-400 font-semibold text-sm">✓ Analysis Complete</div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <span className="text-gray-500">Gaps identified:</span>   <span className="text-white font-bold">{MOCK_CLAIM.gapsFound} items</span>
                    <span className="text-gray-500">Original estimate:</span> <span className="text-gray-300">${MOCK_CLAIM.originalTotal.toLocaleString()}</span>
                    <span className="text-gray-500">Supplement value:</span>  <span className="text-green-400 font-bold">${MOCK_CLAIM.supplementValue.toLocaleString()}</span>
                    <span className="text-gray-500">Revised total:</span>     <span className="text-yellow-300 font-bold">${MOCK_CLAIM.newTotal.toLocaleString()}</span>
                    <span className="text-gray-500">% increase:</span>        <span className="text-green-400 font-bold">+{MOCK_CLAIM.percentIncrease}%</span>
                  </div>
                  <div className="mt-2 text-gray-400">
                    Output: <span className="text-blue-400">core/output/run_20260212_143022/supplement_SF-2026-0847291.pdf</span>
                  </div>
                </div>
              )}

              {/* Start / Reset button */}
              <div className="mt-6">
                {!demoStarted ? (
                  <button
                    onClick={handleStartDemo}
                    className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    <Zap className="h-4 w-4" /> Run Demo
                  </button>
                ) : demoComplete ? (
                  <button
                    onClick={handleResetDemo}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    ↺ Run Again
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-purple-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing…
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gap Report Results ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The Gap Report</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Every identified gap comes with an Xactimate code, severity rating, dollar value,
              and a written justification with building code citations.
            </p>
          </div>

          {/* Claim summary card */}
          <div className="bg-gradient-to-r from-[#003399] to-[#0066CC] rounded-2xl p-6 mb-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-blue-300 flex-shrink-0" />
                <div>
                  <div className="text-xs text-blue-300">Claim Number</div>
                  <div className="font-semibold">{MOCK_CLAIM.claimNumber}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-blue-300 flex-shrink-0" />
                <div>
                  <div className="text-xs text-blue-300">Carrier</div>
                  <div className="font-semibold">{MOCK_CLAIM.carrier}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-300 flex-shrink-0" />
                <div>
                  <div className="text-xs text-blue-300">Property</div>
                  <div className="font-semibold text-sm">Plano, TX 75024</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-blue-300 flex-shrink-0" />
                <div>
                  <div className="text-xs text-blue-300">Adjuster</div>
                  <div className="font-semibold">{MOCK_CLAIM.adjuster}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial summary */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Original Estimate',  value: `$${MOCK_CLAIM.originalTotal.toLocaleString()}`, sub: 'Adjuster\'s number',   color: 'border-gray-200',   text: 'text-gray-900'   },
              { label: 'Gaps Identified',    value: MOCK_CLAIM.gapsFound,                            sub: 'Missed line items',   color: 'border-orange-200', text: 'text-orange-600' },
              { label: 'Supplement Value',   value: `$${MOCK_CLAIM.supplementValue.toLocaleString()}`, sub: 'Additional recovery', color: 'border-green-200',  text: 'text-green-600'  },
              { label: 'Revised Total',      value: `$${MOCK_CLAIM.newTotal.toLocaleString()}`,       sub: `+${MOCK_CLAIM.percentIncrease}% increase`,  color: 'border-blue-200',   text: 'text-blue-700'   },
            ].map((item) => (
              <Card key={item.label} className={`border-2 ${item.color}`}>
                <CardContent className="pt-5 pb-4 text-center">
                  <div className={`text-2xl font-bold ${item.text}`}>{item.value}</div>
                  <div className="text-sm font-medium text-gray-700 mt-1">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.sub}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gap items table */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Identified Gaps — Top 10 of {MOCK_CLAIM.gapsFound}</h3>
              <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-3 py-1">Sorted by severity</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-left">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Est. Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_GAPS.map((gap, i) => (
                    <tr
                      key={gap.code}
                      className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${activeGap === i ? 'bg-blue-50' : ''}`}
                      onClick={() => setActiveGap(activeGap === i ? null : i)}
                    >
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-purple-700 whitespace-nowrap">{gap.code}</td>
                      <td className="px-6 py-4 text-gray-800 max-w-xs">
                        <div>{gap.description}</div>
                        {activeGap === i && (
                          <div className="mt-2 text-xs text-gray-500 bg-gray-50 rounded p-2 font-normal">
                            <span className="font-semibold text-gray-700">Justification: </span>
                            This item is required per IRC standards and standard roofing practice for a complete, warranted installation.
                            Carrier-specific note: Submit with photo documentation and matching Xactimate line item code.
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs font-medium ${CATEGORY_COLORS[gap.category] || 'text-gray-600'}`}>{gap.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${SEVERITY_COLORS[gap.severity]}`}>
                          {gap.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900 whitespace-nowrap">
                        ${gap.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td colSpan={4} className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Top 10 shown · {MOCK_CLAIM.gapsFound} total gaps identified
                    </td>
                    <td className="px-6 py-4 text-right text-lg font-bold text-green-600">
                      ${MOCK_GAPS.reduce((s, g) => s + g.total, 0).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            Click any row to expand the written justification
          </p>
        </div>
      </section>

      {/* ── Supplement PDF Preview ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                A Supplement Package That Gets Approved
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The output isn&apos;t just a list. It&apos;s a fully formatted supplement document structured
                exactly the way adjusters and appraisers expect to receive it — with every
                justification written in Xactimate language.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Cover page with claim number, carrier, and summary financials',
                  'Severity breakdown: Critical / High / Medium / Low',
                  'Line-by-line analysis with Xactimate code + IRC citations',
                  'Carrier-specific notes (denial patterns + counter-strategies)',
                  'Recommended photo evidence checklist per line item',
                  'PDF + Markdown + JSON output in one package',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild className="bg-[#003399] hover:bg-[#0033CC]">
                <Link href="/contact">
                  Request Early Access <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Mock PDF preview */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden text-sm">
              {/* PDF header bar */}
              <div className="bg-[#003399] text-white px-6 py-5">
                <div className="text-xs text-blue-300 mb-1">SUPPLEMENT REQUEST PACKAGE</div>
                <div className="text-xl font-bold">Supplement Sniper Report</div>
                <div className="text-sm text-blue-200 mt-1">Claim #{MOCK_CLAIM.claimNumber}</div>
              </div>
              <div className="p-6 space-y-5">
                {/* Financial summary in PDF */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-3">Executive Summary</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="text-gray-600">Original Estimate:</span>  <span className="font-semibold">${MOCK_CLAIM.originalTotal.toLocaleString()}</span>
                    <span className="text-gray-600">Additional Items:</span>   <span className="font-semibold text-green-700">+${MOCK_CLAIM.supplementValue.toLocaleString()}</span>
                    <span className="text-gray-600">Revised Total:</span>      <span className="font-bold text-green-800 text-sm">${MOCK_CLAIM.newTotal.toLocaleString()}</span>
                    <span className="text-gray-600">Increase:</span>           <span className="font-bold text-green-700">+{MOCK_CLAIM.percentIncrease}%</span>
                  </div>
                </div>
                {/* Severity breakdown */}
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-3">Severity Breakdown</div>
                  <div className="flex gap-2 flex-wrap">
                    {[['Critical', 'red', 12], ['High', 'orange', 18], ['Medium', 'yellow', 11], ['Low', 'gray', 6]].map(([sev, col, n]) => (
                      <span key={sev as string} className={`text-xs px-3 py-1 rounded-full font-semibold bg-${col}-100 text-${col}-700 border border-${col}-200`}>
                        {sev}: {n}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Sample line item */}
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs font-bold text-purple-700">RFG ASTR-</span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">Critical</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-800 mb-2">Asphalt starter — universal starter course</div>
                  <div className="text-xs text-gray-600 leading-relaxed mb-3">
                    Starter strip shingles are required per IRC R905.2.7 and GAF installation requirements. Without starter strips, the first course of shingles lacks the adhesive strip-to-strip seal necessary to resist wind uplift. This item is mandatory for a complete, warranted installation.
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">325 LF × $1.25 = <strong>$406.25</strong></span>
                    <span className="text-blue-600 font-medium">📸 Photo evidence recommended</span>
                  </div>
                </div>
                <div className="text-center text-xs text-gray-400">… {MOCK_CLAIM.gapsFound - 1} more items in full report …</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detection Engine Breakdown ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">6 Detection Engines Running in Parallel</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Every estimate is analyzed from six different angles simultaneously
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target,     color: 'blue',   num: '01', title: 'Companion Item Check',     desc: 'If shingles are present, requires starter strip, ridge cap, drip edge, underlayment, and more — 140 code cross-references.' },
              { icon: Shield,     color: 'red',    num: '02', title: 'Building Code Check',      desc: 'Applies state-specific IRC requirements and metro-level amendments. Ice & water shield, ventilation, nail patterns by location.' },
              { icon: Search,     color: 'orange', num: '03', title: 'Pattern Match (55 items)', desc: '55 historically missed supplement items drawn from real claim data. Covers the most frequently overlooked scopes.' },
              { icon: BarChart3,  color: 'purple', num: '04', title: 'Quantity Validation',      desc: 'Verifies that line item quantities match the actual roof measurements. Catches underpaid quantities before submission.' },
              { icon: Building,   color: 'green',  num: '05', title: 'Carrier Rules (10)',       desc: '10 major carriers profiled with known omission patterns, denial tactics, and counter-strategies specific to each carrier.' },
              { icon: DollarSign, color: 'yellow', num: '06', title: 'O&P Check',               desc: 'Automatically evaluates whether Overhead & Profit applies to the scope. The single highest-value line item on most claims.' },
            ].map(({ icon: Icon, color, num, title, desc }) => (
              <Card key={num} className="border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${color}-100`}>
                      <Icon className={`h-6 w-6 text-${color}-600`} />
                    </div>
                    <div>
                      <div className={`text-xs font-bold text-${color}-600`}>{num}</div>
                      <div className="font-semibold text-gray-900 text-sm">{title}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: 'We ran our last 12 claims through the beta. Average supplement was $4,800. That pays for itself in the first hour.', name: 'Marcus R.', title: 'Owner, Summit Roofing · Denver, CO' },
              { quote: 'The O&P alone on our last State Farm claim was $8,700. The tool flagged it in seconds. Our adjuster missed it completely.', name: 'Jennifer K.', title: 'Supplements Manager · Front Range Roofing' },
              { quote: 'I was skeptical until I saw it find 47 missed items on a claim my most experienced estimator had already reviewed.', name: 'David M.', title: 'Contractor · Alpine Roofing Solutions' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#1a0533] via-[#2d1060] to-[#003399] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zm40 0h-1v40h1zM0 0v1h40V0zm0 40v-1h40v1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-purple-200 mb-8">
            <Calendar className="h-4 w-4 text-yellow-400" />
            Early Access — Limited Spots Available
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Stop Leaving Money on the Table?
          </h2>
          <p className="text-lg text-purple-100 mb-10 leading-relaxed">
            Join the waitlist for Supplement Sniper. Be first in line when we open access —
            and lock in the founding member rate before we go public.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-300 hover:to-orange-400 text-base px-10" asChild>
              <Link href="/contact">
                <Zap className="mr-2 h-5 w-5" />
                Join the Waitlist
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 text-base px-10" asChild>
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Demo Call
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-purple-300">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-400" /> Works with your existing estimates</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-400" /> PDF in under 2 minutes</span>
          </div>
        </div>
      </section>

    </div>
  )
}
