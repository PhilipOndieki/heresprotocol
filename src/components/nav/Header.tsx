'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { NAV_ITEMS } from '@/lib/constants'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function HMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-label="Heres Protocol"
    >
      <rect x="3" y="3" width="5" height="22" fill="var(--color-violet)" />
      <rect x="3" y="12" width="22" height="4" fill="var(--color-violet)" />
      <rect x="20" y="3" width="5" height="22" fill="var(--color-violet)" />
    </svg>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300',
        scrolled
          ? 'bg-[rgba(7,7,12,0.72)] backdrop-blur-[16px] saturate-[180%] border-b border-[var(--color-border-on-ink)]'
          : 'bg-transparent'
      )}
    >
      <div className="container-site h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          aria-label="Heres Protocol home"
        >
          <HMark />
          <span
            className="font-display font-bold text-xl tracking-tight text-[var(--color-text-on-ink)]"
            style={{ letterSpacing: '-0.02em' }}
          >
            HERES
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-text-on-ink-muted)] hover:text-[var(--color-text-on-ink)] text-sm font-medium transition-colors duration-200 link-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="solid"
            size="sm"
            showChevron
            href="#"
            className="font-medium"
          >
            Launch App
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--color-text-on-ink)] p-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-[72px] left-0 right-0 bg-[var(--color-ink)] border-b border-[var(--color-border-on-ink)] px-6 py-6 flex flex-col gap-5"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--color-text-on-ink)] font-medium text-lg"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="solid" size="md" showChevron href="#" className="self-start mt-2">
              Launch App
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
