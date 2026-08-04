import type { Metadata } from 'next'
import glob from 'fast-glob'

import {
  createCoverOpenGraphImages,
  createOpenGraphImages,
  createTwitterMetadata,
} from '@/lib/metadata'

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

export function getYouTubeThumbnailUrl(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
}

function getPostShareImage(post: PostMeta) {
  if (post.coverImage) {
    return { url: post.coverImage, size: undefined }
  }

  if (post.type === 'video') {
    return {
      url: getYouTubeThumbnailUrl(post.youtubeId),
      size: { width: 1280, height: 720 },
    }
  }

  return null
}

export function createPostMetadata(post: PostMeta): Metadata {
  const shareImage = getPostShareImage(post)
  const openGraphImages = shareImage
    ? createCoverOpenGraphImages(
        shareImage.url,
        post.title,
        shareImage.size,
      )
    : createOpenGraphImages(post.title)
  const twitterImage = shareImage?.url

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: openGraphImages,
    },
    twitter: {
      ...createTwitterMetadata(post.title, twitterImage),
      title: post.title,
      description: post.description,
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
