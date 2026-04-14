import { HeroMesh } from './HeroMesh'
import { HeroCopy } from './HeroCopy'

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <HeroMesh />
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <HeroCopy />
    </section>
  )
}
