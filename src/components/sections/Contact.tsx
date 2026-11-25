import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, MapPin, Copy, Check, ExternalLink, FileText } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { personal } from '@/data/personal'

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Contact() {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  function copyEmail() {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div {...reveal()} className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Let's <span className="text-brand-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            Open to senior engineering roles, consulting, and interesting projects. Drop me a message.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">

          {/* Email — full width primary CTA */}
          <motion.div {...reveal(0.1)} className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
            <div className="h-1 bg-brand-gradient" />
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="font-medium text-sm">{personal.email}</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={copyEmail}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-border bg-accent text-sm font-medium hover:bg-muted transition-colors"
                >
                  {copied ? <><Check size={13} className="text-emerald-500" /> Copied</> : <><Copy size={13} /> Copy</>}
                </button>
                <a
                  href={`mailto:${personal.email}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-pill text-white text-sm font-semibold shadow-pill hover:opacity-90 transition-opacity"
                >
                  <Mail size={13} /> Send Email
                </a>
              </div>
            </div>
          </motion.div>

          {/* One row — GitHub, LinkedIn, Location, Resume */}
          <motion.div {...reveal(0.15)} className="grid grid-cols-2 sm:grid-cols-4 gap-3">

            {/* GitHub */}
            <a
              href="https://github.com/kimocks-netizen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card shadow-card hover:border-foreground/40 hover:shadow-glow transition-all duration-200 group text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                <GithubIcon />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">GitHub</p>
                <p className="text-xs font-medium leading-tight">kimocks-netizen</p>
              </div>
              <ExternalLink size={11} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            {/* LinkedIn */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card shadow-card hover:border-primary/40 hover:shadow-glow transition-all duration-200 group text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <LinkedInIcon />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">LinkedIn</p>
                <p className="text-xs font-medium leading-tight">brynetinashechikomo</p>
              </div>
              <ExternalLink size={11} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            {/* Location */}
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card shadow-card text-center">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <MapPin size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Location</p>
                <p className="text-xs font-medium leading-tight">Pretoria, South Africa</p>
              </div>
            </div>

            {/* Resume */}
            <button
              onClick={() => navigate({ to: '/resume' })}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card shadow-card hover:border-secondary/40 hover:shadow-purple transition-all duration-200 group text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FileText size={16} className="text-secondary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Resume</p>
                <p className="text-xs font-medium leading-tight">View Resume</p>
              </div>
              <ExternalLink size={11} className="text-muted-foreground group-hover:text-secondary transition-colors" />
            </button>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
