'use client'

import { motion } from 'framer-motion'
import { PixelText } from '@/components/ui/PixelText'
import { Button } from '@/components/ui/Button'
import { DotDivider } from '@/components/ui/DotDivider'
import { MOBILE_LAYER_COPY } from '@/lib/constants'
import { fadeUp, staggerContainer, VIEWPORT_OPTS } from '@/lib/motion'

/* Stylized phone SVG mockup */
function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center">
      {/* Dot cluster around phone */}
      <PhoneDots />

      {/* Phone frame */}
      <svg
        viewBox="0 0 280 560"
        fill="none"
        className="relative z-10 w-[200px] sm:w-[240px] lg:w-[280px] drop-shadow-2xl"
        aria-hidden="true"
      >
        {/* Outer frame */}
        <rect
          x="1"
          y="1"
          width="278"
          height="558"
          rx="40"
          ry="40"
          fill="var(--color-ink)"
          stroke="var(--color-border-on-ink)"
          strokeWidth="2"
        />
        {/* Screen */}
        <rect x="16" y="50" width="248" height="460" rx="4" fill="#0F0F18" />

        {/* Notch */}
        <rect x="100" y="20" width="80" height="16" rx="8" fill="#0F0F18" />

        {/* Screen content — capsule UI */}
        {/* Header bar */}
        <rect x="24" y="60" width="232" height="40" rx="4" fill="#131320" />
        <rect x="32" y="72" width="60" height="8" rx="2" fill="rgba(245,244,248,0.6)" />
        <rect x="224" y="70" width="24" height="12" rx="6" fill="var(--color-violet)" />

        {/* Card 1 */}
        <rect x="24" y="112" width="232" height="80" rx="8" fill="#131320" />
        <rect x="36" y="128" width="40" height="40" rx="4" fill="var(--color-violet-muted)" />
        <rect x="36" y="132" width="12" height="12" rx="1" fill="var(--color-violet)" />
        <rect x="50" y="132" width="8" height="12" rx="1" fill="var(--color-violet)" />
        <rect x="84" y="128" width="100" height="8" rx="2" fill="rgba(245,244,248,0.7)" />
        <rect x="84" y="144" width="72" height="6" rx="2" fill="rgba(245,244,248,0.3)" />
        <rect x="84" y="156" width="88" height="6" rx="2" fill="rgba(245,244,248,0.3)" />
        <circle cx="240" cy="148" r="8" fill="rgba(92,61,255,0.2)" />
        <circle cx="240" cy="148" r="4" fill="var(--color-violet)" />

        {/* Progress bar */}
        <rect x="24" y="204" width="232" height="4" rx="2" fill="#1A1A2E" />
        <rect x="24" y="204" width="145" height="4" rx="2" fill="var(--color-violet)" />

        {/* Label */}
        <rect x="24" y="218" width="60" height="5" rx="1.5" fill="rgba(245,244,248,0.3)" />
        <rect x="194" y="218" width="62" height="5" rx="1.5" fill="rgba(245,244,248,0.3)" />

        {/* Input fields */}
        <rect x="24" y="238" width="232" height="36" rx="6" fill="#131320" />
        <rect x="36" y="250" width="80" height="6" rx="2" fill="rgba(245,244,248,0.4)" />

        <rect x="24" y="282" width="232" height="36" rx="6" fill="#131320" />
        <rect x="36" y="294" width="120" height="6" rx="2" fill="rgba(245,244,248,0.4)" />

        <rect x="24" y="326" width="232" height="36" rx="6" fill="#131320" />
        <rect x="36" y="338" width="60" height="6" rx="2" fill="rgba(245,244,248,0.2)" />

        {/* CTA button */}
        <rect x="24" y="376" width="232" height="44" rx="22" fill="var(--color-violet)" />
        <rect x="84" y="392" width="112" height="8" rx="2" fill="rgba(255,255,255,0.9)" />

        {/* Bottom nav */}
        <rect x="24" y="440" width="232" height="56" rx="8" fill="#0F0F18" />
        <circle cx="68" cy="468" r="10" fill="var(--color-violet-muted)" />
        <circle cx="68" cy="468" r="4" fill="var(--color-violet)" />
        <circle cx="140" cy="468" r="10" fill="rgba(245,244,248,0.05)" />
        <circle cx="140" cy="468" r="4" fill="rgba(245,244,248,0.3)" />
        <circle cx="212" cy="468" r="10" fill="rgba(245,244,248,0.05)" />
        <circle cx="212" cy="468" r="4" fill="rgba(245,244,248,0.3)" />

        {/* Home indicator */}
        <rect x="100" y="526" width="80" height="4" rx="2" fill="rgba(245,244,248,0.2)" />
      </svg>
    </div>
  )
}

function PhoneDots() {
  let s = 789
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }

  const dots = Array.from({ length: 24 }, (_, i) => ({
    key: i,
    cx: rand() * 360,
    cy: rand() * 580,
    r: 1.5 + rand() * 3,
    isViolet: rand() > 0.5,
    opacity: 0.2 + rand() * 0.6,
  }))

  return (
    <svg
      viewBox="0 0 360 580"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {dots.map(({ key, cx, cy, r, isViolet, opacity }) => (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={r}
          fill={isViolet ? 'var(--color-violet)' : 'rgba(10,10,20,0.2)'}
          opacity={opacity}
        />
      ))}
    </svg>
  )
}

export function MobileLayer() {
  return (
    <>
      <DotDivider surface="bone" height={56} />
      <section
        className="surface-bone section-padding"
        aria-labelledby="mobile-layer-heading"
      >
        <div className="container-site">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Copy — 5/12 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_OPTS}
              className="col-span-12 lg:col-span-5 flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <PixelText className="text-[var(--color-text-on-bone-muted)]">
                  {MOBILE_LAYER_COPY.eyebrow}
                </PixelText>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                id="mobile-layer-heading"
                className="font-display font-bold text-[var(--color-text-on-bone)]"
                style={{
                  fontSize: 'var(--font-size-display-lg)',
                  letterSpacing: '-0.025em',
                  lineHeight: 0.95,
                }}
              >
                {MOBILE_LAYER_COPY.headline}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-[var(--color-text-on-bone-muted)] text-[length:var(--font-size-body-lg)] leading-relaxed"
              >
                {MOBILE_LAYER_COPY.body}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Button variant="solid" size="md" showChevron href="#">
                  {MOBILE_LAYER_COPY.ctaPrimary}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href="#"
                  className="border-[var(--color-text-on-bone)] text-[var(--color-text-on-bone)] hover:border-[var(--color-violet)] hover:text-[var(--color-violet)]"
                >
                  {MOBILE_LAYER_COPY.ctaSecondary}
                </Button>
              </motion.div>
            </motion.div>

            {/* Phone mockup — 7/12 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_OPTS}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 lg:col-span-7 flex justify-center relative"
            >
              <PhoneMockup />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
