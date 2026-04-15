import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'
import {
  stackEdges,
  stackGroupMeta,
  stackNodes,
  type StackEdge,
  type StackGroupKey,
  type StackNode,
} from '../../content/stack'
import { prefersReducedMotion } from '../../lib/motion'
import { StackGraphFallback } from './StackGraphFallback'

type SimNode = StackNode & d3.SimulationNodeDatum & { fx?: number | null; fy?: number | null }
type SimEdge = d3.SimulationLinkDatum<SimNode> & { label?: string }

function edgeKey(e: StackEdge) {
  return `${e.source}__${e.target}`
}

function estimateLabelWidth(name: string) {
  return Math.max(72, name.length * 7 + 22)
}

function StackGraphCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const viewportRef = useRef<SVGGElement>(null)
  const nodeRefs = useRef<Map<string, SVGGElement>>(new Map())
  const linkRefs = useRef<Map<string, SVGLineElement>>(new Map())
  const simRef = useRef<d3.Simulation<SimNode, SimEdge> | null>(null)
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null)

  const [size, setSize] = useState({ w: 1000, h: 640 })
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const [isolated, setIsolated] = useState<StackGroupKey | null>(null)

  const simNodes = useMemo<SimNode[]>(
    () => stackNodes.map((n) => ({ ...n })),
    [],
  )
  const simEdges = useMemo<SimEdge[]>(
    () => stackEdges.map((e) => ({ source: e.source, target: e.target, label: e.label })),
    [],
  )

  const neighbors = useMemo(() => {
    const m = new Map<string, Set<string>>()
    for (const n of stackNodes) m.set(n.id, new Set())
    for (const e of stackEdges) {
      m.get(e.source)?.add(e.target)
      m.get(e.target)?.add(e.source)
    }
    return m
  }, [])

  const nodeGroup = useMemo(() => {
    const m = new Map<string, StackGroupKey>()
    for (const n of stackNodes) m.set(n.id, n.group)
    return m
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    if (!container || !svg) return

    const rect = container.getBoundingClientRect()
    const w = rect.width || 1000
    const h = rect.height || 640
    setSize({ w, h })

    for (const n of simNodes) {
      n.x = w / 2 + (Math.random() - 0.5) * w * 0.6
      n.y = h / 2 + (Math.random() - 0.5) * h * 0.6
    }

    const linkDistance = w < 1024 ? 60 : 90
    const sim = d3
      .forceSimulation<SimNode, SimEdge>(simNodes)
      .force('charge', d3.forceManyBody<SimNode>().strength(-300))
      .force(
        'link',
        d3
          .forceLink<SimNode, SimEdge>(simEdges)
          .id((d) => d.id)
          .distance(linkDistance)
          .strength(0.6),
      )
      .force('center', d3.forceCenter<SimNode>(w / 2, h / 2))
      .force('collide', d3.forceCollide<SimNode>(46))
      .on('tick', () => {
        for (const n of simNodes) {
          const el = nodeRefs.current.get(n.id)
          if (el && n.x != null && n.y != null) {
            el.setAttribute('transform', `translate(${n.x},${n.y})`)
          }
        }
        for (const e of simEdges) {
          const sId =
            typeof e.source === 'string' ? e.source : (e.source as SimNode).id
          const tId =
            typeof e.target === 'string' ? e.target : (e.target as SimNode).id
          const line = linkRefs.current.get(`${sId}__${tId}`)
          const s = e.source as SimNode
          const t = e.target as SimNode
          if (line && s.x != null && s.y != null && t.x != null && t.y != null) {
            line.setAttribute('x1', String(s.x))
            line.setAttribute('y1', String(s.y))
            line.setAttribute('x2', String(t.x))
            line.setAttribute('y2', String(t.y))
          }
        }
      })
    simRef.current = sim

    const svgSel = d3.select(svg)
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .filter((event: Event) => {
        const target = event.target as Element | null
        if (target?.closest('[data-stack-node]')) return false
        return !(event as MouseEvent).button
      })
      .on('zoom', (ev) => {
        viewportRef.current?.setAttribute('transform', ev.transform.toString())
      })
    svgSel.call(zoom)
    zoomRef.current = zoom

    const dragBehavior = d3
      .drag<SVGGElement, SimNode>()
      .on('start', (event, d) => {
        if (!event.active) sim.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event) => {
        if (!event.active) sim.alphaTarget(0)
      })
    for (const n of simNodes) {
      const el = nodeRefs.current.get(n.id)
      if (el) {
        d3.select<SVGGElement, SimNode>(el).datum(n).call(dragBehavior)
      }
    }

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nw = entry.contentRect.width
        const nh = entry.contentRect.height
        if (nw > 0 && nh > 0) {
          setSize({ w: nw, h: nh })
          sim.force('center', d3.forceCenter<SimNode>(nw / 2, nh / 2))
          sim.alpha(0.3).restart()
        }
      }
    })
    ro.observe(container)

    return () => {
      sim.stop()
      ro.disconnect()
      svgSel.on('.zoom', null)
    }
  }, [simNodes, simEdges])

  const onDoubleClick = (id: string) => {
    const n = simNodes.find((x) => x.id === id)
    if (!n) return
    n.fx = null
    n.fy = null
    simRef.current?.alpha(0.3).restart()
  }

  const onReset = () => {
    if (!svgRef.current || !zoomRef.current) return
    d3.select(svgRef.current)
      .transition()
      .duration(400)
      .call(zoomRef.current.transform, d3.zoomIdentity)
  }

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const nodeDimmed = (id: string) => {
    if (isolated && nodeGroup.get(id) !== isolated) return true
    if (hovered && hovered !== id && !neighbors.get(hovered)?.has(id)) return true
    return false
  }
  const edgeOpacity = (s: string, t: string): number => {
    if (isolated) {
      const gs = nodeGroup.get(s)
      const gt = nodeGroup.get(t)
      return gs === isolated && gt === isolated ? 0.7 : 0.05
    }
    if (hovered) {
      return s === hovered || t === hovered ? 1 : 0.05
    }
    return 0.25
  }

  const handlePointerEnterNode = (id: string, e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    setHovered(id)
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }
  const handlePointerMoveNode = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }
  const handlePointerLeaveNode = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    setHovered(null)
    setTooltipPos(null)
  }
  const handlePointerDownNode = (id: string, e: React.PointerEvent) => {
    if (e.pointerType !== 'touch') return
    setHovered((prev) => (prev === id ? null : id))
    const el = e.currentTarget as SVGGElement
    const elRect = el.getBoundingClientRect()
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect)
      setTooltipPos({
        x: elRect.left + elRect.width / 2 - rect.left,
        y: elRect.top - rect.top,
      })
  }
  const handleBackgroundPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      if ((e.target as Element).closest('[data-stack-node]')) return
      setHovered(null)
      setTooltipPos(null)
    }
  }

  const handleFocusNode = (id: string, e: React.FocusEvent<SVGGElement>) => {
    setHovered(id)
    const elRect = e.currentTarget.getBoundingClientRect()
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect)
      setTooltipPos({
        x: elRect.left + elRect.width / 2 - rect.left,
        y: elRect.top - rect.top,
      })
  }
  const handleBlurNode = () => {
    setHovered(null)
    setTooltipPos(null)
  }
  const handleKeyDownNode = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setHovered(null)
      setTooltipPos(null)
    }
  }

  const hoveredNode = hovered ? stackNodes.find((n) => n.id === hovered) : null

  return (
    <div
      ref={containerRef}
      onPointerDown={handleBackgroundPointerDown}
      className="relative h-[min(72vh,720px)] w-full overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02]"
    >
      <svg
        ref={svgRef}
        width={size.w}
        height={size.h}
        className="block touch-none"
        role="img"
        aria-label="Interactive stack knowledge graph"
      >
        <g ref={viewportRef}>
          <g className="links">
            {stackEdges.map((e) => {
              const key = edgeKey(e)
              return (
                <line
                  key={key}
                  ref={(el) => {
                    if (el) linkRefs.current.set(key, el)
                  }}
                  stroke="#F5F4F0"
                  strokeWidth={hovered && (e.source === hovered || e.target === hovered) ? 1.5 : 1}
                  strokeOpacity={edgeOpacity(e.source, e.target)}
                  style={{ transition: 'stroke-opacity 200ms ease, stroke-width 200ms ease' }}
                />
              )
            })}
          </g>
          <g className="nodes">
            {stackNodes.map((n) => {
              const dim = nodeDimmed(n.id)
              const color = `var(${stackGroupMeta[n.group].colorVar})`
              const width = estimateLabelWidth(n.name)
              return (
                <g
                  key={n.id}
                  data-stack-node={n.id}
                  ref={(el) => {
                    if (el) nodeRefs.current.set(n.id, el)
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${n.name} — ${stackGroupMeta[n.group].label}`}
                  style={{
                    cursor: 'grab',
                    opacity: dim ? 0.25 : 1,
                    transition: 'opacity 200ms ease',
                  }}
                  onPointerEnter={(e) => handlePointerEnterNode(n.id, e)}
                  onPointerMove={handlePointerMoveNode}
                  onPointerLeave={handlePointerLeaveNode}
                  onPointerDown={(e) => handlePointerDownNode(n.id, e)}
                  onDoubleClick={() => onDoubleClick(n.id)}
                  onFocus={(e) => handleFocusNode(n.id, e)}
                  onBlur={handleBlurNode}
                  onKeyDown={handleKeyDownNode}
                >
                  <rect
                    x={-width / 2}
                    y={-14}
                    width={width}
                    height={28}
                    rx={14}
                    fill={color}
                    fillOpacity={0.14}
                    stroke={color}
                    strokeOpacity={hovered === n.id ? 1 : 0.8}
                    strokeWidth={hovered === n.id ? 2 : 1.25}
                  />
                  <text
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize={11}
                    fill="var(--color-fg)"
                    fontFamily="var(--font-mono)"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {n.name}
                  </text>
                </g>
              )
            })}
          </g>
        </g>
      </svg>

      {hoveredNode && tooltipPos && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 max-w-[320px] rounded-[var(--radius-md)] border border-white/15 bg-[color:var(--color-bg)]/95 p-3 shadow-lg backdrop-blur"
          style={{
            left: Math.min(tooltipPos.x + 16, size.w - 336),
            top: Math.min(tooltipPos.y + 16, size.h - 160),
          }}
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: `var(${stackGroupMeta[hoveredNode.group].colorVar})` }}
          >
            {stackGroupMeta[hoveredNode.group].label}
          </div>
          <div className="mt-1 font-mono text-sm text-[color:var(--color-fg)]">
            {hoveredNode.name}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[color:var(--color-fg)]/80">
            {hoveredNode.note}
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-2">
        {(Object.keys(stackGroupMeta) as StackGroupKey[])
          .sort((a, b) => stackGroupMeta[a].order - stackGroupMeta[b].order)
          .map((k) => {
            const active = isolated === k
            return (
              <button
                key={k}
                type="button"
                onClick={() => setIsolated(active ? null : k)}
                className={`pointer-events-auto flex items-center gap-2 rounded-[var(--radius-pill)] border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                  active
                    ? 'border-white/40 bg-white/10'
                    : 'border-white/10 bg-[color:var(--color-bg)]/70 hover:border-white/25'
                }`}
                aria-pressed={active}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: `var(${stackGroupMeta[k].colorVar})` }}
                  aria-hidden
                />
                {stackGroupMeta[k].label}
              </button>
            )
          })}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="absolute bottom-3 right-3 rounded-[var(--radius-pill)] border border-white/10 bg-[color:var(--color-bg)]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-white/25"
      >
        Reset view
      </button>

      <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-fg)]/50">
        {isTouch ? 'Tap a node' : 'Hover a node'}
      </div>
    </div>
  )
}

export function StackGraph() {
  const [isFallback, setFallback] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return (
      prefersReducedMotion() ||
      window.matchMedia('(max-width: 767px)').matches
    )
  })

  useEffect(() => {
    const mqNarrow = window.matchMedia('(max-width: 767px)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setFallback(mqNarrow.matches || mqMotion.matches)
    mqNarrow.addEventListener('change', onChange)
    mqMotion.addEventListener('change', onChange)
    return () => {
      mqNarrow.removeEventListener('change', onChange)
      mqMotion.removeEventListener('change', onChange)
    }
  }, [])

  if (isFallback) return <StackGraphFallback />
  return <StackGraphCanvas />
}

export default StackGraph
