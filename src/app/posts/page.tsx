import { Suspense } from 'react'
import { type Metadata } from 'next'

import { PostsList } from '@/components/PostsList'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Posts',
  description:
    'Articles and videos on software engineering, design, productivity, and life in New York City.',
}

export default async function Posts() {
  let posts = await getAllPosts()

  return (
    <SimpleLayout
      title="Writing on engineering, design, and building a life around it."
      intro="Longer posts and videos covering the work I do, the tools I use, and the occasional update from NYC. Some technical, some personal, all things I wanted to write down."
    >
      <Suspense fallback={null}>
        <PostsList posts={posts} />
      </Suspense>
    </SimpleLayout>
  )
}
