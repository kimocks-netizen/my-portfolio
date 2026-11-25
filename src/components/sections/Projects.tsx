import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ExternalLink, Star, ArrowRight } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useProjects } from '@/features/projects/queries'
import type { ProjectItem } from '@/types'

type Category = 'all' | 'fintech' | 'cloud' | 'ai' | 'fullstack' | 'data'

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All',        value: 'all' },
  { label: 'Fintech',    value: 'fintech' },
  { label: 'Cloud',      value: 'cloud' },
  { label: 'AI / ML',    value: 'ai' },
  { label: 'Data Eng.',  value: 'data' },
  { label: 'Full-Stack', value: 'fullstack' },
]

// ── Featured hero card (first / starred project) ────────────────────────────
function FeaturedCard({ project }: { project: ProjectItem }) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate({ to: '/projects/$id', params: { id: project.id } })}
      className="group grid md:grid-cols-2 rounded-2xl overflow-hidden border border-border bg-card shadow-card hover:shadow-glow hover:border-primary/30 transition-all duration-300 cursor-pointer mb-5"
    >
      {/* Image */}
      <div className="relative h-64 md:h-auto overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-brand-gradient opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30" />
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col justify-center gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Star size={9} fill="currentColor" /> Featured
          </span>
          {project.category.map(c => (
            <span key={c} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent border border-border text-muted-foreground capitalize">
              {c === 'ai' ? 'AI / ML' : c === 'data' ? 'Data Eng.' : c}
            </span>
          ))}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {project.metrics.length > 0 && (
          <ul className="space-y-1">
            {project.metrics.slice(0, 3).map(m => (
              <li key={m} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-accent border border-border text-accent-foreground">
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent border border-border text-muted-foreground">
              +{project.tech.length - 5} more
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
          View Project <ArrowRight size={14} />
        </span>
      </div>
    </motion.div>
  )
}

// ── Regular tilt card ─────────────────────────────────────────────────────────
function TiltCard({ project, index }: { project: ProjectItem; index: number }) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onLeave() { x.set(0); y.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={() => navigate({ to: '/projects/$id', params: { id: project.id } })}
        className="rounded-2xl border border-border bg-card shadow-card hover:shadow-glow hover:border-primary/30 transition-shadow duration-300 flex flex-col h-full cursor-pointer group"
      >
        {/* Screenshot or gradient bar */}
        {project.image ? (
          <div className="relative h-40 rounded-t-2xl overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          </div>
        ) : (
          <div className="h-1 rounded-t-2xl bg-brand-gradient" />
        )}

        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              {project.featured && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-1">
                  <Star size={9} fill="currentColor" /> Featured
                </span>
              )}
              <h3 className="font-semibold text-sm sm:text-base leading-snug">{project.title}</h3>
            </div>
            <span className="flex-shrink-0 p-1.5 rounded-lg bg-accent text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
              <ExternalLink size={13} />
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Metrics preview */}
          {project.metrics.length > 0 && (
            <ul className="space-y-1">
              {project.metrics.slice(0, 2).map(m => (
                <li key={m} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          )}

          <div className="flex-1" />

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1 pt-1 border-t border-border/50">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-border">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-muted-foreground border border-border">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const { data: all = [] } = useProjects()
  const [active, setActive] = useState<Category>('all')

  const filtered = active === 'all' ? all : all.filter(p => p.category.includes(active))
  const [hero, ...rest] = filtered

  return (
    <section id="projects" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Featured <span className="text-brand-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">Click any project to explore the full tech stack and details</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === f.value
                  ? 'bg-brand-gradient text-white border-transparent shadow-glow'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Featured hero card */}
        {hero && <FeaturedCard project={hero} />}

        {/* Grid — remaining projects */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
