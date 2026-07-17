import { getAllArticles } from '@/lib/articles'

export interface ArticlePost {
  type: 'article'
  title: string
  description: string
  href: string
  date: string
  slug: string
}

export interface VideoPost {
  type: 'video'
  title: string
  description: string
  href: string
  date: string
}

export type Post = ArticlePost | VideoPost

export const videos: Array<VideoPost> = [
  {
    type: 'video',
    title: 'Moving Into My Dream NYC Apartment as a Software Engineer',
    description:
      'A new chapter in New York City, from moving day through creating a space for engineering and creative work.',
    href: 'https://www.youtube.com/watch?v=lD84PGERjP8',
    date: '2026-02-23',
  },
  {
    type: 'video',
    title: 'Day in the Life with Invisible Smart Glasses',
    description:
      'A day-in-the-life look at how new wearable technology fits into a software engineer’s routine.',
    href: 'https://www.youtube.com/watch?v=DT7oJEmIls4',
    date: '2026-02-12',
  },
  {
    type: 'video',
    title: 'Getting My Life Together as a Software Engineer',
    description:
      'Resetting routines, organizing priorities, and building systems that make space for both technical and creative work.',
    href: 'https://www.youtube.com/watch?v=6nvnKjzwjaI',
    date: '2025-10-01',
  },
  {
    type: 'video',
    title: 'Realistic Day in the Life of a Software Engineer in NYC',
    description:
      'An honest look at work, routines, and everyday life as an engineer living in New York City.',
    href: 'https://www.youtube.com/watch?v=5a4y3fSbXrE',
    date: '2025-05-21',
  },
  {
    type: 'video',
    title: 'My Desk Setup Tour in NYC',
    description:
      'A tour of the minimalist, ergonomic workspace I use for coding, editing, and long creative sessions.',
    href: 'https://www.youtube.com/watch?v=OXA3tmmQJkc',
    date: '2025-04-07',
  },
  {
    type: 'video',
    title: 'My New Life Living in NYC as a Software Engineer',
    description:
      'The move to New York and the process of building a new rhythm for work, creativity, and city life.',
    href: 'https://www.youtube.com/watch?v=G7tmy6amDEc',
    date: '2024-11-25',
  },
]

export async function getAllPosts(): Promise<Array<Post>> {
  let articles = (await getAllArticles()).map(
    (article): ArticlePost => ({
      type: 'article',
      title: article.title,
      description: article.description,
      href: `/articles/${article.slug}`,
      date: article.date,
      slug: article.slug,
    }),
  )

  return [...articles, ...videos].sort(
    (a, z) => +new Date(z.date) - +new Date(a.date),
  )
}
