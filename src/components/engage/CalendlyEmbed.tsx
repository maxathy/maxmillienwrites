import { useEffect, useRef, useState } from 'react'

const CALENDLY_URL = 'https://calendly.com/max-millien'
const WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js'
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'

export function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = WIDGET_CSS
      document.head.appendChild(link)
    }
    if (!document.querySelector(`script[src="${WIDGET_SRC}"]`)) {
      const script = document.createElement('script')
      script.src = WIDGET_SRC
      script.async = true
      document.body.appendChild(script)
    }
  }, [visible])

  return (
    <div ref={ref} className="min-h-[680px]">
      {visible ? (
        <div
          className="calendly-inline-widget"
          data-url={CALENDLY_URL}
          style={{ minWidth: '320px', height: '680px' }}
        />
      ) : (
        <div
          aria-hidden
          className="flex min-h-[680px] items-center justify-center rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02] font-mono text-xs uppercase tracking-wider text-[color:var(--color-fg)]/50"
        >
          Scheduler loading…
        </div>
      )}
      <noscript>
        <p className="mt-4 text-sm">
          JavaScript required for the inline scheduler.{' '}
          <a href={CALENDLY_URL} className="underline">
            Open scheduler in a new tab
          </a>
          .
        </p>
      </noscript>
    </div>
  )
}
