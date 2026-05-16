import { cn } from '@/lib/cn'

interface DotDividerProps {
  className?: string
  height?: number
  dotCount?: number
  surface?: 'ink' | 'bone'
}

/* Seeded pseudo-random for SSR/client consistency */
function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

export function DotDivider({
  className,
  height = 64,
  dotCount = 120,
  surface = 'ink',
}: DotDividerProps) {
  const rand = seededRand(42)
  const width = 1280

  const dots = Array.from({ length: dotCount }, (_, i) => {
    const x = rand() * width
    const y = rand() * height
    const r = rand()
    const isViolet = r > 0.6
    const size = 1.5 + rand() * 2.5
    const color = isViolet
      ? 'var(--color-violet)'
      : surface === 'ink'
      ? 'rgba(245,244,248,0.15)'
      : 'rgba(10,10,20,0.12)'

    return { x, y, size, color, key: i }
  })

  return (
    <div
      className={cn('w-full overflow-hidden', className)}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height={height}
        className="block"
      >
        {dots.map(({ x, y, size, color, key }) => (
          <circle key={key} cx={x} cy={y} r={size} fill={color} />
        ))}
      </svg>
    </div>
  )
}
