import { useCallback, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function useScramble(original: string, speed = 40, iterations = 6) {
  const [text, setText] = useState(original)
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countRef = useRef(0)

  const scramble = useCallback(() => {
    countRef.current = 0

    const tick = () => {
      countRef.current += 1
      const progress = countRef.current / (iterations * original.length)

      setText(
        original
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < Math.floor(progress * original.length)) return original[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (countRef.current < iterations * original.length) {
        frameRef.current = setTimeout(tick, speed)
      } else {
        setText(original)
      }
    }

    if (frameRef.current) clearTimeout(frameRef.current)
    tick()
  }, [original, speed, iterations])

  const reset = useCallback(() => {
    if (frameRef.current) clearTimeout(frameRef.current)
    setText(original)
  }, [original])

  return { text, scramble, reset }
}
