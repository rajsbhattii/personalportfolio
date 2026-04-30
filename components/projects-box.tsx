"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

type LineType = "cmd" | "out" | "gap" | "links"
type TermLine = { type: LineType; text: string }

type Project = {
  name: string
  description: string[]
  tech: string[]
  github: string
  live: string | null
}

const projects: Project[] = [
  {
    name: "orbit",
    description: [
      "Cloud-native productivity platform for task management,",
      "AI time-blocking, and OCR/NLP deadline extraction.",
    ],
    tech: ["Next.js", "Python", "AWS", "Google Calendar API"],
    github: "#",
    live: "#",
  },
  {
    name: "ledgerlens",
    description: [
      "Backend-first personal finance platform enforcing",
      "double-entry invariants with an async event pipeline.",
    ],
    tech: ["Ruby on Rails", "PostgreSQL", "Redis", "Sidekiq"],
    github: "#",
    live: null,
  },
  {
    name: "nba-predict",
    description: [
      "Predictive models forecasting NBA award winners (MVP,",
      "DPOY) with ~80% accuracy on multi-season datasets.",
    ],
    tech: ["Python", "scikit-learn", "PostgreSQL", "Tableau"],
    github: "#",
    live: null,
  },
]

function buildLines(p: Project): TermLine[] {
  return [
    { type: "cmd", text: "cat README.md" },
    ...p.description.map(d => ({ type: "out" as LineType, text: d })),
    { type: "gap", text: "" },
    { type: "cmd", text: "ls ./tech" },
    { type: "out", text: p.tech.join("   ") },
    { type: "gap", text: "" },
    { type: "cmd", text: "open --links" },
    { type: "links", text: "" },
  ]
}

function LineRow({ line, project }: { line: TermLine; project: Project }) {
  if (line.type === "gap") return <div className="h-3" />
  if (line.type === "links") {
    return (
      <div className="flex gap-6 pl-2 mt-1">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          github ↗
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            live ↗
          </a>
        )}
      </div>
    )
  }
  if (line.type === "cmd") {
    return (
      <div className="font-mono text-sm leading-relaxed">
        <span className="text-emerald-400">$</span>
        <span className="text-zinc-100"> {line.text}</span>
      </div>
    )
  }
  return (
    <div className="font-mono text-sm leading-relaxed text-zinc-400 pl-2">
      {line.text}
    </div>
  )
}

export function ProjectsBox({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [committedLines, setCommittedLines] = useState<TermLine[]>([])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 200)
  }

  const handleOpen = () => {
    setCommittedLines([])
    setLineIndex(0)
    setCharIndex(0)
    setActiveTab(0)
    setIsOpen(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)))
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  useEffect(() => {
    setCommittedLines([])
    setLineIndex(0)
    setCharIndex(0)
  }, [activeTab])

  useEffect(() => {
    if (!isOpen) return
    const lines = buildLines(projects[activeTab])
    if (lineIndex >= lines.length) return

    const line = lines[lineIndex]

    if (line.type === "gap" || line.type === "links") {
      const t = setTimeout(() => {
        setCommittedLines(prev => [...prev, line])
        setLineIndex(i => i + 1)
        setCharIndex(0)
      }, 80)
      return () => clearTimeout(t)
    }

    const fullText = (line.type === "cmd" ? "$ " : "  ") + line.text

    if (charIndex < fullText.length) {
      const t = setTimeout(
        () => setCharIndex(c => c + 1),
        line.type === "cmd" ? 40 : 20
      )
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      setCommittedLines(prev => [...prev, line])
      setLineIndex(i => i + 1)
      setCharIndex(0)
    }, 120)
    return () => clearTimeout(t)
  }, [lineIndex, charIndex, activeTab, isOpen])

  const lines = buildLines(projects[activeTab])
  const isDone = lineIndex >= lines.length
  const currentLine = !isDone ? lines[lineIndex] : null

  let partialDisplay: React.ReactNode = null
  if (currentLine && currentLine.type !== "gap" && currentLine.type !== "links") {
    const prefix = currentLine.type === "cmd" ? "$ " : "  "
    const partial = (prefix + currentLine.text).slice(0, charIndex)
    if (currentLine.type === "cmd") {
      partialDisplay = (
        <div className="font-mono text-sm leading-relaxed">
          <span className="text-emerald-400">{partial.slice(0, 1)}</span>
          <span className="text-zinc-100">{partial.slice(1)}</span>
        </div>
      )
    } else {
      partialDisplay = (
        <div className="font-mono text-sm leading-relaxed text-zinc-400 pl-2">
          {partial.slice(2)}
        </div>
      )
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={`w-full h-full text-left bg-card border border-border rounded-lg transition-all duration-300 hover:border-foreground/20 hover:shadow-sm cursor-pointer relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 flex items-center justify-center pb-6 px-3">
          <div className="w-full rounded-md bg-[#0d1117] p-2.5 space-y-1.5">
            <div className="flex gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-green-500/70" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-emerald-400/80">$</span>
              <div className="h-1.5 w-16 bg-zinc-700 rounded" />
            </div>
            <div className="h-1.5 w-28 bg-zinc-800 rounded ml-3" />
            <div className="h-1.5 w-20 bg-zinc-800 rounded ml-3" />
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-[10px] text-emerald-400/80">$</span>
              <div className="h-1.5 w-10 bg-zinc-700 rounded" />
            </div>
            <div className="flex items-center gap-0.5 mt-0.5 ml-0.5">
              <div className="w-1.5 h-3 bg-emerald-400/50 animate-pulse rounded-sm" />
            </div>
          </div>
        </div>
        <span className="absolute bottom-3 left-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Projects
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
              className={`relative w-full max-w-2xl h-[70vh] bg-[#0d1117] border border-zinc-800 rounded-xl shadow-2xl pointer-events-auto transition-all duration-300 ease-out flex flex-col overflow-hidden ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal navbar */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#1c1c1e] border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleClose}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {projects.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => setActiveTab(i)}
                      className={`px-2 py-0.5 rounded font-mono text-xs transition-colors ${
                        activeTab === i
                          ? "text-zinc-100 bg-zinc-700/50"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-0.5">
                {committedLines.map((line, i) => (
                  <LineRow key={i} line={line} project={projects[activeTab]} />
                ))}
                {partialDisplay}
                {isDone && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-mono text-sm text-emerald-400">$</span>
                    <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse rounded-sm" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )
}
