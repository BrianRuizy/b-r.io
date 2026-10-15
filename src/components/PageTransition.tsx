'use client'

import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()

  return (
    <div key={pathname} className="contents">
      {children}
    </div>
  )
}
