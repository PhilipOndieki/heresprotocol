'use client'

import { motion } from 'framer-motion'
import { PixelText } from '@/components/ui/PixelText'
import { DotDivider } from '@/components/ui/DotDivider'
import { PRODUCT_FLOW_COPY, PRODUCT_STEPS } from '@/lib/constants'
import { fadeUp, staggerContainer, VIEWPORT_OPTS } from '@/lib/motion'

export function ProductFlow() {
  return (
    <>
      <DotDivider surface="ink" height={56} />
      <section
        className="surface-ink section-padding"
        id="product"
        aria-labelledby="product-flow-heading"
      >
        <div className="container-site">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_OPTS}
            className="text-center mb-20 lg:mb-28"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <PixelText className="text-[var(--color-text-on-ink-muted)]">
                {PRODUCT_FLOW_COPY.eyebrow}
              </PixelText>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              id="product-flow-heading"
              className="font-display font-bold text-[var(--color-text-on-ink)] mb-6"
              style={{
                fontSize: 'var(--font-size-display-lg)',
                letterSpacing: '-0.025em',
                lineHeight: 0.95,
              }}
            >
              {PRODUCT_FLOW_COPY.headline[0]}
              <br />
              {PRODUCT_FLOW_COPY.headline[1]}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[var(--color-text-on-ink-muted)] text-[length:var(--font-size-body-lg)] max-w-[480px] mx-auto"
            >
              {PRODUCT_FLOW_COPY.lead}
            </motion.p>
          </motion.div>

          {/* Steps timeline */}
          <div className="max-w-[720px] mx-auto flex flex-col">
            {PRODUCT_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_OPTS}
                transition={{ delay: i * 0.15 }}
                className="relative flex gap-8 lg:gap-12 pb-16 last:pb-0"
              >
                {/* Connector line */}
                {i < PRODUCT_STEPS.length - 1 && (
                  <div
                    className="absolute left-[1.75rem] top-16 bottom-0 w-px"
                    style={{
                      background:
                        'linear-gradient(to bottom, var(--color-violet), transparent)',
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Step number */}
                <div className="shrink-0 flex flex-col items-center">
                  <div
                    className="
                      w-14 h-14 rounded-full
                      border border-[var(--color-violet)]
                      flex items-center justify-center
                      font-pixel text-[var(--color-violet)]
                      text-xl
                      bg-[var(--color-violet-muted)]
                    "
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1 pb-4">
                  <h3
                    className="font-display font-bold text-[var(--color-text-on-ink)] mb-3"
                    style={{
                      fontSize: 'var(--font-size-display-md)',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.1,
                    }}
                  >
                    {step.heading}
                  </h3>
                  <p className="text-[var(--color-text-on-ink-muted)] leading-relaxed text-[length:var(--font-size-body-lg)]">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
