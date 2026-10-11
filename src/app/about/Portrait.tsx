'use client'

import portraitImage from '@/images/photos/me.jpeg'
import { PhotoCard } from '@/components/PhotoCard'

export function Portrait() {
  return (
    <div className="max-w-[19.25rem] px-2.5 lg:max-w-none">
      <PhotoCard
        image={portraitImage}
        alt="Brian Ruiz in New York City"
        caption="Brian Ruiz in New York City"
        filename="me.jpeg"
        sizes="(min-width: 1024px) 32rem, 18rem"
        quality={100}
        aspectClassName="aspect-[4/5]"
        className="w-full sm:w-full"
        rotationClassName="rotate-3"
      />
    </div>
  )
}
