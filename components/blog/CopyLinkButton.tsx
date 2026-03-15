'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'

interface CopyLinkButtonProps {
  url: string
}

export default function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2 border text-xs font-semibold transition-all ${
        copied
          ? 'bg-green-500/20 border-green-500/40 text-green-400'
          : 'bg-white/5 hover:bg-gold/10 hover:border-gold/40 border-white/10 text-white/70 hover:text-gold'
      }`}
      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      aria-label={copied ? 'Link copied!' : 'Copy link to clipboard'}
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  )
}
