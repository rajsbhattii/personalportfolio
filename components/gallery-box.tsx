"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { createPortal } from "react-dom"

type GalleryImage = {
  publicId: string
  url: string
  width: number
  height: number
}

export function GalleryBox({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [lightboxVisible, setLightboxVisible] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loadedSet, setLoadedSet] = useState<Set<string>>(new Set())
  const fetchedRef = useRef(false)

  useEffect(() => { setMounted(true) }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 200)
  }

  const handleOpen = () => {
    setIsOpen(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)))
  }

  // Fetch images once on first open
  useEffect(() => {
    if (!isOpen || fetchedRef.current) return
    fetchedRef.current = true
    fetch("/api/gallery")
      .then(r => r.json())
      .then(d => { if (d.images) setImages(d.images) })
      .catch(err => console.error("Gallery fetch error:", err))
  }, [isOpen])

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    requestAnimationFrame(() => requestAnimationFrame(() => setLightboxVisible(true)))
  }

  const closeLightbox = () => {
    setLightboxVisible(false)
    setTimeout(() => setSelectedIndex(null), 200)
  }

  const handlePrev = useCallback(() => {
    setSelectedIndex(i => i === null ? null : (i - 1 + images.length) % images.length)
  }, [images.length])

  const handleNext = useCallback(() => {
    setSelectedIndex(i => i === null ? null : (i + 1) % images.length)
  }, [images.length])

  // Modal escape — skip if lightbox is open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedIndex === null) handleClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, selectedIndex])

  // Lightbox keyboard nav
  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selectedIndex, handlePrev, handleNext])

  const markLoaded = (publicId: string) => {
    setLoadedSet(prev => new Set([...prev, publicId]))
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={`w-full h-full text-left border border-border rounded-lg overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:border-foreground/20 hover:shadow-sm ${className}`}
      >
        {/* Image grid tile */}
        <div className="flex-1 flex flex-col gap-0.5 min-h-0">
          <div className="flex flex-1 gap-0.5">
            {[0, 1, 2].map(i => <div key={i} className="flex-1 bg-muted" />)}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex gap-0.5 w-[133.333%] -translate-x-[12.5%]">
              {[3, 4, 5, 6].map(i => <div key={i} className="flex-1 bg-muted" />)}
            </div>
          </div>
        </div>
        <div className="bg-card px-3 py-2.5 border-t border-border">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Gallery
          </span>
        </div>
      </button>

      {mounted && isOpen && createPortal(
        <>
          {/* Modal backdrop */}
          <div
            className={`fixed inset-0 z-40 bg-background/15 backdrop-blur-[1px] transition-all duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-6 lg:p-8">
            <div
              className={`relative w-full max-w-4xl h-[80vh] bg-card border border-border rounded-xl shadow-2xl pointer-events-auto transition-all duration-300 ease-out ${
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
                  Gallery
                </span>
              </div>

              <div className="p-4 overflow-y-auto h-[calc(80vh-80px)]">
                {images.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-xs text-muted-foreground">Loading...</span>
                  </div>
                ) : (
                  <div className="columns-3 gap-2">
                    {images.map((img, i) => (
                      <div
                        key={img.publicId}
                        className="break-inside-avoid mb-2 cursor-pointer group"
                        onClick={() => openLightbox(i)}
                      >
                        <img
                          src={img.url}
                          alt=""
                          style={{ aspectRatio: img.width / img.height }}
                          className={`w-full rounded-lg object-cover transition-[filter,opacity] duration-700 group-hover:opacity-70 ${
                            loadedSet.has(img.publicId) ? "grayscale-0" : "grayscale"
                          }`}
                          onLoad={() => markLoaded(img.publicId)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lightbox */}
          {selectedIndex !== null && (
            <>
              <div
                className={`fixed inset-0 z-[60] bg-background/90 backdrop-blur-sm transition-opacity duration-200 ${
                  lightboxVisible ? "opacity-100" : "opacity-0"
                }`}
                onClick={closeLightbox}
              />
              <div
                className={`fixed inset-0 z-[60] flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
                  lightboxVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 pointer-events-auto p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev() }}
                  className="absolute left-4 pointer-events-auto p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </button>

                <img
                  src={images[selectedIndex].url}
                  alt=""
                  className="pointer-events-auto max-w-[80vw] max-h-[80vh] rounded-xl object-contain"
                  onClick={(e) => e.stopPropagation()}
                />

                <button
                  onClick={(e) => { e.stopPropagation(); handleNext() }}
                  className="absolute right-4 pointer-events-auto p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {selectedIndex + 1} / {images.length}
                  </span>
                </div>
              </div>
            </>
          )}
        </>,
        document.body
      )}
    </>
  )
}
