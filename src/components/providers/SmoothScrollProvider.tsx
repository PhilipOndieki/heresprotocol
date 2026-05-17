'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<import('lenis').default | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    let destroyed = false
    let rafFn: ((time: number) => void) | null = null

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (destroyed) return

      const lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true })
      lenisRef.current = lenis

      lenis.on('scroll', ScrollTrigger.update)

      rafFn = (time: number) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(rafFn)
      gsap.ticker.lagSmoothing(0)
    }

    init()

    return () => {
      destroyed = true
      if (rafFn) gsap.ticker.remove(rafFn)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
