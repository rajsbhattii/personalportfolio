"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

const experiences = [
  {
    company: "Scotiabank",
    role: "Full Stack Engineer",
    period: "Sept. 2026 – Present",
    description: "Incoming full-time @ Scotiabank.",
  },
  {
    company: "Scotiabank",
    role: "Software Engineer Intern",
    period: "Sept. 2025 – Aug. 2026",
    description: "Simplifying client onboarding and maintenance with a new, dynamic document generation tool.",
  },
  {
    company: "Scotiabank",
    role: "Data Engineer Intern",
    period: "May 2025 – Aug. 2025",
    description: "Automating risk reporting and analytics pipelines to deliver real-time executive insights across enterprise data systems.",
  },
  {
    company: "Western Developer Society",
    role: "Full Stack Developer",
    period: "Oct. 2024 – May 2025",
    description: "Navigating campus accessibility with an AI-powered, voice-enabled mobile app for seamless multi-building routing.",
  },
]

export function WorkBox({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  return (
    <>
      <button
        onClick={handleOpen}
        className={`w-full h-full text-left bg-card border border-border rounded-lg transition-all duration-300 hover:border-foreground/20 hover:shadow-sm cursor-pointer relative ${className}`}
      >
        {/* Mini timeline skeleton */}
        <div className="absolute inset-0 flex items-center justify-center pb-6">
          <div className="relative h-[80%] w-full px-4 flex flex-col justify-between">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />
            {Array.from({ length: 5 }).map((_, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={i} className="relative grid grid-cols-2">
                  <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-2 h-2 rounded-full border-2 border-border bg-background z-10" />
                  {isLeft ? (
                    <>
                      <div className="pr-4 flex flex-col items-end gap-1">
                        <div className="h-2 w-16 bg-muted rounded" />
                        <div className="h-1.5 w-10 bg-muted/60 rounded" />
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div className="pl-4 flex flex-col gap-1">
                        <div className="h-2 w-16 bg-muted rounded" />
                        <div className="h-1.5 w-10 bg-muted/60 rounded" />
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <span className="absolute bottom-3 left-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Work
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
                  Work
                </span>
              </div>

              <div className="p-6 overflow-y-auto h-[calc(70vh-80px)]">
                <div className="relative">
                  {/* Center vertical stem */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

                  {experiences.map((exp, i) => {
                    const isLeft = i % 2 === 0
                    return (
                      <div key={i} className={`relative grid grid-cols-2 ${i < experiences.length - 1 ? "mb-10" : ""}`}>
                        {/* Dot on center stem */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background z-10" />

                        {isLeft ? (
                          <>
                            {/* Content on left, right-aligned */}
                            <div className="pr-6 text-right">
                              <p className="text-sm font-medium text-foreground">{exp.company}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{exp.role}</p>
                              <p className="text-xs text-muted-foreground tabular-nums mt-1">{exp.period}</p>
                              <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">{exp.description}</p>
                            </div>
                            <div />
                          </>
                        ) : (
                          <>
                            <div />
                            {/* Content on right, left-aligned */}
                            <div className="pl-6">
                              <p className="text-sm font-medium text-foreground">{exp.company}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{exp.role}</p>
                              <p className="text-xs text-muted-foreground tabular-nums mt-1">{exp.period}</p>
                              <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">{exp.description}</p>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
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
