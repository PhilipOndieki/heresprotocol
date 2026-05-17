import { Header } from '@/components/nav/Header'
import { StackedReveal } from '@/components/sections/StackedReveal'
import { WhyHeresReveal } from '@/components/sections/WhyHeresReveal'
import { ProductFlow } from '@/components/sections/ProductFlow'
import { MobileLayer } from '@/components/sections/MobileLayer'
import { UseCases } from '@/components/sections/UseCases'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { Footer } from '@/components/sections/Footer'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Heres Protocol',
  url: 'https://heresprotocol.com',
  description:
    'A private capsule layer for long-horizon asset instructions on Solana. Set beneficiaries, inactivity rules, and execution intent once.',
  sameAs: [
    'https://twitter.com/heresprotocol',
    'https://github.com/heresprotocol',
  ],
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Heres Protocol',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description:
    'Privacy-preserving capsule execution protocol built on Solana. Create capsules for inheritance, recovery, and long-horizon asset instructions.',
  url: 'https://heresprotocol.com',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Header />
      <main id="main-content">
        <StackedReveal />
        <WhyHeresReveal />
        <ProductFlow />
        <MobileLayer />
        <UseCases />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
