import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="transition hover:text-accent">
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-border pt-10 pb-16">
          <ContainerInner>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex flex-col items-start gap-4 text-sm font-medium text-foreground md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-1">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/writing">Writing</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/gear">Gear</NavLink>
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Brian Ruiz.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
