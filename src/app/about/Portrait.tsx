'use client'

import { useSyncExternalStore } from 'react'

import portraitImage from '@/images/photos/me.jpeg'
import { PageEnter } from '@/components/PageEnter'
import { PhotoCard } from '@/components/PhotoCard'

function subscribeToDesktop(callback: () => void) {
  const query = window.matchMedia('(min-width: 768px)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 768px)').matches
}
function getServerSnapshot() {
  return false
}

export function Portrait() {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerSnapshot,
  )
  return (
    <div className="max-w-[19.25rem] px-2.5 md:max-w-none">
      <PhotoCard
        index={isDesktop ? 3 : 0}
        image={portraitImage}
        alt="Portrait in Central Park"
        caption="Portrait in Central Park"
        filename="me.jpeg"
        sizes="(min-width: 1280px) 28rem, (min-width: 768px) calc((100vw - 12rem) / 2), 18rem"
        quality={100}
        aspectClassName="aspect-[4/5]"
        className="w-full sm:w-full"
        rotationClassName="rotate-3"
      />
    </div>
  )
}

export function SocialLinksEnter({ children }: { children: React.ReactNode }) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerSnapshot,
  )
  return (
    <PageEnter className="md:pl-8 lg:pl-20" delay={isDesktop ? 0.3 : 0.13}>
      {children}
    </PageEnter>
  )
}
