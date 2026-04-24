"use client"

import { useState, useEffect } from "react"
import { X, User } from "lucide-react"
import { createPortal } from "react-dom"

const roles = ["Software Engineer", "Full Stack Developer", "Data Engineer", "Photographer", "Designer", "Tech Enthusiast"]

export function AboutBox({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [displayText, setDisplayText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
        )
      }, isDeleting ? 50 : 100)
    }

    return () => clearTimeout(timeout)
  }, [displayText, roleIndex, isDeleting])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 200)
  }

  const handleOpen = () => {
    setIsOpen(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true))
    })
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <>
      <button
        onClick={handleOpen}
        className={`w-full h-full text-left bg-card border border-border rounded-lg transition-all duration-300 hover:border-foreground/20 hover:shadow-sm cursor-pointer relative ${className}`}
      >
        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-start justify-center gap-3 p-6 pb-10">
          {/* Photo placeholder */}
          <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <User className="w-9 h-9 text-muted-foreground/40" />
          </div>

          {/* Name */}
          <p className="text-7xl font-bold text-foreground tracking-tight leading-none">
            Raj Bhatti
          </p>

          {/* Typing animation */}
          <p className="text-xl text-muted-foreground h-7 flex items-center gap-0.5 p-1">
            <span>{displayText}</span>
            <span className="animate-pulse">|</span>
          </p>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground/60 leading-relaxed p-1">
            building things, capturing moments
          </p>
        </div>

        {/* Label */}
        <span className="absolute bottom-3 left-6 text-xs text-muted-foreground font-medium uppercase tracking-wider">
          About
        </span>
      </button>

      {mounted && isOpen && createPortal(
        <>
          <div
            className={`fixed inset-0 z-40 bg-background/15 backdrop-blur-[1px] transition-all duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-6 lg:p-8">
            <div
              className={`relative w-full max-w-2xl h-[70vh] bg-card border border-border rounded-xl shadow-2xl pointer-events-auto transition-all duration-300 ease-out ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="p-6 border-b border-border">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  About
                </span>
              </div>

              <div className="p-6 overflow-y-auto h-[calc(70vh-80px)]">
                <div className="space-y-4 text-muted-foreground">
                  <p>Content for About goes here.</p>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )
}
