/**
 * /admin — Internal admin hub
 */

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin — Alpine Peak Roofing',
  robots: { index: false, follow: false },
}

const LINKS = [
  {
    href: '/admin/estimates',
    title: 'Estimates Dashboard',
    desc: 'View all submitted roof estimates, pipeline totals, and customer links',
    badge: 'Live',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    href: '/admin/leads',
    title: 'Leads Dashboard',
    desc: 'All website leads — chat, estimator, and contact captures with lead scores',
    badge: 'Live',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    href: 'https://supabase.com/dashboard/project/adueyerxzutuuwtxyage/editor',
    title: 'Supabase Dashboard',
    desc: 'Direct database access — run SQL, view tables, check RLS policies',
    badge: 'External',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    external: true,
  },
  {
    href: 'https://vercel.com/jimihacks-projects',
    title: 'Vercel Deployments',
    desc: 'Deployment status, logs, environment variables, function analytics',
    badge: 'External',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    external: true,
  },
  {
    href: 'https://app.resend.com',
    title: 'Resend Email Logs',
    desc: 'View sent emails, delivery status, and bounce/complaint reports',
    badge: 'External',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    external: true,
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-[#1a3a5c] border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-0.5">Alpine Peak Roofing</p>
            <h1 className="text-2xl font-bold">Admin Hub</h1>
          </div>
          <Link href="/" className="text-amber-400 hover:text-amber-300 text-sm transition-colors">← Site</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/40 rounded-xl px-6 py-5 transition-all group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {link.title}
                  </h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${link.badgeColor}`}>
                    {link.badge}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{link.desc}</p>
              </div>
              <span className="text-gray-500 group-hover:text-amber-400 transition-colors text-lg ml-4">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-xs text-gray-600 text-center">
          Internal use only · Not indexed · Alpine Peak Roofing
        </div>
      </div>
    </div>
  )
}
