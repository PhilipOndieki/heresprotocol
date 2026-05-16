import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Heres Protocol — Privacy-preserving execution on Solana'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#07070C',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Violet accent dot cluster */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 80,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(92,61,255,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 100,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(92,61,255,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: '#5C3DFF',
              display: 'flex',
            }}
          />
          <span
            style={{
              color: '#F5F4F8',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            HERES
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            color: '#F5F4F8',
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            textAlign: 'center',
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Death Insurance Protocol
        </div>

        {/* Subheadline */}
        <div
          style={{
            color: 'rgba(245,244,248,0.55)',
            fontSize: 24,
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          Privacy-preserving execution on Solana
        </div>

        {/* Badge */}
        <div
          style={{
            background: 'rgba(92,61,255,0.15)',
            border: '1px solid rgba(92,61,255,0.4)',
            color: '#7B5AFF',
            fontSize: 14,
            letterSpacing: '0.15em',
            padding: '8px 20px',
            borderRadius: 100,
          }}
        >
          HERES PROTOCOL
        </div>

        {/* Massive watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            left: 0,
            right: 0,
            fontSize: 220,
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(245,244,248,0.06)',
            textAlign: 'center',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          HERES
        </div>
      </div>
    ),
    { ...size }
  )
}
