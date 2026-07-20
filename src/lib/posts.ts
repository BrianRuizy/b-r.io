import type { Metadata } from 'next'
import glob from 'fast-glob'

export type PostType = 'article' | 'video'

interface ArticleMeta {
  type: 'article'
  title: string
  description: string
  author: string
  date: string
  coverImage?: string
}

interface VideoMeta {
  type: 'video'
  title: string
  description: string
  author: string
  date: string
  youtubeId: string
  coverImage?: string
}

export type PostMeta = ArticleMeta | VideoMeta

export type Post = PostMeta & {
  slug: string
  href: string
}

export function createPostMetadata(post: PostMeta): Metadata {
  const hasCover = Boolean(post.coverImage)

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      ...(hasCover
        ? {
            images: [
              {
                url: post.coverImage!,
                alt: post.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: hasCover ? 'summary_large_image' : 'summary',
      title: post.title,
      description: post.description,
      ...(hasCover ? { images: [post.coverImage!] } : {}),
    },
  }
}

async function importPost(postFilename: string): Promise<Post> {
  let { post } = (await import(`../app/posts/${postFilename}`)) as {
    default: React.ComponentType
    post: PostMeta
  }

  let slug = postFilename.replace(/(\/page)?\.mdx$/, '')

  return {
    slug,
    href: `/posts/${slug}`,
    ...post,
  }
}

export async function getAllPosts() {
  let postFilenames = await glob('*/page.mdx', {
    cwd: './src/app/posts',
  })

  let posts = await Promise.all(postFilenames.map(importPost))

  return posts.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
