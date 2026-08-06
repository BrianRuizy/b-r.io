import * as cheerio from 'cheerio'
import { cache } from 'react'

export type LinkMetadata = {
  title: string | null
  image: string | null
  favicon: string
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function faviconFromDomain(url: string) {
  const hostname = getHostname(url)
  return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`
}

function resolveUrl(value: string | undefined, base: string) {
  if (!value) return null
  try {
    return new URL(value, base).href
  } catch {
    return null
  }
}

function pickIcon($: cheerio.CheerioAPI, pageUrl: string) {
  const selectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
  ]

  for (const selector of selectors) {
    const href = $(selector).attr('href')
    const resolved = resolveUrl(href, pageUrl)
    if (resolved) return resolved
  }

  return faviconFromDomain(pageUrl)
}

async function fetchLinkMetadata(url: string): Promise<LinkMetadata> {
  const fallback: LinkMetadata = {
    title: null,
    image: null,
    favicon: faviconFromDomain(url),
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; BrianRuizBot/1.0; +https://brianruiz.co)',
        Accept: 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) return fallback

    const html = await response.text()
    const $ = cheerio.load(html)

    const title =
      $('meta[property="og:title"]').attr('content')?.trim() ||
      $('meta[name="twitter:title"]').attr('content')?.trim() ||
      $('title').text().trim() ||
      null

    const image = resolveUrl(
      $('meta[property="og:image"]').attr('content') ||
        $('meta[name="twitter:image"]').attr('content'),
      url,
    )

    return {
      title,
      image,
      favicon: pickIcon($, url),
    }
  } catch {
    return fallback
  }
}

export const getLinkMetadata = cache(fetchLinkMetadata)
