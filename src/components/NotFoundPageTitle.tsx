'use client'

import { useEffect } from 'react'

export function NotFoundPageTitle() {
  useEffect(() => {
    document.title = '404'
  }, [])

  return null
}
