import { Suspense } from 'react'

import { PostsList } from '@/components/PostsList'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'

const heroTitle = 'Writing & videos.'

export const metadata = createPageMetadata({
  title: 'Writing',
  description:
    'Articles and videos on software engineering, design, productivity, and life in New York City.',
  heroTitle,
})

export default async function Writing() {
  let posts = await getAllPosts()

  return (
    <SimpleLayout
      title={heroTitle}
      eyebrow="The journal"
      intro="Longer writing and videos covering the work I do, the tools I use, and the occasional update from NYC. Some technical, some personal, all things I wanted to write down."
    >
      <Suspense
        fallback={<p className="py-12 text-muted-foreground">Loading posts…</p>}
      >
        <PostsList posts={posts} />
      </Suspense>
    </SimpleLayout>
  )
}
