import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, Text } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState } from 'react'
import { Group, MathUtils, Mesh, Vector3 } from 'three'
import { prefersReducedMotion } from '../../lib/motion'

type NodeDef = {
  id: string
  label: string
  position: [number, number, number]
}

const NODES: NodeDef[] = [
  { id: 'agent', label: 'Agent', position: [0, 0, 0] },
  { id: 'memory', label: 'Memory', position: [-2.2, 0.6, 0.4] },
  { id: 'tool', label: 'Tool', position: [2.1, 0.3, 0.6] },
  { id: 'context', label: 'Context', position: [0.1, -1.6, 0.5] },
  { id: 'rag', label: 'RAG', position: [1.5, 1.7, -0.5] },
  { id: 'vector', label: 'Vector', position: [3, 1.9, -0.2] },
  { id: 'graph', label: 'Graph', position: [0.6, 2.7, -0.7] },
  { id: 'audit', label: 'Audit', position: [-2.1, -1.4, -0.6] },
  { id: 'stream', label: 'Stream', position: [0, -2.6, -0.3] },
]

const EDGES: Array<[string, string]> = [
  ['agent', 'memory'],
  ['agent', 'tool'],
  ['agent', 'context'],
  ['rag', 'vector'],
  ['rag', 'graph'],
  ['memory', 'context'],
  ['audit', 'stream'],
  ['audit', 'agent'],
  ['stream', 'tool'],
]

function randomOffset(): [number, number, number] {
  const r = 8
  return [
    (Math.random() - 0.5) * r,
    (Math.random() - 0.5) * r,
    (Math.random() - 0.5) * r,
  ]
}

type NodeProps = {
  def: NodeDef
  hovered: string | null
  setHovered: (id: string | null) => void
  animate: boolean
  livePositions: Map<string, Vector3>
}

function Node({ def, hovered, setHovered, animate, livePositions }: NodeProps) {
  const meshRef = useRef<Mesh>(null)
  const target = useMemo(() => new Vector3(...def.position), [def.position])
  const start = useMemo(() => {
    if (!animate) return target.clone()
    const [x, y, z] = randomOffset()
    return new Vector3(x, y, z)
  }, [animate, target])
  const current = useMemo(() => start.clone(), [start])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    current.x = MathUtils.damp(current.x, target.x, 4, delta)
    current.y = MathUtils.damp(current.y, target.y, 4, delta)
    current.z = MathUtils.damp(current.z, target.z, 4, delta)
    const t = performance.now() * 0.0005
    const drift = animate ? Math.sin(t + def.position[0]) * 0.04 : 0
    meshRef.current.position.set(current.x, current.y + drift, current.z)
    livePositions.set(def.id, meshRef.current.position)
  })

  const active = hovered === def.id
  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(def.id)
      }}
      onPointerOut={() => setHovered(null)}
    >
      <sphereGeometry args={[active ? 0.16 : 0.11, 24, 24]} />
      <meshStandardMaterial
        color={active ? '#D4FF4F' : '#F5F4F0'}
        emissive={active ? '#D4FF4F' : '#000000'}
        emissiveIntensity={active ? 0.6 : 0}
        roughness={0.4}
      />
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.09}
        letterSpacing={0.12}
        color={active ? '#D4FF4F' : '#F5F4F0'}
        fillOpacity={active ? 1 : 0.55}
        anchorX="center"
        anchorY="middle"
        renderOrder={1}
        material-depthTest={false}
      >
        {def.label.toUpperCase()}
      </Text>
    </mesh>
  )
}

function Edge({
  a,
  b,
  hovered,
  livePositions,
}: {
  a: string
  b: string
  hovered: string | null
  livePositions: Map<string, Vector3>
}) {
  const ref = useRef<any>(null)
  const points = useRef<[Vector3, Vector3]>([new Vector3(), new Vector3()])

  useFrame(() => {
    const pa = livePositions.get(a)
    const pb = livePositions.get(b)
    if (!pa || !pb) return
    points.current[0].copy(pa)
    points.current[1].copy(pb)
    if (ref.current?.geometry) {
      ref.current.geometry.setPositions([
        pa.x,
        pa.y,
        pa.z,
        pb.x,
        pb.y,
        pb.z,
      ])
    }
  })

  const active = hovered === a || hovered === b
  return (
    <Line
      ref={ref}
      points={[
        [0, 0, 0],
        [0, 0, 0],
      ]}
      color={active ? '#D4FF4F' : '#F5F4F0'}
      lineWidth={active ? 1.2 : 0.6}
      transparent
      opacity={active ? 0.8 : 0.25}
    />
  )
}

function Scene({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const livePositions = useMemo(() => new Map<string, Vector3>(), [])
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!group.current) return
    const tx = animate ? pointer.y * 0.15 : 0
    const ty = animate ? pointer.x * 0.25 : 0
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      tx,
      3,
      delta,
    )
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      ty,
      3,
      delta,
    )
    if (animate) {
      group.current.rotation.y += delta * 0.04
    }
  })

  return (
    <group ref={group}>
      {EDGES.map(([a, b]) => (
        <Edge
          key={`${a}-${b}`}
          a={a}
          b={b}
          hovered={hovered}
          livePositions={livePositions}
        />
      ))}
      {NODES.map((n) => (
        <Node
          key={n.id}
          def={n}
          hovered={hovered}
          setHovered={setHovered}
          animate={animate}
          livePositions={livePositions}
        />
      ))}
    </group>
  )
}

function StaticFallback() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 grid place-items-center"
    >
      <div className="grid grid-cols-3 gap-[var(--space-4)] opacity-30">
        {NODES.map((n) => (
          <span
            key={n.id}
            className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-fg)]"
          >
            {n.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function HeroMesh() {
  const reduced = prefersReducedMotion()
  if (reduced) return <StaticFallback />
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 6]} intensity={1.2} />
        <Suspense fallback={null}>
          <Scene animate={!reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
