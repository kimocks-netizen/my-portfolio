import { motion } from 'motion/react'

const ICONS = [
  { src: '/tech-icons/react.svg',       label: 'React' },
  { src: '/tech-icons/nextjs.svg',      label: 'Next.js' },
  { src: '/tech-icons/typescript.svg',  label: 'TypeScript' },
  { src: '/tech-icons/python.svg',      label: 'Python' },
  { src: '/tech-icons/django.svg',      label: 'Django' },
  { src: '/tech-icons/nodejs.svg',      label: 'Node.js' },
  { src: '/tech-icons/aws.svg',         label: 'AWS' },
  { src: '/tech-icons/docker.svg',      label: 'Docker' },
  { src: '/tech-icons/terraform.svg',   label: 'Terraform' },
  { src: '/tech-icons/postgresql.svg',  label: 'PostgreSQL' },
  { src: '/tech-icons/redis.svg',       label: 'Redis' },
  { src: '/tech-icons/googlegemini.svg',label: 'Gemini' },
  { src: '/tech-icons/tailwindcss.svg', label: 'Tailwind' },
  { src: '/tech-icons/git.svg',         label: 'Git' },
  { src: '/tech-icons/supabase.svg',    label: 'Supabase' },
  { src: '/tech-icons/stripe.svg',      label: 'Stripe' },
]

const RADIUS = 120   // px from center
const ICON_SIZE = 32 // px

export function TechOrbit() {
  const count = ICONS.length

  return (
    <div
      className="relative mx-auto hidden md:block"
      style={{ width: (RADIUS + ICON_SIZE) * 2, height: (RADIUS + ICON_SIZE) * 2 }}
      aria-hidden="true"
    >
      {/* Orbit ring */}
      <div
        className="absolute inset-0 rounded-full border border-border/40"
        style={{ margin: ICON_SIZE / 2 }}
      />

      {/* Rotating wrapper */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {ICONS.map((icon, i) => {
          const angle = (i / count) * 2 * Math.PI
          const cx = (RADIUS + ICON_SIZE) + Math.cos(angle) * RADIUS - ICON_SIZE / 2
          const cy = (RADIUS + ICON_SIZE) + Math.sin(angle) * RADIUS - ICON_SIZE / 2

          return (
            <motion.div
              key={icon.label}
              className="absolute flex items-center justify-center rounded-xl bg-card border border-border shadow-card hover:shadow-glow hover:border-primary/40 transition-shadow duration-300"
              style={{ left: cx, top: cy, width: ICON_SIZE, height: ICON_SIZE }}
              // counter-rotate so icons stay upright
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.3 }}
            >
              <img
                src={icon.src}
                alt={icon.label}
                className="w-5 h-5 object-contain"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </motion.div>
          )
        })}
      </motion.div>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Tech Stack</span>
      </div>
    </div>
  )
}
