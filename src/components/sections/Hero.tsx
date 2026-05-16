'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/Button'
import { PixelText } from '@/components/ui/PixelText'
import { HERO_COPY } from '@/lib/constants'
import { EASE_OUT_EXPO } from '@/lib/motion'

/* Decorative dot cluster */
function DotCluster({
  count = 18,
  side,
}: {
  count?: number
  side: 'left' | 'right'
}) {
  const seed = side === 'left' ? 123 : 456
  let s = seed
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }

  const dots = Array.from({ length: count }, (_, i) => ({
    key: i,
    x: rand() * 120,
    y: rand() * 200,
    r: 1.5 + rand() * 3,
    opacity: 0.3 + rand() * 0.7,
    isViolet: rand() > 0.4,
  }))

  return (
    <svg
      width="120"
      height="200"
      viewBox="0 0 120 200"
      aria-hidden="true"
      className="absolute top-1/3 -translate-y-1/2 hidden xl:block opacity-70"
      style={{ [side]: 'clamp(1rem, 3vw, 3rem)' }}
    >
      {dots.map(({ key, x, y, r, opacity, isViolet }) => (
        <circle
          key={key}
          cx={x}
          cy={y}
          r={r}
          fill={isViolet ? 'var(--color-violet)' : 'rgba(10,10,20,0.4)'}
          opacity={opacity}
        />
      ))}
    </svg>
  )
}

/* Split headline text into characters for stagger animation */
function AnimatedHeadline({ lines }: { lines: readonly string[] }) {
  return (
    <div className="font-display font-bold text-[var(--color-text-on-bone)] text-center" style={{ fontSize: 'var(--font-size-display-xl)', letterSpacing: '-0.025em', lineHeight: 0.95 }}>
      {lines.map((line, li) => (
        <div key={li} className="overflow-hidden block">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.25 + li * 0.12,
              duration: 0.7,
              ease: EASE_OUT_EXPO,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wordmarkRef.current) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) {
      gsap.set(wordmarkRef.current, { y: 0, opacity: 1 })
      return
    }

    gsap.fromTo(
      wordmarkRef.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 1.0,
      }
    )
  }, [])

  return (
    <section
      className="surface-bone relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[72px]"
      aria-labelledby="hero-heading"
    >
      {/* Faint radial violet glow — permitted per spec */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(92,61,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Side dot clusters */}
      <DotCluster side="left" />
      <DotCluster side="right" />

      <div className="container-site flex flex-col items-center text-center gap-8 py-24 md:py-32 relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <PixelText className="text-[var(--color-text-on-bone-muted)] max-w-[90vw] text-center leading-relaxed">
            <span className="hidden sm:inline">{HERO_COPY.eyebrow}</span>
            <span className="sm:hidden">HERES PROTOCOL</span>
          </PixelText>
        </motion.div>

        {/* Headline */}
        <div id="hero-heading">
          <AnimatedHeadline lines={HERO_COPY.headline} />
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-[var(--color-text-on-bone-muted)] max-w-[640px] text-[length:var(--font-size-body-lg)] leading-relaxed"
        >
          {HERO_COPY.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 18 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button variant="solid" size="lg" showChevron href="#">
            {HERO_COPY.ctaPrimary}
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="#"
            className="border-[var(--color-text-on-bone)] text-[var(--color-text-on-bone)] hover:border-[var(--color-violet)] hover:text-[var(--color-violet)]"
          >
            {HERO_COPY.ctaSecondary}
          </Button>
        </motion.div>
      </div>

      {/* Massive bottom wordmark */}
      <div
        ref={wordmarkRef}
        className="w-full absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <div
          className="font-display font-black text-center leading-none text-[var(--color-text-on-bone)] opacity-[0.06]"
          style={{
            fontSize: 'clamp(6rem, 22vw, 22rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            transform: 'translateY(8%)',
          }}
        >
          HERES
        </div>
      </div>
    </section>
  )
}
