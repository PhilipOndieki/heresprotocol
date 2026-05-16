'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/cn'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
  className?: string
  onInk?: boolean
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 1200,
  className,
  onInk = true,
}: StatCounterProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return
    hasStarted.current = true

    const animate = (time: number) => {
      if (startTime.current === null) startTime.current = time
      const elapsed = time - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      setDisplay(eased * value)
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate)
      } else {
        setDisplay(value)
      }
    }

    rafId.current = requestAnimationFrame(animate)
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [isInView, value, duration])

  const isDecimal = value % 1 !== 0
  const formatted = isDecimal
    ? display.toFixed(2)
    : Math.round(display).toLocaleString()

  const textColor = onInk
    ? 'text-[var(--color-text-on-ink)]'
    : 'text-[var(--color-text-on-bone)]'
  const mutedColor = onInk
    ? 'text-[var(--color-text-on-ink-muted)]'
    : 'text-[var(--color-text-on-bone-muted)]'

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)}>
      {/* Screen reader announces final value only */}
      <span className="sr-only" aria-live="polite">
        {isInView ? `${prefix}${value}${suffix} ${label}` : ''}
      </span>
      <div
        className={cn('font-display font-bold', textColor)}
        style={{ fontSize: 'var(--font-size-display-lg)' }}
        aria-hidden="true"
      >
        {prefix}
        {formatted}
        {suffix}
        <sup className="text-[var(--color-violet)] ml-1 text-[0.4em] align-super font-bold">
          +
        </sup>
      </div>
      <div
        className={cn('font-pixel text-[0.75rem] tracking-[0.18em]', mutedColor)}
        aria-hidden="true"
      >
        {label}
      </div>
    </div>
  )
}
