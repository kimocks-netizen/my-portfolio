import { motion } from 'motion/react'
import { GraduationCap, MapPin, Calendar, Clock, ExternalLink } from 'lucide-react'
import { useEducation } from '@/features/education/queries'
import { TechMarquee } from '@/components/effects/TechMarquee'

const DEGREE_COLORS: Record<string, string> = {
  'uj-masters':     'from-primary/20 to-secondary/10',
  'unisa-honours':  'from-secondary/20 to-primary/10',
  'uj-bsc':         'from-primary/10 to-secondary/5',
}

export function Education() {
  const { data: items = [] } = useEducation()

  return (
    <section id="education" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Academic</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Education & <span className="text-brand-gradient">Qualifications</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-border bg-card shadow-card overflow-hidden hover:shadow-glow hover:border-primary/30 transition-all duration-300"
            >
              {/* Gradient side accent */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${DEGREE_COLORS[item.id] ?? 'from-primary/20 to-secondary/10'}`} />

              {/* Subtle bg gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${DEGREE_COLORS[item.id] ?? ''} opacity-30 pointer-events-none`} />

              <div className="relative pl-6 pr-5 py-5 flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent flex items-center justify-center mt-0.5">
                  <GraduationCap size={18} className="text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Status + degree */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {item.status === 'in-progress' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/25">
                        <Clock size={9} /> In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        ✓ Completed
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-base leading-snug">{item.degree}</h3>
                  <p className="text-sm font-medium text-primary mt-0.5">{item.institution}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={11} />{item.period}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} />{item.location}</span>
                  </div>
                  {item.verifyUrl && (
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-[11px] font-medium text-primary hover:underline"
                    >
                      <ExternalLink size={10} /> Verify Degree
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <TechMarquee />
        </motion.div>

      </div>
    </section>
  )
}
