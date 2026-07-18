import { permanentRedirect } from 'next/navigation'

export default function ArticlesIndex() {
  permanentRedirect('/posts?type=article')
}
