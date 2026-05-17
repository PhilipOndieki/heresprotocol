import { PARTNERS } from '@/lib/constants'

function BandCell({ name }: { name: string }) {
  return (
    <div
      className="shrink-0 h-full flex items-center justify-center text-white text-sm font-medium tracking-wide cursor-default select-none transition-colors duration-200 hover:bg-[var(--color-violet-bright)] min-w-[140px] md:min-w-[clamp(180px,18vw,260px)]"
      style={{ borderRight: '1px solid rgba(255,255,255,0.15)' }}
    >
      {name}
    </div>
  )
}

export function BuiltWithBand() {
  const doubled = [...PARTNERS, ...PARTNERS]

  return (
    <div
      className="overflow-hidden w-full"
      aria-label="Partner logos"
      style={{
        backgroundColor: 'var(--color-violet)',
        height: 'clamp(96px, 12vh, 140px)',
      }}
    >
      <div className="marquee-track h-full">
        {doubled.map((name, i) => (
          <BandCell key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  )
}
