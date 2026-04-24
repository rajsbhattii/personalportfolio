"use client"

const languages = ["Python", "JavaScript", "TypeScript", "SQL", "Java", "C++", "C#", "C", "Ruby", "R"]
const frameworks = ["React.js", "Next.js", "Node.js", "ASP.NET", "pandas", "PyTorch", "TensorFlow", "MapBox"]
const tools = ["Git", "MySQL", "PostgreSQL", "Firebase", "AWS", "Docker", "Tableau", "Postman", "OpenAI API", "BigQuery", "Azure"]

function TickerRow({ items, direction = "left" }: { items: string[], direction?: "left" | "right" }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-2 w-max group-hover:[animation-play-state:paused] ${direction === "left" ? "animate-ticker-left" : "animate-ticker-right"}`}>
        {doubled.map((item, i) => (
          <span key={i} className="px-2.5 py-1 text-sm bg-muted rounded text-muted-foreground whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillsBox({ className = "" }: { className?: string }) {
  return (
    <div className={`group relative bg-card border border-border rounded-lg overflow-hidden flex flex-col justify-center gap-3 pb-8 ${className}`}>
      <span className="absolute bottom-3 left-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
        Skills
      </span>
      <TickerRow items={languages} direction="left" />
      <TickerRow items={frameworks} direction="right" />
      <TickerRow items={tools} direction="left" />
    </div>
  )
}
