'use client'

import { useEffect, useState, type RefObject } from 'react'

export function useMousePosition(ref: RefObject<HTMLElement | null>) {
  let [mousePosition, setMousePosition] = useState<{
    x: number | null
    y: number | null
  }>({
    x: null,
    y: null,
  })

  useEffect(() => {
    function updateMousePosition(event: MouseEvent) {
      let element = ref.current
      if (!element) {
        return
      }

      let rect = element.getBoundingClientRect()
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [ref])

  return mousePosition
}
