import Link from 'next/link'
import { Container } from '@/components/Container'

const pages = [
  ['About', '/about'],
  ['Writing', '/writing'],
  ['Projects', '/projects'],
  ['Uses', '/uses'],
]
const socials = [
  ['YouTube', 'https://www.youtube.com/@brianruizy'],
  ['Instagram', 'https://www.instagram.com/brianruizy'],
  ['GitHub', 'https://github.com/brianruizy'],
  ['LinkedIn', 'https://www.linkedin.com/in/brianruizy/'],
  ['X', 'https://x.com/brianruizy'],
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border sm:mt-32">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              Brian Ruiz
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Building software and sharing the journey.
              <br />
              Based in New York City.
            </p>
            <a
              href="mailto:partners@b-r.io"
              className="link-underline mt-5 inline-block text-sm"
            >
              partners@b-r.io
            </a>
          </div>
          <nav aria-label="Footer navigation">
            <p className="section-label mb-4">Explore</p>
            <ul className="space-y-3 text-sm">
              {pages.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Social links">
            <p className="section-label mb-4">Elsewhere</p>
            <ul className="space-y-3 text-sm">
              {socials.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Brian Ruiz. All rights reserved.
          </p>
          <Link href="/feed.xml" className="transition hover:text-foreground">
            RSS feed
          </Link>
        </div>
      </Container>
    </footer>
  )
}
