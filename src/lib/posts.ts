import glob from 'fast-glob'

export type PostType = 'article' | 'video'

interface ArticleMeta {
  type: 'article'
  title: string
  description: string
  author: string
  date: string
}

interface VideoMeta {
  type: 'video'
  title: string
  description: string
  author: string
  date: string
  youtubeId: string
}

export type PostMeta = ArticleMeta | VideoMeta

export type Post = PostMeta & {
  slug: string
  href: string
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
