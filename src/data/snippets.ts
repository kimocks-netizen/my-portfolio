import type { SnippetItem } from '@/types'

export const snippets: SnippetItem[] = [
  {
    id: 'bouncing-ball',
    title: 'Bouncing Ball',
    description: 'A pure CSS bouncing ball animation with realistic squash and stretch.',
    tech: 'CSS',
    code: `.ball {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4, #a855f7);
  animation: bounce 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0) scaleX(1) scaleY(1); }
  to   { transform: translateY(-80px) scaleX(0.9) scaleY(1.1); }
}`,
  },
  {
    id: 'ripple-click',
    title: 'Ripple Click Effect',
    description: 'Material-style ripple that expands from the click point on any button.',
    tech: 'CSS + JS',
    code: `function addRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.style.cssText = \`
    position:absolute; border-radius:50%; pointer-events:none;
    width:\${size}px; height:\${size}px;
    left:\${e.clientX - rect.left - size/2}px;
    top:\${e.clientY - rect.top - size/2}px;
    background:rgba(255,255,255,0.4);
    animation: ripple 0.6s linear;
  \`;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}

/* CSS */
@keyframes ripple {
  from { transform: scale(0); opacity: 1; }
  to   { transform: scale(2.5); opacity: 0; }
}`,
  },
  {
    id: 'typewriter',
    title: 'Typewriter Effect',
    description: 'React hook that types and erases text in a loop across multiple strings.',
    tech: 'React',
    code: `import { useState, useEffect } from 'react';

function useTypewriter(words: string[], speed = 80, pause = 1500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      setText(prev =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
      if (!deleting && text === current) setTimeout(() => setDeleting(true), pause);
      if (deleting && text === '') { setDeleting(false); setWordIndex(i => i + 1); }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

// Usage
export function TypewriterDemo() {
  const text = useTypewriter(['Full-Stack Engineer', 'AWS Specialist', 'AI Builder']);
  return <span>{text}<span className="animate-blink">|</span></span>;
}`,
  },
  {
    id: 'glowing-card',
    title: 'Glowing Card Hover',
    description: 'Card that emits a cyan glow on hover using Tailwind and CSS transitions.',
    tech: 'Tailwind CSS',
    code: `<div className="
  group relative rounded-xl border border-white/10
  bg-white/5 p-6 cursor-pointer
  transition-all duration-300
  hover:border-cyan-500/50
  hover:shadow-[0_0_30px_-5px_oklch(0.82_0.16_210/0.4)]
  hover:-translate-y-1
">
  <h3 className="
    text-lg font-semibold
    text-white group-hover:text-cyan-400
    transition-colors duration-300
  ">
    Card Title
  </h3>
  <p className="mt-2 text-sm text-white/60">
    Card description goes here.
  </p>
</div>`,
  },
  {
    id: 'gradient-border',
    title: 'Animated Gradient Border',
    description: 'A card with a rotating gradient border using CSS custom properties.',
    tech: 'CSS',
    code: `.gradient-border {
  position: relative;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(var(--angle), #06b6d4, #a855f7, #06b6d4);
  animation: rotate-gradient 4s linear infinite;
}

.gradient-border-inner {
  border-radius: 11px;
  background: #0f172a;
  padding: 24px;
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotate-gradient {
  to { --angle: 360deg; }
}`,
  },
  {
    id: 'magnetic-button',
    title: 'Magnetic Button',
    description: 'Button that pulls toward the cursor when nearby using Framer Motion.',
    tech: 'React + Motion',
    code: `import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="px-6 py-3 rounded-lg bg-brand-gradient text-white font-medium"
    >
      {children}
    </motion.button>
  );
}`,
  },
]
