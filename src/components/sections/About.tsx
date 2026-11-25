import { motion } from 'motion/react'
import { MapPin, GraduationCap, Briefcase, Award } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import { personal } from '@/data/personal'

const STATS = [
  { target: 4,   suffix: '+', label: 'Years Experience' },
  { target: 5,   suffix: '×', label: 'AWS Certifications' },
  { target: 10,  suffix: '+', label: 'Projects Shipped' },
  { target: 3,   suffix: '',  label: 'Countries Worked' },
]

const HIGHLIGHTS = [
  { icon: Briefcase,     text: 'Senior Full-Stack Engineer at Planet42 — fintech at scale' },
  { icon: Award,         text: '5 AWS certifications across cloud, ML, GenAI & data engineering' },
  { icon: GraduationCap, text: 'Masters in Computer Science in progress at UJ' },
  { icon: MapPin,        text: 'Based in Pretoria, South Africa — worked in Geneva (UN) & remotely' },
]

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(target)
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-brand-gradient">
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div {...reveal()} className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">About Me</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Building things that <span className="text-brand-gradient">matter</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — bio + highlights */}
          <div className="space-y-6">
            <motion.p {...reveal(0.1)} className="text-muted-foreground leading-relaxed">
              I'm a Senior Full-Stack Engineer with 4+ years building production systems across fintech,
              cloud-native infrastructure, and AI-powered platforms. Currently at{' '}
              <a href="https://planet42.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Planet42
              </a>{' '}
              where I architect core financial systems serving tens of thousands of customers.
            </motion.p>
            <motion.p {...reveal(0.15)} className="text-muted-foreground leading-relaxed">
              I've worked across South Africa, Switzerland (United Nations UNECE), and remotely — shipping
              everything from payment platforms and AI assistants to real-time data pipelines and custom ERP systems.
            </motion.p>

            {/* Highlights list */}
            <motion.ul {...reveal(0.2)} className="space-y-3 pt-2">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                    <Icon size={14} className="text-primary" />
                  </span>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </li>
              ))}
            </motion.ul>

            {/* Location badge */}
            <motion.div {...reveal(0.25)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground">
              <MapPin size={13} className="text-primary" />
              {personal.location}
            </motion.div>
          </div>

          {/* Right — count-up stats grid */}
          <motion.div {...reveal(0.15)} className="grid grid-cols-2 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col items-center justify-center gap-1 hover:shadow-glow transition-shadow duration-300"
              >
                <StatCounter target={s.target} suffix={s.suffix} label={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
