'use client'

import { motion } from 'framer-motion'
import { PixelText } from '@/components/ui/PixelText'
import { PixelIcon } from '@/components/ui/PixelIcon'
import { DotDivider } from '@/components/ui/DotDivider'
import { WHY_HERES_COPY, FEATURE_CARDS } from '@/lib/constants'
import { fadeUp, staggerContainer, VIEWPORT_OPTS } from '@/lib/motion'

// ─── Named export: bare heading block used by WhyHeresReveal ──────────────
// Renders the real <h2 id="why-heres-heading"> without scroll animations so
// the reveal choreography can show it inside the animated box.
export function WhyHeresHeader() {
  return (
    <div className="mb-16 lg:mb-24">
      <div className="mb-6">
        <PixelText className="text-[var(--color-text-on-bone-muted)]">
          {WHY_HERES_COPY.eyebrow}
        </PixelText>
      </div>
      <h2
        id="why-heres-heading"
        className="font-display font-bold text-[var(--color-text-on-bone)] max-w-[880px]"
        style={{
          fontSize: 'var(--font-size-display-lg)',
          letterSpacing: '-0.025em',
          lineHeight: 0.95,
        }}
      >
        {WHY_HERES_COPY.headline}
      </h2>
    </div>
  )
}

// ─── Named export: feature card grid ────────────────────────────────────────
// cardsVisible={true}  → Framer Motion whileInView entrance (standalone path)
// cardsVisible={false} → data-why-card + opacity:0 initial (reveal path;
//                        GSAP animates cards in during Phase D)
export function WhyHeresBody({ cardsVisible }: { cardsVisible: boolean }) {
  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-8">

      {/* Card 1: cols 1–5 */}
      {cardsVisible ? (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_OPTS}
          transition={{ delay: 0 }}
          className="col-span-12 md:col-span-5 group"
        >
          <FeatureCard card={FEATURE_CARDS[0]!} />
        </motion.div>
      ) : (
        <div
          className="col-span-12 md:col-span-5 group"
          data-why-card
          style={{ opacity: 0 }}
        >
          <FeatureCard card={FEATURE_CARDS[0]!} />
        </div>
      )}

      {/* Desktop spacer: col 6 */}
      <div className="hidden md:block md:col-span-1" />

      {/* Card 2: cols 7–12 */}
      {cardsVisible ? (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_OPTS}
          transition={{ delay: 0.12 }}
          className="col-span-12 md:col-span-6 group"
        >
          <FeatureCard card={FEATURE_CARDS[1]!} />
        </motion.div>
      ) : (
        <div
          className="col-span-12 md:col-span-6 group"
          data-why-card
          style={{ opacity: 0 }}
        >
          <FeatureCard card={FEATURE_CARDS[1]!} />
        </div>
      )}

      {/* Row 2 offset spacer: col 1 */}
      <div className="hidden md:block md:col-span-1" />

      {/* Card 3: cols 2–9 */}
      {cardsVisible ? (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_OPTS}
          transition={{ delay: 0.24 }}
          className="col-span-12 md:col-span-8 group"
        >
          <FeatureCard card={FEATURE_CARDS[2]!} />
        </motion.div>
      ) : (
        <div
          className="col-span-12 md:col-span-8 group"
          data-why-card
          style={{ opacity: 0 }}
        >
          <FeatureCard card={FEATURE_CARDS[2]!} />
        </div>
      )}

      {/* Trailing spacer: cols 10–12 */}
      <div className="hidden md:block md:col-span-3" />

    </div>
  )
}

// ─── Default export: full section with scroll animations ────────────────────
// Used as a standalone section (e.g. reduced-motion fallback).
// Keeps the original staggered Framer Motion entrance.
export function WhyHeres() {
  return (
    <>
      <DotDivider surface="bone" height={56} />
      <section
        className="surface-bone section-padding"
        id="protocol"
        aria-labelledby="why-heres-heading"
      >
        <div className="container-site">

          {/* Header: eyebrow + headline with stagger */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_OPTS}
            className="mb-16 lg:mb-24"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <PixelText className="text-[var(--color-text-on-bone-muted)]">
                {WHY_HERES_COPY.eyebrow}
              </PixelText>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              id="why-heres-heading"
              className="font-display font-bold text-[var(--color-text-on-bone)] max-w-[880px]"
              style={{
                fontSize: 'var(--font-size-display-lg)',
                letterSpacing: '-0.025em',
                lineHeight: 0.95,
              }}
            >
              {WHY_HERES_COPY.headline}
            </motion.h2>
          </motion.div>

          {/* Feature grid */}
          <WhyHeresBody cardsVisible={true} />

        </div>
      </section>
    </>
  )
}

// ─── Internal: single feature card ──────────────────────────────────────────
function FeatureCard({ card }: { card: (typeof FEATURE_CARDS)[number] }) {
  return (
    <div
      className="
        h-full p-8 lg:p-10
        border border-[var(--color-border-on-bone)]
        bg-[var(--color-bone-soft)]
        flex flex-col gap-6
        transition-transform duration-300
        group-hover:-translate-y-1
      "
    >
      <div aria-hidden="true">
        <PixelIcon
          variant={card.icon}
          size={56}
          color="var(--color-violet)"
        />
      </div>
      <div>
        <h3
          className="font-display font-bold text-[var(--color-text-on-bone)] mb-3"
          style={{ fontSize: 'var(--font-size-display-md)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
        >
          {card.heading}
        </h3>
        <p className="text-[var(--color-text-on-bone-muted)] leading-relaxed text-[length:var(--font-size-body)]">
          {card.body}
        </p>
      </div>
    </div>
  )
}
