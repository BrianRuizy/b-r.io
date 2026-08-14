import * as cheerio from 'cheerio'
import { cache } from 'react'

export type LinkMetadata = {
  title: string | null
  image: string | null
  favicon: string | null
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

  return null
}

const fetchHeaders = {
  'User-Agent':
    'Mozilla/5.0 (compatible; BrianRuizBot/1.0; +https://brianruiz.co)',
  Accept: 'text/html,application/xhtml+xml',
}

const getOriginFavicon = cache(async (origin: string) => {
  try {
    const iconUrl = `${origin}/favicon.ico`
    const response = await fetch(iconUrl, {
      headers: {
        ...fetchHeaders,
        Accept: 'image/*,*/*',
      },
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) return null

    const type = response.headers.get('content-type') ?? ''
    if (!type.startsWith('image/')) return null

    return response.url || iconUrl
  } catch {
    return null
  }
})

async function fetchLinkMetadata(url: string): Promise<LinkMetadata> {
  const fallback: LinkMetadata = {
    title: null,
    image: null,
    favicon: null,
  }

  try {
    const response = await fetch(url, {
      headers: fetchHeaders,
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) return fallback

    const pageUrl = response.url || url
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
      pageUrl,
    )

    const favicon =
      pickIcon($, pageUrl) ??
      (await getOriginFavicon(new URL(pageUrl).origin))

    return {
      title,
      image,
      favicon,
    }
  } catch {
    return fallback
  }
}

export const getLinkMetadata = cache(fetchLinkMetadata)
