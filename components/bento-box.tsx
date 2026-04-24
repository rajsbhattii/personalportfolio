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
  const [isClosing, setIsClosing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 200)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={`group relative bg-card border border-border rounded-lg transition-all duration-300 hover:border-foreground/20 hover:shadow-sm cursor-pointer ${className}`}
      >
        <span className="absolute bottom-3 left-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </span>
      </button>

      {/* Modal Portal */}
      {mounted && isOpen && createPortal(
        <>
          {/* Blur Overlay - light tint so grid shows through */}
          <div
            className={`fixed inset-0 z-40 bg-background/15 backdrop-blur-[1px] transition-all duration-300 ${
              isClosing ? "opacity-0" : "opacity-100"
            }`}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-6 lg:p-8"
          >
            <div
              className={`relative w-full max-w-2xl h-[70vh] bg-card border border-border rounded-xl shadow-2xl pointer-events-auto transition-all duration-300 ease-out ${
                isClosing 
                  ? "opacity-0 scale-95" 
                  : "opacity-100 scale-100"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-border">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {label}
                </span>
              </div>

              {/* Scrollable Content */}
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
