import { TECH_ICONS } from '@/lib/tech-icons'

const TECHS = Object.entries(TECH_ICONS).filter(([, src], i, arr) =>
  arr.findIndex(([, s]) => s === src) === i
).map(([label, src]) => ({ label, src }))

export function TechMarquee() {
  const items = [...TECHS, ...TECHS]

  return (
    <div className="relative overflow-hidden py-4 max-w-5xl mx-auto" aria-hidden="true">
      <div
        className="flex gap-4 w-max"
        style={{ animation: 'marquee 60s linear infinite' }}
      >
        {items.map((tech, i) => (
          <div
            key={`${tech.label}-${i}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card shadow-card flex-shrink-0 hover:border-primary/40 hover:shadow-glow transition-all duration-200"
          >
            <img
              src={tech.src}
              alt={tech.label}
              className="w-4 h-4 object-contain flex-shrink-0"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{tech.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
