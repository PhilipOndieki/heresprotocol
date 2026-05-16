import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Space_Mono, JetBrains_Mono } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-aeonik-stack',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-departure-stack',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-stack',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://heresprotocol.com'),
  title: 'Heres Protocol — Privacy-preserving execution on Solana',
  description:
    'A private capsule layer for long-horizon asset instructions. Set beneficiaries, inactivity rules, and execution intent once. Solana settles the rest.',
  openGraph: {
    title: 'Heres Protocol — Privacy-preserving execution on Solana',
    description:
      'A private capsule layer for long-horizon asset instructions. Set beneficiaries, inactivity rules, and execution intent once. Solana settles the rest.',
    type: 'website',
    url: 'https://heresprotocol.com',
    siteName: 'Heres Protocol',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heres Protocol — Privacy-preserving execution on Solana',
    description:
      'A private capsule layer for long-horizon asset instructions. Set beneficiaries, inactivity rules, and execution intent once. Solana settles the rest.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07070C',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Skip to main content */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-[100]
            px-4 py-2 rounded
            bg-[var(--color-violet)] text-white text-sm font-medium
          "
        >
          Skip to main content
        </a>

        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
