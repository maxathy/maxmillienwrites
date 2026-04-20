import { useEffect, useRef, useState } from 'react'

const DRAG_THRESHOLD = 6

export function useRailScroller(itemCount: number) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const drag = useRef<{
    x: number
    y: number
    scrollLeft: number
    pointerId: number
    dragging: boolean
  } | null>(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      cards.forEach((c, i) => {
        const cx = c.offsetLeft + c.offsetWidth / 2
        const d = Math.abs(cx - center)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setActive(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [itemCount])

  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: step * dir, behavior: 'smooth' })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      nudge(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      nudge(-1)
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current
    if (!el) return
    if (e.pointerType === 'touch') return
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: el.scrollLeft,
      pointerId: e.pointerId,
      dragging: false,
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current
    if (!el || !drag.current) return
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    if (!drag.current.dragging) {
      if (Math.abs(dx) <= DRAG_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return
      drag.current.dragging = true
      try {
        el.setPointerCapture(e.pointerId)
      } catch {
        /* no-op */
      }
      el.style.cursor = 'grabbing'
    }
    el.scrollLeft = drag.current.scrollLeft - dx
  }

  const finishDrag = (e: React.PointerEvent, suppressClick: boolean) => {
    const el = scrollerRef.current
    const wasDragging = drag.current?.dragging === true
    drag.current = null
    if (!el) return
    el.style.cursor = ''
    try {
      el.releasePointerCapture(e.pointerId)
    } catch {
      /* no-op */
    }
    if (suppressClick && wasDragging) {
      const swallow = (ev: Event) => {
        ev.preventDefault()
        ev.stopPropagation()
      }
      el.addEventListener('click', swallow, { capture: true, once: true })
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    finishDrag(e, true)
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    finishDrag(e, false)
  }

  return {
    scrollerRef,
    active,
    nudge,
    handlers: {
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  }
}
