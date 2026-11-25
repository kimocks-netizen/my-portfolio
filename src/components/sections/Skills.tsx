import { motion } from 'motion/react'
import { useQuery } from '@tanstack/react-query'
import { skillsQueries } from '@/features/skills/queries'

const GROUP_COLORS: Record<string, string> = {
  'Frontend':              'bg-primary/10 text-primary border-primary/20',
  'Backend':               'bg-secondary/10 text-secondary border-secondary/20',
  'Cloud & AWS':           'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'AI & ML':               'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  'Databases':             'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'DevOps & Tools':        'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  'Security':              'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  'Real-Time & Messaging': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
}

export function Skills() {
  const { data: groups = [] } = useQuery(skillsQueries.all())

  return (
    <section id="skills" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Tech Stack</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Skills & <span className="text-brand-gradient">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {groups.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gi * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-glow transition-shadow duration-300"
            >
              <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.06 + si * 0.03 }}
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${
                      GROUP_COLORS[group.group] ?? 'bg-accent text-accent-foreground border-border'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
