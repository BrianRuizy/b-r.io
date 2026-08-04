import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata } from '@/lib/metadata'

const heroTitle = 'Thank you!'

export const metadata = createPageMetadata({
  title: 'You’re subscribed',
  description: 'Thanks for subscribing to my newsletter.',
  heroTitle,
})

export default function ThankYou() {
  return (
    <SimpleLayout
      title={heroTitle}
      intro="I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
    />
  )
}
