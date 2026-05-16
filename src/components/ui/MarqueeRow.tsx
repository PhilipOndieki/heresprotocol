import { cn } from '@/lib/cn'

interface MarqueeRowProps {
  items: string[]
  className?: string
}

export function MarqueeRow({ items, className }: MarqueeRowProps) {
  /* Duplicate for seamless loop */
  const doubled = [...items, ...items]

  return (
    <div
      className={cn('overflow-hidden w-full', className)}
      aria-label="Partner logos"
    >
      <div className="marquee-track gap-4 items-center py-2">
        {doubled.map((name, i) => (
          <PartnerPill key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  )
}

function PartnerPill({ name }: { name: string }) {
  return (
    <div
      className="
        shrink-0 px-6 py-3 rounded-full
        border border-[var(--color-border-on-ink)]
        text-[var(--color-text-on-ink-muted)]
        hover:text-[var(--color-text-on-ink)]
        hover:border-[var(--color-border-on-ink)]
        transition-colors duration-200
        font-medium text-sm tracking-wide
        cursor-default select-none
      "
    >
      {name}
    </div>
  )
}
