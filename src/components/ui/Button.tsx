'use client'

import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/cn'
import { ChevronRight } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'solid' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  showChevron?: boolean
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  solid:
    'bg-[var(--color-violet)] text-white hover:bg-[var(--color-violet-bright)] active:bg-[var(--color-violet-deep)] [&:hover_svg.chevron]:translate-x-[2px]',
  outline:
    'border border-[var(--color-violet)] text-[var(--color-violet)] hover:bg-[var(--color-violet-muted)] bg-transparent',
  ghost:
    'text-[var(--color-text-on-ink-muted)] hover:text-[var(--color-text-on-ink)] bg-transparent',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-full',
  md: 'h-11 px-6 text-base rounded-full',
  lg: 'h-13 px-8 text-lg rounded-full',
}

export function Button({
  variant = 'solid',
  size = 'md',
  asChild = false,
  showChevron,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const Tag = asChild ? Slot : href ? 'a' : 'button'

  const extraProps = href ? { href } : {}

  return (
    <Tag
      className={cn(
        'btn-base inline-flex items-center gap-2 font-medium select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...(extraProps as Record<string, unknown>)}
      {...(props as Record<string, unknown>)}
    >
      {children}
      {showChevron && (
        <ChevronRight
          className="chevron w-4 h-4 transition-transform duration-200"
          aria-hidden="true"
        />
      )}
    </Tag>
  )
}
