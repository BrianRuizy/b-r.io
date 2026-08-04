import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

export const ogSize = {
  width: 1200,
  height: 630,
} as const

// Matches :root tokens in src/styles/tailwind.css
const ogTheme = {
  background: '#fafafa',
  foreground: '#252525',
  mutedForeground: '#737373',
} as const

const brandLabel = 'b-r.io'
const logoPath = join(
  process.cwd(),
  'public/favicon/web-app-manifest-512x512.png',
)
const logoDisplaySize = 40

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type FontStyle = 'normal' | 'italic'

async function loadGoogleFont(font: string, text: string, weight?: Weight) {
  try {
    const weightParam = weight ? `:wght@${weight}` : ''
    const url = `https://fonts.googleapis.com/css2?family=${font}${weightParam}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const resource = css.match(
      /src: url\((.+)\) format\('(opentype|truetype)'\)/,
    )

    if (resource) {
      const response = await fetch(resource[1])
      if (response.status === 200) {
        return await response.arrayBuffer()
      }
    }
  } catch (error) {
    console.error(`Failed to load font ${font}:`, error)
  }

  return null
}

// Hero-style title: bold + tight tracking, sized up for OG readability.
const titleFontSize = 64
const titleLineHeight = 74 / 64
const titleLetterSpacing = '-0.025em'
const titleMaxLines = 3
// ~64 chars fits 3 lines at 64px within 900px (Satori line-clamp is unsupported).
const titleMaxLength = 72

async function getLogoDataUrl() {
  const logo = await readFile(logoPath)
  return `data:image/png;base64,${logo.toString('base64')}`
}

function formatOgTitle(title: string) {
  const trimmed = title.trim()

  if (trimmed.length <= titleMaxLength) {
    return trimmed
  }

  const slice = trimmed.slice(0, titleMaxLength)
  const lastSpace = slice.lastIndexOf(' ')

  if (lastSpace > 0) {
    return `${slice.slice(0, lastSpace).trimEnd()}…`
  }

  return `${slice.trimEnd()}…`
}

export async function generateOgImage({ title }: { title: string }) {
  const displayTitle = formatOgTitle(title)

  const [interBoldFont, interRegularFont, logoDataUrl] = await Promise.all([
    loadGoogleFont('Inter', displayTitle, 700),
    loadGoogleFont('Inter', brandLabel, 400),
    getLogoDataUrl(),
  ])

  const fonts = []

  if (interBoldFont) {
    fonts.push({
      name: 'Inter',
      data: interBoldFont,
      style: 'normal' as FontStyle,
      weight: 700 as Weight,
    })
  }

  if (interRegularFont) {
    fonts.push({
      name: 'Inter',
      data: interRegularFont,
      style: 'normal' as FontStyle,
      weight: 400 as Weight,
    })
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: ogTheme.background,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: '120px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src={logoDataUrl}
            width={logoDisplaySize}
            height={logoDisplaySize}
            alt=""
          />
          <div
            style={{
              fontSize: 32,
              color: ogTheme.mutedForeground,
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 400,
            }}
          >
            {brandLabel}
          </div>
        </div>
        <div
          style={{
            marginTop: '64px',
            fontSize: titleFontSize,
            color: ogTheme.foreground,
            textAlign: 'left',
            maxWidth: '900px',
            maxHeight: titleFontSize * titleLineHeight * titleMaxLines,
            overflow: 'hidden',
            letterSpacing: titleLetterSpacing,
            lineHeight: titleLineHeight,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 600,
          }}
        >
          {displayTitle}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts,
    },
  )
}
