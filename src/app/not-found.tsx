import Link from 'next/link'

import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-muted-foreground">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button
          variant="secondary"
          className="mt-4"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Go back home
        </Button>
      </div>
    </Container>
  )
}
