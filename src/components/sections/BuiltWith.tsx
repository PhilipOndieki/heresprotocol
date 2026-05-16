import { PixelText } from '@/components/ui/PixelText'
import { MarqueeRow } from '@/components/ui/MarqueeRow'
import { PARTNERS } from '@/lib/constants'

export function BuiltWith() {
  return (
    <section className="surface-ink pb-[var(--spacing-section)]" aria-label="Built with">
      <div className="container-site mb-10">
        <PixelText className="text-[var(--color-text-on-ink-muted)]">
          Built With
        </PixelText>
      </div>
      <MarqueeRow items={PARTNERS} />
    </section>
  )
}
