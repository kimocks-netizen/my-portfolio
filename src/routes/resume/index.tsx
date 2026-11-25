import { useState, useRef, useEffect } from 'react'
import { createRoute, useNavigate } from '@tanstack/react-router'
import { Route as rootRoute } from '../__root'
import { personal } from '@/data/personal'
import { experience } from '@/data/experience'
import { education } from '@/data/education'
import { certifications } from '@/data/certifications'
import { skills } from '@/data/skills'
import { ArrowLeft, MapPin, Mail, Phone, Globe, ChevronDown, FileText, AlignLeft } from 'lucide-react'

const PORTFOLIO_URL = import.meta.env.VITE_PORTFOLIO_URL ?? 'http://localhost:5173'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resume',
  component: ResumePage,
})

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const SKILL_GROUPS = [
  { label: 'Frontend',    items: skills.find(s => s.group === 'Frontend')?.items ?? [] },
  { label: 'Backend',     items: skills.find(s => s.group === 'Backend')?.items ?? [] },
  { label: 'Cloud & AWS', items: skills.find(s => s.group === 'Cloud & AWS')?.items ?? [] },
  { label: 'AI & ML',     items: skills.find(s => s.group === 'AI & ML')?.items ?? [] },
  { label: 'Databases',   items: skills.find(s => s.group === 'Databases')?.items ?? [] },
  { label: 'DevOps',      items: skills.find(s => s.group === 'DevOps & Tools')?.items ?? [] },
]

type Mode = 'full' | 'summary'

// ── jsPDF generator ───────────────────────────────────────────────────────────
async function generatePDF(mode: Mode) {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const W = pdf.internal.pageSize.getWidth()
  const L = 14, R = W - 14
  let y = 0

  const hex = (h: string): [number, number, number] => [
    parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16),
  ]

  const CYAN   = hex('#06b6d4')
  const PURPLE = hex('#a855f7')
  const DARK   = hex('#0f172a')
  const GRAY   = hex('#64748b')
  const LGRAY  = hex('#94a3b8')
  const WHITE: [number,number,number] = [255, 255, 255]

  // ── Header gradient bar ──
  // jsPDF doesn't do gradients natively — use two rects blended
  pdf.setFillColor(...CYAN)
  pdf.rect(0, 0, W / 2, 38, 'F')
  pdf.setFillColor(...PURPLE)
  pdf.rect(W / 2, 0, W / 2, 38, 'F')
  // overlay semi-transparent dark for readability
  pdf.setFillColor(15, 23, 42)
  pdf.setGState(pdf.GState({ opacity: 0.55 }))
  pdf.rect(0, 0, W, 38, 'F')
  pdf.setGState(pdf.GState({ opacity: 1 }))

  // Photo circle
  try {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = personal.photo
    await new Promise(r => { img.onload = r; img.onerror = r })
    if (img.naturalWidth) {
      pdf.addImage(img, 'PNG', L, 5, 22, 22)
    }
  } catch { /* skip */ }

  // Name + title
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(16)
  pdf.setTextColor(...WHITE)
  pdf.text(personal.name, L + 26, 13)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9)
  pdf.setTextColor(200, 220, 255)
  pdf.text(personal.title, L + 26, 19)

  // Social row
  pdf.setFontSize(7.5)
  pdf.setTextColor(180, 200, 240)
  const socials = [
    `github.com/kimocks-netizen`,
    `in/brynetinashechikomo`,
    `My Portfolio: ${PORTFOLIO_URL.replace(/https?:\/\//, '')}`,
  ]
  pdf.text(socials.join('   ·   '), L + 26, 25)

  // Contact right side
  pdf.setFontSize(7.5)
  pdf.setTextColor(200, 220, 255)
  pdf.text(personal.email,    R, 12, { align: 'right' })
  pdf.text(personal.phone,    R, 18, { align: 'right' })
  pdf.text(personal.location, R, 24, { align: 'right' })

  y = 44

  // ── Two-column layout ──
  const COL1_W = 118
  const COL2_X = L + COL1_W + 6
  const COL2_W = R - COL2_X
  const startY = y

  // ── LEFT COLUMN ──────────────────────────────────────────────────────────────
  let ly = startY

  // Profile
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5); pdf.setTextColor(...CYAN)
  pdf.text('PROFILE', L, ly)
  pdf.setDrawColor(...CYAN); pdf.setLineWidth(0.3)
  pdf.line(L + pdf.getTextWidth('PROFILE') + 2, ly - 0.5, L + COL1_W, ly - 0.5)
  ly += 4
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor(...GRAY)
  const profileText = 'Results-driven Full-Stack Software Engineer & AI/Cloud Specialist with 4+ years of experience designing and delivering scalable fintech, web, and cloud-native systems. Contributed to the UN e-TIR system supporting 70+ countries. Strong expertise in AWS cloud architectures, real-time systems, and AI-powered platforms.'
  const profileLines = pdf.splitTextToSize(profileText, COL1_W)
  pdf.text(profileLines, L, ly)
  ly += profileLines.length * 4.5 + 5

  // Experience
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5); pdf.setTextColor(...CYAN)
  pdf.text('EXPERIENCE', L, ly)
  pdf.setDrawColor(...CYAN); pdf.setLineWidth(0.3)
  pdf.line(L + pdf.getTextWidth('EXPERIENCE') + 2, ly - 0.5, L + COL1_W, ly - 0.5)
  ly += 4

  const jobs = mode === 'summary' ? experience.slice(0, 3) : experience
  const highlightsPerJob = mode === 'summary' ? 2 : 3

  for (const job of jobs) {
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.setTextColor(...DARK)
    pdf.text(job.role, L, ly)
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.5); pdf.setTextColor(...CYAN)
    pdf.text(`${job.company} · ${job.type}`, L, ly + 4)
    pdf.setTextColor(...LGRAY)
    pdf.text(job.period, L + COL1_W, ly, { align: 'right' })
    pdf.text(job.location, L + COL1_W, ly + 4, { align: 'right' })
    ly += 9

    for (const h of job.highlights.slice(0, highlightsPerJob)) {
      pdf.setFillColor(...CYAN)
      pdf.circle(L + 1, ly - 1, 0.8, 'F')
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.5); pdf.setTextColor(...GRAY)
      const lines = pdf.splitTextToSize(h, COL1_W - 5)
      pdf.text(lines, L + 4, ly)
      ly += lines.length * 4 + 1
    }
    ly += 3
  }

  // Education
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5); pdf.setTextColor(...CYAN)
  pdf.text('EDUCATION', L, ly)
  pdf.setDrawColor(...CYAN); pdf.setLineWidth(0.3)
  pdf.line(L + pdf.getTextWidth('EDUCATION') + 2, ly - 0.5, L + COL1_W, ly - 0.5)
  ly += 4

  for (const e of education) {
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.setTextColor(...DARK)
    pdf.text(e.degree, L, ly)
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.5); pdf.setTextColor(...CYAN)
    pdf.text(e.institution, L, ly + 4)
    pdf.setTextColor(...LGRAY)
    pdf.text(e.period, L + COL1_W, ly, { align: 'right' })
    const statusLabel = e.status === 'in-progress' ? 'In Progress' : 'Completed'
    pdf.setTextColor(e.status === 'in-progress' ? PURPLE[0] : 34, e.status === 'in-progress' ? PURPLE[1] : 197, e.status === 'in-progress' ? PURPLE[2] : 94)
    pdf.text(statusLabel, L + COL1_W, ly + 4, { align: 'right' })
    ly += 10
  }

  // ── RIGHT COLUMN ─────────────────────────────────────────────────────────────
  let ry = startY

  // Skills (skip in summary)
  if (mode === 'full') {
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5); pdf.setTextColor(...CYAN)
    pdf.text('SKILLS', COL2_X, ry)
    pdf.setDrawColor(...CYAN); pdf.setLineWidth(0.3)
    pdf.line(COL2_X + pdf.getTextWidth('SKILLS') + 2, ry - 0.5, R, ry - 0.5)
    ry += 4

    for (const g of SKILL_GROUPS) {
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7); pdf.setTextColor(...GRAY)
      pdf.text(g.label.toUpperCase(), COL2_X, ry)
      ry += 3.5
      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(...GRAY)
      const line = g.items.join(' · ')
      const wrapped = pdf.splitTextToSize(line, COL2_W)
      pdf.text(wrapped, COL2_X, ry)
      ry += wrapped.length * 3.5 + 2
    }
    ry += 3
  }

  // Certifications
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5); pdf.setTextColor(...CYAN)
  pdf.text('AWS CERTIFICATIONS', COL2_X, ry)
  pdf.setDrawColor(...CYAN); pdf.setLineWidth(0.3)
  pdf.line(COL2_X + pdf.getTextWidth('AWS CERTIFICATIONS') + 2, ry - 0.5, R, ry - 0.5)
  ry += 4

  for (const c of certifications) {
    pdf.setFillColor(...CYAN)
    pdf.circle(COL2_X + 1, ry - 1, 0.8, 'F')
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5); pdf.setTextColor(...DARK)
    pdf.text(c.title, COL2_X + 4, ry)
    pdf.setFont('helvetica', 'normal'); pdf.setTextColor(...LGRAY)
    pdf.text(c.level, COL2_X + 4, ry + 3.5)
    ry += 8
  }

  ry += 3

  // Languages
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7.5); pdf.setTextColor(...CYAN)
  pdf.text('LANGUAGES', COL2_X, ry)
  pdf.setDrawColor(...CYAN); pdf.setLineWidth(0.3)
  pdf.line(COL2_X + pdf.getTextWidth('LANGUAGES') + 2, ry - 0.5, R, ry - 0.5)
  ry += 4

  for (const [lang, level] of [['English', 'Fluent'], ['French', 'Beginner']]) {
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.5); pdf.setTextColor(...DARK)
    pdf.text(lang, COL2_X, ry)
    pdf.setTextColor(...LGRAY)
    pdf.text(level, R, ry, { align: 'right' })
    ry += 5
  }

  // ── Footer ──
  const footerY = pdf.internal.pageSize.getHeight() - 8
  pdf.setDrawColor(...hex('#e2e8f0')); pdf.setLineWidth(0.3)
  pdf.line(L, footerY - 3, R, footerY - 3)
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(...LGRAY)
  pdf.text(`${personal.name} · ${personal.email} · My Portfolio: ${PORTFOLIO_URL.replace(/https?:\/\//, '')}`, W / 2, footerY, { align: 'center' })

  // ── Save ──
  const filename = mode === 'summary' ? 'Bryne_Chikomo_Summary.pdf' : 'Bryne_Chikomo_Resume.pdf'
  pdf.save(filename)
}

// ── Download dropdown ─────────────────────────────────────────────────────────
function DownloadDropdown() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<Mode | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  async function download(mode: Mode) {
    setOpen(false)
    if (mode === 'full') {
      // Download the real PDF directly
      const a = document.createElement('a')
      a.href = '/Bryne_Resume.pdf'
      a.download = 'Bryne_Chikomo_Resume.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      return
    }
    setLoading(mode)
    await generatePDF(mode)
    setLoading(null)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        disabled={loading !== null}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pill text-white text-sm font-semibold shadow-pill hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? (
          <><span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" /> Generating…</>
        ) : (
          <>Download PDF <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} /></>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-card shadow-card overflow-hidden z-50">
          <button onClick={() => download('full')}
            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-accent transition-colors text-left">
            <FileText size={15} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">Full Resume</p>
              <p className="text-xs text-muted-foreground">All experience & details</p>
            </div>
          </button>
          <div className="border-t border-border/50" />
          <button onClick={() => download('summary')}
            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-accent transition-colors text-left">
            <AlignLeft size={15} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">Summary</p>
              <p className="text-xs text-muted-foreground">1-page condensed version</p>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
function ResumePage() {
  const navigate = useNavigate()

  // Do NOT force light mode — keep user's theme for the page bg
  // Only the resume sheet itself is hardcoded white

  return (
    <div className="min-h-screen bg-background pt-16 pb-12 px-4">

      {/* Toolbar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <button onClick={() => navigate({ to: '/' })}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <DownloadDropdown />
      </div>

      {/* Resume sheet */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-card overflow-hidden text-gray-900">

        {/* Header */}
        <div className="bg-brand-gradient p-7 text-white">
          <div className="flex items-center gap-5">
            {/* Photo */}
            <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
              <img src={personal.photo} alt={personal.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{personal.name}</h1>
              <p className="text-white/80 mt-0.5 text-sm sm:text-base">{personal.title}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <a href={personal.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors">
                  <GithubIcon /> github.com/kimocks-netizen
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors">
                  <LinkedInIcon /> in/brynetinashechikomo
                </a>
                <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors">
                  <Globe size={12} /> My Portfolio: {PORTFOLIO_URL.replace(/https?:\/\//, '')}
                </a>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-1 text-xs text-white/75 text-right">
              <span className="flex items-center justify-end gap-1.5"><Mail size={11} />{personal.email}</span>
              <span className="flex items-center justify-end gap-1.5"><Phone size={11} />{personal.phone}</span>
              <span className="flex items-center justify-end gap-1.5"><MapPin size={11} />{personal.location}</span>
            </div>
          </div>
        </div>

        <div className="p-7 grid md:grid-cols-[1fr_260px] gap-7 bg-white text-gray-900">

          {/* Left */}
          <div className="space-y-6">
            <section>
              <h2 className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2 pb-1 border-b border-border">Profile</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Results-driven Full-Stack Software Engineer & AI/Cloud Specialist with 4+ years of experience designing and delivering scalable fintech, web, and cloud-native systems. Contributed to the UN e-TIR system supporting 70+ countries. Strong expertise in AWS cloud architectures, real-time systems, and AI-powered platforms.
              </p>
            </section>

            <section>
              <h2 className="text-[10px] font-bold tracking-widest uppercase text-primary mb-3 pb-1 border-b border-border">Experience</h2>
              <div className="space-y-4">
                {experience.map(job => (
                  <div key={job.id}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="font-semibold text-xs">{job.role}</p>
                        <p className="text-[11px] text-primary font-medium">{job.company} · {job.type}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[11px] text-muted-foreground">{job.period}</p>
                        <p className="text-[10px] text-muted-foreground">{job.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-0.5">
                      {job.highlights.slice(0, 3).map(h => (
                        <li key={h} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2 pb-1 border-b border-border">Education</h2>
              <div className="space-y-2">
                {education.map(e => (
                  <div key={e.id} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-xs">{e.degree}</p>
                      <p className="text-[11px] text-primary">{e.institution}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[11px] text-muted-foreground">{e.period}</p>
                      <span className={`text-[10px] font-semibold ${e.status === 'in-progress' ? 'text-secondary' : 'text-emerald-500'}`}>
                        {e.status === 'in-progress' ? 'In Progress' : 'Completed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <section>
              <h2 className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2 pb-1 border-b border-border">Skills</h2>
              <div className="space-y-2">
                {SKILL_GROUPS.map(g => (
                  <div key={g.label}>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{g.label}</p>
                    <div className="flex flex-wrap gap-1">
                      {g.items.map(s => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent border border-border text-accent-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2 pb-1 border-b border-border">AWS Certifications</h2>
              <div className="space-y-1.5">
                {certifications.map(c => (
                  <div key={c.id} className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-medium leading-snug">{c.title}</p>
                      <p className="text-[10px] text-muted-foreground">{c.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2 pb-1 border-b border-border">Languages</h2>
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span>English</span><span className="text-muted-foreground">Fluent</span></div>
                <div className="flex justify-between text-xs"><span>French</span><span className="text-muted-foreground">Beginner</span></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
