import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="page-space flex min-h-[60vh] items-center justify-center pb-12">
      <div className="flex flex-col items-center text-center">
        <p className="text-base font-semibold text-muted-foreground">404</p>
        <h1 className="page-title mt-4">Page not found</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button href="/" variant="secondary" className="mt-8">
          Go back home
        </Button>
      </div>
    </Container>
  )
}
