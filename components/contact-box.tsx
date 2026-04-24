"use client"

import { useState } from "react"
import { Mail, Copy, Check } from "lucide-react"

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const EMAIL = "rajsbhattii@gmail.com"
const GITHUB_URL = "https://github.com/example"
const LINKEDIN_URL = "https://linkedin.com/in/example"

export function ContactBox({ className = "" }: { className?: string }) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      onClick={() => setIsRevealed(v => !v)}
      className={`group relative bg-card border border-border rounded-lg transition-all duration-300 hover:border-foreground/20 hover:shadow-sm cursor-pointer overflow-hidden ${className}`}
    >
      {/* Default label */}
      <span className={`absolute bottom-3 left-3 text-xs text-muted-foreground font-medium uppercase tracking-wider transition-opacity duration-300 ${isRevealed ? "opacity-0" : "opacity-100"}`}>
        Contact
      </span>

      {/* Revealed content */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 p-4">
        {/* Email row — appears first */}
        <div className={`flex items-center gap-2 transition-all duration-300 ${isRevealed ? "opacity-100 translate-y-0 delay-0" : "opacity-0 translate-y-1 delay-0"}`}>
          <a
            href={`mailto:${EMAIL}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground transition-colors min-w-0"
          >
            <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">{EMAIL}</span>
          </a>
          <button
            onClick={handleCopy}
            className="ml-auto shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied
              ? <Check className="w-3.5 h-3.5 text-foreground" />
              : <Copy className="w-3.5 h-3.5" />
            }
          </button>
        </div>

        {/* Social icons — appears second */}
        <div className={`flex items-center gap-3 transition-all duration-300 ${isRevealed ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-1 delay-0"}`}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitHubIcon />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  )
}