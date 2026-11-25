import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Copy, Check } from 'lucide-react'
import { useSnippets } from '@/features/snippets/queries'
import type { SnippetItem } from '@/types'

const TECH_COLOR: Record<string, string> = {
  'CSS':            'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'CSS + JS':       'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'React':          'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  'Tailwind CSS':   'bg-primary/10 text-primary border-primary/20',
  'React + Motion': 'bg-secondary/10 text-secondary border-secondary/20',
}

// ── Live previews per snippet ─────────────────────────────────────────────────
function BouncingBallPreview({ code }: { code: string }) {
  const id = 'bb-' + Math.random().toString(36).slice(2, 7)
  return (
    <div className="flex items-end justify-center h-full pb-6">
      <style>{code.replace('.ball', `.${id}`)}</style>
      <div className={`${id} w-10 h-10 rounded-full`} style={{ background: 'linear-gradient(135deg,#06b6d4,#a855f7)' }} />
    </div>
  )
}

function RipplePreview() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([])
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    setRipples(r => [...r, { id: Date.now(), x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size }])
  }
  return (
    <div className="flex items-center justify-center h-full">
      <button
        onClick={handleClick}
        className="relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-white select-none"
        style={{ background: 'linear-gradient(135deg,#06b6d4,#a855f7)' }}
      >
        Click me
        {ripples.map(r => (
          <span
            key={r.id}
            onAnimationEnd={() => setRipples(prev => prev.filter(x => x.id !== r.id))}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: r.size, height: r.size, left: r.x, top: r.y,
              background: 'rgba(255,255,255,0.35)',
              animation: 'ripple-preview 0.6s linear forwards',
            }}
          />
        ))}
        <style>{`@keyframes ripple-preview { from{transform:scale(0);opacity:1} to{transform:scale(2.5);opacity:0} }`}</style>
      </button>
    </div>
  )
}

function TypewriterPreview() {
  const words = ['Full-Stack Engineer', 'AWS Specialist', 'AI Builder']
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[wi % words.length]
    const t = setTimeout(() => {
      setText(p => del ? w.slice(0, p.length - 1) : w.slice(0, p.length + 1))
      if (!del && text === w) setTimeout(() => setDel(true), 1400)
      if (del && text === '') { setDel(false); setWi(i => i + 1) }
    }, del ? 40 : 80)
    return () => clearTimeout(t)
  })
  return (
    <div className="flex items-center justify-center h-full">
      <span className="text-lg font-semibold text-white">
        {text}<span className="animate-blink text-cyan-400">|</span>
      </span>
    </div>
  )
}

function GlowingCardPreview() {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="group relative rounded-xl border border-white/10 bg-white/5 p-5 cursor-pointer transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1 w-full"
        style={{ boxShadow: 'none' }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px -5px oklch(0.82 0.16 210 / 0.4)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
      >
        <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">Card Title</h3>
        <p className="mt-1.5 text-xs text-white/60">Hover to see the glow effect.</p>
      </div>
    </div>
  )
}

function GradientBorderPreview() {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <style>{`
        @property --gb-angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes gb-spin { to { --gb-angle: 360deg; } }
        .gb-wrap { border-radius:12px; padding:2px; background:linear-gradient(var(--gb-angle),#06b6d4,#a855f7,#06b6d4); animation:gb-spin 4s linear infinite; }
        .gb-inner { border-radius:10px; background:oklch(0.13 0.03 255); padding:20px; }
      `}</style>
      <div className="gb-wrap w-full">
        <div className="gb-inner text-center">
          <p className="text-sm font-semibold text-white">Gradient Border</p>
          <p className="text-xs text-white/50 mt-1">Rotating animation</p>
        </div>
      </div>
    </div>
  )
}

function MagneticPreview() {
  const ref = useRef<HTMLButtonElement>(null)
  function onMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.35
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.35
    ref.current!.style.transform = `translate(${dx}px,${dy}px)`
  }
  function onLeave() { ref.current!.style.transform = 'translate(0,0)' }
  return (
    <div className="flex items-center justify-center h-full">
      <button
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="px-6 py-3 rounded-xl font-semibold text-white text-sm"
        style={{ background: 'linear-gradient(135deg,#06b6d4,#a855f7)', transition: 'transform 0.15s ease' }}
      >
        Hover me
      </button>
    </div>
  )
}

const PREVIEWS: Record<string, (code: string) => React.ReactNode> = {
  'bouncing-ball':  (code) => <BouncingBallPreview code={code} />,
  'ripple-click':   ()     => <RipplePreview />,
  'typewriter':     ()     => <TypewriterPreview />,
  'glowing-card':   ()     => <GlowingCardPreview />,
  'gradient-border':()     => <GradientBorderPreview />,
  'magnetic-button':()     => <MagneticPreview />,
}

// ── Snippet row ───────────────────────────────────────────────────────────────
function SnippetRow({ snippet, index }: { snippet: SnippetItem; index: number }) {
  const [code, setCode] = useState(snippet.code)
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const preview = PREVIEWS[snippet.id]?.(code)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-sm">{snippet.title}</h3>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${TECH_COLOR[snippet.tech] ?? 'bg-accent text-accent-foreground border-border'}`}>
            {snippet.tech}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground hidden sm:block">{snippet.description}</p>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent border border-border text-xs font-medium hover:bg-muted transition-colors"
          >
            {copied ? <><Check size={11} className="text-emerald-400" /> Copied</> : <><Copy size={11} /> Copy</>}
          </button>
        </div>
      </div>

      {/* Two-col: editor left, preview right */}
      <div className="grid md:grid-cols-2 min-h-[280px]">

        {/* Editor */}
        <div className="relative bg-[oklch(0.10_0.02_255)] border-r border-border/30">
          {/* Fake editor chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-[10px] text-white/30 font-mono">{snippet.id}.{snippet.tech === 'CSS' ? 'css' : snippet.tech === 'CSS + JS' ? 'js' : 'tsx'}</span>
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-[calc(100%-32px)] bg-transparent text-[11px] leading-relaxed text-slate-300 font-mono p-4 resize-none outline-none"
            style={{ tabSize: 2 }}
          />
        </div>

        {/* Live preview */}
        <div className="relative bg-[oklch(0.13_0.03_255)] flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/30 font-mono">Preview</span>
          </div>
          <div className="flex-1 p-4">
            {preview ?? (
              <div className="flex items-center justify-center h-full text-xs text-white/20 font-mono">
                Interactive preview
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Snippets() {
  const { data: items = [] } = useSnippets()

  return (
    <section id="snippets" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Reusable</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Code <span className="text-brand-gradient">Snippets</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            Edit the code on the left — see it update live on the right. Copy and drop into any project.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {items.map((snippet, i) => (
            <SnippetRow key={snippet.id} snippet={snippet} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
