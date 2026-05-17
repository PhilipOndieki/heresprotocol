'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Hero } from '@/components/sections/Hero'
import { StatsBar } from '@/components/sections/StatsBar'
import { BuiltWithBand } from '@/components/sections/BuiltWithBand'

export function StackedReveal() {
  const sceneRef = useRef<HTMLElement>(null)
  const marqueeLayerRef = useRef<HTMLDivElement>(null)
  const statsLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeLayerRef.current || !statsLayerRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const headerHeight =
      document.querySelector('header')?.getBoundingClientRect().height ?? 72
    const bandHeight = marqueeLayerRef.current.getBoundingClientRect().height

    if (prefersReducedMotion) {
      gsap.set(marqueeLayerRef.current, { y: headerHeight })
      gsap.set(statsLayerRef.current, { y: headerHeight + bandHeight })
      return
    }

    let mounted = true
    let stInstance: { kill: () => void } | undefined
    let tlInstance: { kill: () => void } | undefined

    const init = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (
        !mounted ||
        !sceneRef.current ||
        !marqueeLayerRef.current ||
        !statsLayerRef.current
      )
        return

      const vh = window.innerHeight
      const hdrH =
        document.querySelector('header')?.getBoundingClientRect().height ?? 72
      const bandH = marqueeLayerRef.current.getBoundingClientRect().height

      gsap.set(marqueeLayerRef.current, { y: vh })
      gsap.set(statsLayerRef.current, { y: vh })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Phase 1 (0→0.45): marquee band rises from bottom to just below header
      tl.to(
        marqueeLayerRef.current,
        { y: hdrH, ease: 'none', duration: 0.45 },
        0
      )

      // Phase 2 (0.5→1.0): StatsBar rises from bottom to sit below marquee band
      tl.to(
        statsLayerRef.current,
        { y: hdrH + bandH, ease: 'none', duration: 0.5 },
        0.5
      )

      stInstance = ScrollTrigger.getAll().at(-1)
      tlInstance = tl
    }

    init()

    return () => {
      mounted = false
      stInstance?.kill()
      tlInstance?.kill()
    }
  }, [])

  return (
    <section ref={sceneRef} className="relative h-[220vh] md:h-[300vh]">
      {/* Sticky wrapper: pins for the full scene duration */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: Hero — z-1, always visible underneath */}
        <div className="absolute inset-0 z-[1]">
          <Hero />
        </div>

        {/* Layer 2: Marquee band — z-2, rises from 100vh to headerHeight */}
        <div
          ref={marqueeLayerRef}
          className="absolute top-0 left-0 right-0 z-[2] will-change-transform"
          style={{ transform: 'translateY(100vh)' }}
        >
          <BuiltWithBand />
        </div>

        {/* Layer 3: StatsBar overlay — z-3, rises from 100vh to headerHeight+bandHeight */}
        <div
          ref={statsLayerRef}
          className="absolute inset-0 z-[3] will-change-transform"
          style={{
            backgroundColor: 'var(--color-ink)',
            transform: 'translateY(100vh)',
          }}
        >
          <StatsBar showDivider={false} />
        </div>
      </div>
    </section>
  )
}
