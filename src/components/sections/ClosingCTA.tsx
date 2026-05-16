'use client'

import { motion } from 'framer-motion'
import { StatCounter } from '@/components/ui/StatCounter'
import { Button } from '@/components/ui/Button'
import { DotDivider } from '@/components/ui/DotDivider'
import { CLOSING_CTA_COPY, CLOSING_STATS } from '@/lib/constants'
import { fadeUp, staggerContainer, VIEWPORT_OPTS } from '@/lib/motion'

export function ClosingCTA() {
  return (
    <>
      <DotDivider surface="bone" height={56} />
      <section
        className="surface-bone section-padding"
        aria-labelledby="closing-cta-heading"
      >
        <div className="container-site">
          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_OPTS}
            className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 mb-24 lg:mb-32 pb-16 border-b border-[var(--color-border-on-bone)]"
          >
            {CLOSING_STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  onInk={false}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_OPTS}
            className="flex flex-col items-start lg:flex-row lg:items-end lg:justify-between gap-12"
          >
            <motion.h2
              variants={fadeUp}
              id="closing-cta-heading"
              className="font-display font-bold text-[var(--color-text-on-bone)] max-w-[700px]"
              style={{
                fontSize: 'var(--font-size-display-lg)',
                letterSpacing: '-0.025em',
                lineHeight: 0.95,
              }}
            >
              {CLOSING_CTA_COPY.headline}
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 shrink-0"
            >
              <Button variant="solid" size="lg" showChevron href="#">
                {CLOSING_CTA_COPY.ctaPrimary}
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="#"
                className="border-[var(--color-text-on-bone)] text-[var(--color-text-on-bone)] hover:border-[var(--color-violet)] hover:text-[var(--color-violet)]"
              >
                {CLOSING_CTA_COPY.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
