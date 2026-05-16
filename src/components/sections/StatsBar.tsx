import { StatCounter } from '@/components/ui/StatCounter'
import { DotDivider } from '@/components/ui/DotDivider'
import { STATS } from '@/lib/constants'

export function StatsBar() {
  return (
    <>
      <DotDivider surface="ink" height={56} />
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
