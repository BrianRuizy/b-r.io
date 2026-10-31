import { type Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import {
  siteOpenGraphImages,
  siteTwitterMetadata,
} from '@/lib/metadata'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const title = 'Brian Ruiz - Software engineer and creator in NYC'
const description =
  'Software engineer in New York City crafting delightful user experiences and sharing videos about technology, productivity, design, and life.'
const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Brian Ruiz',
  alternateName: 'b-r.io',
  url: siteUrl,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Brian Ruiz',
    default: title,
  },
  description,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Brian Ruiz',
    locale: 'en_US',
    type: 'website',
    images: siteOpenGraphImages,
  },
  twitter: {
    ...siteTwitterMetadata,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      {
        url: '/favicon/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${inter.variable} ${sourceSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex h-full bg-white dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData).replace(/</g, '\\u003c'),
          }}
        />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}
