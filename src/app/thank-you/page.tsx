import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'You’re subscribed',
  description: 'Thanks for subscribing to my newsletter.',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Thanks for subscribing."
      intro="I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
    />
  )
}
