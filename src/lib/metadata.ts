import type { Metadata } from 'next'

import { ogSize } from '@/lib/og'
import { homeHeroTitle } from '@/lib/site-copy'

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}

export function createOgImageUrl(title: string) {
  return `${getSiteUrl()}/api/og?title=${encodeURIComponent(title)}`
}

export function createOpenGraphImages(title: string) {
  return [
    {
      url: createOgImageUrl(title),
      width: ogSize.width,
      height: ogSize.height,
      alt: title,
    },
  ]
}

export function createCoverOpenGraphImages(
  coverImage: string,
  alt: string,
  size?: { width: number; height: number },
) {
  return [
    {
      url: coverImage,
      alt,
      ...(size ? { width: size.width, height: size.height } : {}),
    },
  ]
}

export function createTwitterMetadata(
  title: string,
  imageUrl?: string,
): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    images: [imageUrl ?? createOgImageUrl(title)],
  }
}

export function createPageMetadata({
  title,
  description,
  heroTitle,
}: {
  title: string
  description: string
  heroTitle?: string
}): Metadata {
  const imageTitle = heroTitle ?? title

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: createOpenGraphImages(imageTitle),
    },
    twitter: {
      ...createTwitterMetadata(title, createOgImageUrl(imageTitle)),
      description,
    },
  }
}

export const siteOgImageTitle = homeHeroTitle

export const siteOpenGraphImages = createOpenGraphImages(siteOgImageTitle)

export const siteTwitterMetadata = createTwitterMetadata(
  'Brian Ruiz - Software engineer and creator in NYC',
  createOgImageUrl(siteOgImageTitle),
)
