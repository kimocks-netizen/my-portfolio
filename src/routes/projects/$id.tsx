import { createRoute, useNavigate } from '@tanstack/react-router'
import { Route as rootRoute } from '../__root'
import { useProject } from '@/features/projects/queries'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'

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
    <div className="h-screen pt-16 bg-background overflow-hidden flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-3 flex flex-col min-h-0 gap-3">

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

        {/* Main grid — left: image + tech, right: all details */}
        <div className="flex-1 grid lg:grid-cols-[1.1fr_0.9fr] gap-5 min-h-0">

          {/* LEFT — image on top, tech stack below */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 min-h-0"
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card" style={{ height: '52%' }}>
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-accent">
                  <span className="text-5xl font-bold text-brand-gradient">{project.title[0]}</span>
                </div>
              )}
            </div>

            {/* CTAs — below image, outside */}
            <div className="flex gap-2 flex-shrink-0">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-brand-gradient text-white text-xs font-semibold shadow-glow hover:opacity-90 transition-opacity">
                  Visit Project <ArrowUpRight size={12} />
                </a>
              )}
              {project.appStoreUrl && (
                <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-xs font-medium hover:bg-accent transition-colors">
                  App Store <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Tech stack — below image */}
            <div className="rounded-2xl border border-border bg-card px-4 py-3">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-accent border border-border text-accent-foreground font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — title, description, highlights, metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 min-h-0 overflow-y-auto pr-1"
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
              <div className="flex-1">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">Key Highlights</p>
                <ul className="space-y-1.5">
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
                    <div key={m} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-accent border border-border text-[11px] text-muted-foreground">
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
