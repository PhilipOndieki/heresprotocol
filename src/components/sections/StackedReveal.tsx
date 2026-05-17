'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Hero } from '@/components/sections/Hero'
import { StatsBar } from '@/components/sections/StatsBar'
import { BuiltWithBand } from '@/components/sections/BuiltWithBand'

export function StackedReveal() {
  const sceneRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const headerHeight =
      document.querySelector('header')?.getBoundingClientRect().height ?? 72

    if (prefersReducedMotion) {
      gsap.set(overlayRef.current, { y: headerHeight })
      return
    }

    let mounted = true
    let stInstance: { kill: () => void } | undefined
    let tlInstance: { kill: () => void } | undefined

    const init = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!mounted || !sceneRef.current || !overlayRef.current) return

      const vh = window.innerHeight
      const hdrH =
        document.querySelector('header')?.getBoundingClientRect().height ?? 72

      // Start the combined overlay off-screen at the bottom
      gsap.set(overlayRef.current, { y: vh })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Single animation: the entire overlay (band + stats) rises as one unit
      tl.to(overlayRef.current, {
        y: hdrH,
        ease: 'none',
        duration: 1,
      })

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
    <section ref={sceneRef} className="relative h-[220vh] md:h-[280vh]">
      {/* Sticky wrapper: pins the visual for the full scene scroll distance */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Layer 1: Hero — sits underneath, always visible until covered */}
        <div className="absolute inset-0 z-[1]">
          <Hero />
        </div>

        {/* Layer 2: Combined overlay — BuiltWithBand on top, StatsBar below.
            The two are stacked inside one div so they travel as a single unit. */}
        <div
          ref={overlayRef}
          className="absolute top-0 left-0 right-0 z-[2] will-change-transform"
          style={{ transform: 'translateY(100vh)' }}
        >
          {/* Violet marquee strip — glued to the top of the rising panel */}
          <BuiltWithBand />

          {/* Stats section — flush below the band, extends to fill the rest of viewport */}
          <div
            className="w-full"
            style={{
              backgroundColor: 'var(--color-ink)',
              minHeight: '100vh',
            }}
          >
            <StatsBar showDivider={false} />
          </div>
        </div>

      </div>
    </section>
  )
}