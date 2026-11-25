import { createRoute, useNavigate } from '@tanstack/react-router'
import { Route as rootRoute } from '../__root'
import { useProject } from '@/features/projects/queries'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { TECH_ICONS } from '@/lib/tech-icons'

const CATEGORY_COLORS: Record<string, string> = {
  fintech:   'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  cloud:     'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  ai:        'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  data:      'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  fullstack: 'bg-primary/10 text-primary border-primary/20',
}

function categoryLabel(c: string) {
  if (c === 'ai') return 'AI / ML'
  if (c === 'data') return 'Data Eng.'
  return c.charAt(0).toUpperCase() + c.slice(1)
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/$id',
  component: ProjectPage,
})

function ProjectPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { data: project, isLoading } = useProject(id)

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Project not found.</p>
        <button onClick={() => navigate({ to: '/' })} className="text-primary hover:underline text-sm">Back home</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => navigate({ to: '/', hash: 'projects' })}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={13} /> Back to Projects
        </motion.button>

        {/* Equal two-column grid */}
        <div className="grid lg:grid-cols-2 gap-4 items-stretch">

          {/* LEFT — image + tech stack + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-card shadow-card overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-accent">
                  <span className="text-5xl font-bold text-brand-gradient">{project.title[0]}</span>
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col gap-4 flex-1">
              {/* Tech stack */}
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span key={t} className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full bg-accent border border-border text-accent-foreground font-medium">
                      {TECH_ICONS[t] && (
                        <img src={TECH_ICONS[t]} alt={t} className="w-3.5 h-3.5 object-contain flex-shrink-0"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      )}
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-2 pt-1 border-t border-border/50 mt-auto justify-center">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2 rounded-full bg-brand-gradient text-white text-xs font-semibold shadow-glow hover:opacity-90 transition-opacity">
                    Visit Project <ArrowUpRight size={12} />
                  </a>
                )}
                {project.appStoreUrl && (
                  <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2 rounded-full border border-border bg-accent text-xs font-medium hover:bg-muted transition-colors">
                    App Store <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — categories + title + description + highlights + metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-card shadow-card p-5 flex flex-col gap-5 h-full"
          >
            {/* Categories + title */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.category.map(c => (
                  <span key={c} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[c] ?? 'bg-accent text-accent-foreground border-border'}`}>
                    {categoryLabel(c)}
                  </span>
                ))}
              </div>
              <h1 className="text-lg sm:text-xl font-bold leading-snug">{project.title}</h1>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{project.description}</p>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">Key Highlights</p>
                <ul className="space-y-2">
                  {project.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Metrics */}
            {project.metrics.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">Impact & Scale</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {project.metrics.map(m => (
                    <div key={m} className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-accent border border-border text-[11px] text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
