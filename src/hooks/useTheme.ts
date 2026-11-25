import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('portfolio-theme', theme)
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('portfolio-theme') as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useTheme = create<ThemeStore>((set) => {
  const initial = typeof window !== 'undefined' ? getInitialTheme() : 'dark'
  if (typeof window !== 'undefined') applyTheme(initial)

  return {
    theme: initial,
    toggleTheme: () =>
      set((state) => {
        const next: Theme = state.theme === 'dark' ? 'light' : 'dark'
        applyTheme(next)
        return { theme: next }
      }),
    setTheme: (theme) => {
      applyTheme(theme)
      set({ theme })
    },
  }
})
