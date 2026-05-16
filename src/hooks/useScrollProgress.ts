'use client'

import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      setScrollY(y)
      setProgress(max > 0 ? y / max : 0)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return { progress, scrollY }
}
