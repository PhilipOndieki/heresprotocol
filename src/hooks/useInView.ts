'use client'

import { useInView as useFramerInView } from 'framer-motion'
import type { UseInViewOptions } from 'framer-motion'
import { useRef } from 'react'

export function useInView(options?: { once?: boolean; margin?: UseInViewOptions['margin'] }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useFramerInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? ('-80px' as UseInViewOptions['margin']),
  })
  return { ref, isInView }
}
