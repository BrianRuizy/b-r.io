import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PageTransition } from '@/components/PageTransition'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh w-full flex-col overflow-x-clip">
      <Header />
      <main className="flex-auto">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  )
}
