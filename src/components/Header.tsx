'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Halo } from '@/components/Halo'
import avatarImage from '@/images/brian-avatar.webp'

// Closer to SwiftUI `.bouncy()` — moderate overshoot, not critically damped.
const mobileNavSpring = {
  type: 'spring' as const,
  bounce: 0.28,
  duration: 0.55,
}

type TrayBounds = {
  top: number
  left: number
  width: number
  height: number
}

function MobileNavItem({
  href,
  children,
  onNavigate,
}: {
  href: string
  children: React.ReactNode
  onNavigate: () => void
}) {
  return (
    <li>
      <Link href={href} className="block py-2" onClick={onNavigate}>
        {children}
      </Link>
    </li>
  )
}

function MobileNavigation({ className }: { className?: string }) {
  let [open, setOpen] = useState(false)
  // Stays true through the exit morph so the real button doesn’t flash early.
  let [trayMounted, setTrayMounted] = useState(false)
  // Avoid a stuck :hover/focus ring when the trigger remounts under the cursor.
  let [suppressTriggerChrome, setSuppressTriggerChrome] = useState(false)
  let pathname = usePathname()
  let [pathnameWhenOpen, setPathnameWhenOpen] = useState(pathname)
  let reduceMotion = useReducedMotion()
  let titleId = useId()
  let triggerRef = useRef<HTMLButtonElement>(null)
  let contentRef = useRef<HTMLDivElement>(null)
  let [origin, setOrigin] = useState<TrayBounds | null>(null)
  let [target, setTarget] = useState<TrayBounds | null>(null)

  if (pathnameWhenOpen !== pathname) {
    setPathnameWhenOpen(pathname)
    setOpen(false)
  }

  function openMenu() {
    let rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }

    let margin = 16
    setOrigin({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })
    setTarget({
      top: 32,
      left: margin,
      width: window.innerWidth - margin * 2,
      height: rect.height,
    })
    setTrayMounted(true)
    setOpen(true)
    // Drop click focus so it doesn’t resurface as a ring after close.
    triggerRef.current?.blur()
  }

  function closeMenu() {
    setOpen(false)
  }

  function measureTargetHeight() {
    if (!contentRef.current) {
      return
    }

    let height = contentRef.current.scrollHeight
    setTarget((current) =>
      current && current.height !== height ? { ...current, height } : current,
    )
  }

  useLayoutEffect(() => {
    if (!open) {
      return
    }

    measureTargetHeight()
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    function onResize() {
      let margin = 16
      setTarget((current) =>
        current
          ? {
              ...current,
              left: margin,
              width: window.innerWidth - margin * 2,
            }
          : current,
      )
      requestAnimationFrame(measureTargetHeight)
    }

    let previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  let transition = reduceMotion ? { duration: 0 } : mobileNavSpring
  // Half the pill height (= true capsule). Avoid 9999 → 24, which stays
  // fully round for most of the spring and only "settles" at the end.
  let pillRadius = origin ? origin.height / 2 : 20
  let cardRadius = 24
  let labelFade = reduceMotion
    ? { duration: 0 }
    : { duration: 0.14, ease: 'easeInOut' as const }

  return (
    <div className={clsx('relative', className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        className={clsx(
          'pointer-events-auto flex items-center rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg ring-1 shadow-foreground/5 ring-border transition dark:bg-muted',
          !suppressTriggerChrome && 'dark:hover:ring-foreground/20',
          trayMounted && 'invisible',
        )}
        onClick={openMenu}
        onPointerMove={() => {
          if (suppressTriggerChrome) {
            setSuppressTriggerChrome(false)
          }
        }}
        onBlur={() => {
          if (suppressTriggerChrome) {
            setSuppressTriggerChrome(false)
          }
        }}
      >
        Menu
        <ChevronDownIcon className="ml-3 size-3 text-muted-foreground" />
      </button>

      <AnimatePresence
        onExitComplete={() => {
          setTrayMounted(false)
          setSuppressTriggerChrome(true)
          triggerRef.current?.blur()
        }}
      >
        {open && origin && target && (
          <>
            <motion.button
              key="backdrop"
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={closeMenu}
            />

            <motion.div
              key="tray"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="pointer-events-auto fixed z-50 overflow-hidden bg-card shadow-lg ring-1 shadow-foreground/5 ring-border dark:bg-muted"
              initial={{
                top: origin.top,
                left: origin.left,
                width: origin.width,
                height: origin.height,
                borderRadius: pillRadius,
              }}
              animate={{
                top: target.top,
                left: target.left,
                width: target.width,
                height: target.height,
                borderRadius: cardRadius,
              }}
              exit={{
                top: origin.top,
                left: origin.left,
                width: origin.width,
                height: origin.height,
                borderRadius: pillRadius,
              }}
              transition={transition}
            >
              {/* Same surface carries the Menu label so it never pops off */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium text-foreground"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={labelFade}
              >
                <span className="flex items-center">
                  Menu
                  <ChevronDownIcon className="ml-3 size-3 text-muted-foreground" />
                </span>
              </motion.div>

              <div
                ref={contentRef}
                className="p-8"
                style={{ width: target.width }}
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{
                    ...labelFade,
                    delay: reduceMotion ? 0 : 0.06,
                  }}
                >
                  <div className="flex flex-row-reverse items-center justify-between">
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="-m-1 p-1"
                      onClick={closeMenu}
                    >
                      <XMarkIcon className="size-6 text-muted-foreground" />
                    </button>
                    <h2
                      id={titleId}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Navigation
                    </h2>
                  </div>
                  <nav className="mt-6">
                    <ul className="-my-2 divide-y divide-border text-base text-foreground">
                      <MobileNavItem href="/about" onNavigate={closeMenu}>
                        About
                      </MobileNavItem>
                      <MobileNavItem href="/posts" onNavigate={closeMenu}>
                        Posts
                      </MobileNavItem>
                      <MobileNavItem href="/projects" onNavigate={closeMenu}>
                        Projects
                      </MobileNavItem>
                      <MobileNavItem href="/uses" onNavigate={closeMenu}>
                        Uses
                      </MobileNavItem>
                    </ul>
                  </nav>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  let pathname = usePathname()
  let isActive =
    pathname === href || (href === '/posts' && pathname.startsWith('/posts/'))

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive ? 'text-accent' : 'hover:text-accent',
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-accent/0 via-accent/50 to-accent/0" />
        )}
      </Link>
    </li>
  )
}

function DesktopNavigation({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props} className={clsx('group', className)}>
      <div className="relative rounded-full bg-card/90 shadow-lg ring-1 shadow-foreground/5 ring-border backdrop-blur-sm dark:bg-muted/90">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <Halo strength={18} size={280} />
        </div>
        <ul className="relative z-10 flex px-3 text-sm font-medium text-foreground">
          <NavItem href="/about">About</NavItem>
          <NavItem href="/posts">Posts</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/uses">Uses</NavItem>
        </ul>
      </div>
    </nav>
  )
}

function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme()
  let otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group relative overflow-hidden rounded-full bg-card/90 px-3 py-2 shadow-lg ring-1 shadow-foreground/5 ring-border backdrop-blur-sm transition dark:bg-muted/90 dark:hover:ring-foreground/20"
      onClick={() => setTheme(otherTheme)}
    >
      <div className="absolute inset-0 max-md:hidden">
        <Halo strength={18} size={120} />
      </div>
      <SunIcon className="relative z-10 size-6 text-muted-foreground transition group-hover:text-foreground dark:hidden" />
      <MoonIcon className="relative z-10 hidden size-6 text-accent transition dark:block" />
    </button>
  )
}

function clamp(number: number, a: number, b: number) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-card/90 p-0.5 shadow-lg ring-1 shadow-foreground/5 ring-border backdrop-blur-sm dark:bg-muted/90',
      )}
      {...props}
    />
  )
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  large?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt="Brian Ruiz"
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-muted object-cover',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
        priority
      />
    </Link>
  )
}

export function Header() {
  let isHomePage = usePathname() === '/'

  let headerRef = useRef<React.ElementRef<'div'>>(null)
  let avatarRef = useRef<React.ElementRef<'div'>>(null)
  let isInitial = useRef(true)

  useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0
    let upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      let { top, height } = headerRef.current.getBoundingClientRect()
      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      let fromScale = 1
      let toScale = 36 / 64
      let fromX = 0
      let toX = 2 / 16

      let scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`,
      )

      let borderScale = 1 / (toScale / scale)
      let borderX = (-toX + x) * borderScale
      let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position:
                  'var(--header-position)' as React.CSSProperties['position'],
              }}
            >
              <div
                className="top-(--avatar-top,--spacing(3)) w-full"
                style={{
                  position:
                    'var(--header-inner-position)' as React.CSSProperties['position'],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute top-3 left-0 origin-left transition-opacity"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)',
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: 'var(--avatar-image-transform)' }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className="top-(--header-top,--spacing(6)) w-full"
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: 'var(--content-offset)' }}
        />
      )}
    </>
  )
}
