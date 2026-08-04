import type { Metadata } from 'next'

// Small square image so Safari and other clients show the favicon-style
// preview instead of heuristically picking large photos from page content.
export const siteOgImage = {
  url: '/favicon/favicon-96x96.png',
  width: 96,
  height: 96,
  alt: 'Brian Ruiz',
} as const

export const siteTwitterMetadata: NonNullable<Metadata['twitter']> = {
  card: 'summary',
  images: [siteOgImage.url],
}

export const siteOpenGraphImages = [siteOgImage]
