"use client"

import { useState, useEffect } from "react"
import { X, User, Play, Pause, Rewind, FastForward, Volume2 } from "lucide-react"
import { createPortal } from "react-dom"

const roles = ["Software Engineer", "Full Stack Developer", "Data Engineer", "Photographer", "Creative", "Designer", "Tech Enthusiast"]

export function AboutBox({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [displayText, setDisplayText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

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
                <div className="flex gap-10">
                  {/* Bio */}
                  <div className="flex-1 space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>Hey, I'm Raj, a software engineer & photographer based in Toronto. I'm at Western University for Computer Science, and alongside that, it's just been a lot of building things, hitting the gym, and eating well.</p>
                    <p>On the tech side, I'm a Full Stack Developer at Scotiabank right now, building stuff that ends up in front of a lot of people in Global Wealth Engineering. Outside of work, I love to build products that solves real problems and creates change.</p>
                    <p>Photography came from two things I've always loved, cars and art. I wanted a way to actually do something with that, not just admire it from the sidelines. That love eventually led me to pursue photography as a passion, and now capturing memories is what I do.</p>
                  </div>

                  {/* Quick facts */}
                  <div className="w-44 shrink-0 space-y-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-1">Location</p>
                      <p className="text-sm text-foreground">Toronto, Ontario</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-1">Education</p>
                      <p className="text-sm text-foreground">Western University</p>
                      <p className="text-xs text-muted-foreground mt-0.5">B.S. Computer Science</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-1">Currently</p>
                      <p className="text-sm text-foreground">Full Stack Developer @ Scotiabank</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-1">Interests</p>
                      <p className="text-sm text-foreground">Building things, staying healthy, capturing memories</p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-sm text-foreground border border-border rounded-md px-3 py-1.5 hover:bg-muted transition-colors"
                    >
                      Resume <span className="text-muted-foreground">↗</span>
                    </a>
                  </div>
                </div>

                {/* Now Listening To */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Now Listening To</p>
                    <div className="flex items-end gap-0.5 h-3">
                      {[0, 150, 300].map((delay) => (
                        <div
                          key={delay}
                          className="w-0.5 rounded-full bg-muted-foreground/40 animate-bounce"
                          style={{ height: "10px", animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-stretch gap-4">
                    {/* Album art — width drives height via aspect-square */}
                    <div className="w-24 aspect-square rounded-lg bg-muted shrink-0" />

                    {/* Track info */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      {/* Row 1: Song name + controls + volume */}
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground truncate flex-1 min-w-0">Song Name</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => {}} className="text-muted-foreground hover:text-foreground transition-colors">
                            <Rewind className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setIsPlaying(p => !p)}
                            className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors"
                          >
                            {isPlaying
                              ? <Pause className="w-3 h-3 text-background" />
                              : <Play className="w-3 h-3 text-background ml-0.5" />
                            }
                          </button>
                          <button onClick={() => {}} className="text-muted-foreground hover:text-foreground transition-colors">
                            <FastForward className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Volume2 className="w-3 h-3 text-muted-foreground" />
                          <input type="range" min="0" max="100" defaultValue="70" className="w-16 accent-foreground cursor-pointer" />
                        </div>
                      </div>

                      {/* Artist + Album — tight to song name */}
                      <div className="mt-0.5">
                        <p className="text-xs text-muted-foreground leading-none">Artist Name</p>
                        <p className="text-xs text-muted-foreground/50 leading-none mt-2">Album Name</p>
                      </div>

                      {/* Progress bar + Spotify logo */}
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-xs text-muted-foreground tabular-nums">1:23</span>
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div className="w-[35%] h-full bg-foreground/60 rounded-full" />
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums">3:45</span>
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.972c3.632-1.102 8.147-.568 11.233 1.328a.78.78 0 01.257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 11-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 01-.954 1.608z" fill="#1DB954"/>
                        </svg>
                      </div>
                    </div>
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
