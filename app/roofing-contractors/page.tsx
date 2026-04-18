import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'

const BASE_URL = 'https://alpinepeakroofing.com'
const PAGE_URL = `${BASE_URL}/roofing-contractors`

export const metadata: Metadata = {
  title: 'AI Toolsets for Roofing Contractors | Agentic Personnel',
  description:
    'A demo of what Agentic Personnel builds for roofing contractors: missed call recovery, smart follow-up, and dashboard visibility.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'AI Toolsets for Roofing Contractors | Agentic Personnel',
    description:
      'Missed call recovery, smart follow-up, and full dashboard visibility — built by Agentic Personnel for roofing contractors.',
    url: PAGE_URL,
    type: 'website',
  },
}

function RoofingContractorsSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Toolsets for Roofing Contractors',
    url: PAGE_URL,
    description:
      'Demo showcasing AI-powered tools for roofing contractors: missed call recovery, smart follow-up automation, and CRM dashboard.',
    about: {
      '@type': 'SoftwareApplication',
      name: 'Agentic Personnel Roofing Automation Platform',
      applicationCategory: 'BusinessApplication',
      description:
        'AI-powered automation stack for roofing contractors: missed call recovery, lead follow-up, and dashboard visibility.',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function RoofingContractorsLandingPage() {
  return (
    <>
      <RoofingContractorsSchema />
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
          Demo Site • Built by Agentic Personnel
        </div>

        <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
          Intelligent Systems for Roofing Contractors
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-white/80">
          This website is a live demo of the kind of premium web + automation stack we build for roofing companies.
          The goal is simple: recover missed leads, automate follow-up, and give you full visibility—without adding
          chaos to your day.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="bg-white text-slate-950 hover:bg-white/90">
            <a href="#demo">Watch 90-sec demo</a>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <a href="#book">Book a call</a>
          </Button>
          <Button asChild variant="ghost" className="text-white/80 hover:bg-white/10">
            <Link href="/ai-chat">Chat with our AI</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium">Missed Call Recovery</h3>
            <p className="mt-2 text-sm text-white/80">
              If you miss a call, the system follows up in under 60 seconds so you don’t lose the job to the next
              contractor.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium">Smart Follow-Up</h3>
            <p className="mt-2 text-sm text-white/80">
              Automated SMS/email follow-up over 10–14 days until booked or opted out—no more leads falling through
              the cracks.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium">Dashboard Visibility</h3>
            <p className="mt-2 text-sm text-white/80">
              Everything lands in your CRM so you can see what’s happening: calls, leads, bookings, and follow-ups.
            </p>
          </div>
        </div>

        <section id="demo" className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Demo</h2>
          <p className="mt-2 text-sm text-white/80">
            We’ll drop the 90-second demo video here. For now this is a placeholder.
          </p>
        </section>

        <section id="book" className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Book a call</h2>
          <p className="mt-2 text-sm text-white/80">
            Placeholder CTA. We’ll wire this to your preferred booking flow (Calendly/Google Calendar) once confirmed.
          </p>
        </section>

        <p className="mt-10 text-sm text-white/60">
          Want to see the live assistant? Try the <Link href="/ai-chat" className="underline">AI Chat</Link>.
        </p>
      </section>
    </main>
    </>
  )
}
