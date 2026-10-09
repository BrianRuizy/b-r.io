'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import {
  Bars2Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'
import { isWritingPath } from '@/lib/writing'
import avatarImage from '@/images/brian-avatar.webp'

const links = [
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
  { href: '/uses', label: 'Uses' },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-border bg-card transition hover:bg-muted"
    >
      <SunIcon className="hidden size-4 dark:block" aria-hidden="true" />
      <MoonIcon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  )
}

export function Header() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || (href === '/writing' && isWritingPath(pathname))

  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl"
    >
      {({ open, close }) => (
        <>
          <Container>
            <div className="flex h-20 items-center justify-between gap-4">
              <Link
                href="/"
                aria-label="Brian Ruiz — home"
                onClick={() => close()}
                className="flex min-w-0 items-center gap-3"
              >
                <Image
                  src={avatarImage}
                  alt=""
                  sizes="2rem"
                  className="size-8 shrink-0 rounded-full object-cover"
                  priority
                />
                <span className="truncate text-lg font-semibold tracking-tight">
                  Brian Ruiz
                </span>
              </Link>
              <nav aria-label="Main navigation" className="hidden md:block">
                <ul className="flex items-center gap-1">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={isActive(href) ? 'page' : undefined}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm transition',
                          isActive(href)
                            ? 'border-border bg-card text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex shrink-0 items-center gap-2">
                <ThemeToggle />
                <Button
                  href="mailto:partners@b-r.io"
                  className="hidden sm:inline-flex"
                >
                  Get in touch
                </Button>
                <DisclosureButton
                  aria-label={open ? 'Close navigation' : 'Open navigation'}
                  className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-border bg-card md:hidden"
                >
                  {open ? (
                    <XMarkIcon className="size-5" aria-hidden="true" />
                  ) : (
                    <Bars2Icon className="size-5" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </Container>
          <DisclosurePanel className="border-t border-border md:hidden">
            <Container className="py-5">
              <nav aria-label="Mobile navigation">
                <ul className="grid grid-cols-2 gap-2">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => close()}
                        aria-current={isActive(href) ? 'page' : undefined}
                        className={cn(
                          'block rounded-xl px-4 py-3 text-base',
                          isActive(href)
                            ? 'bg-muted text-foreground'
                            : 'text-muted-foreground hover:bg-muted',
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button
                  href="mailto:partners@b-r.io"
                  onClick={() => close()}
                  variant="outline"
                  className="mt-4 w-full sm:hidden"
                >
                  Get in touch
                </Button>
              </nav>
            </Container>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
