'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { WhyHeresHeader, WhyHeresBody } from '@/components/sections/WhyHeres'

// ─── Timeline keyframe proportions (must sum to 1.0) ──────────────────────
//   Phase A  0.00–0.15  Entry: box rises from below, scrim fades in
//   Phase B  0.15–0.45  Settle: box centres at stable mid-state
//   Hold     0.45–0.55  Pause beat: box visible as inset card, no motion
//   Phase C  0.55–0.88  Bleed: box expands to full viewport
//   Phase D  0.88–1.00  Cards: feature cards stagger in (separate trigger)
//
// Timeline duration = 10 (arbitrary unit). Each phase maps 1:1 to a
// percentage of the section's total scroll distance via GSAP scrub.

export function WhyHeresReveal() {
  const triggerRef = useRef<HTMLElement>(null)
  const scrimRef   = useRef<HTMLDivElement>(null)
  const boxRef     = useRef<HTMLDivElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      !triggerRef.current ||
      !scrimRef.current   ||
      !boxRef.current     ||
      !innerRef.current
    ) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Reduced-motion: CSS overrides already handle the static layout;
    // skip every animation and ScrollTrigger instance entirely.
    if (prefersReducedMotion) return

    let mounted = true
    let stInstance:      { kill: () => void } | undefined
    let tlInstance:      { kill: () => void } | undefined
    let stCardsInstance: { kill: () => void } | undefined
    let tlCardsInstance: { kill: () => void } | undefined

    const init = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (
        !mounted        ||
        !triggerRef.current ||
        !scrimRef.current   ||
        !boxRef.current     ||
        !innerRef.current
      ) return

      // ── Initial state ────────────────────────────────────────────────────
      // Box: hidden, below centre, slightly small.
      // Inner: counter-scale (1/0.94 ≈ 1.064) keeps text at native size
      //        while the box frame scales.
      gsap.set(boxRef.current,   { opacity: 0, scale: 0.94, y: '40vh' })
      gsap.set(innerRef.current, { scale: 1 / 0.94 })
      gsap.set(scrimRef.current, { opacity: 0 })

      // Cards are pre-hidden via inline opacity:0 in WhyHeresBody; GSAP also
      // applies a y-offset so the reveal can animate both together.
      const cards = Array.from(
        triggerRef.current.querySelectorAll<HTMLElement>('[data-why-card]')
      )
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 32 })
      }

      // ── Main scrub timeline ──────────────────────────────────────────────
      // Total duration = 10. Each unit = 10% of total pin scroll distance.
      // Phase boundaries (timeline units):
      //   0.0 → 1.5  Phase A
      //   1.5 → 4.5  Phase B
      //   4.5 → 5.5  Hold
      //   5.5 → 8.8  Phase C
      //   8.8 → 10   Phase D placeholder (cards handled by separate ST)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Phase A (0→15%): opacity + entry rise + scale up
      tl.to(
        boxRef.current,
        { opacity: 1, scale: 0.97, y: '12vh', ease: 'none', duration: 1.5 },
        0
      )
      // Counter-scale on inner: text stays at visual 1× while box scales
      tl.to(
        innerRef.current,
        { scale: 1 / 0.97, ease: 'none', duration: 1.5 },
        0
      )
      tl.to(
        scrimRef.current,
        { opacity: 0.55, ease: 'none', duration: 1.5 },
        0
      )

      // Phase B (15%→45%): settle to centre, scrim darkens
      tl.to(
        boxRef.current,
        { scale: 1, y: 0, ease: 'none', duration: 3 },
        1.5
      )
      tl.to(
        innerRef.current,
        { scale: 1, ease: 'none', duration: 3 },
        1.5
      )
      tl.to(
        scrimRef.current,
        { opacity: 0.85, ease: 'none', duration: 3 },
        1.5
      )

      // Hold beat (45%→55%): animate a dummy target so the timeline has
      // explicit duration here; no visible property changes occur.
      tl.to({}, { duration: 1 }, 4.5)

      // Phase C (55%→88%): box expands to full-bleed
      // GSAP reads the current computed width/height from the DOM and
      // interpolates to the viewport dimensions. invalidateOnRefresh resets
      // cached start values on resize, keeping the animation correct.
      tl.to(
        boxRef.current,
        {
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          // Dissolve the card-frame styling as the box fills the viewport
          borderColor: 'rgba(10, 10, 20, 0)',
          boxShadow: '0 40px 120px -20px rgba(7, 7, 12, 0)',
          ease: 'none',
          duration: 3.3,
        },
        5.5
      )
      tl.to(
        scrimRef.current,
        { opacity: 0, ease: 'none', duration: 3.3 },
        5.5
      )

      // Phase D placeholder (88%→100%): keeps total timeline = 10 so the
      // scroll-to-timeline mapping preserves all percentage boundaries.
      tl.to({}, { duration: 1.2 }, 8.8)

      stInstance = ScrollTrigger.getAll().at(-1)
      tlInstance = tl

      // ── Phase D: card stagger (non-scrub) ───────────────────────────────
      // Triggered once at ~88% of the pin's scroll progress.
      // Uses toggleActions so scrubbing back reverses the cards correctly.
      if (cards.length > 0) {
        const cardTl = gsap.timeline({ paused: true })
        cards.forEach((card, i) => {
          cardTl.to(
            card,
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5 },
            i * 0.12
          )
        })

        ScrollTrigger.create({
          trigger: triggerRef.current,
          // 88% of (sectionHeight − viewportHeight) = pixels past section start
          start: () => {
            const sectionH  = triggerRef.current!.offsetHeight
            const viewportH = window.innerHeight
            const offset    = Math.floor(0.88 * (sectionH - viewportH))
            return `top+=${offset} top`
          },
          animation: cardTl,
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        })

        stCardsInstance = ScrollTrigger.getAll().at(-1)
        tlCardsInstance = cardTl
      }
    }

    init()

    return () => {
      mounted = false
      stInstance?.kill()
      tlInstance?.kill()
      stCardsInstance?.kill()
      tlCardsInstance?.kill()
    }
  }, [])

  return (
    <section
      ref={triggerRef}
      className="why-heres-reveal relative"
      id="protocol"
      aria-label="Why Heres section reveal"
      aria-labelledby="why-heres-heading"
    >
      {/*
       * Sticky wrapper: pins the visual scene for the full scroll distance.
       * Matches the pattern used by StackedReveal: CSS sticky + tall outer
       * section, no GSAP pin:true, so Lenis stays in control.
       */}
      <div className="why-heres-reveal-inner sticky top-0 h-screen w-full overflow-hidden">

        {/*
         * Ink-coloured backdrop: matches the final frame of StackedReveal
         * (StatsBar's dark surface) so the two scenes feel continuous at
         * the boundary. The animated scrim then layers over this.
         */}
        <div
          className="absolute inset-0 z-[0]"
          style={{ backgroundColor: 'var(--color-ink)' }}
          aria-hidden="true"
        />

        {/* Scrim: darkens the "previous scene" backdrop while the box is inset */}
        <div
          ref={scrimRef}
          className="why-heres-reveal-scrim absolute inset-0 z-[1]"
          style={{
            backgroundColor: 'var(--color-ink)',
            opacity: 0,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/*
         * Flex container: centres the reveal box in the viewport.
         * As the box grows from 88vw × 72vh to 100vw × 100vh, the flex
         * centering smoothly pulls its edges to the viewport boundary.
         */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center">

          {/*
           * Reveal box: the animated "card" frame.
           * will-change is declared on the element (not as a Tailwind class)
           * because it names properties that Tailwind v4 does not expose as
           * atomic utilities.
           *
           * width/height/borderRadius are set via inline style so CSS computes
           * the responsive initial values; GSAP reads them and interpolates
           * to the full-viewport end state.
           */}
          <div
            ref={boxRef}
            className="why-heres-reveal-box relative overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bone)',
              width: 'min(88vw, 1180px)',
              height: '72vh',
              borderRadius: '28px',
              border: '1px solid rgba(10, 10, 20, 0.06)',
              boxShadow: '0 40px 120px -20px rgba(7, 7, 12, 0.45)',
              willChange: 'transform, width, height, border-radius',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/*
             * Inner content wrapper: never scales.
             * The counter-scale applied by GSAP (scale: 1/boxScale) keeps
             * every text glyph at its native rendered size throughout Phases
             * A and B, avoiding the distortion that a plain box scale causes.
             *
             * max-width caps the layout width at the site container so text
             * line lengths remain stable as the box bleed expands in Phase C.
             */}
            <div
              ref={innerRef}
              style={{
                width: '100%',
                maxWidth: 'var(--container-max)',
                paddingInline: 'var(--container-padding)',
                paddingBlock: 'clamp(3rem, 6vw, 6rem)',
                willChange: 'transform',
              }}
            >
              {/* Eyebrow + headline: visible from Phase A, never re-renders */}
              <WhyHeresHeader />

              {/* Feature grid: hidden until Phase D (controlled by GSAP) */}
              <WhyHeresBody cardsVisible={false} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
