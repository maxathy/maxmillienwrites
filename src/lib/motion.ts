import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  duration: 400,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

export function useMagneticHover(
  ref: RefObject<HTMLElement | null>,
  strength = 0.3,
): void {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return

    let frame = 0
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = ''
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, strength])
}

/**
 * Wraps each text line of `el` in an overflow-clipped span pair so lines can
 * be translated in/out individually. Call after layout; returns the inner
 * line spans for animation.
 */
export function splitLines(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? ''
  const words = text.trim().split(/\s+/)
  el.textContent = ''
  const measure = document.createElement('span')
  measure.style.visibility = 'hidden'
  measure.style.position = 'absolute'
  el.appendChild(measure)

  const lines: string[][] = [[]]
  const width = el.clientWidth
  for (const word of words) {
    measure.textContent = lines[lines.length - 1].concat(word).join(' ')
    if (measure.offsetWidth > width && lines[lines.length - 1].length > 0) {
      lines.push([word])
    } else {
      lines[lines.length - 1].push(word)
    }
  }
  el.removeChild(measure)

  const inners: HTMLSpanElement[] = []
  for (const line of lines) {
    const outer = document.createElement('span')
    outer.style.display = 'block'
    outer.style.overflow = 'hidden'
    const inner = document.createElement('span')
    inner.style.display = 'inline-block'
    inner.style.willChange = 'transform'
    inner.textContent = line.join(' ') + ' '
    outer.appendChild(inner)
    el.appendChild(outer)
    inners.push(inner)
  }
  return inners
}

export { gsap, ScrollTrigger }
