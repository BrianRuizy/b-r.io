import { Container } from '@/components/Container'
import { PageEnter } from '@/components/PageEnter'

export function SimpleLayout({
  title,
  intro,
  children,
  animateChildren = true,
}: {
  title: string
  intro: React.ReactNode
  children?: React.ReactNode
  animateChildren?: boolean
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="contents">
        <PageEnter as="header" className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base text-muted-foreground">{intro}</p>
        </PageEnter>
        {children && animateChildren && (
          <PageEnter className="mt-16 sm:mt-20" index={1}>
            {children}
          </PageEnter>
        )}
        {children && !animateChildren && (
          <div className="mt-16 sm:mt-20">{children}</div>
        )}
      </div>
    </Container>
  )
}
