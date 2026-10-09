import Image from 'next/image'
import portraitImage from '@/images/photos/me.jpeg'

export function Portrait() {
  return (
    <div className="overflow-hidden rounded-3xl bg-muted">
      <Image
        src={portraitImage}
        alt="Brian Ruiz in New York City"
        quality={100}
        sizes="(min-width: 1024px) 460px, 90vw"
        className="aspect-[4/5] w-full object-cover"
        priority
      />
    </div>
  )
}
