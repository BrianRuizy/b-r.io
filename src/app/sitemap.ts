import type { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/posts'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts = await getAllPosts()

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/uses`,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${siteUrl}${post.href}`,
      lastModified: new Date(post.date),
    })),
  ]
}
