import { StatCounter } from '@/components/ui/StatCounter'
import { DotDivider } from '@/components/ui/DotDivider'
import { STATS } from '@/lib/constants'

interface StatsBarProps {
  showDivider?: boolean
}

export function StatsBar({ showDivider = true }: StatsBarProps) {
  return (
    <>
      {showDivider && <DotDivider surface="ink" height={56} />}
      <section
        className="surface-ink section-padding"
        aria-label="Protocol statistics"
      >
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-12">
            {STATS.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                onInk
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
