export function GalleryBox({ className = "" }: { className?: string }) {
  return (
    <div className={`border border-border rounded-lg overflow-hidden flex flex-col ${className}`}>
      {/* Image grid */}
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

      {/* Label strip */}
      <div className="bg-card px-3 py-2.5 border-t border-border">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Gallery
        </span>
      </div>
    </div>
  )
}
