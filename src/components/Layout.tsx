import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PageTransition } from '@/components/PageTransition'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full sm:bg-card sm:ring-1 sm:ring-secondary" />
        </div>
      </div>
      <div className="relative flex w-full flex-col overflow-x-clip">
        <Header />
        <main className="flex-auto">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </>
  )
}
