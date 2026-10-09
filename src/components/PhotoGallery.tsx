import Image from 'next/image'
import { Container } from '@/components/Container'
import bikingImage from '@/images/photos/biking.jpeg'
import deskSunsetImage from '@/images/photos/desk-sunset.jpeg'
import juneImage from '@/images/photos/june.jpeg'
import selfieImage from '@/images/photos/selfie.jpeg'
import empireImage from '@/images/photos/empire.jpeg'

const photos = [
  { image: empireImage, alt: 'Empire State Building' },
  { image: bikingImage, alt: 'Brian Ruiz on an e-bike' },
  { image: deskSunsetImage, alt: 'Desk setup at sunset' },
  { image: selfieImage, alt: 'Brian Ruiz selfie' },
  { image: juneImage, alt: 'Brian Ruiz in June' },
]

export function PhotoGallery() {
  return (
    <Container className="mt-20 sm:mt-28">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Life beyond the screen
        </h2>
        <a
          href="https://www.instagram.com/brianruizy"
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          On Instagram
        </a>
      </div>
      <div
        tabIndex={0}
        role="region"
        aria-label="Photos from my life in New York City; scroll to see all photos"
        className="photo-strip flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl pb-3 sm:gap-4"
      >
        {photos.map(({ image, alt }) => (
          <div
            key={image.src}
            className="relative aspect-[4/5] w-[65%] shrink-0 snap-start overflow-hidden rounded-2xl bg-muted sm:w-[32%] lg:w-[calc((100%-4rem)/5)]"
          >
            <Image
              src={image}
              alt={alt}
              quality={100}
              sizes="(min-width: 1280px) 223px, (min-width: 640px) 30vw, 65vw"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </Container>
  )
}
