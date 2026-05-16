'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PixelText } from '@/components/ui/PixelText'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { DotDivider } from '@/components/ui/DotDivider'
import { USE_CASES_COPY, USE_CASE_CARDS } from '@/lib/constants'
import { fadeUp, staggerContainer, VIEWPORT_OPTS } from '@/lib/motion'

export function UseCases() {
  return (
    <>
      <DotDivider surface="ink" height={56} />
      <section
        className="surface-ink section-padding"
        id="ecosystem"
        aria-labelledby="use-cases-heading"
      >
        <div className="container-site">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_OPTS}
            className="mb-16 lg:mb-20"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <PixelText className="text-[var(--color-text-on-ink-muted)]">
                {USE_CASES_COPY.eyebrow}
              </PixelText>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              id="use-cases-heading"
              className="font-display font-bold text-[var(--color-text-on-ink)] max-w-[640px]"
              style={{
                fontSize: 'var(--font-size-display-lg)',
                letterSpacing: '-0.025em',
                lineHeight: 0.95,
              }}
            >
              {USE_CASES_COPY.headline}
            </motion.h2>
          </motion.div>

          {/* Cards grid — 50/50 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_OPTS}
                transition={{ delay: i * 0.12 }}
                className="group"
              >
                <Link
                  href={card.href}
                  className="
                    block h-full p-8 lg:p-10
                    border border-[var(--color-violet-muted)]
                    hover:border-[var(--color-violet)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_16px_48px_rgba(92,61,255,0.12)]
                    bg-[rgba(92,61,255,0.03)]
                  "
                >
                  <div aria-hidden="true">
                    <PixelIcon
                      variant={card.icon}
                      size={56}
                      color="var(--color-violet)"
                    />
                  </div>
                  <div className="mt-6">
                    <h3
                      className="font-display font-bold text-[var(--color-text-on-ink)] mb-4"
                      style={{
                        fontSize: 'var(--font-size-display-md)',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.1,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[var(--color-text-on-ink-muted)] leading-relaxed text-[length:var(--font-size-body-lg)] mb-6">
                      {card.body}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[var(--color-violet)] font-medium text-sm group-hover:gap-3 transition-all duration-200">
                      Learn more
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
