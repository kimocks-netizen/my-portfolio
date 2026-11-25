import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useScramble } from '@/hooks/useScramble'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useNavigate, useRouterState } from '@tanstack/react-router'

const NAV_ITEMS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Work',     href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certs',    href: '#certifications' },
  { label: 'Contact',  href: '#contact' },
]

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'education', 'snippets', 'contact']

function NavItem({ label, isActive, onClick }: { label: string; href: string; isActive: boolean; onClick?: () => void }) {
  const { text, scramble, reset } = useScramble(label, 30, 5)
  return (
    <button
      onClick={onClick}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className={`relative px-1 py-0.5 text-sm font-medium transition-colors duration-200 ${
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {text}
    </button>
  )
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const routerState = useRouterState()
  const isOnProjectPage = routerState.location.pathname.startsWith('/projects/')
  const active = useActiveSection(SECTION_IDS)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const navRef = useRef<HTMLDivElement>(null)

  const activeIndex = NAV_ITEMS.findIndex(item => item.href === `#${active}`)

  function handleNavClick(href: string) {
    setMobileOpen(false)
    const hash = href.replace('#', '')
    if (isOnProjectPage) {
      // navigate home then scroll
      navigate({ to: '/', hash })
    } else {
      const el = document.getElementById(hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIndex]
    const nav = navRef.current
    if (!el || !nav) { setPillStyle(null); return }
    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setPillStyle({ left: elRect.left - navRect.left, width: elRect.width })
  }, [activeIndex])

  // close mobile on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 backdrop-blur-md bg-background/80"
    >
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="font-bold text-lg text-brand-gradient select-none"
        >
          BTC
        </button>

        {/* Desktop nav */}
        <div ref={navRef} className="hidden md:flex items-center gap-1 relative">
          {/* Sliding pill */}
          <AnimatePresence>
            {pillStyle && (
              <motion.span
                key="pill"
                className="absolute top-1/2 -translate-y-1/2 h-7 rounded-full bg-accent"
                initial={false}
                animate={{ left: pillStyle.left, width: pillStyle.width }}
                transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                style={{ zIndex: 0 }}
              />
            )}
          </AnimatePresence>

          {NAV_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              ref={el => { itemRefs.current[i] = el }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.3, duration: 0.4 }}
              className="relative z-10 px-3 py-1"
            >
              <NavItem
                label={item.label}
                href={item.href}
                isActive={activeIndex === i}
                onClick={() => handleNavClick(item.href)}
              />
            </motion.div>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Resume pill */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            onClick={() => navigate({ to: '/resume' })}
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-gradient text-white shadow-glow hover:opacity-90 transition-opacity"
          >
            Resume
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                      activeIndex === i ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
              {/* Resume link in mobile menu */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * NAV_ITEMS.length }}
              >
                <button
                  onClick={() => { setMobileOpen(false); navigate({ to: '/resume' }) }}
                  className="block w-full text-left py-2 text-sm font-semibold text-primary"
                >
                  Resume
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
