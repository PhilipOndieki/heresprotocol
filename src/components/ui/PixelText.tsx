import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface PixelTextProps {
  children: ReactNode
  className?: string
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3'
}

export function PixelText({
  children,
  className,
  as: Tag = 'span',
}: PixelTextProps) {
  return (
    <Tag
      className={cn(
        'font-pixel text-[length:var(--font-size-eyebrow)] tracking-[0.18em] uppercase',
        className
      )}
    >
      {children}
    </Tag>
  )
}
