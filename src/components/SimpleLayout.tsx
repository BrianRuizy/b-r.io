import { Container } from '@/components/Container'

export function SimpleLayout({
  title,
  intro,
  eyebrow,
  children,
}: {
  title: string
  intro: React.ReactNode
  eyebrow?: string
  children?: React.ReactNode
}) {
  return (
    <Container className="page-space">
      <header className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-20">
        <div>
          {eyebrow ? <p className="section-label mb-5">{eyebrow}</p> : null}
          <h1 className="page-title">{title}</h1>
        </div>
        <p className="max-w-xl text-base leading-7 text-muted-foreground lg:pb-1">
          {intro}
        </p>
      </header>
      {children ? <div className="mt-12 sm:mt-16">{children}</div> : null}
    </Container>
  )
}
