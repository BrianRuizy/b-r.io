import { generateOgImage } from '@/lib/og'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Brian Ruiz'

  return generateOgImage({ title })
}
