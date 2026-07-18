import { Suspense } from 'react'
import { type Metadata } from 'next'

import { PostsList } from '@/components/PostsList'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Posts',
  description:
    'Articles and videos about software engineering, technology, design, productivity, and life in New York City.',
}

export default async function Posts() {
  let posts = await getAllPosts()

  return (
    <SimpleLayout
      title="Here are my posts, from tech and productivity, to life updates."
      intro="Articles and videos about engineering, design, productivity, and the tools I use along the way. Plus the occasional note on creative work, systems, and life in the city."
    >
      <Suspense fallback={null}>
        <PostsList posts={posts} />
      </Suspense>
    </SimpleLayout>
  )
}
