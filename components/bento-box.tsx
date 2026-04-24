"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

interface BentoBoxProps {
  id: string
  label: string
  className?: string
}

export function BentoBox({ id, label, className = "" }: BentoBoxProps) {
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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <>
      <button
        data-section={id}
        onClick={handleOpen}
        className={`group relative bg-card border border-border rounded-lg transition-all duration-300 hover:border-foreground/20 hover:shadow-sm cursor-pointer ${className}`}
      >
        <span className="absolute bottom-3 left-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
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
                  {label}
                </span>
              </div>

              <div className="p-6 overflow-y-auto h-[calc(70vh-80px)]">
                <div className="space-y-4 text-muted-foreground">
                  <p>Content for {label} goes here.</p>
                  <div className="h-[200vh] bg-muted/20 rounded-lg flex items-start justify-center pt-12">
                    <span className="text-sm">Scrollable area</span>
                  </div>
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