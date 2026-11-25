import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MapPin, Calendar, ChevronDown, ExternalLink } from 'lucide-react'
import { useExperience } from '@/features/experience/queries'

const TYPE_COLOR: Record<string, string> = {
  'Full-time': 'bg-primary/10 text-primary border-primary/20',
  'Contract':  'bg-secondary/10 text-secondary border-secondary/20',
  'Part-time': 'bg-muted text-muted-foreground border-border',
}

export function Experience() {
  const { data: jobs = [] } = useExperience()
  const [expanded, setExpanded] = useState<string>(jobs[0]?.id ?? 'planet42')

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Career</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Work <span className="text-brand-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-4">
            {jobs.map((job, i) => {
              const isOpen = expanded === job.id
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-[11px] md:left-[27px] top-5 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                    isOpen ? 'bg-primary border-primary' : 'bg-background border-border'
                  }`} />

                  {/* Card */}
                  <div
                    className={`rounded-2xl border bg-card shadow-card cursor-pointer transition-shadow duration-300 ${
                      isOpen ? 'border-primary/30 shadow-glow' : 'border-border hover:border-border/80'
                    }`}
                    onClick={() => setExpanded(isOpen ? '' : job.id)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-5 md:p-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${TYPE_COLOR[job.type]}`}>
                            {job.type}
                          </span>
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg leading-snug">{job.role}</h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                          {job.companyUrl ? (
                            <a
                              href={job.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                            >
                              {job.company} <ExternalLink size={11} />
                            </a>
                          ) : (
                            <span className="font-medium text-foreground">{job.company}</span>
                          )}
                          <span className="flex items-center gap-1"><Calendar size={12} />{job.period}</span>
                          <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown size={18} className="text-muted-foreground" />
                      </motion.div>
                    </div>

                    {/* Expandable body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-border/50 pt-4 space-y-4">
                            <ul className="space-y-2">
                              {job.highlights.map((h, hi) => (
                                <motion.li
                                  key={hi}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: hi * 0.05 }}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                                  {h}
                                </motion.li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {job.tech.map(t => (
                                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-border">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
