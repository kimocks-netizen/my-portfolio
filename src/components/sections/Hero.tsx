import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, Mail, FileText } from 'lucide-react'
import { FloatingOrbs } from '@/components/effects/FloatingOrbs'
import { TechMarquee } from '@/components/effects/TechMarquee'
import { useTheme } from '@/hooks/useTheme'
import { useNavigate } from '@tanstack/react-router'
import { personal } from '@/data/personal'

const TITLES = [
  'Full-Stack Engineer',
  'AWS Cloud Specialist',
  'AI/ML Developer',
  'Fintech Builder',
]

function useTypewriter(words: string[], typingSpeed = 80, pauseMs = 1800, deleteSpeed = 40) {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const word = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typingSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs)
      }
    } else if (phase === 'pausing') {
      setPhase('deleting')
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(d => d.slice(0, -1)), deleteSpeed)
      } else {
        setWordIndex(i => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [display, phase, wordIndex, words, typingSpeed, pauseMs, deleteSpeed])

  return display
}

const BACK_STATS = [
  { value: '4+',  label: 'Years Experience' },
  { value: '5×',  label: 'AWS Certified' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '3',   label: 'Countries Worked' },
]

function ProfileFlipCard({ photo }: { photo: string }) {
  const [flipped, setFlipped] = useState(false)
  const autoFlipped = useRef(false)

  // Auto-flip once on load after entrance settles
  useEffect(() => {
    if (autoFlipped.current) return
    autoFlipped.current = true
    const t1 = setTimeout(() => setFlipped(true), 1200)
    const t2 = setTimeout(() => setFlipped(false), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 cursor-pointer"
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped(v => !v)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72"
      >
        {/* Front — photo */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 rounded-full bg-brand-gradient opacity-30 blur-2xl scale-110" />
          <div className="absolute inset-0 rounded-full p-[3px] bg-brand-gradient">
            <div className="w-full h-full rounded-full bg-background" />
          </div>
          <img
            src={photo}
            alt="Bryne T Chikomo"
            className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full object-cover object-top"
          />
        </div>

        {/* Back — stats card */}
        <div
          className="absolute inset-0 rounded-full bg-card border border-border flex flex-col items-center justify-center gap-3 p-6"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0 rounded-full bg-brand-gradient opacity-10" />
          <div className="absolute inset-0 rounded-full p-[2px] bg-brand-gradient opacity-60" style={{ borderRadius: '50%' }}>
            <div className="w-full h-full rounded-full bg-card" />
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-3 w-full px-4">
            {BACK_STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-bold text-brand-gradient leading-none">{s.value}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const title = useTypewriter(TITLES)

  const bgLandscape = theme === 'dark' ? '/dark-bg-landscape.png' : '/light-bg-landscape.png'
  const bgMobile    = theme === 'dark' ? '/dark-bg-mobile.png'    : '/light-bg-mobile.png'

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0 -z-20">
        {/* Mobile bg */}
        <img
          src={bgMobile}
          alt=""
          aria-hidden="true"
          className="md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Landscape bg */}
        <img
          src={bgLandscape}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <FloatingOrbs />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <motion.p {...fade(0.1)} className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">
              Available for opportunities
            </motion.p>

            <motion.h1 {...fade(0.2)} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Hi, I'm{' '}
              <span className="text-brand-gradient">Bryne</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div {...fade(0.3)} className="h-10 mb-6 flex items-center justify-center md:justify-start">
              <span className="text-xl sm:text-2xl font-semibold text-muted-foreground">
                {title}
                <span className="animate-blink text-primary ml-0.5">|</span>
              </span>
            </motion.div>

            <motion.p {...fade(0.4)} className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
              {personal.tagline}
            </motion.p>

            {/* Stats row */}
            <motion.div {...fade(0.5)} className="flex gap-8 justify-center md:justify-start mb-10">
              {[
                { value: '4+', label: 'Years exp.' },
                { value: '5×', label: 'AWS Certified' },
                { value: '10+', label: 'Projects shipped' },
              ].map(stat => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-2xl font-bold text-brand-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fade(0.6)} className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pill text-white text-sm font-semibold shadow-pill hover:opacity-90 transition-opacity"
              >
                View Projects
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/60 text-sm font-medium hover:bg-accent transition-colors"
              >
                <Mail size={14} /> Contact Me
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/60 text-sm font-medium hover:bg-accent transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> GitHub
              </a>
              <button
                onClick={() => navigate({ to: '/resume' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/60 text-sm font-medium hover:bg-accent transition-colors"
              >
                <FileText size={14} /> View Resume
              </button>
            </motion.div>
          </div>

          {/* Profile photo — 3D flip card */}
          <ProfileFlipCard photo={personal.photo} />
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-10"
        >
          <TechMarquee />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
