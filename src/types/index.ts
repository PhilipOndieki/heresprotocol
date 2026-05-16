export type PixelIconVariant =
  | 'lock'
  | 'gear'
  | 'coin'
  | 'shield'
  | 'inheritance'
  | 'recovery'
  | 'mobile'
  | 'capsule'
  | 'check'
  | 'eye'

export interface StatItem {
  value: number
  suffix: string
  label: string
  prefix?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface PartnerLogo {
  name: string
  width: number
  height: number
}

export interface FeatureCard {
  icon: PixelIconVariant
  heading: string
  body: string
}

export interface UseCaseCard {
  icon: PixelIconVariant
  title: string
  body: string
  href: string
}

export interface ProductStep {
  number: number
  heading: string
  body: string
}
