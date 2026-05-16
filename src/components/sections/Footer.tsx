'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Twitter, Github, MessageCircle } from 'lucide-react'
import { FOOTER_COPY, FOOTER_NAV } from '@/lib/constants'
import { cn } from '@/lib/cn'

function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) return

    let scrollTriggerInstance: { kill: () => void } | undefined

    const init = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return

      gsap.fromTo(
        ref.current,
        { letterSpacing: '-0.08em' },
        {
          letterSpacing: '-0.02em',
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )

      scrollTriggerInstance = ScrollTrigger.getAll().at(-1)
    }

    init()

    return () => {
      scrollTriggerInstance?.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden"
      aria-hidden="true"
      style={{ letterSpacing: '-0.08em' }}
    >
      <div
        className="
          font-display font-black text-center
          wordmark-outline
          text-[var(--color-text-on-ink)]
          opacity-20
          select-none
          leading-none
        "
        style={{
          fontSize: 'clamp(5rem, 20vw, 20rem)',
          lineHeight: 0.85,
        }}
      >
        HERES
      </div>
    </div>
  )
}

function NewsletterForm() {
  const [value, setValue] = useState('')

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-2 mt-4"
      aria-label="Newsletter signup"
    >
      <input
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={FOOTER_COPY.newsletterPlaceholder}
        className="
          flex-1 min-w-0 px-4 py-2.5
          bg-[rgba(245,244,248,0.06)]
          border border-[var(--color-border-on-ink)]
          text-[var(--color-text-on-ink)]
          placeholder:text-[var(--color-text-on-ink-muted)]
          text-sm
          rounded-full
          focus:outline-none focus:border-[var(--color-violet)]
          transition-colors
        "
        aria-label="Email address"
      />
      <button
        type="submit"
        className="
          px-5 py-2.5 rounded-full
          bg-[var(--color-violet)]
          hover:bg-[var(--color-violet-bright)]
          text-white text-sm font-medium
          transition-colors duration-200
          shrink-0
        "
      >
        {FOOTER_COPY.newsletterCta}
      </button>
    </form>
  )
}

export function Footer() {
  return (
    <footer className="surface-black" id="docs">
      <div className="container-site pt-20 pb-4">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 pb-16 border-b border-[var(--color-border-on-ink)]">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p
              className="text-[var(--color-text-on-ink-muted)] text-sm leading-relaxed max-w-[300px]"
            >
              {FOOTER_COPY.tagline}
            </p>
            <div>
              <p className="text-xs text-[var(--color-text-on-ink-muted)] mb-1 font-pixel tracking-widest uppercase">
                Stay Updated
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-pixel tracking-[0.18em] uppercase text-[var(--color-text-on-ink-muted)] mb-4">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-on-ink-muted)] hover:text-[var(--color-text-on-ink)] transition-colors duration-200 link-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-[var(--color-text-on-ink-muted)]">
            {FOOTER_COPY.copyright}
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, label: 'X / Twitter', href: '#' },
              { icon: MessageCircle, label: 'Discord', href: '#' },
              { icon: Github, label: 'GitHub', href: '#' },
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className={cn(
                  'text-[var(--color-text-on-ink-muted)] hover:text-[var(--color-text-on-ink)]',
                  'transition-colors duration-200'
                )}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Massive bottom wordmark */}
      <FooterWordmark />
    </footer>
  )
}
