import type {
  StatItem,
  NavItem,
  FeatureCard,
  UseCaseCard,
  ProductStep,
} from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Protocol', href: '#protocol' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Docs', href: '#docs' },
]

export const HERO_COPY = {
  eyebrow: 'HERES PROTOCOL — PRIVACY-PRESERVING EXECUTION ON SOLANA',
  headline: ['Death Insurance', 'Protocol'],
  subheadline:
    'Heres is a private capsule layer for long-horizon asset instructions. Set beneficiaries, inactivity rules, and execution intent once. Solana settles the rest.',
  ctaPrimary: 'Create Capsule',
  ctaSecondary: 'Open Dashboard',
} as const

export const STATS: StatItem[] = [
  { value: 506, suffix: '', label: 'CAPSULES CREATED' },
  { value: 647, suffix: ' SOL', label: 'VALUE SECURED' },
  { value: 9, suffix: '', label: 'ACTIVE CAPSULES' },
  { value: 20.51, suffix: '', label: 'SOL ASSET MIX', prefix: '' },
]

export const PARTNERS = [
  'MagicBlock',
  'Solana',
  'Helius',
  'Alchemy',
  'Colosseum',
]

export const WHY_HERES_COPY = {
  eyebrow: 'WHY HERES',
  headline:
    'A protocol surface for assets that should not depend on a final click.',
} as const

export const FEATURE_CARDS: FeatureCard[] = [
  {
    icon: 'lock',
    heading: 'Private by Default',
    body: 'Every capsule is encrypted at the protocol layer. Beneficiaries, amounts, and conditions stay private until the moment of execution. No on-chain leakage.',
  },
  {
    icon: 'gear',
    heading: 'Automated Execution',
    body: 'Define your intent once. Heres monitors silently through MagicBlock PER, and when conditions are met, Solana executes. No manual intervention required.',
  },
  {
    icon: 'coin',
    heading: 'Built for Real Assets',
    body: 'SOL, SPL tokens, NFTs — your entire on-chain footprint can be managed through a single capsule. One setup. All assets. Any beneficiary.',
  },
]

export const PRODUCT_FLOW_COPY = {
  eyebrow: 'PRODUCT FLOW',
  headline: ['One setup path.', 'Three durable outcomes.'],
  lead: 'No recurring intervention. No custody risk. No expiry.',
} as const

export const PRODUCT_STEPS: ProductStep[] = [
  {
    number: 1,
    heading: 'Define the Capsule',
    body: 'Choose the asset, configure beneficiaries, write the intent once. The capsule is encrypted and stored at the protocol layer.',
  },
  {
    number: 2,
    heading: 'Monitor Silently',
    body: 'Heres watches inactivity through the private monitoring stack built around MagicBlock PER. No check-ins required from you.',
  },
  {
    number: 3,
    heading: 'Settle on Solana',
    body: 'When conditions are satisfied, the capsule executes and distributes per the owner\'s instructions. Final. On-chain. Immutable.',
  },
]

export const MOBILE_LAYER_COPY = {
  eyebrow: 'MOBILE LAYER',
  headline: 'Consumer-facing setup for a protocol-native vault.',
  body: 'The Heres mobile app brings capsule creation into a clean, guided flow. Scan a wallet, set an inactivity window, add beneficiaries. Done in under three minutes.',
  ctaPrimary: 'Explore Mobile',
  ctaSecondary: 'Start on Web',
} as const

export const USE_CASES_COPY = {
  eyebrow: 'USE CASES',
  headline: 'The possibilities are durable. All on Solana.',
} as const

export const USE_CASE_CARDS: UseCaseCard[] = [
  {
    icon: 'inheritance',
    title: 'Inheritance',
    body: 'Long-term asset handoff. Define your beneficiaries, set the inactivity threshold, and let Heres ensure your on-chain estate moves exactly as intended — without lawyers, without custody risk.',
    href: '#inheritance',
  },
  {
    icon: 'recovery',
    title: 'Recovery',
    body: 'Silent fallback plan. If your primary wallet becomes inaccessible, Heres routes your holdings to a designated recovery address — automatically, privately, and without third-party involvement.',
    href: '#recovery',
  },
]

export const CLOSING_CTA_COPY = {
  headline: 'Build a recovery layer that can outlast the last login.',
  ctaPrimary: 'Create Capsule',
  ctaSecondary: 'View Network Activity',
} as const

export const CLOSING_STATS: StatItem[] = [
  { value: 506, suffix: '', label: 'capsules created' },
  { value: 647, suffix: ' SOL', label: 'value secured' },
  { value: 138, suffix: '', label: 'executed capsules' },
  { value: 20.51, suffix: ' SOL', label: 'currently securing' },
]

export const FOOTER_COPY = {
  tagline: 'Privacy-preserving execution. Protocol-native settlement.',
  newsletterPlaceholder: 'Enter your email',
  newsletterCta: 'Subscribe',
  copyright: '© 2025 Heres Protocol. All rights reserved.',
} as const

export const FOOTER_NAV = [
  {
    heading: 'Protocol',
    links: [
      { label: 'Overview', href: '#' },
      { label: 'Capsules', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Whitepaper', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Audit', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Social',
    links: [
      { label: 'X / Twitter', href: '#' },
      { label: 'Discord', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Farcaster', href: '#' },
    ],
  },
]
